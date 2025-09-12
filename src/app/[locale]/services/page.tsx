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
  Briefcase,
  Building,
  Calendar,
  CheckCircle,
  FileText,
  Globe,
  GraduationCap,
  Heart,
  Phone,
  Plane,
  Scale,
  Shield,
  TrendingUp,
  Users,
} from "lucide-react";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Immigration Services - ICBM Law",
  description:
    "Comprehensive Canadian immigration services including temporary visas, study permits, skilled worker programs, investor programs, sponsorship, and specialized legal services.",
  keywords:
    "Canadian immigration services, temporary visa, study permit, express entry, PNP, investor programs, sponsorship, immigration appeals",
};

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function ServicesPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  const services = [
    {
      id: "temporary-visa",
      icon: Plane,
      title: t("services.service_categories.temporary_visa.title"),
      description: t("services.service_categories.temporary_visa.description"),
      services: [
        t("services.service_categories.temporary_visa.services.0"),
        t("services.service_categories.temporary_visa.services.1"),
        t("services.service_categories.temporary_visa.services.2"),
        t("services.service_categories.temporary_visa.services.3"),
      ],
      color: "bg-white border-gray-200",
      iconColor: "text-blue-600",
    },
    {
      id: "study",
      icon: GraduationCap,
      title: t("services.service_categories.study.title"),
      description: t("services.service_categories.study.description"),
      services: [
        t("services.service_categories.study.services.0"),
        t("services.service_categories.study.services.1"),
        t("services.service_categories.study.services.2"),
        t("services.service_categories.study.services.3"),
      ],
      color: "bg-white border-gray-200",
      iconColor: "text-green-600",
    },
    {
      id: "skilled-worker",
      icon: Briefcase,
      title: t("services.service_categories.skilled_worker.title"),
      description: t("services.service_categories.skilled_worker.description"),
      services: [
        t("services.service_categories.skilled_worker.services.0"),
        t("services.service_categories.skilled_worker.services.1"),
        t("services.service_categories.skilled_worker.services.2"),
        t("services.service_categories.skilled_worker.services.3"),
        t("services.service_categories.skilled_worker.services.4"),
        t("services.service_categories.skilled_worker.services.5"),
        t("services.service_categories.skilled_worker.services.6"),
        t("services.service_categories.skilled_worker.services.7"),
      ],
      color: "bg-white border-gray-200",
      iconColor: "text-purple-600",
    },
    {
      id: "investors",
      icon: TrendingUp,
      title: t("services.service_categories.investors.title"),
      description: t("services.service_categories.investors.description"),
      services: [
        t("services.service_categories.investors.services.0"),
        t("services.service_categories.investors.services.1"),
        t("services.service_categories.investors.services.2"),
        t("services.service_categories.investors.services.3"),
        t("services.service_categories.investors.services.4"),
      ],
      color: "bg-white border-gray-200",
      iconColor: "text-orange-600",
    },
    {
      id: "sponsorship",
      icon: Heart,
      title: t("services.service_categories.sponsorship.title"),
      description: t("services.service_categories.sponsorship.description"),
      services: [
        t("services.service_categories.sponsorship.services.0"),
        t("services.service_categories.sponsorship.services.1"),
        t("services.service_categories.sponsorship.services.2"),
        t("services.service_categories.sponsorship.services.3"),
        t("services.service_categories.sponsorship.services.4"),
      ],
      color: "bg-white border-gray-200",
      iconColor: "text-pink-600",
    },
    {
      id: "special-services",
      icon: Shield,
      title: t("services.service_categories.special_services.title"),
      description: t(
        "services.service_categories.special_services.description"
      ),
      services: [
        t("services.service_categories.special_services.services.0"),
        t("services.service_categories.special_services.services.1"),
        t("services.service_categories.special_services.services.2"),
        t("services.service_categories.special_services.services.3"),
        t("services.service_categories.special_services.services.4"),
        t("services.service_categories.special_services.services.5"),
        t("services.service_categories.special_services.services.6"),
        t("services.service_categories.special_services.services.7"),
        t("services.service_categories.special_services.services.8"),
      ],
      color: "bg-white border-gray-200",
      iconColor: "text-red-600",
    },
  ];

  const whyChooseUs = [
    {
      icon: Users,
      title: t("services.why_choose.expert_team.title"),
      description: t("services.why_choose.expert_team.description"),
    },
    {
      icon: Award,
      title: t("services.why_choose.success_rate.title"),
      description: t("services.why_choose.success_rate.description"),
    },
    {
      icon: Globe,
      title: t("services.why_choose.comprehensive.title"),
      description: t("services.why_choose.comprehensive.description"),
    },
    {
      icon: Scale,
      title: t("services.why_choose.legal_expertise.title"),
      description: t("services.why_choose.legal_expertise.description"),
    },
  ];
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-700">
        <div className="container mx-auto px-6">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {t("services.page.title")}
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto opacity-90">
              {t("services.page.subtitle")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-white text-blue-600 hover:bg-gray-100"
              >
                <Link
                  href="https://calendly.com/icbmlaw"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Calendar className="mr-2 h-5 w-5" />
                  {t("services.page.book_consultation")}
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

      {/* Services Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {t("services.page.section_title")}
            </h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto mb-6"></div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {t("services.page.section_subtitle")}
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <Card
                key={service.id}
                className={`${service.color} hover:shadow-lg transition-shadow duration-300`}
              >
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 mx-auto bg-white rounded-full flex items-center justify-center mb-4 shadow-md">
                    <service.icon className={`h-8 w-8 ${service.iconColor}`} />
                  </div>
                  <CardTitle className="text-xl text-gray-900">
                    {service.title}
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {service.services.map((item, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <CheckCircle
                          className={`h-4 w-4 mt-0.5 flex-shrink-0 ${service.iconColor}`}
                        />
                        <span className="text-sm text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {t("services.page.why_choose_title")}
            </h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto mb-6"></div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {t("services.page.why_choose_subtitle")}
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {whyChooseUs.map((item, index) => (
              <Card
                key={index}
                className="text-center bg-white hover:shadow-lg transition-shadow duration-300"
              >
                <CardHeader>
                  <div className="w-16 h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-4">
                    <item.icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Special Programs Highlight */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-teal-600">
        <div className="container mx-auto px-6">
          <div className="text-center text-white">
            <Building className="h-16 w-16 mx-auto mb-6 opacity-80" />
            <h2 className="text-3xl font-bold mb-4">
              {t("services.page.special_programs_title")}
            </h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90">
              {t("services.page.special_programs_subtitle")}
            </p>
            <div className="grid gap-4 md:grid-cols-3 max-w-4xl mx-auto">
              <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                <h3 className="font-semibold mb-2">
                  {t("services.special_features.no_english.title")}
                </h3>
                <p className="text-sm opacity-90">
                  {t("services.special_features.no_english.description")}
                </p>
              </div>
              <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                <h3 className="font-semibold mb-2">
                  {t("services.special_features.direct_pr.title")}
                </h3>
                <p className="text-sm opacity-90">
                  {t("services.special_features.direct_pr.description")}
                </p>
              </div>
              <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                <h3 className="font-semibold mb-2">
                  {t("services.special_features.work_permit.title")}
                </h3>
                <p className="text-sm opacity-90">
                  {t("services.special_features.work_permit.description")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="container mx-auto px-6">
          <div className="text-center text-white">
            <h2 className="text-3xl font-bold mb-4">
              {t("services.page.cta_title")}
            </h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90">
              {t("services.page.cta_subtitle")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-white text-blue-600 hover:bg-gray-100"
              >
                <Link href={`${locale}/contact`}>
                  <FileText className="mr-2 h-5 w-5" />
                  {t("services.page.get_started")}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                <Link
                  href="https://calendly.com/icbmlaw"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Calendar className="mr-2 h-5 w-5" />
                  {t("services.page.schedule_consultation")}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
