import Link from "next/link"
import Image from "next/image"
import { ExternalLink, ArrowRight, Sparkles, Users, Star } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { Tool, ToolStatus } from "@/lib/tools"

interface FeaturedToolSpotlightProps {
  tool: Tool
  className?: string
}

const statusConfig: Record<ToolStatus, { label: string; className: string }> = {
  live: {
    label: "Live",
    className: "bg-green-500/15 text-green-600 dark:text-green-400 border-green-500/30",
  },
  beta: {
    label: "Beta",
    className: "bg-yellow-500/15 text-yellow-600 dark:text-yellow-400 border-yellow-500/30",
  },
  alpha: {
    label: "Alpha",
    className: "bg-purple-500/15 text-purple-600 dark:text-purple-400 border-purple-500/30",
  },
  "coming-soon": {
    label: "Coming Soon",
    className: "bg-muted text-muted-foreground border-border",
  },
}

export function FeaturedToolSpotlight({
  tool,
  className,
}: FeaturedToolSpotlightProps) {
  const status = statusConfig[tool.status]
  const isAccessible = tool.status !== "coming-soon" && !tool.comingSoon

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-border bg-card",
        className
      )}
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      {/* Glow effect */}
      <div className="absolute -right-20 -top-20 size-40 rounded-full bg-primary/10 blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <div className="absolute -bottom-20 -left-20 size-40 rounded-full bg-secondary/10 blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      <div className="relative grid gap-6 p-6 lg:grid-cols-2 lg:gap-8 lg:p-8">
        {/* Left: Content */}
        <div className="flex flex-col justify-center">
          {/* Featured badge */}
          <div className="mb-4 flex items-center gap-2">
            <Badge className="gap-1.5 bg-gradient-to-r from-primary to-secondary text-white border-0">
              <Sparkles className="size-3" />
              Featured Tool
            </Badge>
            <Badge variant="outline" className={status.className}>
              {status.label}
            </Badge>
          </div>

          {/* Logo and Name */}
          <div className="flex items-center gap-4">
            {tool.logo && (
              <div className="relative">
                <div className="absolute inset-0 animate-pulse rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 blur-lg" />
                <Image
                  src={tool.logo}
                  alt={`${tool.name} logo`}
                  width={64}
                  height={64}
                  className="relative size-16 rounded-xl border border-border bg-background"
                />
              </div>
            )}
            <div>
              <h3 className="text-2xl font-bold text-foreground lg:text-3xl">
                {tool.name}
              </h3>
              <p className="text-gradient font-medium">{tool.tagline}</p>
            </div>
          </div>

          {/* Description */}
          <p className="mt-4 text-muted-foreground leading-relaxed">
            {tool.description}
          </p>

          {/* Stats */}
          <div className="mt-6 flex items-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Users className="size-4" />
              <span>2K+ users</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Star className="size-4 text-yellow-500" />
              <span>4.9 rating</span>
            </div>
          </div>

          {/* CTAs */}
          <div className="mt-6 flex flex-wrap gap-3">
            {isAccessible && tool.websiteUrl && (
              <Button asChild size="lg" className="gap-2">
                <a
                  href={tool.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Try {tool.name}
                  <ExternalLink className="size-4" />
                </a>
              </Button>
            )}
            <Button asChild variant="outline" size="lg" className="gap-2 bg-transparent">
              <Link href={`/tools/${tool.slug}`}>
                Learn More
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
        </div>

        {/* Right: Screenshot/Visual */}
        <div className="relative aspect-video overflow-hidden rounded-xl border border-border bg-gradient-to-br from-primary/5 via-background to-secondary/5 lg:aspect-auto lg:min-h-[280px]">
          {tool.screenshots && tool.screenshots.length > 0 ? (
            <Image
              src={tool.screenshots[0]}
              alt={`${tool.name} preview`}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="mx-auto flex size-20 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20">
                  <span className="text-3xl font-bold text-gradient">
                    {tool.name.charAt(0)}
                  </span>
                </div>
                <p className="mt-4 text-sm text-muted-foreground">
                  Preview coming soon
                </p>
              </div>
              {/* Decorative elements */}
              <div className="absolute -left-10 -top-10 size-32 rounded-full bg-primary/10 blur-2xl" />
              <div className="absolute -bottom-10 -right-10 size-32 rounded-full bg-secondary/10 blur-2xl" />
            </div>
          )}
        </div>
      </div>

      {/* Tags */}
      <div className="border-t border-border px-6 py-4 lg:px-8">
        <div className="flex flex-wrap gap-2">
          {tool.tags.slice(0, 5).map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
          {tool.tags.length > 5 && (
            <Badge variant="secondary" className="text-xs">
              +{tool.tags.length - 5} more
            </Badge>
          )}
        </div>
      </div>
    </div>
  )
}
