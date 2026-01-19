"use client"

import * as React from "react"
import { ExternalLink } from "lucide-react"

import { cn } from "@/lib/utils"
import { trackAffiliate } from "@/lib/analytics"
import type { AffiliateProgram } from "@/lib/monetization"

interface TrackedAffiliateLinkProps {
  affiliate: AffiliateProgram
  placement: string
  children?: React.ReactNode
  className?: string
  showIcon?: boolean
  variant?: "inline" | "button" | "card"
}

export function TrackedAffiliateLink({
  affiliate,
  placement,
  children,
  className,
  showIcon = true,
  variant = "inline",
}: TrackedAffiliateLinkProps) {
  const handleClick = () => {
    trackAffiliate.click(affiliate.id, placement, affiliate.name)
  }

  // Track impression on mount
  React.useEffect(() => {
    trackAffiliate.impression(affiliate.id, placement)
  }, [affiliate.id, placement])

  const baseStyles = {
    inline: "inline-flex items-center gap-1 text-primary underline-offset-4 hover:underline",
    button:
      "inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
    card: "flex items-center gap-2 text-foreground hover:text-primary transition-colors",
  }

  return (
    <a
      href={affiliate.affiliateUrl}
      target="_blank"
      rel="noopener noreferrer sponsored"
      onClick={handleClick}
      className={cn(baseStyles[variant], className)}
    >
      {children || affiliate.name}
      {showIcon && <ExternalLink className="size-3.5 shrink-0" />}
    </a>
  )
}

// Inline affiliate mention for use within content
interface InlineAffiliateMentionProps {
  affiliateId: string
  placement: string
  className?: string
}

export function InlineAffiliateMention({
  affiliateId,
  placement,
  className,
}: InlineAffiliateMentionProps) {
  // Import dynamically to avoid circular deps
  const [affiliate, setAffiliate] = React.useState<AffiliateProgram | null>(null)

  React.useEffect(() => {
    import("@/lib/monetization").then(({ getAffiliateById }) => {
      const found = getAffiliateById(affiliateId)
      if (found) setAffiliate(found)
    })
  }, [affiliateId])

  if (!affiliate) return null

  return (
    <TrackedAffiliateLink
      affiliate={affiliate}
      placement={placement}
      className={className}
      variant="inline"
    />
  )
}
