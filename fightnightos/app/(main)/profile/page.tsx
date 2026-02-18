/**
 * Profile Page
 *
 * Shows the current user's profile:
 * - Display name and avatar
 * - Current title/badge
 * - Prediction stats (accuracy, total picks, points)
 * - Favorited fighters list
 * - Group memberships
 * - Sign out button
 */
import { User } from "lucide-react"

export const metadata = {
  title: "Profile",
}

export default function ProfilePage() {
  return (
    <div className="container mx-auto px-4 pt-12">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <User className="h-7 w-7 text-[var(--primary)]" />
          <h1 className="text-2xl font-bold">Profile</h1>
        </div>
        <p className="text-[var(--muted-foreground)]">
          Your stats, favorites, and settings
        </p>
      </div>

      <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-8 text-center">
        <p className="text-[var(--muted-foreground)]">
          Profile page coming soon
        </p>
      </div>
    </div>
  )
}
