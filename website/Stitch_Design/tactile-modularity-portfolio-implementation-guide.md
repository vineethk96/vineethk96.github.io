# Design System Specification: Tactile Modularity (React-Ready)

## 1. General Style Guide (Global Tokens)

### 1.1 Color Palette (Tailwind Configuration)
```js
module.exports = {
  theme: {
    extend: {
      colors: {
        background: '#FBF9F4', // Warm Off-White / Technical Paper
        primary: '#031632',    // Dark Navy (Hardware Base)
        accent: '#FFBF00',     // Amber Yellow (Active State / LEDs)
        success: '#94A744',    // FR4 Green (System Optimal / Active LED)
        muted: '#E5E7EB',      // Grid Line Graphite
        faint: '#F3F4F6',      // Sub-grid Silver
      },
    },
  },
}
```

### 1.2 Typography
- **Headings (H1, H2, H3):** `Space Grotesk`, Bold (700). Geometric, authoritative, technical.
- **Body & Functional:** `Plus Jakarta Sans`, Medium (500). Humanist clarity for readability.
- **Technical Readouts / Labels:** `JetBrains Mono`, Bold (700). Monospace for metadata and system IDs.
- **Global Styles:** 
  - All labels are `uppercase` with `tracking-widest` (0.1em - 0.2em).

### 1.3 Component "Box" styles
- **The Technic Module:**
  - `border: 2px solid #031632`
  - `box-shadow: 4px 4px 0px 0px #031632` (Hard shadow, no blur)
  - `border-radius: 4px` (Subtle precision rounding)
  - `background: transparent` (Grid shows through) or `white` (for high-density content).

---

## 2. Template Design (Universal Layout)

### 2.1 The Blueprint Canvas (Background Component)
- **Base Surface:** Solid `#FBF9F4`.
- **Primary Grid:** 1px solid `#E5E7EB` squares (80px x 80px).
- **Secondary Grid:** 0.5px solid `#F3F4F6` subdividing primary squares into an 8x8 matrix.
- **Constraint:** NO dots, NO diamonds, NO crosshairs. Just pure, precise lines.

### 2.2 The Navigation Pill (Header Component)
- **Shape:** `rounded-full`, `fixed top-6`, `mx-auto`, `w-[90%]`.
- **Border:** 2px solid `#031632`.
- **Background:** `rgba(251, 249, 244, 0.8)` with `backdrop-blur-md`.
- **Branding:** Left-aligned `AEROSPACE_PORTFOLIO` (Space Grotesk Bold).
- **Nav Links:** Centered `JetBrains Mono` links.
  - **Active Tab:** Wrapped in a smaller `#FFBF00` (Amber) `rounded-full` pill.
- **Primary CTA:** Right-aligned `#031632` pill labeled `DOWNLOAD_CV` with `#FBF9F4` text.

### 2.3 The Assembly System (Footer Component)
- **Shape:** `fixed bottom-0`, `w-full`, `h-20`, `flex items-center`.
- **Border:** 2px solid `#031632` (Top edge only).
- **Background:** `#FBF9F4` (Seamless grid integration).
- **Left:** `MODULAR_ASSEMBLY_SYSTEM` (Space Grotesk Bold).
- **Center:** Monospace links: `GITHUB`, `LINKEDIN`, `DOCUMENTATION`.
- **Right:** Status Pill: `SYSTEM: OPTIMAL` with a pulsing `#94A744` (Green) LED dot.

---

## 3. Page Archetypes & Interactions

### 3.1 Hero: The System Dashboard
- **Purpose:** High-impact technical introduction.
- **Layout:** Modular grid split between the "Profile Module" (Left) and "System Telemetry" (Right).
- **Interactions:**
  - **The Power Toggle:** Clicking `ENGAGE_POWER` (Red) transitions the button to `POWER_ENGAGED` (Amber LED).
  - **State Shift:** Triggers global "Active" state. The GitHub Dashboard (Line Graph) and Telemetry Modules (Connection, Uptime) animate from 0/Disconnected to Live readouts.
  - **Prototype Carousel:** A 3D-rotating carousel of 4:3 project images. Clicking a card navigates to that specific Project Specification.

### 3.2 About: The System Manual
- **Purpose:** Professional narrative and technical inventory.
- **Layout:** Multi-column modular layout.
- **Sections:**
  - **Core Logic:** Multi-paragraph biography.
  - **Education Log:** Structured modules for MSc and BEng degrees.
  - **Tech Inventory:** Categorized "Skill Packs" using high-contrast pill tags.

### 3.3 Projects: Component Inventory
- **Purpose:** Full-portfolio archive.
- **Layout:** 4-column strict grid of project cards.
- **Detail:** Includes "SLOT_EMPTY" placeholders to reinforce the kit aesthetic.

### 3.4 Project Specification: UAV Telemetry (Deep Dive)
- **Purpose:** Mission-critical technical breakdown.
- **Key Modules:**
  - **Operational Box:** 4:3 Hero Image + Project Identity + Digital Dash Status (Completed/In-Progress).
  - **Technical Specs:** Complexity rating (1-10) + Tech Stack + Action Buttons.
  - **Execution Metrics:** Clean text blog area for deep-dive narratives.

### 3.5 Experience: Service Record
- **Purpose:** Career timeline.
- **Layout:** Vertical "Service Trace" line connecting modular deployment logs.
- **Detail:** Each role is an independent hardware module with years, achievements, and stacks.

---

## 4. Final Implementation Questions for Dev
1. **Pulsing Speed:** Should the Green LEDs pulse at a constant 1.5s interval or variable?
2. **Carousel Lib:** Should we use `framer-motion` for the 3D project carousel implementation?
3. **Data Fetching:** Are the GitHub Dashboard readouts intended to be live-linked to a specific API endpoint or mock data for the static build?