import { createClient } from "@supabase/supabase-js"

// Database types
export interface Subscriber {
  id: string
  email: string
  source: string | null
  lead_magnet: string | null
  placement: string | null
  first_name: string | null
  persona: string | null
  challenge: string | null
  tech_stack: string | null
  monthly_spend: string | null
  team_size: string | null
  profile_completed_at: string | null
  subscribed_at: string
}

export interface ContactSubmission {
  id: string
  name: string
  email: string
  subject: string | null
  message: string
  submitted_at: string
}

// Create Supabase client for server-side operations
export function createServerSupabaseClient() {
  const supabaseUrl = process.env.SUPABASE_URL
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error("Missing Supabase environment variables")
  }

  return createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })
}

// Helper to check if Supabase is configured
export function isSupabaseConfigured(): boolean {
  return !!(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY)
}

// Subscriber operations
export async function addSubscriber(data: {
  email: string
  source?: string
  leadMagnet?: string
  placement?: string
  firstName?: string
  persona?: string
}): Promise<{ success: boolean; error?: string }> {
  if (!isSupabaseConfigured()) {
    console.log("[Supabase] Not configured, skipping database insert")
    return { success: true }
  }

  try {
    const supabase = createServerSupabaseClient()
    const { error } = await supabase.from("subscribers").upsert(
      {
        email: data.email,
        source: data.source || null,
        lead_magnet: data.leadMagnet || null,
        placement: data.placement || null,
        first_name: data.firstName || null,
        persona: data.persona || null,
      },
      {
        onConflict: "email",
        ignoreDuplicates: false,
      }
    )

    if (error) {
      console.error("[Supabase] Error adding subscriber:", error)
      return { success: false, error: error.message }
    }

    return { success: true }
  } catch (error) {
    console.error("[Supabase] Unexpected error:", error)
    return { success: false, error: "Database error" }
  }
}

// Update subscriber challenge (post-subscribe survey)
export async function updateSubscriberChallenge(
  email: string,
  challenge: string
): Promise<{ success: boolean; error?: string }> {
  if (!isSupabaseConfigured()) {
    console.log("[Supabase] Not configured, skipping database update")
    return { success: true }
  }

  try {
    const supabase = createServerSupabaseClient()
    const { error } = await supabase
      .from("subscribers")
      .update({ challenge })
      .eq("email", email)

    if (error) {
      console.error("[Supabase] Error updating challenge:", error)
      return { success: false, error: error.message }
    }

    return { success: true }
  } catch (error) {
    console.error("[Supabase] Unexpected error:", error)
    return { success: false, error: "Database error" }
  }
}

// Update subscriber profile (progressive profiling)
export async function updateSubscriberProfile(
  email: string,
  field: "tech_stack" | "monthly_spend" | "team_size",
  value: string
): Promise<{ success: boolean; error?: string }> {
  if (!isSupabaseConfigured()) {
    console.log("[Supabase] Not configured, skipping database update")
    return { success: true }
  }

  try {
    const supabase = createServerSupabaseClient()

    // Update the specific field
    const { error: updateError } = await supabase
      .from("subscribers")
      .update({ [field]: value })
      .eq("email", email)

    if (updateError) {
      console.error("[Supabase] Error updating profile:", updateError)
      return { success: false, error: updateError.message }
    }

    // Check if all profile fields are now filled
    const { data, error: selectError } = await supabase
      .from("subscribers")
      .select("tech_stack, monthly_spend, team_size, profile_completed_at")
      .eq("email", email)
      .single()

    if (selectError) {
      console.error("[Supabase] Error checking profile completion:", selectError)
      return { success: true } // Still return success for the update
    }

    // Mark profile as completed if all fields are filled
    if (
      data?.tech_stack &&
      data?.monthly_spend &&
      data?.team_size &&
      !data?.profile_completed_at
    ) {
      await supabase
        .from("subscribers")
        .update({ profile_completed_at: new Date().toISOString() })
        .eq("email", email)
      console.log("[Supabase] Profile marked as completed for:", email)
    }

    return { success: true }
  } catch (error) {
    console.error("[Supabase] Unexpected error:", error)
    return { success: false, error: "Database error" }
  }
}

// Get subscriber by email (for profile pages)
export async function getSubscriberByEmail(
  email: string
): Promise<{ success: boolean; data?: Subscriber; error?: string }> {
  if (!isSupabaseConfigured()) {
    console.log("[Supabase] Not configured")
    return { success: false, error: "Database not configured" }
  }

  try {
    const supabase = createServerSupabaseClient()
    const { data, error } = await supabase
      .from("subscribers")
      .select("*")
      .eq("email", email)
      .single()

    if (error) {
      console.error("[Supabase] Error fetching subscriber:", error)
      return { success: false, error: error.message }
    }

    return { success: true, data: data as Subscriber }
  } catch (error) {
    console.error("[Supabase] Unexpected error:", error)
    return { success: false, error: "Database error" }
  }
}

// Contact submission operations
export async function addContactSubmission(data: {
  name: string
  email: string
  subject?: string
  message: string
}): Promise<{ success: boolean; error?: string }> {
  if (!isSupabaseConfigured()) {
    console.log("[Supabase] Not configured, skipping database insert")
    return { success: true }
  }

  try {
    const supabase = createServerSupabaseClient()
    const { error } = await supabase.from("contact_submissions").insert({
      name: data.name,
      email: data.email,
      subject: data.subject || null,
      message: data.message,
    })

    if (error) {
      console.error("[Supabase] Error adding contact submission:", error)
      return { success: false, error: error.message }
    }

    return { success: true }
  } catch (error) {
    console.error("[Supabase] Unexpected error:", error)
    return { success: false, error: "Database error" }
  }
}
