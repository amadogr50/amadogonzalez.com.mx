# amadogonzalez.com.mx

Personal portfolio and digital garden of **Amado González** — Lead Mobile & Product Engineer focused on building production-grade systems.

This is a **monorepo** containing the portfolio site, managed with **Turbo** and **pnpm workspaces**.

---

## Monorepo Structure

```
amadogonzalez.com.mx/
├── apps/
│   ├── web/             # Main portfolio site (Next.js, port 3000)
├── packages/
│   ├── ui/              # Shared React components
│   ├── types/           # Shared TypeScript types
│   ├── eslint-config/   # Shared ESLint configuration
│   └── prettier-config/ # Shared Prettier configuration
├── turbo.json           # Turbo build system configuration
└── pnpm-workspace.yaml  # pnpm monorepo configuration
```

### Applications (`apps/`)

#### **web** — Portfolio Site
- Next.js 15 application with App Router
- Responsive portfolio layout with project showcase
- **Payload CMS** embedded for content management (admin at `/admin`)
- Runs on `localhost:3000`

### Shared Packages (`packages/`)

#### **ui**
Reusable React components and design system used across the portfolio.

#### **types**
Shared TypeScript type definitions used across applications.

#### **eslint-config** & **prettier-config**
Enforces consistent code style and formatting across all projects.

---

## Tech Stack

### Core
- **Next.js 15** — React framework with App Router
- **React 19** — UI library
- **TypeScript** — Type-safe development

### Content & Analytics
- **Payload CMS** — Headless CMS embedded in the Next.js app, admin panel at `/admin`
- **Umami** — Self-hosted, privacy-first analytics

### Styling & Animation
- **TailwindCSS** — Utility-first CSS framework
- **Framer Motion** — Production-grade animations
- **PostCSS** — CSS processing

### Build & Tooling
- **Turbo** — High-performance build system
- **pnpm** — Fast, efficient package manager
- **ESLint** — Code linting
- **Prettier** — Code formatting

### Deployment
- **Vercel** — Hosting platform for the Next.js app
- **PostgreSQL** — Database for Payload CMS and Umami

---

## Environment Requirements

- **Node.js** >= 24
- **pnpm** >= 10

---

## Local Development

### 1. Install Dependencies

```bash
pnpm install
```

### 2. Start Infrastructure

Start PostgreSQL and Umami with Docker Compose:

```bash
pnpm infra:up
```

This starts:
- **PostgreSQL** on `localhost:5432` — used by both Payload CMS and Umami
- **Umami** on `http://localhost:3001` — analytics dashboard (default credentials: `admin` / `umami`)

### 3. Set Up Environment Variables

Copy the example environment file:

```bash
cp .env.example .env
```

Then update `.env` with your configuration. Key variables:

```
NODE_ENV=development
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/amadogonzalez
PAYLOAD_SECRET=dev-secret-change-in-production
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_UMAMI_URL=http://localhost:3001/script.js
NEXT_PUBLIC_UMAMI_WEBSITE_ID=<your-website-id-from-umami-dashboard>
```

### 4. Run Development Servers

```bash
pnpm dev       # all apps
pnpm dev:web   # web app only
```

This will:
- Start the portfolio site on `http://localhost:3000`
- Payload CMS admin panel on `http://localhost:3000/admin`

---

## Build Commands

All commands are orchestrated through Turbo and apply to the entire monorepo:

```bash
# Build all applications
pnpm build

# Run all development servers
pnpm dev

# Run only the web app
pnpm dev:web

# Regenerate Payload CMS import map (run after adding/changing collections)
pnpm cms:generate

# Lint all code
pnpm lint

# Type-check all code
pnpm typecheck

# Format all code with Prettier
pnpm format

# Check formatting without making changes
pnpm format:check

# Clean build artifacts
pnpm clean
```

## Infrastructure Commands

```bash
# Start all services (PostgreSQL, Umami)
pnpm infra:up

# Stop all services (keep volumes)
pnpm infra:stop

# Stop and remove containers (keep volumes)
pnpm infra:down

# Stop and remove containers + volumes (destructive)
pnpm infra:reset

# Tail logs from all services
pnpm infra:logs
```

---

## Features

- **Editorial-style portfolio** with project showcase
- **Fullscreen project viewer** for detailed work presentation
- **Payload CMS** — embedded headless CMS for content management
- **Umami analytics** — self-hosted, privacy-first pageview and event tracking
- **i18n** — English and Spanish via `next-intl`
- **Responsive design** optimized for all displays
- **Type-safe throughout** with full TypeScript coverage
- **Production-ready** with build optimization and deployment ready

---

## Philosophy

I approach software as both **craft and systems design**.

Good engineering is not just about implementing features — it's about building systems that:

- Scale under real production load
- Remain understandable over time
- Support evolving product needs
- Share patterns and consistency across projects

This portfolio reflects that philosophy.

---

## License

This project is open source under the MIT License.

You are welcome to use the code as inspiration for your own projects, but please do not copy the design or personal content directly.

---

## Author

**Amado González**
Lead Mobile & Product Engineer

- Portfolio: https://amadogonzalez.com.mx
- LinkedIn: https://linkedin.com/in/amadogonzalez
- GitHub: https://github.com/amadogonzalez
