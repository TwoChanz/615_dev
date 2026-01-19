/**
 * Six1Five Devs - 12-Month SEO Content Roadmap
 * 
 * Target Audience: Indie hackers, solo developers, vibe coders, SaaS builders
 * Primary Keywords: indie saas, automation workflows, ai tooling, developer productivity, vibe coding
 * 
 * Content Strategy: Pillar + Cluster model with strong internal linking
 */

// =============================================================================
// PILLAR PAGES (Comprehensive guides targeting high-volume keywords)
// =============================================================================

export const pillarPages = [
  {
    slug: "indie-saas-guide",
    title: "The Complete Guide to Building Indie SaaS Products in 2026",
    description: "Everything you need to know about building, launching, and growing a profitable SaaS as a solo developer. From idea validation to $10K MRR.",
    targetKeyword: "indie saas guide",
    searchVolume: "high",
    intent: "informational",
    wordCount: 5000,
    publishMonth: 1,
    clusters: ["saas-launch", "saas-pricing", "saas-marketing", "saas-tech-stack"],
    monetization: ["AppPilot promo", "Affiliate: hosting/database tools"],
  },
  {
    slug: "automation-workflows-guide",
    title: "Automation Workflows for Developers: Build Once, Run Forever",
    description: "Master automation patterns to 10x your productivity. From CI/CD to personal workflows, learn to automate everything that matters.",
    targetKeyword: "automation workflows developer",
    searchVolume: "medium",
    intent: "informational",
    wordCount: 4500,
    publishMonth: 2,
    clusters: ["github-actions", "zapier-make", "cron-jobs", "workflow-automation"],
    monetization: ["SubSense promo", "Affiliate: n8n, Make, Zapier"],
  },
  {
    slug: "ai-tools-developers-guide",
    title: "AI Tools for Developers: The 2026 Definitive Guide",
    description: "Every AI tool that matters for modern development. Code assistants, debugging, documentation, testing - all reviewed and compared.",
    targetKeyword: "ai tools for developers",
    searchVolume: "high",
    intent: "commercial",
    wordCount: 6000,
    publishMonth: 3,
    clusters: ["cursor-vs-copilot", "ai-code-review", "ai-testing", "llm-apis"],
    monetization: ["Affiliate: Cursor, v0, Copilot, Claude"],
  },
  {
    slug: "developer-productivity-system",
    title: "The Developer Productivity System: Ship More, Stress Less",
    description: "A complete system for maximizing output as a developer. Time management, focus techniques, tooling, and mindset for peak performance.",
    targetKeyword: "developer productivity",
    searchVolume: "high",
    intent: "informational",
    wordCount: 5000,
    publishMonth: 4,
    clusters: ["deep-work-coding", "dev-environment-setup", "productivity-tools", "focus-techniques"],
    monetization: ["DevDash promo", "Affiliate: productivity apps"],
  },
  {
    slug: "vibe-coding-manifesto",
    title: "Vibe Coding: Building Software with AI as Your Pair Programmer",
    description: "The art of coding with AI. How to think, prompt, and iterate when AI handles the syntax and you handle the vision.",
    targetKeyword: "vibe coding",
    searchVolume: "emerging",
    intent: "informational",
    wordCount: 4000,
    publishMonth: 5,
    clusters: ["ai-pair-programming", "prompt-engineering-code", "ai-first-development"],
    monetization: ["Course opportunity", "Affiliate: AI tools"],
  },
]

// =============================================================================
// MONTHLY CONTENT CALENDAR (Supporting Articles)
// =============================================================================

