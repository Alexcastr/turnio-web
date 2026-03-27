import { NextRequest, NextResponse } from 'next/server';

const PROTECTED_PREFIX = '/it-admin';
const LOGIN_PATH = '/it-admin/login';
const SESSION_COOKIE_BASE = 'better-auth.session_token';

function hasSessionCookie(request: NextRequest): boolean {
  const cookies = request.cookies.getAll();

  return cookies.some(({ name, value }) => {
    if (!value) return false;

    if (
      name === SESSION_COOKIE_BASE
      || name === `__Secure-${SESSION_COOKIE_BASE}`
      || name === `__Host-${SESSION_COOKIE_BASE}`
    ) {
      return true;
    }

    // Handles chunked cookies like better-auth.session_token.0
    return (
      name.startsWith(`${SESSION_COOKIE_BASE}.`)
      || name.startsWith(`__Secure-${SESSION_COOKIE_BASE}.`)
      || name.startsWith(`__Host-${SESSION_COOKIE_BASE}.`)
    );
  });
}

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!pathname.startsWith(PROTECTED_PREFIX)) {
    return NextResponse.next();
  }

  if (pathname === LOGIN_PATH) {
    return NextResponse.next();
  }

  if (!hasSessionCookie(request)) {
    const loginUrl = new URL(LOGIN_PATH, request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/it-admin/:path*'],
};
