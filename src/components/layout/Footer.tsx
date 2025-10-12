"use client";

import ICBMLogo from "@/components/shared/ICBMLogo";
import { Clock, Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Footer() {
  const [mounted, setMounted] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error" | "">("");
  const locale = useLocale();

  useEffect(() => {
    setMounted(true);
  }, []);

  const t = useTranslations();

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage("");
    setMessageType("");

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(t("newsletter.success"));
        setMessageType("success");
        setEmail("");
      } else {
        setMessage(data.error || t("newsletter.error"));
        setMessageType("error");
      }
    } catch (error) {
      console.log(error);
      setMessage(t("newsletter.error"));
      setMessageType("error");
    } finally {
      setIsSubmitting(false);
      // Clear message after 5 seconds
      setTimeout(() => {
        setMessage("");
        setMessageType("");
      }, 5000);
    }
  };

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

          {/* Newsletter Subscription */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white">
              {t("footer.newsletter_title")}
            </h3>
            <p className="text-sm text-white/80">
              {t("footer.newsletter_description")}
            </p>
            <form onSubmit={handleSubscribe} className="space-y-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t("newsletter.email_placeholder")}
                required
                disabled={isSubmitting}
                className="w-full px-4 py-2 rounded-md bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-[#D9BA4E] focus:border-transparent disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-4 py-2 bg-[#D9BA4E] text-primary font-semibold rounded-md hover:bg-[#C5A943] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting
                  ? t("newsletter.subscribing")
                  : t("newsletter.subscribe")}
              </button>
              {message && (
                <p
                  className={`text-sm ${
                    messageType === "success"
                      ? "text-green-300"
                      : "text-red-300"
                  }`}
                >
                  {message}
                </p>
              )}
            </form>
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
