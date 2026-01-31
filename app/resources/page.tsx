import React from "react"
import type { Metadata } from "next"
import { Zap, Code, Database, CreditCard, Mail, Palette, Cpu, BarChart } from "lucide-react"

import { ResourceCard } from "@/components/affiliate-block"
import { EssentialStackCategories } from "@/components/essential-stack-categories"

// DEV ONLY: Artificial delay to test loading animations (remove for production)
const DEV_LOADING_DELAY = process.env.NODE_ENV === "development" ? 3000 : 0

async function devDelay() {
  if (DEV_LOADING_DELAY > 0) {
    await new Promise((resolve) => setTimeout(resolve, DEV_LOADING_DELAY))
  }
}
import { NewsletterForm } from "@/components/newsletter-form"
import { PrimaryCTA } from "@/components/cta-blocks"
import { LeadMagnetCTA } from "@/components/lead-magnet"
import {
  affiliatePrograms,
  getAffiliatesByCategory,
  getAffiliatesByTier,
  type AffiliateCategory,
} from "@/lib/monetization"

export const metadata: Metadata = {
  title: "Resources | Six1Five Devs",
  description:
    "Curated tools, templates, and resources we use to build products. Hosting, databases, payments, and development tools.",
  openGraph: {
    title: "Developer Resources | Six1Five Devs",
    description: "The complete stack for building and shipping SaaS products.",
  },
}

const categoryConfig: Record<AffiliateCategory, { name: string; icon: React.ReactNode; description: string }> = {
  hosting: {
    name: "Hosting & Deployment",
    icon: <Code className="size-5" />,
    description: "Deploy your apps with zero configuration",
  },
  database: {
    name: "Databases",
    icon: <Database className="size-5" />,
    description: "Serverless databases that scale with you",
  },
  payments: {
    name: "Payments",
    icon: <CreditCard className="size-5" />,
    description: "Accept payments globally with ease",
  },
  email: {
    name: "Email & Communications",
    icon: <Mail className="size-5" />,
    description: "Transactional and marketing email",
  },
  development: {
    name: "Development Tools",
    icon: <Cpu className="size-5" />,
    description: "Tools that make you more productive",
  },
  design: {
    name: "Design & UI",
    icon: <Palette className="size-5" />,
    description: "Design systems and UI components",
  },
  analytics: {
    name: "Analytics",
    icon: <BarChart className="size-5" />,
    description: "Understand your users and product",
  },
  ai: {
    name: "AI & Machine Learning",
    icon: <Cpu className="size-5" />,
    description: "Add AI capabilities to your apps",
  },
  education: {
    name: "Education",
    icon: <Code className="size-5" />,
    description: "Level up your skills",
  },
  productivity: {
    name: "Productivity",
    icon: <Zap className="size-5" />,
    description: "Work smarter, not harder",
  },
}

// Get unique categories that have affiliates
const activeCategories = [...new Set(affiliatePrograms.map((a) => a.category))] as AffiliateCategory[]

export default async function ResourcesPage() {
  await devDelay()
  const essentialAffiliates = getAffiliatesByTier("essential")

  return (
    <div className="flex flex-col">
      {/* Header */}
      <section className="border-b border-border">
        <div className="container-page py-16 sm:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <div className="flex justify-center">
              <div className="flex size-16 items-center justify-center rounded-2xl bg-primary/10">
                <Zap className="size-8 text-primary" />
              </div>
            </div>
            <h1 className="mt-6">Resources</h1>
            <p className="mt-4 text-lg text-muted-foreground">
              The tools, services, and resources we use to build and ship products.
              Curated from years of trying different options.
            </p>
          </div>
        </div>
      </section>

      {/* Essential Stack */}
      <section className="section border-b border-border">
        <div className="container-page">
          <EssentialStackCategories
            affiliates={essentialAffiliates}
            placement="resources-essential"
            className="mx-auto max-w-3xl"
          />
        </div>
      </section>

      {/* Resources by Category */}
      <section className="section border-b border-border">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <h2>All Resources by Category</h2>
            <p className="mt-2 text-muted-foreground">
              Organized by use case to help you find what you need.
            </p>
          </div>

          <div className="mt-12 space-y-16">
            {activeCategories.map((category) => {
              const config = categoryConfig[category]
              const categoryAffiliates = getAffiliatesByCategory(category)

              if (categoryAffiliates.length === 0) return null

              return (
                <div key={category}>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      {config.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-foreground">{config.name}</h3>
                      <p className="text-sm text-muted-foreground">{config.description}</p>
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {categoryAffiliates.map((affiliate) => (
                      <ResourceCard
                        key={affiliate.id}
                        name={affiliate.name}
                        description={affiliate.description}
                        url={affiliate.affiliateUrl}
                        placement={`resources-${category}`}
                      />
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Product CTA */}
      <section className="section border-b border-border">
        <div className="container-page">
          <LeadMagnetCTA
            magnetId="saas-checklist"
            variant="featured"
            placement="resources-product"
          />
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="section">
        <div className="container-page">
          <div className="mx-auto max-w-xl">
            <NewsletterForm
              placement="resources-footer"
              title="Get Tool Updates"
              description="Be the first to know when we discover new tools or update our stack."
            />
          </div>
        </div>
      </section>
    </div>
  )
}
