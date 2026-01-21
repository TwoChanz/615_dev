import { cn } from "@/lib/utils"

interface DevDashIconProps {
  className?: string
  size?: "sm" | "md" | "lg" | "xl"
}

const sizeClasses = {
  sm: "size-8",
  md: "size-12",
  lg: "size-16",
  xl: "size-24",
}

export function DevDashIcon({ className, size = "md" }: DevDashIconProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(sizeClasses[size], className)}
    >
      {/* Background with rounded corners */}
      <rect
        width="64"
        height="64"
        rx="14"
        fill="url(#devdash-bg)"
      />

      {/* Tennessee Tri-Star Circle */}
      <circle cx="20" cy="18" r="10" fill="url(#tristar-bg)" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
      <path
        d="M20 11l1.5 3.5h3.5l-2.8 2.2 1 3.5L20 18l-3.2 2.2 1-3.5-2.8-2.2h3.5L20 11z"
        fill="white"
      />
      <path
        d="M14 16l0.8 1.8h2l-1.5 1.2 0.6 2L14 19.5l-1.9 1.5 0.6-2-1.5-1.2h2L14 16z"
        fill="white"
        transform="scale(0.7) translate(4, 6)"
      />
      <path
        d="M14 16l0.8 1.8h2l-1.5 1.2 0.6 2L14 19.5l-1.9 1.5 0.6-2-1.5-1.2h2L14 16z"
        fill="white"
        transform="scale(0.7) translate(20, 12)"
      />

      {/* City skyline bars (like dashboard metrics) */}
      <rect x="34" y="28" width="6" height="20" rx="1" fill="url(#bar-gradient)" opacity="0.9" />
      <rect x="42" y="22" width="6" height="26" rx="1" fill="url(#bar-gradient)" opacity="0.8" />
      <rect x="50" y="32" width="6" height="16" rx="1" fill="url(#bar-gradient)" opacity="0.7" />

      {/* Batman building silhouette */}
      <path
        d="M24 48V36l4-6v-4l-2-2h-4l-2 2v4l4 6v12z"
        fill="url(#building-gradient)"
        opacity="0.6"
      />

      {/* Progress bar */}
      <rect x="8" y="52" width="48" height="6" rx="3" fill="rgba(255,255,255,0.1)" />
      <rect x="8" y="52" width="28" height="6" rx="3" fill="url(#progress-gradient)" />

      {/* Gradients */}
      <defs>
        <linearGradient id="devdash-bg" x1="0" y1="0" x2="64" y2="64">
          <stop offset="0%" stopColor="#1a1a2e" />
          <stop offset="100%" stopColor="#16162a" />
        </linearGradient>
        <linearGradient id="tristar-bg" x1="10" y1="8" x2="30" y2="28">
          <stop offset="0%" stopColor="#2d2d5a" />
          <stop offset="100%" stopColor="#1a1a3a" />
        </linearGradient>
        <linearGradient id="bar-gradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#22d3ee" />
          <stop offset="100%" stopColor="#7c3aed" />
        </linearGradient>
        <linearGradient id="building-gradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4a4a8a" />
          <stop offset="100%" stopColor="#2a2a5a" />
        </linearGradient>
        <linearGradient id="progress-gradient" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#22d3ee" />
          <stop offset="50%" stopColor="#a5b4fc" />
          <stop offset="100%" stopColor="#7c3aed" />
        </linearGradient>
      </defs>
    </svg>
  )
}
