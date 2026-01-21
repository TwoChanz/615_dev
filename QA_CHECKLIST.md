# QA_CHECKLIST.md

Acceptance testing checklist for Six1Five Devs.

## Build Verification

### Local Build
- [ ] `npm install` completes without errors
- [ ] `npm run dev` starts development server
- [ ] `npm run build` completes successfully
- [ ] `npm run start` serves production build
- [ ] `npm run lint` passes with no errors

### Console
- [ ] No JavaScript errors in browser console
- [ ] No React hydration warnings
- [ ] No 404 errors for assets

## Page Tests

### Homepage `/`
- [ ] Hero section renders with gradient background
- [ ] "Building in Public" badge visible
- [ ] "Explore Tools" and "Read the Blog" buttons work
- [ ] Feature cards (Tools, Labs, Guides, Resources) link correctly
- [ ] Tools grid displays all tools from data
- [ ] Recent content section shows 4 articles
- [ ] Newsletter form visible with lead magnet mention
- [ ] Affiliate block displays featured tools
- [ ] Product CTA (AppPilot) links correctly

### Tools `/tools`
- [ ] Page title and description render
- [ ] All tools from `lib/tools.ts` display
- [ ] Tool cards show: name, status badge, tagline, tags
- [ ] Clicking card navigates to `/tools/[slug]`

### Tool Detail `/tools/[slug]`
- [ ] Back button returns to `/tools`
- [ ] Status badge displays correct color
- [ ] Tool name, tagline, description render
- [ ] Tags display as badges
- [ ] Primary CTA links to `websiteUrl` (external)
- [ ] Docs and GitHub buttons appear if URLs exist
- [ ] Features list renders if present
- [ ] Use cases list renders if present
- [ ] Tech stack badges render if present
- [ ] Related tools section shows relevant tools
- [ ] Newsletter form at bottom

### Blog `/blog`
- [ ] Page title renders
- [ ] All posts from `blogPosts` array display
- [ ] Featured badge appears on featured posts
- [ ] Date and reading time visible
- [ ] Cards link to `/blog/[slug]`

### Blog Post `/blog/[slug]`
- [ ] Back button returns to `/blog`
- [ ] Article header shows title, date, reading time, tags
- [ ] Content area renders (placeholder or real)
- [ ] Related posts section appears
- [ ] Newsletter CTA at bottom

### Guides `/guides`
- [ ] Same checks as Blog page

### Guide Detail `/guides/[slug]`
- [ ] Same checks as Blog Post page

### Labs `/labs`
- [ ] Same checks as Blog page

### Lab Detail `/labs/[slug]`
- [ ] Same checks as Blog Post page

### Resources `/resources`
- [ ] Page renders
- [ ] Affiliate tools display by category

### About `/about`
- [ ] Page renders with content

### Contact `/contact`
- [ ] Page renders
- [ ] Contact method visible (form or mailto)

### Error Pages
- [ ] `/nonexistent-page` shows 404 page
- [ ] 404 has link back to homepage

## Interactive Elements

### Navigation
- [ ] Desktop: all nav links visible and work
- [ ] Mobile: hamburger menu opens/closes
- [ ] Mobile: menu links navigate and close menu
- [ ] Logo links to homepage
- [ ] Current page indicated in nav (if styled)

### Theme Toggle
- [ ] Toggle button visible in header
- [ ] Clicking switches between light/dark
- [ ] Theme persists on page refresh
- [ ] System preference respected on first load

### Newsletter Form
- [ ] Email input accepts text
- [ ] Submit button enabled when email entered
- [ ] Submitting shows loading state
- [ ] Success message appears after submit
- [ ] Error state shows for invalid email
- [ ] API returns 200 for valid submission

### External Links
- [ ] Tool website links open in new tab
- [ ] GitHub links open in new tab
- [ ] Docs links open in new tab
- [ ] Affiliate links have correct `rel` attributes
- [ ] Social links in footer work

## Responsive Testing

### Mobile (375px)
- [ ] No horizontal scroll
- [ ] Text readable without zooming
- [ ] Buttons tappable (min 44px touch target)
- [ ] Cards stack single column
- [ ] Images scale appropriately

### Tablet (768px)
- [ ] Navigation may show hamburger or full
- [ ] Cards display 2-column grid
- [ ] Spacing adjusts appropriately

### Desktop (1280px+)
- [ ] Full navigation visible
- [ ] Cards display 3-column grid
- [ ] Container max-width respected
- [ ] Side padding adequate

## Accessibility

### Keyboard Navigation
- [ ] Tab order logical
- [ ] Focus states visible
- [ ] Skip link present (if implemented)
- [ ] Modal/menu can be closed with Escape

### Screen Reader
- [ ] Images have alt text
- [ ] Buttons have accessible names
- [ ] Headings in logical order
- [ ] Links have descriptive text

### Color Contrast
- [ ] Text meets WCAG AA (4.5:1 for normal, 3:1 for large)
- [ ] Interactive elements distinguishable

## SEO

### Meta Tags
- [ ] Unique `<title>` on each page
- [ ] `<meta name="description">` on each page
- [ ] `og:title`, `og:description`, `og:image` present
- [ ] `twitter:card` meta tags present

### Structured Data
- [ ] JSON-LD renders on tool pages
- [ ] No errors in Google Rich Results Test

### Indexability
- [ ] No `noindex` on public pages
- [ ] Canonical URLs correct
- [ ] Internal links use relative paths or consistent domain

## Performance

### Lighthouse Scores (Target)
- [ ] Performance: > 80
- [ ] Accessibility: > 90
- [ ] Best Practices: > 90
- [ ] SEO: > 90

### Core Web Vitals
- [ ] LCP < 2.5s
- [ ] FID < 100ms
- [ ] CLS < 0.1

## Cross-Browser

### Chrome
- [ ] All features work

### Firefox
- [ ] All features work

### Safari
- [ ] All features work
- [ ] CSS backdrop-filter works

### Edge
- [ ] All features work
