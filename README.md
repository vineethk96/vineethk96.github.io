# Portfolio Website - Vineeth Krishnamurthy

A modern, interactive portfolio website built with React, featuring a dynamic SystemMap visualization and centralized data management. This portfolio showcases projects, experience, and skills with beautiful animations and responsive design.

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Git

### Installation & Setup
```bash
# Clone the repository
git clone https://github.com/vineethk96/vineethk96.github.io.git
cd vineethk96.github.io

# Install dependencies
npm install

# Start development server
npm start
```

The application will open at `http://localhost:3000`

### Build & Deploy
```bash
# Build for production
npm run build

# Deploy to GitHub Pages
npm run deploy
```

**Note**: The `npm run deploy` command will automatically build and deploy your site to GitHub Pages from the `main` branch.

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── SystemMap.js     # Interactive project network (React Force Graph)
│   ├── SystemMapD3.js   # Alternative D3-based implementation
│   ├── Navigation.js    # Site navigation
│   ├── FeaturedProjects.js
│   └── ...
├── pages/              # Main page components
│   ├── Home.js
│   ├── About.js
│   ├── Experience.js
│   └── Projects.js
├── data/
│   └── constants.js    # Centralized data store
└── App.js             # Main application component
```

## 🎯 Key Features

### Interactive SystemMap
- **Dynamic Network Visualization**: Projects connected by relationships
- **Drag & Drop**: Interactive node manipulation with physics simulation
- **Responsive Design**: Adapts to different screen sizes
- **Customizable Forces**: Adjust repulsion, attraction, and clustering

### Centralized Data Management
All content is managed through `src/data/constants.js`:
- Personal information
- Projects and portfolio items
- Work experience and education
- Skills and technologies
- Social links and contact info

### Modern UI/UX
- Smooth animations with Framer Motion
- Dark/light mode support
- Responsive grid layouts
- Interactive hover effects

## 📝 Adding Content

### Adding New Projects

Edit `src/data/constants.js` and add to the `PROJECTS` array:

```javascript
{
  id: 'your-project-id',
  title: 'Your Project Title',
  description: 'Brief description of your project...',
  icon: YourIcon, // Import from lucide-react
  tags: ['React', 'Node.js', 'MongoDB'],
  color: 'from-blue-500 to-purple-500',
  status: 'Completed', // or 'In Progress'
  year: '2024',
  github: 'https://github.com/yourusername/project',
  demo: 'https://your-demo-link.com',
  type: 'project',
  // SystemMap properties (optional)
  category: 'web-development',
  technologies: ['React', 'Node.js'],
  mapColor: '#3b82f6',
  size: 7
}
```

### Adding Work Experience

Add to the `WORK_EXPERIENCE` array:

```javascript
{
  company: 'Company Name',
  position: 'Your Position',
  location: 'City, State',
  startDate: 'Month Year',
  endDate: 'Month Year', // or 'Present'
  description: 'Brief company description',
  achievements: [
    'Achievement 1',
    'Achievement 2',
    'Achievement 3'
  ]
}
```

### Adding Education

Add to the `EDUCATION` array:

```javascript
{
  institution: 'University Name',
  degree: 'Degree Type',
  field: 'Field of Study',
  location: 'City, State',
  startDate: 'Month Year',
  endDate: 'Month Year',
  gpa: '3.8/4.0', // optional
  achievements: ['Honor 1', 'Honor 2']
}
```

### SystemMap Connections

To add relationships between projects in the SystemMap, edit `SYSTEM_MAP_LINKS`:

```javascript
{ 
  source: 'project-id-1', 
  target: 'project-id-2', 
  relationship: 'technology-evolution' // or other relationship types
}
```

Available relationship types:
- `research-application`
- `iot-platform`
- `embedded-evolution`
- `sensor-system`
- `mobile-app`
- `systems-thinking`

## 🎨 Customization

### Styling
- Uses Tailwind CSS for styling
- Color schemes defined in `tailwind.config.js`
- Component-specific styles in respective files

### SystemMap Physics
Adjust force simulation in `SystemMapD3.js`:

```javascript
const simulation = d3.forceSimulation(graphData.nodes)
  .force("link", d3.forceLink(graphData.links).id(d => d.id).distance(20))
  .force("charge", d3.forceManyBody().strength(-10)) // Repulsion strength
  .force("center", d3.forceCenter(width / 2, height / 2))
  .force("collision", d3.forceCollide().radius(d => d.size * 3));
```

### Personal Information
Update personal details in `constants.js`:
- `PERSONAL_INFO`: Name, email, location, bio
- `SOCIAL_LINKS`: LinkedIn, GitHub, etc.
- `CONTACT_INFO`: Contact methods
- `EXTERNAL_LINKS`: Resume, Calendly, etc.

## 🚀 Deployment

### GitHub Pages Deployment
1. Ensure your repository is named `yourusername.github.io`
2. Push changes to the `main` branch
3. Run deployment command:

```bash
npm run deploy
```

This will:
- Build the production version
- Deploy to the `gh-pages` branch
- Make your site available at `https://yourusername.github.io`

### Custom Domain (Optional)
1. Add a `CNAME` file to the `public/` directory with your domain
2. Configure DNS settings with your domain provider
3. Enable custom domain in GitHub Pages settings

## 🛠 Development

### Available Scripts
- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests
- `npm run deploy` - Deploy to GitHub Pages

### Component Development
- Components are in `src/components/`
- Use existing patterns for consistency
- Import data from `constants.js`
- Follow React best practices

### Adding New Pages
1. Create component in `src/pages/`
2. Add route in `App.js`
3. Update navigation in `Navigation.js`

## 📋 Troubleshooting

### Common Issues
- **Deployment fails**: Check GitHub Pages settings and branch configuration
- **SystemMap not loading**: Verify project data has required `mapColor` and `size` properties
- **Broken links**: Ensure all external URLs are valid and accessible

### Performance Optimization
- Images should be optimized and properly sized
- Large datasets in `constants.js` may affect load times
- SystemMap performance depends on number of nodes and links

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

**Built with**: React, D3.js, Tailwind CSS, Framer Motion, React Force Graph
