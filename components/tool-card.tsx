import React from "react"
import Link from "next/link"
import Image from "next/image"
import { ExternalLink, ArrowRight, Sparkles } from "lucide-react"

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
  featured?: boolean
}

const statusConfig: Record<ToolStatus, { label: string; className: string; icon?: React.ReactNode }> = {
  live: {
    label: "Live",
    className: "bg-green-500/15 text-green-600 dark:text-green-400 border-green-500/30",
    icon: <Sparkles className="size-3" />,
  },
  beta: {
    label: "Beta",
    className: "bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30",
  },
  alpha: {
    label: "Alpha",
    className: "bg-secondary/15 text-secondary border-secondary/30",
  },
  "coming-soon": {
    label: "Coming Soon",
    className: "bg-muted text-muted-foreground border-border",
  },
}

export function ToolCard({ tool, className, featured = false }: ToolCardProps) {
  const status = statusConfig[tool.status]
  const isAccessible = tool.status !== "coming-soon"

  return (
    <Card
      className={cn(
        "group relative flex flex-col overflow-hidden transition-all duration-300",
        "hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5",
        "hover:-translate-y-1",
        featured && "ring-2 ring-primary/20",
        className
      )}
    >
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      {/* Glow effect */}
      <div className="absolute -right-10 -top-10 size-20 rounded-full bg-primary/20 blur-2xl opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:size-32" />
      <div className="absolute -bottom-10 -left-10 size-20 rounded-full bg-secondary/20 blur-2xl opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:size-32" />

      <CardHeader className="relative pb-3">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            {tool.logo && (
              <div className="relative">
                {/* Logo glow on hover */}
                <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 blur-md opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <Image
                  src={tool.logo}
                  alt={`${tool.name} logo`}
                  width={48}
                  height={48}
                  className="relative size-12 rounded-lg transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            )}
            <div>
              <CardTitle className="text-lg text-foreground transition-colors duration-200 group-hover:text-gradient">
                {tool.name}
              </CardTitle>
              <Badge
                variant="outline"
                className={cn("mt-1.5 gap-1 font-medium transition-all duration-200", status.className)}
              >
                {status.icon}
                {status.label}
              </Badge>
            </div>
          </div>
        </div>
        {tool.tagline && (
          <p className="mt-3 text-sm font-medium text-gradient">{tool.tagline}</p>
        )}
      </CardHeader>

      <CardContent className="relative flex-1 pb-4">
        <CardDescription className="text-sm leading-relaxed text-muted-foreground">
          {tool.description}
        </CardDescription>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {tool.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="rounded-md bg-muted px-2 py-1 text-xs font-medium text-muted-foreground transition-colors duration-200 group-hover:bg-primary/10 group-hover:text-primary"
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

      <CardFooter className="relative gap-3 pt-0">
        {/* CTA 1: Learn More - Internal route to /tools/[slug] */}
        <Button
          asChild
          variant="outline"
          size="sm"
          className="flex-1 bg-transparent transition-all duration-200 group-hover:border-primary/50"
        >
          <Link href={`/tools/${tool.slug}`} className="gap-1.5">
            Learn More
            <ArrowRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>
        </Button>

        {/* CTA 2: Visit - External link to product domain */}
        {isAccessible && tool.websiteUrl && (
          <Button
            asChild
            size="sm"
            className="flex-1 transition-all duration-200 group-hover:shadow-lg group-hover:shadow-primary/20"
          >
            <a
              href={tool.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="gap-1.5"
            >
              Visit
              <ExternalLink className="size-3.5" />
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