export const contentCalendar = {
  // Q1: Foundation Building
  month1: {
    theme: "Indie SaaS Foundations",
    articles: [
      {
        slug: "validate-saas-idea-weekend",
        title: "How to Validate Your SaaS Idea in One Weekend",
        type: "guide",
        intent: "informational",
        targetKeyword: "validate saas idea",
        pillarLink: "indie-saas-guide",
        wordCount: 2500,
      },
      {
        slug: "saas-tech-stack-2026",
        title: "The Optimal SaaS Tech Stack for Solo Developers in 2026",
        type: "guide",
        intent: "commercial",
        targetKeyword: "saas tech stack",
        pillarLink: "indie-saas-guide",
        wordCount: 3000,
      },
      {
        slug: "first-10-saas-customers",
        title: "Getting Your First 10 SaaS Customers (Without a Following)",
        type: "blog",
        intent: "informational",
        targetKeyword: "first saas customers",
        pillarLink: "indie-saas-guide",
        wordCount: 2000,
      },
      {
        slug: "saas-pricing-psychology",
        title: "SaaS Pricing Psychology: Why $29 Beats $19",
        type: "blog",
        intent: "informational",
        targetKeyword: "saas pricing strategy",
        pillarLink: "indie-saas-guide",
        wordCount: 1800,
      },
    ],
  },
  month2: {
    theme: "Automation Mastery",
    articles: [
      {
        slug: "github-actions-complete-guide",
        title: "GitHub Actions for SaaS: From Zero to CI/CD Hero",
        type: "guide",
        intent: "informational",
        targetKeyword: "github actions tutorial",
        pillarLink: "automation-workflows-guide",
        wordCount: 3500,
      },
      {
        slug: "automate-saas-onboarding",
        title: "Automate Your SaaS Onboarding with Webhooks and Workflows",
        type: "guide",
        intent: "informational",
        targetKeyword: "automate saas onboarding",
        pillarLink: "automation-workflows-guide",
        wordCount: 2500,
      },
      {
        slug: "n8n-vs-make-vs-zapier",
        title: "n8n vs Make vs Zapier: Which Automation Tool in 2026?",
        type: "blog",
        intent: "commercial",
        targetKeyword: "n8n vs zapier",
        pillarLink: "automation-workflows-guide",
        wordCount: 2800,
      },
      {
        slug: "cron-jobs-vercel",
        title: "Cron Jobs on Vercel: Schedule Anything with Edge Functions",
        type: "guide",
        intent: "informational",
        targetKeyword: "vercel cron jobs",
        pillarLink: "automation-workflows-guide",
        wordCount: 2000,
      },
    ],
  },
  month3: {
    theme: "AI Development Tools",
    articles: [
      {
        slug: "cursor-ai-complete-guide",
        title: "Cursor AI: The Complete Guide to AI-Powered Development",
        type: "guide",
        intent: "commercial",
        targetKeyword: "cursor ai guide",
        pillarLink: "ai-tools-developers-guide",
        wordCount: 4000,
      },
      {
        slug: "ai-code-review-setup",
        title: "Set Up AI Code Review in 15 Minutes with GitHub Actions",
        type: "guide",
        intent: "informational",
        targetKeyword: "ai code review github",
        pillarLink: "ai-tools-developers-guide",
        wordCount: 2200,
      },
      {
        slug: "best-llm-apis-developers",
        title: "Best LLM APIs for Developers: OpenAI vs Claude vs Gemini",
        type: "blog",
        intent: "commercial",
        targetKeyword: "best llm api developers",
        pillarLink: "ai-tools-developers-guide",
        wordCount: 3000,
      },
      {
        slug: "ai-testing-tools-2026",
        title: "AI Testing Tools That Actually Work in 2026",
        type: "blog",
        intent: "commercial",
        targetKeyword: "ai testing tools",
        pillarLink: "ai-tools-developers-guide",
        wordCount: 2500,
      },
    ],
  },
  month4: {
    theme: "Developer Productivity",
    articles: [
      {
        slug: "deep-work-for-coders",
        title: "Deep Work for Developers: 4-Hour Coding Sessions That Ship",
        type: "guide",
        intent: "informational",
        targetKeyword: "deep work programming",
        pillarLink: "developer-productivity-system",
        wordCount: 2800,
      },
      {
        slug: "ultimate-dev-environment-2026",
        title: "The Ultimate Developer Environment Setup (2026 Edition)",
        type: "guide",
        intent: "informational",
        targetKeyword: "developer environment setup",
        pillarLink: "developer-productivity-system",
        wordCount: 3500,
      },
      {
        slug: "productivity-apps-developers",
        title: "10 Productivity Apps Every Developer Needs (That Aren't VSCode)",
        type: "blog",
        intent: "commercial",
        targetKeyword: "productivity apps developers",
        pillarLink: "developer-productivity-system",
        wordCount: 2200,
      },
      {
        slug: "fight-context-switching",
        title: "How to Fight Context Switching as a Solo Developer",
        type: "blog",
        intent: "informational",
        targetKeyword: "context switching developer",
        pillarLink: "developer-productivity-system",
        wordCount: 1800,
      },
    ],
  },
  month5: {
    theme: "Vibe Coding Era",
    articles: [
      {
        slug: "ai-pair-programming-workflow",
        title: "My AI Pair Programming Workflow: From Idea to Deployed",
        type: "blog",
        intent: "informational",
        targetKeyword: "ai pair programming",
        pillarLink: "vibe-coding-manifesto",
        wordCount: 2500,
      },
      {
        slug: "prompt-engineering-for-code",
        title: "Prompt Engineering for Code: Get Better AI Output Every Time",
        type: "guide",
        intent: "informational",
        targetKeyword: "prompt engineering code",
        pillarLink: "vibe-coding-manifesto",
        wordCount: 3000,
      },
      {
        slug: "v0-to-production",
        title: "From v0 to Production: Shipping AI-Generated UIs",
        type: "guide",
        intent: "informational",
        targetKeyword: "v0 vercel tutorial",
        pillarLink: "vibe-coding-manifesto",
        wordCount: 2800,
      },
      {
        slug: "when-not-to-use-ai-coding",
        title: "When NOT to Use AI for Coding (And What to Do Instead)",
        type: "blog",
        intent: "informational",
        targetKeyword: "ai coding limitations",
        pillarLink: "vibe-coding-manifesto",
        wordCount: 2000,
      },
    ],
  },
  // Q2: Deepening + Monetization
  month6: {
    theme: "SaaS Growth",
    articles: [
      {
        slug: "saas-seo-strategy",
        title: "SEO for SaaS: The Traffic Strategy That Got Me to 10K Visitors",
        type: "guide",
        intent: "informational",
        targetKeyword: "saas seo strategy",
        pillarLink: "indie-saas-guide",
        wordCount: 3500,
      },
      {
        slug: "content-marketing-indie-hackers",
        title: "Content Marketing for Indie Hackers: Build Traffic While Building Product",
        type: "blog",
        intent: "informational",
        targetKeyword: "content marketing indie hackers",
        pillarLink: "indie-saas-guide",
        wordCount: 2500,
      },
      {
        slug: "saas-analytics-setup",
        title: "SaaS Analytics Setup: Track What Actually Matters",
        type: "guide",
        intent: "informational",
        targetKeyword: "saas analytics",
        pillarLink: "indie-saas-guide",
        wordCount: 2800,
      },
      {
        slug: "reduce-saas-churn",
        title: "How I Reduced Churn by 40% with One Simple Email Sequence",
        type: "blog",
        intent: "informational",
        targetKeyword: "reduce saas churn",
        pillarLink: "indie-saas-guide",
        wordCount: 2000,
      },
    ],
  },
  month7: {
    theme: "Advanced Automation",
    articles: [
      {
        slug: "build-internal-tools-fast",
        title: "Build Internal Tools in Hours, Not Weeks",
        type: "guide",
        intent: "informational",
        targetKeyword: "build internal tools fast",
        pillarLink: "automation-workflows-guide",
        wordCount: 3000,
      },
      {
        slug: "webhook-patterns-saas",
        title: "Webhook Patterns Every SaaS Developer Should Know",
        type: "guide",
        intent: "informational",
        targetKeyword: "webhook patterns",
        pillarLink: "automation-workflows-guide",
        wordCount: 2500,
      },
      {
        slug: "automate-customer-support",
        title: "Automate 80% of Customer Support with AI + Workflows",
        type: "blog",
        intent: "informational",
        targetKeyword: "automate customer support",
        pillarLink: "automation-workflows-guide",
        wordCount: 2200,
      },
      {
        slug: "serverless-background-jobs",
        title: "Serverless Background Jobs: Queues Without the Infrastructure",
        type: "guide",
        intent: "informational",
        targetKeyword: "serverless background jobs",
        pillarLink: "automation-workflows-guide",
        wordCount: 2800,
      },
    ],
  },
  month8: {
    theme: "AI in Production",
    articles: [
      {
        slug: "add-ai-features-saas",
        title: "Adding AI Features to Your SaaS (Without Breaking the Bank)",
        type: "guide",
        intent: "informational",
        targetKeyword: "add ai to saas",
        pillarLink: "ai-tools-developers-guide",
        wordCount: 3500,
      },
      {
        slug: "ai-sdk-vercel-guide",
        title: "Vercel AI SDK: Build AI Apps in Next.js (Complete Guide)",
        type: "guide",
        intent: "informational",
        targetKeyword: "vercel ai sdk",
        pillarLink: "ai-tools-developers-guide",
        wordCount: 4000,
      },
      {
        slug: "vector-databases-compared",
        title: "Vector Databases Compared: Pinecone vs Supabase vs Neon",
        type: "blog",
        intent: "commercial",
        targetKeyword: "vector database comparison",
        pillarLink: "ai-tools-developers-guide",
        wordCount: 2800,
      },
      {
        slug: "rag-nextjs-tutorial",
        title: "Build a RAG System in Next.js: Complete Tutorial",
        type: "guide",
        intent: "informational",
        targetKeyword: "rag nextjs tutorial",
        pillarLink: "ai-tools-developers-guide",
        wordCount: 3500,
      },
    ],
  },
  month9: {
    theme: "Systems Thinking",
    articles: [
      {
        slug: "second-brain-developers",
        title: "Building a Second Brain for Developers",
        type: "guide",
        intent: "informational",
        targetKeyword: "second brain developer",
        pillarLink: "developer-productivity-system",
        wordCount: 3000,
      },
      {
        slug: "code-review-solo-developer",
        title: "Code Review as a Solo Developer: Self-Review That Works",
        type: "blog",
        intent: "informational",
        targetKeyword: "code review solo developer",
        pillarLink: "developer-productivity-system",
        wordCount: 2000,
      },
      {
        slug: "technical-debt-indie-saas",
        title: "Managing Technical Debt in Indie SaaS (Be Strategic, Not Perfect)",
        type: "blog",
        intent: "informational",
        targetKeyword: "technical debt indie developer",
        pillarLink: "developer-productivity-system",
        wordCount: 2200,
      },
      {
        slug: "developer-burnout-prevention",
        title: "Developer Burnout: Signs, Prevention, and Recovery",
        type: "blog",
        intent: "informational",
        targetKeyword: "developer burnout",
        pillarLink: "developer-productivity-system",
        wordCount: 2500,
      },
    ],
  },
  month10: {
    theme: "AI-First Building",
    articles: [
      {
        slug: "ship-faster-with-ai",
        title: "Ship 10x Faster: My AI-Assisted Development Workflow",
        type: "blog",
        intent: "informational",
        targetKeyword: "ai development workflow",
        pillarLink: "vibe-coding-manifesto",
        wordCount: 2800,
      },
      {
        slug: "ai-generated-tests",
        title: "AI-Generated Tests: Good Enough for Production?",
        type: "blog",
        intent: "informational",
        targetKeyword: "ai generated tests",
        pillarLink: "vibe-coding-manifesto",
        wordCount: 2200,
      },
      {
        slug: "claude-vs-gpt-coding",
        title: "Claude vs GPT-4 for Coding: Real-World Comparison",
        type: "blog",
        intent: "commercial",
        targetKeyword: "claude vs gpt coding",
        pillarLink: "vibe-coding-manifesto",
        wordCount: 3000,
      },
      {
        slug: "future-of-coding-ai",
        title: "The Future of Coding: What AI Means for Developers",
        type: "blog",
        intent: "informational",
        targetKeyword: "future of coding ai",
        pillarLink: "vibe-coding-manifesto",
        wordCount: 2500,
      },
    ],
  },
  // Q4: Consolidation + Year-End
  month11: {
    theme: "Scaling Solo",
    articles: [
      {
        slug: "one-person-saas-playbook",
        title: "The One-Person SaaS Playbook: $10K MRR Without a Team",
        type: "guide",
        intent: "informational",
        targetKeyword: "one person saas",
        pillarLink: "indie-saas-guide",
        wordCount: 4000,
      },
      {
        slug: "saas-launch-checklist",
        title: "The Ultimate SaaS Launch Checklist (2026 Edition)",
        type: "guide",
        intent: "transactional",
        targetKeyword: "saas launch checklist",
        pillarLink: "indie-saas-guide",
        wordCount: 3000,
      },
      {
        slug: "profitable-side-project",
        title: "From Side Project to Profitable SaaS: A 6-Month Timeline",
        type: "blog",
        intent: "informational",
        targetKeyword: "profitable side project",
        pillarLink: "indie-saas-guide",
        wordCount: 2500,
      },
      {
        slug: "micro-saas-ideas-2026",
        title: "50 Micro-SaaS Ideas for 2026 (With Validation Data)",
        type: "blog",
        intent: "informational",
        targetKeyword: "micro saas ideas",
        pillarLink: "indie-saas-guide",
        wordCount: 4000,
      },
    ],
  },
  month12: {
    theme: "Year in Review + Planning",
    articles: [
      {
        slug: "year-in-review-2026",
        title: "2026 Year in Review: Revenue, Lessons, and What's Next",
        type: "blog",
        intent: "informational",
        targetKeyword: "indie hacker year review",
        pillarLink: "indie-saas-guide",
        wordCount: 3000,
      },
      {
        slug: "best-dev-tools-2026",
        title: "The Best Developer Tools of 2026 (My Actual Stack)",
        type: "blog",
        intent: "commercial",
        targetKeyword: "best developer tools 2026",
        pillarLink: "developer-productivity-system",
        wordCount: 3500,
      },
      {
        slug: "indie-hacker-goals-2027",
        title: "Setting Indie Hacker Goals for 2027: A Framework",
        type: "blog",
        intent: "informational",
        targetKeyword: "indie hacker goals",
        pillarLink: "indie-saas-guide",
        wordCount: 2000,
      },
      {
        slug: "predictions-saas-2027",
        title: "Predictions for Indie SaaS in 2027",
        type: "blog",
        intent: "informational",
        targetKeyword: "saas predictions",
        pillarLink: "indie-saas-guide",
        wordCount: 2500,
      },
    ],
  },
}

