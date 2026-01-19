"use client"

import * as React from "react"
import { Mail, Loader2, CheckCircle, Gift, ArrowRight } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { trackNewsletter } from "@/lib/analytics"

interface NewsletterFormProps {
  className?: string
  variant?: "default" | "minimal" | "hero" | "inline"
  placement?: string
  leadMagnet?: {
    title: string
    description: string
  }
  title?: string
  description?: string
}

export function NewsletterForm({
  className,
  variant = "default",
  placement = "default",
  leadMagnet,
  title,
  description,
}: NewsletterFormProps) {
  const [email, setEmail] = React.useState("")
  const [status, setStatus] = React.useState<
    "idle" | "loading" | "success" | "error"
  >("idle")
  const [message, setMessage] = React.useState("")

  // Track form view on mount
  React.useEffect(() => {
    trackNewsletter.formView(placement)
  }, [placement])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setStatus("loading")

    try {
      // API call to newsletter endpoint
      const response = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          source: placement,
          leadMagnet: leadMagnet?.title,
        }),
      })

      if (!response.ok) throw new Error("Subscription failed")

      // Track successful subscription
      trackNewsletter.subscribe(placement, leadMagnet?.title)

      setStatus("success")
      setMessage(
        leadMagnet
          ? `Check your inbox for ${leadMagnet.title}!`
          : "Thanks for subscribing! Check your inbox to confirm."
      )
      setEmail("")

      // Reset after 5 seconds
      setTimeout(() => {
        setStatus("idle")
        setMessage("")
      }, 5000)
    } catch {
      trackNewsletter.error(placement, "subscription_failed")
      setStatus("error")
      setMessage("Something went wrong. Please try again.")

      setTimeout(() => {
        setStatus("idle")
        setMessage("")
      }, 3000)
    }
  }

  // Hero variant - large, prominent CTA
  if (variant === "hero") {
    return (
      <div
        className={cn(
          "rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent p-8 sm:p-10",
          className
        )}
      >
        {leadMagnet && (
          <div className="mb-6 flex items-center gap-3">
            <div className="flex size-12 items-center justify-center rounded-xl bg-primary/20">
              <Gift className="size-6 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-primary">Free Resource</p>
              <p className="text-xs text-muted-foreground">{leadMagnet.description}</p>
            </div>
          </div>
        )}

        <h3 className="text-2xl font-bold text-foreground sm:text-3xl">
          {title || leadMagnet?.title || "Join the Newsletter"}
        </h3>
        <p className="mt-3 text-muted-foreground">
          {description || "Get weekly build logs, tips, and early access to new tools. No spam, unsubscribe anytime."}
        </p>

        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={status === "loading" || status === "success"}
            className="flex-1 h-12 text-base"
          />
          <Button
            type="submit"
            size="lg"
            disabled={status === "loading" || status === "success"}
            className="h-12 px-8 font-medium"
          >
            {status === "loading" ? (
              <Loader2 className="size-5 animate-spin" />
            ) : status === "success" ? (
              <>
                <CheckCircle className="mr-2 size-5" />
                Subscribed
              </>
            ) : (
              <>
                {leadMagnet ? "Get Free Access" : "Subscribe"}
                <ArrowRight className="ml-2 size-4" />
              </>
            )}
          </Button>
        </form>

        {message && (
          <p
            className={cn(
              "mt-4 text-sm",
              status === "success" ? "text-primary" : "text-destructive"
            )}
          >
            {message}
          </p>
        )}

        <p className="mt-4 text-xs text-muted-foreground">
          Join 2,000+ developers. Unsubscribe anytime.
        </p>
      </div>
    )
  }

  // Inline variant - single line, minimal
  if (variant === "inline") {
    return (
      <form onSubmit={handleSubmit} className={cn("flex gap-2", className)}>
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={status === "loading" || status === "success"}
          className="flex-1"
        />
        <Button
          type="submit"
          disabled={status === "loading" || status === "success"}
          size="sm"
        >
          {status === "loading" ? (
            <Loader2 className="size-4 animate-spin" />
          ) : status === "success" ? (
            <CheckCircle className="size-4" />
          ) : (
            "Subscribe"
          )}
        </Button>
      </form>
    )
  }

  // Minimal variant
  if (variant === "minimal") {
    return (
      <div className={cn("space-y-3", className)}>
        <form onSubmit={handleSubmit} className="flex gap-3">
          <Input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={status === "loading" || status === "success"}
            className="flex-1"
          />
          <Button
            type="submit"
            disabled={status === "loading" || status === "success"}
            className="font-medium"
          >
            {status === "loading" ? (
              <Loader2 className="size-4 animate-spin" />
            ) : status === "success" ? (
              <CheckCircle className="size-4" />
            ) : (
              "Subscribe"
            )}
          </Button>
        </form>
        {message && (
          <p
            className={cn(
              "text-sm",
              status === "success" ? "text-primary" : "text-destructive"
            )}
          >
            {message}
          </p>
        )}
      </div>
    )
  }

  // Default variant - card style
  return (
    <div
      className={cn(
        "rounded-xl border border-border bg-card p-6 transition-all duration-200 hover:border-primary/30",
        className
      )}
    >
      <div className="flex items-start gap-4">
        <div className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-primary/10">
          <Mail className="size-5 text-primary" />
        </div>
        <div>
          <h3 className="font-semibold text-foreground">
            {title || "Stay Updated"}
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            {description || "Get build logs, tips, and new tool launches in your inbox."}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mt-5 flex gap-3">
        <Input
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={status === "loading" || status === "success"}
          className="flex-1"
        />
        <Button
          type="submit"
          disabled={status === "loading" || status === "success"}
          className="font-medium"
        >
          {status === "loading" ? (
            <Loader2 className="size-4 animate-spin" />
          ) : status === "success" ? (
            <CheckCircle className="size-4" />
          ) : (
            "Subscribe"
          )}
        </Button>
      </form>

      {message && (
        <p
          className={cn(
            "mt-3 text-sm",
            status === "success" ? "text-primary" : "text-destructive"
          )}
        >
          {message}
        </p>
      )}

      <p className="mt-4 text-xs text-muted-foreground">
        No spam, unsubscribe anytime.
      </p>
    </div>
  )
}

// Newsletter API Route Handler (placeholder)
// Create this at /app/api/newsletter/subscribe/route.ts
export const newsletterApiConfig = {
  endpoint: "/api/newsletter/subscribe",
  method: "POST",
  body: {
    email: "string",
    source: "string",
    leadMagnet: "string | undefined",
  },
}
