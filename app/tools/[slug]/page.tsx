import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import {
  ArrowLeft,
  ExternalLink,
  Github,
  BookOpen,
  ArrowRight,
  Check,
  Zap,
  Users,
  Calendar,
  Code2,
  Star,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { NewsletterForm } from "@/components/newsletter-form"
import { ToolCard } from "@/components/tool-card"
import { ToolScreenshotGallery } from "@/components/tool-screenshot-gallery"
import { BreadcrumbJsonLd } from "@/components/json-ld"
import {
  getToolBySlug,
  getAllToolSlugs,
  getRelatedTools,
  type ToolStatus,
} from "@/lib/tools"

interface ToolPageProps {
  params: Promise<{ slug: string }>
}

// Generate static paths for all tools
export async function generateStaticParams() {
  const slugs = getAllToolSlugs()
  return slugs.map((slug) => ({ slug }))
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: ToolPageProps): Promise<Metadata> {
  const { slug } = await params
  const tool = getToolBySlug(slug)

  if (!tool) {
    return {
      title: "Tool Not Found",
    }
  }

  const title = tool.metaTitle || `${tool.name} - ${tool.tagline}`
  const description = tool.metaDescription || tool.description
  const canonicalUrl = `https://six1five.dev/tools/${tool.slug}`

  return {
    title: tool.name,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: "Six1Five Devs",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  }
}

const statusConfig: Record<
  ToolStatus,
  { label: string; color: string; bgColor: string; ctaText: string }
> = {
  live: {
    label: "Live",
    color: "text-green-600 dark:text-green-400",
    bgColor: "bg-green-500/10 border-green-500/30",
    ctaText: "Try",
  },
  beta: {
    label: "Beta",
    color: "text-yellow-600 dark:text-yellow-400",
    bgColor: "bg-yellow-500/10 border-yellow-500/30",
    ctaText: "Join Beta",
  },
  alpha: {
    label: "Alpha",
    color: "text-purple-600 dark:text-purple-400",
    bgColor: "bg-purple-500/10 border-purple-500/30",
    ctaText: "Early Access",
  },
  "coming-soon": {
    label: "Coming Soon",
    color: "text-muted-foreground",
    bgColor: "bg-muted border-border",
    ctaText: "Coming Soon",
  },
}

// Schema.org JSON-LD for SoftwareApplication
function generateJsonLd(tool: NonNullable<ReturnType<typeof getToolBySlug>>) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: tool.name,
    description: tool.description,
    url: `https://six1five.dev/tools/${tool.slug}`,
    applicationCategory: "WebApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      availability:
        tool.status === "live"
          ? "https://schema.org/InStock"
          : "https://schema.org/PreOrder",
    },
    author: {
      "@type": "Organization",
      name: "Six1Five Devs",
      url: "https://six1five.dev",
    },
    ...(tool.websiteUrl && { installUrl: tool.websiteUrl }),
  }
}

