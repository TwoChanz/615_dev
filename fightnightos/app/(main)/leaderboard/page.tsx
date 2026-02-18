/**
 * Leaderboard Page
 *
 * Will be built in Phase 4 to show:
 * - Group leaderboard (prediction accuracy within a crew)
 * - Public leaderboard (top predictors across all users)
 * - Dynamic titles and badges
 * - Configurable reset periods (per event, monthly, all-time)
 */
import { Trophy } from "lucide-react"

export const metadata = {
  title: "Leaderboard",
}

export default function LeaderboardPage() {
  return (
    <div className="container mx-auto px-4 pt-12">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <Trophy className="h-7 w-7 text-[var(--accent)]" />
          <h1 className="text-2xl font-bold">Leaderboard</h1>
        </div>
        <p className="text-[var(--muted-foreground)]">
          See who&apos;s calling fights and who&apos;s picking with their eyes closed
        </p>
      </div>

      <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-8 text-center">
        <p className="text-[var(--muted-foreground)]">
          Leaderboards coming soon — Phase 4
        </p>
      </div>
    </div>
  )
}
