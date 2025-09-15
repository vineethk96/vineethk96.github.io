# Adding New Content to Portfolio

This guide explains how to add new projects, prototypes, and blog posts to the portfolio website.

## Table of Contents
- [Adding Projects](#adding-projects)
- [Adding Prototypes](#adding-prototypes)
- [Adding Blog Posts](#adding-blog-posts)
- [Image Management](#image-management)
- [SystemMap Configuration](#systemmap-configuration)

## Adding Projects

### 1. Add Project Data

Edit `src/data/constants.js` and add a new project to the `PROJECTS` array:

```javascript
{
  id: 'unique-project-id',
  title: 'Project Title',
  description: 'Brief description for project cards and listings',
  detailedDescription: 'Longer description for the detail page',
  category: 'IoT', // or 'Web Development', 'Mobile', etc.
  year: '2024',
  status: 'Completed', // 'Completed', 'In Progress', 'Planning'
  tags: ['React', 'IoT', 'Node.js'],
  technologies: ['React', 'Node.js', 'MongoDB', 'AWS'],
  icon: Cpu, // Import from lucide-react
  color: 'from-blue-500 to-purple-600',
  mapColor: '#3b82f6', // Color for SystemMap nodes
  mapSize: 20, // Size for SystemMap nodes (15-25 recommended)
  github: 'https://github.com/username/repo',
  demo: 'https://demo-url.com',
  images: [
    {
      url: '/path/to/image1.jpg',
      alt: 'Image description',
      caption: 'Optional caption'
    },
    {
      url: '/path/to/image2.jpg',
      alt: 'Image description',
      caption: 'Optional caption'
    }
  ],
  challenges: 'Technical challenges faced during development',
  solutions: 'How the challenges were solved',
  outcomes: 'Results and impact of the project',
  learnings: 'Key takeaways and lessons learned'
}
```

### 2. Update SystemMap Links (Optional)

If your project relates to other projects, add connections in the `SYSTEM_MAP_LINKS` array:

```javascript
{
  source: 'existing-project-id',
  target: 'new-project-id',
  relationship: 'evolution' // or 'foundation', 'integration', etc.
}
```

### 3. Add Images

Place project images in the `public/projCovers/` directory and reference them in the project data.

## Adding Prototypes

### 1. Add Prototype Data

Edit `src/data/constants.js` and add a new prototype to the `PROTOTYPES` array:

```javascript
{
  id: 'unique-prototype-id',
  title: 'Prototype Title',
  description: 'Brief description of the prototype',
  detailedDescription: 'Detailed explanation of the prototype development',
  category: 'hardware', // 'hardware', 'software', 'design'
  date: '2024-03',
  tags: ['Arduino', 'Sensors', 'IoT'],
  notes: 'Lab notes and observations',
  materials: ['Arduino Uno', 'Sensors', 'Breadboard'],
  images: [
    {
      url: '/path/to/prototype-image.jpg',
      alt: 'Prototype image',
      caption: 'Lab setup'
    }
  ],
  testResults: 'Results from testing and validation'
}
```

### 2. Navigation

Prototypes are automatically available in the Lab page. Users can click on prototype cards to view detailed information.

## Adding Blog Posts

### 1. Add Blog Post Data

Edit `src/data/constants.js` and add a new blog post to the `BLOG_POSTS` array:

```javascript
{
  id: 'unique-blog-id',
  title: 'Blog Post Title',
  excerpt: 'Brief excerpt that appears in blog listings',
  description: 'Longer description for the detail page',
  content: '<p>Full HTML content of the blog post</p>', // Optional
  date: '2024-12-15',
  readTime: '8 min read',
  category: 'IoT Architecture', // 'IoT Architecture', 'Urban IoT', 'Design Process', 'Research'
  author: 'Vineeth Kumar', // Optional, defaults to your name
  tags: ['IoT', 'Architecture', 'Scaling'],
  images: [
    {
      url: '/path/to/blog-image.jpg',
      alt: 'Blog featured image',
      caption: 'Image caption'
    }
  ]
}
```

### 2. Content Formatting

- Use HTML in the `content` field for rich formatting
- If no `content` is provided, a default template will be used
- Images will be displayed in a carousel at the top of the post

## Image Management

### Best Practices

1. **Image Sizes:**
   - Project covers: 800x400px recommended
   - Prototype images: 600x400px recommended
   - Blog images: 800x400px recommended

2. **File Formats:**
   - Use JPG for photographs
   - Use PNG for graphics with transparency
   - Use WebP for better compression (if supported)

3. **File Organization:**
   ```
   public/
   ├── projCovers/          # Project cover images
   ├── prototypes/          # Prototype images
   ├── blog/               # Blog post images
   └── images/             # General images
   ```

4. **Naming Convention:**
   - Use kebab-case: `project-name-cover.jpg`
   - Include descriptive names: `gesture-recognition-demo.jpg`

### Image Carousel Component

The `ImageCarousel` component is automatically used in all detail pages. It supports:
- Navigation arrows
- Thumbnail strip
- Modal view for full-size images
- Captions and alt text
- Responsive design

## SystemMap Configuration

### Node Appearance

Projects appear as nodes in the SystemMap if they have:
- `mapColor`: Color of the node
- `mapSize`: Size of the node (15-25 recommended)

### Relationships

Define relationships between projects in `SYSTEM_MAP_LINKS`:

```javascript
{
  source: 'project-a',
  target: 'project-b',
  relationship: 'evolution' // Determines link color and style
}
```

### Relationship Types

- `foundation`: Basic building blocks
- `evolution`: Natural progression
- `integration`: Combined technologies
- `iot-platform`: IoT-related connections
- `embedded-evolution`: Hardware progression
- `sensor-system`: Sensor-related projects
- `mobile-app`: Mobile applications
- `cloud-architecture`: Cloud services
- `systems-thinking`: System design approach

## Testing Your Changes

1. **Development Server:**
   ```bash
   npm start
   ```

2. **Check All Views:**
   - Home page featured projects
   - Projects page (both grid and map views)
   - Lab page prototypes
   - Blog page posts
   - Individual detail pages

3. **Test Navigation:**
   - Click on project cards
   - Click on SystemMap nodes
   - Use back buttons
   - Test image carousels

4. **Responsive Design:**
   - Test on mobile devices
   - Check tablet layouts
   - Verify desktop experience

## Deployment

After adding content:

1. **Build the site:**
   ```bash
   npm run build
   ```

2. **Deploy to GitHub Pages:**
   ```bash
   npm run deploy
   ```

## Troubleshooting

### Common Issues

1. **Images not loading:**
   - Check file paths are correct
   - Ensure images are in the `public` directory
   - Verify image file names match exactly

2. **SystemMap nodes not appearing:**
   - Ensure project has both `mapColor` and `mapSize`
   - Check that project `id` is unique

3. **Links not working:**
   - Verify `id` fields are unique and consistent
   - Check that referenced projects exist

4. **Styling issues:**
   - Ensure Tailwind classes are correct
   - Check for typos in color names
   - Verify responsive classes are applied

### Getting Help

If you encounter issues:
1. Check the browser console for errors
2. Verify data structure matches examples
3. Test with minimal data first
4. Review existing entries for reference

## Content Guidelines

### Writing Style
- Use clear, concise language
- Focus on technical achievements
- Include specific metrics when possible
- Explain the problem, solution, and impact

### Technical Details
- Include relevant technologies used
- Mention key challenges and solutions
- Provide context for technical decisions
- Link to live demos when available

### Visual Content
- Use high-quality images
- Include captions that add value
- Show different aspects of the project
- Consider before/after comparisons

This documentation should help you efficiently add new content to the portfolio while maintaining consistency and quality.
