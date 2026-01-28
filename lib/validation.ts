import { z } from "zod"

// Valid lead magnet IDs - must match leadMagnetUrls in the subscribe route
export const VALID_LEAD_MAGNETS = [
  "saas-checklist",
  "tech-stack-guide",
  "automation-starter",
] as const

export type LeadMagnetId = (typeof VALID_LEAD_MAGNETS)[number]

// Persona options for lead capture
export const VALID_PERSONAS = [
  "solo-founder",
  "small-team",
  "agency-freelancer",
  "learning-student",
  "enterprise",
] as const

export type PersonaId = (typeof VALID_PERSONAS)[number]

// Challenge options for post-subscribe survey
export const VALID_CHALLENGES = [
  "cutting-tool-costs",
  "shipping-faster",
  "organizing-projects",
  "learning-ai-workflows",
  "automation",
] as const

export type ChallengeId = (typeof VALID_CHALLENGES)[number]

// Newsletter subscription schema
export const subscribeSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Invalid email address")
    .max(254, "Email too long"), // RFC 5321 max length
  source: z
    .string()
    .max(100, "Source too long")
    .optional(),
  leadMagnet: z
    .enum(VALID_LEAD_MAGNETS, {
      errorMap: () => ({ message: "Invalid lead magnet" }),
    })
    .optional(),
  placement: z
    .string()
    .max(100, "Placement too long")
    .optional(),
  firstName: z
    .string()
    .max(50, "Name too long")
    .regex(/^[a-zA-Z\s'-]*$/, "Name contains invalid characters")
    .optional(),
  persona: z
    .enum(VALID_PERSONAS, {
      errorMap: () => ({ message: "Invalid persona selection" }),
    })
    .optional(),
})

export type SubscribeInput = z.infer<typeof subscribeSchema>

// Survey submission schema (challenge picker)
export const surveySchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Invalid email address")
    .max(254, "Email too long"),
  challenge: z
    .enum(VALID_CHALLENGES, {
      errorMap: () => ({ message: "Invalid challenge selection" }),
    }),
})

export type SurveyInput = z.infer<typeof surveySchema>

// Profile update schema (progressive profiling)
export const profileUpdateSchema = z.object({
  token: z
    .string()
    .min(1, "Token is required")
    .max(500, "Token too long"),
  question: z
    .enum(["stack", "spend", "team"], {
      errorMap: () => ({ message: "Invalid question type" }),
    }),
  answer: z
    .string()
    .min(1, "Answer is required")
    .max(100, "Answer too long"),
})

export type ProfileUpdateInput = z.infer<typeof profileUpdateSchema>

// Analytics event schema
export const trackEventSchema = z.object({
  name: z
    .string()
    .min(1, "Event name is required")
    .max(100, "Event name too long")
    .regex(/^[a-zA-Z0-9_.-]+$/, "Invalid event name format"),
  category: z
    .string()
    .min(1, "Category is required")
    .max(50, "Category too long")
    .regex(/^[a-zA-Z0-9_-]+$/, "Invalid category format"),
  properties: z
    .record(
      z.string().max(50),
      z.union([
        z.string().max(500),
        z.number(),
        z.boolean(),
      ])
    )
    .optional()
    .refine(
      (props) => !props || Object.keys(props).length <= 20,
      "Too many properties (max 20)"
    ),
})

export type TrackEventInput = z.infer<typeof trackEventSchema>

// Batch analytics schema - limit to 50 events
export const trackBatchSchema = z.object({
  events: z
    .array(trackEventSchema)
    .min(1, "At least one event required")
    .max(50, "Too many events in batch (max 50)"),
})

export type TrackBatchInput = z.infer<typeof trackBatchSchema>

// Contact form schema
export const contactFormSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(100, "Name too long")
    .regex(/^[a-zA-Z\s'-]+$/, "Name contains invalid characters"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Invalid email address")
    .max(254, "Email too long"),
  subject: z
    .string()
    .max(200, "Subject too long")
    .optional(),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(5000, "Message too long"),
})

export type ContactFormInput = z.infer<typeof contactFormSchema>

// Allowed origins for CORS
export const ALLOWED_ORIGINS = [
  "https://six1five.dev",
  "https://www.six1five.dev",
  // Development origins
  ...(process.env.NODE_ENV === "development"
    ? ["http://localhost:3000", "http://127.0.0.1:3000"]
    : []),
]

// Helper to check if origin is allowed
export function isAllowedOrigin(origin: string | null): boolean {
  if (!origin) return false
  return ALLOWED_ORIGINS.includes(origin)
}

// Helper to get safe error message for client
export function getSafeErrorMessage(error: z.ZodError): string {
  const firstError = error.errors[0]
  if (!firstError) return "Validation failed"
  return firstError.message
}
