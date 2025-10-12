import createIntlMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";

const intlMiddleware = createIntlMiddleware({
  locales: ["en", "vi"],
  defaultLocale: "en",
  localePrefix: "never",
});

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Skip internationalization for admin routes
  if (pathname.startsWith("/admin") || pathname.startsWith("/api")) {
    // Handle /admin route - redirect based on authentication status
    if (pathname.startsWith("/admin")) {
      console.log(
        "🔒 /admin accessed, checking authentication for redirect..."
      );

      // Check authentication and redirect accordingly
      const authResult = await checkAuthAndRedirect(
        pathname,
        request,
        "/admin/dashboard",
        "/admin/login"
      );
      return authResult;
    }

    return NextResponse.next();
  }

  // Apply internationalization middleware for all other routes
  return intlMiddleware(request);
}

// Helper function to check auth and redirect appropriately
async function checkAuthAndRedirect(
  pathname: string,
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
      console.log("✅ User authenticated");

      // If already on dashboard or other protected pages, allow access
      if (
        pathname.startsWith("/admin/dashboard") ||
        (pathname.startsWith("/admin/") && pathname !== "/admin/login")
      ) {
        return NextResponse.next();
      }

      // If on /admin root, redirect to dashboard
      if (pathname === "/admin") {
        url.pathname = authenticatedRedirect;
        return NextResponse.redirect(url);
      }
    } else {
      console.log("🚫 No user found");

      // If already on login page, allow access
      if (pathname === "/admin/login") {
        return NextResponse.next();
      }

      // Redirect to login
      url.pathname = unauthenticatedRedirect;
      return NextResponse.redirect(url);
    }

    return NextResponse.next();
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
