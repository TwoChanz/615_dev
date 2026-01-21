# TODO_FINISH.md

Remaining tasks to complete Six1Five Devs website.

## High Priority

### Content Integration
- [ ] Replace placeholder article content in `/blog/[slug]/page.tsx` with real MDX or markdown rendering
- [ ] Replace placeholder article content in `/guides/[slug]/page.tsx`
- [ ] Replace placeholder article content in `/labs/[slug]/page.tsx`
- [ ] Write actual blog posts for entries in `lib/content.ts`
- [ ] Add real screenshots to tool entries in `lib/tools.ts`

### API Integration
- [ ] Connect newsletter endpoint to Resend (or chosen provider)
- [ ] Configure `RESEND_API_KEY` and `RESEND_AUDIENCE_ID` env vars
- [ ] Implement lead magnet email delivery
- [ ] Connect analytics tracking endpoint to actual service

### SEO Completion
- [ ] Add sitemap generation (`app/sitemap.ts` or `public/sitemap.xml`)
- [ ] Add `robots.txt` file
- [ ] Verify canonical URLs are correct (currently `six1fivestudio.dev`, should be `six1five.dev`)
- [ ] Add structured data to article pages

## Medium Priority

### Missing Pages
- [ ] Create `/products` page for digital products
- [ ] Create individual product pages (`/products/[slug]`)
- [ ] Add search functionality
- [ ] Create tag/category filter pages

### Component Enhancements
- [ ] Add image components to tool cards (currently no logos displayed)
- [ ] Implement comparison tables for affiliate recommendations
- [ ] Add social share buttons to articles
- [ ] Implement reading progress indicator on articles

### Forms & Interactions
- [ ] Add form validation feedback (inline errors)
- [ ] Implement contact form on `/contact` page
- [ ] Add toast notifications for form submissions (Sonner is installed)

## Low Priority

### Performance
- [ ] Enable Next.js image optimization (currently `unoptimized: true`)
- [ ] Add image placeholders/blur for lazy loading
- [ ] Implement ISR for content pages if switching to CMS

### Analytics
- [ ] Implement scroll depth tracking
- [ ] Add affiliate impression tracking
- [ ] Implement content read completion tracking

### Nice to Have
- [ ] Add code syntax highlighting for technical content
- [ ] Implement copy-to-clipboard for code blocks
- [ ] Add table of contents for long articles
- [ ] Dark mode code block themes

## Technical Debt

### URL Consistency
- [ ] Fix canonical URL mismatch: `six1fivestudio.dev` vs `six1five.dev` in metadata
- [ ] Ensure all internal links use consistent domain

### Type Safety
- [ ] Re-enable TypeScript build errors (`ignoreBuildErrors: false`)
- [ ] Fix any type errors that surface

### Cleanup
- [ ] Remove `nul` file from project root
- [ ] Audit and remove unused dependencies
- [ ] Remove console.log statements before production
