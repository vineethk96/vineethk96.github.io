// Load environment variables from .env.local
require('dotenv').config({ path: '.env.local' });

const fs = require('fs');
const path = require('path');
const { createClient } = require('@sanity/client');
const imageUrlBuilder = require('@sanity/image-url');

// Configuration (loaded from .env.local or environment)
const SUPABASE_PROJECT_URL = process.env.SUPABASE_URL || 'https://xxxxxxxxxxxxx.supabase.co';
const SUPABASE_AUTH = process.env.SUPABASE_AUTH;
const SUPABASE_APIKEY = process.env.SUPABASE_APIKEY;
const SANITY_TOKEN = process.env.SANITY_TOKEN;

// Validate environment variables
if (!SUPABASE_AUTH || !SUPABASE_APIKEY || !SANITY_TOKEN) {
  console.error('❌ Error: SUPABASE_AUTH, SUPABASE_APIKEY, and SANITY_TOKEN environment variables are required');
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

// Edge Function endpoints
const ENDPOINTS = {
  blogPosts: `${SUPABASE_PROJECT_URL}/functions/v1/get-blog-posts`,
};

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
 * Fetch data from a Supabase Edge Function with retry and timeout.
 */
async function fetchFromSupabase(endpoint, name, retries = 3) {
  const headers = {
    'Authorization': SUPABASE_AUTH,
    'apikey': SUPABASE_APIKEY,
    'Content-Type': 'application/json'
  };

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      console.log(`📡 Fetching ${name}${attempt > 1 ? ` (attempt ${attempt})` : ''}...`);
      const response = await fetch(endpoint, {
        headers,
        signal: AbortSignal.timeout(10_000)
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP ${response.status}: ${response.statusText}\n${errorText}`);
      }

      const data = await response.json();
      console.log(`✅ Fetched ${data.length || 0} ${name}`);
      return data;
    } catch (error) {
      if (attempt === retries) {
        console.error(`❌ Error fetching ${name} after ${retries} attempts:`, error.message);
        throw error;
      }
      const delay = 1000 * 2 ** (attempt - 1); // exponential backoff: 1s, 2s
      console.warn(`⚠️  Attempt ${attempt} failed for ${name}, retrying in ${delay}ms...`);
      await new Promise(r => setTimeout(r, delay));
    }
  }
}

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
 * Source: Supabase Edge Functions
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
  introduction: "I'm an embedded systems engineer transitioning to IoT architecture and product design. My journey spans from low-level firmware to cloud-connected systems, with a passion for creating technology that scales from prototype to mass market.",
  journey: [
    "My path in technology began with a fascination for how things work at the most fundamental level. During my computer engineering studies at Virginia Tech, I dove deep into embedded systems, digital design, and the intricate dance between hardware and software.",
    "Over the past five years, I've worked across various startups and established companies, building everything from UAV control systems to battery safety monitors. Each role has expanded my perspective from component-level optimization to system-level architecture.",
    "Now, pursuing my MSc in Connected Environments at UCL, I'm focused on the bigger picture: how connected devices can create meaningful experiences for people and communities. I'm passionate about bridging the gap between technical capability and human need, designing IoT systems that are not just functional, but truly valuable at scale."
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
    // Fetch all data in parallel (education + work experience + projects + system map links from Sanity, blog posts from Supabase)
    const [projects, workExperience, education, blogPosts, systemMapLinks] = await Promise.all([
      fetchProjects(),
      fetchWorkExperience(),
      fetchEducation(),
      fetchFromSupabase(ENDPOINTS.blogPosts, 'blog posts'),
      fetchSystemMapLinks(),
    ]);

    console.log('\n📝 Generating constants.js...');

    // Sort all data by start year descending
    projects.sort(byStartYearDesc);
    workExperience.sort(byStartYearDesc);
    education.sort(byStartYearDesc);
    blogPosts.sort(byStartYearDesc);

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
