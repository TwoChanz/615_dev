import { NextResponse } from "next/server"

// Server-side analytics tracking endpoint
// This can forward events to your analytics service

interface TrackRequest {
  name: string
  category: string
  properties?: Record<string, string | number | boolean>
}

export async function POST(request: Request) {
  try {
    const body: TrackRequest = await request.json()
    const { name, category, properties = {} } = body

    // Add server-side metadata
    const enrichedEvent = {
      ...body,
      properties: {
        ...properties,
        serverTimestamp: new Date().toISOString(),
      },
    }

    // Log for development
    if (process.env.NODE_ENV === "development") {
      console.log("[Analytics Server]", name, enrichedEvent)
    }

    // TODO: Forward to your analytics service
    // Example with PostHog:
    // await fetch(`${process.env.POSTHOG_HOST}/capture`, {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({
    //     api_key: process.env.POSTHOG_API_KEY,
    //     event: name,
    //     properties: enrichedEvent.properties,
    //     distinct_id: properties.sessionId || "anonymous",
    //   }),
    // })

    // Example with custom webhook:
    // await fetch(process.env.ANALYTICS_WEBHOOK_URL, {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(enrichedEvent),
    // })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[Analytics] Track error:", error)
    return NextResponse.json(
      { error: "Failed to track event" },
      { status: 500 }
    )
  }
}

// Batch tracking endpoint for multiple events
export async function PUT(request: Request) {
  try {
    const { events }: { events: TrackRequest[] } = await request.json()

    if (!Array.isArray(events)) {
      return NextResponse.json(
        { error: "Events must be an array" },
        { status: 400 }
      )
    }

    // Log batch for development
    if (process.env.NODE_ENV === "development") {
      console.log("[Analytics Server] Batch:", events.length, "events")
    }

    // TODO: Forward batch to analytics service

    return NextResponse.json({
      success: true,
      processed: events.length,
    })
  } catch (error) {
    console.error("[Analytics] Batch track error:", error)
    return NextResponse.json(
      { error: "Failed to track events" },
      { status: 500 }
    )
  }
}
