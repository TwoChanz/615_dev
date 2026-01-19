import { cn } from "@/lib/utils"

interface BrandLogoProps {
  className?: string
  size?: "sm" | "md" | "lg"
  showText?: boolean
}

const sizeClasses = {
  sm: "size-8",
  md: "size-10",
  lg: "size-12",
}

export function BrandLogo({ className, size = "md", showText = false }: BrandLogoProps) {
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <svg
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={cn(sizeClasses[size], "shrink-0")}
      >
        {/* Background */}
        <rect width="40" height="40" rx="10" fill="url(#logo-bg)" />

        {/* Terminal bracket with glow */}
        <g filter="url(#glow)">
          <path
            d="M12 14l6 6-6 6"
            stroke="url(#bracket-gradient)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <line
            x1="20"
            y1="26"
            x2="28"
            y2="26"
            stroke="url(#line-gradient)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </g>

        {/* Accent dots */}
        <circle cx="30" cy="12" r="2" fill="#22d3ee" opacity="0.6" />
        <circle cx="34" cy="16" r="1.5" fill="#7c3aed" opacity="0.5" />

        <defs>
          <linearGradient id="logo-bg" x1="0" y1="0" x2="40" y2="40">
            <stop offset="0%" stopColor="#22d3ee" />
            <stop offset="100%" stopColor="#0ea5e9" />
          </linearGradient>
          <linearGradient id="bracket-gradient" x1="12" y1="14" x2="18" y2="26">
            <stop offset="0%" stopColor="#0c0c1a" />
            <stop offset="100%" stopColor="#1a1a2e" />
          </linearGradient>
          <linearGradient id="line-gradient" x1="20" y1="26" x2="28" y2="26">
            <stop offset="0%" stopColor="#0c0c1a" />
            <stop offset="100%" stopColor="#1a1a2e" />
          </linearGradient>
          <filter id="glow" x="-2" y="-2" width="44" height="44">
            <feGaussianBlur stdDeviation="0.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      </svg>

      {showText && (
        <span className="font-semibold tracking-tight text-foreground">
          Six1Five Devs
        </span>
      )}
    </div>
  )
}

// Tool-specific icon wrapper with consistent styling
interface ToolIconProps {
  icon: React.ReactNode
  className?: string
  variant?: "cyan" | "purple" | "gradient"
}

export function ToolIcon({ icon, className, variant = "gradient" }: ToolIconProps) {
  const variantClasses = {
    cyan: "from-primary/20 to-primary/10 text-primary",
    purple: "from-secondary/20 to-secondary/10 text-secondary",
    gradient: "from-primary/15 to-secondary/15 text-primary",
  }

  return (
    <div
      className={cn(
        "flex size-12 items-center justify-center rounded-xl bg-gradient-to-br",
        variantClasses[variant],
        className
      )}
    >
      {icon}
    </div>
  )
}
