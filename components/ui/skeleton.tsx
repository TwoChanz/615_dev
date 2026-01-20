import { cn } from "@/lib/utils"

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {}

function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-muted", className)}
      {...props}
    />
  )
}

// Card skeleton for tool/article cards
function CardSkeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "rounded-xl border border-border bg-card p-6 space-y-4",
        className
      )}
    >
      {/* Icon */}
      <Skeleton className="h-12 w-12 rounded-lg" />
      {/* Title */}
      <Skeleton className="h-6 w-3/4" />
      {/* Description */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
      </div>
      {/* Tags */}
      <div className="flex gap-2">
        <Skeleton className="h-6 w-16 rounded-full" />
        <Skeleton className="h-6 w-20 rounded-full" />
      </div>
    </div>
  )
}

// Article skeleton for content pages
function ArticleSkeleton({ className }: { className?: string }) {
  return (
    <article className={cn("space-y-8", className)}>
      {/* Title */}
      <div className="space-y-4">
        <Skeleton className="h-10 w-3/4" />
        <div className="flex gap-4">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-32" />
        </div>
      </div>
      {/* Content paragraphs */}
      <div className="space-y-4">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
      </div>
      <div className="space-y-4">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-4/5" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>
      {/* Image placeholder */}
      <Skeleton className="h-64 w-full rounded-lg" />
      {/* More content */}
      <div className="space-y-4">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-full" />
      </div>
    </article>
  )
}

// Grid of card skeletons
function CardGridSkeleton({
  count = 6,
  className,
}: {
  count?: number
  className?: string
}) {
  return (
    <div
      className={cn(
        "grid gap-6 sm:grid-cols-2 lg:grid-cols-3",
        className
      )}
    >
      {Array.from({ length: count }).map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  )
}

// Hero section skeleton
function HeroSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn("space-y-6 text-center", className)}>
      <Skeleton className="h-12 w-2/3 mx-auto" />
      <div className="space-y-2 max-w-2xl mx-auto">
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-4/5 mx-auto" />
      </div>
      <div className="flex justify-center gap-4">
        <Skeleton className="h-11 w-32 rounded-md" />
        <Skeleton className="h-11 w-32 rounded-md" />
      </div>
    </div>
  )
}

export {
  Skeleton,
  CardSkeleton,
  ArticleSkeleton,
  CardGridSkeleton,
  HeroSkeleton,
}
