/**
 * Supabase Server Client
 *
 * Use this in:
 *   - Server Components (the default in Next.js App Router)
 *   - API Routes (app/api/...)
 *   - Server Actions
 *
 * This uses the service role key which BYPASSES Row Level Security.
 * Only use this on the server — never expose the service role key to the browser.
 *
 * USAGE:
 *   import { createServerSupabase } from "@/lib/supabase-server"
 *   const supabase = createServerSupabase()
 *   const { data } = await supabase.from("events").select("*")
 */
import { createClient } from "@supabase/supabase-js"

export function createServerSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
}
