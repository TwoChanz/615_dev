import Image from "next/image"
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

const imageSizes = {
  sm: 32,
  md: 40,
  lg: 48,
}

export function BrandLogo({ className, size = "md", showText = false }: BrandLogoProps) {
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <div className={cn("relative shrink-0 rounded-lg overflow-hidden", sizeClasses[size])}>
        <Image
          src="/logo.png"
          alt="Six1Five Devs"
          width={imageSizes[size]}
          height={imageSizes[size]}
          className="object-contain"
          priority
        />
      </div>

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
