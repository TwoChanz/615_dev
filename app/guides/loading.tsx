import { Skeleton, CardGridSkeleton } from "@/components/ui/skeleton"

export default function GuidesLoading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
      {/* Header Skeleton */}
      <div className="mx-auto max-w-2xl text-center space-y-4">
        <div className="flex justify-center">
          <Skeleton className="size-16 rounded-2xl" />
        </div>
        <Skeleton className="h-10 w-40 mx-auto" />
        <div className="space-y-2">
          <Skeleton className="h-5 w-full max-w-lg mx-auto" />
          <Skeleton className="h-5 w-4/5 max-w-md mx-auto" />
        </div>
      </div>

      {/* Guides Grid Skeleton */}
      <section className="mt-16">
        <CardGridSkeleton count={6} />
      </section>

      {/* Newsletter Skeleton */}
      <section className="mt-16">
        <div className="mx-auto max-w-xl">
          <div className="rounded-xl border border-border bg-card p-6 space-y-4">
            <Skeleton className="h-6 w-48 mx-auto" />
            <Skeleton className="h-4 w-full" />
            <div className="flex gap-2">
              <Skeleton className="h-10 flex-1 rounded-md" />
              <Skeleton className="h-10 w-28 rounded-md" />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
