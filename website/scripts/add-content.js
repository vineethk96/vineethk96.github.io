#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const question = (query) => new Promise((resolve) => rl.question(query, resolve));

const CONSTANTS_PATH = path.join(__dirname, '../src/data/constants.js');

// Icon mappings for different categories
const ICON_MAPPINGS = {
  project: {
    'IoT': 'Cpu',
    'Web Development': 'Globe',
    'Mobile': 'Smartphone',
    'Hardware': 'Zap',
    'AI/ML': 'Brain',
    'Cloud': 'Cloud',
    'Data': 'Database'
  },
  prototype: {
    'hardware': 'Zap',
    'software': 'Code',
    'design': 'Lightbulb'
  },
  blog: {
    'IoT Architecture': 'Building',
    'Urban IoT': 'Cpu',
    'Design Process': 'Lightbulb',
    'Research': 'BookOpen'
  }
};

const COLOR_MAPPINGS = {
  project: [
    'from-blue-500 to-purple-600',
    'from-green-500 to-teal-600',
    'from-purple-500 to-pink-600',
    'from-orange-500 to-red-600',
    'from-indigo-500 to-blue-600',
    'from-pink-500 to-rose-600',
    'from-teal-500 to-cyan-600',
    'from-yellow-500 to-orange-600'
  ]
};

function generateId(title) {
  return title.toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\s+/g, '-')
    .substring(0, 50);
}

function getCurrentYear() {
  return new Date().getFullYear().toString();
}

function getCurrentDate() {
  const now = new Date();
  return now.toISOString().split('T')[0];
}

function formatDateForPrototype() {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
}

async function addProject() {
  console.log('\n=== Adding New Project ===\n');
  
  const title = await question('Project title: ');
  const description = await question('Brief description: ');
  const detailedDescription = await question('Detailed description (optional): ');
  const category = await question('Category (IoT/Web Development/Mobile/Hardware/AI/ML/Cloud/Data): ');
  const year = await question(`Year (${getCurrentYear()}): `) || getCurrentYear();
  const status = await question('Status (Completed/In Progress/Planning): ');
  const tags = await question('Tags (comma-separated): ');
  const technologies = await question('Technologies used (comma-separated): ');
  const github = await question('GitHub URL (optional): ');
  const demo = await question('Demo URL (optional): ');
  // For SystemMap
  const includeInMap = await question('Include in SystemMap? (y/n): ');
  let map_color = '';
  let mapSize = '';
  if (includeInMap.toLowerCase() === 'y') {
    map_color = await question('Map node color (hex, e.g., #3b82f6): ');
    mapSize = await question('Map node size (15-25): ') || '20';
  }

  const id = generateId(title);
  const icon = ICON_MAPPINGS.project[category] || 'Cpu';
  const colorIndex = Math.floor(Math.random() * COLOR_MAPPINGS.project.length);
  const color = COLOR_MAPPINGS.project[colorIndex];

  const projectData = {
    id,
    title,
    description,
    ...(detailedDescription && { detailedDescription }),
    category,
    year,
    status,
    tags: tags.split(',').map(tag => tag.trim()).filter(Boolean),
    technologies: technologies.split(',').map(tech => tech.trim()).filter(Boolean),
    icon,
    color,
    ...(map_color && { map_color }),
    ...(mapSize && { mapSize: parseInt(mapSize) }),
    ...(github && { github }),
    ...(demo && { demo }),
    images: [
      {
        url: `/projCovers/${id}-cover.jpg`,
        alt: `${title} - Project Cover`,
        caption: 'Project overview'
      }
    ],
  };

  return { type: 'project', data: projectData };
}

async function addPrototype() {
  console.log('\n=== Adding New Prototype ===\n');
  
  const title = await question('Prototype title: ');
  const description = await question('Brief description: ');
  const detailedDescription = await question('Detailed description (optional): ');
  const category = await question('Category (hardware/software/design): ');
  const date = await question(`Date (${formatDateForPrototype()}): `) || formatDateForPrototype();
  const tags = await question('Tags (comma-separated): ');
  const notes = await question('Lab notes: ');
  const materials = await question('Materials used (comma-separated): ');
  const testResults = await question('Test results (optional): ');

  const id = generateId(title);

  const prototypeData = {
    id,
    title,
    description,
    ...(detailedDescription && { detailedDescription }),
    category,
    date,
    tags: tags.split(',').map(tag => tag.trim()).filter(Boolean),
    notes,
    materials: materials.split(',').map(material => material.trim()).filter(Boolean),
    images: [
      {
        url: `/prototypes/${id}-image.jpg`,
        alt: `${title} - Prototype Image`,
        caption: 'Lab setup'
      }
    ],
    ...(testResults && { testResults })
  };

  return { type: 'prototype', data: prototypeData };
}

