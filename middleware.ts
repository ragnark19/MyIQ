import { NextRequest, NextResponse } from 'next/server'
import { validateSessionCookieEdge, ADMIN_COOKIE_NAME } from '@/lib/admin/auth-edge'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Block unauthenticated /api/admin/* requests with 401
  if (pathname.startsWith('/api/admin')) {
    const secret = process.env.ADMIN_SESSION_SECRET
    if (!secret) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const cookie = request.cookies.get(ADMIN_COOKIE_NAME)
    if (!cookie?.value) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const valid = await validateSessionCookieEdge(cookie.value, secret)
    if (!valid) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    return NextResponse.next()
  }

  // Only protect /admin routes (except /admin/login)
  if (!pathname.startsWith('/admin') || pathname === '/admin/login') {
    return NextResponse.next()
  }

  const secret = process.env.ADMIN_SESSION_SECRET
  if (!secret) {
    return NextResponse.redirect(new URL('/admin/login', request.url))
  }

  const cookie = request.cookies.get(ADMIN_COOKIE_NAME)
  if (!cookie?.value) {
    return NextResponse.redirect(new URL('/admin/login', request.url))
  }

  const valid = await validateSessionCookieEdge(cookie.value, secret)
  if (!valid) {
    return NextResponse.redirect(new URL('/admin/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
}
