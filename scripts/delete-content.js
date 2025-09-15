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

function extractArrayItems(content, arrayName) {
  const arrayRegex = new RegExp(`export const ${arrayName} = \\[([\\s\\S]*?)\\];`, 'm');
  const match = content.match(arrayRegex);
  
  if (!match) {
    console.error(`Could not find ${arrayName} array in constants file`);
    return [];
  }
  
  const arrayContent = match[1].trim();
  if (!arrayContent) {
    return [];
  }
  
  // Simple parsing to extract items with their IDs and titles
  const items = [];
  const itemRegex = /{\s*id:\s*['"`]([^'"`]+)['"`][^}]*title:\s*['"`]([^'"`]+)['"`][^}]*}/g;
  let itemMatch;
  
  while ((itemMatch = itemRegex.exec(arrayContent)) !== null) {
    items.push({
      id: itemMatch[1],
      title: itemMatch[2]
    });
  }
  
  return items;
}

function removeFromConstantsFile(contentType, itemId) {
  let content = readConstantsFile();
  
  const arrayName = contentType === 'project' ? 'PROJECTS' : 
                   contentType === 'prototype' ? 'PROTOTYPES' : 'BLOG_POSTS';
  
  // Find the array in the file
  const arrayRegex = new RegExp(`export const ${arrayName} = \\[([\\s\\S]*?)\\];`, 'm');
  const match = content.match(arrayRegex);
  
  if (!match) {
    console.error(`Could not find ${arrayName} array in constants file`);
    process.exit(1);
  }
  
  const arrayContent = match[1];
  
  // Find and remove the specific item
  const itemRegex = new RegExp(`\\s*{[^}]*id:\\s*['"\`]${itemId}['"\`][^}]*}[^}]*}(?:,\\s*)?`, 'gs');
  const updatedArrayContent = arrayContent.replace(itemRegex, '');
  
  // Clean up any trailing commas
  const cleanedContent = updatedArrayContent.replace(/,(\s*\])/, '$1');
  
  const newArrayString = `export const ${arrayName} = [${cleanedContent}];`;
  content = content.replace(arrayRegex, newArrayString);
  
  writeConstantsFile(content);
}

function removeFromSystemMapLinks(projectId) {
  let content = readConstantsFile();
  
  // Remove any SystemMap links that reference this project
  const linksRegex = /export const SYSTEM_MAP_LINKS = \[([\s\S]*?)\];/m;
  const match = content.match(linksRegex);
  
  if (match) {
    const linksContent = match[1];
    const updatedLinksContent = linksContent.replace(
      new RegExp(`\\s*{[^}]*(?:source|target):\\s*['"\`]${projectId}['"\`][^}]*}(?:,\\s*)?`, 'gs'),
      ''
    );
    
    const cleanedLinksContent = updatedLinksContent.replace(/,(\s*\])/, '$1');
    const newLinksString = `export const SYSTEM_MAP_LINKS = [${cleanedLinksContent}];`;
    content = content.replace(linksRegex, newLinksString);
    
    writeConstantsFile(content);
  }
}

async function listAndSelectContent(contentType) {
  const content = readConstantsFile();
  const arrayName = contentType === 'project' ? 'PROJECTS' : 
                   contentType === 'prototype' ? 'PROTOTYPES' : 'BLOG_POSTS';
  
  const items = extractArrayItems(content, arrayName);
  
  if (items.length === 0) {
    console.log(`No ${contentType}s found.`);
    return null;
  }
  
  console.log(`\n=== Available ${contentType.charAt(0).toUpperCase() + contentType.slice(1)}s ===`);
  items.forEach((item, index) => {
    console.log(`${index + 1}. ${item.title} (ID: ${item.id})`);
  });
  
  const choice = await question(`\nSelect ${contentType} to delete (1-${items.length}) or 'q' to quit: `);
  
  if (choice.toLowerCase() === 'q') {
    return null;
  }
  
  const index = parseInt(choice) - 1;
  if (index >= 0 && index < items.length) {
    return items[index];
  } else {
    console.log('Invalid selection.');
    return null;
  }
}

function getImagePaths(contentType, itemId) {
  const paths = [];
  
  if (contentType === 'project') {
    paths.push(`public/projCovers/${itemId}-cover.jpg`);
    paths.push(`public/projCovers/${itemId}-*.jpg`);
    paths.push(`public/projCovers/${itemId}-*.png`);
  } else if (contentType === 'prototype') {
    paths.push(`public/prototypes/${itemId}-image.jpg`);
    paths.push(`public/prototypes/${itemId}-*.jpg`);
    paths.push(`public/prototypes/${itemId}-*.png`);
  } else if (contentType === 'blog') {
    paths.push(`public/blog/${itemId}-featured.jpg`);
    paths.push(`public/blog/${itemId}-*.jpg`);
    paths.push(`public/blog/${itemId}-*.png`);
  }
  
  return paths;
}

async function main() {
  console.log('Portfolio Content Deletion Manager');
  console.log('==================================');
  
  const contentType = await question('\nWhat would you like to delete?\n1. Project\n2. Prototype\n3. Blog Post\n\nEnter choice (1-3): ');
  
  let type;
  switch (contentType) {
    case '1':
      type = 'project';
      break;
    case '2':
      type = 'prototype';
      break;
    case '3':
      type = 'blog';
      break;
    default:
      console.log('Invalid choice. Exiting.');
      process.exit(1);
  }
  
  const selectedItem = await listAndSelectContent(type);
  
  if (!selectedItem) {
    console.log('No item selected. Exiting.');
    rl.close();
    return;
  }
  
  console.log(`\n=== Selected for Deletion ===`);
  console.log(`Title: ${selectedItem.title}`);
  console.log(`ID: ${selectedItem.id}`);
  
  const confirm = await question('\n⚠️  Are you sure you want to delete this item? This cannot be undone. (y/n): ');
  
  if (confirm.toLowerCase() !== 'y') {
    console.log('Operation cancelled.');
    rl.close();
    return;
  }
  
  try {
    // Remove from constants file
    removeFromConstantsFile(type, selectedItem.id);
    
    // If it's a project, also remove from SystemMap links
    if (type === 'project') {
      removeFromSystemMapLinks(selectedItem.id);
    }
    
    console.log(`✅ ${selectedItem.title} has been removed from the portfolio.`);
    
    // Show image cleanup instructions
    const imagePaths = getImagePaths(type, selectedItem.id);
    console.log('\n=== Manual Cleanup Required ===');
    console.log('Please manually delete the following image files if they exist:');
    imagePaths.forEach(path => {
      console.log(`- ${path}`);
    });
    
    console.log('\n=== Next Steps ===');
    console.log('1. Delete the associated image files listed above');
    console.log('2. Test your changes in the development server');
    console.log('3. Commit and deploy your changes');
    
  } catch (error) {
    console.error('Error during deletion:', error.message);
    process.exit(1);
  }
  
  rl.close();
}

if (require.main === module) {
  main().catch(console.error);
}
