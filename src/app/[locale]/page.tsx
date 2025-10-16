import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Award, Shield, Users } from "lucide-react";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import HomeClient from "./HomeClient";

// Lazy load Testimonials component
const Testimonials = dynamic(() => import("@/components/Testimonials"), {
  loading: () => (
    <section className="py-20 bg-gradient-to-br from-primary/5 to-primary/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <div className="h-10 bg-gray-200 rounded w-64 mx-auto animate-pulse" />
          <div className="h-6 bg-gray-200 rounded w-96 mx-auto animate-pulse" />
        </div>
      </div>
    </section>
  ),
});

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "vi" }];
}

type Props = {
  params: Promise<{ locale: string }>;
};

export const revalidate = 60;

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  return {
    title: t("hero.title"),
    description: t("hero.subtitle"),
    other: {
      "link-preconnect": "https://calendly.com",
    },
  };
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  const features = [
    {
      icon: Users,
      title: t("features.expert_team.title"),
      description: t("features.expert_team.description"),
    },
    {
      icon: Award,
      title: t("features.proven_success.title"),
      description: t("features.proven_success.description"),
    },
    {
      icon: Shield,
      title: t("features.trusted_process.title"),
      description: t("features.trusted_process.description"),
    },
  ];

  return (
    <div className="flex flex-col min-h-screen overflow-auto">
      {/* Hero Section */}
      <section
        className="relative bg-gradient-to-br from-primary/5 to-primary/10 py-12 lg:py-16"
        style={{
          minHeight: "100vh",
        }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-12 items-center">
            <div className="space-y-8 text-center max-w-5xl">
              <div className="space-y-4">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl text-center">
                  {t("hero.title")}
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed text-center">
                  {t("hero.subtitle")}
                </p>
              </div>

              {/* Landing Image */}
              <div className="relative w-full h-[300px] lg:h-[500px] mb-8">
                <Image
                  src="/landing_page.jpeg"
                  alt="ICBM Law"
                  fill
                  className="object-contain rounded-lg w-full"
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 90vw, 1280px"
                  quality={85}
                />
              </div>

              {/* Call-to-Action Buttons */}
              <HomeClient
                locale={locale}
                ctaText={t("hero.cta")}
                bookConsultationText={t("nav.book_consultation")}
              />

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-6 pt-6 border-t border-gray-200 max-w-3xl mx-auto">
                <div className="text-center">
                  <div className="text-3xl lg:text-5xl font-bold text-[#D9BA4E]">
                    3000+
                  </div>
                  <div className="text-sm lg:text-base text-gray-600 mt-2">
                    {t("stats.applications")}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl lg:text-5xl font-bold text-[#D9BA4E]">
                    15+
                  </div>
                  <div className="text-sm lg:text-base text-gray-600 mt-2">
                    {t("stats.experience")}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl lg:text-5xl font-bold text-[#D9BA4E]">
                    96%
                  </div>
                  <div className="text-sm lg:text-base text-gray-600 mt-2">
                    {t("stats.success_rate")}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              {t("features.title")}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t("features.subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="text-center border-none shadow-lg hover:shadow-xl transition-shadow"
              >
                <CardHeader>
                  <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <feature.icon className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <Suspense
        fallback={
          <section className="py-20 bg-gradient-to-br from-primary/5 to-primary/10">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="text-center space-y-4 mb-16">
                <div className="h-10 bg-gray-200 rounded w-64 mx-auto animate-pulse" />
                <div className="h-6 bg-gray-200 rounded w-96 mx-auto animate-pulse" />
              </div>
              <div className="flex gap-4 overflow-hidden">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="flex-shrink-0 w-[350px] h-[580px] bg-gray-200 rounded-lg animate-pulse"
                  />
                ))}
              </div>
            </div>
          </section>
        }
      >
        <Testimonials />
      </Suspense>
    </div>
  );
}
