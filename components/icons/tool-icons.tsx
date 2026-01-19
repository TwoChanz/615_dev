import { cn } from "@/lib/utils"

interface IconProps {
  className?: string
  size?: "sm" | "md" | "lg"
}

const sizeClasses = {
  sm: "size-10",
  md: "size-14",
  lg: "size-20",
}

// SubSense - Subscription tracking with circular refresh/sync motif
export function SubSenseIcon({ className, size = "md" }: IconProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(sizeClasses[size], className)}
    >
      <rect width="64" height="64" rx="14" fill="url(#subsense-bg)" />

      {/* Circular sync arrows */}
      <circle cx="32" cy="32" r="16" stroke="url(#subsense-ring)" strokeWidth="3" strokeDasharray="6 4" opacity="0.4" />
      <path
        d="M32 20a12 12 0 0 1 10.4 6"
        stroke="#22d3ee"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M44 26l-1.6-4 4-1.6"
        stroke="#22d3ee"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M32 44a12 12 0 0 1-10.4-6"
        stroke="#7c3aed"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M20 38l1.6 4-4 1.6"
        stroke="#7c3aed"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Dollar sign center */}
      <text x="32" y="37" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">$</text>

      <defs>
        <linearGradient id="subsense-bg" x1="0" y1="0" x2="64" y2="64">
          <stop offset="0%" stopColor="#1a1a2e" />
          <stop offset="100%" stopColor="#16162a" />
        </linearGradient>
        <linearGradient id="subsense-ring" x1="16" y1="16" x2="48" y2="48">
          <stop offset="0%" stopColor="#22d3ee" />
          <stop offset="100%" stopColor="#7c3aed" />
        </linearGradient>
      </defs>
    </svg>
  )
}

// AppPilot - Rocket/launch with code brackets
export function AppPilotIcon({ className, size = "md" }: IconProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(sizeClasses[size], className)}
    >
      <rect width="64" height="64" rx="14" fill="url(#apppilot-bg)" />

      {/* Rocket body */}
      <path
        d="M32 12c-8 8-12 20-12 28h24c0-8-4-20-12-28z"
        fill="url(#rocket-body)"
        stroke="rgba(255,255,255,0.2)"
        strokeWidth="1"
      />

      {/* Window */}
      <circle cx="32" cy="28" r="5" fill="#1a1a2e" stroke="#22d3ee" strokeWidth="1.5" />
      <circle cx="32" cy="28" r="2" fill="#22d3ee" opacity="0.6" />

      {/* Fins */}
      <path d="M20 40l-4 8h8z" fill="#7c3aed" opacity="0.8" />
      <path d="M44 40l4 8h-8z" fill="#7c3aed" opacity="0.8" />

      {/* Flame */}
      <path
        d="M28 48c0 0 4 8 4 10s-4 2-4 2s4-2 4-2s4 0 4 2s4-10 4-10c-4 4-8 4-12 0z"
        fill="url(#flame-gradient)"
      />

      <defs>
        <linearGradient id="apppilot-bg" x1="0" y1="0" x2="64" y2="64">
          <stop offset="0%" stopColor="#1a1a2e" />
          <stop offset="100%" stopColor="#16162a" />
        </linearGradient>
        <linearGradient id="rocket-body" x1="20" y1="12" x2="44" y2="40">
          <stop offset="0%" stopColor="#e2e8f0" />
          <stop offset="100%" stopColor="#94a3b8" />
        </linearGradient>
        <linearGradient id="flame-gradient" x1="32" y1="48" x2="32" y2="62">
          <stop offset="0%" stopColor="#22d3ee" />
          <stop offset="50%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#ef4444" />
        </linearGradient>
      </defs>
    </svg>
  )
}

