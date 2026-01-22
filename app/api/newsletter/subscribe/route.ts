import { NextResponse } from "next/server"
import {
  subscribeSchema,
  getSafeErrorMessage,
  isAllowedOrigin,
  ALLOWED_ORIGINS,
} from "@/lib/validation"

// Lead magnet download URLs
const leadMagnetUrls: Record<string, string> = {
  "saas-checklist": "/downloads/saas-launch-checklist.pdf",
  "tech-stack-guide": "/downloads/tech-stack-guide-2026.pdf",
  "automation-starter": "/downloads/automation-workflows.zip",
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
    const { email, source, leadMagnet, placement } = result.data

    // TODO: Replace with actual email service integration
    // Example with Resend:
    // const resend = new Resend(process.env.RESEND_API_KEY)
    // await resend.contacts.create({
    //   email,
    //   audienceId: process.env.RESEND_AUDIENCE_ID,
    //   unsubscribed: false,
    // })

    // Log for development (replace with actual analytics in production)
    console.log("[Newsletter] New subscriber:", {
      email,
      source,
      leadMagnet,
      placement,
      timestamp: new Date().toISOString(),
    })

    // If lead magnet, prepare download URL and trigger email delivery
    let downloadUrl: string | undefined
    if (leadMagnet) {
      downloadUrl = leadMagnetUrls[leadMagnet]
      console.log("[Newsletter] Delivering lead magnet:", leadMagnet, downloadUrl)

      // TODO: Send lead magnet email via Resend
      // const resend = new Resend(process.env.RESEND_API_KEY)
      // await resend.emails.send({
      //   from: "Six1Five Devs <hello@six1fivestudio.dev>",
      //   to: email,
      //   subject: `Your ${leadMagnet} is ready!`,
      //   react: LeadMagnetEmail({ leadMagnet, downloadUrl }),
      // })
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
