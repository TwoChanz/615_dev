"use client"

import * as React from "react"
import { useState } from "react"
import {
  Download,
  FileText,
  CheckCircle2,
  Loader2,
  ArrowRight,
  Sparkles,
  Lock,
  Mail,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { trackEngagement } from "@/lib/analytics"

// Lead Magnet Data
export interface LeadMagnet {
  id: string
  name: string
  description: string
  deliverable: string
  downloadUrl?: string
  previewPoints?: string[]
  badge?: string
}

export const leadMagnets: Record<string, LeadMagnet> = {
  "saas-checklist": {
    id: "saas-checklist",
    name: "SaaS Launch Checklist",
    description: "Complete pre-launch checklist for indie hackers and solo founders",
    deliverable: "Interactive HTML guide",
    previewPoints: [
      "Pre-launch validation steps",
      "Technical infrastructure checklist",
      "Launch day action items",
      "Post-launch growth tactics",
    ],
    badge: "Most Downloaded",
  },
  "tech-stack-guide": {
    id: "tech-stack-guide",
    name: "2026 Indie Hacker Tech Stack",
    description: "The modern indie hacker stack for shipping fast and scaling smart",
    deliverable: "Interactive HTML guide",
    previewPoints: [
      "Frontend & backend recommendations",
      "Database & auth solutions",
      "Payment & email providers",
      "Cost breakdown for each tier",
    ],
    badge: "Updated for 2026",
  },
  "automation-starter": {
    id: "automation-starter",
    name: "Automation Workflows Starter Kit",
    description: "Copy-paste automation patterns for Claude Code, GitHub Actions, Vercel, and notifications",
    deliverable: "Interactive HTML guide",
    previewPoints: [
      "Claude Code automation patterns",
      "GitHub Actions CI/CD templates",
      "Vercel deployment workflows",
      "Slack & Discord notifications",
    ],
    badge: "Plug & Play",
  },
}

// Inline Lead Magnet CTA - for placing within articles
interface LeadMagnetCTAProps {
  magnetId: keyof typeof leadMagnets
  variant?: "default" | "minimal" | "featured"
  placement?: string
  className?: string
}

export function LeadMagnetCTA({
  magnetId,
  variant = "default",
  placement = "in-content",
  className,
}: LeadMagnetCTAProps) {
  const magnet = leadMagnets[magnetId]
  if (!magnet) return null

  return (
    <Dialog>
      <DialogTrigger asChild>
        {variant === "minimal" ? (
          <button
            className={cn(
              "group inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition-colors",
              className
            )}
            onClick={() => trackEngagement.ctaClick(`lead-magnet-${magnetId}`, "open", placement)}
          >
            <Download className="size-4" aria-hidden="true" />
            Get the {magnet.name}
            <ArrowRight className="size-3 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </button>
        ) : variant === "featured" ? (
          <div
            role="button"
            tabIndex={0}
            className={cn(
              "group relative overflow-hidden rounded-2xl border-2 border-primary/30 bg-gradient-to-br from-primary/10 via-purple-500/5 to-transparent p-6 cursor-pointer transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
              className
            )}
            onClick={() => trackEngagement.ctaClick(`lead-magnet-${magnetId}`, "open", placement)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault()
                trackEngagement.ctaClick(`lead-magnet-${magnetId}`, "open", placement)
              }
            }}
          >
            <div className="absolute -right-10 -top-10 size-40 rounded-full bg-primary/10 blur-3xl" aria-hidden="true" />
            <div className="relative">
              {magnet.badge && (
                <Badge className="mb-3 bg-gradient-to-r from-primary to-purple-500 text-white border-0">
                  {magnet.badge}
                </Badge>
              )}
              <div className="flex items-start gap-4">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-purple-500 text-white">
                  <FileText className="size-6" aria-hidden="true" />
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-bold text-foreground">{magnet.name}</h4>
                  <p className="mt-1 text-sm text-muted-foreground">{magnet.description}</p>
                  <div className="mt-3 flex items-center gap-2 text-sm">
                    <Lock className="size-3.5 text-primary" aria-hidden="true" />
                    <span className="text-muted-foreground">Free download • {magnet.deliverable}</span>
                  </div>
                </div>
              </div>
              <Button className="mt-4 w-full bg-gradient-to-r from-primary to-purple-500 hover:from-primary/90 hover:to-purple-500/90">
                Get Free Access
                <ArrowRight className="ml-2 size-4" aria-hidden="true" />
              </Button>
            </div>
          </div>
        ) : (
          <div
            role="button"
            tabIndex={0}
            className={cn(
              "my-8 flex items-start gap-4 rounded-xl border border-primary/20 bg-primary/5 p-6 cursor-pointer transition-all hover:border-primary/40 hover:bg-primary/10 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
              className
            )}
            onClick={() => trackEngagement.ctaClick(`lead-magnet-${magnetId}`, "open", placement)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault()
                trackEngagement.ctaClick(`lead-magnet-${magnetId}`, "open", placement)
              }
            }}
          >
            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Download className="size-5" aria-hidden="true" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h4 className="font-semibold text-foreground">{magnet.name}</h4>
                {magnet.badge && (
                  <Badge variant="outline" className="text-xs border-primary/20 text-primary">
                    {magnet.badge}
                  </Badge>
                )}
              </div>
              <p className="mt-1 text-sm text-muted-foreground">{magnet.description}</p>
              <p className="mt-2 text-xs text-muted-foreground">
                <span className="text-primary font-medium">Free</span> • {magnet.deliverable}
              </p>
            </div>
            <Button variant="outline" size="sm" className="shrink-0 bg-transparent">
              Get It
              <ArrowRight className="ml-1.5 size-3" aria-hidden="true" />
            </Button>
          </div>
        )}
      </DialogTrigger>
      <LeadMagnetModal magnet={magnet} placement={placement} />
    </Dialog>
  )
}

