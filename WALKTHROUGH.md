# MARQ Projects - File Walkthrough

A complete guide to every file in this portfolio project. This is a Next.js 16 App Router application built with TypeScript, Tailwind CSS 4, React Flow, and Lucide React icons.

---

## Root Config Files

### `.env.example`

**What it does:** Provides a template for the environment variables the app needs to run. Copy this to `.env.local` and fill in your real keys.

**Key things inside:**
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` / `CLERK_SECRET_KEY` - Authentication via Clerk
- `RESEND_API_KEY` - Email sending via Resend
- `POSTGRES_URL` - Database connection string for Vercel Postgres
- `BLOB_READ_WRITE_TOKEN` - File storage via Vercel Blob

**Connects to:** Used by `src/app/api/contact/route.ts` (Resend) and any future database/blob features.

---

### `.gitignore`

**What it does:** Tells Git which files and folders to exclude from version control (dependencies, build output, secrets, etc.).

**Key things inside:**
- Ignores `node_modules/`, `.next/`, `build/`
- Ignores `.env` and `.env*.local` (keeps secrets out of Git)
- Ignores TypeScript build info and Next.js generated type files

**Connects to:** Every file in the project - determines what gets committed.

---

### `eslint.config.mjs`

**What it does:** Configures ESLint for code linting using the Next.js recommended rules with TypeScript support.

**Key things inside:**
- Imports `eslint-config-next/core-web-vitals` (performance and accessibility rules)
- Imports `eslint-config-next/typescript` (TypeScript-specific rules)
- Exports a flat config array (ESLint v9 format)

**Connects to:** Runs via the `lint` script in `package.json`. Checks all `.ts` and `.tsx` files.

---

### `next.config.ts`

**What it does:** The Next.js configuration file. Currently empty (uses all defaults).

**Key things inside:**
- Exports an empty `NextConfig` object
- Placeholder for future settings like image domains, redirects, or experimental features

**Connects to:** Used by the Next.js build system when running `dev`, `build`, or `start`.

---

### `package.json`

**What it does:** Defines the project metadata, scripts, and all dependencies.

**Key things inside:**
- **Scripts:** `dev` (local server), `build` (production build), `start` (production server), `lint` (code linting)
- **Dependencies:** `next`, `react`, `react-dom`, `reactflow`, `lucide-react`, `@clerk/nextjs`, `@vercel/blob`, `@vercel/postgres`, `resend`, `clsx`
- **Dev dependencies:** `tailwindcss`, `@tailwindcss/postcss`, `typescript`, `eslint`, type definitions

**Connects to:** Every file in the project depends on packages listed here.

---

### `postcss.config.mjs`

**What it does:** Configures PostCSS to use the Tailwind CSS 4 plugin for processing styles.

**Key things inside:**
- Single plugin: `@tailwindcss/postcss` (the Tailwind v4 PostCSS integration)

**Connects to:** Works with `src/app/globals.css` to compile Tailwind utility classes.

---

### `tailwind.config.ts`

**What it does:** Customizes the Tailwind CSS configuration with project-specific design tokens and dark mode settings.

**Key things inside:**
- `darkMode: "class"` - enables dark mode via a CSS class on `<html>`
- Content paths for scanning utility class usage
- Custom colors: `dark-bg` (#0A0A0A), `light-bg` (#FFFFFF)
- Custom border radii: `glass` (16px), `glass-lg` (24px)

**Connects to:** `src/app/globals.css` (uses these tokens), all components (use the custom classes).

---

### `tsconfig.json`

**What it does:** Configures the TypeScript compiler with strict type checking and path aliases.

**Key things inside:**
- `strict: true` - enables all strict type checks
- `paths: { "@/*": ["./src/*"] }` - allows imports like `@/components/Navbar`
- Targets ES2017, uses bundler module resolution
- Includes the Next.js compiler plugin

**Connects to:** Every `.ts` and `.tsx` file in the project uses these settings.

---

### `vercel.json`

**What it does:** Tells Vercel which framework to use when deploying the project.

**Key things inside:**
- `"framework": "nextjs"` - ensures Vercel uses the Next.js build pipeline

**Connects to:** Used only during Vercel deployments.

---

## App Pages

### `src/app/globals.css`

**What it does:** The global stylesheet that imports Tailwind, defines CSS custom properties for theming, and creates reusable glass-morphism utility classes.

**Key things inside:**
- Google Fonts import (Inter)
- Tailwind v4 `@theme inline` block with design tokens
- CSS variables for light/dark themes (`--background`, `--foreground`, `--glass-bg`, etc.)
- `.glass-card`, `.glass-card-subtle`, `.glass-nav`, `.glass-footer` classes
- `.glass-hover` transition effect
- `@keyframes fade-in` and `bounce-slow` animations
- Print media styles (hides nav/footer, removes backdrop blur)

**Connects to:** Imported in `src/app/layout.tsx`. Used by every component that applies glass-morphism styles.

---

### `src/app/layout.tsx`

**What it does:** The root layout that wraps every page. Sets up the HTML structure, theme provider, navbar, and footer.

**Key things inside:**
- Exports `metadata` (title: "MARQ | Portfolio", description)
- `RootLayout` component - renders `<html>`, `<head>`, `<body>`
- `ThemeScript` in `<head>` prevents flash of wrong theme
- Wraps children in `ThemeProvider`, `Navbar`, and `Footer`

**Connects to:** `globals.css` (styles), `ThemeProvider` (dark/light mode), `Navbar` (navigation), `Footer` (site footer). Every page renders inside this layout.

---

### `src/app/page.tsx`

**What it does:** The homepage (landing page) with a large MARQ branding, tagline, and call-to-action buttons.

**Key things inside:**
- `Home` component (default export)
- Stacked "MA" / "RQ" heading with large typography
- "Full-Stack Developer & Designer" tagline
- Two CTA buttons: "View Projects" (links to `/projects`) and "Contact Me" (links to `/contact`)
- Bouncing arrow-down scroll indicator using Lucide `ArrowDown`

**Connects to:** Links to `/projects` and `/contact` pages.

---

### `src/app/about/page.tsx`

**What it does:** The About page showing a bio, skills grid, and education timeline.

**Key things inside:**
- `AboutPage` component (default export)
- `educationItems` array with education history
- `skills` array with categorized skill lists
- Uses `GlassCard` for skill cards and `Timeline` for education

**Connects to:** `GlassCard` component, `Timeline` component.

---

### `src/app/contact/page.tsx`

**What it does:** The Contact page with contact information cards and a message form.

**Key things inside:**
- `ContactPage` component (default export)
- `contactInfo` array with email, location, and website details
- Uses Lucide icons (`Mail`, `MapPin`, `Globe`)
- Renders `GlassCard` for info and `ContactForm` for the form

**Connects to:** `GlassCard` component, `ContactForm` component, which calls `/api/contact`.

---

### `src/app/projects/page.tsx`

**What it does:** The Projects listing page with category filters and a responsive grid of project cards.

**Key things inside:**
- `ProjectsPage` component (client component with `"use client"`)
- `useState` for active category filter
- Imports `projects` and `categories` from `@/data/projects`
- Renders `ProjectCard` for each filtered project

**Connects to:** `src/data/projects.ts` (data), `ProjectCard` component, links to `/projects/[id]`.

---

### `src/app/projects/[id]/page.tsx`

**What it does:** The dynamic project detail page that shows full information about a single project.

**Key things inside:**
- `generateStaticParams` - pre-generates routes for all project IDs at build time
- `ProjectDetailPage` component (async, receives `params` as a Promise)
- Calls `notFound()` if the project ID does not match
- Shows title, category badge, description, live demo / source code links, tech stack tags, and an architecture diagram placeholder

**Connects to:** `src/data/projects.ts` (project data), links back to `/projects`.

---

### `src/app/resume/page.tsx`

**What it does:** The Resume page displaying organizations, classroom officer roles, education, skills, and projects in a structured layout.

**Key things inside:**
- `ResumePage` component (default export)
- Imports all resume data: `education`, `organizations`, `classroomOfficer`, `projects`, `skillGroups`
- Uses Lucide icons (`Download`, `Briefcase`, `GraduationCap`, `FolderOpen`)
- "Download PDF" button placeholder
- Uses `GlassCard` for each section item

**Connects to:** `src/data/resume.ts` (all resume data), `GlassCard` component.

---

### `src/app/tech-stack/page.tsx`

**What it does:** The Tech Stack page with an interactive React Flow diagram showing technologies and their relationships.

**Key things inside:**
- `TechStackPage` component (client component with `"use client"`)
- Color-coded legend (Frontend, Backend, DevOps, Database, Tools)
- Renders the `TechStackFlow` component

**Connects to:** `TechStackFlow` component (renders the React Flow graph).

---

## API Routes

### `src/app/api/contact/route.ts`

**What it does:** Handles POST requests from the contact form. Validates input and optionally sends emails via Resend.

**Key things inside:**
- `POST` handler (async function)
- Validates required fields: `name`, `email`, `subject`, `message`
- Email regex validation
- Minimum message length check (10 characters)
- Resend integration stub (logs if API key is not configured)
- Returns JSON success/error responses

**Connects to:** Called by `ContactForm` component via `fetch("/api/contact")`. Uses `RESEND_API_KEY` from environment.

---

### `src/app/api/projects/route.ts`

**What it does:** Handles GET requests to return the list of projects as JSON.

**Key things inside:**
- `GET` handler (async function)
- Imports `projects` from `@/data/projects`
- Returns `{ projects }` with status 200

**Connects to:** `src/data/projects.ts` (data source). Can be consumed by any client or external service.

---

## Components

### `src/components/ContactForm.tsx`

**What it does:** A client-side form component with validation, loading states, and success/error feedback for sending messages.

**Key things inside:**
- `ContactForm` component (client component with `"use client"`)
- `FormData` and `FormErrors` interfaces
- `validate()` function with client-side field validation
- `handleSubmit()` - sends POST to `/api/contact`
- Four states: `idle`, `loading`, `success`, `error`
- Uses Lucide icons: `Send`, `CheckCircle`, `AlertCircle`, `Loader2`

**Connects to:** Used in `src/app/contact/page.tsx`. Calls `src/app/api/contact/route.ts`.

---

### `src/components/Footer.tsx`

**What it does:** The site footer with the MARQ logo, social icon links, and a copyright notice.

**Key things inside:**
- `Footer` component (default export)
- Uses `glass-footer` CSS class
- Social icons from Lucide: `Globe`, `Code2`, `Mail`
- Dynamic copyright year via `new Date().getFullYear()`

**Connects to:** Rendered in `src/app/layout.tsx` on every page.

---

### `src/components/GlassCard.tsx`

**What it does:** A reusable card wrapper that applies the glass-morphism styling with optional variants and hover effects.

**Key things inside:**
- `GlassCard` component (default export)
- Props: `children`, `variant` ("standard" | "subtle"), `className`, `hover` (boolean)
- Uses `clsx` for conditional class merging
- Maps variant to `glass-card` or `glass-card-subtle` classes

**Connects to:** Used across many pages: About, Contact, Resume, and project details.

---

### `src/components/Navbar.tsx`

**What it does:** The fixed navigation bar with desktop links, a theme toggle button, and a collapsible mobile menu.

**Key things inside:**
- `Navbar` component (client component with `"use client"`)
- `navLinks` array: Home, Projects, About, Resume, Tech Stack, Contact
- `useTheme()` hook for dark/light mode toggle
- `usePathname()` to highlight the active link
- Mobile menu state with `useState`
- Lucide icons: `Sun`, `Moon`, `Menu`, `X`

**Connects to:** Rendered in `src/app/layout.tsx`. Uses `ThemeProvider` via `useTheme()`. Links to all pages.

---

### `src/components/ProjectCard.tsx`

**What it does:** A card component that displays a single project's thumbnail placeholder, title, description, tech tags, and links.

**Key things inside:**
- `ProjectCard` component (default export)
- Props: `project` (typed as `Project` from data)
- Shows up to 4 tech stack tags with overflow count
- Links: title goes to `/projects/[id]`, external links to live demo and source code
- Lucide icons: `Code2`, `ExternalLink`

**Connects to:** Used in `src/app/projects/page.tsx`. Imports `Project` type from `src/data/projects.ts`.

---

### `src/components/TechStackFlow.tsx`

**What it does:** Renders an interactive node graph using React Flow to visualize technologies and their connections.

**Key things inside:**
- `TechStackFlow` component (client component with `"use client"`)
- Custom `TechNode` component with color-coded gradient backgrounds and hover tooltips showing proficiency
- `categoryColors` map for Frontend (blue), Backend (green), DevOps (orange), Database (purple), Tools (pink)
- Uses `useNodesState` and `useEdgesState` from React Flow
- Renders `Controls` and dot-grid `Background`

**Connects to:** Used in `src/app/tech-stack/page.tsx`. Imports node/edge data from `src/data/techStack.ts`.

---

### `src/components/ThemeProvider.tsx`

**What it does:** Provides dark/light theme state to the entire app using React context and syncs it with localStorage and the DOM.

**Key things inside:**
- `ThemeProvider` component - wraps app, provides theme context
- `useTheme()` hook - returns `{ theme, toggleTheme }`
- `ThemeScript` component - inline script that runs before React hydration to prevent theme flash
- Uses `useSyncExternalStore` for safe SSR/client synchronization
- Reads from `localStorage` and falls back to system preference (`prefers-color-scheme`)

**Connects to:** Used in `src/app/layout.tsx` (wraps entire app). Consumed by `Navbar` (toggle button).

---

### `src/components/Timeline.tsx`

**What it does:** A vertical timeline component that displays a list of items with dots, dates, and descriptions.

**Key things inside:**
- `Timeline` component (default export)
- Props: `items` (array of `{ title, subtitle, date, description }`)
- Renders a vertical line with positioned dots and glass cards for each entry

**Connects to:** Used in `src/app/about/page.tsx` for the education timeline.

---

## Data Files

### `src/data/projects.ts`

**What it does:** Defines the portfolio projects data and available filter categories.

**Key things inside:**
- `Project` interface: `id`, `title`, `description`, `category`, `techStack`, `liveUrl`, `githubUrl`, `thumbnail`
- `projects` array with 3 projects: Cafe Marahuyo POS, SpotCheck Parking, Side Quest Tasks
- `categories` array: `["All", "Web App"]`

**Connects to:** Used by `src/app/projects/page.tsx`, `src/app/projects/[id]/page.tsx`, `src/app/api/projects/route.ts`, and `ProjectCard` component.

---

### `src/data/resume.ts`

**What it does:** Contains all structured resume data including education, organizations, leadership roles, projects, and skills.

**Key things inside:**
- TypeScript interfaces: `Education`, `Organization`, `ClassroomOfficer`, `Project`, `SkillGroup`
- `education` array (PUP QC and senior high school)
- `organizations` array (6 organizations with roles and dates)
- `classroomOfficer` array (3 positions)
- `projects` array (3 academic projects)
- `skillGroups` array (5 categories: Design, Programming, Web Dev, Tools, Other)

**Connects to:** Used by `src/app/resume/page.tsx`.

---

### `src/data/techStack.ts`

**What it does:** Defines the nodes and edges for the React Flow tech stack visualization.

**Key things inside:**
- `TechNodeData` interface: `label`, `category`, `proficiency`
- `techNodes` array - 12 technology nodes with positions, categories, and proficiency scores (e.g., Canva, Python, HTML, Git)
- `techEdges` array - 11 edges connecting related technologies (some animated)

**Connects to:** Used by `src/components/TechStackFlow.tsx` to render the interactive graph.

---

## How It All Fits Together

```
layout.tsx (root layout)
  |-- globals.css (all styles)
  |-- ThemeProvider.tsx (dark/light mode)
  |-- Navbar.tsx (navigation)
  |-- Footer.tsx (site footer)
  |
  |-- page.tsx (Home - landing hero)
  |-- about/page.tsx --> Timeline, GlassCard
  |-- projects/page.tsx --> ProjectCard --> data/projects.ts
  |-- projects/[id]/page.tsx --> data/projects.ts
  |-- resume/page.tsx --> GlassCard --> data/resume.ts
  |-- tech-stack/page.tsx --> TechStackFlow --> data/techStack.ts
  |-- contact/page.tsx --> ContactForm --> api/contact/route.ts
  |
  |-- api/contact/route.ts (email sending)
  |-- api/projects/route.ts (JSON API)
```

Each page uses the shared layout (navbar + footer + theme). Components are reusable building blocks. Data files keep content separate from presentation. API routes handle server-side logic.
