/**
 * Root Layout — wraps EVERY page in the app
 *
 * This file:
 * 1. Sets up the HTML document (<html>, <head>, <body>)
 * 2. Loads global CSS styles
 * 3. Wraps everything in ClerkProvider (auth context)
 * 4. Links the PWA manifest so phones can install the app
 * 5. Sets metadata for SEO and social sharing
 *
 * IMPORTANT: This file runs on the SERVER, not in the browser.
 * It's a React Server Component (RSC) by default in Next.js App Router.
 */
import type { Metadata, Viewport } from "next"
import { ClerkProvider } from "@clerk/nextjs"
import { dark } from "@clerk/themes"
import "./globals.css"

/**
 * Metadata — used by search engines, social media previews, and browsers.
 * Next.js automatically turns this into <title>, <meta>, and <link> tags.
 */
export const metadata: Metadata = {
  title: {
    default: "FightNight OS",
    template: "%s | FightNight OS",  // Individual pages can set their own title
  },
  description: "Track fights. Follow favorites. Run the night.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "FightNight OS",
  },
}

/**
 * Viewport — controls how the page looks on mobile devices.
 * "viewport-fit=cover" makes the app use the full screen (behind the notch).
 */
export const viewport: Viewport = {
  themeColor: "#dc2626",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,             // Prevents pinch-to-zoom (app-like behavior)
  viewportFit: "cover",        // Use full screen on notched phones
}

/**
 * The actual layout component. Every page gets wrapped inside this.
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
      }}
    >
      <html lang="en" className="dark">
        <body className="min-h-screen bg-[var(--background)] text-[var(--foreground)] antialiased safe-top">
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}
