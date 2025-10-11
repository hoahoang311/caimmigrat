import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ArrowRight,
  Award,
  Calendar,
  Quote,
  Shield,
  Star,
  Users,
} from "lucide-react";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import Link from "next/link";

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "vi" }];
}

type Props = {
  params: Promise<{ locale: string }>;
};

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
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section
        className="relative bg-gradient-to-br from-primary/5 to-primary/10 py-12 lg:py-16"
        style={{
          minHeight: "100vh",
        }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-full">
          <div className="flex flex-col justify-center items-center gap-8 h-full">
            <div className="w-full max-w-5xl">
              {/* Landing Image */}
              <div className="relative w-full h-[600px] lg:h-[700px] mb-8">
                <Image
                  src="/landing_page.jpeg"
                  alt="ICBM Law"
                  fill
                  className="object-contain rounded-lg w-full"
                  priority
                />
              </div>

              {/* Call-to-Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <Button
                  asChild
                  size="lg"
                  className="bg-[#D9BA4E] hover:bg-[#c9a83e] text-primary"
                >
                  <Link href={`${locale}/contact`}>
                    {t("hero.cta")}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-primary text-primary hover:bg-primary hover:text-white"
                >
                  <Link
                    href="https://calendly.com/icbmlaw"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Calendar className="mr-2 h-5 w-5" />
                    {t("nav.book_consultation")}
                  </Link>
                </Button>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-6 pt-6 border-t border-gray-200 max-w-3xl mx-auto">
                <div className="text-center">
                  <div className="text-3xl lg:text-4xl font-bold text-[#D9BA4E]">
                    3000+
                  </div>
                  <div className="text-sm lg:text-base text-gray-600 mt-2">
                    {t("stats.applications")}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl lg:text-4xl font-bold text-[#D9BA4E]">
                    20+
                  </div>
                  <div className="text-sm lg:text-base text-gray-600 mt-2">
                    {t("stats.experience")}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl lg:text-4xl font-bold text-[#D9BA4E]">
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
      <section className="py-20 bg-gradient-to-br from-primary/5 to-primary/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              {t("testimonials.title")}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t("testimonials.subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[0, 1, 2, 3, 4, 5].map((index) => (
              <Card
                key={index}
                className="bg-white border-none shadow-lg hover:shadow-xl transition-shadow"
              >
                <CardHeader>
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-5 w-5 fill-[#D9BA4E] text-[#D9BA4E]"
                      />
                    ))}
                  </div>
                  <Quote className="h-8 w-8 text-primary/20 mb-2" />
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-700 leading-relaxed">
                    {t(`testimonials.items.${index}.text`)}
                  </p>
                  <div className="border-t border-gray-200 pt-4">
                    <p className="font-semibold text-gray-900">
                      {t(`testimonials.items.${index}.name`)}
                    </p>
                    <p className="text-sm text-[#D9BA4E] font-medium">
                      {t(`testimonials.items.${index}.program`)}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
