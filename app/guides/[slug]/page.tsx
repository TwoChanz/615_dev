import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ArticleHeader } from "@/components/mdx-components"
import { ArticleCard } from "@/components/article-card"
import { NewsletterForm } from "@/components/newsletter-form"
import { guides, getRelatedContent } from "@/lib/content"

interface GuidePageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return guides.map((guide) => ({
    slug: guide.slug,
  }))
}

export async function generateMetadata({
  params,
}: GuidePageProps): Promise<Metadata> {
  const { slug } = await params
  const guide = guides.find((g) => g.slug === slug)

  if (!guide) {
    return {
      title: "Guide Not Found",
    }
  }

  return {
    title: guide.title,
    description: guide.description,
    openGraph: {
      title: guide.title,
      description: guide.description,
      type: "article",
      publishedTime: guide.date,
      authors: ["Six1Five"],
    },
    twitter: {
      card: "summary_large_image",
      title: guide.title,
      description: guide.description,
    },
  }
}

export default async function GuidePage({ params }: GuidePageProps) {
  const { slug } = await params
  const guide = guides.find((g) => g.slug === slug)

  if (!guide) {
    notFound()
  }

  const relatedGuides = getRelatedContent(slug, guide.tags, 2)

  return (
    <article className="mx-auto max-w-4xl px-4 py-16 lg:px-8">
      {/* Back Link */}
      <Button asChild variant="ghost" size="sm" className="mb-8">
        <Link href="/guides">
          <ArrowLeft className="mr-2 size-4" />
          Back to Guides
        </Link>
      </Button>

      {/* Article Header */}
      <ArticleHeader
        title={guide.title}
        description={guide.description}
        date={guide.date}
        readingTime={guide.readingTime}
        tags={guide.tags}
      />

      {/* Article Content - Placeholder for MDX */}
      <div className="prose prose-gray dark:prose-invert max-w-none">
        <p>
          This comprehensive guide will walk you through everything you need to 
          know about implementing this feature in your Next.js application.
        </p>

        <h2>Prerequisites</h2>
        <ul>
          <li>Node.js 18+ installed</li>
          <li>Basic understanding of React and Next.js</li>
          <li>A Next.js 14+ project with the App Router</li>
        </ul>

        <h2>Step 1: Project Setup</h2>
        <p>
          First, let&apos;s set up the necessary dependencies and configuration 
          for our project.
        </p>

        <pre><code>{`npm install @auth/nextjs bcryptjs
npm install -D @types/bcryptjs`}</code></pre>

        <h2>Step 2: Implementation</h2>
        <p>
          Now we&apos;ll implement the core functionality. This involves creating 
          the necessary API routes, middleware, and client components.
        </p>

        <h2>Step 3: Testing</h2>
        <p>
          Always test your implementation thoroughly before deploying to 
          production. Here are the key scenarios to verify.
        </p>

        <h2>Conclusion</h2>
        <p>
          You now have a fully functional implementation. Check out the related 
          guides below for more advanced patterns and optimizations.
        </p>
      </div>

      {/* Newsletter CTA */}
      <div className="mt-16">
        <NewsletterForm />
      </div>

      {/* Related Guides */}
      {relatedGuides.length > 0 && (
        <section className="mt-16 border-t pt-16">
          <h2 className="text-2xl font-bold">Related Guides</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {relatedGuides.map((relatedGuide) => (
              <ArticleCard key={relatedGuide.slug} article={relatedGuide} />
            ))}
          </div>
        </section>
      )}
    </article>
  )
}