async function addBlogPost() {
  console.log('\n=== Adding New Blog Post ===\n');
  
  const title = await question('Blog post title: ');
  const excerpt = await question('Brief excerpt: ');
  const description = await question('Longer description (optional): ');
  const category = await question('Category (IoT Architecture/Urban IoT/Design Process/Research): ');
  const readTime = await question('Read time (e.g., "5 min read"): ');
  const author = await question('Author (Vineeth Kirandumkara): ') || 'Vineeth Kirandumkara';
  const tags = await question('Tags (comma-separated): ');
  const hasContent = await question('Do you have HTML content to add? (y/n): ');
  let content = '';
  if (hasContent.toLowerCase() === 'y') {
    content = await question('HTML content: ');
  }

  const id = generateId(title);
  const date = getCurrentDate();

  const blogData = {
    id,
    title,
    excerpt,
    ...(description && { description }),
    ...(content && { content }),
    date,
    readTime,
    category,
    author,
    tags: tags.split(',').map(tag => tag.trim()).filter(Boolean),
    images: [
      {
        url: `/blog/${id}-featured.jpg`,
        alt: `${title} - Featured Image`,
        caption: 'Blog post featured image'
      }
    ]
  };

  return { type: 'blog', data: blogData };
}

function readConstantsFile() {
  try {
    const content = fs.readFileSync(CONSTANTS_PATH, 'utf8');
    return content;
  } catch (error) {
    console.error('Error reading constants file:', error.message);
    process.exit(1);
  }
}

function writeConstantsFile(content) {
  try {
    fs.writeFileSync(CONSTANTS_PATH, content, 'utf8');
    console.log('✅ Constants file updated successfully!');
  } catch (error) {
    console.error('Error writing constants file:', error.message);
    process.exit(1);
  }
}

function addToConstantsFile(newItem) {
  let content = readConstantsFile();
  
  const arrayName = newItem.type === 'project' ? 'PROJECTS' : 
                   newItem.type === 'prototype' ? 'PROTOTYPES' : 'BLOG_POSTS';
  
  // Find the array in the file
  const arrayRegex = new RegExp(`export const ${arrayName} = \\[([\\s\\S]*?)\\];`, 'm');
  const match = content.match(arrayRegex);
  
  if (!match) {
    console.error(`Could not find ${arrayName} array in constants file`);
    process.exit(1);
  }
  
  // Convert the new item to a formatted string
  const itemString = JSON.stringify(newItem.data, null, 2)
    .replace(/"(\w+)":/g, '$1:') // Remove quotes from keys
    .replace(/"/g, "'") // Use single quotes
    .replace(/'(from-[\w-]+\s+to-[\w-]+)'/g, "'$1'") // Keep gradient strings quoted
    .replace(/'(\w+)'/g, (match, p1) => {
      // Don't quote icon names, but keep other strings quoted
      if (['Cpu', 'Globe', 'Smartphone', 'Zap', 'Brain', 'Cloud', 'Database', 'Code', 'Lightbulb', 'Building', 'BookOpen'].includes(p1)) {
        return p1;
      }
      return match;
    });
  
  // Add the new item to the array
  const existingItems = match[1].trim();
  const newArray = existingItems ? 
    `[\n${existingItems},\n  ${itemString}\n]` :
    `[\n  ${itemString}\n]`;
  
  content = content.replace(arrayRegex, `export const ${arrayName} = ${newArray};`);
  
  writeConstantsFile(content);
}

async function main() {
  console.log('Portfolio Content Manager');
  console.log('========================');
  
  const contentType = await question('\nWhat would you like to add?\n1. Project\n2. Prototype\n3. Blog Post\n\nEnter choice (1-3): ');
  
  let newItem;
  
  switch (contentType) {
    case '1':
      newItem = await addProject();
      break;
    case '2':
      newItem = await addPrototype();
      break;
    case '3':
      newItem = await addBlogPost();
      break;
    default:
      console.log('Invalid choice. Exiting.');
      process.exit(1);
  }
  
  console.log('\n=== Preview ===');
  console.log(JSON.stringify(newItem.data, null, 2));
  
  const confirm = await question('\nAdd this item to the portfolio? (y/n): ');
  
  if (confirm.toLowerCase() === 'y') {
    addToConstantsFile(newItem);
    
    console.log('\n=== Next Steps ===');
    console.log(`1. Add images to the appropriate directory:`);
    if (newItem.type === 'project') {
      console.log(`   - public/projCovers/${newItem.data.id}-cover.jpg`);
    } else if (newItem.type === 'prototype') {
      console.log(`   - public/prototypes/${newItem.data.id}-image.jpg`);
    } else {
      console.log(`   - public/blog/${newItem.data.id}-featured.jpg`);
    }
    console.log('2. Test the new content in your development server');
    console.log('3. Commit and deploy your changes');
    
    if (newItem.type === 'project' && newItem.data.map_color) {
      console.log('\n💡 Tip: You can add SystemMap connections by editing SYSTEM_MAP_LINKS in constants.js');
    }
  } else {
    console.log('Operation cancelled.');
  }
  
  rl.close();
}

if (require.main === module) {
  main().catch(console.error);
}
