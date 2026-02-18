/**
 * Groups Page
 *
 * Will be built in Phase 3 to show:
 * - User's groups list
 * - Create group button
 * - Group detail view with members
 * - Shareable invite links
 */
import { UsersRound } from "lucide-react"

export const metadata = {
  title: "Groups",
}

export default function GroupsPage() {
  return (
    <div className="container mx-auto px-4 pt-12">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <UsersRound className="h-7 w-7 text-[var(--primary)]" />
          <h1 className="text-2xl font-bold">Your Groups</h1>
        </div>
        <p className="text-[var(--muted-foreground)]">
          Create a crew and share the invite link
        </p>
      </div>

      <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-8 text-center">
        <p className="text-[var(--muted-foreground)]">
          Friend groups coming soon — Phase 3
        </p>
      </div>
    </div>
  )
}
