# Design System Specification: Tactile Modularity (React Component Architecture)

## 1. Global Style Guide (Tailwind Configuration)
```js
module.exports = {
  theme: {
    extend: {
      colors: {
        background: '#FBF9F4', // Warm Off-White (Technical Paper)
        primary: '#031632',    // Dark Navy (Hardware Base)
        accent: '#FFBF00',     // Amber Yellow (Active State / LEDs)
        success: '#94A744',    // FR4 Green (System Optimal LED)
        muted: '#E5E7EB',      // Grid Line Graphite
        faint: '#F3F4F6',      // Sub-grid Silver
      },
      fontFamily: {
        heading: ['Space Grotesk', 'sans-serif'],
        body: ['Plus Jakarta Sans', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
}
```

---

## 2. Reusable Component Archetypes

### 2.1 The "Technic" Module (Base Container)
All modular boxes share this base styling to ensure the "snapped-in" look.
- **Props:** `title`, `children`, `variant` (default | navy), `className`.
- **Styling:** 
  - `border: 2px solid #031632`
  - `box-shadow: 4px 4px 0px 0px #031632`
  - `background: white` (or `#031632` for navy variant)
  - `padding: 24px`
- **Header:** Labeled with `JetBrains Mono` bold uppercase text, often with a 1px bottom border.

### 2.2 SkillModule (About Page)
Used for the Skills & Technologies section.
- **Props:** `category`, `skills[]`.
- **Layout:** Flex wrap container for skill tags.
- **Tags:** `bg-[#F3F4F6]`, `border: 1px solid #031632`, `rounded-full`, `px-3 py-1`, `font-mono text-[10px]`.

### 2.3 DeploymentModule (Experience Page)
Used for the career timeline.
- **Props:** `year`, `role`, `company`, `location`, `description`, `achievements[]`, `techStack[]`.
- **Layout:** 2-column on desktop. Left column for metadata (Year/Role), Right for narrative.
- **Connector:** Vertical `2px solid #031632` line on the left to create the "Service Trace."

### 2.4 OperationalModule (Project Detail)
Used for the high-level project specs.
- **Props:** `title`, `deploymentRef`, `status` (completed | in-progress), `image`.
- **Status LED:** 
  - Completed: `bg-[#94A744]` + pulse animation.
  - In-Progress: `bg-[#FFBF00]` + pulse animation.

---

## 3. Template Design (Universal Constants)

### 3.1 The Blueprint Canvas
- **Background:** `#FBF9F4`.
- **Grid:** 1px solid `#E5E7EB` (80px squares) + 0.5px solid `#F3F4F6` (sub-grid).
- **Rule:** No dots, no crosshairs.

### 3.2 The Navigation Pill (Header)
- **Component:** `<Header />`
- **Shape:** `rounded-full`, `border-2 border-primary`, `bg-background/80`, `backdrop-blur-md`.
- **Active State:** Nested `<span className="bg-accent rounded-full px-4 py-1">` around active link.

### 3.3 The Assembly System (Footer)
- **Component:** `<Footer />`
- **Background:** Integrated `#FBF9F4`.
- **Border:** `border-t-2 border-primary`.
- **LED:** Pulsing `<div className="w-2 h-2 rounded-full bg-success shadow-[0_0_8px_#94A744]" />`.

---

## 4. Page Archetypes & Interactions

### 4.1 Hero: Dashboard
- **State Logic:** `isPowerEngaged: boolean`.
- **Standby:** Telemetry at 0, GitHub "OFFLINE".
- **Active:** Triggered by `Engage Power`. Status shifts to `SYSTEM_ACTIVE`, GitHub pulls contribution graph.

### 4.2 Projects: Component Inventory
- **Layout:** Strict 4-column CSS grid.
- **Empty Slots:** Render empty cells with `border: 1px dashed #E5E7EB` and "SLOT_EMPTY" label.

### 4.3 Project Detail: Specification Sheet
- **Layout:** Sidebar (Specs) + Main (Carousel & Blog).
- **Carousel:** 3D rotating carousel for 4:3 images.