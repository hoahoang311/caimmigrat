"use client";

import { Button } from "@/components/ui/button";
import ICBMLogo from "@/components/ui/ICBMLogo";
import { createClientComponentClient } from "@/lib/auth";
import { LogOut, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "About Us", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  // Check if we're on an admin route (except /admin and /admin/login)
  const isAdminRoute = pathname.startsWith("/admin/dashboard");

  const supabase = createClientComponentClient();

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
  if (isAdminRoute) {
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
          </div>
        </div>
      </nav>
    );
  }

  // Regular website header
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

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground hover:bg-muted"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button asChild className="bg-blue-600 hover:bg-blue-700">
              <Link href="/contact">Get Started</Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="border-t px-2 pb-3 pt-2 sm:px-3">
            <div className="space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block rounded-md px-3 py-2 text-base font-medium text-muted-foreground transition-colors hover:text-foreground hover:bg-muted"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="px-3 py-2">
                <Button
                  asChild
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  <Link href="/contact" onClick={() => setIsMenuOpen(false)}>
                    Get Started
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
