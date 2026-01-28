import { NextResponse } from "next/server"

import {
  profileUpdateSchema,
  getSafeErrorMessage,
  isAllowedOrigin,
} from "@/lib/validation"
import { updateSubscriberProfile } from "@/lib/supabase"
import { decodeProfileToken, isTokenExpired } from "@/lib/profile-token"

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

// Map question types to database fields
const QUESTION_TO_FIELD: Record<string, "tech_stack" | "monthly_spend" | "team_size"> = {
  stack: "tech_stack",
  spend: "monthly_spend",
  team: "team_size",
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
    const result = profileUpdateSchema.safeParse(rawBody)
    if (!result.success) {
      return NextResponse.json(
        { error: getSafeErrorMessage(result.error) },
        { status: 400, headers: corsHeaders }
      )
    }

    // Extract validated data
    const { token, question, answer } = result.data

    // Decode and validate token
    const decoded = decodeProfileToken(token)
    if (!decoded) {
      return NextResponse.json(
        { error: "Invalid or corrupted token" },
        { status: 400, headers: corsHeaders }
      )
    }

    // Check if token is expired (30 days)
    if (isTokenExpired(decoded.timestamp, 30)) {
      return NextResponse.json(
        { error: "This link has expired" },
        { status: 410, headers: corsHeaders }
      )
    }

    const email = decoded.email
    const field = QUESTION_TO_FIELD[question]

    if (!field) {
      return NextResponse.json(
        { error: "Invalid question type" },
        { status: 400, headers: corsHeaders }
      )
    }

    // Log for development
    console.log("[Profile] Update:", {
      email,
      question,
      field,
      answer,
      timestamp: new Date().toISOString(),
    })

    // Update in Supabase
    const dbResult = await updateSubscriberProfile(email, field, answer)

    if (!dbResult.success) {
      console.error("[Profile] Database error:", dbResult.error)
      return NextResponse.json(
        { error: "Failed to save profile" },
        { status: 500, headers: corsHeaders }
      )
    }

    return NextResponse.json(
      {
        success: true,
        message: "Profile updated",
      },
      { headers: corsHeaders }
    )
  } catch (error) {
    console.error("[Profile] Error:", error)
    return NextResponse.json(
      { error: "Failed to update profile" },
      { status: 500, headers: corsHeaders }
    )
  }
}
