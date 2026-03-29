# Portfolio Website - Vineeth Kirandumkara

A modern, interactive portfolio website built with React, featuring a dynamic SystemMap visualization and content managed via Sanity CMS. This portfolio showcases projects, experience, and skills with smooth animations and responsive design.

## Quick Start

### Prerequisites
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) (or Docker Engine + Docker Compose plugin)
- Git
- A `website/.env.local` file with a Sanity auth token (see [Environment Variables](#environment-variables))

### Docker Workflow

```bash
# Build and start both services (React app + Sanity Studio)
docker compose up --build

# Start without rebuilding (after first run)
docker compose up

# Stop the containers
docker compose down

# Stop and remove named volumes (full reset including node_modules)
docker compose down -v
```

- **Portfolio app**: `http://localhost:3000` — React dev server with hot reload
- **Sanity Studio**: `http://localhost:3333` — Headless CMS for managing content

### VS Code Dev Container

If you use VS Code with the [Dev Containers extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers), open the repo folder and choose **"Reopen in Container"**. It uses `.devcontainer/devcontainer.json`, which wires up the same `portfolio-dev` compose service automatically and forwards both ports.

## Environment Variables

Create `website/.env.local` (never commit this file):

```bash
SANITY_TOKEN=<your-sanity-read-token>
```

This token is required by `npm run fetch-data` to pull portfolio content from the Sanity CMS API. Generate one from [sanity.io/manage](https://www.sanity.io/manage) under your project's API settings with **Viewer** role.

> The `SUPABASE_*` variables seen in older docs are no longer used — the project has migrated fully to Sanity CMS.

## Docker Services

Two containers are defined in `docker-compose.yml`:

| Service | Container | Port | Memory Limit | Purpose |
|---|---|---|---|---|
| `portfolio-dev` | `portfolio-dev` | 3000 | 2.5 GB | React portfolio dev server |
| `sanity-studio` | `sanity-studio` | 3333 | 1.5 GB | Sanity CMS content editor |

Both containers:
- Sync source code via bind mounts (live edits reflected immediately)
- Use named volumes for `node_modules` to isolate dependencies between containers
- Have file-watch polling enabled (`CHOKIDAR_USEPOLLING`, `WATCHPACK_POLLING`) for compatibility with Docker bind mounts
- Include the Claude Code CLI pre-installed

### Dockerfiles

**`website/Dockerfile`** (`node:20-bookworm-slim`):
- Installs system packages needed for native Node builds (`python3`, `make`, `g++`)
- Pre-installs npm dependencies as a cached layer
- Runs `npm start` (Vite dev server on port 3000)

**`sanity_cms/Dockerfile`** (`node:20-bookworm`):
- Full Debian image (not slim) to support Playwright
- Includes Playwright Chromium for browser-based tooling
- Disables Sanity telemetry (`SANITY_TELEMETRY_DISABLED=1`)
- Runs `npx sanity dev --host=0.0.0.0 --port=3333`

## GitHub Actions CI/CD

### On Push to `main` — `deploy.yml`

Triggers automatically whenever code is pushed to `main`.

**Pipeline**:
1. Checkout code
2. Setup Node.js 20 with npm cache
3. `npm ci` — install dependencies
4. `npm run build` — runs `fetch-data` first (via `prebuild` hook), then Vite build
5. Deploy `website/build/` to the `gh-pages` branch via `JamesIves/github-pages-deploy-action`

**Required GitHub Secrets** (set in repo Settings → Secrets):
```
SANITY_TOKEN
```

> Note: `SUPABASE_URL`, `SUPABASE_AUTH`, and `SUPABASE_APIKEY` may still appear in older workflow runs but are no longer functionally required.

### Nightly Rebuild — `nightly-deploy.yml`

Runs on a cron schedule (`0 8 * * *` = **4 AM EDT daily**) and can also be triggered manually from the Actions tab.

**Purpose**: The site is statically generated at build time. This workflow rebuilds and redeploys every night so that any content added or edited in Sanity CMS appears on the live site within ~24 hours — no code push required.

**Pipeline**: Identical to `deploy.yml`.

### Automated Data Flow

```
Content updated in Sanity CMS
        ↓
  Wait for nightly build  (or push any code change to trigger deploy.yml)
        ↓
GitHub Actions: npm run build
  └─ prebuild hook: npm run fetch-data
       ├─ Fetch projects, experience, education, blog posts, personal info
       ├─ Convert Sanity Portable Text → HTML
       ├─ Generate image size variants via Sanity CDN
       ├─ Download headshot + CAD model files to public/
       └─ Write src/data/constants.js
  └─ Vite build → website/build/
        ↓
Deploy to gh-pages branch → https://vineethk96.github.io/
```

## Project Structure

```
vineethk96.github.io/
├── .github/
│   └── workflows/
│       ├── deploy.yml          # Push-to-main deployment
│       └── nightly-deploy.yml  # 4 AM EDT daily rebuild
├── .devcontainer/
│   └── devcontainer.json       # VS Code Dev Container config
├── website/                    # React portfolio app (Vite)
│   ├── src/
│   │   ├── components/         # Reusable UI components
│   │   │   ├── SystemMap.jsx
│   │   │   ├── SystemMapD3.js
│   │   │   ├── Navigation.js
│   │   │   └── ...
│   │   ├── pages/              # Page components
│   │   │   ├── Home.jsx
│   │   │   ├── About.jsx
│   │   │   ├── Experience.jsx
│   │   │   ├── Projects.jsx
│   │   │   ├── ProjectDetail.jsx
│   │   │   ├── Blog.jsx
│   │   │   ├── BlogDetail.jsx
│   │   │   └── Contact.jsx
│   │   ├── data/
│   │   │   └── constants.js    # AUTO-GENERATED — do not edit manually
│   │   └── App.jsx
│   ├── scripts/
│   │   ├── fetch-data.js       # Sanity → constants.js data sync
│   │   ├── add-content.js      # Interactive CLI to add content
│   │   └── delete-content.js   # Interactive CLI to remove content
│   ├── public/
│   │   ├── headshot.jpg        # Downloaded from Sanity at build time
│   │   └── models/             # CAD files (STL) downloaded from Sanity
│   ├── Dockerfile
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── package.json
├── sanity_cms/                 # Sanity Studio (headless CMS)
│   ├── schemaTypes/            # Content schema definitions
│   ├── sanity.config.ts
│   └── Dockerfile
└── docker-compose.yml
```

## Key Features

### Interactive SystemMap
- **Dynamic Network Visualization**: Projects connected by typed relationships
- **Drag & Drop**: Interactive node manipulation with D3 physics simulation
- **Responsive Design**: Adapts to different screen sizes
- Relationship types: `research-application`, `iot-platform`, `embedded-evolution`, `sensor-system`, `mobile-app`, `systems-thinking`

### Centralized Data Management
All portfolio content lives in Sanity CMS (project ID: `jwneocyf`, dataset: `production`). At build time, `fetch-data.js` pulls all content and generates `src/data/constants.js`, which exports:
- `PERSONAL_INFO`, `PERSONAL_STORY`, `SOCIAL_LINKS`, `EXTERNAL_LINKS`, `CONTACT_INFO`
- `PROJECTS`, `WORK_EXPERIENCE`, `EDUCATION`, `BLOG_POSTS`
- `SKILLS`, `CERTIFICATIONS`
- `SYSTEM_MAP_LINKS`, `TIMELINE_DATA`

### Modern UI/UX
- Smooth animations with Framer Motion
- Dark mode default (toggleable, persisted in localStorage)
- Responsive layouts with Tailwind CSS
- Blog post HTML sanitized with DOMPurify before render

## Content Management

### Adding or Editing Content

1. Open Sanity Studio at `http://localhost:3333` (or [sanity.io/manage](https://www.sanity.io/manage))
2. Create or edit content in the appropriate section:
   - **Personal Info** — name, bio, headshot, social links
   - **Projects** — title, description, images, tags, status, SystemMap properties
   - **Work Experience** — company, role, dates, achievements
   - **Education** — institution, degree, dates
   - **Blog Posts** — rich text content with code blocks and callouts
3. Publish your changes in Sanity
4. Re-run fetch-data to see changes locally:

```bash
docker compose exec portfolio-dev npm run fetch-data
```

Or simply wait for the nightly build to pick up the changes automatically.

### Content Schemas

| Schema | Key Fields |
|---|---|
| `project` | `title`, `description`, `tags`, `status`, `year`, `images`, `map_color`, `size` |
| `workExperience` | `company`, `position`, `start_year`, `end_year`, `achievements[]` |
| `education` | `institution`, `degree`, `start_year`, `end_year` |
| `blogPost` | `title`, `excerpt`, `body` (Portable Text), `tags` |
| `personalInfo` | `name`, `bio`, `headshot`, `location` (singleton) |

### SystemMap Connections

Add a relationship between two projects:
1. In Sanity Studio, find the project you want to link from and add a relationship entry, **or** add a record directly to the `system_map_links` dataset field
2. Set `source` (project ID), `target` (project ID), and `relationship` type
3. Run `npm run fetch-data`

### Hardcoded Personal Data

`PERSONAL_INFO`, `PERSONAL_STORY`, `SKILLS`, `CERTIFICATIONS`, `SOCIAL_LINKS`, `EXTERNAL_LINKS`, and `CONTACT_INFO` are defined directly in `website/scripts/fetch-data.js` inside the `generateConstantsFile` function. Edit that file, then run `npm run fetch-data`.

> **Important**: `src/data/constants.js` is auto-generated. Never edit it directly — changes are overwritten on every build.

## Scripts Reference

All scripts run from the `website/` directory. When using Docker, prefix with `docker compose exec portfolio-dev`.

```bash
# Fetch latest content from Sanity CMS and regenerate constants.js
npm run fetch-data

# Build for production (automatically runs fetch-data first)
npm run build

# Deploy to GitHub Pages (builds, then pushes build/ to gh-pages branch)
npm run deploy

# Start development server
npm start

# Interactive CLI to add a project, prototype, or blog post to constants.js
node scripts/add-content.js

# Interactive CLI to delete content from constants.js
node scripts/delete-content.js
```

### `fetch-data.js` details
- Requires `SANITY_TOKEN` in `website/.env.local`
- Connects to Sanity project `jwneocyf`, dataset `production`
- Fetches all content types in parallel via GROQ queries
- Converts Portable Text blocks to HTML (including code blocks, callout boxes, images)
- Downloads headshot and CAD model files (STL) to `public/`
- Generates multi-size image URLs via Sanity CDN (original, 1200px, 600px, 300px)
- Exits with code 1 if `SANITY_TOKEN` is missing

## Build & Deploy

### Automatic Deployment (Recommended)

Push to `main` — GitHub Actions handles the rest:

```bash
git push origin main
```

### Manual Deployment

```bash
# Inside the container
docker compose exec portfolio-dev npm run deploy
```

This builds the production bundle (including a fresh `fetch-data` run) and pushes `website/build/` to the `gh-pages` branch, making the site live at `https://vineethk96.github.io`.

### Custom Domain (Optional)
1. Add a `CNAME` file to `website/public/` with your domain
2. Configure DNS with your domain provider
3. Enable the custom domain in GitHub Pages settings

## Customization

### Styling
- Tailwind CSS with custom color tokens defined in `tailwind.config.js`
- Primary color: `#031632` (dark navy), Accent: `#FFBF00` (gold)
- Custom fonts: Space Grotesk (heading), Plus Jakarta Sans (body), JetBrains Mono (code)
- Dark mode via `dark:` prefixes, controlled by `document.documentElement.classList`

### SystemMap Physics
Adjust D3 force simulation in `website/src/components/SystemMapD3.js`:

```javascript
const simulation = d3.forceSimulation(graphData.nodes)
  .force("link", d3.forceLink(graphData.links).id(d => d.id).distance(20))
  .force("charge", d3.forceManyBody().strength(-10)) // Repulsion strength
  .force("center", d3.forceCenter(width / 2, height / 2))
  .force("collision", d3.forceCollide().radius(d => d.size * 3));
```

## Troubleshooting

### Port 3000 or 3333 already in use
Change the host port mapping in `docker-compose.yml` (e.g., `"3001:3000"`).

### node_modules stale after package.json change
Rebuild the image to reinstall dependencies:
```bash
docker compose up --build
```

### Hot reload not working
File watch polling is enabled via environment variables in `docker-compose.yml`. Confirm they are set:
```bash
docker compose exec portfolio-dev env | grep POLLING
docker compose exec sanity-studio env | grep POLLING
```

### `SANITY_TOKEN` missing / constants.js empty
Ensure `website/.env.local` exists with a valid `SANITY_TOKEN`, then re-fetch:
```bash
docker compose exec portfolio-dev npm run fetch-data
```
If the token is missing, `fetch-data.js` will print an error and exit with code 1.

### Content not updating after Sanity edit
Sanity changes are fetched at build time only. Run `npm run fetch-data` locally, or push to `main` to trigger a deployment, or wait for the nightly build (runs at 4 AM EDT).

### SystemMap not loading
Verify that project records in Sanity have `map_color` and `size` fields populated, then re-run `npm run fetch-data`.

### Deployment fails
- Check that GitHub Secrets (`SANITY_TOKEN`) are configured in the repo settings
- Confirm the `gh-pages` branch is set as the GitHub Pages source in repository settings

## Adding New Pages

1. Create a component in `website/src/pages/`
2. Add a route in `website/src/App.jsx`
3. Update navigation in `website/src/components/Navigation.js`

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/short-description`)
3. Make your changes and test locally via Docker
4. Submit a pull request against `main`

## License

This project is open source and available under the [MIT License](LICENSE).

---

**Built with**: React, Vite, D3.js, Tailwind CSS, Framer Motion, Sanity CMS, AWS S3, GitHub Pages