export default async function ToolPage({ params }: ToolPageProps) {
  const { slug } = await params
  const tool = getToolBySlug(slug)

  if (!tool) {
    notFound()
  }

  const status = statusConfig[tool.status]
  const relatedTools = getRelatedTools(slug, 3)
  const isAccessible = tool.status !== "coming-soon"

  return (
    <>
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateJsonLd(tool)),
        }}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Tools", url: "/tools" },
          { name: tool.name, url: `/tools/${tool.slug}` },
        ]}
      />

      <div className="flex flex-col">
        {/* Hero Section */}
        <section className="relative overflow-hidden border-b border-border">
          {/* Gradient background */}
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-primary/5" />

          {/* Dual glow effects */}
          <div className="absolute left-1/4 top-0 -z-10 -translate-x-1/2 -translate-y-1/2 size-[500px] rounded-full bg-primary/10 blur-[100px]" />
          <div className="absolute right-1/4 top-1/3 -z-10 translate-x-1/2 size-[400px] rounded-full bg-secondary/10 blur-[80px]" />

          <div className="container-page relative py-12 lg:py-16">
            {/* Back Link */}
            <Button asChild variant="ghost" size="sm" className="mb-8">
              <Link href="/tools">
                <ArrowLeft className="mr-2 size-4" />
                Back to Tools
              </Link>
            </Button>

            <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
              {/* Left Column: Tool Info */}
              <div>
                {/* Logo and Status */}
                <div className="flex items-start gap-4">
                  {tool.logo && (
                    <div className="relative">
                      <div className="absolute inset-0 animate-pulse rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 blur-xl" />
                      <Image
                        src={tool.logo}
                        alt={`${tool.name} logo`}
                        width={80}
                        height={80}
                        className="relative size-20 rounded-2xl border border-border bg-background"
                      />
                    </div>
                  )}
                  <div>
                    <Badge
                      variant="outline"
                      className={`mb-2 font-medium ${status.bgColor} ${status.color}`}
                    >
                      {status.label}
                    </Badge>
                    <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                      {tool.name}
                    </h1>
                  </div>
                </div>

                {/* Tagline */}
                <p className="mt-4 text-xl font-medium text-gradient">
                  {tool.tagline}
                </p>

                {/* Description */}
                <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
                  {tool.description}
                </p>

                {/* Tags */}
                <div className="mt-6 flex flex-wrap gap-2">
                  {tool.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>

                {/* CTAs */}
                <div className="mt-8 flex flex-wrap gap-4">
                  {/* Primary CTA: Visit external product */}
                  {isAccessible && tool.websiteUrl && (
                    <Button asChild size="lg" className="gap-2">
                      <a
                        href={tool.websiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {status.ctaText} {tool.name}
                        <ExternalLink className="size-4" />
                      </a>
                    </Button>
                  )}

                  {/* Coming Soon state */}
                  {!isAccessible && (
                    <Button size="lg" disabled>
                      Coming Soon
                    </Button>
                  )}

                  {/* Docs link */}
                  {tool.docsUrl && (
                    <Button asChild variant="outline" size="lg" className="gap-2 bg-transparent">
                      <a
                        href={tool.docsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <BookOpen className="size-4" />
                        Documentation
                      </a>
                    </Button>
                  )}

                  {/* Repo link */}
                  {tool.repoUrl && (
                    <Button asChild variant="outline" size="lg" className="gap-2 bg-transparent">
                      <a
                        href={tool.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Github className="size-4" />
                        View Source
                      </a>
                    </Button>
                  )}
                </div>

                {/* Trust Indicators */}
                <div className="mt-8 flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Users className="size-4" />
                    <span>1K+ users</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="size-4 text-yellow-500" />
                    <span>4.8 rating</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="size-4" />
                    <span>Updated weekly</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Screenshot Gallery */}
              <div>
                <ToolScreenshotGallery
                  screenshots={tool.screenshots || []}
                  toolName={tool.name}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features & Use Cases Section */}
        <section className="container-page py-12 lg:py-16">
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Features */}
            {tool.features && tool.features.length > 0 && (
              <Card className="border-primary/20">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
                      <Zap className="size-5 text-primary" />
                    </div>
                    <CardTitle>Key Features</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {tool.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/10">
                          <Check className="size-3 text-primary" />
                        </div>
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {/* Use Cases */}
            {tool.useCases && tool.useCases.length > 0 && (
              <Card className="border-secondary/20">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center rounded-lg bg-secondary/10">
                      <Users className="size-5 text-secondary" />
                    </div>
                    <CardTitle>Use Cases</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {tool.useCases.map((useCase, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-secondary/10">
                          <Check className="size-3 text-secondary" />
                        </div>
                        <span className="text-muted-foreground">{useCase}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Tech Stack */}
          {tool.techStack && tool.techStack.length > 0 && (
            <Card className="mt-8">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-muted">
                    <Code2 className="size-5 text-muted-foreground" />
                  </div>
                  <CardTitle>Built With</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {tool.techStack.map((tech) => (
                    <Badge
                      key={tech}
                      variant="outline"
                      className="text-sm py-1.5 px-3"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </section>

        {/* About & Roadmap Section */}
        <section className="border-t border-border bg-muted/30">
          <div className="container-page py-12 lg:py-16">
            <div className="mx-auto max-w-3xl">
              <div className="prose prose-gray dark:prose-invert max-w-none">
                <h2 className="text-2xl font-bold">About {tool.name}</h2>
                <p className="text-muted-foreground">
                  {tool.name} was born from a personal need to solve a real problem.
                  What started as a simple script evolved into a full-featured tool
                  that others could benefit from too.
                </p>

                <h2 className="mt-10 text-2xl font-bold">Roadmap</h2>
                <p className="text-muted-foreground">
                  Here&apos;s what&apos;s coming next for {tool.name}:
                </p>
                <ul className="mt-4 space-y-2">
                  <li className="flex items-center gap-2 text-muted-foreground">
                    <div className="size-1.5 rounded-full bg-primary" />
                    Enhanced analytics dashboard
                  </li>
                  <li className="flex items-center gap-2 text-muted-foreground">
                    <div className="size-1.5 rounded-full bg-primary" />
                    API access for developers
                  </li>
                  <li className="flex items-center gap-2 text-muted-foreground">
                    <div className="size-1.5 rounded-full bg-primary" />
                    Team collaboration features
                  </li>
                  <li className="flex items-center gap-2 text-muted-foreground">
                    <div className="size-1.5 rounded-full bg-primary" />
                    Mobile app (React Native)
                  </li>
                </ul>

                <h2 className="mt-10 text-2xl font-bold">Support</h2>
                <p className="text-muted-foreground">
                  Found a bug or have a feature request? Open an issue on GitHub or
                  reach out on Twitter. I read every piece of feedback.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Related Tools Section */}
        {relatedTools.length > 0 && (
          <section className="border-t border-border">
            <div className="container-page py-12 lg:py-16">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Related Tools</h2>
                <Button asChild variant="ghost" size="sm">
                  <Link href="/tools">
                    View All
                    <ArrowRight className="ml-1.5 size-4" />
                  </Link>
                </Button>
              </div>
              <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {relatedTools.map((relatedTool) => (
                  <ToolCard key={relatedTool.slug} tool={relatedTool} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Newsletter CTA */}
        <section className="border-t border-border">
          <div className="container-page py-12 lg:py-16">
            <NewsletterForm
              variant="hero"
              placement={`tool-${slug}`}
              title={`Stay Updated on ${tool.name}`}
              description="Get notified about new features, updates, and tips for getting the most out of this tool."
            />
          </div>
        </section>
      </div>
    </>
  )
}
