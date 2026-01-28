"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import styles from "./logo-loader.module.css"

interface LogoLoaderProps {
  /** Size in pixels (default: 48) */
  size?: number
  /** Additional CSS classes */
  className?: string
  /** Accessible label for screen readers */
  label?: string
}

/**
 * Premium 615 Logo Loading Animation
 *
 * Features:
 * - Sequential glow pulse: 6 → 1 → 5
 * - Smooth infinite loop (~1.4s cycle)
 * - Supports 24px to 256px scaling
 * - Respects prefers-reduced-motion
 * - GPU-accelerated (opacity + filter)
 * - Works on light and dark backgrounds
 *
 * Usage:
 * ```tsx
 * <LogoLoader />                           // Default 48px
 * <LogoLoader size={64} />                 // Larger
 * <LogoLoader size={24} />                 // Small inline
 * <LogoLoader className="mx-auto" />       // Centered
 * ```
 */
export function LogoLoader({
  size = 48,
  className,
  label = "Loading",
}: LogoLoaderProps) {
  // Calculate responsive font size (scales with container)
  const fontSize = Math.round(size * 0.5)

  return (
    <div
      role="status"
      aria-label={label}
      className={cn("inline-flex items-center justify-center", className)}
      style={{ width: size * 1.67, height: size }}
    >
      <svg
        viewBox="0 0 80 32"
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
        className={styles.loader}
        aria-hidden="true"
      >
        <defs>
          {/* Base gradient for text - teal to purple brand colors */}
          <linearGradient id="loader-gradient-615" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#14b8a6" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </linearGradient>
        </defs>

        {/* "6" character */}
        <text
          x="8"
          y="24"
          fontSize={fontSize}
          fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
          fontWeight="700"
          fill="url(#loader-gradient-615)"
          className={cn(styles.digit, styles.digit6)}
        >
          6
        </text>

        {/* "1" character */}
        <text
          x="30"
          y="24"
          fontSize={fontSize}
          fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
          fontWeight="700"
          fill="url(#loader-gradient-615)"
          className={cn(styles.digit, styles.digit1)}
        >
          1
        </text>

        {/* "5" character */}
        <text
          x="52"
          y="24"
          fontSize={fontSize}
          fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
          fontWeight="700"
          fill="url(#loader-gradient-615)"
          className={cn(styles.digit, styles.digit5)}
        >
          5
        </text>
      </svg>

      {/* Screen reader text */}
      <span className="sr-only">{label}</span>
    </div>
  )
}

/**
 * Full-page loading overlay with logo animation
 *
 * Usage:
 * ```tsx
 * <LogoLoaderOverlay visible={isLoading} />
 * <LogoLoaderOverlay visible={true} message="Loading your data..." />
 * ```
 */
interface LogoLoaderOverlayProps {
  /** Whether the loader is visible */
  visible?: boolean
  /** Size of the logo (default: 64) */
  size?: number
  /** Optional loading message */
  message?: string
  /** Additional CSS classes */
  className?: string
}

export function LogoLoaderOverlay({
  visible = true,
  size = 64,
  message,
  className,
}: LogoLoaderOverlayProps) {
  if (!visible) return null

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex flex-col items-center justify-center",
        "bg-background/80 backdrop-blur-sm",
        className
      )}
    >
      <LogoLoader size={size} />
      {message && (
        <p className="mt-4 text-sm text-muted-foreground animate-pulse">
          {message}
        </p>
      )}
    </div>
  )
}

/**
 * Inline loading indicator with optional text
 *
 * Usage:
 * ```tsx
 * <LogoLoaderInline />
 * <LogoLoaderInline text="Loading..." />
 * <LogoLoaderInline size={20} text="Please wait" />
 * ```
 */
interface LogoLoaderInlineProps {
  /** Size of the logo (default: 24) */
  size?: number
  /** Optional loading text */
  text?: string
  /** Additional CSS classes */
  className?: string
}

export function LogoLoaderInline({
  size = 24,
  text,
  className,
}: LogoLoaderInlineProps) {
  return (
    <div className={cn("inline-flex items-center gap-2", className)}>
      <LogoLoader size={size} label={text || "Loading"} />
      {text && <span className="text-sm text-muted-foreground">{text}</span>}
    </div>
  )
}

/**
 * Button loading state replacement
 *
 * Usage:
 * ```tsx
 * <Button disabled={isLoading}>
 *   {isLoading ? <LogoLoaderButton /> : "Submit"}
 * </Button>
 * ```
 */
interface LogoLoaderButtonProps {
  /** Size of the logo (default: 20) */
  size?: number
  /** Additional CSS classes */
  className?: string
}

export function LogoLoaderButton({
  size = 20,
  className,
}: LogoLoaderButtonProps) {
  return <LogoLoader size={size} className={className} label="Processing" />
}
