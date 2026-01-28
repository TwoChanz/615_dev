import { createHmac } from "crypto"

/**
 * Download Token Utilities
 *
 * Generates secure, time-limited tokens for lead magnet downloads.
 * Tokens are HMAC-signed to prevent tampering.
 */

const SECRET = process.env.DOWNLOAD_TOKEN_SECRET || "six1five-dev-downloads-secret-key"

interface TokenPayload {
  email: string
  magnetId: string
  exp: number // Expiration timestamp
}

/**
 * Generate a secure download token
 * @param email - Subscriber's email
 * @param magnetId - Lead magnet ID
 * @param expiresInDays - Token validity period (default 7 days)
 */
export function generateDownloadToken(
  email: string,
  magnetId: string,
  expiresInDays: number = 7
): string {
  const payload: TokenPayload = {
    email,
    magnetId,
    exp: Date.now() + expiresInDays * 24 * 60 * 60 * 1000,
  }

  const data = Buffer.from(JSON.stringify(payload)).toString("base64url")
  const signature = createHmac("sha256", SECRET).update(data).digest("base64url")

  return `${data}.${signature}`
}

/**
 * Validate and decode a download token
 * Returns null if invalid or expired
 */
export function validateDownloadToken(token: string): TokenPayload | null {
  try {
    const [data, signature] = token.split(".")
    if (!data || !signature) return null

    // Verify signature
    const expectedSignature = createHmac("sha256", SECRET).update(data).digest("base64url")
    if (signature !== expectedSignature) return null

    // Decode payload
    const payload = JSON.parse(Buffer.from(data, "base64url").toString("utf-8")) as TokenPayload

    // Check expiration
    if (Date.now() > payload.exp) return null

    // Validate structure
    if (!payload.email || !payload.magnetId) return null

    return payload
  } catch {
    return null
  }
}

/**
 * Generate a full download URL with token
 */
export function generateDownloadUrl(
  email: string,
  magnetId: string,
  baseUrl: string = "https://six1five.dev"
): string {
  const token = generateDownloadToken(email, magnetId)
  return `${baseUrl}/api/downloads/${magnetId}?token=${token}`
}
