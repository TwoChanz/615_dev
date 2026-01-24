import type { Metadata } from "next"
import { Terminal } from "lucide-react"

import { ArticleCard } from "@/components/article-card"
import { NewsletterForm } from "@/components/newsletter-form"
import { labs } from "@/lib/content"

export const metadata: Metadata = {
  title: "Labs",
  description:
    "Experiments, prototypes, and work-in-progress builds. Raw build logs documenting the journey from idea to product.",
}

export default function LabsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
      {/* Header */}
      <div className="mx-auto max-w-2xl text-center">
        <div className="flex justify-center">
          <div className="flex size-16 items-center justify-center rounded-2xl bg-primary/10">
            <Terminal className="size-8 text-primary" />
          </div>
        </div>
        <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl">
          Labs
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Raw experiments and build logs. This is where I test ideas, document 
          failures, and share what I learn in real-time.
        </p>
      </div>

      {/* Labs Grid */}
      <section className="mt-16">
        {labs.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {labs.map((lab) => (
              <ArticleCard key={lab.slug} article={lab} />
            ))}
          </div>
        ) : (
          <div className="rounded-xl border bg-muted/30 p-12 text-center">
            <Terminal className="mx-auto size-12 text-muted-foreground" />
            <h3 className="mt-4 font-semibold">No experiments yet</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Check back soon for new build logs and experiments.
            </p>
          </div>
        )}
      </section>

      {/* Newsletter CTA */}
      <section className="mt-16">
        <div className="mx-auto max-w-xl">
          <NewsletterForm />
        </div>
      </section>
    </div>
  )
}
