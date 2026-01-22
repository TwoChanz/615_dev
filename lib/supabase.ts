import { createClient } from "@supabase/supabase-js"

// Database types
export interface Subscriber {
  id: string
  email: string
  source: string | null
  lead_magnet: string | null
  placement: string | null
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
