import { NextResponse } from "next/server"
import { Resend } from "resend"

import {
  subscribeSchema,
  getSafeErrorMessage,
  isAllowedOrigin,
} from "@/lib/validation"
import { addSubscriber } from "@/lib/supabase"
import { generateDownloadToken } from "@/lib/download-token"
import WelcomeEmail from "@/emails/welcome"

// Initialize Resend if API key is available
const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null

// Base URL for download links
const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://six1five.dev"

// Lead magnet display names
const leadMagnetNames: Record<string, string> = {
  "saas-checklist": "SaaS Launch Checklist",
  "tech-stack-guide": "Tech Stack Guide 2026",
  "automation-starter": "Automation Workflows Starter Kit",
}

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
    const result = subscribeSchema.safeParse(rawBody)
    if (!result.success) {
      return NextResponse.json(
        { error: getSafeErrorMessage(result.error) },
        { status: 400, headers: corsHeaders }
      )
    }

    // Extract validated data (safe - no prototype pollution)
    const { email, source, leadMagnet, placement, firstName, persona } = result.data

    // Log for development
    console.log("[Newsletter] New subscriber:", {
      email,
      firstName,
      persona,
      source,
      leadMagnet,
      placement,
      timestamp: new Date().toISOString(),
    })

    // Store in Supabase
    const dbResult = await addSubscriber({
      email,
      source,
      leadMagnet,
      placement,
      firstName,
      persona,
    })

    if (!dbResult.success) {
      console.error("[Newsletter] Database error:", dbResult.error)
      // Continue even if DB fails - we can still send email
    }

    // Generate secure download URL with token if lead magnet requested
    let downloadUrl: string | undefined
    if (leadMagnet) {
      const token = generateDownloadToken(email, leadMagnet)
      downloadUrl = `${BASE_URL}/api/downloads/${leadMagnet}?token=${token}`
      console.log("[Newsletter] Delivering lead magnet:", leadMagnet)
    }

    // Send welcome email via Resend
    if (resend) {
      try {
        // Add contact to Resend audience (if configured)
        if (process.env.RESEND_AUDIENCE_ID) {
          await resend.contacts.create({
            email,
            firstName: firstName || undefined,
            audienceId: process.env.RESEND_AUDIENCE_ID,
            unsubscribed: false,
          })
          console.log("[Newsletter] Contact added to Resend audience")
        }

        // Send welcome email
        await resend.emails.send({
          from: "Six1Five Devs <hello@six1five.dev>",
          to: email,
          subject: leadMagnet
            ? `Your ${leadMagnetNames[leadMagnet] || leadMagnet} is ready!`
            : "Welcome to Six1Five Devs!",
          react: WelcomeEmail({
            email,
            firstName: firstName || undefined,
            leadMagnet: leadMagnet ? leadMagnetNames[leadMagnet] : undefined,
            downloadUrl,
          }),
        })
        console.log("[Newsletter] Welcome email sent")
      } catch (emailError) {
        console.error("[Newsletter] Email error:", emailError)
        // Don't fail the request if email fails
      }
    } else {
      console.log("[Newsletter] Resend not configured, skipping email")
    }

    return NextResponse.json(
      {
        success: true,
        message: leadMagnet
          ? "Check your email for the download link!"
          : "Successfully subscribed",
        downloadUrl,
      },
      { headers: corsHeaders }
    )
  } catch (error) {
    console.error("[Newsletter] Subscription error:", error)
    return NextResponse.json(
      { error: "Failed to subscribe" },
      { status: 500, headers: corsHeaders }
    )
  }
}
