/**
 * Profile Token Utilities
 *
 * Simple token encoding/decoding for email links in progressive profiling.
 * Uses base64 encoding with a basic structure. Not cryptographically secure,
 * but sufficient for tracking profile updates via email links.
 */

interface TokenData {
  email: string
  timestamp: number
}

/**
 * Encode email into a URL-safe token for profile links
 */
export function encodeProfileToken(email: string): string {
  const data: TokenData = {
    email,
    timestamp: Date.now(),
  }
  const json = JSON.stringify(data)
  // Use base64url encoding (URL-safe)
  return Buffer.from(json).toString("base64url")
}

/**
 * Decode a profile token back to email and timestamp
 * Returns null if token is invalid
 */
export function decodeProfileToken(token: string): TokenData | null {
  try {
    const json = Buffer.from(token, "base64url").toString("utf-8")
    const data = JSON.parse(json) as unknown

    // Validate structure
    if (
      typeof data !== "object" ||
      data === null ||
      typeof (data as TokenData).email !== "string" ||
      typeof (data as TokenData).timestamp !== "number"
    ) {
      return null
    }

    return data as TokenData
  } catch {
    return null
  }
}

/**
 * Check if a token has expired
 * @param timestamp - Token creation timestamp in milliseconds
 * @param maxAgeDays - Maximum age in days (default 30)
 */
export function isTokenExpired(timestamp: number, maxAgeDays: number = 30): boolean {
  const maxAgeMs = maxAgeDays * 24 * 60 * 60 * 1000
  return Date.now() - timestamp > maxAgeMs
}

/**
 * Generate a full profile URL for a specific question
 */
export function generateProfileUrl(
  email: string,
  question: "stack" | "spend" | "team",
  baseUrl: string = "https://six1five.dev"
): string {
  const token = encodeProfileToken(email)
  return `${baseUrl}/profile/${question}?token=${token}`
}
