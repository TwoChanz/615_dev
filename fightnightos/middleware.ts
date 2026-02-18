/**
 * Clerk Auth Middleware
 *
 * This file runs BEFORE every page load. It:
 * 1. Checks if the user is signed in
 * 2. If not, and the page requires auth, redirects to sign-in
 * 3. Allows public pages (landing, sign-in, sign-up) without auth
 *
 * Think of it like a bouncer — it checks your ID before letting you in.
 */
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server"

/**
 * Public routes — pages that DON'T require sign-in.
 * Everything else requires authentication.
 */
const isPublicRoute = createRouteMatcher([
  "/",                    // Landing page
  "/auth/sign-in(.*)",    // Sign-in page (and sub-paths)
  "/auth/sign-up(.*)",    // Sign-up page
  "/invite/(.*)",         // Group invite links (need to see them before signing in)
  "/api/webhooks(.*)",    // Webhook endpoints (called by external services)
])

export default clerkMiddleware(async (auth, request) => {
  if (!isPublicRoute(request)) {
    await auth.protect()
  }
})

export const config = {
  /**
   * This tells Next.js which URL paths the middleware should run on.
   * The pattern below matches everything EXCEPT static files and Next.js internals.
   */
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
}
