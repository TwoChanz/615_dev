import type { Metadata } from "next"
import { FileText } from "lucide-react"

import { ArticleCard } from "@/components/article-card"
import { NewsletterForm } from "@/components/newsletter-form"
import { blogPosts } from "@/lib/content"

// DEV ONLY: Artificial delay to test loading animations (remove for production)
const DEV_LOADING_DELAY = process.env.NODE_ENV === "development" ? 3000 : 0

async function devDelay() {
  if (DEV_LOADING_DELAY > 0) {
    await new Promise((resolve) => setTimeout(resolve, DEV_LOADING_DELAY))
  }
}

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Thoughts on building products, coding, and the indie hacker journey. Build logs, lessons learned, and technical deep dives.",
}

export default async function BlogPage() {
  await devDelay()
  const featuredPosts = blogPosts.filter((p) => p.featured)
  const otherPosts = blogPosts.filter((p) => !p.featured)

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
      {/* Header */}
      <div className="mx-auto max-w-2xl text-center">
        <div className="flex justify-center">
          <div className="flex size-16 items-center justify-center rounded-2xl bg-primary/10">
            <FileText className="size-8 text-primary" />
          </div>
        </div>
        <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl">
          Blog
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Thoughts on building products, the indie hacker journey, and technical 
          lessons learned. No fluff, just honest reflections.
        </p>
      </div>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section className="mt-16">
          <h2 className="text-2xl font-bold">Featured</h2>
          <p className="mt-2 text-muted-foreground">
            The posts I&apos;m most proud of.
          </p>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {featuredPosts.map((post) => (
              <ArticleCard key={post.slug} article={post} />
            ))}
          </div>
        </section>
      )}

      {/* All Posts */}
      {otherPosts.length > 0 && (
        <section className="mt-16">
          <h2 className="text-2xl font-bold">All Posts</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {otherPosts.map((post) => (
              <ArticleCard key={post.slug} article={post} />
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
