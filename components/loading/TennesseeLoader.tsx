"use client"

import { cn } from "@/lib/utils"
import { LogoLoader } from "./LogoLoader"

interface TennesseeLoaderProps {
  className?: string
}

export function TennesseeLoader({ className }: TennesseeLoaderProps) {
  return (
    <div
      className={cn(
        "relative flex items-center justify-center",
        className
      )}
      role="status"
      aria-label="Loading"
    >
      {/* Tennessee outline background - subtle opacity */}
      <div className="absolute inset-0 flex items-center justify-center">
        <svg
          viewBox="0 0 400 200"
          className="w-80 h-40 sm:w-96 sm:h-48 opacity-[0.07] tn-outline-draw"
          fill="none"
          stroke="url(#tn-gradient)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <defs>
            <linearGradient id="tn-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#22d3ee" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </linearGradient>
          </defs>
          {/* Simplified Tennessee state outline path */}
          <path
            d="M 20 60
               L 40 55
               L 60 50
               L 80 48
               L 100 45
               L 120 43
               L 140 42
               L 160 41
               L 180 40
               L 200 39
               L 220 38
               L 240 38
               L 260 39
               L 280 40
               L 300 42
               L 320 45
               L 340 50
               L 360 58
               L 380 70
               L 375 90
               L 365 110
               L 350 125
               L 330 135
               L 300 140
               L 260 143
               L 220 145
               L 180 146
               L 140 145
               L 100 142
               L 60 135
               L 35 120
               L 25 100
               L 20 80
               Z"
            className="tn-path"
          />
          {/* Three stars in the center (Tennessee flag reference) */}
          <g className="tn-stars" opacity="0.5">
            <circle cx="180" cy="90" r="4" fill="url(#tn-gradient)" stroke="none" />
            <circle cx="200" cy="80" r="4" fill="url(#tn-gradient)" stroke="none" />
            <circle cx="220" cy="90" r="4" fill="url(#tn-gradient)" stroke="none" />
          </g>
        </svg>
      </div>

      {/* Logo wordmark on top */}
      <LogoLoader size="lg" className="relative z-10" />
    </div>
  )
}
