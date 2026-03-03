# Portfolio Website - Vineeth Kirandumkara

A modern, interactive portfolio website built with React, featuring a dynamic SystemMap visualization and centralized data management. This portfolio showcases projects, experience, and skills with beautiful animations and responsive design.

## Quick Start

### Prerequisites
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) (or Docker Engine + Docker Compose plugin)
- Git
- A `.env.local` file with Supabase credentials (see [Environment Variables](#environment-variables))

### Docker Workflow

```bash
# Build and start the development server
docker compose up --build

# Start without rebuilding (after first run)
docker compose up

# Stop the containers
docker compose down

# Stop and remove the node_modules named volume (full reset)
docker compose down -v
```

The app will be available at `http://localhost:3000` with hot-reload via file polling.

### VS Code Dev Container

If you use VS Code with the [Dev Containers extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers), open the repo folder and choose **"Reopen in Container"**. It uses `.devcontainer/devcontainer.json`, which wires up the same `portfolio-dev` compose service automatically.

## Environment Variables

Create a `.env.local` file in the repo root (never commit this file):

```bash
SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
SUPABASE_AUTH=Bearer xxxxxxxxxxxxx
SUPABASE_APIKEY=xxxxxxxxxxxxx
```

These credentials are required for `npm run fetch-data` to pull portfolio content from Supabase. Copy from `.env.local.example` if it exists, or create the file manually.

## Build & Deploy

```bash
# Build for production (runs inside the container)
docker compose exec portfolio-dev npm run build

# Deploy to GitHub Pages
docker compose exec portfolio-dev npm run deploy
```

**Note**: `npm run deploy` automatically builds and deploys to the `gh-pages` branch, making the site available at `https://vineethk96.github.io`.

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── SystemMap.js     # Interactive project network (React Force Graph)
│   ├── SystemMapD3.js   # D3-based force-directed graph implementation
│   ├── Navigation.js    # Site navigation
│   ├── FeaturedProjects.js
│   └── ...
├── pages/              # Main page components
│   ├── Home.js
│   ├── About.js
│   ├── Experience.js
│   └── Projects.js
├── data/
│   └── constants.js    # AUTO-GENERATED — do not edit manually
└── App.js             # Main application component
```

## Key Features

### Interactive SystemMap
- **Dynamic Network Visualization**: Projects connected by relationships
- **Drag & Drop**: Interactive node manipulation with physics simulation
- **Responsive Design**: Adapts to different screen sizes
- **Customizable Forces**: Adjust repulsion, attraction, and clustering

### Centralized Data Management
All portfolio content is managed in Supabase and fetched at build time via `npm run fetch-data`. The generated `src/data/constants.js` exposes:
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

## Adding Content

> **Important**: `src/data/constants.js` is auto-generated. Never edit it directly — changes will be overwritten on the next build.

### Adding New Projects

1. Add a project entry to the `projects` table in Supabase with required fields: `id`, `title`, `description`, `tags`, `color`, `status`, `year`, `icon`
2. Optional SystemMap fields: `map_color`, `size`
3. Upload images to S3 and store URLs in the `images` JSON array
4. Regenerate `constants.js`:

```bash
docker compose exec portfolio-dev npm run fetch-data
```

### Adding Work Experience

1. Add an entry to the `work_experience` table in Supabase with fields: `company`, `position`, `start_year`, `end_year`, `description`, `location`, `tags`, `achievements` (array)
2. Run `docker compose exec portfolio-dev npm run fetch-data`

### Adding Education

1. Add an entry to the `education` table in Supabase
2. Run `docker compose exec portfolio-dev npm run fetch-data`

### SystemMap Connections

To add relationships between projects in the SystemMap:

1. Add an entry to the `system_map_links` table in Supabase:
   - `source`: project id
   - `target`: project id
   - `relationship`: one of the types below
2. Run `docker compose exec portfolio-dev npm run fetch-data`

Available relationship types:
- `research-application`
- `iot-platform`
- `embedded-evolution`
- `sensor-system`
- `mobile-app`
- `systems-thinking`

### Hardcoded Personal Data

`PERSONAL_INFO`, `PERSONAL_STORY`, `SKILLS`, `CERTIFICATIONS`, `SOCIAL_LINKS`, `EXTERNAL_LINKS`, and `CONTACT_INFO` are defined directly in `scripts/fetch-data.js`. Edit that file, then run `npm run fetch-data`.

## Customization

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

## Deployment

### GitHub Pages Deployment
1. Ensure your repository is named `yourusername.github.io`
2. Push changes to the `main` branch
3. Run the deploy command:

```bash
docker compose exec portfolio-dev npm run deploy
```

This will:
- Build the production version
- Deploy to the `gh-pages` branch
- Make your site available at `https://yourusername.github.io`

### Custom Domain (Optional)
1. Add a `CNAME` file to the `public/` directory with your domain
2. Configure DNS settings with your domain provider
3. Enable custom domain in GitHub Pages settings

## Development

### Available Scripts

Scripts run inside the container via `docker compose exec`:

```bash
# Fetch latest data from Supabase and regenerate constants.js
docker compose exec portfolio-dev npm run fetch-data

# Run tests
docker compose exec portfolio-dev npm test

# Build for production
docker compose exec portfolio-dev npm run build

# Deploy to GitHub Pages
docker compose exec portfolio-dev npm run deploy
```

### Component Development
- Components are in `src/components/`
- Use existing patterns for consistency
- Import data from `constants.js`
- Follow React best practices

### Adding New Pages
1. Create component in `src/pages/`
2. Add route in `App.js`
3. Update navigation in `Navigation.js`

## Troubleshooting

### Port 3000 already in use
Change the host port mapping in `docker-compose.yml` (e.g., `"3001:3000"`).

### node_modules stale after package.json change
Rebuild the image to reinstall dependencies:
```bash
docker compose up --build
```

### Hot reload not working
The Dockerfile sets `CHOKIDAR_USEPOLLING=true` and `WATCHPACK_POLLING=true` for bind-mount environments. If hot reload still fails, confirm those env vars are present in the container:
```bash
docker compose exec portfolio-dev env | grep POLLING
```

### Supabase data missing or constants.js empty
Ensure `.env.local` exists and contains valid credentials, then re-fetch:
```bash
docker compose exec portfolio-dev npm run fetch-data
```

### SystemMap not loading
Verify that project data in Supabase has the required `map_color` and `size` properties, then re-run `npm run fetch-data`.

### Deployment fails
Check GitHub Pages settings and confirm the `gh-pages` branch is set as the Pages source.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

---

**Built with**: React, D3.js, Tailwind CSS, Framer Motion, Supabase, AWS S3, GitHub Pages
