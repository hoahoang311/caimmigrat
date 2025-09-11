import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
  console.log('🔍 DEBUG: All cookies from request:', request.cookies.getAll());
  
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          const cookies = request.cookies.getAll();
          console.log('🔍 DEBUG: Supabase getAll() called, returning:', cookies);
          return cookies;
        },
        setAll(cookiesToSet) {
          console.log('🔍 DEBUG: Supabase setAll() called with:', cookiesToSet);
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) => {
            // Set proper cookie options for production
            const cookieOptions = {
              ...options,
              secure: process.env.NODE_ENV === "production",
              sameSite: "lax" as const,
              httpOnly: false, // Needed for client-side access
            };
            console.log(`🔍 DEBUG: Setting cookie ${name} with value ${value?.substring(0,20)}...`);
            supabaseResponse.cookies.set(name, value, cookieOptions);
          });
        },
      },
    }
  );

  // IMPORTANT: Avoid writing any logic between createServerClient and
  // supabase.auth.getUser(). A simple mistake could make it very hard to debug
  // issues with users being randomly logged out.

  const {
    data: { user },
    error
  } = await supabase.auth.getUser();

  console.log('🔍 DEBUG: supabase.auth.getUser() result:', { user: user?.id, error });

  if (!user) {
    console.log('🚫 No user found, redirecting to login');
    // No user, redirect to login
    const url = request.nextUrl.clone();
    url.pathname = "/admin/login";
    return NextResponse.redirect(url);
  }
  
  console.log('✅ User authenticated:', user.email);

  // IMPORTANT: You *must* return the supabaseResponse object as it is. If you're
  // creating a new response object with NextResponse.next() make sure to:
  // 1. Pass the request in it, like so:
  //    const myNewResponse = NextResponse.next({ request })
  // 2. Copy over the cookies, like so:
  //    myNewResponse.cookies.setAll(supabaseResponse.cookies.getAll())
  // 3. Change the myNewResponse object to fit your needs, but avoid changing
  //    the cookies!
  // 4. Finally:
  //    return myNewResponse
  // If this is not done, you may be causing the browser and server to go out
  // of sync and terminate the user's session prematurely!

  return supabaseResponse;
}
