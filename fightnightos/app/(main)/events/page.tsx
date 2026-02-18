/**
 * Events Dashboard Page
 *
 * This will be built out in Phase 1 to show:
 * - Next 3-5 upcoming UFC events
 * - Live countdown timers
 * - "Remind Me" toggles
 * - "Add to Calendar" buttons
 * - Fight card lineups
 *
 * For now, it's a placeholder showing the page structure.
 */
import { CalendarDays } from "lucide-react"

export const metadata = {
  title: "Events",
}

export default function EventsPage() {
  return (
    <div className="container mx-auto px-4 pt-12">
      {/* Page header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <CalendarDays className="h-7 w-7 text-[var(--primary)]" />
          <h1 className="text-2xl font-bold">Upcoming Events</h1>
        </div>
        <p className="text-[var(--muted-foreground)]">
          Next fight cards with countdowns and lineups
        </p>
      </div>

      {/* Placeholder — replaced with real event cards in Phase 1 */}
      <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-8 text-center">
        <p className="text-[var(--muted-foreground)]">
          Events dashboard coming soon — Phase 1
        </p>
      </div>
    </div>
  )
}
