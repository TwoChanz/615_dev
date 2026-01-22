"use client"

import { cn } from "@/lib/utils"

interface LogoLoaderProps {
  className?: string
  size?: "sm" | "md" | "lg"
}

export function LogoLoader({ className, size = "md" }: LogoLoaderProps) {
  const sizeClasses = {
    sm: "text-xl",
    md: "text-3xl",
    lg: "text-5xl",
  }

  return (
    <div
      className={cn(
        "flex items-center justify-center font-mono font-bold tracking-tight",
        sizeClasses[size],
        className
      )}
      role="status"
      aria-label="Loading"
    >
      {/* Six */}
      <span className="text-gradient">Six</span>

      {/* Separator */}
      <span className="mx-1 text-muted-foreground/50">|</span>

      {/* 1 with blinking caret */}
      <span className="text-gradient">1</span>
      <span className="caret-blink text-cyan-400">▮</span>

      {/* Separator */}
      <span className="mx-1 text-muted-foreground/50">|</span>

      {/* Five */}
      <span className="text-gradient">Five</span>
    </div>
  )
}
