import type { Article } from "@/components/article-card"

// Re-export tools from centralized data model
export {
  getAllTools,
  getToolBySlug,
  getRelatedTools,
  type Tool,
} from "@/lib/tools"
import { getAllTools } from "@/lib/tools"

// Legacy tools array export (for components that import `tools` directly)
export const tools = getAllTools()

export const blogPosts: Article[] = [
  {
    title: "How We Built SubSense in 30 Days",
    slug: "building-subsense-30-days",
    description:
      "A deep dive into the architecture, tech stack decisions, and lessons learned while building a SaaS product. Includes revenue numbers and growth strategies.",
    date: "2026-01-15",
    readingTime: "12 min read",
    tags: ["build-in-public", "saas", "nextjs", "indie-hacker"],
    featured: true,
    type: "blog",
  },
  {
    title: "The Stack That Powers Six1Five Devs",
    slug: "six1five-tech-stack",
    description:
      "Breaking down every tool, framework, and service we use to build and ship products. From Next.js to Vercel to Stripe and beyond.",
    date: "2026-01-10",
    readingTime: "8 min read",
    tags: ["tech-stack", "nextjs", "vercel", "tools"],
    featured: false,
    type: "blog",
  },
  {
    title: "Why We Stopped Using Traditional ORMs",
    slug: "ditching-traditional-orms",
    description:
      "After years of fighting with Prisma migrations, we switched to a simpler approach. Here's what we learned and why raw SQL might be the answer.",
    date: "2026-01-05",
    readingTime: "6 min read",
    tags: ["database", "orm", "sql", "performance"],
    featured: false,
    type: "blog",
  },
]

export const guides: Article[] = [
  {
    title: "Complete Guide to Next.js App Router Authentication",
    slug: "nextjs-app-router-auth",
    description:
      "Learn how to implement secure authentication in Next.js 14+ using the App Router, middleware, and server actions. Covers Auth.js, custom JWT, and Supabase Auth.",
    date: "2026-01-12",
    readingTime: "18 min read",
    tags: ["nextjs", "authentication", "tutorial", "security"],
    featured: true,
    type: "guide",
  },
  {
    title: "Setting Up Stripe Subscriptions in Next.js",
    slug: "stripe-subscriptions-nextjs",
    description:
      "A comprehensive guide to integrating Stripe subscriptions with webhooks, customer portal, and metered billing. Production-ready code included.",
    date: "2026-01-08",
    readingTime: "15 min read",
    tags: ["stripe", "nextjs", "payments", "saas"],
    featured: false,
    type: "guide",
  },
  {
    title: "Building Real-Time Features with Server-Sent Events",
    slug: "server-sent-events-guide",
    description:
      "Skip the complexity of WebSockets. Learn how to implement real-time updates using SSE in Next.js with practical examples.",
    date: "2026-01-03",
    readingTime: "10 min read",
    tags: ["real-time", "sse", "nextjs", "tutorial"],
    featured: false,
    type: "guide",
  },
]

export const labs: Article[] = [
  {
    title: "Experiment: AI-Powered Code Review Bot",
    slug: "ai-code-review-bot",
    description:
      "Building a GitHub bot that uses GPT-4 to review PRs and suggest improvements. Week 1 progress and learnings.",
    date: "2026-01-14",
    readingTime: "5 min read",
    tags: ["ai", "github", "experiment", "automation"],
    featured: false,
    type: "lab",
  },
  {
    title: "Testing Edge Functions for Global API Distribution",
    slug: "edge-functions-testing",
    description:
      "Benchmarking Vercel Edge Functions against traditional serverless for API latency across different regions.",
    date: "2026-01-09",
    readingTime: "7 min read",
    tags: ["edge", "vercel", "performance", "benchmark"],
    featured: false,
    type: "lab",
  },
]

// Helper functions
export function getAllContent(): Article[] {
  return [...blogPosts, ...guides, ...labs].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )
}

export function getFeaturedContent(): Article[] {
  return getAllContent().filter((item) => item.featured)
}

export function getContentByType(type: Article["type"]): Article[] {
  return getAllContent().filter((item) => item.type === type)
}

export function getContentBySlug(
  slug: string,
  type: Article["type"]
): Article | undefined {
  return getAllContent().find(
    (item) => item.slug === slug && item.type === type
  )
}

export function getRecentContent(limit: number = 5): Article[] {
  return getAllContent().slice(0, limit)
}

export function getRelatedContent(
  currentSlug: string,
  tags: string[],
  limit: number = 3
): Article[] {
  return getAllContent()
    .filter(
      (item) =>
        item.slug !== currentSlug && item.tags.some((tag) => tags.includes(tag))
    )
    .slice(0, limit)
}

// Affiliate data
export const affiliateTools = [
  {
    name: "Vercel",
    description: "Deploy your Next.js apps with zero configuration",
    url: "https://vercel.com",
    category: "Hosting",
    featured: true,
  },
  {
    name: "Supabase",
    description: "Open source Firebase alternative with Postgres",
    url: "https://supabase.com",
    category: "Database",
    featured: true,
  },
  {
    name: "Stripe",
    description: "Payment processing for internet businesses",
    url: "https://stripe.com",
    category: "Payments",
    featured: false,
  },
  {
    name: "Resend",
    description: "Email API built for developers",
    url: "https://resend.com",
    category: "Email",
    featured: false,
    discount: "Free tier",
  },
  {
    name: "Cursor",
    description: "AI-first code editor built for pair programming",
    url: "https://cursor.sh",
    category: "Development",
    featured: true,
  },
]
