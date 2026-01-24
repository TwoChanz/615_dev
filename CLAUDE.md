# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Six1Five Devs developer website - a Next.js 16 content site serving as the discovery/SEO layer for external product domains (SubSense, AppPilot, FlightWindow, DevDash). Content is stored as TypeScript arrays, not a CMS.

## Commands

```bash
npm run dev           # Start development server
npm run build         # Production build
npm run lint          # Run ESLint
npm run start         # Start production server
npm run test          # Run Vitest in watch mode
npm run test:run      # Run tests once
npm run test:coverage # Run tests with coverage report
npx vitest lib/validation.test.ts  # Run a single test file
npm run analyze       # Production build with bundle analyzer (ANALYZE=true)
npm run icons         # Generate PWA icons from public/icon-source.png
npm run screenshots   # Capture tool website screenshots (requires Playwright)
npm run screenshots:install  # One-time Playwright chromium setup
```

## Architecture

### Tech Stack
- **Framework:** Next.js 16 with App Router (React 19, TypeScript, RSC enabled)
- **Styling:** Tailwind CSS 4 with shadcn/ui (new-york style, CSS variables)
- **Fonts:** Geist Sans + Geist Mono
- **Testing:** Vitest with React Testing Library (jsdom environment)
- **Analytics:** Vercel Analytics, PostHog (optional)
- **Monitoring:** Sentry (optional)
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
Logos in `public/`: `logo.svg` (48x48 full logo), `logo-mark.svg` (32x32 "615" monogram), `icon.svg` (favicon source).
PWA icons in `public/icons/`. Tool logos in `public/tools/[toolslug].png`. Tool screenshots in `public/tools/screenshots/`.
OG image: `public/og-image.png` (1200x630).

### API Routes
- `app/api/analytics/track/route.ts` - Event tracking endpoint
- `app/api/newsletter/subscribe/route.ts` - Newsletter subscription (Resend)
- `app/api/contact/route.ts` - Contact form submission (Resend + Supabase)
- `app/feed.xml/route.ts` - RSS feed generation

### Environment Variables
All integrations are optional - site works without any env vars. Copy `.env.example` to `.env.local`.

| Variable | Purpose |
|----------|---------|
| `SUPABASE_URL`, `SUPABASE_ANON_KEY` | Database for form storage |
| `RESEND_API_KEY`, `RESEND_AUDIENCE_ID` | Email sending and newsletter |
| `ADMIN_EMAIL` | Contact form notifications |
| `NEXT_PUBLIC_POSTHOG_KEY`, `NEXT_PUBLIC_POSTHOG_HOST` | Product analytics |
| `SENTRY_DSN`, `SENTRY_AUTH_TOKEN`, `SENTRY_ORG`, `SENTRY_PROJECT` | Error monitoring |
| `NEXT_PUBLIC_GA_ID` | Google Analytics |

### Build Configuration
- TypeScript build errors enabled (`ignoreBuildErrors: false`)
- Images unoptimized (static export compatible)
- Sentry integration conditional on `SENTRY_DSN` being set
- `www.` subdomain redirects to apex domain
