/** Edge-compatible auth helpers (no Node.js crypto import) */

export const ADMIN_COOKIE_NAME = 'admin_session'

/** Validate cookie value using Web Crypto API (Edge-compatible) */
export async function validateSessionCookieEdge(
  cookieValue: string,
  secret: string
): Promise<boolean> {
  const dotIndex = cookieValue.indexOf('.')
  if (dotIndex === -1) return false

  const expiry = cookieValue.slice(0, dotIndex)
  const signature = cookieValue.slice(dotIndex + 1)

  // Check expiry
  const expiryMs = parseInt(expiry, 10)
  if (isNaN(expiryMs) || Date.now() > expiryMs) return false

  // HMAC verify using Web Crypto API
  const encoder = new TextEncoder()
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  )
  const signatureBytes = await crypto.subtle.sign(
    'HMAC',
    key,
    encoder.encode(expiry)
  )
  const expectedSignature = Array.from(new Uint8Array(signatureBytes))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')

  // Constant-time comparison
  if (expectedSignature.length !== signature.length) return false
  let mismatch = 0
  for (let i = 0; i < expectedSignature.length; i++) {
    mismatch |= expectedSignature.charCodeAt(i) ^ signature.charCodeAt(i)
  }
  return mismatch === 0
}
