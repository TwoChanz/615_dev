import { NextResponse } from "next/server"
import { PostHog } from "posthog-node"

import {
  trackEventSchema,
  trackBatchSchema,
  getSafeErrorMessage,
  isAllowedOrigin,
} from "@/lib/validation"

// Initialize PostHog server-side client
const posthog = process.env.POSTHOG_API_KEY
  ? new PostHog(process.env.POSTHOG_API_KEY, {
      host: process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://app.posthog.com",
      flushAt: 1, // Flush immediately for real-time tracking
      flushInterval: 0,
    })
  : null

// CORS headers helper
function getCorsHeaders(request: Request): HeadersInit {
  const origin = request.headers.get("origin")
  const headers: HeadersInit = {
    "Access-Control-Allow-Methods": "POST, PUT, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
  }

  if (origin && isAllowedOrigin(origin)) {
    headers["Access-Control-Allow-Origin"] = origin
  }

  return headers
}

// Handle preflight requests
export async function OPTIONS(request: Request) {
  return new NextResponse(null, {
    status: 204,
    headers: getCorsHeaders(request),
  })
}

export async function POST(request: Request) {
  const corsHeaders = getCorsHeaders(request)

  try {
    // Parse JSON body safely
    let rawBody: unknown
    try {
      rawBody = await request.json()
    } catch {
      return NextResponse.json(
        { error: "Invalid JSON body" },
        { status: 400, headers: corsHeaders }
      )
    }

    // Validate with Zod schema
    const result = trackEventSchema.safeParse(rawBody)
    if (!result.success) {
      return NextResponse.json(
        { error: getSafeErrorMessage(result.error) },
        { status: 400, headers: corsHeaders }
      )
    }

    // Extract validated data (safe - explicitly pick fields to prevent prototype pollution)
    const { name, category, properties } = result.data

    // Build enriched event with explicitly picked fields
    const enrichedProperties = {
      ...(properties || {}),
      category,
      serverTimestamp: new Date().toISOString(),
    }

    // Log for development
    if (process.env.NODE_ENV === "development") {
      console.log("[Analytics Server]", name, enrichedProperties)
    }

    // Forward to PostHog
    if (posthog) {
      const distinctId = (properties?.sessionId as string) ||
                         (properties?.userId as string) ||
                         "anonymous"

      posthog.capture({
        distinctId,
        event: name,
        properties: enrichedProperties,
      })

      // Don't await shutdown - let it flush in background
      // PostHog client handles batching
    } else if (process.env.NODE_ENV === "development") {
      console.log("[Analytics] PostHog not configured, event not forwarded")
    }

    return NextResponse.json({ success: true }, { headers: corsHeaders })
  } catch (error) {
    console.error("[Analytics] Track error:", error)
    return NextResponse.json(
      { error: "Failed to track event" },
      { status: 500, headers: corsHeaders }
    )
  }
}

// Batch tracking endpoint for multiple events
export async function PUT(request: Request) {
  const corsHeaders = getCorsHeaders(request)

  try {
    // Parse JSON body safely
    let rawBody: unknown
    try {
      rawBody = await request.json()
    } catch {
      return NextResponse.json(
        { error: "Invalid JSON body" },
        { status: 400, headers: corsHeaders }
      )
    }

    // Validate with Zod schema (enforces max 50 events)
    const result = trackBatchSchema.safeParse(rawBody)
    if (!result.success) {
      return NextResponse.json(
        { error: getSafeErrorMessage(result.error) },
        { status: 400, headers: corsHeaders }
      )
    }

    const { events } = result.data

    // Log batch for development
    if (process.env.NODE_ENV === "development") {
      console.log("[Analytics Server] Batch:", events.length, "events")
    }

    // Forward batch to PostHog
    if (posthog) {
      for (const event of events) {
        const distinctId = (event.properties?.sessionId as string) ||
                           (event.properties?.userId as string) ||
                           "anonymous"

        posthog.capture({
          distinctId,
          event: event.name,
          properties: {
            ...(event.properties || {}),
            category: event.category,
            serverTimestamp: new Date().toISOString(),
          },
        })
      }
    }

    return NextResponse.json(
      {
        success: true,
        processed: events.length,
      },
      { headers: corsHeaders }
    )
  } catch (error) {
    console.error("[Analytics] Batch track error:", error)
    return NextResponse.json(
      { error: "Failed to track events" },
      { status: 500, headers: corsHeaders }
    )
  }
}
