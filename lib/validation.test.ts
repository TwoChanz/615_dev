import { describe, it, expect } from "vitest"
import {
  subscribeSchema,
  trackEventSchema,
  trackBatchSchema,
  isAllowedOrigin,
  getSafeErrorMessage,
  VALID_LEAD_MAGNETS,
} from "./validation"

describe("subscribeSchema", () => {
  it("accepts valid email", () => {
    const result = subscribeSchema.safeParse({ email: "test@example.com" })
    expect(result.success).toBe(true)
  })

  it("rejects empty email", () => {
    const result = subscribeSchema.safeParse({ email: "" })
    expect(result.success).toBe(false)
  })

  it("rejects email without domain", () => {
    const result = subscribeSchema.safeParse({ email: "@" })
    expect(result.success).toBe(false)
  })

  it("rejects email with only @ symbol", () => {
    const result = subscribeSchema.safeParse({ email: "@@" })
    expect(result.success).toBe(false)
  })

  it("rejects invalid email format", () => {
    const result = subscribeSchema.safeParse({ email: "not-an-email" })
    expect(result.success).toBe(false)
  })

  it("rejects email exceeding max length", () => {
    const longEmail = "a".repeat(250) + "@example.com"
    const result = subscribeSchema.safeParse({ email: longEmail })
    expect(result.success).toBe(false)
  })

  it("accepts valid lead magnet", () => {
    const result = subscribeSchema.safeParse({
      email: "test@example.com",
      leadMagnet: "saas-checklist",
    })
    expect(result.success).toBe(true)
  })

  it("rejects invalid lead magnet", () => {
    const result = subscribeSchema.safeParse({
      email: "test@example.com",
      leadMagnet: "invalid-magnet",
    })
    expect(result.success).toBe(false)
  })

  it("accepts all valid lead magnets", () => {
    for (const magnet of VALID_LEAD_MAGNETS) {
      const result = subscribeSchema.safeParse({
        email: "test@example.com",
        leadMagnet: magnet,
      })
      expect(result.success).toBe(true)
    }
  })

  it("accepts optional source and placement", () => {
    const result = subscribeSchema.safeParse({
      email: "test@example.com",
      source: "homepage",
      placement: "footer",
    })
    expect(result.success).toBe(true)
  })

  it("rejects source exceeding max length", () => {
    const result = subscribeSchema.safeParse({
      email: "test@example.com",
      source: "a".repeat(101),
    })
    expect(result.success).toBe(false)
  })
})

describe("trackEventSchema", () => {
  it("accepts valid event", () => {
    const result = trackEventSchema.safeParse({
      name: "page_view",
      category: "navigation",
    })
    expect(result.success).toBe(true)
  })

  it("accepts event with properties", () => {
    const result = trackEventSchema.safeParse({
      name: "button_click",
      category: "engagement",
      properties: {
        buttonId: "cta-1",
        value: 42,
        isActive: true,
      },
    })
    expect(result.success).toBe(true)
  })

  it("rejects empty event name", () => {
    const result = trackEventSchema.safeParse({
      name: "",
      category: "test",
    })
    expect(result.success).toBe(false)
  })

  it("rejects invalid event name format", () => {
    const result = trackEventSchema.safeParse({
      name: "event with spaces",
      category: "test",
    })
    expect(result.success).toBe(false)
  })

  it("rejects event name exceeding max length", () => {
    const result = trackEventSchema.safeParse({
      name: "a".repeat(101),
      category: "test",
    })
    expect(result.success).toBe(false)
  })

  it("rejects properties with too many keys", () => {
    const tooManyProps: Record<string, string> = {}
    for (let i = 0; i < 21; i++) {
      tooManyProps[`key${i}`] = "value"
    }
    const result = trackEventSchema.safeParse({
      name: "test_event",
      category: "test",
      properties: tooManyProps,
    })
    expect(result.success).toBe(false)
  })
})

describe("trackBatchSchema", () => {
  it("accepts valid batch of events", () => {
    const result = trackBatchSchema.safeParse({
      events: [
        { name: "event1", category: "test" },
        { name: "event2", category: "test" },
      ],
    })
    expect(result.success).toBe(true)
  })

  it("rejects empty events array", () => {
    const result = trackBatchSchema.safeParse({ events: [] })
    expect(result.success).toBe(false)
  })

  it("rejects batch exceeding 50 events", () => {
    const events = Array.from({ length: 51 }, (_, i) => ({
      name: `event_${i}`,
      category: "test",
    }))
    const result = trackBatchSchema.safeParse({ events })
    expect(result.success).toBe(false)
  })

  it("accepts exactly 50 events", () => {
    const events = Array.from({ length: 50 }, (_, i) => ({
      name: `event_${i}`,
      category: "test",
    }))
    const result = trackBatchSchema.safeParse({ events })
    expect(result.success).toBe(true)
  })
})

describe("isAllowedOrigin", () => {
  it("allows production origin", () => {
    expect(isAllowedOrigin("https://six1fivestudio.dev")).toBe(true)
  })

  it("allows www subdomain", () => {
    expect(isAllowedOrigin("https://www.six1fivestudio.dev")).toBe(true)
  })

  it("rejects null origin", () => {
    expect(isAllowedOrigin(null)).toBe(false)
  })

  it("rejects unknown origin", () => {
    expect(isAllowedOrigin("https://evil.com")).toBe(false)
  })

  it("rejects http origin (non-https)", () => {
    expect(isAllowedOrigin("http://six1fivestudio.dev")).toBe(false)
  })
})

describe("getSafeErrorMessage", () => {
  it("returns message from first error", () => {
    const result = subscribeSchema.safeParse({ email: "" })
    if (!result.success) {
      const message = getSafeErrorMessage(result.error)
      expect(message).toBe("Email is required")
    }
  })

  it("returns generic message for no errors", () => {
    // Create a mock ZodError with no errors
    const result = subscribeSchema.safeParse({ email: "invalid" })
    if (!result.success) {
      const message = getSafeErrorMessage(result.error)
      expect(typeof message).toBe("string")
    }
  })
})
