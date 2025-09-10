import { updateSession } from '@/lib/supabase-middleware'
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  // Only handle admin routes
  if (!request.nextUrl.pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  // Allow /admin/login (no auth required)
  if (request.nextUrl.pathname === "/admin/login") {
    return NextResponse.next();
  }

  // For /admin/dashboard and other protected admin routes, check authentication
  if (request.nextUrl.pathname.startsWith("/admin/dashboard")) {
    return await updateSession(request);
  }

  // For any other admin routes, allow them (this handles /admin which has its own page redirect)
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
