import React from "react"
import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"

import { ThemeProvider } from "@/components/theme-provider"
import { PostHogProvider } from "@/components/posthog-provider"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  metadataBase: new URL("https://six1five.dev"),
  title: {
    default: "Six1Five Devs | Build. Ship. Document.",
    template: "%s | Six1Five Devs",
  },
  description:
    "Developer brand building in public. Shipping real tools like SubSense and AppPilot. Explore guides, build logs, and resources for indie hackers and developers.",
  keywords: [
    "developer",
    "indie hacker",
    "build in public",
    "saas",
    "tools",
    "nextjs",
    "react",
    "typescript",
  ],
  authors: [{ name: "Six1Five Devs" }],
  creator: "Six1Five Devs",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://six1five.dev",
    siteName: "Six1Five Devs",
    title: "Six1Five Devs | Build. Ship. Document.",
    description:
      "Developer brand building in public. Shipping real tools like SubSense and AppPilot.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Six1Five Devs - Build. Ship. Document.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Six1Five Devs | Build. Ship. Document.",
    description:
      "Developer brand building in public. Shipping real tools like SubSense and AppPilot.",
    images: ["/og-image.png"],
    creator: "@six1five",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/icons/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/icons/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
      {
        url: "/icon-light-32x32.png",
        sizes: "32x32",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        sizes: "32x32",
        media: "(prefers-color-scheme: dark)",
      },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/apple-icon.png", sizes: "180x180" },
      { url: "/icons/apple-touch-icon.png", sizes: "180x180" },
    ],
    other: [
      {
        rel: "android-chrome",
        url: "/icons/android-chrome-192x192.png",
        sizes: "192x192",
      },
      {
        rel: "android-chrome",
        url: "/icons/android-chrome-512x512.png",
        sizes: "512x512",
      },
    ],
  },
  manifest: "/manifest.json",
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafafa" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0f" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased min-h-screen bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <PostHogProvider>
            <div className="relative flex min-h-screen flex-col">
              <a
                href="#main-content"
                className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:top-4 focus:left-4 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md focus:font-medium"
              >
                Skip to main content
              </a>
              <SiteHeader />
              <main id="main-content" className="flex-1" tabIndex={-1}>
                {children}
              </main>
              <SiteFooter />
            </div>
          </PostHogProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