// FlightWindow - Airplane with tracking elements
export function FlightWindowIcon({ className, size = "md" }: IconProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(sizeClasses[size], className)}
    >
      <rect width="64" height="64" rx="14" fill="url(#flight-bg)" />

      {/* Flight path arc */}
      <path
        d="M12 44c10-20 30-20 40 0"
        stroke="url(#path-gradient)"
        strokeWidth="2"
        strokeDasharray="4 3"
        fill="none"
        opacity="0.5"
      />

      {/* Airplane */}
      <g transform="translate(28, 24) rotate(-30)">
        <path
          d="M0 8l12-4-12-4v8z"
          fill="#22d3ee"
        />
        <rect x="-8" y="2" width="12" height="4" rx="1" fill="#e2e8f0" />
        <path d="M-8 0l-4 4 4 4v-8z" fill="#7c3aed" />
      </g>

      {/* Location dots */}
      <circle cx="16" cy="44" r="4" fill="#22d3ee" opacity="0.8" />
      <circle cx="48" cy="44" r="4" fill="#7c3aed" opacity="0.8" />
      <circle cx="16" cy="44" r="6" stroke="#22d3ee" strokeWidth="1" opacity="0.4" />
      <circle cx="48" cy="44" r="6" stroke="#7c3aed" strokeWidth="1" opacity="0.4" />

      <defs>
        <linearGradient id="flight-bg" x1="0" y1="0" x2="64" y2="64">
          <stop offset="0%" stopColor="#1a1a2e" />
          <stop offset="100%" stopColor="#16162a" />
        </linearGradient>
        <linearGradient id="path-gradient" x1="12" y1="24" x2="52" y2="44">
          <stop offset="0%" stopColor="#22d3ee" />
          <stop offset="100%" stopColor="#7c3aed" />
        </linearGradient>
      </defs>
    </svg>
  )
}

// DevDash - Nashville-inspired dashboard (more detailed version)
export function DevDashIcon({ className, size = "md" }: IconProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(sizeClasses[size], className)}
    >
      <rect width="64" height="64" rx="14" fill="url(#devdash-bg)" />

      {/* Tennessee Tri-Star */}
      <circle cx="18" cy="18" r="10" fill="url(#tristar-bg)" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
      <g fill="white">
        <polygon points="18,10 19.5,14 24,14 20.5,17 22,21 18,18 14,21 15.5,17 12,14 16.5,14" />
      </g>

      {/* Dashboard bars */}
      <rect x="36" y="30" width="5" height="16" rx="1.5" fill="url(#bar1)" />
      <rect x="44" y="24" width="5" height="22" rx="1.5" fill="url(#bar2)" />
      <rect x="52" y="34" width="5" height="12" rx="1.5" fill="url(#bar3)" />

      {/* Guitar headstock silhouette */}
      <path
        d="M8 52v-16l2-2v-4l6 0v4l2 2v16z"
        fill="rgba(255,255,255,0.1)"
      />
      <circle cx="11" cy="36" r="1" fill="rgba(255,255,255,0.3)" />
      <circle cx="15" cy="36" r="1" fill="rgba(255,255,255,0.3)" />
      <circle cx="11" cy="40" r="1" fill="rgba(255,255,255,0.3)" />
      <circle cx="15" cy="40" r="1" fill="rgba(255,255,255,0.3)" />

      {/* Progress bar */}
      <rect x="22" y="50" width="36" height="5" rx="2.5" fill="rgba(255,255,255,0.1)" />
      <rect x="22" y="50" width="20" height="5" rx="2.5" fill="url(#progress)" />

      <defs>
        <linearGradient id="devdash-bg" x1="0" y1="0" x2="64" y2="64">
          <stop offset="0%" stopColor="#1a1a2e" />
          <stop offset="100%" stopColor="#0f0f1a" />
        </linearGradient>
        <linearGradient id="tristar-bg" x1="8" y1="8" x2="28" y2="28">
          <stop offset="0%" stopColor="#2d2d5a" />
          <stop offset="100%" stopColor="#1a1a3a" />
        </linearGradient>
        <linearGradient id="bar1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#22d3ee" />
          <stop offset="100%" stopColor="#0ea5e9" />
        </linearGradient>
        <linearGradient id="bar2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#a5b4fc" />
          <stop offset="100%" stopColor="#6366f1" />
        </linearGradient>
        <linearGradient id="bar3" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#5b21b6" />
        </linearGradient>
        <linearGradient id="progress" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#22d3ee" />
          <stop offset="100%" stopColor="#7c3aed" />
        </linearGradient>
      </defs>
    </svg>
  )
}

// Generic tool icon map
export const toolIcons: Record<string, React.ComponentType<IconProps>> = {
  subsense: SubSenseIcon,
  apppilot: AppPilotIcon,
  flightwindow: FlightWindowIcon,
  devdash: DevDashIcon,
}

export function getToolIcon(slug: string): React.ComponentType<IconProps> | null {
  return toolIcons[slug] || null
}
