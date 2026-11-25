import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const host = request.headers.get('host') || '';

  // Canonicalize host: Strip 'www.' prefix immediately to prevent SSL cert domain mismatches
  if (host.startsWith('www.')) {
    const cleanHost = host.replace(/^www\./, '');
    const url = request.nextUrl.clone();
    url.host = cleanHost;
    url.protocol = 'https';
    return NextResponse.redirect(url, { status: 301 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|images).*)'],
};
