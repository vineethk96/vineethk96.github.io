# Developer Handoff: Tactile Modularity Portfolio (React/Tailwind)

## 1. Project Overview & Tech Stack
**Design Goal:** A high-precision, modular portfolio for an Embedded Systems Engineer/Creative Technologist.
**Visual Style:** "The Precision Assemblage" — Tactile, hardware-inspired UI on a technical blueprint grid.
**Recommended Stack:**
- **Framework:** React (Next.js or Vite)
- **Styling:** Tailwind CSS (Strict adherence to the provided design tokens)
- **Icons:** Material Symbols or Lucide React
- **Animation:** Framer Motion (for state transitions and 3D carousels)

---

## 2. Global Style Guide (Tailwind Setup)

### 2.1 Color Palette
```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        background: '#FBF9F4', // Warm Off-White / Technical Paper
        primary: '#031632',    // Dark Navy (Borders, Headings)
        accent: '#FFBF00',     // Amber Yellow (Active states, LEDs)
        success: '#94A744',    // FR4 Green (Live LEDs, System Optimal)
        muted: '#E5E7EB',      // Primary Grid Lines
        faint: '#F3F4F6',      // Secondary Sub-grid Lines
      },
      fontFamily: {
        heading: ['Space Grotesk', 'sans-serif'], // Bold (700) for H1-H3
        body: ['Plus Jakarta Sans', 'sans-serif'], // Medium (500) for narrative
        mono: ['JetBrains Mono', 'monospace'],    // Bold (700) for Labels/Metadata
      },
    },
  },
}
```

### 2.3 Global Base Styles
- **Headers/Labels:** All system labels must be `uppercase` with `tracking-widest` (0.1em - 0.2em).
- **Technic Module Styling:** 
  - Border: `2px solid #031632`
  - Shadow: `shadow-[4px_4px_0px_0px_rgba(3,22,50,1)]`
  - Radius: `4px` or `0px` for precision.

---

## 3. Structural Foundation (Master Template)

### 3.1 The Blueprint Canvas (`<Background />`)
- **Surface:** Solid `#FBF9F4`.
- **Grid Layer:** 
  - Primary: 1px solid `#E5E7EB` (80px squares).
  - Secondary: 0.5px solid `#F3F4F6` (sub-grid).
- **Constraint:** NO dots, NO diamonds. Just clean, high-precision lines.

### 3.2 System Navigation (`<Header />`)
- **Shape:** Floating pill (`rounded-full`) fixed at the top.
- **Background:** `bg-background/80` with `backdrop-blur-md`.
- **Active State:** Smaller yellow pill (`bg-accent rounded-full`) behind the active link.
- **Action:** Far-right navy pill button (`bg-primary text-background`) for 'DOWNLOAD_CV'.

### 3.3 Modular Assembly (`<Footer />`)
- **Constraint:** Background MUST be Off-White (`#FBF9F4`).
- **Separation:** 2px solid Navy (`#031632`) top border ONLY.
- **Status:** 'SYSTEM: OPTIMAL' pill with a pulsing Green LED (`#94A744`).

---

## 4. Reusable Component Specs

### 4.1 `<TechnicModule />`
- **Purpose:** Universal container for all content blocks.
- **Props:** `title`, `children`, `isDark: boolean`.
- **Visuals:** 2px primary border + hard offset shadow.

### 4.2 `<SkillPack />` (About Page)
- **Purpose:** Categorized technical tags.
- **Styling:** Small-caps mono tags with 1px borders and subtle background shifts.

### 4.3 `<DeploymentLog />` (Experience Page)
- **Purpose:** Career timeline modules.
- **Layout:** Vertical 'Service Trace' (`2px solid primary`) connecting modules.
- **Content:** Position, Company, Years (replaced index numbers), Summary, Achievements.

### 4.4 `<ProjectCard />` (Projects Grid)
- **Purpose:** PCB-style module for individual projects.
- **States:** Includes `SLOT_EMPTY` placeholders for unfilled grid cells.

---

## 5. Page-Specific Archetypes

### 5.1 Hero Dashboard (`isPowerEngaged` State)
- **Standby:** GitHub Dashboard shows 'OFFLINE'. Connection, Uptime, and Project modules show Disconnected/0% status.
- **Active:** Triggered by `ENGAGE_POWER` click. 
  - GitHub Module: Animate line graph from 0 and pull recent repo data.
  - Telemetry Modules: Bars fill up; Uptime jumps to 99%+ with live jitter.
- **Prototype Carousel:** Active in BOTH states. 3D rotating cards (4:3 aspect ratio). No "View" button—the card is the link.

### 5.2 Project Detail (System Spec Sheet)
- **Operational Module:** 4:3 image + Large Deployment_Ref + Digital Dash Status (Completed/In-Progress) with LED.
- **Specs Sidebar:** Complexity (1-10) + Tech Stack + Github/Demo CTAs.
- **3D Deep Dive:** Image carousel for schematics/CAD/Build photos.

---

## 6. Implementation Sequence
1. **Base Framework:** Set up Tailwind tokens and Font stacks.
2. **The Canvas:** Create the `<Background />`, `<Header />`, and `<Footer />`.
3. **Base Component:** Develop the `<TechnicModule />` with its characteristic hard shadow.
4. **Hero State Logic:** Implement the 'Standby' vs 'Active' context.
5. **Data Population:** Map the Project and Experience data into the reusable modules.
6. **Polishing:** Add the pulsing LED animations and the 3D carousel logic.