// Lead Magnet Modal with Email Capture
interface LeadMagnetModalProps {
  magnet: LeadMagnet
  placement: string
}

function LeadMagnetModal({ magnet, placement }: LeadMagnetModalProps) {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")

  // Generate unique IDs for accessibility
  const formId = React.useId()
  const emailInputId = `${formId}-email`
  const errorMessageId = `${formId}-error`

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setStatus("loading")
    setErrorMessage("")

    try {
      const response = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          source: `lead-magnet-${magnet.id}`,
          leadMagnet: magnet.id,
          placement,
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || "Subscription failed")
      }

      setStatus("success")
      trackEngagement.ctaClick(`lead-magnet-${magnet.id}`, "convert", placement)
    } catch (error) {
      setStatus("error")
      setErrorMessage(error instanceof Error ? error.message : "Something went wrong")
    }
  }

  return (
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2">
          <Sparkles className="size-5 text-primary" aria-hidden="true" />
          {magnet.name}
        </DialogTitle>
        <DialogDescription>{magnet.description}</DialogDescription>
      </DialogHeader>

      {status === "success" ? (
        <div className="py-6 text-center">
          <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-primary/10">
            <CheckCircle2 className="size-8 text-primary" aria-hidden="true" />
          </div>
          <h3 className="mt-4 text-lg font-semibold text-foreground">Check Your Email!</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            We&apos;ve sent a secure download link to your inbox.
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            The link expires in 7 days.
          </p>
        </div>
      ) : (
        <>
          {/* Preview Points */}
          {magnet.previewPoints && (
            <div className="rounded-lg bg-muted/50 p-4">
              <p className="text-sm font-medium text-foreground mb-2">What you&apos;ll get:</p>
              <ul className="space-y-1.5">
                {magnet.previewPoints.map((point, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="size-4 shrink-0 text-primary mt-0.5" aria-hidden="true" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Email Form */}
          <form onSubmit={handleSubmit} className="space-y-4" aria-busy={status === "loading"}>
            <div className="space-y-2">
              <label htmlFor={emailInputId} className="sr-only">
                Email address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
                <Input
                  id={emailInputId}
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  required
                  disabled={status === "loading"}
                  aria-invalid={status === "error"}
                  aria-describedby={status === "error" ? errorMessageId : undefined}
                />
              </div>
              {status === "error" && (
                <p id={errorMessageId} role="alert" className="text-sm text-destructive">
                  {errorMessage}
                </p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-primary to-purple-500 hover:from-primary/90 hover:to-purple-500/90"
              disabled={status === "loading"}
            >
              {status === "loading" ? (
                <>
                  <Loader2 className="mr-2 size-4 animate-spin" aria-hidden="true" />
                  Sending...
                </>
              ) : (
                <>
                  <Download className="mr-2 size-4" aria-hidden="true" />
                  Get Free {magnet.deliverable}
                </>
              )}
            </Button>

            <p className="text-center text-xs text-muted-foreground">
              No spam. Unsubscribe anytime.
            </p>
          </form>
        </>
      )}
    </DialogContent>
  )
}

// Sidebar Lead Magnet Widget
interface LeadMagnetWidgetProps {
  magnetId: keyof typeof leadMagnets
  className?: string
}

export function LeadMagnetWidget({ magnetId, className }: LeadMagnetWidgetProps) {
  return (
    <LeadMagnetCTA
      magnetId={magnetId}
      variant="featured"
      placement="sidebar"
      className={className}
    />
  )
}

// Floating/Sticky Lead Magnet Bar
interface LeadMagnetBarProps {
  magnetId: keyof typeof leadMagnets
  className?: string
}

export function LeadMagnetBar({ magnetId, className }: LeadMagnetBarProps) {
  const magnet = leadMagnets[magnetId]
  if (!magnet) return null

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div
          role="button"
          tabIndex={0}
          className={cn(
            "fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-background/95 backdrop-blur-sm p-4 shadow-lg cursor-pointer transition-transform hover:bg-muted/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset",
            className
          )}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault()
              // Dialog will handle the trigger
            }
          }}
        >
          <div className="container-page flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-purple-500 text-white">
                <FileText className="size-5" aria-hidden="true" />
              </div>
              <div className="hidden sm:block">
                <p className="font-medium text-foreground">{magnet.name}</p>
                <p className="text-sm text-muted-foreground">Free {magnet.deliverable}</p>
              </div>
              <p className="sm:hidden font-medium text-foreground">{magnet.name}</p>
            </div>
            <Button className="bg-gradient-to-r from-primary to-purple-500 hover:from-primary/90 hover:to-purple-500/90">
              Get Free Access
              <ArrowRight className="ml-2 size-4" aria-hidden="true" />
            </Button>
          </div>
        </div>
      </DialogTrigger>
      <LeadMagnetModal magnet={magnet} placement="sticky-bar" />
    </Dialog>
  )
}
