import createIntlMiddleware from "next-intl/middleware";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { updateSession } from "./lib/supabase-middleware";

const intlMiddleware = createIntlMiddleware({
  locales: ["en", "vi"],
  defaultLocale: "en",
  localePrefix: "always",
});

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Skip internationalization for admin routes
  if (pathname.startsWith("/admin") || pathname.startsWith("/api")) {
    // Handle /admin route - redirect based on authentication status
    if (pathname === "/admin" || pathname === "/admin/login") {
      console.log(
        "🔒 /admin accessed, checking authentication for redirect..."
      );

      // Check authentication and redirect accordingly
      const authResult = await checkAuthAndRedirect(
        request,
        "/admin/dashboard",
        "/admin/login"
      );
      return authResult;
    }

    // Handle admin dashboard and other protected admin routes
    if (
      pathname.startsWith("/admin/dashboard") ||
      (pathname.startsWith("/admin/") && !pathname.startsWith("/admin/login"))
    ) {
      console.log(
        "🔒 Protected admin route accessed, checking authentication..."
      );
      return await updateSession(request);
    }

    return NextResponse.next();
  }

  // Apply internationalization middleware for all other routes
  return intlMiddleware(request);
}

// Helper function to check auth and redirect appropriately
async function checkAuthAndRedirect(
  request: NextRequest,
  authenticatedRedirect: string,
  unauthenticatedRedirect: string
) {
  try {
    // Use the same authentication logic as updateSession but with custom redirects
    const { createServerClient } = await import("@supabase/ssr");

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll();
          },
          setAll() {
            // We don't need to set cookies for redirect logic
          },
        },
      }
    );

    const {
      data: { user },
    } = await supabase.auth.getUser();

    const url = request.nextUrl.clone();

    if (user) {
      console.log("✅ User authenticated, redirecting to dashboard");
      url.pathname = authenticatedRedirect;
    } else {
      console.log("🚫 No user found, redirecting to login");
      url.pathname = unauthenticatedRedirect;
    }

    return NextResponse.redirect(url);
  } catch (error) {
    console.error("❌ Auth check failed:", error);
    // On error, redirect to login for safety
    const url = request.nextUrl.clone();
    url.pathname = unauthenticatedRedirect;
    return NextResponse.redirect(url);
  }
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    // Skip all API routes
    // Skip all static files (images, fonts, etc.)
    "/((?!api|_next/static|_next/image|favicon.ico|team|.*\\.(?:png|jpg|jpeg|gif|svg|webp|ico|css|js|woff|woff2|ttf|eot)).*)",
  ],
};
