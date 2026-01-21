"use client"

import * as React from "react"
import Link from "next/link"
import {
  ArrowRight,
  Sparkles,
  Rocket,
  BookOpen,
  Download,
  ExternalLink,
  Star,
  Zap,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { trackEngagement, trackProduct } from "@/lib/analytics"
import type { DigitalProduct } from "@/lib/monetization"

// Primary CTA Block - Used for major conversion points
interface PrimaryCTAProps {
  title: string
  description: string
  buttonText: string
  buttonHref: string
  variant?: "primary" | "gradient" | "outline" | "highlight"
  icon?: React.ReactNode
  badge?: string
  placement?: string
  className?: string
}

export function PrimaryCTA({
  title,
  description,
  buttonText,
  buttonHref,
  variant = "primary",
  icon,
  badge,
  placement = "default",
  className,
}: PrimaryCTAProps) {
  const handleClick = () => {
    trackEngagement.ctaClick(
      `primary-cta-${placement}`,
      buttonText,
      placement
    )
  }

  const isExternal = buttonHref.startsWith("http")
  const LinkComponent = isExternal ? "a" : Link

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl p-8 sm:p-10",
        variant === "primary" && "bg-primary text-primary-foreground",
        variant === "gradient" &&
          "bg-gradient-to-br from-primary via-primary/90 to-primary/80 text-primary-foreground",
        variant === "outline" &&
          "border-2 border-primary/20 bg-primary/5",
        variant === "highlight" &&
          "border-2 border-primary/40 bg-gradient-to-br from-primary/15 via-purple-500/10 to-primary/5 shadow-lg shadow-primary/10",
        className
      )}
    >
      {/* Decorative elements */}
      {variant !== "outline" && variant !== "highlight" && (
        <div className="absolute -right-10 -top-10 size-40 rounded-full bg-white/10 blur-3xl" />
      )}
      {/* Highlight variant decorative elements */}
      {variant === "highlight" && (
        <>
          <div className="absolute -right-20 -top-20 size-60 rounded-full bg-primary/20 blur-3xl animate-pulse" />
          <div className="absolute -left-10 -bottom-10 size-40 rounded-full bg-purple-500/15 blur-3xl animate-pulse [animation-delay:1s]" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-purple-500/5" />
        </>
      )}

      <div className="relative">
        {badge && (
          <Badge
            className={cn(
              "mb-4",
              variant === "outline" &&
                "bg-primary/10 text-primary border-primary/20",
              variant === "highlight" &&
                "bg-gradient-to-r from-primary to-purple-500 text-white border-0 animate-pulse shadow-md shadow-primary/20",
              variant !== "outline" && variant !== "highlight" &&
                "bg-white/20 text-white border-white/20"
            )}
          >
            {badge}
          </Badge>
        )}

        <div className="flex items-start gap-4">
          {icon && (
            <div
              className={cn(
                "flex size-12 shrink-0 items-center justify-center rounded-xl",
                variant === "outline" && "bg-primary/10 text-primary",
                variant === "highlight" &&
                  "bg-gradient-to-br from-primary to-purple-500 text-white shadow-lg shadow-primary/30",
                variant !== "outline" && variant !== "highlight" &&
                  "bg-white/20 text-white"
              )}
            >
              {icon}
            </div>
          )}
          <div className="flex-1">
            <h3
              className={cn(
                "text-2xl font-bold sm:text-3xl",
                variant === "outline" && "text-foreground",
                variant === "highlight" && "text-foreground bg-gradient-to-r from-foreground via-primary to-purple-500 bg-clip-text"
              )}
            >
              {title}
            </h3>
            <p
              className={cn(
                "mt-2 text-lg",
                (variant === "outline" || variant === "highlight") &&
                  "text-muted-foreground",
                variant !== "outline" && variant !== "highlight" &&
                  "text-white/80"
              )}
            >
              {description}
            </p>
          </div>
        </div>

        <div className="mt-6">
          <Button
            asChild
            size="lg"
            variant={variant === "outline" || variant === "highlight" ? "default" : "secondary"}
            className={cn(
              "font-medium",
              variant === "highlight" &&
                "bg-gradient-to-r from-primary to-purple-500 hover:from-primary/90 hover:to-purple-500/90 text-white shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 hover:scale-[1.02]",
              variant !== "outline" && variant !== "highlight" &&
                "bg-white text-primary hover:bg-white/90"
            )}
            onClick={handleClick}
          >
            <LinkComponent
              href={buttonHref}
              {...(isExternal && { target: "_blank", rel: "noopener noreferrer" })}
            >
              {buttonText}
              <ArrowRight className="ml-2 size-4" />
            </LinkComponent>
          </Button>
        </div>
      </div>
    </div>
  )
}