// =============================================================================
// TAG TAXONOMY
// =============================================================================

export const tagTaxonomy = {
  // Primary Categories
  categories: [
    { slug: "saas", name: "SaaS", description: "Building and growing software as a service products" },
    { slug: "automation", name: "Automation", description: "Workflows, CI/CD, and automation patterns" },
    { slug: "ai", name: "AI & ML", description: "AI tools, LLMs, and machine learning for developers" },
    { slug: "productivity", name: "Productivity", description: "Developer productivity and workflow optimization" },
    { slug: "tutorials", name: "Tutorials", description: "Step-by-step guides and how-tos" },
  ],
  // Secondary Tags
  tags: [
    "nextjs", "vercel", "supabase", "stripe", "typescript",
    "github-actions", "automation", "webhooks", "api",
    "cursor", "copilot", "llm", "openai", "claude",
    "indie-hacker", "build-in-public", "revenue",
    "vibe-coding", "ai-coding", "prompt-engineering",
    "performance", "seo", "marketing", "growth",
  ],
}

// =============================================================================
// INTERNAL LINKING STRATEGY
// =============================================================================

export const linkingStrategy = {
  // Each pillar should link to its cluster articles
  pillarToCluster: "Pillar pages link down to all cluster articles in a dedicated section",
  
  // Cluster articles link back to pillar and to 2-3 related clusters
  clusterToPillar: "Each cluster article has a prominent link back to its pillar page",
  clusterToCluster: "Cluster articles link to 2-3 related articles in the same pillar group",
  
  // Cross-pillar linking for related topics
  crossPillar: "When topics overlap (e.g., AI + Productivity), link across pillar groups",
  
  // Tool pages as conversion points
  toolLinks: "All relevant articles should link to appropriate tool pages (SubSense, AppPilot, DevDash)",
  
  // Resource pages for affiliate content
  resourceLinks: "Comparison articles link to /resources for affiliate tools",
}

