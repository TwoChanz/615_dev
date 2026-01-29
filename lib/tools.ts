/**
 * Centralized Tools Data Model
 * Single source of truth for all tools/products displayed on six1five.dev
 * 
 * Architecture:
 * - six1five.dev serves as the discovery + SEO layer
 * - External product domains (websiteUrl) are the conversion/app layer
 */

export type ToolStatus = "live" | "beta" | "alpha" | "coming-soon"

export interface Tool {
  // Required fields
  slug: string
  name: string
  status: ToolStatus
  tagline: string
  description: string
  websiteUrl: string
  tags: string[]
  
  // Optional fields
  logo?: string
  screenshots?: string[]
  repoUrl?: string
  docsUrl?: string
  comingSoon?: boolean
  
  // SEO fields
  metaTitle?: string
  metaDescription?: string
  
  // Extended content for detail pages
  features?: string[]
  techStack?: string[]
  useCases?: string[]
}

/**
 * Tools Database
 * Add new tools here. They will automatically appear on /tools and get their own /tools/[slug] page.
 */
export const toolsData: Tool[] = [
  {
    slug: "subsense",
    name: "SubSense",
    status: "live",
    logo: "/tools/subsense.png",
    screenshots: ["/tools/screenshots/subsense-hero.png"],
    tagline: "AI-Powered Subscription Tracker",
    description: "Monitor your recurring payments, predict billing dates, and cut unwanted subscriptions. SubSense uses AI to analyze your spending patterns and help you save money on subscriptions you forgot about.",
    websiteUrl: "https://subsense.app",
    tags: ["saas", "ai", "fintech", "automation", "subscription-management"],
    features: [
      "AI-powered subscription detection from bank feeds",
      "Smart billing date predictions",
      "Cancellation reminders before renewal",
      "Spending analytics dashboard",
      "Export to CSV/PDF",
    ],
    techStack: ["Next.js", "TypeScript", "Supabase", "Stripe", "OpenAI", "Vercel"],
    useCases: [
      "Track personal subscriptions",
      "Manage family streaming services",
      "Business SaaS expense tracking",
      "Identify duplicate subscriptions",
    ],
    metaTitle: "SubSense - AI Subscription Tracker | Save Money on Recurring Payments",
    metaDescription: "SubSense helps you track, manage, and cancel unwanted subscriptions. AI-powered detection, billing predictions, and spending analytics.",
  },
  {
    slug: "apppilot",
    name: "AppPilot",
    status: "live",
    logo: "/tools/apppilot.png",
    screenshots: ["/tools/screenshots/apppilot-hero.png"],
    tagline: "SaaS Starter Kit for Indie Hackers",
    description: "Launch your SaaS faster with pre-built authentication, billing, and dashboard components. AppPilot gives you a production-ready foundation so you can focus on your unique features instead of boilerplate.",
    websiteUrl: "https://apppilot.co",
    tags: ["boilerplate", "nextjs", "stripe", "starter-kit", "saas"],
    repoUrl: "https://github.com/six1five/apppilot",
    docsUrl: "https://docs.apppilot.co",
    features: [
      "Next.js 14+ App Router architecture",
      "Stripe subscriptions with customer portal",
      "Auth.js (NextAuth) with multiple providers",
      "Admin dashboard with user management",
      "Email templates with Resend",
      "Comprehensive documentation",
    ],
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "shadcn/ui", "Stripe", "Auth.js", "Drizzle ORM"],
    useCases: [
      "Launch a micro-SaaS in a weekend",
      "Build subscription-based products",
      "Create authenticated dashboards",
      "Start freelance client projects faster",
    ],
    metaTitle: "AppPilot - SaaS Starter Kit | Ship Your Idea Faster",
    metaDescription: "Production-ready SaaS boilerplate with authentication, Stripe billing, and admin dashboard. Built with Next.js, TypeScript, and Tailwind CSS.",
  },
  {
    slug: "flightwindow",
    name: "FlightWindow",
    status: "alpha",
    logo: "/tools/flightwindow.png",
    screenshots: ["/tools/screenshots/flightwindow-hero.png"],
    tagline: "Real-Time Flight Tracking Dashboard",
    description: "A beautiful, real-time flight tracking dashboard for aviation enthusiasts and frequent travelers. Track flights worldwide, get delay predictions, and receive smart notifications.",
    websiteUrl: "https://flightwindow.app",
    tags: ["aviation", "real-time", "dashboard", "tracking", "travel"],
    comingSoon: false,
    features: [
      "Real-time global flight tracking",
      "Delay prediction using ML models",
      "Custom flight watchlists",
      "Airport weather integration",
      "Push notifications for status changes",
    ],
    techStack: ["Next.js", "TypeScript", "Mapbox", "FlightAware API", "Supabase", "Vercel Edge"],
    useCases: [
      "Track family members' flights",
      "Monitor connecting flight status",
      "Aviation enthusiast spotting",
      "Business travel management",
    ],
    metaTitle: "FlightWindow - Real-Time Flight Tracker | Never Miss a Flight Update",
    metaDescription: "Beautiful flight tracking dashboard with real-time updates, delay predictions, and smart notifications. Built for travelers and aviation enthusiasts.",
  },
  {
    slug: "devdash",
    name: "DevDash",
    status: "coming-soon",
    logo: "/tools/devdash.svg",
    screenshots: ["/tools/screenshots/devdash-hero.png"],
    tagline: "Personal Developer Dashboard",
    description: "Track GitHub contributions, project metrics, and learning goals in one unified view. DevDash is your personal command center for developer productivity.",
    websiteUrl: "https://devdash.dev",
    tags: ["dashboard", "productivity", "github", "metrics", "developer-tools"],
    comingSoon: true,
    features: [
      "GitHub contribution analytics",
      "Project health metrics",
      "Learning goal tracking",
      "Custom widget system",
      "Daily/weekly summaries",
    ],
    techStack: ["Next.js", "TypeScript", "GitHub API", "Supabase", "Chart.js"],
    useCases: [
      "Track personal coding progress",
      "Monitor open source contributions",
      "Set and achieve learning goals",
      "Share progress with accountability partners",
    ],
    metaTitle: "DevDash - Personal Developer Dashboard | Track Your Progress",
    metaDescription: "Unified dashboard for tracking GitHub contributions, project metrics, and learning goals. Built for developers who want to level up.",
  },
  {
    slug: "receiptrider",
    name: "ReceiptRider",
    status: "coming-soon",
    logo: "/tools/receiptrider.svg",
    screenshots: ["/tools/screenshots/receiptrider-hero.png"],
    tagline: "Smart Vehicle Maintenance Tracker",
    description: "Track every vehicle receipt from oil changes to new tires. ReceiptRider scans your receipts, predicts upcoming maintenance, and keeps a complete service history—perfect for staying on schedule or impressing buyers when you sell.",
    websiteUrl: "https://receiptrider.com",
    tags: ["automotive", "ai", "vehicle-maintenance", "receipts", "productivity"],
    comingSoon: true,
    features: [
      "AI-powered receipt scanning for auto services",
      "Smart maintenance predictions based on purchase history",
      "Automatic service interval reminders",
      "Complete vehicle service history log",
      "Resale-ready maintenance reports for buyers",
      "Multi-vehicle support",
    ],
    techStack: ["Next.js", "TypeScript", "Supabase", "OpenAI Vision", "Vercel"],
    useCases: [
      "Track oil changes and predict next service date",
      "Log tire purchases and monitor tread life",
      "Keep organized records for vehicle resale",
      "Never miss scheduled maintenance again",
    ],
    metaTitle: "ReceiptRider - Smart Vehicle Maintenance Tracker | AI-Powered",
    metaDescription: "Scan vehicle receipts, track maintenance history, and get smart reminders for oil changes, tires, and more. Perfect for car owners and resale prep.",
  },
]

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Get all tools
 */