// Product CTA - For digital products
interface ProductCTAProps {
  product: DigitalProduct
  placement?: string
  variant?: "card" | "inline" | "featured"
  className?: string
}

export function ProductCTA({
  product,
  placement = "default",
  variant = "card",
  className,
}: ProductCTAProps) {
  const handleClick = () => {
    trackProduct.click(product.id, placement, product.price)
  }

  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null

  if (variant === "inline") {
    return (
      <div
        className={cn(
          "flex items-center justify-between gap-4 rounded-lg border border-border bg-card p-4",
          className
        )}
      >
        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-foreground">{product.name}</h4>
          <p className="text-sm text-muted-foreground line-clamp-1">
            {product.description}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <span className="text-lg font-bold text-foreground">
              ${product.price}
            </span>
            {product.originalPrice && (
              <span className="ml-2 text-sm text-muted-foreground line-through">
                ${product.originalPrice}
              </span>
            )}
          </div>
          <Button asChild size="sm" onClick={handleClick}>
            <Link href={product.url}>Get It</Link>
          </Button>
        </div>
      </div>
    )
  }

  if (variant === "featured") {
    return (
      <div
        className={cn(
          "relative overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent p-8",
          className
        )}
      >
        <div className="absolute -right-10 top-0 size-32 rounded-full bg-primary/10 blur-3xl" />

        <div className="relative">
          <div className="flex items-center gap-2 flex-wrap">
            <Badge className="bg-primary text-primary-foreground">
              Featured
            </Badge>
            {discount && (
              <Badge variant="outline" className="border-primary/20 text-primary">
                {discount}% OFF
              </Badge>
            )}
          </div>

          <h3 className="mt-4 text-2xl font-bold text-foreground">
            {product.name}
          </h3>
          <p className="mt-2 text-muted-foreground">{product.description}</p>

          <div className="mt-6 flex items-center gap-4">
            <div>
              <span className="text-3xl font-bold text-foreground">
                ${product.price}
              </span>
              {product.originalPrice && (
                <span className="ml-2 text-lg text-muted-foreground line-through">
                  ${product.originalPrice}
                </span>
              )}
            </div>
            <Button asChild size="lg" onClick={handleClick}>
              <Link href={product.url}>
                Get Access
                <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button>
          </div>

          {product.salesCount && (
            <p className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
              <Star className="size-4 text-primary" />
              {product.salesCount}+ developers using this
            </p>
          )}
        </div>
      </div>
    )
  }

  // Default card variant
  return (
    <div
      className={cn(
        "rounded-xl border border-border bg-card p-6 card-interactive",
        className
      )}
    >
      <div className="flex items-center justify-between gap-4">
        <Badge variant="outline" className="text-xs">
          {product.type}
        </Badge>
        {discount && (
          <Badge className="bg-primary text-primary-foreground text-xs">
            Save {discount}%
          </Badge>
        )}
      </div>

      <h4 className="mt-4 text-lg font-semibold text-foreground">
        {product.name}
      </h4>
      <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
        {product.description}
      </p>

      <div className="mt-4 flex items-center justify-between">
        <div>
          <span className="text-2xl font-bold text-foreground">
            ${product.price}
          </span>
          {product.originalPrice && (
            <span className="ml-2 text-sm text-muted-foreground line-through">
              ${product.originalPrice}
            </span>
          )}
        </div>
        <Button asChild size="sm" onClick={handleClick}>
          <Link href={product.url}>
            View
            <ArrowRight className="ml-1.5 size-3" />
          </Link>
        </Button>
      </div>
    </div>
  )
}

// Content CTA - Used within articles
interface ContentCTAProps {
  type: "newsletter" | "product" | "tool" | "guide"
  title?: string
  description?: string
  buttonText?: string
  buttonHref?: string
  placement?: string
  className?: string
}

