/**
 * Six1Five Devs - Monetization Strategy & Configuration
 * 
 * REVENUE STACKING MODEL (5 Revenue Streams)
 * ==========================================
 * 
 * 1. AFFILIATE REVENUE (Primary - 40% of revenue)
 *    - Developer tools (Vercel, Supabase, Cursor, etc.)
 *    - SaaS tools (Stripe, Resend, Loops)
 *    - Courses and educational content
 *    - Commission: 20-50% recurring or $50-500 one-time
 * 
 * 2. DIGITAL PRODUCTS (Secondary - 30% of revenue)
 *    - Premium templates and boilerplates
 *    - Course bundles
 *    - Notion templates for developers
 *    - Pricing: $29-199 one-time
 * 
 * 3. NEWSLETTER SPONSORSHIPS (Tertiary - 15% of revenue)
 *    - Targeted developer audience
 *    - Weekly newsletter with 10k+ subscribers (goal)
 *    - Pricing: $500-2000 per placement
 * 
 * 4. TOOL SUBSCRIPTIONS (Growth - 10% of revenue)
 *    - SubSense, AppPilot, DevDash
 *    - Freemium with premium tiers
 *    - Pricing: $9-49/month
 * 
 * 5. CONSULTING/COACHING (Opportunistic - 5% of revenue)
 *    - Limited 1:1 sessions
 *    - Code reviews
 *    - Pricing: $250-500/hour
 * 
 * CONVERSION FLOW ARCHITECTURE
 * ============================
 * 
 * AWARENESS (Top of Funnel)
 * ├── SEO Content (Guides, Blog Posts)
 * ├── Social Media (Twitter, YouTube)
 * └── Referrals
 *     ↓
 * INTEREST (Middle of Funnel)
 * ├── In-content affiliate links (contextual)
 * ├── Tool recommendations (sidebar)
 * └── Free resources (lead magnets)
 *     ↓
 * DECISION (Bottom of Funnel)
 * ├── Newsletter signup (email capture)
 * ├── Product pages (tools, templates)
 * └── Comparison content
 *     ↓
 * ACTION (Conversion)
 * ├── Affiliate purchase
 * ├── Digital product purchase
 * └── Tool subscription
 *     ↓
 * RETENTION (Post-Conversion)
 * ├── Newsletter nurturing
 * ├── Exclusive content
 * └── Community access
 * 
 * PLACEMENT ARCHITECTURE
 * ======================
 * 
 * Homepage:
 * - Hero: Newsletter CTA (primary)
 * - Below fold: Featured tools with affiliate links
 * - Footer: Affiliate block (essential stack)
 * 
 * Blog/Guide Pages:
 * - After intro: Contextual affiliate (if relevant)
 * - Mid-content: Inline tool mentions
 * - After content: Related products CTA
 * - Sidebar: Newsletter + top affiliates
 * - Footer: Full affiliate block
 * 
 * Tool Pages:
 * - Hero: Tool CTA
 * - Comparison: Affiliate alternatives
 * - Footer: Related tools
 * 
 * Resources Page:
 * - Dedicated affiliate showcase
 * - Category organization
 * - Featured deals section
 */

// Affiliate Program Configuration
export interface AffiliateProgram {
  id: string
  name: string
  url: string
  affiliateUrl: string
  description: string
  category: AffiliateCategory
  commission: string
  cookieDuration: string
  featured: boolean
  discount?: string
  logo?: string
  tier: "essential" | "recommended" | "alternative"
}

export type AffiliateCategory =
  | "hosting"
  | "database"
  | "payments"
  | "email"
  | "development"
  | "design"
  | "analytics"
  | "ai"
  | "education"
  | "productivity"

