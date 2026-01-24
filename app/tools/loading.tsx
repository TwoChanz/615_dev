import { Skeleton, CardGridSkeleton } from "@/components/ui/skeleton"

export default function ToolsLoading() {
  return (
    <div className="flex flex-col">
      {/* Hero Section Skeleton */}
      <section className="relative border-b border-border">
        <div className="container-page py-16 sm:py-20 lg:py-24">
          <div className="mx-auto max-w-3xl text-center space-y-6">
            {/* Icon */}
            <div className="flex justify-center">
              <Skeleton className="size-20 rounded-2xl" />
            </div>
            {/* Title */}
            <Skeleton className="h-12 w-2/3 mx-auto" />
            {/* Description */}
            <div className="space-y-2">
              <Skeleton className="h-5 w-full max-w-xl mx-auto" />
              <Skeleton className="h-5 w-4/5 max-w-lg mx-auto" />
            </div>
            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-8 pt-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex items-center gap-3">
                  <Skeleton className="size-10 rounded-lg" />
                  <div className="space-y-1">
                    <Skeleton className="h-6 w-12" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Filter Section Skeleton */}
      <section className="border-b border-border bg-muted/30">
        <div className="container-page py-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <Skeleton className="h-10 flex-1 rounded-md" />
            <div className="flex gap-2">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="h-9 w-16 rounded-md" />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Tools Grid Skeleton */}
      <section className="container-page py-12 lg:py-16">
        <div className="flex items-center gap-3 mb-8">
          <Skeleton className="size-10 rounded-lg" />
          <div className="space-y-1">
            <Skeleton className="h-7 w-24" />
            <Skeleton className="h-4 w-48" />
          </div>
        </div>
        <CardGridSkeleton count={3} />
      </section>
    </div>
  )
}
