/**
 * Supabase Browser Client
 *
 * Use this in client-side React components (anything with "use client").
 * This client respects Row Level Security (RLS) policies — it can only
 * access data that the current user is allowed to see.
 *
 * USAGE:
 *   import { supabase } from "@/lib/supabase-browser"
 *   const { data } = await supabase.from("events").select("*")
 */
import { createBrowserClient } from "@supabase/ssr"

export const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)
