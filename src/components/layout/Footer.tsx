"use client";

import ICBMLogo from "@/components/shared/ICBMLogo";
import { Clock, Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Footer() {
  const [mounted, setMounted] = useState(false);
  const locale = useLocale();

  useEffect(() => {
    setMounted(true);
  }, []);

  const t = useTranslations();

  if (!mounted) {
    return null;
  }
  return (
    <footer className="bg-primary text-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr]">
          {/* Company Logo */}
          <div className="flex flex-col justify-between space-y-6">
            <div className="flex items-center">
              <ICBMLogo size="xl" className="absolute -top-5 right-6" />
            </div>

            {/* Social Media Links */}
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com/profile.php?id=61581800467455"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-[#D9BA4E] transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://www.instagram.com/icbm.law.ca/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-[#D9BA4E] transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://www.tiktok.com/@icbm.law.ca"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-[#D9BA4E] transition-colors"
                aria-label="TikTok"
              >
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-.88-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Tagline */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white">About Us</h3>
            <p className="text-white/80 text-md leading-relaxed">
              {t("footer.tagline")}
            </p>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white">
              {t("footer.contact_info")}
            </h3>
            <div className="space-y-4 text-sm text-white/80">
              <div className="flex items-start space-x-3">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>
                  240 Humberline Dr
                  <br />
                  Toronto, ON M9W 5X1
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 flex-shrink-0" />
                <a
                  href="tel:+14166392655"
                  className="hover:text-[#D9BA4E] transition-colors"
                >
                  +1 416-639-2655
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 flex-shrink-0" />
                <a
                  href="mailto:info@icbmlaw.ca"
                  className="hover:text-[#D9BA4E] transition-colors"
                >
                  info@icbmlaw.ca
                </a>
              </div>
              <div className="flex items-start space-x-3">
                <Clock className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>{t("footer.business_hours")}</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white">Quick Links</h3>
            <div className="space-y-3 text-sm text-white/80">
              <Link
                href={`/${locale}`}
                className="block hover:text-[#D9BA4E] transition-colors"
              >
                Home
              </Link>
              <Link
                href={`/${locale}/services`}
                className="block hover:text-[#D9BA4E] transition-colors"
              >
                Services
              </Link>
              <Link
                href={`/${locale}/about`}
                className="block hover:text-[#D9BA4E] transition-colors"
              >
                About
              </Link>
              <Link
                href={`/${locale}/contact`}
                className="block hover:text-[#D9BA4E] transition-colors"
              >
                Contact
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Border */}
        <div className="mt-8 border-t border-white/20 pt-8">
          <div className="flex flex-col items-center justify-between space-y-4 sm:flex-row sm:space-y-0">
            <p className="text-sm text-white/60">
              {t("footer.copyright").replace(
                "2024",
                new Date().getFullYear().toString()
              )}
            </p>
            <div className="flex space-x-6 text-sm text-white/60">
              <Link
                href={`/${locale}/privacy`}
                className="hover:text-[#D9BA4E] transition-colors"
              >
                {t("footer.privacy_link")}
              </Link>
              <Link
                href={`/${locale}/terms`}
                className="hover:text-[#D9BA4E] transition-colors"
              >
                {t("footer.terms")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
