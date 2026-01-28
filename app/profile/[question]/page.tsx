"use client"

import * as React from "react"
import { useParams, useSearchParams, useRouter } from "next/navigation"
import { CheckCircle, Loader2, AlertCircle, Code2, DollarSign, Users } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

// Question configurations
const QUESTION_CONFIG = {
  stack: {
    title: "What's your primary tech stack?",
    description: "Help us send you relevant content and recommendations.",
    icon: Code2,
    options: [
      { value: "nextjs-react", label: "Next.js / React" },
      { value: "vue-nuxt", label: "Vue / Nuxt" },
      { value: "svelte", label: "Svelte / SvelteKit" },
      { value: "node-express", label: "Node.js / Express" },
      { value: "python-django", label: "Python / Django / FastAPI" },
      { value: "ruby-rails", label: "Ruby on Rails" },
      { value: "go", label: "Go" },
      { value: "rust", label: "Rust" },
      { value: "other", label: "Other" },
    ],
  },
  spend: {
    title: "What's your monthly tool spend?",
    description: "We'll recommend tools that fit your budget.",
    icon: DollarSign,
    options: [
      { value: "0-50", label: "$0 - $50/mo" },
      { value: "50-200", label: "$50 - $200/mo" },
      { value: "200-500", label: "$200 - $500/mo" },
      { value: "500-1000", label: "$500 - $1,000/mo" },
      { value: "1000+", label: "$1,000+/mo" },
    ],
  },
  team: {
    title: "What's your team size?",
    description: "We'll tailor recommendations for your situation.",
    icon: Users,
    options: [
      { value: "solo", label: "Solo / Just me" },
      { value: "2-5", label: "Small team (2-5)" },
      { value: "6-20", label: "Growing team (6-20)" },
      { value: "20-50", label: "Mid-size (20-50)" },
      { value: "50+", label: "Large (50+)" },
    ],
  },
} as const

type QuestionType = keyof typeof QUESTION_CONFIG

function isValidQuestion(question: string): question is QuestionType {
  return question in QUESTION_CONFIG
}

export default function ProfileQuestionPage() {
  const params = useParams()
  const searchParams = useSearchParams()
  const router = useRouter()

  const question = params.question as string
  const token = searchParams.get("token")

  const [selectedAnswer, setSelectedAnswer] = React.useState<string | null>(null)
  const [status, setStatus] = React.useState<"idle" | "loading" | "success" | "error" | "invalid">("idle")
  const [errorMessage, setErrorMessage] = React.useState("")

  // Validate question type
  const isValid = isValidQuestion(question)
  const config = isValid ? QUESTION_CONFIG[question] : null

  // Check for missing token
  React.useEffect(() => {
    if (!token) {
      setStatus("invalid")
      setErrorMessage("Missing authentication token. Please use the link from your email.")
    }
  }, [token])

  const handleSubmit = async () => {
    if (!selectedAnswer || !token || !isValid) return

    setStatus("loading")

    try {
      const response = await fetch("/api/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token,
          question,
          answer: selectedAnswer,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to save response")
      }

      setStatus("success")
    } catch (error) {
      setStatus("error")
      setErrorMessage(error instanceof Error ? error.message : "Something went wrong")
    }
  }

  // Invalid question type
  if (!isValid) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center">
          <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-destructive/10">
            <AlertCircle className="size-8 text-destructive" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">Invalid Question</h1>
          <p className="mt-2 text-muted-foreground">
            This profile question doesn&apos;t exist. Please check the link from your email.
          </p>
          <Button
            onClick={() => router.push("/")}
            variant="outline"
            className="mt-6"
          >
            Go to Homepage
          </Button>
        </div>
      </div>
    )
  }

  // Missing/invalid token
  if (status === "invalid") {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center">
          <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-destructive/10">
            <AlertCircle className="size-8 text-destructive" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">Invalid Link</h1>
          <p className="mt-2 text-muted-foreground">{errorMessage}</p>
          <Button
            onClick={() => router.push("/")}
            variant="outline"
            className="mt-6"
          >
            Go to Homepage
          </Button>
        </div>
      </div>
    )
  }

  // Success state
  if (status === "success") {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center">
          <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-primary/10">
            <CheckCircle className="size-8 text-primary" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">Thanks!</h1>
          <p className="mt-2 text-muted-foreground">
            Your response has been saved. We&apos;ll use this to send you more relevant content.
          </p>
          <Button
            onClick={() => router.push("/")}
            className="mt-6"
          >
            Visit Six1Five Devs
          </Button>
        </div>
      </div>
    )
  }

  // Error state
  if (status === "error") {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center">
          <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-destructive/10">
            <AlertCircle className="size-8 text-destructive" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">Something went wrong</h1>
          <p className="mt-2 text-muted-foreground">{errorMessage}</p>
          <div className="mt-6 flex gap-3 justify-center">
            <Button
              onClick={() => {
                setStatus("idle")
                setErrorMessage("")
              }}
              variant="outline"
            >
              Try Again
            </Button>
            <Button onClick={() => router.push("/")}>
              Go to Homepage
            </Button>
          </div>
        </div>
      </div>
    )
  }

  // Main form - config is guaranteed to be non-null here due to isValid early return above
  const validConfig = config!
  const Icon = validConfig.icon

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background via-background to-primary/5">
      <div className="max-w-lg w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-xl bg-primary/10">
            <Icon className="size-7 text-primary" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">{validConfig.title}</h1>
          <p className="mt-2 text-muted-foreground">{validConfig.description}</p>
        </div>

        {/* Options */}
        <div className="space-y-2">
          {validConfig.options.map((option) => (
            <button
              key={option.value}
              onClick={() => setSelectedAnswer(option.value)}
              disabled={status === "loading"}
              className={cn(
                "w-full rounded-lg border p-4 text-left transition-all",
                "hover:border-primary/50 hover:bg-primary/5",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                "disabled:cursor-not-allowed disabled:opacity-50",
                selectedAnswer === option.value && "border-primary bg-primary/10"
              )}
            >
              <span
                className={cn(
                  "font-medium",
                  selectedAnswer === option.value ? "text-primary" : "text-foreground"
                )}
              >
                {option.label}
              </span>
            </button>
          ))}
        </div>

        {/* Submit */}
        <Button
          onClick={handleSubmit}
          disabled={!selectedAnswer || status === "loading"}
          className="w-full mt-6 h-12"
          size="lg"
        >
          {status === "loading" ? (
            <>
              <Loader2 className="mr-2 size-4 animate-spin" />
              Saving...
            </>
          ) : (
            "Save Response"
          )}
        </Button>

        {/* Skip link */}
        <p className="text-center mt-4">
          <button
            onClick={() => router.push("/")}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Skip for now
          </button>
        </p>

        {/* Branding */}
        <p className="text-center mt-8 text-xs text-muted-foreground">
          Powered by{" "}
          <a href="https://six1five.dev" className="text-primary hover:underline">
            Six1Five Devs
          </a>
        </p>
      </div>
    </div>
  )
}
