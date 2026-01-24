import { Skeleton } from "@/components/ui/skeleton"

export default function ToolDetailLoading() {
  return (
    <div className="flex flex-col">
      {/* Hero Section Skeleton */}
      <section className="relative border-b border-border">
        <div className="container-page py-12 lg:py-16">
          {/* Back button */}
          <Skeleton className="h-9 w-32 mb-8" />

          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            {/* Left Column */}
            <div className="space-y-6">
              {/* Logo and Status */}
              <div className="flex items-start gap-4">
                <Skeleton className="size-20 rounded-2xl" />
                <div className="space-y-2">
                  <Skeleton className="h-6 w-16 rounded-full" />
                  <Skeleton className="h-10 w-48" />
                </div>
              </div>

              {/* Tagline */}
              <Skeleton className="h-6 w-64" />

              {/* Description */}
              <div className="space-y-2">
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-4/5" />
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {[...Array(5)].map((_, i) => (
                  <Skeleton key={i} className="h-6 w-20 rounded-full" />
                ))}
              </div>

              {/* CTAs */}
              <div className="flex gap-4">
                <Skeleton className="h-11 w-40 rounded-md" />
                <Skeleton className="h-11 w-36 rounded-md" />
              </div>

              {/* Trust indicators */}
              <div className="flex gap-6">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <Skeleton className="size-4" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column - Screenshot */}
            <Skeleton className="aspect-video rounded-xl" />
          </div>
        </div>
      </section>

      {/* Features Section Skeleton */}
      <section className="container-page py-12 lg:py-16">
        <div className="grid gap-8 lg:grid-cols-2">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="rounded-xl border border-border p-6 space-y-4">
              <div className="flex items-center gap-3">
                <Skeleton className="size-10 rounded-lg" />
                <Skeleton className="h-6 w-32" />
              </div>
              <div className="space-y-3">
                {[...Array(5)].map((_, j) => (
                  <div key={j} className="flex items-start gap-3">
                    <Skeleton className="size-5 rounded-full shrink-0" />
                    <Skeleton className="h-4 w-full" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Tech Stack */}
        <div className="mt-8 rounded-xl border border-border p-6 space-y-4">
          <div className="flex items-center gap-3">
            <Skeleton className="size-10 rounded-lg" />
            <Skeleton className="h-6 w-24" />
          </div>
          <div className="flex flex-wrap gap-2">
            {[...Array(7)].map((_, i) => (
              <Skeleton key={i} className="h-8 w-24 rounded-md" />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
