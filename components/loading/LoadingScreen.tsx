"use client"

import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"
import { LogoLoader } from "./LogoLoader"
import { QuadrantSplash } from "./QuadrantSplash"
import { TennesseeLoader } from "./TennesseeLoader"

type LoaderVariant = "auto" | "default" | "splash" | "tn"

interface LoadingScreenProps {
  variant?: LoaderVariant
  quadrantSrc?: string
  className?: string
}

const SESSION_KEY = "six1five_loader_shown"

function getAutoVariant(): Exclude<LoaderVariant, "auto"> {
  // Check if this is the first load of the browser session
  if (typeof window !== "undefined") {
    const hasShownSplash = sessionStorage.getItem(SESSION_KEY)

    if (!hasShownSplash) {
      // First load of session - show splash
      sessionStorage.setItem(SESSION_KEY, "true")
      return "splash"
    }

    // 10% chance for TN loader, 90% for default
    const random = Math.random()
    if (random < 0.1) {
      return "tn"
    }
  }

  return "default"
}

export function LoadingScreen({
  variant = "auto",
  quadrantSrc,
  className,
}: LoadingScreenProps) {
  const [activeVariant, setActiveVariant] = useState<Exclude<LoaderVariant, "auto">>("default")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    if (variant === "auto") {
      setActiveVariant(getAutoVariant())
    } else {
      setActiveVariant(variant)
    }
  }, [variant])

  // Prevent hydration mismatch by showing default on server
  if (!mounted) {
    return (
      <div
        className={cn(
          "fixed inset-0 z-50 flex items-center justify-center",
          "bg-[#0a0a0f]",
          className
        )}
      >
        <LogoLoader />
      </div>
    )
  }

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center",
        "bg-[#0a0a0f]",
        className
      )}
    >
      {activeVariant === "default" && <LogoLoader />}

      {activeVariant === "splash" && (
        <QuadrantSplash imageSrc={quadrantSrc} />
      )}

      {activeVariant === "tn" && <TennesseeLoader />}
    </div>
  )
}
