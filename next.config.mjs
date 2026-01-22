import { withSentryConfig } from "@sentry/nextjs"

/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // Enable type checking during builds
    ignoreBuildErrors: false,
  },
  images: {
    // Keep images unoptimized for static export compatibility
    unoptimized: true,
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.six1five.dev" }],
        destination: "https://six1five.dev/:path*",
        permanent: true,
      },
    ]
  },
  // Fallback security headers (middleware handles most, but this provides backup)
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ]
  },
}

// Conditionally wrap with bundle analyzer if available and ANALYZE=true
let config = nextConfig

if (process.env.ANALYZE === "true") {
  try {
    const { default: bundleAnalyzer } = await import("@next/bundle-analyzer")
    config = bundleAnalyzer({ enabled: true })(nextConfig)
  } catch {
    console.warn("Bundle analyzer not installed. Run: npm install -D @next/bundle-analyzer")
  }
}

// Wrap with Sentry if DSN is configured
const sentryConfig = {
  // Suppress source map uploading logs during build
  silent: true,

  // Upload source maps to Sentry
  org: process.env.SENTRY_ORG,
  project: process.env.SENTRY_PROJECT,

  // Route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers
  tunnelRoute: "/monitoring",

  // Hides source maps from generated client bundles
  hideSourceMaps: true,

  // Automatically tree-shake Sentry logger statements
  disableLogger: true,

  // Disable Sentry during development builds
  disableServerWebpackPlugin: !process.env.SENTRY_AUTH_TOKEN,
  disableClientWebpackPlugin: !process.env.SENTRY_AUTH_TOKEN,
}

// Only wrap with Sentry if configured
const finalConfig = process.env.SENTRY_DSN
  ? withSentryConfig(config, sentryConfig)
  : config

export default finalConfig
