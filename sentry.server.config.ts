import * as Sentry from "@sentry/nextjs"

const SENTRY_DSN = process.env.SENTRY_DSN

// Only initialize Sentry if DSN is configured
if (SENTRY_DSN) {
  Sentry.init({
    dsn: SENTRY_DSN,

    // Performance monitoring
    tracesSampleRate: process.env.NODE_ENV === "production" ? 0.1 : 1.0,

    // Environment
    environment: process.env.NODE_ENV || "development",

    // Release tracking
    release: process.env.SENTRY_RELEASE || process.env.VERCEL_GIT_COMMIT_SHA,

    // Filter out expected errors
    ignoreErrors: [
      // Expected API errors
      "ECONNRESET",
      "ETIMEDOUT",
      "ENOTFOUND",
    ],

    // Debug mode in development
    debug: process.env.NODE_ENV === "development",
  })
}