export const affiliatePrograms: AffiliateProgram[] = [
  // ESSENTIAL TIER (Primary recommendations)
  {
    id: "vercel",
    name: "Vercel",
    url: "https://vercel.com",
    affiliateUrl: "https://vercel.com/?ref=six1five",
    description: "Deploy Next.js apps instantly. Zero config, infinite scale.",
    category: "hosting",
    commission: "$50-500 per referral",
    cookieDuration: "30 days",
    featured: true,
    tier: "essential",
  },
  {
    id: "supabase",
    name: "Supabase",
    url: "https://supabase.com",
    affiliateUrl: "https://supabase.com/?ref=six1five",
    description: "Open source Firebase alternative. Postgres, Auth, Storage.",
    category: "database",
    commission: "25% recurring",
    cookieDuration: "60 days",
    featured: true,
    tier: "essential",
  },
  {
    id: "stripe",
    name: "Stripe",
    url: "https://stripe.com",
    affiliateUrl: "https://stripe.com/?ref=six1five",
    description: "The gold standard for payment processing.",
    category: "payments",
    commission: "$5 per activated account",
    cookieDuration: "90 days",
    featured: true,
    tier: "essential",
  },
  {
    id: "cursor",
    name: "Cursor",
    url: "https://cursor.sh",
    affiliateUrl: "https://cursor.sh/?ref=six1five",
    description: "AI-first code editor. Ship 10x faster.",
    category: "development",
    commission: "20% first year",
    cookieDuration: "30 days",
    featured: true,
    tier: "essential",
  },
  {
    id: "resend",
    name: "Resend",
    url: "https://resend.com",
    affiliateUrl: "https://resend.com/?ref=six1five",
    description: "Email API built for developers. Beautiful React emails.",
    category: "email",
    commission: "20% recurring",
    cookieDuration: "30 days",
    featured: true,
    discount: "Free tier available",
    tier: "essential",
  },

  // RECOMMENDED TIER (Strong alternatives)
  {
    id: "neon",
    name: "Neon",
    url: "https://neon.tech",
    affiliateUrl: "https://neon.tech/?ref=six1five",
    description: "Serverless Postgres with branching. Modern DX.",
    category: "database",
    commission: "25% recurring",
    cookieDuration: "30 days",
    featured: false,
    tier: "recommended",
  },
  {
    id: "railway",
    name: "Railway",
    url: "https://railway.app",
    affiliateUrl: "https://railway.app/?ref=six1five",
    description: "Deploy anything. Databases, services, cron jobs.",
    category: "hosting",
    commission: "$5 per referral",
    cookieDuration: "30 days",
    featured: false,
    tier: "recommended",
  },
  {
    id: "loops",
    name: "Loops",
    url: "https://loops.so",
    affiliateUrl: "https://loops.so/?ref=six1five",
    description: "Email marketing for SaaS. Automated sequences.",
    category: "email",
    commission: "20% recurring",
    cookieDuration: "30 days",
    featured: false,
    tier: "recommended",
  },
  {
    id: "lemonsqueezy",
    name: "Lemon Squeezy",
    url: "https://lemonsqueezy.com",
    affiliateUrl: "https://lemonsqueezy.com/?ref=six1five",
    description: "Merchant of record. Taxes handled for you.",
    category: "payments",
    commission: "30% recurring",
    cookieDuration: "30 days",
    featured: false,
    discount: "No setup fees",
    tier: "recommended",
  },
  {
    id: "upstash",
    name: "Upstash",
    url: "https://upstash.com",
    affiliateUrl: "https://upstash.com/?ref=six1five",
    description: "Serverless Redis & Kafka. Rate limiting, caching.",
    category: "database",
    commission: "20% recurring",
    cookieDuration: "30 days",
    featured: false,
    tier: "recommended",
  },

  // ALTERNATIVE TIER (Good options)
  {
    id: "planetscale",
    name: "PlanetScale",
    url: "https://planetscale.com",
    affiliateUrl: "https://planetscale.com/?ref=six1five",
    description: "MySQL-compatible serverless database.",
    category: "database",
    commission: "15% recurring",
    cookieDuration: "30 days",
    featured: false,
    tier: "alternative",
  },
  {
    id: "cloudflare",
    name: "Cloudflare",
    url: "https://cloudflare.com",
    affiliateUrl: "https://cloudflare.com/?ref=six1five",
    description: "CDN, Workers, Pages. Global edge network.",
    category: "hosting",
    commission: "10% recurring",
    cookieDuration: "45 days",
    featured: false,
    tier: "alternative",
  },
  {
    id: "posthog",
    name: "PostHog",
    url: "https://posthog.com",
    affiliateUrl: "https://posthog.com/?ref=six1five",
    description: "Product analytics, feature flags, session replay.",
    category: "analytics",
    commission: "15% recurring",
    cookieDuration: "30 days",
    featured: false,
    tier: "alternative",
  },
]

