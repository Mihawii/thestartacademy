import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || "your-super-secret-jwt-key-change-in-production";

// Temporarily disable middleware for debugging
const DISABLE_MIDDLEWARE = true;

export function middleware(request: NextRequest) {
  // Temporarily disable middleware for debugging
  if (DISABLE_MIDDLEWARE) {
    return NextResponse.next();
  }

  // Protect admin routes
  if (request.nextUrl.pathname.startsWith('/admin') && !request.nextUrl.pathname.startsWith('/admin/login')) {
    // Check for token in cookies or authorization header
    const token = request.cookies.get('admin_token')?.value || 
                  request.headers.get('authorization')?.replace('Bearer ', '');

    console.log('Middleware check for:', request.nextUrl.pathname);
    console.log('Token found:', !!token);
    console.log('Token value:', token?.substring(0, 20) + '...');

    if (!token) {
      console.log('No token, redirecting to login');
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      console.log('Token valid, decoded:', decoded);
      return NextResponse.next();
    } catch (error) {
      console.log('Token invalid, error:', error);
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  // Rate limiting for API routes
  if (request.nextUrl.pathname.startsWith('/api/')) {
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
    
    // Basic rate limiting headers
    const response = NextResponse.next();
    response.headers.set('X-RateLimit-Limit', '100');
    response.headers.set('X-RateLimit-Remaining', '99');
    
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/api/:path*']
};
