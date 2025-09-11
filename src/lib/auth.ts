import { createBrowserClient } from "@supabase/ssr";

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

// Client-side Supabase client (for components) - Updated for SSR compatibility
export const createClientComponentClient = () => {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
};
