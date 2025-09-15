# Development Guide

This guide covers the development workflow, architecture decisions, and best practices for maintaining and extending the portfolio website.

## 🏗 Architecture Overview

### Component Architecture
```
App.js
├── Navigation.js          # Site navigation
├── Pages/
│   ├── Home.js           # Landing page with hero section
│   ├── About.js          # Personal story and vision
│   ├── Experience.js     # Work history and education
│   └── Projects.js       # Project showcase
└── Components/
    ├── SystemMap.js      # Interactive project network
    ├── FeaturedProjects.js
    ├── TimelineSnapshot.js
    └── AnimatedSystemFlow.js
```

### Data Flow
```
constants.js (Single Source of Truth)
    ↓
Components import specific data arrays
    ↓
React components render with centralized data
    ↓
User interactions update component state
```

## 📋 Development Workflow

### 1. Setting Up Development Environment
```bash
# Clone and setup
git clone https://github.com/vineethk96/vineethk96.github.io.git
cd vineethk96.github.io
npm install

# Start development server
npm start
```

### 2. Making Changes
```bash
# Create feature branch
git checkout -b feature/your-feature-name

# Make changes to src/ files
# Test changes locally at http://localhost:3000

# Commit changes
git add .
git commit -m "feat: description of changes"

# Push and create PR
git push origin feature/your-feature-name
```

### 3. Deployment Process
```bash
# Deploy to GitHub Pages
npm run deploy

# This automatically:
# 1. Builds production version (npm run build)
# 2. Pushes to gh-pages branch
# 3. Updates live site at yourusername.github.io
```

## 🎯 Adding New Features

### Adding a New Page
1. **Create page component** in `src/pages/`
```javascript
// src/pages/NewPage.js
import React from 'react';

const NewPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1>New Page</h1>
      {/* Your content */}
    </div>
  );
};

export default NewPage;
```

2. **Add route** in `App.js`
```javascript
import NewPage from './pages/NewPage';

// Add to routing logic
{currentPage === 'new-page' && <NewPage />}
```

3. **Update navigation** in `Navigation.js`
```javascript
const navItems = [
  // ... existing items
  { id: 'new-page', label: 'New Page' }
];
```

### Adding New Data Types
1. **Define data structure** in `constants.js`
```javascript
export const NEW_DATA_TYPE = [
  {
    id: 'unique-id',
    title: 'Title',
    // ... other properties
  }
];
```

2. **Create component** to display data
```javascript
import { NEW_DATA_TYPE } from '../data/constants';

const NewComponent = () => {
  return (
    <div>
      {NEW_DATA_TYPE.map(item => (
        <div key={item.id}>
          <h3>{item.title}</h3>
          {/* Render item */}
        </div>
      ))}
    </div>
  );
};
```

### Extending SystemMap
1. **Add new relationship types** in `constants.js`
```javascript
export const SYSTEM_MAP_LINKS = [
  // ... existing links
  { 
    source: 'project-1', 
    target: 'project-2', 
    relationship: 'new-relationship-type' 
  }
];
```

2. **Add color mapping** in SystemMap components
```javascript
const relationshipColors = {
  // ... existing colors
  'new-relationship-type': '#your-hex-color'
};
```

## 🎨 Styling Guidelines

### Tailwind CSS Classes
```javascript
// Container patterns
'container mx-auto px-4 py-8'

// Grid layouts
'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'

// Card styling
'bg-white dark:bg-gray-800 rounded-lg shadow-md p-6'

// Text hierarchy
'text-3xl font-bold text-gray-900 dark:text-white'
'text-lg text-gray-600 dark:text-gray-300'

// Interactive elements
'hover:shadow-lg transition-shadow duration-300'
'transform hover:scale-105 transition-transform'
```

### Component Patterns
```javascript
// Motion animations
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

// Responsive design
const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
```

## 🔧 Configuration Files

### Package.json Scripts
```json
{
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build", 
    "test": "react-scripts test",
    "deploy": "gh-pages -d build"
  }
}
```

### Tailwind Config
```javascript
// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      // Custom colors, fonts, etc.
    }
  }
}
```

## 🧪 Testing

### Component Testing
```javascript
// Example test structure
import { render, screen } from '@testing-library/react';
import YourComponent from './YourComponent';

test('renders component correctly', () => {
  render(<YourComponent />);
  expect(screen.getByText('Expected Text')).toBeInTheDocument();
});
```

### Manual Testing Checklist
- [ ] All pages load without errors
- [ ] Navigation works correctly
- [ ] SystemMap interactions function properly
- [ ] Responsive design works on mobile/tablet/desktop
- [ ] Dark mode toggle works
- [ ] External links open correctly
- [ ] Contact forms submit properly

## 🚀 Performance Optimization

### Code Splitting
```javascript
// Lazy load components
import { lazy, Suspense } from 'react';

const SystemMap = lazy(() => import('./components/SystemMap'));

// Use with Suspense
<Suspense fallback={<div>Loading...</div>}>
  <SystemMap />
</Suspense>
```

### Image Optimization
- Use WebP format when possible
- Implement lazy loading for images
- Optimize image sizes for different screen resolutions

### Bundle Analysis
```bash
# Analyze bundle size
npm run build
npx serve -s build

# Use webpack-bundle-analyzer for detailed analysis
npm install --save-dev webpack-bundle-analyzer
```

## 🐛 Common Issues & Solutions

### Deployment Issues
**Problem**: `npm run deploy` fails
**Solution**: 
- Check GitHub Pages settings
- Ensure repository name matches `username.github.io`
- Verify gh-pages branch exists

**Problem**: Site shows 404 after deployment
**Solution**:
- Add `"homepage": "https://username.github.io"` to package.json
- Check that build files are in gh-pages branch

### Development Issues
**Problem**: SystemMap not rendering
**Solution**:
- Check browser console for errors
- Verify all projects have required `mapColor` property
- Ensure D3.js dependencies are installed

**Problem**: Styling not applying
**Solution**:
- Run `npm run build` to rebuild Tailwind CSS
- Check for conflicting CSS classes
- Verify Tailwind config includes all source files

## 📈 Monitoring & Analytics

### GitHub Pages Analytics
- Enable in repository settings
- Monitor traffic and popular pages
- Track deployment success/failures

### Performance Monitoring
```javascript
// Add performance logging
console.time('Component Render');
// ... component logic
console.timeEnd('Component Render');
```

## 🔄 Maintenance Tasks

### Regular Updates
- [ ] Update dependencies monthly: `npm update`
- [ ] Review and update project data in `constants.js`
- [ ] Check for broken external links
- [ ] Update resume/CV file in `public/` directory
- [ ] Review and optimize images

### Security
- [ ] Run security audit: `npm audit`
- [ ] Update vulnerable dependencies
- [ ] Review and rotate any API keys
- [ ] Ensure no sensitive data in repository

## 📚 Resources

### Documentation
- [React Documentation](https://reactjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [D3.js](https://d3js.org/)
- [Framer Motion](https://www.framer.com/motion/)

### Tools
- [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools)
- [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)
- [GitHub Pages](https://pages.github.com/)

### Community
- [React Community](https://reactjs.org/community/support.html)
- [Tailwind CSS Discord](https://tailwindcss.com/discord)
- [D3.js Community](https://d3js.org/community)
