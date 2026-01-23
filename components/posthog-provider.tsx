"use client"

import posthog from "posthog-js"
import { PostHogProvider as PHProvider } from "posthog-js/react"
import { useEffect, useState } from "react"
import { usePathname, useSearchParams } from "next/navigation"

// Check if PostHog should be configured (client-side only)
const shouldConfigurePostHog = () =>
  typeof window !== "undefined" &&
  process.env.NEXT_PUBLIC_POSTHOG_KEY &&
  process.env.NEXT_PUBLIC_POSTHOG_KEY !== "phc_XXXXXXXXXXXX"

let posthogInitialized = false

function initPostHog() {
  if (posthogInitialized || !shouldConfigurePostHog()) return false

  try {
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
    posthogInitialized = true
    return true
  } catch (error) {
    console.warn("[PostHog] Failed to initialize:", error)
    return false
  }
}

function PageViewTracker() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (!posthogInitialized) return

    // Track page view
    const url = pathname + (searchParams.toString() ? `?${searchParams.toString()}` : "")
    posthog.capture("$pageview", {
      $current_url: url,
    })
  }, [pathname, searchParams])

  return null
}

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    const initialized = initPostHog()
    setIsReady(initialized)
  }, [])

  // Don't wrap if PostHog is not configured or failed to initialize
  if (!isReady) {
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
  if (!posthogInitialized) {
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
  if (!posthogInitialized) return
  posthog.identify(userId, properties)
}

// Helper to reset user (on logout)
export function resetUser() {
  if (!posthogInitialized) return
  posthog.reset()
}