// Digital Products Configuration
export interface DigitalProduct {
  id: string
  name: string
  description: string
  price: number
  originalPrice?: number
  type: "template" | "course" | "bundle" | "guide"
  url: string
  featured: boolean
  salesCount?: number
}

export const digitalProducts: DigitalProduct[] = [
  {
    id: "apppilot-starter",
    name: "AppPilot Starter Kit",
    description: "Production-ready Next.js SaaS boilerplate with auth, billing, and dashboard.",
    price: 149,
    originalPrice: 199,
    type: "template",
    url: "/products/apppilot",
    featured: true,
    salesCount: 47,
  },
  {
    id: "indie-saas-playbook",
    name: "Indie SaaS Playbook",
    description: "Complete guide to building and launching your first profitable SaaS.",
    price: 49,
    type: "guide",
    url: "/products/indie-saas-playbook",
    featured: true,
  },
  {
    id: "automation-templates",
    name: "Automation Templates Bundle",
    description: "50+ ready-to-use automation workflows for n8n, Make, and Zapier.",
    price: 29,
    type: "bundle",
    url: "/products/automation-templates",
    featured: false,
  },
]

// Newsletter Configuration
export interface NewsletterConfig {
  provider: "resend" | "loops" | "convertkit" | "buttondown"
  listId: string
  apiEndpoint: string
  leadMagnets: LeadMagnet[]
  growthLoops: GrowthLoop[]
}

export interface LeadMagnet {
  id: string
  name: string
  description: string
  deliverable: string
  conversionRate: number // Expected %
  placement: ("homepage" | "blog" | "guide" | "tool" | "popup")[]
}

export interface GrowthLoop {
  id: string
  name: string
  trigger: string
  action: string
  expectedGrowth: string
}

export const newsletterConfig: NewsletterConfig = {
  provider: "resend",
  listId: "PLACEHOLDER_LIST_ID",
  apiEndpoint: "/api/newsletter/subscribe",
  leadMagnets: [
    {
      id: "saas-checklist",
      name: "SaaS Launch Checklist",
      description: "50-point checklist for launching your first SaaS",
      deliverable: "PDF + Notion template",
      conversionRate: 8,
      placement: ["homepage", "guide"],
    },
    {
      id: "tech-stack-guide",
      name: "2026 Indie Hacker Tech Stack",
      description: "Complete breakdown of the best tools for solo founders",
      deliverable: "PDF guide",
      conversionRate: 12,
      placement: ["blog", "tool"],
    },
    {
      id: "automation-starter",
      name: "5 Automation Workflows",
      description: "Ready-to-import workflows that save 10+ hours/week",
      deliverable: "JSON templates",
      conversionRate: 15,
      placement: ["guide", "popup"],
    },
  ],
  growthLoops: [
    {
      id: "referral",
      name: "Referral Program",
      trigger: "Subscriber refers a friend",
      action: "Both get exclusive content",
      expectedGrowth: "15% monthly",
    },
    {
      id: "social-share",
      name: "Social Share Loop",
      trigger: "Reader finds value in content",
      action: "One-click share to Twitter",
      expectedGrowth: "5% monthly",
    },
    {
      id: "tool-launch",
      name: "Tool Launch Announcement",
      trigger: "New tool or feature ships",
      action: "Exclusive early access for subscribers",
      expectedGrowth: "20% during launches",
    },
  ],
}

// Conversion Points Configuration
export interface ConversionPoint {
  id: string
  type: "newsletter" | "affiliate" | "product" | "tool"
  placement: string
  priority: "primary" | "secondary" | "tertiary"
  component: string
}