export function getAllTools(): Tool[] {
  return toolsData
}

/**
 * Get tools by status
 */
export function getToolsByStatus(status: ToolStatus): Tool[] {
  return toolsData.filter((tool) => tool.status === status)
}

/**
 * Get a single tool by slug
 */
export function getToolBySlug(slug: string): Tool | undefined {
  return toolsData.find((tool) => tool.slug === slug)
}

/**
 * Get all tool slugs (for static generation)
 */
export function getAllToolSlugs(): string[] {
  return toolsData.map((tool) => tool.slug)
}

/**
 * Get related tools (excluding current tool, matching by tags)
 */
export function getRelatedTools(currentSlug: string, limit: number = 3): Tool[] {
  const currentTool = getToolBySlug(currentSlug)
  if (!currentTool) return []
  
  const currentTags = new Set(currentTool.tags)
  
  return toolsData
    .filter((tool) => tool.slug !== currentSlug)
    .map((tool) => ({
      tool,
      matchCount: tool.tags.filter((tag) => currentTags.has(tag)).length,
    }))
    .sort((a, b) => b.matchCount - a.matchCount)
    .slice(0, limit)
    .map(({ tool }) => tool)
}

/**
 * Get live tools (for homepage features)
 */
export function getLiveTools(): Tool[] {
  return toolsData.filter((tool) => tool.status === "live")
}

/**
 * Get tools that are not coming soon (for active display)
 */
export function getActiveTools(): Tool[] {
  return toolsData.filter((tool) => !tool.comingSoon)
}

/**
 * Search tools by name or tags
 */
export function searchTools(query: string): Tool[] {
  const lowerQuery = query.toLowerCase()
  return toolsData.filter(
    (tool) =>
      tool.name.toLowerCase().includes(lowerQuery) ||
      tool.tagline.toLowerCase().includes(lowerQuery) ||
      tool.tags.some((tag) => tag.toLowerCase().includes(lowerQuery))
  )
}

// ============================================================================
// Type exports for components
// ============================================================================

export type { Tool as ToolData }
