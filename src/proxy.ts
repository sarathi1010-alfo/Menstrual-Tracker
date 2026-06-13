import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const hostname = request.headers.get('host') || '';

  const response = NextResponse.next();

  // Prevent indexing of Vercel deployment URLs (e.g. *.vercel.app)
  // This forces Google to only index your custom domain
  if (
    hostname.includes('vercel.app') ||
    hostname.includes('onrender.com') ||
    hostname.includes('netlify.app')
  ) {
    response.headers.set('x-robots-tag', 'noindex, nofollow');
  }

  return response;
}

// Apply this middleware to all routes except internal Next.js/static files
export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
