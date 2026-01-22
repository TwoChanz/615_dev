"use client"

import posthog from "posthog-js"
import { PostHogProvider as PHProvider } from "posthog-js/react"
import { useEffect } from "react"
import { usePathname, useSearchParams } from "next/navigation"

// Initialize PostHog only if configured
const isPostHogConfigured = !!(
  typeof window !== "undefined" &&
  process.env.NEXT_PUBLIC_POSTHOG_KEY &&
  process.env.NEXT_PUBLIC_POSTHOG_KEY !== "phc_XXXXXXXXXXXX"
)

if (isPostHogConfigured && typeof window !== "undefined") {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://app.posthog.com",
    person_profiles: "identified_only",
    capture_pageview: false, // We handle this manually
    capture_pageleave: true,
    autocapture: {
      dom_event_allowlist: ["click", "submit"],
      url_allowlist: [".*six1five\\.dev.*"],
    },
    // Respect Do Not Track
    respect_dnt: true,
    // Disable in development by default
    loaded: (posthog) => {
      if (process.env.NODE_ENV === "development") {
        posthog.debug()
      }
    },
  })
}

function PageViewTracker() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (!isPostHogConfigured) return

    // Track page view
    const url = pathname + (searchParams.toString() ? `?${searchParams.toString()}` : "")
    posthog.capture("$pageview", {
      $current_url: url,
    })
  }, [pathname, searchParams])

  return null
}

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  // Don't wrap if PostHog is not configured
  if (!isPostHogConfigured) {
    return <>{children}</>
  }

  return (
    <PHProvider client={posthog}>
      <PageViewTracker />
      {children}
    </PHProvider>
  )
}

// Export posthog instance for manual tracking
export { posthog }

// Helper function to track events
export function trackEvent(
  eventName: string,
  properties?: Record<string, unknown>
) {
  if (!isPostHogConfigured) {
    if (process.env.NODE_ENV === "development") {
      console.log("[PostHog] Event (not sent - not configured):", eventName, properties)
    }
    return
  }
  posthog.capture(eventName, properties)
}

// Helper to identify users
export function identifyUser(
  userId: string,
  properties?: Record<string, unknown>
) {
  if (!isPostHogConfigured) return
  posthog.identify(userId, properties)
}

// Helper to reset user (on logout)
export function resetUser() {
  if (!isPostHogConfigured) return
  posthog.reset()
}
