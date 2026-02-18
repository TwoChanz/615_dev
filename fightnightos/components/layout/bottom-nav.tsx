/**
 * Bottom Navigation Bar
 *
 * The primary navigation for mobile users. Fixed to the bottom of the
 * screen, always visible. Each tab maps to a main section of the app.
 *
 * WHY BOTTOM NAV?
 * On phones, the bottom of the screen is the easiest area to reach with
 * your thumb. Top navigation bars require stretching, which is uncomfortable
 * on large phones. Every major mobile app uses bottom tabs for this reason.
 *
 * This is a CLIENT component because it needs:
 * - usePathname() to highlight the active tab
 * - onClick handlers for navigation
 */
"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  CalendarDays,   // Events icon
  Users,          // Fighters icon
  UsersRound,     // Groups icon
  Trophy,         // Leaderboard icon
  User,           // Profile icon
} from "lucide-react"
import { cn } from "@/lib/utils"

/**
 * Each tab in the bottom nav. The `href` determines where it links,
 * and the `icon` is the visual representation.
 */
const tabs = [
  { label: "Events", href: "/events", icon: CalendarDays },
  { label: "Fighters", href: "/fighters", icon: Users },
  { label: "Groups", href: "/groups", icon: UsersRound },
  { label: "Board", href: "/leaderboard", icon: Trophy },
  { label: "Profile", href: "/profile", icon: User },
] as const

export function BottomNav() {
  // usePathname() returns the current URL path (e.g., "/events")
  // We use it to highlight whichever tab matches the current page
  const pathname = usePathname()

  return (
    <nav
      className={cn(
        "fixed bottom-0 left-0 right-0 z-50",
        "border-t border-[var(--border)] bg-[var(--background)]/95 backdrop-blur-md",
        "safe-bottom"
      )}
    >
      <div className="flex items-center justify-around px-2 py-1">
        {tabs.map((tab) => {
          // Check if this tab is the active one
          const isActive = pathname.startsWith(tab.href)
          const Icon = tab.icon

          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={cn(
                "flex flex-col items-center gap-0.5 px-3 py-2 text-xs transition-colors",
                isActive
                  ? "text-[var(--primary)]"           // Red when active
                  : "text-[var(--muted-foreground)]"   // Gray when inactive
              )}
            >
              <Icon
                className={cn(
                  "h-5 w-5",
                  isActive && "drop-shadow-[0_0_6px_var(--primary)]"  // Subtle glow on active
                )}
              />
              <span className="font-medium">{tab.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
