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

### Brand Assets

**Logos** (`public/`):

| File | Size | Use Case |
|------|------|----------|
| `logo.svg` | 48x48 | Full site logo (header, footer, OG images) |
| `logo-mark.svg` | 32x32 | "615" monogram icon (compact spaces, favicons) |
| `logo-mark.png` | 32x32 | "615" monogram PNG version |
| `logo-full.png` | - | Full logo PNG for high-res displays |
| `icon.svg` | 32x32 | Favicon SVG source |
| `icon-source.png` | - | Source PNG for icon generation |

**PWA/Platform Icons** (`public/`):

| File | Size | Platform |
|------|------|----------|
| `favicon.ico` | 32x32 | Browser tab |
| `icon-192.png` | 192x192 | PWA manifest |
| `icon-512.png` | 512x512 | PWA manifest (splash) |
| `apple-icon.png` | 180x180 | iOS home screen |
| `icon-light-32x32.png` | 32x32 | Light theme favicon |
| `icon-dark-32x32.png` | 32x32 | Dark theme favicon |

**Additional PWA Icons** (`public/icons/`):

| File | Size | Platform |
|------|------|----------|
| `android-chrome-192x192.png` | 192x192 | Android Chrome |
| `android-chrome-512x512.png` | 512x512 | Android Chrome (splash) |
| `apple-touch-icon.png` | 180x180 | iOS Safari |
| `favicon-16x16.png` | 16x16 | Small favicon |
| `favicon-32x32.png` | 32x32 | Standard favicon |
| `favicon.ico` | 32x32 | Legacy favicon |

**Open Graph & Social** (`public/`):

| File | Size | Use Case |
|------|------|----------|
| `og-image.png` | 1200x630 | Open Graph social sharing |
| `og-image-square.png` | 1200x1200 | Square social sharing |
| `watermark.png` | - | Watermark overlay |

**Placeholders** (`public/`):

| File | Use Case |
|------|----------|
| `placeholder.jpg` | Generic placeholder image |
| `placeholder.svg` | SVG placeholder |
| `placeholder-logo.png` | Logo placeholder |
| `placeholder-logo.svg` | SVG logo placeholder |
| `placeholder-user.jpg` | User avatar placeholder |

**Tool Logos** (`public/tools/`):

| File | Product | Status |
|------|---------|--------|
| `subsense.png` | SubSense (subscription tracker) | beta |
| `subsense.svg` | SubSense SVG version | beta |
| `apppilot.png` | AppPilot (SaaS starter kit) | live |
| `apppilot.svg` | AppPilot SVG version | live |
| `flightwindow.png` | FlightWindow (flight tracking) | beta |
| `flightwindow.svg` | FlightWindow SVG version | beta |
| `devdash.svg` | DevDash (developer dashboard) | coming-soon |

**Brand Colors**:

| Role | OKLCH | Hex | Usage |
|------|-------|-----|-------|
| Primary (Teal) | `oklch(0.70 0.15 175)` | #14b8a6 | Buttons, links, primary accents |
| Secondary (Purple) | `oklch(0.55 0.20 280)` | #8b5cf6 | Gradients, hover states, badges |
| Gradient | teal → purple | - | Logos, CTAs, text highlights |

### API Routes
- `app/api/analytics/track/route.ts` - Event tracking endpoint
- `app/api/newsletter/subscribe/route.ts` - Newsletter subscription
- `app/feed.xml/route.ts` - RSS feed generation

### Build Configuration
- TypeScript build errors ignored (`ignoreBuildErrors: true`)
- Images unoptimized (static export compatible)
- `www.` subdomain redirects to apex domain
