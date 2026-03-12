# amadogonzalez.dev

Personal portfolio and digital garden of **Amado González** — Lead Mobile & Product Engineer focused on building production-grade systems.

This is a **monorepo** containing the portfolio site and CMS, managed with **Turbo** and **pnpm workspaces**.

---

## Monorepo Structure

```
amadogonzalez.dev/
├── apps/
│   ├── web/             # Main portfolio site (Next.js, port 3000)
│   └── cms/             # Payload CMS backend (Next.js, port 3001)
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
- Next.js 15 single-page application
- Responsive portfolio layout with project showcase
- Runs on `localhost:3000`
- Displays content managed through the CMS

#### **cms** — Content Management System
- Payload CMS with PostgreSQL database
- Admin interface for managing portfolio content
- GraphQL and REST APIs for content
- Runs on `localhost:3001`

### Shared Packages (`packages/`)

#### **ui**
Reusable React components and design system used across the portfolio and CMS.

#### **types**
Shared TypeScript type definitions used across applications.

#### **eslint-config** & **prettier-config**
Enforces consistent code style and formatting across all projects.

---

## Tech Stack

### Core
- **Next.js 15** — React framework for both web app and CMS
- **React 19** — UI library
- **TypeScript** — Type-safe development

### Styling & Animation
- **TailwindCSS** — Utility-first CSS framework
- **Framer Motion** — Production-grade animations
- **PostCSS** — CSS processing

### Backend & Content
- **Payload CMS** — Headless CMS with built-in admin UI
- **PostgreSQL** — Database (via `@payloadcms/db-postgres`)
- **GraphQL** — Query language for content

### Build & Tooling
- **Turbo** — High-performance build system
- **pnpm** — Fast, efficient package manager
- **ESLint** — Code linting
- **Prettier** — Code formatting

### Deployment
- **Vercel** — Hosting platform

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

### 2. Set Up Environment Variables

Copy the example environment file:

```bash
cp .env.example .env
```

Then update `.env` with your configuration:

```
DATABASE_URL=postgresql://user:password@localhost:5432/amadogonzalez
PAYLOAD_SECRET=your-secret-key-here
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_CMS_URL=http://localhost:3001
```

### 3. Run Development Servers

Start all development servers (web + CMS):

```bash
pnpm dev
```

This will:
- Start the portfolio site on `http://localhost:3000`
- Start the CMS on `http://localhost:3001`

### 4. Generate CMS Types (Optional)

If you modify Payload CMS collections, regenerate TypeScript types:

```bash
pnpm cms payload:generate
```

---

## Build Commands

All commands are orchestrated through Turbo and apply to the entire monorepo:

```bash
# Build all applications
pnpm build

# Run development servers
pnpm dev

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

---

## Features

- **Editorial-style portfolio** with project showcase
- **Fullscreen project viewer** for detailed work presentation
- **Content management system** for maintaining portfolio data
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

- Portfolio: https://amadogonzalez.dev
- LinkedIn: https://linkedin.com/in/amadogonzalez
- GitHub: https://github.com/amadogonzalez
