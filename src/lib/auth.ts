import { createClient } from "@supabase/supabase-js";

export interface SupabaseJWT {
  iss: string; // Issuer URL
  sub: string; // User ID (UUID)
  aud: string; // Audience (usually "authenticated")
  exp: number; // Expiration timestamp (Unix)
  iat: number; // Issued-at timestamp (Unix)
  email: string;
  phone: string;
  app_metadata: {
    provider: string;
    providers: string[];
  };
  user_metadata: {
    email_verified: boolean;
    [key: string]: unknown; // optional additional user metadata
  };
  role: string; // default is "authenticated"
  aal: string; // Authentication assurance level
  amr: Array<{
    method: string;
    timestamp: number;
  }>;
  session_id: string;
  is_anonymous: boolean;
  [key: string]: unknown; // For any additional properties
}

// Client-side Supabase client (for components)
export const createClientComponentClient = () => {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
};
// src/lib/auth.ts
import { createServerClient } from "@supabase/ssr";
import { jwtDecode } from "jwt-decode";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";

export async function isAdmin(cookieStore: ReadonlyRequestCookies) {
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, // or PUBLISHABLE_KEY
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // Setting cookies inside a server component often fails (read-only cookies).
            // This is fine for "read only" auth checks like isAdmin.
          }
        },
      },
    }
  );

  try {
    const { data } = await supabase.auth.getUser();

    console.log(data);

    if (!data.user) return false;

    return true;
  } catch (err) {
    console.log(err);
  }
  return false;
}

export async function isAdminCookie(cookieStore: ReadonlyRequestCookies) {
  const cookie = cookieStore.get("sb-zctgdjbnhemafclreflg-auth-token");

  if (!cookie) return false;

  const [accessToken] = JSON.parse(cookie.value);
  const decoded: SupabaseJWT = jwtDecode(accessToken);

  return decoded.role === "authenticated";
}
