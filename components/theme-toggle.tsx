"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Button 
        variant="ghost" 
        size="icon" 
        aria-label="Toggle theme"
        className="size-9 text-muted-foreground"
      >
        <Sun className="size-[18px]" />
      </Button>
    )
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      aria-label={`Switch to ${resolvedTheme === "dark" ? "light" : "dark"} mode`}
      className="size-9 text-muted-foreground hover:text-foreground hover:bg-muted/50"
    >
      {resolvedTheme === "dark" ? (
        <Sun className="size-[18px] transition-transform duration-200 hover:rotate-45" />
      ) : (
        <Moon className="size-[18px] transition-transform duration-200 hover:-rotate-12" />
      )}
    </Button>
  )
}
