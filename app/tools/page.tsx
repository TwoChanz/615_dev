import type { Metadata } from "next"
import { Wrench } from "lucide-react"

import { ToolCard } from "@/components/tool-card"
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
    "Real products I've built and shipped. Explore SubSense, AppPilot, FlightWindow and more tools designed to solve real problems.",
  openGraph: {
    title: "Tools | Six1Five Devs",
    description: "Real products I've built and shipped. Explore tools designed to solve real problems.",
  },
}

export default async function ToolsPage() {
  await devDelay()
  const allTools = getAllTools()
  const liveTools = getToolsByStatus("live")
  const betaTools = getToolsByStatus("beta")
  const alphaTools = getToolsByStatus("alpha")
  const comingSoonTools = getToolsByStatus("coming-soon")

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
      {/* Header */}
      <div className="mx-auto max-w-2xl text-center">
        <div className="flex justify-center">
          <div className="flex size-16 items-center justify-center rounded-2xl bg-primary/10">
            <Wrench className="size-8 text-primary" />
          </div>
        </div>
        <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl">
          Tools I&apos;ve Built
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Real products solving real problems. Each tool started as a personal
          need and evolved into something others could use too.
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          {allTools.length} tools &middot; {liveTools.length} live &middot;{" "}
          {betaTools.length + alphaTools.length} in development
        </p>
      </div>

      {/* Live Tools */}
      {liveTools.length > 0 && (
        <section className="mt-16">
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-bold">Live</h2>
            <span className="rounded-full bg-green-500/10 px-3 py-1 text-sm font-medium text-green-600 dark:text-green-400">
              {liveTools.length} {liveTools.length === 1 ? "tool" : "tools"}
            </span>
          </div>
          <p className="mt-2 text-muted-foreground">
            Production-ready tools you can use today.
          </p>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {liveTools.map((tool) => (
              <ToolCard key={tool.slug} tool={tool} />
            ))}
          </div>
        </section>
      )}

      {/* Beta Tools */}
      {betaTools.length > 0 && (
        <section className="mt-16">
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-bold">Beta</h2>
            <span className="rounded-full bg-yellow-500/10 px-3 py-1 text-sm font-medium text-yellow-600 dark:text-yellow-400">
              {betaTools.length} {betaTools.length === 1 ? "tool" : "tools"}
            </span>
          </div>
          <p className="mt-2 text-muted-foreground">
            Nearly ready. Try them out and help shape the final product.
          </p>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {betaTools.map((tool) => (
              <ToolCard key={tool.slug} tool={tool} />
            ))}
          </div>
        </section>
      )}

      {/* Alpha Tools */}
      {alphaTools.length > 0 && (
        <section className="mt-16">
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-bold">Alpha</h2>
            <span className="rounded-full bg-purple-500/10 px-3 py-1 text-sm font-medium text-purple-600 dark:text-purple-400">
              {alphaTools.length} {alphaTools.length === 1 ? "tool" : "tools"}
            </span>
          </div>
          <p className="mt-2 text-muted-foreground">
            Early access. Expect rough edges and rapid iteration.
          </p>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {alphaTools.map((tool) => (
              <ToolCard key={tool.slug} tool={tool} />
            ))}
          </div>
        </section>
      )}

      {/* Coming Soon */}
      {comingSoonTools.length > 0 && (
        <section className="mt-16">
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-bold">Coming Soon</h2>
            <span className="rounded-full bg-muted px-3 py-1 text-sm font-medium text-muted-foreground">
              {comingSoonTools.length} in progress
            </span>
          </div>
          <p className="mt-2 text-muted-foreground">
            Currently in development. Follow along in the build logs.
          </p>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {comingSoonTools.map((tool) => (
              <ToolCard key={tool.slug} tool={tool} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
