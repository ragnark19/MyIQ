'use server'

import { cookies } from 'next/headers'
import { verifyPassword, createSessionCookie, clearSessionCookie, ADMIN_COOKIE_NAME } from '@/lib/admin/auth'
import { validateSessionCookieEdge } from '@/lib/admin/auth-edge'
import { getAdminStats } from '@/lib/admin/queries'
import { adminLoginSchema } from '@/lib/validations'

// Simple in-memory rate limiter (mirrors the old API route)
const attempts = new Map<string, { count: number; resetAt: number }>()
const MAX_ATTEMPTS = 5
const WINDOW_MS = 15 * 60 * 1000 // 15 minutes

function isRateLimited(key: string): boolean {
  const now = Date.now()
  const entry = attempts.get(key)
  if (!entry || now > entry.resetAt) {
    attempts.set(key, { count: 1, resetAt: now + WINDOW_MS })
    return false
  }
  entry.count++
  return entry.count > MAX_ATTEMPTS
}

export async function adminLogin(input: unknown) {
  const parsed = adminLoginSchema.safeParse(input)
  if (!parsed.success) {
    return { error: 'Invalid input' }
  }

  // Rate-limit by a fixed key for server actions (no IP available)
  if (isRateLimited('admin_login')) {
    return { error: 'Too many login attempts. Try again later.' }
  }

  const { password } = parsed.data

  if (!verifyPassword(password)) {
    return { error: 'Invalid password' }
  }

  const cookie = createSessionCookie()
  const cookieStore = await cookies()
  cookieStore.set(cookie.name, cookie.value, cookie.options as Parameters<typeof cookieStore.set>[2])

  return { success: true }
}

export async function adminLogout() {
  const cookie = clearSessionCookie()
  const cookieStore = await cookies()
  cookieStore.set(cookie.name, cookie.value, cookie.options as Parameters<typeof cookieStore.set>[2])
  return { success: true }
}

export async function refreshAdminStats() {
  // Validate admin cookie before returning stats
  const secret = process.env.ADMIN_SESSION_SECRET
  if (!secret) {
    return { error: 'Unauthorized' }
  }

  const cookieStore = await cookies()
  const cookie = cookieStore.get(ADMIN_COOKIE_NAME)
  if (!cookie?.value) {
    return { error: 'Unauthorized' }
  }

  const valid = await validateSessionCookieEdge(cookie.value, secret)
  if (!valid) {
    return { error: 'Unauthorized' }
  }

  try {
    const stats = await getAdminStats()
    return { stats }
  } catch (error) {
    console.error('Admin stats error:', error)
    return { error: 'Failed to fetch stats' }
  }
}
