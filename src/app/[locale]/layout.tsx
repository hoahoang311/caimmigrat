import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import { locales } from "@/i18n";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  title: "ICBM Law - Your Canadian Immigration Partner",
  description:
    "Expert Canadian immigration services. We are a team of immigration lawyers, consultants, and experts ready to assist you with your Canadian immigration application.",
  keywords:
    "Canadian immigration, Express Entry, PNP, Family Sponsorship, Immigration lawyer, Immigration consultant, Canada visa",
  authors: [{ name: "ICBM Law Team" }],
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/icbm-logo.svg",
  },
  openGraph: {
    title: "ICBM Law - Your Canadian Immigration Partner",
    description:
      "Expert Canadian immigration services with proven success rates.",
    url: "https://icbmlaw.com",
    siteName: "ICBM Law",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ICBM Law - Your Canadian Immigration Partner",
    description:
      "Expert Canadian immigration services with proven success rates.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!locales.includes(locale as "en" | "vi")) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages({ locale });

  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      <Navbar />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </NextIntlClientProvider>
  );
}
