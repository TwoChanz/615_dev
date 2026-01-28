"use client"

import * as React from "react"
import { Mail, Loader2, CheckCircle, Gift, ArrowRight, User } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { trackNewsletter } from "@/lib/analytics"
import { toast } from "sonner"
import { subscribeSchema, VALID_PERSONAS, type PersonaId } from "@/lib/validation"
import { PostSubscribeSurvey } from "@/components/post-subscribe-survey"

// Persona display labels
const PERSONA_LABELS: Record<PersonaId, string> = {
  "solo-founder": "Solo founder",
  "small-team": "Small team (2-5)",
  "agency-freelancer": "Agency/Freelancer",
  "learning-student": "Learning/Student",
  "enterprise": "Enterprise",
}

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
  showExtendedFields?: boolean
}

export function NewsletterForm({
  className,
  variant = "default",
  placement = "default",
  leadMagnet,
  title,
  description,
  showExtendedFields = false,
}: NewsletterFormProps) {
  const [email, setEmail] = React.useState("")
  const [firstName, setFirstName] = React.useState("")
  const [persona, setPersona] = React.useState<PersonaId | "">("")
  const [status, setStatus] = React.useState<
    "idle" | "loading" | "success" | "error"
  >("idle")
  const [message, setMessage] = React.useState("")
  const [validationError, setValidationError] = React.useState("")
  const [showSurvey, setShowSurvey] = React.useState(false)
  const [subscribedEmail, setSubscribedEmail] = React.useState("")

  // Generate unique ID for this form instance
  const formId = React.useId()
  const emailInputId = `${formId}-email`
  const firstNameInputId = `${formId}-firstName`
  const personaSelectId = `${formId}-persona`
  const messageId = `${formId}-message`

  // Track form view on mount
  React.useEffect(() => {
    trackNewsletter.formView(placement)
  }, [placement])

  const validateEmail = (value: string): string | null => {
    const result = subscribeSchema.shape.email.safeParse(value)
    if (!result.success) {
      return result.error.errors[0]?.message || "Invalid email"
    }
    return null
  }

  const handleEmailChange = (value: string) => {
    setEmail(value)
    // Clear validation error when user starts typing
    if (validationError) {
      setValidationError("")
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Client-side validation
    const error = validateEmail(email)
    if (error) {
      setValidationError(error)
      setStatus("error")
      return
    }

    setValidationError("")
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
          firstName: firstName || undefined,
          persona: persona || undefined,
        }),
      })

      if (!response.ok) throw new Error("Subscription failed")

      // Track successful subscription
      trackNewsletter.subscribe(placement, leadMagnet?.title)

      setStatus("success")
      toast.success(
        leadMagnet ? "Check your inbox!" : "Successfully subscribed!",
        { description: leadMagnet ? `${leadMagnet.title} is on its way.` : "Check your inbox to confirm." }
      )
      setMessage(
        leadMagnet
          ? `Check your inbox for ${leadMagnet.title}!`
          : "Thanks for subscribing! Check your inbox to confirm."
      )

      // Store email for survey and show survey modal
      setSubscribedEmail(email)
      setShowSurvey(true)

      // Reset form
      setEmail("")
      setFirstName("")
      setPersona("")

      // Reset after 5 seconds (but keep survey open)
      setTimeout(() => {
        setStatus("idle")
        setMessage("")
      }, 5000)
    } catch {
      trackNewsletter.error(placement, "subscription_failed")
      setStatus("error")
      setMessage("Something went wrong. Please try again.")
      toast.error("Subscription failed", { description: "Please try again later." })

      setTimeout(() => {
        setStatus("idle")
        setMessage("")
      }, 3000)
    }
  }

  // Hero variant - large, prominent CTA
  if (variant === "hero") {
    return (
      <>
        <div
          className={cn(
            "rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent p-8 sm:p-10",
            className
          )}
        >
          {leadMagnet && (
            <div className="mb-6 flex items-center gap-3">
              <div className="flex size-12 items-center justify-center rounded-xl bg-primary/20">
                <Gift className="size-6 text-primary" aria-hidden="true" />
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

          <form
            onSubmit={handleSubmit}
            className="mt-6 space-y-4"
            aria-busy={status === "loading"}
          >
            {/* Extended fields (name + persona) */}
            {showExtendedFields && (
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label htmlFor={firstNameInputId} className="sr-only">
                    First name (optional)
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
                    <Input
                      id={firstNameInputId}
                      type="text"
                      placeholder="First name (optional)"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      disabled={status === "loading" || status === "success"}
                      className="h-12 pl-10 text-base"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor={personaSelectId} className="sr-only">
                    What best describes you? (optional)
                  </Label>
                  <select
                    id={personaSelectId}
                    value={persona}
                    onChange={(e) => setPersona(e.target.value as PersonaId | "")}
                    disabled={status === "loading" || status === "success"}
                    className={cn(
                      "flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                      "disabled:cursor-not-allowed disabled:opacity-50",
                      !persona && "text-muted-foreground"
                    )}
                  >
                    <option value="">What best describes you?</option>
                    {VALID_PERSONAS.map((p) => (
                      <option key={p} value={p}>
                        {PERSONA_LABELS[p]}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            {/* Email + Submit row */}
            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="flex-1">
                <label htmlFor={emailInputId} className="sr-only">
                  Email address
                </label>
                <Input
                  id={emailInputId}
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => handleEmailChange(e.target.value)}
                  disabled={status === "loading" || status === "success"}
                  aria-invalid={!!validationError || status === "error"}
                  aria-describedby={validationError || message ? messageId : undefined}
                  className={cn(
                    "h-12 text-base",
                    validationError && "border-destructive focus-visible:ring-destructive"
                  )}
                />
              </div>
              <Button
                type="submit"
                size="lg"
                disabled={status === "loading" || status === "success"}
                className="h-12 px-8 font-medium"
              >
                {status === "loading" ? (
                  <Loader2 className="size-5 animate-spin" aria-hidden="true" />
                ) : status === "success" ? (
                  <>
                    <CheckCircle className="mr-2 size-5" aria-hidden="true" />
                    Subscribed
                  </>
                ) : (
                  <>
                    {leadMagnet ? "Get Free Access" : "Subscribe"}
                    <ArrowRight className="ml-2 size-4" aria-hidden="true" />
                  </>
                )}
              </Button>
            </div>
          </form>

          {message && (
            <p
              id={messageId}
              role={status === "error" ? "alert" : "status"}
              aria-live="polite"
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

        {/* Post-subscribe survey modal */}
        <PostSubscribeSurvey
          open={showSurvey}
          onOpenChange={setShowSurvey}
          email={subscribedEmail}
        />
      </>
    )
  }

  // Inline variant - single line, minimal
  if (variant === "inline") {
    return (
      <>
        <form
          onSubmit={handleSubmit}
          className={cn("flex gap-2", className)}
          aria-busy={status === "loading"}
        >
          <div className="flex-1">
            <label htmlFor={emailInputId} className="sr-only">
              Email address
            </label>
            <Input
              id={emailInputId}
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => handleEmailChange(e.target.value)}
              required
              disabled={status === "loading" || status === "success"}
              aria-invalid={status === "error"}
            />
          </div>
          <Button
            type="submit"
            disabled={status === "loading" || status === "success"}
            size="sm"
          >
            {status === "loading" ? (
              <Loader2 className="size-4 animate-spin" aria-hidden="true" />
            ) : status === "success" ? (
              <CheckCircle className="size-4" aria-hidden="true" />
            ) : (
              "Subscribe"
            )}
          </Button>
        </form>

        {/* Post-subscribe survey modal */}
        <PostSubscribeSurvey
          open={showSurvey}
          onOpenChange={setShowSurvey}
          email={subscribedEmail}
        />
      </>
    )
  }

  // Minimal variant
  if (variant === "minimal") {
    return (
      <>
        <div className={cn("space-y-3", className)}>
          <form
            onSubmit={handleSubmit}
            className="flex gap-3"
            aria-busy={status === "loading"}
          >
            <div className="flex-1">
              <label htmlFor={emailInputId} className="sr-only">
                Email address
              </label>
              <Input
                id={emailInputId}
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => handleEmailChange(e.target.value)}
                required
                disabled={status === "loading" || status === "success"}
                aria-invalid={status === "error"}
                aria-describedby={message ? messageId : undefined}
              />
            </div>
            <Button
              type="submit"
              disabled={status === "loading" || status === "success"}
              className="font-medium"
            >
              {status === "loading" ? (
                <Loader2 className="size-4 animate-spin" aria-hidden="true" />
              ) : status === "success" ? (
                <CheckCircle className="size-4" aria-hidden="true" />
              ) : (
                "Subscribe"
              )}
            </Button>
          </form>
          {message && (
            <p
              id={messageId}
              role={status === "error" ? "alert" : "status"}
              aria-live="polite"
              className={cn(
                "text-sm",
                status === "success" ? "text-primary" : "text-destructive"
              )}
            >
              {message}
            </p>
          )}
        </div>

        {/* Post-subscribe survey modal */}
        <PostSubscribeSurvey
          open={showSurvey}
          onOpenChange={setShowSurvey}
          email={subscribedEmail}
        />
      </>
    )
  }

  // Default variant - card style
  return (
    <>
      <div
        className={cn(
          "rounded-xl border border-border bg-card p-6 card-interactive",
          className
        )}
      >
        <div className="flex items-start gap-4">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-primary/10">
            <Mail className="size-5 text-primary" aria-hidden="true" />
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

        <form
          onSubmit={handleSubmit}
          className="mt-5 flex gap-3"
          aria-busy={status === "loading"}
        >
          <div className="flex-1">
            <label htmlFor={emailInputId} className="sr-only">
              Email address
            </label>
            <Input
              id={emailInputId}
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => handleEmailChange(e.target.value)}
              required
              disabled={status === "loading" || status === "success"}
              aria-invalid={status === "error"}
              aria-describedby={message ? messageId : undefined}
            />
          </div>
          <Button
            type="submit"
            disabled={status === "loading" || status === "success"}
            className="font-medium"
          >
            {status === "loading" ? (
              <Loader2 className="size-4 animate-spin" aria-hidden="true" />
            ) : status === "success" ? (
              <CheckCircle className="size-4" aria-hidden="true" />
            ) : (
              "Subscribe"
            )}
          </Button>
        </form>

        {message && (
          <p
            id={messageId}
            role={status === "error" ? "alert" : "status"}
            aria-live="polite"
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

      {/* Post-subscribe survey modal */}
      <PostSubscribeSurvey
        open={showSurvey}
        onOpenChange={setShowSurvey}
        email={subscribedEmail}
      />
    </>
  )
}

// Re-export types for convenience
export type { PersonaId }
