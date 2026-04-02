// Load environment variables from .env.local
require('dotenv').config({ path: '.env.local' });

const fs = require('fs');
const path = require('path');
const https = require('https');
const { createClient } = require('@sanity/client');
const imageUrlBuilder = require('@sanity/image-url');

// Escapes user-supplied values before interpolating them into HTML strings.
function sanitizeAttr(str) {
  return String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// Configuration (loaded from .env.local or environment)
const SANITY_TOKEN = process.env.SANITY_TOKEN;

// Validate environment variables
if (!SANITY_TOKEN) {
  console.error('❌ Error: SANITY_TOKEN environment variable is required');
  process.exit(1);
}


// Sanity client (token auth required — CDN does not support token auth for private datasets)
const sanityClient = createClient({
  projectId: 'jwneocyf',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: SANITY_TOKEN,
});

// Image URL builder for Sanity CDN transforms
const builder = imageUrlBuilder(sanityClient);
const urlFor = (source) => builder.image(source);

// Downloads a file from a URL (with optional Bearer token auth) to a local path.
function downloadFile(url, destPath, token) {
  return new Promise((resolve, reject) => {
    const options = token ? { headers: { Authorization: `Bearer ${token}` } } : {};
    const file = fs.createWriteStream(destPath);
    https.get(url, options, (res) => {
      if (res.statusCode !== 200) {
        file.close();
        fs.unlink(destPath, () => {});
        reject(new Error(`Failed to download file: HTTP ${res.statusCode}`));
        return;
      }
      res.pipe(file);
      file.on('finish', () => file.close(resolve));
    }).on('error', (err) => {
      file.close();
      fs.unlink(destPath, () => {});
      reject(err);
    });
  });
}

/**
 * Shared sort comparator: descending by start year.
 * Handles start_year integer property or year string like "2020–2022".
 */
const byStartYearDesc = (a, b) => {
  const getYear = (item) =>
    item.start_year || parseInt(item.year?.split('–')[0] || item.year?.split('-')[0] || 0);
  return getYear(b) - getYear(a);
};

/**
 * Fetch work experience records from Sanity CMS via GROQ.
 * Field names are remapped to match the existing snake_case shape.
 * `highlights` is restored to `achievements` for frontend compatibility.
 */
async function fetchWorkExperience() {
  console.log('📡 Fetching work experience (Sanity)...');
  const query = `*[_type == "workExperience"] | order(startYear desc) {
    "id": slug.current,
    company,
    position,
    "start_year": startYear,
    "end_year": endYear,
    status,
    description,
    location,
    icon,
    color,
    tags,
    "achievements": highlights
  }`;
  const data = await sanityClient.fetch(query);
  console.log(`✅ Fetched ${data.length || 0} work experience`);
  return data;
}

/**
 * Fetch education records from Sanity CMS via GROQ.
 * Field names are remapped inline to match the existing snake_case shape.
 */
async function fetchEducation() {
  console.log('📡 Fetching education (Sanity)...');
  const query = `*[_type == "education"] | order(startYear desc) {
    "id": slug.current,
    title,
    subtitle,
    "start_year": startYear,
    "end_year": endYear,
    status,
    description,
    location,
    icon,
    color,
    highlights
  }`;
  const data = await sanityClient.fetch(query);
  console.log(`✅ Fetched ${data.length || 0} education`);
  return data;
}

/**
 * Fetch project records from Sanity CMS via GROQ.
 * Fields are remapped to the snake_case shape the React frontend expects.
 * detailedDescription (Portable Text) is converted to HTML via
 * @portabletext/to-html (ESM-only, loaded with dynamic import).
 * year is reconstructed from startYear / endYear integers.
 */
async function fetchProjects() {
  console.log('📡 Fetching projects (Sanity)...');

  const query = `*[_type == "project"] | order(startYear desc) {
    "id": slug.current,
    title,
    description,
    icon,
    tags,
    color,
    status,
    "start_year": startYear,
    "end_year": endYear,
    github,
    demo,
    "map_color": mapColor,
    size,
    detailedDescription[] {
      ...,
      asset,
      crop,
      hotspot
    },
    images[] {
      alt,
      caption,
      asset,
      crop,
      hotspot
    },
    cadModel {
      asset-> {
        url
      }
    },
    "cad_camera_view": cadCameraView,
    "cad_model_rotation": cadModelRotation {
      "x": x,
      "y": y,
      "z": z
    }
  }`;

  const rawProjects = await sanityClient.fetch(query);


  // ESM-only package: dynamic import required inside CommonJS async function
  const { toHTML } = await import('@portabletext/to-html');

  const projects = rawProjects.map(project => {
    // Reconstruct display year string using en-dash (matches byStartYearDesc split on '–')
    const year = project.end_year
      ? `${project.start_year}\u2013${project.end_year}`
      : String(project.start_year);

    // Convert Portable Text blocks to HTML; null when field is absent
    const detailed_description = project.detailedDescription
      ? toHTML(project.detailedDescription, {
          components: {
            types: {
              image: ({ value }) => {
                if (!value?.asset?._ref) return '';
                const src = urlFor(value).width(800).auto('format').quality(85).url();
                const alt = sanitizeAttr(value.alt);
                const caption = sanitizeAttr(value.caption);
                if (caption) {
                  return `<figure><img src="${src}" alt="${alt}" /><figcaption>${caption}</figcaption></figure>`;
                }
                return `<img src="${src}" alt="${alt}" />`;
              },
            },
          },
        })
      : null;

    // Build all image size variants from Sanity CDN URL params — keeps output shape
    // identical to the old S3 schema so no React component changes are needed.
    const images = (project.images ?? []).map(img => {
      if (!img?.asset?._ref) return null;
      return {
        alt: img.alt ?? '',
        caption: img.caption ?? '',
        original_url: urlFor(img).url(),
        url: urlFor(img).width(1200).auto('format').quality(90).url(),
        medium_url: urlFor(img).width(600).auto('format').quality(85).url(),
        thumbnail_url: urlFor(img).width(300).auto('format').quality(75).url(),
      };
    }).filter(Boolean);

    const { detailedDescription: _pt, cadModel: _cad, ...rest } = project;

    return {
      ...rest,
      year,
      detailed_description,
      images,
      cad_model_url: project.cadModel?.asset?.url ?? null,
    };
  });

  console.log(`✅ Fetched ${projects.length || 0} projects`);
  return projects;
}

/**
 * Fetch system map links from Sanity CMS via GROQ.
 * Reads projectLinks arrays embedded on each project document and flattens
 * them into the { source, target, relationship } shape consumed by the React components.
 */
async function fetchSystemMapLinks() {
  console.log('📡 Fetching system map links (Sanity)...');
  const query = `*[_type == "project" && count(projectLinks) > 0] {
    "id": slug.current,
    "links": projectLinks[] {
      "target": target->slug.current,
      relationship
    }
  }`;
  const rawData = await sanityClient.fetch(query);

  const links = rawData.flatMap(project =>
    (project.links ?? [])
      .filter(link => link.target && link.relationship)
      .map(link => ({
        source: project.id,
        target: link.target,
        relationship: link.relationship,
      }))
  );

  console.log(`✅ Fetched ${links.length} system map links`);
  return links;
}

/**
 * Fetch personal info singleton from Sanity CMS via GROQ.
 * Uses fixed documentId 'personalInfo' — only one document can exist.
 * GROQ aliases `items` back to `skills` for each skill category.
 */
async function fetchPersonalInfo() {
  console.log('📡 Fetching personal info (Sanity)...');
  const query = `*[_type == "personalInfo" && _id == "personalInfo"][0] {
    name, email, location, tagline, bio, expectedGraduation,
    "headshotUrl": headshot.asset->url,
    socialLinks[] { key, url, displayUrl, icon, label, color },
    calendlyUrl,
    "resumeUrl": resume.asset->url,
    introduction,
    journey,
    vision,
    skills[] { category, icon, "skills": items, color },
    certifications[] { name, issuer, year, description }
  }`;
  const data = await sanityClient.fetch(query);
  console.log('✅ Fetched personal info');
  return data;
}

/**
 * Fetch blog posts from Sanity CMS via GROQ.
 * Converts Portable Text body to HTML with custom renderers for images,
 * code blocks, and callout boxes. Auto-calculates read time from body text.
 */
async function fetchBlogPosts() {
  console.log('📡 Fetching blog posts (Sanity)...');

  const query = `*[_type == "blogPost"] | order(publishedAt desc) {
    "id": slug.current,
    title,
    "publish_date": publishedAt,
    published,
    excerpt,
    tags,
    "coverImage": coverImage { alt, caption, asset, crop, hotspot },
    "body": body[] { ..., asset, crop, hotspot },
    "related_projects": relatedProjects[]->slug.current
  }`;

  const rawPosts = await sanityClient.fetch(query);

  const { toHTML } = await import('@portabletext/to-html');

  const CALLOUT_EMOJIS = { insight: '💡', warning: '⚠️', tip: '✅', info: 'ℹ️' };

  const posts = rawPosts.map(rawPost => {
    const cover_image = rawPost.coverImage?.asset?._ref ? {
      url: urlFor(rawPost.coverImage).width(1200).auto('format').quality(90).url(),
      thumbnail_url: urlFor(rawPost.coverImage).width(600).auto('format').quality(85).url(),
      alt: rawPost.coverImage.alt ?? '',
    } : null;

    const wordCount = (rawPost.body ?? [])
      .filter(block => block._type === 'block')
      .flatMap(block => block.children ?? [])
      .map(span => span.text ?? '')
      .join(' ')
      .split(/\s+/)
      .filter(Boolean)
      .length;
    const read_time = Math.ceil(wordCount / 200) || 1;

    const content = rawPost.body
      ? toHTML(rawPost.body, {
          components: {
            types: {
              image: ({ value }) => {
                if (!value?.asset?._ref) return '';
                const src = urlFor(value).width(800).auto('format').quality(85).url();
                const alt = sanitizeAttr(value.alt);
                const caption = sanitizeAttr(value.caption);
                if (caption) {
                  return `<figure><img src="${src}" alt="${alt}" /><figcaption>${caption}</figcaption></figure>`;
                }
                return `<figure><img src="${src}" alt="${alt}" /></figure>`;
              },
              codeBlock: ({ value }) => {
                const language = sanitizeAttr(value.language ?? 'other');
                const escaped = (value.code ?? '')
                  .replace(/&/g, '&amp;')
                  .replace(/</g, '&lt;')
                  .replace(/>/g, '&gt;');
                return `<pre class="code-block language-${language}"><code>${escaped}</code></pre>`;
              },
              callout: ({ value }) => {
                const variant = sanitizeAttr(value.variant ?? 'info');
                const emoji = CALLOUT_EMOJIS[value.variant ?? 'info'] ?? 'ℹ️';
                const body = sanitizeAttr(value.content);
                return `<div class="callout callout-${variant}"><span class="callout-icon">${emoji}</span><div class="callout-body">${body}</div></div>`;
              },
            },
          },
        })
      : '';

    return {
      id: rawPost.id,
      title: rawPost.title,
      publish_date: rawPost.publish_date,
      published: rawPost.published,
      excerpt: rawPost.excerpt ?? '',
      tags: rawPost.tags ?? [],
      cover_image,
      content,
      read_time,
      related_projects: rawPost.related_projects ?? [],
    };
  });

  console.log(`✅ Fetched ${posts.length} blog posts`);
  return posts;
}

/**
 * Convert icon strings to import statements
 */
function generateIconImports(data) {
  const icons = new Set();
  data.forEach(item => {
    if (item.icon) icons.add(item.icon);
  });
  return Array.from(icons).sort();
}

/**
 * Generate constants.js file content
 */
function generateConstantsFile(projects, workExperience, education, blogPosts, systemMapLinks, personalInfo) {
  const info = personalInfo || {};
  const timestamp = new Date().toISOString();

  // Reconstruct keyed SOCIAL_LINKS object from Sanity array
  const SOCIAL_LINKS = {};
  (info.socialLinks || []).forEach(link => {
    SOCIAL_LINKS[link.key.toLowerCase()] = {
      url: link.url,
      displayUrl: link.displayUrl,
      icon: link.icon,
      label: link.label,
      color: link.color,
    };
  });

  // Reconstruct keyed SKILLS object from Sanity array
  const SKILLS = {};
  (info.skills || []).forEach(cat => {
    SKILLS[cat.category] = {icon: cat.icon, skills: cat.skills, color: cat.color};
  });

  const PERSONAL_INFO = {
    name: info.name || '',
    email: info.email || '',
    location: info.location || '',
    tagline: info.tagline || '',
    bio: info.bio || '',
    expectedGraduation: info.expectedGraduation || '',
    headshotUrl: info.headshotUrl || '/headshot.jpg',
  };

  // Derive CONTACT_INFO from PERSONAL_INFO and SOCIAL_LINKS
  const linkedinLink = SOCIAL_LINKS.linkedin || {};
  const githubLink = SOCIAL_LINKS.github || {};
  const CONTACT_INFO = [
    {
      icon: 'Mail',
      label: 'Email',
      value: PERSONAL_INFO.email,
      href: `mailto:${PERSONAL_INFO.email}`,
      color: 'text-blue-500',
    },
    {
      icon: 'MapPin',
      label: 'Location',
      value: PERSONAL_INFO.location,
      href: null,
      color: 'text-green-500',
    },
    ...(linkedinLink.url ? [{
      icon: linkedinLink.icon,
      label: linkedinLink.label,
      value: linkedinLink.displayUrl,
      href: linkedinLink.url,
      color: linkedinLink.color,
    }] : []),
    ...(githubLink.url ? [{
      icon: githubLink.icon,
      label: githubLink.label,
      value: githubLink.displayUrl,
      href: githubLink.url,
      color: githubLink.color,
    }] : []),
  ];

  const baseIcons = generateIconImports([...projects, ...workExperience, ...education]);
  const contactIcons = CONTACT_INFO.map(item => item.icon).filter(Boolean);
  const uniqueIcons = [...new Set([...baseIcons, ...contactIcons])].sort();

  return `/**
 * AUTO-GENERATED FILE - DO NOT EDIT MANUALLY
 * Generated: ${timestamp}
 * Source: Sanity CMS
 *
 * This file is automatically generated by scripts/fetch-data.js
 * Run 'npm run fetch-data' to regenerate
 */

import { ${uniqueIcons.join(', ')} } from 'lucide-react';

// ============================================
// PERSONAL INFORMATION (from Sanity CMS)
// ============================================

export const PERSONAL_INFO = ${JSON.stringify(PERSONAL_INFO, null, 2)};

export const SOCIAL_LINKS = ${JSON.stringify(SOCIAL_LINKS, null, 2)};

export const EXTERNAL_LINKS = {
  calendly: ${JSON.stringify(info.calendlyUrl || 'https://calendly.com/vineethkirandumkara')},
  resume: ${JSON.stringify(info.resumeUrl || '')}
};

export const PERSONAL_STORY = {
  introduction: ${JSON.stringify(info.introduction || '')},
  journey: ${JSON.stringify(info.journey || [], null, 2)},
  vision: ${JSON.stringify(info.vision || '')}
};

export const SKILLS = ${JSON.stringify(SKILLS, null, 2)};

// ============================================
// DYNAMIC DATA (Fetched from Sanity CMS)
// ============================================

export const PROJECTS = ${JSON.stringify(projects.map(p => ({
    ...p,
    icon: p.icon
  })), null, 2).replace(/"icon":\s*"(\w+)"/g, 'icon: $1')};

export const WORK_EXPERIENCE = ${JSON.stringify(workExperience.map(w => ({
    ...w,
    icon: w.icon
  })), null, 2).replace(/"icon":\s*"(\w+)"/g, 'icon: $1')};

export const EDUCATION = ${JSON.stringify(education.map(e => ({
    ...e,
    highlights: e.highlights ?? [],
    icon: e.icon
  })), null, 2).replace(/"icon":\s*"(\w+)"/g, 'icon: $1')};

export const BLOG_POSTS = ${JSON.stringify(blogPosts, null, 2)};

export const SYSTEM_MAP_LINKS = ${JSON.stringify(systemMapLinks, null, 2)};

// ============================================
// DERIVED DATA
// ============================================

export const TIMELINE_DATA = [
  ...EDUCATION,
  ...WORK_EXPERIENCE
].sort((a, b) => {
  const getStartYear = (item) => item.start_year || parseInt(item.year?.split('–')[0] || item.year?.split('-')[0] || 0);
  return getStartYear(b) - getStartYear(a);
});

export const CONTACT_INFO = ${JSON.stringify(CONTACT_INFO, null, 2).replace(/"icon":\s*"(\w+)"/g, 'icon: $1')};

export const CERTIFICATIONS = ${JSON.stringify(info.certifications || [], null, 2)};
`;
}

/**
 * Main execution
 */
async function main() {
  console.log('🚀 Starting data fetch...\n');

  try {
    // Fetch all data in parallel from Sanity
    const [projects, workExperience, education, blogPosts, systemMapLinks, personalInfo] = await Promise.all([
      fetchProjects(),
      fetchWorkExperience(),
      fetchEducation(),
      fetchBlogPosts(),
      fetchSystemMapLinks(),
      fetchPersonalInfo(),
    ]);

    // Download headshot and replace private CDN URL with local static path
    if (personalInfo?.headshotUrl) {
      const headshotPath = path.join(__dirname, '..', 'public', 'headshot.jpg');
      console.log('⬇️  Downloading headshot...');
      await downloadFile(personalInfo.headshotUrl, headshotPath, SANITY_TOKEN);
      personalInfo.headshotUrl = '/headshot.jpg';
      console.log('   ✅ Saved to public/headshot.jpg');
    }

    // Download STL files and replace private CDN URLs with local static paths
    const modelsDir = path.join(__dirname, '..', 'public', 'models');
    if (!fs.existsSync(modelsDir)) fs.mkdirSync(modelsDir, { recursive: true });
    for (const project of projects) {
      if (project.cad_model_url) {
        const localPath = path.join(modelsDir, `${project.id}.stl`);
        console.log(`⬇️  Downloading CAD model for ${project.id}...`);
        await downloadFile(project.cad_model_url, localPath, SANITY_TOKEN);
        project.cad_model_url = `/models/${project.id}.stl`;
        console.log(`   ✅ Saved to public/models/${project.id}.stl`);
      }
    }

    console.log('\n📝 Generating constants.jsx...');

    // Sort all data by start year descending (blog posts are pre-sorted by publishedAt in GROQ)
    projects.sort(byStartYearDesc);
    workExperience.sort(byStartYearDesc);
    education.sort(byStartYearDesc);

    const content = generateConstantsFile(
      projects,
      workExperience,
      education,
      blogPosts,
      systemMapLinks,
      personalInfo
    );

    const outputPath = path.join(__dirname, '..', 'src', 'data', 'constants.js');
    fs.writeFileSync(outputPath, content, 'utf8');

    console.log(`✅ Successfully generated: ${outputPath}`);
    console.log('\n📊 Summary:');
    console.log(`   - Projects: ${projects.length}`);
    console.log(`   - Work Experience: ${workExperience.length}`);
    console.log(`   - Education: ${education.length}`);
    console.log(`   - Blog Posts: ${blogPosts.length}`);
    console.log(`   - System Map Links: ${systemMapLinks.length}`);
    console.log(`   - Personal Info: ${personalInfo ? 'loaded' : 'missing'}`);
    console.log('\n✨ Done!\n');

  } catch (error) {
    console.error('\n❌ Fatal error:', error.message);
    process.exit(1);
  }
}

// Run the script
main();
