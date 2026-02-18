/**
 * Landing Page — the first thing users see before signing in
 *
 * This page is PUBLIC (no auth required) and serves as the marketing
 * page that convinces people to sign up. It explains what FightNight OS
 * does and has a clear call-to-action to sign up.
 *
 * Mobile-first design — looks great on phones since that's the primary device.
 */
import Link from "next/link"
import { CalendarDays, Users, Trophy, Bell, Share2, Swords } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* ── HERO SECTION ── */}
      <section className="relative overflow-hidden px-4 pt-16 pb-20 text-center">
        {/* Subtle gradient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--primary)]/10 to-transparent" />

        <div className="relative mx-auto max-w-lg">
          {/* App icon / logo area */}
          <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-[var(--primary)]/20">
            <Swords className="h-8 w-8 text-[var(--primary)]" />
          </div>

          <h1 className="mb-4 text-4xl font-bold tracking-tight">
            <span className="text-gradient-fire">FightNight OS</span>
          </h1>

          <p className="mb-2 text-xl font-medium text-[var(--foreground)]">
            Track fights. Follow favorites. Run the night.
          </p>

          <p className="mb-8 text-[var(--muted-foreground)]">
            The fan command center for your UFC crew. Predictions, leaderboards,
            and watch party coordination — all in one place.
          </p>

          {/* Primary CTA */}
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/auth/sign-up"
              className="inline-flex items-center justify-center rounded-xl bg-[var(--primary)] px-8 py-3 text-base font-semibold text-[var(--primary-foreground)] transition-all hover:opacity-90 active:scale-[0.98]"
            >
              Get Started — It&apos;s Free
            </Link>
            <Link
              href="/auth/sign-in"
              className="inline-flex items-center justify-center rounded-xl border border-[var(--border)] px-8 py-3 text-base font-semibold transition-all hover:bg-[var(--secondary)]"
            >
              Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* ── FEATURES GRID ── */}
      <section className="px-4 pb-20">
        <div className="mx-auto max-w-lg">
          <h2 className="mb-8 text-center text-lg font-semibold text-[var(--muted-foreground)]">
            Everything your crew needs for fight night
          </h2>

          <div className="grid gap-4">
            <FeatureCard
              icon={<CalendarDays className="h-5 w-5" />}
              title="Live Event Tracking"
              description="Countdowns, card lineups, and reminders for every UFC event."
            />
            <FeatureCard
              icon={<Users className="h-5 w-5" />}
              title="Friend Groups"
              description="Create a crew, share an invite link, and keep your group engaged between events."
            />
            <FeatureCard
              icon={<Swords className="h-5 w-5" />}
              title="Prediction Polls"
              description="Pick winners before each fight. Underdogs are worth more. See who really knows MMA."
            />
            <FeatureCard
              icon={<Trophy className="h-5 w-5" />}
              title="Leaderboards & Titles"
              description="Earn titles like 'The Oracle' or get roasted as 'Picking With Their Eyes Closed.'"
            />
            <FeatureCard
              icon={<Bell className="h-5 w-5" />}
              title="Post-Fight Recaps"
              description="Instant results, score updates, and shareable recap cards after every fight."
            />
            <FeatureCard
              icon={<Share2 className="h-5 w-5" />}
              title="Watch Party Coordination"
              description="'Who's in this weekend?' One tap to rally the crew for every card."
            />
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-[var(--border)] px-4 py-8 text-center text-sm text-[var(--muted-foreground)]">
        <p>FightNight OS — Built by Six1Five Devs</p>
      </footer>
    </div>
  )
}

/**
 * Feature Card — reusable card for the features grid.
 * Each card highlights one core feature of the app.
 */
function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode
  title: string
  description: string
}) {
  return (
    <div className="flex gap-4 rounded-xl border border-[var(--border)] bg-[var(--card)] p-4 transition-colors hover:border-[var(--primary)]/30">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--primary)]/15 text-[var(--primary)]">
        {icon}
      </div>
      <div>
        <h3 className="mb-1 font-semibold">{title}</h3>
        <p className="text-sm text-[var(--muted-foreground)]">{description}</p>
      </div>
    </div>
  )
}
