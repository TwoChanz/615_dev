"use client"

import * as React from "react"
import { ExternalLink, Star, Sparkles } from "lucide-react"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { trackAffiliate } from "@/lib/analytics"
import type { AffiliateProgram } from "@/lib/monetization"

// Legacy interface for backward compatibility
export interface AffiliateItem {
  name: string
  description: string
  url: string
  category: string
  featured?: boolean
  discount?: string
}

interface AffiliateBlockProps {
  title?: string
  description?: string
  items?: AffiliateItem[]
  affiliates?: AffiliateProgram[]
  placement?: string
  className?: string
  variant?: "default" | "compact" | "featured"
}

export function AffiliateBlock({
  title = "Recommended Tools",
  description,
  items,
  affiliates,
  placement = "sidebar",
  className,
  variant = "default",
}: AffiliateBlockProps) {
  // Support both legacy items and new affiliates
  const displayItems = affiliates || items

  if (!displayItems || displayItems.length === 0) return null

  return (
    <div
      className={cn(
        "rounded-xl border border-border bg-card p-6 card-interactive",
        variant === "compact" && "p-4",
        variant === "featured" && "border-primary/20 bg-gradient-to-br from-primary/5 to-transparent",
        className
      )}
    >
      <div className={cn("mb-5", variant === "compact" && "mb-3")}>
        <div className="flex items-center gap-2.5">
          <div className={cn(
            "flex items-center justify-center rounded-lg bg-primary/10",
            variant === "compact" ? "size-8" : "size-9"
          )}>
            {variant === "featured" ? (
              <Sparkles className={cn("size-4", "text-primary")} />
            ) : (
              <Star className={cn(variant === "compact" ? "size-3.5" : "size-4", "text-primary")} />
            )}
          </div>
          <h3 className={cn(
            "font-semibold text-foreground",
            variant === "compact" && "text-sm"
          )}>
            {title}
          </h3>
        </div>
        {description && (
          <p className={cn(
            "mt-2 text-muted-foreground",
            variant === "compact" ? "text-xs" : "text-sm"
          )}>
            {description}
          </p>
        )}
      </div>

      <div className={cn("space-y-3", variant === "compact" && "space-y-2")}>
        {displayItems.map((item) => {
          // Check if it's an AffiliateProgram or legacy AffiliateItem
          const isProgram = "affiliateUrl" in item
          return (
            <AffiliateCard
              key={item.name}
              item={item}
              placement={placement}
              isProgram={isProgram}
              variant={variant}
            />
          )
        })}
      </div>

      <p className={cn(
        "mt-5 text-muted-foreground",
        variant === "compact" ? "mt-3 text-[10px]" : "text-xs"
      )}>
        Some links may be affiliate links. We only recommend tools we use.
      </p>
    </div>
  )
}

interface AffiliateCardProps {
  item: AffiliateItem | AffiliateProgram
  placement: string
  isProgram: boolean
  variant?: "default" | "compact" | "featured"
  className?: string
}

function AffiliateCard({ item, placement, isProgram, variant = "default", className }: AffiliateCardProps) {
  const url = isProgram ? (item as AffiliateProgram).affiliateUrl : item.url
  const isFeatured = item.featured
  const discount = item.discount

  const handleClick = () => {
    if (isProgram) {
      trackAffiliate.click((item as AffiliateProgram).id, placement, item.name)
    }
  }

  // Track impression
  React.useEffect(() => {
    if (isProgram) {
      trackAffiliate.impression((item as AffiliateProgram).id, placement)
    }
  }, [isProgram, item, placement])

  return (
    <div
      className={cn(
        "flex items-center justify-between gap-4 rounded-lg border border-border bg-background transition-all duration-200 hover:border-primary/40",
        variant === "compact" ? "p-3" : "p-4",
        isFeatured && "border-primary/30 bg-primary/5",
        className
      )}
    >
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <h4 className={cn(
            "font-medium text-foreground",
            variant === "compact" && "text-sm"
          )}>
            {item.name}
          </h4>
          {isFeatured && (
            <Badge
              variant="outline"
              className="shrink-0 bg-primary/10 text-primary border-primary/20 text-[10px] px-1.5 py-0"
            >
              Top Pick
            </Badge>
          )}
          {discount && (
            <Badge className="shrink-0 bg-primary text-primary-foreground text-[10px] px-1.5 py-0">
              {discount}
            </Badge>
          )}
        </div>
        <p className={cn(
          "mt-1 text-muted-foreground line-clamp-1",
          variant === "compact" ? "text-xs" : "text-sm"
        )}>
          {item.description}
        </p>
        <span className={cn(
          "mt-1.5 inline-block rounded-md bg-muted px-2 py-0.5 font-medium text-muted-foreground",
          variant === "compact" ? "text-[10px]" : "text-xs"
        )}>
          {item.category}
        </span>
      </div>
      <Button
        asChild
        size={variant === "compact" ? "sm" : "sm"}
        variant="outline"
        className="shrink-0 bg-transparent"
      >
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer sponsored"
          onClick={handleClick}
        >
          Visit
          <ExternalLink className="ml-1.5 size-3" />
        </a>
      </Button>
    </div>
  )
}

// Resource Card Component
interface ResourceCardProps {
  name: string
  description: string
  url: string
  icon?: React.ReactNode
  placement?: string
  className?: string
}

export function ResourceCard({
  name,
  description,
  url,
  icon,
  placement = "resources",
  className,
}: ResourceCardProps) {
  const handleClick = () => {
    trackAffiliate.click(name.toLowerCase().replace(/\s/g, "-"), placement, name)
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer sponsored"
      onClick={handleClick}
      className={cn(
        "group flex items-start gap-4 rounded-xl border border-border bg-card p-6 card-interactive",
        className
      )}
    >
      {icon && (
        <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors duration-200 group-hover:bg-primary group-hover:text-primary-foreground">
          {icon}
        </div>
      )}
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-foreground transition-colors duration-200 group-hover:text-primary">
          {name}
        </h3>
        <p className="mt-1.5 text-sm text-muted-foreground line-clamp-2 leading-relaxed">
          {description}
        </p>
      </div>
      <ExternalLink className="size-4 shrink-0 text-muted-foreground transition-colors duration-200 group-hover:text-primary" />
    </a>
  )
}

// Contextual Affiliate Block (auto-selects based on tags)
interface ContextualAffiliateBlockProps {
  tags: string[]
  placement: string
  maxItems?: number
  className?: string
}

export function ContextualAffiliateBlock({
  tags,
  placement,
  maxItems = 3,
  className,
}: ContextualAffiliateBlockProps) {
  const [affiliates, setAffiliates] = React.useState<AffiliateProgram[]>([])

  React.useEffect(() => {
    import("@/lib/monetization").then(({ getContextualAffiliates }) => {
      const relevant = getContextualAffiliates(tags).slice(0, maxItems)
      setAffiliates(relevant)
    })
  }, [tags, maxItems])

  if (affiliates.length === 0) return null

  return (
    <AffiliateBlock
      title="Recommended for This Topic"
      description="Tools that work great for what you're learning."
      affiliates={affiliates}
      placement={placement}
      variant="compact"
      className={className}
    />
  )
}
