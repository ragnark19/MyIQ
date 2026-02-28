import crypto from 'crypto'

const COOKIE_NAME = 'admin_session'
const SESSION_DURATION_MS = 24 * 60 * 60 * 1000 // 24 hours

function getSecret(): string {
  const secret = process.env.ADMIN_SESSION_SECRET
  if (!secret || secret.length < 32) {
    throw new Error('ADMIN_SESSION_SECRET must be set and at least 32 chars')
  }
  return secret
}

function hmacSign(data: string): string {
  return crypto.createHmac('sha256', getSecret()).update(data).digest('hex')
}

export function verifyPassword(input: string): boolean {
  const password = process.env.ADMIN_PASSWORD
  if (!password) return false
  const inputBuf = Buffer.from(input)
  const passwordBuf = Buffer.from(password)
  if (inputBuf.length !== passwordBuf.length) return false
  return crypto.timingSafeEqual(inputBuf, passwordBuf)
}

export function createSessionCookie(): {
  name: string
  value: string
  options: Record<string, unknown>
} {
  const expiry = Date.now() + SESSION_DURATION_MS
  const signature = hmacSign(String(expiry))
  return {
    name: COOKIE_NAME,
    value: `${expiry}.${signature}`,
    options: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/admin',
      maxAge: SESSION_DURATION_MS / 1000,
    },
  }
}

export function clearSessionCookie(): {
  name: string
  value: string
  options: Record<string, unknown>
} {
  return {
    name: COOKIE_NAME,
    value: '',
    options: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/admin',
      maxAge: 0,
    },
  }
}

export { ADMIN_COOKIE_NAME } from './auth-edge'
