# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Six1Five Devs developer website - a Next.js 16 content site synced with v0.app deployments. Serves as the discovery/SEO layer for external product domains (SubSense, AppPilot, FlightWindow, DevDash).

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

### Path Aliases
`@/*` maps to project root - use `@/components`, `@/lib`, etc.

### Directory Structure
- `app/` - App Router pages with `[slug]` dynamic routes for blog, guides, labs, tools
- `components/` - React components; `components/ui/` contains shadcn primitives
- `lib/` - Data models and utilities
  - `lib/tools.ts` - Centralized tool/product data (single source of truth)
  - `lib/content.ts` - Blog posts, guides, labs content arrays
  - `lib/utils.ts` - `cn()` helper for className merging

### Content Model
Content is stored as TypeScript arrays in `lib/content.ts` and `lib/tools.ts`:
- Add tools to `toolsData` array in `lib/tools.ts` - automatically creates `/tools/[slug]` pages
- Add articles to `blogPosts`, `guides`, or `labs` arrays in `lib/content.ts`

### Brand System
Cyan primary color (#22d3ee / oklch 0.72 0.14 195). Custom utilities defined in `app/globals.css`:
- `.text-gradient` - Brand gradient text
- `.glow`, `.glow-sm`, `.glow-lg` - Cyan glow effects
- `.container-page` - Max-width container with padding
- `.section`, `.section-lg` - Vertical section spacing

### API Routes
- `app/api/analytics/track/route.ts` - Tracking endpoint
- `app/api/newsletter/subscribe/route.ts` - Newsletter subscription
- `app/feed.xml/route.ts` - RSS feed generation

### Build Configuration
TypeScript build errors are ignored (`ignoreBuildErrors: true` in next.config.mjs). Images are unoptimized.