export function ContentCTA({
  type,
  title,
  description,
  buttonText,
  buttonHref,
  placement = "in-content",
  className,
}: ContentCTAProps) {
  const defaults = {
    newsletter: {
      icon: <Sparkles className="size-5" />,
      title: "Enjoying this content?",
      description: "Get more like this delivered to your inbox every week.",
      buttonText: "Subscribe Free",
      buttonHref: "#newsletter",
    },
    product: {
      icon: <Rocket className="size-5" />,
      title: "Ready to ship faster?",
      description: "Get the complete starter kit and launch your SaaS in days.",
      buttonText: "Get the Kit",
      buttonHref: "/products",
    },
    tool: {
      icon: <Zap className="size-5" />,
      title: "Try this tool",
      description: "Built for developers who want to move fast.",
      buttonText: "Try Free",
      buttonHref: "/tools",
    },
    guide: {
      icon: <BookOpen className="size-5" />,
      title: "Want the complete guide?",
      description: "Deep dive into everything covered here and more.",
      buttonText: "Read Guide",
      buttonHref: "/guides",
    },
  }

  const config = defaults[type]
  const displayTitle = title || config.title
  const displayDescription = description || config.description
  const displayButtonText = buttonText || config.buttonText
  const displayButtonHref = buttonHref || config.buttonHref

  const handleClick = () => {
    trackEngagement.ctaClick(`content-cta-${type}`, displayButtonText, placement)
  }

  return (
    <div
      className={cn(
        "my-8 flex items-start gap-4 rounded-xl border border-primary/20 bg-primary/5 p-6",
        className
      )}
    >
      <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
        {config.icon}
      </div>
      <div className="flex-1">
        <h4 className="font-semibold text-foreground">{displayTitle}</h4>
        <p className="mt-1 text-sm text-muted-foreground">
          {displayDescription}
        </p>
        <Button
          asChild
          size="sm"
          variant="outline"
          className="mt-3 bg-transparent"
          onClick={handleClick}
        >
          <Link href={displayButtonHref}>
            {displayButtonText}
            <ArrowRight className="ml-1.5 size-3" />
          </Link>
        </Button>
      </div>
    </div>
  )
}

// Download CTA - For lead magnets
interface DownloadCTAProps {
  title: string
  description: string
  downloadText?: string
  format?: string
  placement?: string
  onDownload?: () => void
  className?: string
}

export function DownloadCTA({
  title,
  description,
  downloadText = "Download Free",
  format = "PDF",
  placement = "default",
  onDownload,
  className,
}: DownloadCTAProps) {
  const handleClick = () => {
    trackEngagement.ctaClick(`download-${title.toLowerCase().replace(/\s/g, "-")}`, downloadText, placement)
    onDownload?.()
  }

  return (
    <div
      className={cn(
        "rounded-xl border border-border bg-card p-6",
        className
      )}
    >
      <div className="flex items-start gap-4">
        <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
          <Download className="size-6 text-primary" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h4 className="font-semibold text-foreground">{title}</h4>
            <Badge variant="outline" className="text-xs">
              {format}
            </Badge>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
          <Button size="sm" className="mt-4" onClick={handleClick}>
            {downloadText}
            <Download className="ml-1.5 size-3" />
          </Button>
        </div>
      </div>
    </div>
  )
}

// External Link CTA
interface ExternalLinkCTAProps {
  title: string
  description: string
  href: string
  buttonText?: string
  placement?: string
  className?: string
}

export function ExternalLinkCTA({
  title,
  description,
  href,
  buttonText = "Learn More",
  placement = "default",
  className,
}: ExternalLinkCTAProps) {
  const handleClick = () => {
    trackEngagement.externalLink(href, placement)
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className={cn(
        "group flex items-center justify-between gap-4 rounded-xl border border-border bg-card p-6 card-interactive",
        className
      )}
    >
      <div>
        <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors">
          {title}
        </h4>
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      </div>
      <Button variant="ghost" size="sm" className="shrink-0">
        {buttonText}
        <ExternalLink className="ml-1.5 size-3" />
      </Button>
    </a>
  )
}
