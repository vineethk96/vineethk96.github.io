// Load environment variables from .env.local
require('dotenv').config({ path: '.env.local' });

const fs = require('fs');
const path = require('path');
const { createClient } = require('@sanity/client');
const imageUrlBuilder = require('@sanity/image-url');

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
      asset
    },
    images[] {
      alt,
      caption,
      asset
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
                const src = urlFor(value.asset).width(800).auto('format').quality(85).url();
                const alt = value.alt ?? '';
                const caption = value.caption ?? '';
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
        original_url: urlFor(img.asset).url(),
        url: urlFor(img.asset).width(1200).auto('format').quality(90).url(),
        medium_url: urlFor(img.asset).width(600).auto('format').quality(85).url(),
        thumbnail_url: urlFor(img.asset).width(300).auto('format').quality(75).url(),
      };
    }).filter(Boolean);

    const { detailedDescription: _pt, ...rest } = project;

    return {
      ...rest,
      year,
      detailed_description,
      images,
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
    "coverImage": coverImage { alt, caption, asset },
    "body": body[] { ..., asset },
    "related_projects": relatedProjects[]->slug.current
  }`;

  const rawPosts = await sanityClient.fetch(query);

  const { toHTML } = await import('@portabletext/to-html');

  const CALLOUT_EMOJIS = { insight: '💡', warning: '⚠️', tip: '✅', info: 'ℹ️' };

  const posts = rawPosts.map(rawPost => {
    const cover_image = rawPost.coverImage?.asset?._ref ? {
      url: urlFor(rawPost.coverImage.asset).width(1200).auto('format').quality(90).url(),
      thumbnail_url: urlFor(rawPost.coverImage.asset).width(600).auto('format').quality(85).url(),
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
                const src = urlFor(value.asset).width(800).auto('format').quality(85).url();
                const alt = value.alt ?? '';
                const caption = value.caption ?? '';
                if (caption) {
                  return `<figure><img src="${src}" alt="${alt}" /><figcaption>${caption}</figcaption></figure>`;
                }
                return `<figure><img src="${src}" alt="${alt}" /></figure>`;
              },
              codeBlock: ({ value }) => {
                const language = value.language ?? 'other';
                const escaped = (value.code ?? '')
                  .replace(/&/g, '&amp;')
                  .replace(/</g, '&lt;')
                  .replace(/>/g, '&gt;');
                return `<pre class="code-block language-${language}"><code>${escaped}</code></pre>`;
              },
              callout: ({ value }) => {
                const variant = value.variant ?? 'info';
                const emoji = CALLOUT_EMOJIS[variant] ?? 'ℹ️';
                const body = value.content ?? '';
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
function generateConstantsFile(projects, workExperience, education, blogPosts, systemMapLinks) {
  const allIcons = generateIconImports([...projects, ...workExperience, ...education]);
  const timestamp = new Date().toISOString();

  // Hardcoded personal data
  const PERSONAL_INFO = {
    name: 'Vineeth Kirandumkara',
    email: 'vineethkirandumkara+portfolio@gmail.com',
    location: 'London, UK',
    tagline: 'IoT Systems Engineer & Connected Product Designer',
    bio: 'Passionate about creating intelligent, connected systems that bridge the physical and digital worlds.',
    expectedGraduation: 'Summer 2025'
  };

  const SOCIAL_LINKS = {
    linkedin: {
      url: 'https://www.linkedin.com/in/vineeth-kirandumkara-3b322924',
      displayUrl: 'linkedin.com/in/vineeth-kirandumkara',
      icon: 'Linkedin',
      label: 'LinkedIn',
      color: 'text-blue-600'
    },
    github: {
      url: 'https://github.com/vineethk96',
      displayUrl: 'github.com/vineethk96',
      icon: 'Github',
      label: 'GitHub',
      color: 'text-gray-700 dark:text-gray-300'
    }
  };

  // Derive CONTACT_INFO from PERSONAL_INFO and SOCIAL_LINKS
  const CONTACT_INFO = [
    {
      icon: 'Mail',
      label: 'Email',
      value: PERSONAL_INFO.email,
      href: `mailto:${PERSONAL_INFO.email}`,
      color: 'text-blue-500'
    },
    {
      icon: 'MapPin',
      label: 'Location',
      value: PERSONAL_INFO.location,
      href: null,
      color: 'text-green-500'
    },
    {
      icon: SOCIAL_LINKS.linkedin.icon,
      label: SOCIAL_LINKS.linkedin.label,
      value: SOCIAL_LINKS.linkedin.displayUrl,
      href: SOCIAL_LINKS.linkedin.url,
      color: SOCIAL_LINKS.linkedin.color
    },
    {
      icon: SOCIAL_LINKS.github.icon,
      label: SOCIAL_LINKS.github.label,
      value: SOCIAL_LINKS.github.displayUrl,
      href: SOCIAL_LINKS.github.url,
      color: SOCIAL_LINKS.github.color
    }
  ];

  return `/**
 * AUTO-GENERATED FILE - DO NOT EDIT MANUALLY
 * Generated: ${timestamp}
 * Source: Sanity CMS
 *
 * This file is automatically generated by scripts/fetch-data.js
 * Run 'npm run fetch-data' to regenerate
 */

import { ${allIcons.join(', ')} } from 'lucide-react';

// ============================================
// PERSONAL INFORMATION (Hardcoded - rarely changes)
// ============================================

export const PERSONAL_INFO = ${JSON.stringify(PERSONAL_INFO, null, 2)};

export const SOCIAL_LINKS = ${JSON.stringify(SOCIAL_LINKS, null, 2)};

