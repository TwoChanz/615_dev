# FINISH.md

Definition of "done" for Six1Five Devs website.

## Core Requirements

### Navigation & Structure
- [ ] All routes render without errors: `/`, `/tools`, `/blog`, `/guides`, `/labs`, `/resources`, `/about`, `/contact`
- [ ] Dynamic routes work: `/tools/[slug]`, `/blog/[slug]`, `/guides/[slug]`, `/labs/[slug]`
- [ ] 404 page displays for invalid routes
- [ ] Header navigation links work on desktop and mobile
- [ ] Footer links work
- [ ] Back buttons return to correct parent pages

### Content Display
- [ ] Homepage displays hero, feature cards, tools grid, recent content, newsletter CTA, affiliate block
- [ ] Tools page lists all tools from `lib/tools.ts`
- [ ] Tool detail pages show: status badge, tagline, description, tags, features, use cases, tech stack, CTAs
- [ ] Blog/Guides/Labs pages list articles from `lib/content.ts`
- [ ] Article detail pages show: header, date, reading time, tags, content, related posts, newsletter CTA

### Monetization Components
- [ ] Newsletter form submits to `/api/newsletter/subscribe`
- [ ] Newsletter form shows success/error states
- [ ] Affiliate links render with tracking attributes
- [ ] Product CTAs link to correct destinations

### SEO & Meta
- [ ] Each page has unique `<title>` and `<meta description>`
- [ ] Open Graph tags present on all pages
- [ ] Twitter Card meta tags present
- [ ] JSON-LD schema on tool detail pages
- [ ] RSS feed generates at `/feed.xml`
- [ ] `robots.txt` allows indexing
- [ ] Sitemap generates (or is static)

### Theme & Styling
- [ ] Light mode renders correctly
- [ ] Dark mode renders correctly
- [ ] System preference detection works
- [ ] Theme toggle switches modes
- [ ] No layout shift on theme change
- [ ] Glow effects visible in dark mode

### Performance
- [ ] `npm run build` completes without errors
- [ ] Lighthouse Performance score > 80
- [ ] Lighthouse Accessibility score > 90
- [ ] No console errors in production build
- [ ] Images load without 404s

### Responsive Design
- [ ] Mobile (< 640px): single column layouts, hamburger menu
- [ ] Tablet (640-1024px): 2-column grids
- [ ] Desktop (> 1024px): full layouts, visible navigation

## Launch Checklist

### Pre-Launch
- [ ] All placeholder content replaced with real content
- [ ] External tool URLs (`websiteUrl`) point to actual products
- [ ] Social links in footer are real
- [ ] Contact form works or has valid mailto
- [ ] Privacy policy and terms pages have real content
- [ ] Favicon and app icons set
- [ ] OG image exists at `/og-image.png`

### Deployment
- [ ] Environment variables configured in Vercel
- [ ] Custom domain connected
- [ ] SSL certificate active
- [ ] www redirect working
- [ ] Analytics tracking verified

### Post-Launch
- [ ] Verify all pages indexable via Google Search Console
- [ ] Test newsletter subscription end-to-end
- [ ] Verify affiliate link tracking
- [ ] Check mobile rendering on real devices
