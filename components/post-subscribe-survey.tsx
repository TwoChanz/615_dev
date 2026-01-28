"use client"

import * as React from "react"
import { CheckCircle, Loader2, DollarSign, Rocket, FolderKanban, Sparkles, Zap } from "lucide-react"

import { cn } from "@/lib/utils"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { toast } from "sonner"
import { VALID_CHALLENGES, type ChallengeId } from "@/lib/validation"

// Challenge display configuration
const CHALLENGE_CONFIG: Record<
  ChallengeId,
  { label: string; icon: React.ComponentType<{ className?: string }> }
> = {
  "cutting-tool-costs": {
    label: "Cutting tool costs",
    icon: DollarSign,
  },
  "shipping-faster": {
    label: "Shipping faster",
    icon: Rocket,
  },
  "organizing-projects": {
    label: "Organizing projects",
    icon: FolderKanban,
  },
  "learning-ai-workflows": {
    label: "Learning AI workflows",
    icon: Sparkles,
  },
  automation: {
    label: "Automation",
    icon: Zap,
  },
}

interface PostSubscribeSurveyProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  email: string
}

export function PostSubscribeSurvey({
  open,
  onOpenChange,
  email,
}: PostSubscribeSurveyProps) {
  const [selectedChallenge, setSelectedChallenge] = React.useState<ChallengeId | null>(null)
  const [status, setStatus] = React.useState<"idle" | "loading" | "success" | "error">("idle")

  const handleChallengeClick = async (challenge: ChallengeId) => {
    if (status === "loading" || status === "success") return

    setSelectedChallenge(challenge)
    setStatus("loading")

    try {
      const response = await fetch("/api/newsletter/survey", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, challenge }),
      })

      if (!response.ok) throw new Error("Survey submission failed")

      setStatus("success")
      toast.success("Thanks for sharing!", {
        description: "We'll tailor content to help with that.",
      })

      // Close dialog after a brief delay
      setTimeout(() => {
        onOpenChange(false)
        // Reset state after close animation
        setTimeout(() => {
          setSelectedChallenge(null)
          setStatus("idle")
        }, 300)
      }, 1500)
    } catch {
      setStatus("error")
      toast.error("Couldn't save your response", {
        description: "No worries, we'll still send you great content!",
      })

      // Reset after error
      setTimeout(() => {
        setSelectedChallenge(null)
        setStatus("idle")
      }, 2000)
    }
  }

  const handleSkip = () => {
    onOpenChange(false)
    // Reset state after close animation
    setTimeout(() => {
      setSelectedChallenge(null)
      setStatus("idle")
    }, 300)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md" showCloseButton={false}>
        <DialogHeader>
          <DialogTitle className="text-center">
            {status === "success" ? (
              <span className="flex items-center justify-center gap-2 text-primary">
                <CheckCircle className="size-5" />
                Got it!
              </span>
            ) : (
              "One quick question"
            )}
          </DialogTitle>
          <DialogDescription className="text-center">
            {status === "success"
              ? "We'll send you relevant tips and resources."
              : "What's your biggest challenge right now?"}
          </DialogDescription>
        </DialogHeader>

        {status !== "success" && (
          <div className="mt-4 grid gap-2">
            {VALID_CHALLENGES.map((challenge) => {
              const config = CHALLENGE_CONFIG[challenge]
              const Icon = config.icon
              const isSelected = selectedChallenge === challenge
              const isLoading = isSelected && status === "loading"

              return (
                <button
                  key={challenge}
                  onClick={() => handleChallengeClick(challenge)}
                  disabled={status === "loading"}
                  className={cn(
                    "flex items-center gap-3 rounded-lg border p-3 text-left transition-all",
                    "hover:border-primary/50 hover:bg-primary/5",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                    "disabled:cursor-not-allowed disabled:opacity-50",
                    isSelected && "border-primary bg-primary/10"
                  )}
                >
                  <div
                    className={cn(
                      "flex size-9 shrink-0 items-center justify-center rounded-md",
                      isSelected ? "bg-primary/20" : "bg-muted"
                    )}
                  >
                    {isLoading ? (
                      <Loader2 className="size-4 animate-spin text-primary" />
                    ) : (
                      <Icon
                        className={cn(
                          "size-4",
                          isSelected ? "text-primary" : "text-muted-foreground"
                        )}
                      />
                    )}
                  </div>
                  <span
                    className={cn(
                      "text-sm font-medium",
                      isSelected ? "text-primary" : "text-foreground"
                    )}
                  >
                    {config.label}
                  </span>
                </button>
              )
            })}
          </div>
        )}

        {status !== "success" && (
          <button
            onClick={handleSkip}
            disabled={status === "loading"}
            className="mt-2 text-center text-sm text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50"
          >
            Skip for now
          </button>
        )}
      </DialogContent>
    </Dialog>
  )
}
