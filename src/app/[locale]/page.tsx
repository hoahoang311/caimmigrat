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
  MessageCircle,
  Phone,
  Shield,
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
        className="relative bg-gradient-to-br from-primary/5 to-primary/10 py-20 lg:py-32"
        style={{
          minHeight: "100vh",
        }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-12 items-center">
            <div className="space-y-8 text-center max-w-4xl">
              <div className="space-y-4">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
                  {t("hero.title")}
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  {t("hero.subtitle")}
                </p>
              </div>

              <div className="relative w-full h-[500px]">
                <Image
                  src="/landing_page.jpeg"
                  alt="ICBM Law"
                  fill
                  className="object-contain rounded-lg w-full"
                  priority
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-200 max-w-2xl mx-auto">
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#D9BA4E]">5000+</div>
                  <div className="text-sm text-gray-600">
                    {t("stats.applications")}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#D9BA4E]">10+</div>
                  <div className="text-sm text-gray-600">
                    {t("stats.experience")}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#D9BA4E]">98%</div>
                  <div className="text-sm text-gray-600">
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

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-8">
            <h2 className="text-3xl font-bold text-primary sm:text-4xl">
              {t("cta.title")}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t("cta.subtitle")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-white hover:bg-gray-100 text-primary"
              >
                <Link href={`${locale}/contact`}>
                  {t("cta.ask_question")}
                  <MessageCircle className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                className="bg-primary hover:bg-primary/90 text-white border-none shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Link href="tel:+14166392655" className="flex items-center">
                  <Phone className="mr-2 h-5 w-5" />
                  {t("cta.call_now")}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
