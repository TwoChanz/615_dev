import React from "react"
import Link from "next/link"
import {
  ArrowRight,
  Terminal,
  Rocket,
  BookOpen,
  Wrench,
  Zap,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ToolCard } from "@/components/tool-card"
import { ArticleCard } from "@/components/article-card"
import { NewsletterForm } from "@/components/newsletter-form"
import { AffiliateBlock } from "@/components/affiliate-block"
import { PrimaryCTA } from "@/components/cta-blocks"
import { LeadMagnetWidget } from "@/components/lead-magnet"
import { tools, getRecentContent } from "@/lib/content"
import { getFeaturedAffiliates } from "@/lib/monetization"

export default function HomePage() {
  const recentContent = getRecentContent(4)
  const featuredAffiliates = getFeaturedAffiliates()

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-border">
        {/* Gradient background with purple undertone */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-secondary/5" />

        {/* Dual glow effects - cyan and purple */}
        <div className="absolute left-1/4 top-0 -z-10 -translate-x-1/2 -translate-y-1/2 size-[600px] rounded-full bg-primary/8 blur-[120px]" />
        <div className="absolute right-1/4 top-1/4 -z-10 translate-x-1/2 size-[500px] rounded-full bg-secondary/10 blur-[100px]" />

        <div className="container-page relative py-24 sm:py-32 lg:py-40">
          <div className="mx-auto max-w-3xl text-center">
            <Badge
              variant="secondary"
              className="mb-6 border border-primary/30 bg-primary/10 text-primary"
            >
              Building in Public
            </Badge>

            <h1 className="text-foreground">
              Build. Ship.{" "}
              <span className="text-gradient">Document.</span>
            </h1>

            <p className="mt-6 text-lg leading-relaxed text-muted-foreground text-pretty sm:text-xl">
              Six1Five Devs is where I build real tools, share honest build logs,
              and document everything I learn along the way. Follow the journey
              from idea to shipped product.
            </p>

            <div className="mt-10 flex items-center justify-center gap-4 flex-wrap">
              <Button asChild size="lg" className="font-medium">
                <Link href="/tools">
                  Explore Tools
                  <Rocket className="ml-2 size-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="font-medium bg-transparent">
                <Link href="/blog">
                  Read the Blog
                  <ArrowRight className="ml-2 size-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* What I Do Section */}
      <section className="section border-b border-border">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <h2>What You&apos;ll Find Here</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Everything from working products to raw build logs and in-depth guides.
            </p>
          </div>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <FeatureCard
              icon={<Wrench className="size-5" />}
              title="Tools"
              description="Real products I've built and shipped. Try them, break them, give feedback."
              href="/tools"
            />
            <FeatureCard
              icon={<Terminal className="size-5" />}
              title="Labs"
              description="Experiments, prototypes, and work-in-progress builds documented in real-time."
              href="/labs"
            />
            <FeatureCard
              icon={<BookOpen className="size-5" />}
              title="Guides"
              description="Deep-dive tutorials on the tech and patterns I use to build products."
              href="/guides"
            />
            <FeatureCard
              icon={<Zap className="size-5" />}
              title="Resources"
              description="Curated tools, templates, and resources I actually use and recommend."
              href="/resources"
            />
          </div>
        </div>
      </section>

      {/* Featured Tools Section */}
      <section className="section border-b border-border">
        <div className="container-page">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <h2>Tools I&apos;ve Built</h2>
              <p className="mt-2 text-muted-foreground">
                Real products solving real problems.
              </p>
            </div>
            <Button asChild variant="ghost" className="w-fit">
              <Link href="/tools" className="text-muted-foreground hover:text-primary">
                View all tools
                <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {tools.map((tool) => (
              <ToolCard key={tool.slug} tool={tool} />
            ))}
          </div>
        </div>
      </section>

      {/* Recent Content Section */}
      <section className="section border-b border-border">
        <div className="container-page">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <h2>Latest Content</h2>
              <p className="mt-2 text-muted-foreground">
                Blog posts, guides, and build logs.
              </p>
            </div>
            <Button asChild variant="ghost" className="w-fit">
              <Link href="/blog" className="text-muted-foreground hover:text-primary">
                View all posts
                <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {recentContent.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Hero CTA */}
      <section className="section border-b border-border">
        <div className="container-page">
          <NewsletterForm
            variant="hero"
            placement="homepage-hero"
            title="Join 2,000+ Developers"
            description="Get weekly build logs, shipping updates, and early access to new tools. Real insights from building in public."
            leadMagnet={{
              title: "SaaS Launch Checklist",
              description: "50-point checklist for launching your first SaaS",
            }}
          />
        </div>
      </section>

      {/* Affiliate + Product CTA Section */}
      <section className="section">
        <div className="container-page">
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Affiliate Block */}
            <AffiliateBlock
              title="My Essential Stack"
              description="The tools that power everything I build. Battle-tested and developer-approved."
              affiliates={featuredAffiliates.slice(0, 4)}
              placement="homepage-sidebar"
              variant="featured"
            />

            {/* Product CTA */}
            <PrimaryCTA
              title="Ship Your SaaS Faster"
              description="Get the complete Next.js starter kit with auth, billing, and dashboard components. Launch in days, not months."
              buttonText="Get AppPilot"
              buttonHref="/tools/apppilot"
              variant="highlight"
              icon={<Rocket className="size-6" />}
              badge="Most Popular"
              placement="homepage-product"
            />
          </div>
        </div>
      </section>

      {/* Lead Magnet Section */}
      <section className="section border-t border-border">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center mb-10">
            <h2 className="text-2xl font-bold sm:text-3xl">Free Resources</h2>
            <p className="mt-2 text-muted-foreground">
              Actionable guides and templates to help you ship faster
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <LeadMagnetWidget magnetId="saas-checklist" />
            <LeadMagnetWidget magnetId="tech-stack-guide" />
            <LeadMagnetWidget magnetId="automation-starter" />
          </div>
        </div>
      </section>
    </div>
  )
}

function FeatureCard({
  icon,
  title,
  description,
  href,
}: {
  icon: React.ReactNode
  title: string
  description: string
  href: string
}) {
  return (
    <Link
      href={href}
      className="group flex flex-col rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5"
    >
      <div className="flex size-11 items-center justify-center rounded-lg bg-gradient-to-br from-primary/15 to-secondary/15 text-primary transition-all duration-300 group-hover:from-primary group-hover:to-secondary group-hover:text-primary-foreground group-hover:shadow-lg group-hover:shadow-primary/20">
        {icon}
      </div>
      <h3 className="mt-4 text-lg font-semibold text-foreground">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p>
      <div className="mt-4 flex items-center text-sm font-medium text-primary group-hover:text-gradient">
        Explore
        <ArrowRight className="ml-1.5 size-4 transition-transform duration-200 group-hover:translate-x-1" />
      </div>
    </Link>
  )
}
