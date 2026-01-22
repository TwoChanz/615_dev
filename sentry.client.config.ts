import * as Sentry from "@sentry/nextjs"

const SENTRY_DSN = process.env.NEXT_PUBLIC_SENTRY_DSN

// Only initialize Sentry if DSN is configured
if (SENTRY_DSN) {
  Sentry.init({
    dsn: SENTRY_DSN,

    // Performance Monitoring
    tracesSampleRate: process.env.NODE_ENV === "production" ? 0.1 : 1.0,

    // Session Replay (errors only in production)
    replaysSessionSampleRate: 0,
    replaysOnErrorSampleRate: process.env.NODE_ENV === "production" ? 1.0 : 0,

    // Environment
    environment: process.env.NODE_ENV || "development",

    // Release tracking (set via SENTRY_RELEASE env var or Git SHA)
    release: process.env.SENTRY_RELEASE || process.env.VERCEL_GIT_COMMIT_SHA,

    // Filter out noisy errors
    ignoreErrors: [
      // Browser extensions
      "ResizeObserver loop",
      "ResizeObserver loop completed with undelivered notifications",
      // Network errors that are usually user-side
      "Failed to fetch",
      "NetworkError",
      "Load failed",
      // Chrome-specific
      "Non-Error promise rejection captured",
    ],

    // Breadcrumbs configuration
    beforeBreadcrumb(breadcrumb) {
      // Filter out noisy console logs
      if (breadcrumb.category === "console" && breadcrumb.level === "log") {
        return null
      }
      return breadcrumb
    },

    // Integration configuration
    integrations: [
      Sentry.replayIntegration({
        // Mask all text content for privacy
        maskAllText: false,
        // Block all media
        blockAllMedia: true,
      }),
    ],

    // Debug mode in development
    debug: process.env.NODE_ENV === "development",
  })
}
