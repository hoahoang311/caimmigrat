import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  const cookieStore = await cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options) {
          const cookieOptions = {
            ...options,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax' as const,
            httpOnly: false,
          }
          cookieStore.set(name, value, cookieOptions);
        },
        remove(name: string, options) {
          const cookieOptions = {
            ...options,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax' as const,
            httpOnly: false,
            maxAge: 0
          }
          cookieStore.set(name, "", cookieOptions);
        },
      },
    }
  );

  const { error } = await supabase.auth.signOut();

  // Create response to set cookie headers
  const response = NextResponse.json({ success: true });

  // Manually clear all Supabase cookies
  const allCookies = cookieStore.getAll();
  const supabaseCookies = allCookies.filter(cookie => 
    cookie.name.startsWith('sb-') || 
    cookie.name.includes('supabase') ||
    cookie.name.includes('auth-token')
  );

  // Clear each Supabase cookie in both cookieStore and response headers
  supabaseCookies.forEach(cookie => {
    const clearOptions = {
      expires: new Date(0),
      maxAge: 0,
      path: '/',
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax' as const,
      httpOnly: false
    };
    
    // Clear in server cookie store
    cookieStore.set(cookie.name, '', clearOptions);
    
    // Clear in response headers (this is what actually clears client cookies)
    response.cookies.set(cookie.name, '', clearOptions);
  });

  // Also clear common Supabase cookie names that might exist
  const commonSupabaseCookieNames = [
    'sb-access-token',
    'sb-refresh-token', 
    'supabase-auth-token',
    'supabase.auth.token'
  ];

  commonSupabaseCookieNames.forEach(name => {
    const clearOptions = {
      expires: new Date(0),
      maxAge: 0,
      path: '/',
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax' as const,
      httpOnly: false
    };
    response.cookies.set(name, '', clearOptions);
  });

  if (error) {
    console.warn('Supabase signOut error (cookies still cleared):', error);
  }

  return response;
}
