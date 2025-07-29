import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "CAimmigrat - Your Canadian Immigration Partner",
  description: "Expert Canadian immigration services. We are a team of immigration lawyers, consultants, and experts ready to assist you with your Canadian immigration application.",
  keywords: "Canadian immigration, Express Entry, PNP, Family Sponsorship, Immigration lawyer, Immigration consultant, Canada visa",
  authors: [{ name: "CAimmigrat Team" }],
  openGraph: {
    title: "CAimmigrat - Your Canadian Immigration Partner",
    description: "Expert Canadian immigration services with proven success rates.",
    url: "https://caimmigrat.com",
    siteName: "CAimmigrat",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CAimmigrat - Your Canadian Immigration Partner",
    description: "Expert Canadian immigration services with proven success rates.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased">
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}