// =============================================================================
// MONETIZATION MAPPING
// =============================================================================

export const monetizationOpportunities = {
  // Product Promotions
  products: {
    subsense: ["automation", "saas", "finance", "productivity"],
    apppilot: ["saas", "nextjs", "boilerplate", "launch"],
    devdash: ["productivity", "github", "metrics", "dashboard"],
  },
  
  // Affiliate Categories
  affiliates: {
    hosting: ["vercel", "railway", "render"],
    database: ["supabase", "neon", "planetscale"],
    ai: ["cursor", "copilot", "v0", "anthropic"],
    automation: ["n8n", "make", "zapier"],
    email: ["resend", "postmark", "sendgrid"],
    analytics: ["posthog", "plausible", "amplitude"],
  },
  
  // Content Types Best for Each
  contentMonetization: {
    comparison: "Best for affiliate links (e.g., 'X vs Y')",
    tutorial: "Best for tool promotion with setup guides",
    listicle: "Best for multiple affiliate opportunities",
    case_study: "Best for product promotion (build logs)",
  },
}

// =============================================================================
// SEARCH INTENT MAPPING
// =============================================================================

export const searchIntentTypes = {
  informational: {
    description: "User wants to learn",
    examples: ["how to build saas", "what is vibe coding"],
    cta: "Newsletter signup, related articles",
  },
  commercial: {
    description: "User is researching before purchase",
    examples: ["best ai coding tools", "cursor vs copilot"],
    cta: "Affiliate links, comparison tables",
  },
  transactional: {
    description: "User is ready to take action",
    examples: ["cursor ai download", "vercel pricing"],
    cta: "Direct product links, sign up buttons",
  },
  navigational: {
    description: "User looking for specific resource",
    examples: ["six1five devs blog", "subsense login"],
    cta: "Clear navigation, quick links",
  },
}
