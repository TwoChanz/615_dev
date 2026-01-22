import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ArticleHeader } from "@/components/mdx-components"
import { ArticleCard } from "@/components/article-card"
import { NewsletterForm } from "@/components/newsletter-form"
import { ArticleJsonLd, BreadcrumbJsonLd } from "@/components/json-ld"
import { blogPosts, getRelatedContent } from "@/lib/content"

interface BlogPostPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = blogPosts.find((p) => p.slug === slug)

  if (!post) {
    return {
      title: "Post Not Found",
    }
  }

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      authors: ["Six1Five"],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = blogPosts.find((p) => p.slug === slug)

  if (!post) {
    notFound()
  }

  const relatedPosts = getRelatedContent(slug, post.tags, 2)

  return (
    <article className="mx-auto max-w-4xl px-4 py-16 lg:px-8">
      {/* JSON-LD Structured Data */}
      <ArticleJsonLd
        title={post.title}
        description={post.description}
        datePublished={post.date}
        url={`/blog/${post.slug}`}
        tags={post.tags}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Blog", url: "/blog" },
          { name: post.title, url: `/blog/${post.slug}` },
        ]}
      />

      {/* Back Link */}
      <Button asChild variant="ghost" size="sm" className="mb-8">
        <Link href="/blog">
          <ArrowLeft className="mr-2 size-4" />
          Back to Blog
        </Link>
      </Button>

      {/* Article Header */}
      <ArticleHeader
        title={post.title}
        description={post.description}
        date={post.date}
        readingTime={post.readingTime}
        tags={post.tags}
      />

      {/* Article Content - Placeholder for MDX */}
      <div className="prose prose-gray dark:prose-invert max-w-none">
        <p>
          This is a placeholder for the full article content. In a production 
          setup, this would be rendered from MDX files with proper content 
          management.
        </p>

        <h2>Getting Started</h2>
        <p>
          The journey of building {post.title.split(" ").slice(-2).join(" ")} 
          began with a simple observation: there had to be a better way to solve 
          this problem.
        </p>

        <p>
          What followed was weeks of research, prototyping, and iteration. Along 
          the way, I learned valuable lessons about product development, user 
          feedback, and the importance of shipping early.
        </p>

        <h2>Key Takeaways</h2>
        <ul>
          <li>Start with the smallest viable solution</li>
          <li>Get feedback early and often</li>
          <li>Don&apos;t over-engineer the first version</li>
          <li>Document everything as you go</li>
        </ul>

        <h2>What&apos;s Next</h2>
        <p>
          I&apos;ll continue to iterate on this project and share updates in 
          future posts. Subscribe to the newsletter to follow along with the 
          journey.
        </p>
      </div>

      {/* Newsletter CTA */}
      <div className="mt-16">
        <NewsletterForm />
      </div>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="mt-16 border-t pt-16">
          <h2 className="text-2xl font-bold">Related Posts</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {relatedPosts.map((relatedPost) => (
              <ArticleCard key={relatedPost.slug} article={relatedPost} />
            ))}
          </div>
        </section>
      )}
    </article>
  )
}
