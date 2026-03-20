import { NextRequest, NextResponse } from 'next/server';

const PROTECTED_PREFIX = '/it-admin';
const LOGIN_PATH = '/it-admin/login';

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!pathname.startsWith(PROTECTED_PREFIX)) {
    return NextResponse.next();
  }

  if (pathname === LOGIN_PATH) {
    return NextResponse.next();
  }

  const sessionToken =
    request.cookies.get('admin_session')?.value;

  if (!sessionToken) {
    const loginUrl = new URL(LOGIN_PATH, request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/it-admin/:path*'],
};
