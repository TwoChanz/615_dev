import type { Metadata } from "next"
import { BookOpen } from "lucide-react"

import { ArticleCard } from "@/components/article-card"
import { NewsletterForm } from "@/components/newsletter-form"
import { guides } from "@/lib/content"

export const metadata: Metadata = {
  title: "Guides",
  description:
    "In-depth tutorials and guides on Next.js, authentication, payments, and building SaaS products. Learn from real-world implementations.",
}

export default function GuidesPage() {
  const featuredGuides = guides.filter((g) => g.featured)
  const otherGuides = guides.filter((g) => !g.featured)

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
      {/* Header */}
      <div className="mx-auto max-w-2xl text-center">
        <div className="flex justify-center">
          <div className="flex size-16 items-center justify-center rounded-2xl bg-primary/10">
            <BookOpen className="size-8 text-primary" />
          </div>
        </div>
        <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl">
          Guides
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Deep-dive tutorials on the patterns and technologies I use to build 
          products. Real code from real projects.
        </p>
      </div>

      {/* Featured Guides */}
      {featuredGuides.length > 0 && (
        <section className="mt-16">
          <h2 className="text-2xl font-bold">Featured</h2>
          <p className="mt-2 text-muted-foreground">
            Start here for the most comprehensive guides.
          </p>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {featuredGuides.map((guide) => (
              <ArticleCard key={guide.slug} article={guide} />
            ))}
          </div>
        </section>
      )}

      {/* All Guides */}
      {otherGuides.length > 0 && (
        <section className="mt-16">
          <h2 className="text-2xl font-bold">All Guides</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {otherGuides.map((guide) => (
              <ArticleCard key={guide.slug} article={guide} />
            ))}
          </div>
        </section>
      )}

      {/* Newsletter CTA */}
      <section className="mt-16">
        <div className="mx-auto max-w-xl">
          <NewsletterForm />
        </div>
      </section>
    </div>
  )
}
