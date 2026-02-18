/**
 * Fighters Page
 *
 * Will be built in Phase 2 to show:
 * - Fighter search and browse
 * - Fighter profiles with stats
 * - Favorites system (follow/unfollow)
 * - Fighter comparison view
 */
import { Users } from "lucide-react"

export const metadata = {
  title: "Fighters",
}

export default function FightersPage() {
  return (
    <div className="container mx-auto px-4 pt-12">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <Users className="h-7 w-7 text-[var(--primary)]" />
          <h1 className="text-2xl font-bold">Fighters</h1>
        </div>
        <p className="text-[var(--muted-foreground)]">
          Browse fighters, follow favorites, compare stats
        </p>
      </div>

      <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-8 text-center">
        <p className="text-[var(--muted-foreground)]">
          Fighter profiles coming soon — Phase 2
        </p>
      </div>
    </div>
  )
}
