"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface LaptopMockupProps {
  /** Content to display on the laptop screen */
  children: React.ReactNode
  /** Additional CSS classes for the container */
  className?: string
  /** Screen background color (default: dark) */
  screenBg?: "dark" | "light" | "gradient"
  /** Scale factor (default: 1) */
  scale?: number
}

/**
 * Premium Laptop Mockup Component
 *
 * Displays content inside a realistic laptop frame.
 * Perfect for showcasing loading states, demos, or previews.
 *
 * Usage:
 * ```tsx
 * <LaptopMockup>
 *   <LogoLoader size={64} />
 * </LaptopMockup>
 * ```
 */
export function LaptopMockup({
  children,
  className,
  screenBg = "dark",
  scale = 1,
}: LaptopMockupProps) {
  const screenBgClass = {
    dark: "bg-zinc-950",
    light: "bg-zinc-100",
    gradient: "bg-gradient-to-br from-zinc-900 via-zinc-950 to-black",
  }[screenBg]

  return (
    <div
      className={cn("inline-flex flex-col items-center", className)}
      style={{ transform: `scale(${scale})`, transformOrigin: "center" }}
    >
      {/* Laptop Screen */}
      <div className="relative">
        {/* Screen bezel */}
        <div className="relative rounded-t-xl bg-zinc-800 p-2 pb-3 shadow-2xl">
          {/* Camera notch */}
          <div className="absolute top-1 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
            <div className="size-1.5 rounded-full bg-zinc-600" />
            <div className="size-2 rounded-full bg-zinc-700 ring-1 ring-zinc-600" />
            <div className="size-1.5 rounded-full bg-zinc-600" />
          </div>

          {/* Screen */}
          <div
            className={cn(
              "relative w-[480px] h-[300px] rounded-sm overflow-hidden",
              "flex items-center justify-center",
              screenBgClass
            )}
          >
            {/* Subtle screen reflection */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] via-transparent to-transparent pointer-events-none" />

            {/* Content */}
            <div className="relative z-10">
              {children}
            </div>

            {/* Screen edge highlight */}
            <div className="absolute inset-0 rounded-sm ring-1 ring-inset ring-white/5 pointer-events-none" />
          </div>
        </div>

        {/* Screen shadow */}
        <div className="absolute -bottom-2 left-4 right-4 h-4 bg-black/20 blur-md rounded-full" />
      </div>

      {/* Laptop Base */}
      <div className="relative">
        {/* Hinge */}
        <div className="relative h-3 w-[500px] bg-gradient-to-b from-zinc-700 via-zinc-600 to-zinc-700 rounded-b-sm">
          {/* Hinge highlight */}
          <div className="absolute inset-x-0 top-0 h-px bg-zinc-500/50" />
        </div>

        {/* Base/Keyboard area */}
        <div className="relative h-4 w-[520px] -mt-0.5">
          {/* Base shape */}
          <div
            className="absolute inset-0 bg-gradient-to-b from-zinc-700 to-zinc-800 rounded-b-xl"
            style={{
              clipPath: "polygon(2% 0%, 98% 0%, 100% 100%, 0% 100%)",
            }}
          />

          {/* Trackpad notch hint */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-20 h-1 bg-zinc-600/50 rounded-t-sm" />

          {/* Base edge highlight */}
          <div
            className="absolute inset-0 rounded-b-xl ring-1 ring-inset ring-white/5"
            style={{
              clipPath: "polygon(2% 0%, 98% 0%, 100% 100%, 0% 100%)",
            }}
          />
        </div>

        {/* Base shadow */}
        <div className="absolute -bottom-3 left-8 right-8 h-6 bg-black/30 blur-xl rounded-full" />
      </div>
    </div>
  )
}

/**
 * Minimal Phone Mockup Component
 */
interface PhoneMockupProps {
  children: React.ReactNode
  className?: string
  screenBg?: "dark" | "light" | "gradient"
}

export function PhoneMockup({
  children,
  className,
  screenBg = "dark",
}: PhoneMockupProps) {
  const screenBgClass = {
    dark: "bg-zinc-950",
    light: "bg-zinc-100",
    gradient: "bg-gradient-to-br from-zinc-900 via-zinc-950 to-black",
  }[screenBg]

  return (
    <div className={cn("inline-flex flex-col items-center", className)}>
      {/* Phone frame */}
      <div className="relative rounded-[2.5rem] bg-zinc-800 p-2 shadow-2xl">
        {/* Dynamic Island */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-20 h-6 bg-black rounded-full z-20" />

        {/* Screen */}
        <div
          className={cn(
            "relative w-[200px] h-[420px] rounded-[2rem] overflow-hidden",
            "flex items-center justify-center",
            screenBgClass
          )}
        >
          {/* Content */}
          <div className="relative z-10">
            {children}
          </div>

          {/* Screen edge */}
          <div className="absolute inset-0 rounded-[2rem] ring-1 ring-inset ring-white/5 pointer-events-none" />
        </div>

        {/* Side buttons hint */}
        <div className="absolute -right-0.5 top-24 w-0.5 h-8 bg-zinc-700 rounded-r" />
        <div className="absolute -right-0.5 top-36 w-0.5 h-12 bg-zinc-700 rounded-r" />
        <div className="absolute -left-0.5 top-28 w-0.5 h-6 bg-zinc-700 rounded-l" />
      </div>

      {/* Shadow */}
      <div className="mt-4 w-24 h-4 bg-black/20 blur-xl rounded-full" />
    </div>
  )
}
