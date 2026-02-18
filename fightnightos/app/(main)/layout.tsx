/**
 * Main App Layout — wraps all authenticated pages
 *
 * The "(main)" folder name uses Next.js "route groups":
 * - The parentheses mean this folder does NOT create a URL segment
 * - /events, /fighters, /groups all share this layout
 * - But the URL is /events, NOT /(main)/events
 *
 * This layout adds the bottom navigation bar that appears on every
 * authenticated page. The `pb-20` padding at the bottom prevents
 * page content from being hidden behind the fixed bottom nav bar.
 */
import { BottomNav } from "@/components/layout/bottom-nav"

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen">
      {/* Main content area — pb-20 creates space above the bottom nav */}
      <main className="pb-20">
        {children}
      </main>

      {/* Bottom tab bar — always visible, fixed to screen bottom */}
      <BottomNav />
    </div>
  )
}
