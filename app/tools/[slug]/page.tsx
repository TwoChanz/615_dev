import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import {
  ArrowLeft,
  ExternalLink,
  Github,
  BookOpen,
  ArrowRight,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { NewsletterForm } from "@/components/newsletter-form"
import { ToolCard } from "@/components/tool-card"
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
  const canonicalUrl = `https://six1fivestudio.dev/tools/${tool.slug}`

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
  { label: string; color: string; ctaText: string }
> = {
  live: {
    label: "Live",
    color: "bg-green-500/10 text-green-600 dark:text-green-400",
    ctaText: "Try",
  },
  beta: {
    label: "Beta",
    color: "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400",
    ctaText: "Join Beta",
  },
  alpha: {
    label: "Alpha",
    color: "bg-purple-500/10 text-purple-600 dark:text-purple-400",
    ctaText: "Early Access",
  },
  "coming-soon": {
    label: "Coming Soon",
    color: "bg-muted text-muted-foreground",
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
    url: `https://six1fivestudio.dev/tools/${tool.slug}`,
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
      url: "https://six1fivestudio.dev",
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
  const isAccessible = tool.status !== "coming-soon" && !tool.comingSoon

  return (
    <>
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateJsonLd(tool)),
        }}
      />

      <div className="mx-auto max-w-4xl px-4 py-16 lg:px-8">
        {/* Back Link */}
        <Button asChild variant="ghost" size="sm" className="mb-8">
          <Link href="/tools">
            <ArrowLeft className="mr-2 size-4" />
            Back to Tools
          </Link>
        </Button>

        {/* Tool Header */}
        <header className="border-b pb-10">
          <div className="mb-4 flex items-center gap-3">
            <span
              className={`rounded-full px-3 py-1 text-sm font-medium ${status.color}`}
            >
              {status.label}
            </span>
          </div>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            {tool.name}
          </h1>
          <p className="mt-2 text-xl font-medium text-primary">{tool.tagline}</p>
          <p className="mt-4 text-lg text-muted-foreground">{tool.description}</p>

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
              <Button asChild size="lg">
                <a
                  href={tool.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {status.ctaText} {tool.name}
                  <ExternalLink className="ml-2 size-4" />
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
              <Button asChild variant="outline" size="lg">
                <a
                  href={tool.docsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <BookOpen className="mr-2 size-4" />
                  Documentation
                </a>
              </Button>
            )}

            {/* Repo link */}
            {tool.repoUrl && (
              <Button asChild variant="outline" size="lg">
                <a
                  href={tool.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="mr-2 size-4" />
                  View Source
                </a>
              </Button>
            )}
          </div>
        </header>

        {/* Tool Details */}
        <div className="mt-10 grid gap-8 md:grid-cols-2">
          {/* Features */}
          {tool.features && tool.features.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Key Features</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {tool.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="mt-1.5 size-1.5 rounded-full bg-primary shrink-0" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {/* Use Cases */}
          {tool.useCases && tool.useCases.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Use Cases</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {tool.useCases.map((useCase, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="mt-1.5 size-1.5 rounded-full bg-primary shrink-0" />
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
              <CardTitle>Tech Stack</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {tool.techStack.map((tech) => (
                  <Badge key={tech} variant="outline" className="text-sm">
                    {tech}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* About Section */}
        <div className="mt-10 prose prose-gray dark:prose-invert max-w-none">
          <h2>About {tool.name}</h2>
          <p>
            {tool.name} was born from a personal need to solve a real problem.
            What started as a simple script evolved into a full-featured tool
            that others could benefit from too.
          </p>

          <h2>Roadmap</h2>
          <p>
            Here&apos;s what&apos;s coming next for {tool.name}:
          </p>
          <ul>
            <li>Enhanced analytics dashboard</li>
            <li>API access for developers</li>
            <li>Team collaboration features</li>
            <li>Mobile app (React Native)</li>
          </ul>

          <h2>Support</h2>
          <p>
            Found a bug or have a feature request? Open an issue on GitHub or
            reach out on Twitter. I read every piece of feedback.
          </p>
        </div>

        {/* Related Tools Section */}
        {relatedTools.length > 0 && (
          <section className="mt-16">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Related Tools</h2>
              <Button asChild variant="ghost" size="sm">
                <Link href="/tools">
                  View All
                  <ArrowRight className="ml-1.5 size-4" />
                </Link>
              </Button>
            </div>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedTools.map((relatedTool) => (
                <ToolCard key={relatedTool.slug} tool={relatedTool} />
              ))}
            </div>
          </section>
        )}

        {/* Newsletter CTA */}
        <div className="mt-16">
          <NewsletterForm variant="default" />
        </div>
      </div>
    </>
  )
}
