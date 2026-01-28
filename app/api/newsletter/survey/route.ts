import { NextResponse } from "next/server"

import {
  surveySchema,
  getSafeErrorMessage,
  isAllowedOrigin,
} from "@/lib/validation"
import { updateSubscriberChallenge } from "@/lib/supabase"

// CORS headers helper
function getCorsHeaders(request: Request): HeadersInit {
  const origin = request.headers.get("origin")
  const headers: HeadersInit = {
    "Access-Control-Allow-Methods": "POST, OPTIONS",
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
    const result = surveySchema.safeParse(rawBody)
    if (!result.success) {
      return NextResponse.json(
        { error: getSafeErrorMessage(result.error) },
        { status: 400, headers: corsHeaders }
      )
    }

    // Extract validated data
    const { email, challenge } = result.data

    // Log for development
    console.log("[Survey] Challenge update:", {
      email,
      challenge,
      timestamp: new Date().toISOString(),
    })

    // Update in Supabase
    const dbResult = await updateSubscriberChallenge(email, challenge)

    if (!dbResult.success) {
      console.error("[Survey] Database error:", dbResult.error)
      return NextResponse.json(
        { error: "Failed to save survey response" },
        { status: 500, headers: corsHeaders }
      )
    }

    return NextResponse.json(
      {
        success: true,
        message: "Survey response saved",
      },
      { headers: corsHeaders }
    )
  } catch (error) {
    console.error("[Survey] Error:", error)
    return NextResponse.json(
      { error: "Failed to process survey" },
      { status: 500, headers: corsHeaders }
    )
  }
}