export const conversionPoints: ConversionPoint[] = [
  // Homepage
  { id: "home-hero-newsletter", type: "newsletter", placement: "homepage-hero", priority: "primary", component: "NewsletterHero" },
  { id: "home-tools-affiliate", type: "affiliate", placement: "homepage-tools", priority: "secondary", component: "AffiliateBlock" },
  { id: "home-footer-newsletter", type: "newsletter", placement: "homepage-footer", priority: "tertiary", component: "NewsletterForm" },
  
  // Blog/Guide Pages
  { id: "article-top-affiliate", type: "affiliate", placement: "article-intro", priority: "secondary", component: "InlineAffiliate" },
  { id: "article-mid-product", type: "product", placement: "article-middle", priority: "tertiary", component: "ProductCTA" },
  { id: "article-end-newsletter", type: "newsletter", placement: "article-footer", priority: "primary", component: "NewsletterCTA" },
  { id: "article-sidebar-affiliate", type: "affiliate", placement: "article-sidebar", priority: "secondary", component: "SidebarAffiliates" },
  
  // Tool Pages
  { id: "tool-hero-cta", type: "tool", placement: "tool-hero", priority: "primary", component: "ToolHero" },
  { id: "tool-comparison-affiliate", type: "affiliate", placement: "tool-comparison", priority: "secondary", component: "ComparisonTable" },
]

// Analytics Event Types
export interface AnalyticsEvent {
  category: "affiliate" | "newsletter" | "product" | "content" | "tool"
  action: string
  label: string
  value?: number
  metadata?: Record<string, string | number | boolean>
}

export const analyticsEvents = {
  // Affiliate Events
  affiliateClick: (programId: string, placement: string): AnalyticsEvent => ({
    category: "affiliate",
    action: "click",
    label: programId,
    metadata: { placement, timestamp: Date.now() },
  }),
  affiliateImpression: (programId: string, placement: string): AnalyticsEvent => ({
    category: "affiliate",
    action: "impression",
    label: programId,
    metadata: { placement },
  }),

  // Newsletter Events
  newsletterSubscribe: (source: string, leadMagnet?: string): AnalyticsEvent => ({
    category: "newsletter",
    action: "subscribe",
    label: source,
    metadata: { leadMagnet: leadMagnet || "none" },
  }),
  newsletterFormView: (placement: string): AnalyticsEvent => ({
    category: "newsletter",
    action: "form_view",
    label: placement,
  }),

  // Product Events
  productView: (productId: string): AnalyticsEvent => ({
    category: "product",
    action: "view",
    label: productId,
  }),
  productClick: (productId: string, placement: string): AnalyticsEvent => ({
    category: "product",
    action: "click",
    label: productId,
    metadata: { placement },
  }),

  // Content Events
  contentRead: (slug: string, readTime: number, completion: number): AnalyticsEvent => ({
    category: "content",
    action: "read",
    label: slug,
    value: completion,
    metadata: { readTime },
  }),
  contentShare: (slug: string, platform: string): AnalyticsEvent => ({
    category: "content",
    action: "share",
    label: slug,
    metadata: { platform },
  }),
}

// Helper Functions
export function getAffiliatesByCategory(category: AffiliateCategory): AffiliateProgram[] {
  return affiliatePrograms.filter((p) => p.category === category)
}

export function getAffiliatesByTier(tier: AffiliateProgram["tier"]): AffiliateProgram[] {
  return affiliatePrograms.filter((p) => p.tier === tier)
}

export function getFeaturedAffiliates(): AffiliateProgram[] {
  return affiliatePrograms.filter((p) => p.featured)
}

export function getAffiliateById(id: string): AffiliateProgram | undefined {
  return affiliatePrograms.find((p) => p.id === id)
}

export function getContextualAffiliates(tags: string[]): AffiliateProgram[] {
  const categoryMap: Record<string, AffiliateCategory[]> = {
    nextjs: ["hosting", "database"],
    database: ["database"],
    payments: ["payments"],
    stripe: ["payments"],
    email: ["email"],
    ai: ["ai", "development"],
    automation: ["productivity"],
    saas: ["hosting", "database", "payments"],
    auth: ["database", "hosting"],
  }

  const relevantCategories = new Set<AffiliateCategory>()
  tags.forEach((tag) => {
    const categories = categoryMap[tag.toLowerCase()]
    if (categories) {
      categories.forEach((c) => relevantCategories.add(c))
    }
  })

  if (relevantCategories.size === 0) {
    return getFeaturedAffiliates()
  }

  return affiliatePrograms.filter(
    (p) => relevantCategories.has(p.category) && p.tier !== "alternative"
  )
}

export function getProductsByType(type: DigitalProduct["type"]): DigitalProduct[] {
  return digitalProducts.filter((p) => p.type === type)
}

export function getFeaturedProducts(): DigitalProduct[] {
  return digitalProducts.filter((p) => p.featured)
}
