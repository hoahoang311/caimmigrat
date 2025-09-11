"use client";

import { Button } from "@/components/ui/button";
import ICBMLogo from "@/components/ui/ICBMLogo";
import { createClientComponentClient } from "@/lib/auth";
import { LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
export default function Navbar() {
  const supabase = createClientComponentClient();
  const pathname = usePathname();

  const isAdminDashboard = pathname.startsWith("/admin/dashboard");

  const handleLogout = async () => {
    try {
      // Call our API route to properly clear cookies
      const response = await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include", // Include cookies in request
      });

      if (response.ok) {
        // Also clear client-side auth state
        await supabase.auth.signOut();

        // Force reload to clear any cached state
        window.location.href = "/admin/login";
      } else {
        console.error("Logout API call failed");
        // Fallback: just redirect even if API failed
        window.location.href = "/admin/login";
      }
    } catch (error) {
      console.error("Logout failed:", error);
      // Fallback: redirect even if logout failed
      window.location.href = "/admin/login";
    }
  };

  // Admin header - simplified
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <ICBMLogo size="md" />
              <span className="text-xl font-bold text-foreground">
                ICBM Law
              </span>
            </Link>
          </div>

          {/* Logout Button */}
          {isAdminDashboard && (
            <div className="flex items-center">
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="flex items-center space-x-2"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </Button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
