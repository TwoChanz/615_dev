/**
 * Six1Five Devs - Analytics Instrumentation
 *
 * Placeholder tracking IDs - Replace with actual values in production
 */

// Tracking Configuration
export const trackingConfig = {
  // Google Analytics
  googleAnalyticsId: process.env.NEXT_PUBLIC_GA_ID || "G-XXXXXXXXXX",

  // Plausible Analytics (privacy-focused alternative)
  plausibleDomain: process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN || "six1five.dev",

  // PostHog (product analytics)
  posthogKey: process.env.NEXT_PUBLIC_POSTHOG_KEY || "phc_XXXXXXXXXXXX",
  posthogHost: process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://app.posthog.com",

  // Custom event endpoint
  eventEndpoint: "/api/analytics/track",

  // Debug mode
  debug: process.env.NODE_ENV === "development",
}

// Event Types
export type EventCategory =
  | "affiliate"
  | "newsletter"
  | "product"
  | "content"
  | "tool"
  | "navigation"
  | "engagement"

export interface TrackingEvent {
  name: string
  category: EventCategory
  properties?: Record<string, string | number | boolean | undefined>
}

// Core tracking function
export function track(event: TrackingEvent): void {
  const { name, category, properties = {} } = event

  // Add common properties
  const enrichedProperties = {
    ...properties,
    category,
    timestamp: new Date().toISOString(),
    url: typeof window !== "undefined" ? window.location.href : "",
    referrer: typeof document !== "undefined" ? document.referrer : "",
  }

  // Debug logging
  if (trackingConfig.debug) {
    console.log("[Analytics]", name, enrichedProperties)
  }

  // Send to Google Analytics (if available)
  if (typeof window !== "undefined" && "gtag" in window) {
    ;(window as unknown as { gtag: (...args: unknown[]) => void }).gtag("event", name, {
      event_category: category,
      ...properties,
    })
  }

  // Send to Plausible (if available)
  if (typeof window !== "undefined" && "plausible" in window) {
    ;(window as unknown as { plausible: (name: string, options: { props: Record<string, unknown> }) => void }).plausible(name, { props: enrichedProperties })
  }

  // Send to PostHog (if available)
  if (typeof window !== "undefined" && "posthog" in window) {
    ;(window as unknown as { posthog: { capture: (name: string, props: Record<string, unknown>) => void } }).posthog.capture(name, enrichedProperties)
  }
}

// Pre-defined tracking functions

// Affiliate Tracking
export const trackAffiliate = {
  click: (affiliateId: string, placement: string, affiliateName?: string) =>
    track({
      name: "affiliate_click",
      category: "affiliate",
      properties: {
        affiliate_id: affiliateId,
        affiliate_name: affiliateName,
        placement,
      },
    }),

  impression: (affiliateId: string, placement: string) =>
    track({
      name: "affiliate_impression",
      category: "affiliate",
      properties: {
        affiliate_id: affiliateId,
        placement,
      },
    }),
}

// Newsletter Tracking
export const trackNewsletter = {
  formView: (placement: string) =>
    track({
      name: "newsletter_form_view",
      category: "newsletter",
      properties: { placement },
    }),

  subscribe: (placement: string, leadMagnet?: string) =>
    track({
      name: "newsletter_subscribe",
      category: "newsletter",
      properties: {
        placement,
        lead_magnet: leadMagnet,
      },
    }),

  error: (placement: string, errorType: string) =>
    track({
      name: "newsletter_error",
      category: "newsletter",
      properties: {
        placement,
        error_type: errorType,
      },
    }),
}

// Product Tracking
export const trackProduct = {
  view: (productId: string, productName: string) =>
    track({
      name: "product_view",
      category: "product",
      properties: {
        product_id: productId,
        product_name: productName,
      },
    }),

  click: (productId: string, placement: string, price?: number) =>
    track({
      name: "product_click",
      category: "product",
      properties: {
        product_id: productId,
        placement,
        price,
      },
    }),

  addToCart: (productId: string, price: number) =>
    track({
      name: "product_add_to_cart",
      category: "product",
      properties: {
        product_id: productId,
        price,
      },
    }),
}

// Content Tracking
export const trackContent = {
  view: (slug: string, contentType: string, title?: string) =>
    track({
      name: "content_view",
      category: "content",
      properties: {
        slug,
        content_type: contentType,
        title,
      },
    }),

  scroll: (slug: string, percentage: number) =>
    track({
      name: "content_scroll",
      category: "content",
      properties: {
        slug,
        scroll_percentage: percentage,
      },
    }),

  complete: (slug: string, timeOnPage: number) =>
    track({
      name: "content_complete",
      category: "content",
      properties: {
        slug,
        time_on_page: timeOnPage,
      },
    }),

  share: (slug: string, platform: string) =>
    track({
      name: "content_share",
      category: "content",
      properties: {
        slug,
        platform,
      },
    }),

  copyCode: (slug: string, codeBlockIndex: number) =>
    track({
      name: "content_copy_code",
      category: "content",
      properties: {
        slug,
        code_block_index: codeBlockIndex,
      },
    }),
}

// Tool Tracking
export const trackTool = {
  view: (toolSlug: string, toolName: string) =>
    track({
      name: "tool_view",
      category: "tool",
      properties: {
        tool_slug: toolSlug,
        tool_name: toolName,
      },
    }),

  click: (toolSlug: string, action: "visit" | "demo" | "docs") =>
    track({
      name: "tool_click",
      category: "tool",
      properties: {
        tool_slug: toolSlug,
        action,
      },
    }),

  signup: (toolSlug: string) =>
    track({
      name: "tool_signup",
      category: "tool",
      properties: {
        tool_slug: toolSlug,
      },
    }),
}

// Engagement Tracking
export const trackEngagement = {
  ctaClick: (ctaId: string, ctaText: string, placement: string) =>
    track({
      name: "cta_click",
      category: "engagement",
      properties: {
        cta_id: ctaId,
        cta_text: ctaText,
        placement,
      },
    }),

  externalLink: (url: string, context: string) =>
    track({
      name: "external_link_click",
      category: "engagement",
      properties: {
        url,
        context,
      },
    }),

  search: (query: string, resultsCount: number) =>
    track({
      name: "search",
      category: "engagement",
      properties: {
        query,
        results_count: resultsCount,
      },
    }),

  feedback: (type: "helpful" | "not_helpful", contentSlug: string) =>
    track({
      name: "feedback",
      category: "engagement",
      properties: {
        feedback_type: type,
        content_slug: contentSlug,
      },
    }),
}

// Navigation Tracking
export const trackNavigation = {
  pageView: (path: string, title?: string) =>
    track({
      name: "page_view",
      category: "navigation",
      properties: {
        path,
        title,
      },
    }),

  click: (destination: string, source: string) =>
    track({
      name: "navigation_click",
      category: "navigation",
      properties: {
        destination,
        source,
      },
    }),
}

// UTM Parameter Extraction
export function getUTMParams(): Record<string, string> {
  if (typeof window === "undefined") return {}

  const params = new URLSearchParams(window.location.search)
  const utmParams: Record<string, string> = {}

  const utmKeys = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"]
  utmKeys.forEach((key) => {
    const value = params.get(key)
    if (value) utmParams[key] = value
  })

  return utmParams
}

// Session tracking
export function getSessionId(): string {
  if (typeof window === "undefined") return ""

  let sessionId = sessionStorage.getItem("six1five_session_id")
  if (!sessionId) {
    sessionId = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`
    sessionStorage.setItem("six1five_session_id", sessionId)
  }
  return sessionId
}
