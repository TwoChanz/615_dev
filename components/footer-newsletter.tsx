"use client"

import { useState } from "react"
import { Send, Loader2, CheckCircle2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function FooterNewsletter() {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [message, setMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email) return

    setStatus("loading")

    try {
      const response = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "footer" }),
      })

      const data = await response.json()

      if (response.ok) {
        setStatus("success")
        setMessage("You're subscribed!")
        setEmail("")
      } else {
        setStatus("error")
        setMessage(data.error || "Something went wrong")
      }
    } catch {
      setStatus("error")
      setMessage("Failed to subscribe. Please try again.")
    }

    // Reset after 3 seconds
    setTimeout(() => {
      setStatus("idle")
      setMessage("")
    }, 3000)
  }

  return (
    <div>
      <h3 className="text-sm font-semibold tracking-wide text-foreground">
        Stay Updated
      </h3>
      <p className="mt-2 text-sm text-muted-foreground">
        Get weekly build logs and early access to new tools.
      </p>

      <form onSubmit={handleSubmit} className="mt-4 space-y-2">
        <div className="flex gap-2">
          <Input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={status === "loading" || status === "success"}
            className="bg-background text-sm"
          />
          <Button
            type="submit"
            size="icon"
            disabled={status === "loading" || status === "success"}
            className="shrink-0"
          >
            {status === "loading" ? (
              <Loader2 className="size-4 animate-spin" />
            ) : status === "success" ? (
              <CheckCircle2 className="size-4" />
            ) : (
              <Send className="size-4" />
            )}
            <span className="sr-only">Subscribe</span>
          </Button>
        </div>

        {message && (
          <p
            className={`text-xs ${
              status === "success" ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
            }`}
          >
            {message}
          </p>
        )}
      </form>

      <p className="mt-3 text-xs text-muted-foreground">
        No spam. Unsubscribe anytime.
      </p>
    </div>
  )
}
