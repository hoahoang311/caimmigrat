import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Clock, Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import dynamic from "next/dynamic";
import { Suspense } from "react";

// Lazy load ContactForm component
const ContactForm = dynamic(() => import("@/components/forms/ContactForm"), {
  loading: () => (
    <Card className="w-full">
      <CardHeader>
        <div className="h-6 bg-gray-200 rounded w-48 animate-pulse" />
        <div className="h-4 bg-gray-200 rounded w-64 animate-pulse mt-2" />
      </CardHeader>
      <CardContent className="space-y-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-12 bg-gray-200 rounded animate-pulse" />
        ))}
      </CardContent>
    </Card>
  ),
});

export const revalidate = 60;

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  return {
    title: `${t("contact.page.title")} - ICBM Law`,
    description: t("contact.page.subtitle"),
    keywords:
      "contact immigration lawyer, Canadian immigration consultation, ICBM Law Toronto, immigration consultant contact, book consultation, immigration help",
  };
}

// Helper function to get contact info data
function getContactInfoData(t: any) {
  return [
    {
      icon: MapPin,
      title: t("contact.page.office_address"),
      details: ["240 Humberline Dr", "Toronto, ON M9W 5X1", "Canada"],
    },
    {
      icon: Phone,
      title: t("contact.page.phone"),
      details: ["+1 416-639-2655"],
      link: "tel:+14166392655",
    },
    {
      icon: Mail,
      title: t("contact.page.email"),
      details: ["info@icbmlaw.ca"],
      link: "mailto:info@icbmlaw.ca",
    },
    {
      icon: Clock,
      title: t("contact.page.business_hours"),
      details: [
        t("contact.page.business_hours_details.0"),
        t("contact.page.business_hours_details.1"),
      ],
    },
  ];
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  const contactInfo = getContactInfoData(t);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/5 to-primary/10 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              {t("contact.page.title")}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t("contact.page.subtitle")}
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information Cards */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {contactInfo.map((info, index) => (
              <Card
                key={index}
                className="text-center hover:shadow-lg transition-shadow"
              >
                <CardHeader>
                  <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-3">
                    <info.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{info.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-1">
                    {info.details.map((detail, detailIndex) => (
                      <p
                        key={detailIndex}
                        className="text-sm text-muted-foreground"
                      >
                        {info.link && detailIndex === 0 ? (
                          <a
                            href={info.link}
                            className="text-primary hover:underline"
                          >
                            {detail}
                          </a>
                        ) : (
                          detail
                        )}
                      </p>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form and Map Section */}
      <section className="py-20 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            {/* Contact Form */}
            <div>
              <Suspense
                fallback={
                  <Card className="w-full">
                    <CardHeader>
                      <div className="h-6 bg-gray-200 rounded w-48 animate-pulse" />
                      <div className="h-4 bg-gray-200 rounded w-64 animate-pulse mt-2" />
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {[1, 2, 3, 4].map((i) => (
                        <div
                          key={i}
                          className="h-12 bg-gray-200 rounded animate-pulse"
                        />
                      ))}
                    </CardContent>
                  </Card>
                }
              >
                <ContactForm />
              </Suspense>
            </div>

            {/* Map and Additional Info */}
            <div className="space-y-8">
              {/* Google Maps Embed */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <MapPin className="h-6 w-6 text-primary" />
                    <span>{t("contact.page.location_title")}</span>
                  </CardTitle>
                  <CardDescription>
                    {t("contact.page.location_description")}
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="aspect-[4/3] w-full rounded-lg overflow-hidden">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2886.159537859618!2d-79.58470682471452!3d43.63749825695164!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882b39c76b9b1c9b%3A0x1c5c8a4c7f4b2e3a!2s240%20Humberline%20Dr%2C%20Etobicoke%2C%20ON%20M9W%205X1%2C%20Canada!5e0!3m2!1sen!2sus!4v1703628000000!5m2!1sen!2sus"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="ICBM Law Office Location"
                    ></iframe>
                  </div>
                </CardContent>
              </Card>

              {/* Additional Information */}
              <Card>
                <CardHeader>
                  <CardTitle>{t("contact.page.visit_office_title")}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-sm text-muted-foreground">
                    <li className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 bg-[#D9BA4E] rounded-full mt-2 flex-shrink-0"></div>
                      <span>{t("contact.page.visit_office_benefits.0")}</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 bg-[#D9BA4E] rounded-full mt-2 flex-shrink-0"></div>
                      <span>{t("contact.page.visit_office_benefits.1")}</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 bg-[#D9BA4E] rounded-full mt-2 flex-shrink-0"></div>
                      <span>{t("contact.page.visit_office_benefits.2")}</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 bg-[#D9BA4E] rounded-full mt-2 flex-shrink-0"></div>
                      <span>{t("contact.page.visit_office_benefits.3")}</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* Emergency Contact */}
              <Card className="border-primary/20 bg-primary/5">
                <CardHeader>
                  <CardTitle className="text-primary">
                    {t("contact.page.urgent_assistance_title")}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-700 mb-3">
                    {t("contact.page.urgent_assistance_description")}
                  </p>
                  <a
                    href="tel:+14166392655"
                    className="inline-flex items-center space-x-2 text-primary font-medium hover:underline"
                  >
                    <Phone className="h-4 w-4" />
                    <span>+1 416-639-2655</span>
                  </a>
                </CardContent>
              </Card>

              {/* Social Media */}
              <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
                <CardHeader>
                  <CardTitle className="text-primary flex items-center space-x-2">
                    <span>{t("contact.page.follow_us_title")}</span>
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    {t("contact.page.follow_us_description")}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex space-x-4">
                    <a
                      href="https://www.facebook.com/profile.php?id=61581800467455"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-white rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:scale-110 group"
                      aria-label="Facebook"
                    >
                      <Facebook className="h-6 w-6 text-primary group-hover:text-primary/80" />
                    </a>
                    <a
                      href="https://www.instagram.com/icbm.law.ca/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-white rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:scale-110 group"
                      aria-label="Instagram"
                    >
                      <Instagram className="h-6 w-6 text-[#D9BA4E] group-hover:text-[#c9a83e]" />
                    </a>
                    <a
                      href="https://www.tiktok.com/@icbm.law.ca"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-white rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:scale-110 group"
                      aria-label="TikTok"
                    >
                      <svg
                        className="h-6 w-6 text-black group-hover:text-gray-800"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-.88-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" />
                      </svg>
                    </a>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl font-bold text-gray-900">
              {t("contact.page.faq_title")}
            </h2>
            <p className="text-lg text-gray-600">
              {t("contact.page.faq_description")}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {[0, 1, 2, 3].map((index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg">
                    {t(`contact.page.faq_items.${index}.question`)}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {t(`contact.page.faq_items.${index}.answer`)}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
