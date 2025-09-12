import HeroImage from "@/components/HeroImage";
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
  CheckCircle,
  MessageCircle,
  Phone,
  Shield,
  Users,
} from "lucide-react";
import { getTranslations } from "next-intl/server";
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

  const immigrationPrograms = [
    {
      title: t("services.express_entry.title"),
      description: t("services.express_entry.description"),
      benefits: [
        t("services.express_entry.benefits.0"),
        t("services.express_entry.benefits.1"),
        t("services.express_entry.benefits.2"),
      ],
    },
    {
      title: t("services.pnp.title"),
      description: t("services.pnp.description"),
      benefits: [
        t("services.pnp.benefits.0"),
        t("services.pnp.benefits.1"),
        t("services.pnp.benefits.2"),
      ],
    },
    {
      title: t("services.family_sponsorship.title"),
      description: t("services.family_sponsorship.description"),
      benefits: [
        t("services.family_sponsorship.benefits.0"),
        t("services.family_sponsorship.benefits.1"),
        t("services.family_sponsorship.benefits.2"),
      ],
    },
  ];
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section
        className="relative bg-gradient-to-br from-blue-50 to-indigo-100 py-20 lg:py-32"
        style={{
          background: "linear-gradient(135deg, #dbeafe 0%, #e0e7ff 100%)",
          minHeight: "100vh",
        }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-8 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
                  {t("hero.title")}
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  {t("hero.subtitle")}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  asChild
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <Link href={`${locale}/contact`}>
                    {t("hero.cta")}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
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
              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-200">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">5000+</div>
                  <div className="text-sm text-gray-600">
                    {t("stats.applications")}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">10+</div>
                  <div className="text-sm text-gray-600">
                    {t("stats.experience")}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">98%</div>
                  <div className="text-sm text-gray-600">
                    {t("stats.success_rate")}
                  </div>
                </div>
              </div>
            </div>

            <HeroImage />
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
                  <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                    <feature.icon className="h-8 w-8 text-blue-600" />
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

      {/* Immigration Programs Section */}
      <section className="py-20 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              {t("services.programs_title")}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t("services.programs_subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {immigrationPrograms.map((program, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-xl text-blue-600">
                    {program.title}
                  </CardTitle>
                  <CardDescription className="text-base">
                    {program.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {program.benefits.map((benefit, benefitIndex) => (
                      <li
                        key={benefitIndex}
                        className="flex items-center space-x-2"
                      >
                        <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-8">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              {t("cta.title")}
            </h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              {t("cta.subtitle")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="secondary">
                <Link href={`${locale}/contact`}>
                  {t("cta.ask_question")}
                  <MessageCircle className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                className="bg-green-600 hover:bg-green-700 text-white border-none shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Link href="tel:+14169927429" className="flex items-center">
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
