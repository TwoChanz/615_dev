import type { Metadata } from "next"
import { Suspense } from "react"
import { Wrench, Rocket, Code2, Sparkles, Users, Zap } from "lucide-react"

import { ToolCard } from "@/components/tool-card"
import { ToolsFilter } from "@/components/tools-filter"
import { getAllTools, getToolsByStatus } from "@/lib/tools"

// DEV ONLY: Artificial delay to test loading animations (remove for production)
const DEV_LOADING_DELAY = process.env.NODE_ENV === "development" ? 3000 : 0

async function devDelay() {
  if (DEV_LOADING_DELAY > 0) {
    await new Promise((resolve) => setTimeout(resolve, DEV_LOADING_DELAY))
  }
}

export const metadata: Metadata = {
  title: "Tools",
  description:
    "Real products we've built and shipped. Explore SubSense, AppPilot, FlightWindow and more tools designed to solve real problems.",
  openGraph: {
    title: "Tools | Six1Five Devs",
    description: "Real products we've built and shipped. Explore tools designed to solve real problems.",
  },
}

export default async function ToolsPage() {
  await devDelay()
  const allTools = getAllTools()
  const liveTools = getToolsByStatus("live")
  const betaTools = getToolsByStatus("beta")
  const alphaTools = getToolsByStatus("alpha")
  const comingSoonTools = getToolsByStatus("coming-soon")

  // Calculate stats
  const totalUsers = "10K+" // Replace with real metrics
  const activeTools = liveTools.length + betaTools.length + alphaTools.length

  return (
    <div className="flex flex-col">
      {/* Hero Section with Gradient Background */}
      <section className="relative overflow-hidden border-b border-border">
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-primary/5" />

        {/* Dual glow effects */}
        <div className="absolute left-1/4 top-0 -z-10 -translate-x-1/2 -translate-y-1/2 size-[500px] rounded-full bg-primary/10 blur-[100px]" />
        <div className="absolute right-1/4 top-1/3 -z-10 translate-x-1/2 size-[400px] rounded-full bg-secondary/10 blur-[80px]" />

        <div className="container-page relative py-16 sm:py-20 lg:py-24">
          <div className="mx-auto max-w-3xl text-center">
            {/* Animated Icon */}
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="absolute inset-0 animate-pulse rounded-2xl bg-gradient-to-br from-primary/30 to-secondary/30 blur-xl" />
                <div className="relative flex size-20 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 border border-primary/20">
                  <Wrench className="size-10 text-primary" />
                </div>
              </div>
            </div>

            {/* Title with gradient */}
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Tools We&apos;ve{" "}
              <span className="text-gradient">Built</span>
            </h1>

            <p className="mt-6 text-lg text-muted-foreground text-pretty sm:text-xl">
              Real products solving real problems. Each tool started as a personal
              need and evolved into something others could use too.
            </p>

            {/* Stats Bar */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-8 sm:gap-12">
              <StatItem
                icon={<Rocket className="size-5" />}
                value={allTools.length.toString()}
                label="Tools Built"
              />
              <StatItem
                icon={<Zap className="size-5" />}
                value={activeTools.toString()}
                label="Active"
              />
              <StatItem
                icon={<Users className="size-5" />}
                value={totalUsers}
                label="Users Served"
              />
              <StatItem
                icon={<Code2 className="size-5" />}
                value="100%"
                label="Open Build Logs"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Search & Filter Section */}
      <section className="border-b border-border bg-muted/30">
        <div className="container-page py-6">
          <Suspense fallback={<div className="h-12 animate-pulse rounded-lg bg-muted" />}>
            <ToolsFilter tools={allTools} />
          </Suspense>
        </div>
      </section>

      {/* Tools Grid Section */}
      <section className="container-page py-12 lg:py-16">
        {/* Live Tools */}
        {liveTools.length > 0 && (
          <ToolSection
            title="Live"
            description="Production-ready tools you can use today."
            tools={liveTools}
            badgeColor="bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/30"
            icon={<Sparkles className="size-5 text-green-500" />}
          />
        )}

        {/* Beta Tools */}
        {betaTools.length > 0 && (
          <ToolSection
            title="Beta"
            description="Nearly ready. Try them out and help shape the final product."
            tools={betaTools}
            badgeColor="bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/30"
            icon={<Zap className="size-5 text-yellow-500" />}
            className="mt-16"
          />
        )}

        {/* Alpha Tools */}
        {alphaTools.length > 0 && (
          <ToolSection
            title="Alpha"
            description="Early access. Expect rough edges and rapid iteration."
            tools={alphaTools}
            badgeColor="bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/30"
            icon={<Code2 className="size-5 text-purple-500" />}
            className="mt-16"
          />
        )}

        {/* Coming Soon */}
        {comingSoonTools.length > 0 && (
          <ToolSection
            title="Coming Soon"
            description="Currently in development. Follow along in the build logs."
            tools={comingSoonTools}
            badgeColor="bg-muted text-muted-foreground border-border"
            icon={<Rocket className="size-5 text-muted-foreground" />}
            className="mt-16"
          />
        )}
      </section>
    </div>
  )
}

function StatItem({ icon, value, label }: { icon: React.ReactNode; value: string; label: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
        {icon}
      </div>
      <div className="text-left">
        <div className="text-2xl font-bold text-foreground">{value}</div>
        <div className="text-sm text-muted-foreground">{label}</div>
      </div>
    </div>
  )
}

function ToolSection({
  title,
  description,
  tools,
  badgeColor,
  icon,
  className = "",
}: {
  title: string
  description: string
  tools: ReturnType<typeof getToolsByStatus>
  badgeColor: string
  icon: React.ReactNode
  className?: string
}) {
  return (
    <div className={className}>
      <div className="flex items-center gap-3">
        <div className="flex size-10 items-center justify-center rounded-lg bg-muted">
          {icon}
        </div>
        <div>
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-bold">{title}</h2>
            <span className={`rounded-full border px-3 py-1 text-sm font-medium ${badgeColor}`}>
              {tools.length} {tools.length === 1 ? "tool" : "tools"}
            </span>
          </div>
          <p className="mt-1 text-muted-foreground">{description}</p>
        </div>
      </div>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {tools.map((tool) => (
          <ToolCard key={tool.slug} tool={tool} />
        ))}
      </div>
    </div>
  )
}
