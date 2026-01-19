import { NextResponse } from "next/server"

// Newsletter subscription endpoint
// Replace with your actual email service (Resend, Loops, ConvertKit, etc.)

interface SubscribeRequest {
  email: string
  source?: string
  leadMagnet?: string
}

export async function POST(request: Request) {
  try {
    const body: SubscribeRequest = await request.json()
    const { email, source, leadMagnet } = body

    // Validate email
    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "Valid email is required" },
        { status: 400 }
      )
    }

    // TODO: Replace with actual email service integration
    // Example with Resend:
    // const resend = new Resend(process.env.RESEND_API_KEY)
    // await resend.contacts.create({
    //   email,
    //   audienceId: process.env.RESEND_AUDIENCE_ID,
    //   unsubscribed: false,
    // })

    // Example with Loops:
    // await fetch("https://app.loops.so/api/v1/contacts/create", {
    //   method: "POST",
    //   headers: {
    //     "Authorization": `Bearer ${process.env.LOOPS_API_KEY}`,
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     email,
    //     source: source || "website",
    //     userGroup: leadMagnet || "general",
    //   }),
    // })

    // Log for development
    console.log("[Newsletter] New subscriber:", {
      email,
      source,
      leadMagnet,
      timestamp: new Date().toISOString(),
    })

    // If lead magnet, trigger delivery
    if (leadMagnet) {
      // TODO: Send lead magnet email
      console.log("[Newsletter] Delivering lead magnet:", leadMagnet)
    }

    return NextResponse.json({
      success: true,
      message: "Successfully subscribed",
    })
  } catch (error) {
    console.error("[Newsletter] Subscription error:", error)
    return NextResponse.json(
      { error: "Failed to subscribe" },
      { status: 500 }
    )
  }
}