export const EXTERNAL_LINKS = {
  calendly: 'https://calendly.com/vineethk96',
  resume: '/vineethCV.pdf'
};

export const PERSONAL_STORY = {
  introduction: "I’m an embedded systems engineer and creative technologist who builds connected products that bridge rigorous hardware and software with thoughtful, human-centered experiences.",
  journey: [
    "My path into this space began in high school, where joining the robotics team let me explore how things work at a fundamental level. From designing robot components in Autodesk Inventor to programming in LabVIEW, I discovered how much I enjoyed developing mechatronic systems that solve complex, tangible challenges. That curiosity led me to pursue a Bachelor’s in Computer Engineering at Virginia Tech, where I deepened my understanding of embedded systems and electronics and was first exposed to product development and design principles that emphasized user experience alongside technical craft.",
    "Discovering the Industrial Design program at Virginia Tech opened my eyes to how interaction, form, and usability shape the way people relate to technology. That blend of design thinking and embedded engineering eventually led me to the Connected Environments MSc at University College London’s Bartlett School of Architecture (UCL), where I could formally explore the intersection of the Internet of Things (IoT), AI, product prototyping, and deployment. By the time I joined the program, I had already spent around five years working at startups and engineering teams, leading tasks such as refactoring the entire codebase for a world-record‑breaking UAV (Vanilla Unmanned) to cut memory usage by 50% and improve processing speed by 40%, and creating automated PCB test suites that ran on thousands of boards in manufacturing. During the MSc, I worked on projects like Lumos (an interactive light wall I designed and built end to end, from CAD and wiring to firmware and testing) and Hot Stone, (where I owned the electronics, firmware, networking, and testing for a modernist sculptural piece that lets people share the warmth of holding a loved one’s hand from afar).",
    "The program culminated in a Distinction-grade dissertation that used low-cost ultrasonic anemometers to quantify the urban canyon effect. I designed and prototyped the sensing system to measure wind through dense urban corridors, showing how affordable sensors can help map where small-scale turbines could be placed for more effective, democratized clean energy generation. That project brought together my interests in embedded systems, environmental sensing, urban environments, and using connected devices to tackle real-world sustainability challenges. It also reinforced my belief that powerful tools don’t need to be expensive to make a meaningful impact.",
    "Across my career and side projects, my skill set has become both broad and deep: from Python automation scripts that aggregate data across thousands of sources, to embedded drivers and firmware for medical and industrial devices, to IoT prototypes that connect people across distance and mobile apps that support everyday experiences like planning a trip. What ties these efforts together is a consistent focus on thoughtful system architecture, robust implementation, and the quality of the interaction people have with the final product. My strongest contributions are in IoT, product prototyping, architecting reliable connected systems end to end, and shaping interactions that make complex technology feel intuitive and human. With all of this under my belt, I’m now focused on the bigger picture: how connected devices can create meaningful experiences for people and their communities, whether in healthcare, urban environments, sustainability, or the everyday spaces where we live and work."
  ],
  vision: "I'm excited to join teams that are building the next generation of connected products. My goal is to work at the intersection of IoT systems, product design, and user experience, creating technology that seamlessly integrates into people's lives and scales to serve millions of users worldwide."
};

export const SKILLS = {
  'Embedded Systems': {
    icon: 'Zap',
    skills: ['C/C++', 'FreeRTOS', 'ESP32/Arduino', 'PCB Design', 'Signal Processing'],
    color: 'text-blue-500'
  },
  'IoT & Cloud': {
    icon: 'Globe',
    skills: ['MQTT', 'AWS/Cloud Services', 'REST APIs', 'Data Analytics', 'System Architecture'],
    color: 'text-green-500'
  },
  'Software Development': {
    icon: 'Code',
    skills: ['Python', 'JavaScript/React', 'Flutter', 'Git', 'Agile/Scrum'],
    color: 'text-purple-500'
  },
  'Design & Prototyping': {
    icon: 'Target',
    skills: ['Product Design', 'User Research', 'CAD/3D Modeling', 'Rapid Prototyping', 'UI/UX'],
    color: 'text-pink-500'
  }
};

// ============================================
// DYNAMIC DATA (Fetched from Supabase)
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

export const CONTACT_INFO = ${JSON.stringify(CONTACT_INFO, null, 2)};

// Certifications
export const CERTIFICATIONS = [
  {
    name: 'Autodesk Inventor Professional',
    issuer: 'Autodesk',
    year: '2019',
    description: 'Advanced 3D CAD design and mechanical engineering'
  }
];
`;
}

/**
 * Main execution
 */
async function main() {
  console.log('🚀 Starting data fetch...\n');

  try {
    // Fetch all data in parallel from Sanity
    const [projects, workExperience, education, blogPosts, systemMapLinks] = await Promise.all([
      fetchProjects(),
      fetchWorkExperience(),
      fetchEducation(),
      fetchBlogPosts(),
      fetchSystemMapLinks(),
    ]);

    console.log('\n📝 Generating constants.js...');

    // Sort all data by start year descending (blog posts are pre-sorted by publishedAt in GROQ)
    projects.sort(byStartYearDesc);
    workExperience.sort(byStartYearDesc);
    education.sort(byStartYearDesc);

    const content = generateConstantsFile(
      projects,
      workExperience,
      education,
      blogPosts,
      systemMapLinks
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
    console.log('\n✨ Done!\n');

  } catch (error) {
    console.error('\n❌ Fatal error:', error.message);
    process.exit(1);
  }
}

// Run the script
main();
