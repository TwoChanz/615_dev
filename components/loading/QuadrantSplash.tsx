"use client"

import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"

interface QuadrantSplashProps {
  className?: string
  onComplete?: () => void
  imageSrc?: string
}

export function QuadrantSplash({
  className,
  onComplete,
  imageSrc = "/og-image-square.png",
}: QuadrantSplashProps) {
  const [phase, setPhase] = useState<"grid" | "tiles" | "glow" | "complete">("grid")

  useEffect(() => {
    const timers: NodeJS.Timeout[] = []

    // Phase 1: Grid lines draw (0-300ms)
    // Phase 2: Tiles reveal (300-800ms)
    timers.push(setTimeout(() => setPhase("tiles"), 300))

    // Phase 3: Glow lock (800-1100ms)
    timers.push(setTimeout(() => setPhase("glow"), 800))

    // Phase 4: Complete (1100ms)
    timers.push(
      setTimeout(() => {
        setPhase("complete")
        onComplete?.()
      }, 1100)
    )

    return () => timers.forEach(clearTimeout)
  }, [onComplete])

  return (
    <div
      className={cn(
        "relative flex items-center justify-center",
        className
      )}
      role="status"
      aria-label="Loading"
    >
      {/* Container for the quadrant animation */}
      <div className="relative w-24 h-24 sm:w-32 sm:h-32">
        {/* Grid lines */}
        <div
          className={cn(
            "absolute inset-0 quadrant-grid",
            phase === "grid" && "animate-grid-draw"
          )}
        >
          {/* Vertical line */}
          <div
            className={cn(
              "absolute left-1/2 top-0 w-px h-full -translate-x-1/2 bg-gradient-to-b from-cyan-400/0 via-cyan-400/60 to-cyan-400/0",
              "origin-top scale-y-0",
              phase !== "grid" && "scale-y-100 transition-transform duration-300 ease-out"
            )}
          />
          {/* Horizontal line */}
          <div
            className={cn(
              "absolute top-1/2 left-0 h-px w-full -translate-y-1/2 bg-gradient-to-r from-purple-500/0 via-purple-500/60 to-purple-500/0",
              "origin-left scale-x-0",
              phase !== "grid" && "scale-x-100 transition-transform duration-300 ease-out"
            )}
          />
        </div>

        {/* Quadrant tiles - reveal in sequence: 6 → 1 → tristar → 5 */}
        <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 gap-0.5">
          {/* Top-left: 6 */}
          <div
            className={cn(
              "flex items-center justify-center text-2xl sm:text-3xl font-bold text-gradient opacity-0",
              phase === "tiles" && "animate-tile-reveal-1",
              (phase === "glow" || phase === "complete") && "opacity-100"
            )}
          >
            6
          </div>

          {/* Top-right: 1 */}
          <div
            className={cn(
              "flex items-center justify-center text-2xl sm:text-3xl font-bold text-gradient opacity-0",
              phase === "tiles" && "animate-tile-reveal-2",
              (phase === "glow" || phase === "complete") && "opacity-100"
            )}
          >
            1
          </div>

          {/* Bottom-left: Tristar (Tennessee symbol) */}
          <div
            className={cn(
              "flex items-center justify-center opacity-0",
              phase === "tiles" && "animate-tile-reveal-3",
              (phase === "glow" || phase === "complete") && "opacity-100"
            )}
          >
            <svg
              viewBox="0 0 24 24"
              className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-400"
              fill="currentColor"
            >
              {/* Three stars in triangle formation */}
              <polygon points="12,2 13.5,7 18,7 14.5,10 16,15 12,12 8,15 9.5,10 6,7 10.5,7" />
            </svg>
          </div>

          {/* Bottom-right: 5 */}
          <div
            className={cn(
              "flex items-center justify-center text-2xl sm:text-3xl font-bold text-gradient opacity-0",
              phase === "tiles" && "animate-tile-reveal-4",
              (phase === "glow" || phase === "complete") && "opacity-100"
            )}
          >
            5
          </div>
        </div>

        {/* Glow lock effect */}
        <div
          className={cn(
            "absolute inset-0 rounded-lg opacity-0 transition-opacity duration-300",
            "bg-gradient-to-br from-cyan-400/20 via-transparent to-purple-500/20",
            "shadow-[0_0_30px_rgba(34,211,238,0.3),0_0_60px_rgba(139,92,246,0.2)]",
            phase === "glow" && "opacity-100 animate-glow-pulse",
            phase === "complete" && "opacity-60"
          )}
        />

        {/* Optional: Show actual badge image after animation */}
        {imageSrc && phase === "complete" && (
          <div className="absolute inset-0 flex items-center justify-center animate-fade-in">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={imageSrc}
              alt="615 Badge"
              className="w-full h-full object-contain opacity-0"
            />
          </div>
        )}
      </div>
    </div>
  )
}
