import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ArticleHeader } from "@/components/mdx-components"
import { ArticleCard } from "@/components/article-card"
import { NewsletterForm } from "@/components/newsletter-form"
import { ArticleJsonLd, BreadcrumbJsonLd } from "@/components/json-ld"
import { labs, getRelatedContent } from "@/lib/content"

interface LabPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return labs.map((lab) => ({
    slug: lab.slug,
  }))
}

export async function generateMetadata({
  params,
}: LabPageProps): Promise<Metadata> {
  const { slug } = await params
  const lab = labs.find((l) => l.slug === slug)

  if (!lab) {
    return {
      title: "Lab Not Found",
    }
  }

  return {
    title: lab.title,
    description: lab.description,
    openGraph: {
      title: lab.title,
      description: lab.description,
      type: "article",
      publishedTime: lab.date,
      authors: ["Six1Five"],
    },
    twitter: {
      card: "summary_large_image",
      title: lab.title,
      description: lab.description,
    },
  }
}

export default async function LabPage({ params }: LabPageProps) {
  const { slug } = await params
  const lab = labs.find((l) => l.slug === slug)

  if (!lab) {
    notFound()
  }

  const relatedLabs = getRelatedContent(slug, lab.tags, 2)

  return (
    <article className="mx-auto max-w-4xl px-4 py-16 lg:px-8">
      {/* JSON-LD Structured Data */}
      <ArticleJsonLd
        title={lab.title}
        description={lab.description}
        datePublished={lab.date}
        url={`/labs/${lab.slug}`}
        tags={lab.tags}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Labs", url: "/labs" },
          { name: lab.title, url: `/labs/${lab.slug}` },
        ]}
      />

      {/* Back Link */}
      <Button asChild variant="ghost" size="sm" className="mb-8">
        <Link href="/labs">
          <ArrowLeft className="mr-2 size-4" />
          Back to Labs
        </Link>
      </Button>

      {/* Article Header */}
      <ArticleHeader
        title={lab.title}
        description={lab.description}
        date={lab.date}
        readingTime={lab.readingTime}
        tags={lab.tags}
      />

      {/* Article Content - Placeholder for MDX */}
      <div className="prose prose-gray dark:prose-invert max-w-none">
        <p>
          <strong>Status:</strong> In Progress
        </p>

        <p>
          This is an experiment log documenting my exploration of this concept. 
          Expect raw thoughts, incomplete ideas, and real-time updates as I work 
          through the problem.
        </p>

        <h2>The Hypothesis</h2>
        <p>
          I believe we can achieve better results by approaching this problem 
          from a different angle. Here&apos;s what I&apos;m testing.
        </p>

        <h2>Week 1 Progress</h2>
        <p>
          Initial setup and baseline measurements. Early results are promising, 
          though there are some unexpected challenges.
        </p>

        <h2>Current Blockers</h2>
        <ul>
          <li>Rate limiting from the API provider</li>
          <li>Edge cases in the parsing logic</li>
          <li>Performance optimization needed for scale</li>
        </ul>

        <h2>Next Steps</h2>
        <p>
          I&apos;ll continue iterating on the core algorithm and share updates 
          as I make progress. Subscribe to follow along.
        </p>
      </div>

      {/* Newsletter CTA */}
      <div className="mt-16">
        <NewsletterForm />
      </div>

      {/* Related Labs */}
      {relatedLabs.length > 0 && (
        <section className="mt-16 border-t pt-16">
          <h2 className="text-2xl font-bold">Related Experiments</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {relatedLabs.map((relatedLab) => (
              <ArticleCard key={relatedLab.slug} article={relatedLab} />
            ))}
          </div>
        </section>
      )}
    </article>
  )
}
