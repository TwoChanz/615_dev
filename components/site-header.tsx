"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import Image from "next/image"
import { Menu, X } from "lucide-react"
import { createPortal } from "react-dom"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"

const primaryNavigation = [
  { name: "Tools", href: "/tools" },
  { name: "Labs", href: "/labs" },
  { name: "Guides", href: "/guides" },
  { name: "Resources", href: "/resources" },
]

const secondaryNavigation = [
  { name: "Blog", href: "/blog" },
  { name: "About", href: "/about" },
]

const navigation = [...primaryNavigation, ...secondaryNavigation]

export function SiteHeader() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <>
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
      <nav className="container-page flex items-center justify-between h-16">
        {/* Logo */}
        <div className="flex lg:flex-1">
          <Link
            href="/"
            className="group flex items-center gap-2.5 transition-all duration-200 hover:opacity-90"
          >
            <div className="relative">
              <Image
                src="/logo-mark.svg"
                alt="Six1Five Devs"
                width={32}
                height={32}
                className="size-8 transition-transform duration-200 group-hover:scale-105"
              />
              <div className="absolute inset-0 rounded-lg bg-primary/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 -z-10" />
            </div>
            <span className="flex items-baseline gap-0.5">
              <span className="font-bold tracking-tight text-gradient">Six1Five</span>
              <span className="font-medium text-muted-foreground">Devs</span>
            </span>
          </Link>
        </div>
        
        {/* Mobile menu button */}
        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open menu"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
            className="text-muted-foreground hover:text-foreground"
          >
            <Menu className="size-5" aria-hidden="true" />
          </Button>
        </div>
        
        {/* Desktop navigation */}
        <div className="hidden lg:flex lg:items-center lg:gap-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "relative px-3 py-2 text-sm font-medium transition-colors rounded-md",
                  isActive 
                    ? "text-primary" 
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                )}
              >
                {item.name}
                {isActive && (
                  <span className="absolute inset-x-3 -bottom-[17px] h-px bg-primary" />
                )}
              </Link>
            )
          })}
        </div>
        
        {/* Desktop actions */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:items-center lg:gap-3">
          <ThemeToggle />
          <Button asChild size="sm" className="font-medium">
            <Link href="/contact">Get in Touch</Link>
          </Button>
        </div>
      </nav>
    </header>

    {/* Mobile menu - portaled to body to avoid stacking context issues */}
    {mounted && mobileMenuOpen && createPortal(
      <div
        className="fixed inset-0 z-[100] lg:hidden"
        role="dialog"
        aria-modal="true"
        aria-labelledby="mobile-menu-title"
      >
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm"
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />
        <div className="fixed inset-y-0 right-0 z-[101] w-full max-w-sm overflow-y-auto bg-background border-l border-border shadow-xl">
          <div className="flex items-center justify-between px-6 h-16 border-b border-border">
            <Link
              href="/"
              className="flex items-center gap-2.5"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Image
                src="/logo-mark.svg"
                alt="Six1Five Devs"
                width={32}
                height={32}
                className="size-8"
              />
              <span id="mobile-menu-title" className="flex items-baseline gap-0.5">
                <span className="font-bold tracking-tight text-gradient">Six1Five</span>
                <span className="font-medium text-muted-foreground">Devs</span>
              </span>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close menu"
              className="text-muted-foreground hover:text-foreground"
            >
              <X className="size-5" aria-hidden="true" />
            </Button>
          </div>

          <div className="px-6 py-6">
            {/* Primary Navigation */}
            <nav className="flex flex-col gap-1">
              {primaryNavigation.map((item) => {
                const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "flex items-center rounded-lg px-3 py-3.5 text-base font-semibold transition-colors",
                      isActive
                        ? "bg-primary/10 text-primary"
                        : "text-foreground hover:bg-muted"
                    )}
                  >
                    {item.name}
                  </Link>
                )
              })}
            </nav>

            {/* Secondary Navigation */}
            <div className="mt-6 pt-6 border-t border-border">
              <p className="px-3 mb-3 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                More
              </p>
              <nav className="flex flex-col gap-1">
                {secondaryNavigation.map((item) => {
                  const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={cn(
                        "flex items-center rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                        isActive
                          ? "bg-primary/10 text-primary"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      )}
                    >
                      {item.name}
                    </Link>
                  )
                })}
              </nav>
            </div>

            <div className="mt-6 pt-6 border-t border-border">
              <Button asChild className="w-full font-medium">
                <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>
                  Get in Touch
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>,
      document.body
    )}
    </>
  )
}
