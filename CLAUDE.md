# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Six1Five Devs developer website - a Next.js 16 content site serving as the discovery/SEO layer for external product domains (SubSense, AppPilot, FlightWindow, DevDash). Content is stored as TypeScript arrays, not a CMS.

## Commands

```bash
npm run dev      # Start development server
npm run build    # Production build
npm run lint     # Run ESLint
npm run start    # Start production server
```

## Architecture

### Tech Stack
- **Framework:** Next.js 16 with App Router (React 19, TypeScript, RSC enabled)
- **Styling:** Tailwind CSS 4 with shadcn/ui (new-york style, CSS variables)
- **Fonts:** Geist Sans + Geist Mono
- **Analytics:** Vercel Analytics
- **Theme:** next-themes with system/light/dark support

### Path Aliases
`@/*` maps to project root - use `@/components`, `@/lib`, etc.

### Content Model
Content is stored as TypeScript arrays (not a database or CMS):

**Tools** (`lib/tools.ts`):
- Add to `toolsData` array → automatically creates `/tools/[slug]` page
- Type: `Tool` with required fields: `slug`, `name`, `status`, `tagline`, `description`, `websiteUrl`, `tags`
- Status options: `"live" | "beta" | "alpha" | "coming-soon"`

**Articles** (`lib/content.ts`):
- Three arrays: `blogPosts`, `guides`, `labs`
- Type: `Article` with fields: `title`, `slug`, `description`, `date`, `readingTime`, `tags`, `type`, optional `featured`
- Article types determine URL path: `/blog/[slug]`, `/guides/[slug]`, `/labs/[slug]`

### Brand System
Teal/Purple gradient brand (dark mode optimized). Custom utilities in `app/globals.css`:
- `.text-gradient` - Teal→Purple gradient text
- `.glow`, `.glow-sm`, `.glow-lg` - Dual teal/purple glow effects
- `.glow-teal`, `.glow-purple` - Single-color glows
- `.container-page` - Max-width 7xl container with padding
- `.section`, `.section-lg` - Vertical section spacing
- `.border-gradient` - Teal/purple border effect
- `.card-interactive` - Hover state for cards

Primary color: `oklch(0.70 0.15 175)` (teal), Secondary: `oklch(0.55 0.20 280)` (purple/indigo)

### API Routes
- `app/api/analytics/track/route.ts` - Event tracking endpoint
- `app/api/newsletter/subscribe/route.ts` - Newsletter subscription
- `app/feed.xml/route.ts` - RSS feed generation

### Build Configuration
- TypeScript build errors ignored (`ignoreBuildErrors: true`)
- Images unoptimized (static export compatible)
- `www.` subdomain redirects to apex domain
