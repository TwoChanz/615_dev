import { NextResponse } from "next/server"
import { Resend } from "resend"

import {
  contactFormSchema,
  getSafeErrorMessage,
  isAllowedOrigin,
} from "@/lib/validation"
import { addContactSubmission } from "@/lib/supabase"
import ContactNotification from "@/emails/contact-notification"

// Initialize Resend if API key is available
const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null

// Admin email to receive notifications
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "hello@six1five.dev"

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
    const result = contactFormSchema.safeParse(rawBody)
    if (!result.success) {
      return NextResponse.json(
        { error: getSafeErrorMessage(result.error) },
        { status: 400, headers: corsHeaders }
      )
    }

    const { name, email, subject, message } = result.data
    const submittedAt = new Date().toISOString()

    // Log for development
    console.log("[Contact] New submission:", {
      name,
      email,
      subject,
      timestamp: submittedAt,
    })

    // Store in Supabase
    const dbResult = await addContactSubmission({
      name,
      email,
      subject,
      message,
    })

    if (!dbResult.success) {
      console.error("[Contact] Database error:", dbResult.error)
      // Continue even if DB fails - we can still send email
    }

    // Send notification email to admin
    if (resend) {
      try {
        await resend.emails.send({
          from: "Six1Five Devs <noreply@six1five.dev>",
          to: ADMIN_EMAIL,
          replyTo: email,
          subject: `[Contact] ${subject || "New message"} from ${name}`,
          react: ContactNotification({
            name,
            email,
            subject,
            message,
            submittedAt,
          }),
        })
        console.log("[Contact] Notification email sent")
      } catch (emailError) {
        console.error("[Contact] Email error:", emailError)
        // Don't fail the request if email fails
      }
    } else {
      console.log("[Contact] Resend not configured, skipping email")
    }

    return NextResponse.json(
      {
        success: true,
        message: "Message sent successfully",
      },
      { headers: corsHeaders }
    )
  } catch (error) {
    console.error("[Contact] Submission error:", error)
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500, headers: corsHeaders }
    )
  }
}
