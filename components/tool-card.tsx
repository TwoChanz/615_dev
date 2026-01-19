import React from "react"
import Link from "next/link"
import { ExternalLink, ArrowRight } from "lucide-react"

import { cn } from "@/lib/utils"
import type { Tool, ToolStatus } from "@/lib/tools"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface ToolCardProps {
  tool: Tool
  className?: string
}

const statusConfig: Record<ToolStatus, { label: string; className: string }> = {
  live: {
    label: "Live",
    className: "bg-primary/10 text-primary border-primary/20",
  },
  beta: {
    label: "Beta",
    className: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
  },
  alpha: {
    label: "Alpha",
    className: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20",
  },
  "coming-soon": {
    label: "Coming Soon",
    className: "bg-muted text-muted-foreground border-border",
  },
}

export function ToolCard({ tool, className }: ToolCardProps) {
  const status = statusConfig[tool.status]
  const isAccessible = tool.status !== "coming-soon" && !tool.comingSoon

  return (
    <Card
      className={cn(
        "group relative flex flex-col overflow-hidden transition-all duration-200 hover:border-primary/40 hover:shadow-md",
        className
      )}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-4">
          <div>
            <CardTitle className="text-lg text-foreground">{tool.name}</CardTitle>
            <Badge
              variant="outline"
              className={cn("mt-1.5 font-medium", status.className)}
            >
              {status.label}
            </Badge>
          </div>
        </div>
        {tool.tagline && (
          <p className="mt-2 text-sm font-medium text-primary">{tool.tagline}</p>
        )}
      </CardHeader>

      <CardContent className="flex-1 pb-4">
        <CardDescription className="text-sm leading-relaxed text-muted-foreground">
          {tool.description}
        </CardDescription>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {tool.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="rounded-md bg-muted px-2 py-1 text-xs font-medium text-muted-foreground"
            >
              {tag}
            </span>
          ))}
          {tool.tags.length > 4 && (
            <span className="rounded-md bg-muted px-2 py-1 text-xs font-medium text-muted-foreground">
              +{tool.tags.length - 4}
            </span>
          )}
        </div>
      </CardContent>

      <CardFooter className="gap-3 pt-0">
        {/* CTA 1: Learn More - Internal route to /tools/[slug] */}
        <Button asChild variant="outline" size="sm" className="flex-1 bg-transparent">
          <Link href={`/tools/${tool.slug}`}>
            Learn More
            <ArrowRight className="ml-1.5 size-3.5" />
          </Link>
        </Button>

        {/* CTA 2: Visit - External link to product domain */}
        {isAccessible && tool.websiteUrl && (
          <Button asChild size="sm" className="flex-1">
            <a
              href={tool.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Visit
              <ExternalLink className="ml-1.5 size-3.5" />
            </a>
          </Button>
        )}

        {/* Coming Soon state - disabled button */}
        {!isAccessible && (
          <Button size="sm" className="flex-1" disabled>
            Coming Soon
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}

// Re-export Tool type for backwards compatibility
export type { Tool } from "@/lib/tools"
