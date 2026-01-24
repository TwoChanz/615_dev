import { Skeleton, CardGridSkeleton } from "@/components/ui/skeleton"

export default function BlogLoading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
      {/* Header Skeleton */}
      <div className="mx-auto max-w-2xl text-center space-y-4">
        <div className="flex justify-center">
          <Skeleton className="size-16 rounded-2xl" />
        </div>
        <Skeleton className="h-10 w-48 mx-auto" />
        <Skeleton className="h-5 w-full max-w-md mx-auto" />
      </div>

      {/* Featured Post Skeleton */}
      <section className="mt-16">
        <Skeleton className="h-6 w-32 mb-6" />
        <div className="rounded-xl border border-border bg-card p-6 md:p-8">
          <div className="grid gap-8 md:grid-cols-2">
            <Skeleton className="aspect-video rounded-lg" />
            <div className="space-y-4">
              <div className="flex gap-2">
                <Skeleton className="h-6 w-16 rounded-full" />
                <Skeleton className="h-6 w-20 rounded-full" />
              </div>
              <Skeleton className="h-8 w-3/4" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
              </div>
              <div className="flex gap-4">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-20" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Posts Grid Skeleton */}
      <section className="mt-16">
        <Skeleton className="h-6 w-24 mb-6" />
        <CardGridSkeleton count={6} />
      </section>
    </div>
  )
}
