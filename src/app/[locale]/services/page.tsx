import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Translation } from "@/types";
// Lucide icons - tree-shaken automatically, only imported icons are bundled
import {
  Award,
  Briefcase,
  Building,
  CheckCircle,
  Globe,
  GraduationCap,
  Heart,
  Plane,
  Scale,
  Shield,
  TrendingUp,
  Users,
} from "lucide-react";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import ServicesClient from "./ServicesClient";

type Props = {
  params: Promise<{ locale: string }>;
};

export const revalidate = 60;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  return {
    title: `${t("services.page.title")} - ICBM Law`,
    description: t("services.page.subtitle"),
    keywords:
      "Canadian immigration services, temporary visa, study permit, express entry, PNP, investor programs, sponsorship, immigration appeals",
  };
}

// Helper function to build services data
function getServicesData(t: Translation) {
  return [
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
      iconColor: "text-primary",
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
      iconColor: "text-primary",
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
        t("services.service_categories.skilled_worker.services.8"),
        t("services.service_categories.skilled_worker.services.9"),
        t("services.service_categories.skilled_worker.services.10"),
        t("services.service_categories.skilled_worker.services.11"),
      ],
      color: "bg-white border-gray-200",
      iconColor: "text-primary",
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
      iconColor: "text-[#D9BA4E]",
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
      iconColor: "text-primary",
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
        t("services.service_categories.special_services.services.9"),
      ],
      color: "bg-white border-gray-200",
      iconColor: "text-primary",
    },
  ];
}

// Helper function to build why choose us data
function getWhyChooseUsData(t: Translation) {
  return [
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
}

export default async function ServicesPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  // Build data using helper functions
  const services = getServicesData(t);
  const whyChooseUs = getWhyChooseUsData(t);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-primary/10">
      {/* Hero Section */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-6">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {t("services.page.title")}
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto opacity-90">
              {t("services.page.subtitle")}
            </p>
            <ServicesClient
              locale={locale}
              bookConsultationText={t("services.page.book_consultation")}
              callNowText={t("cta.call_now")}
            />
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
            <div className="w-24 h-1 bg-[#D9BA4E] mx-auto mb-6"></div>
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
            <div className="w-24 h-1 bg-[#D9BA4E] mx-auto mb-6"></div>
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
                  <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <item.icon className="h-8 w-8 text-primary" />
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
      <section className="py-20 bg-[#D9BA4E]">
        <div className="container mx-auto px-6">
          <div className="text-center text-primary">
            <Building className="h-16 w-16 mx-auto mb-6 opacity-80" />
            <h2 className="text-3xl font-bold mb-4">
              {t("services.page.special_programs_title")}
            </h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90">
              {t("services.page.special_programs_subtitle")}
            </p>
            <div className="grid gap-4 md:grid-cols-3 max-w-4xl mx-auto">
              <div className="bg-primary/10 rounded-lg p-4 backdrop-blur-sm">
                <h3 className="font-semibold mb-2">
                  {t("services.special_features.no_english.title")}
                </h3>
                <p className="text-sm opacity-90">
                  {t("services.special_features.no_english.description")}
                </p>
              </div>
              <div className="bg-primary/10 rounded-lg p-4 backdrop-blur-sm">
                <h3 className="font-semibold mb-2">
                  {t("services.special_features.direct_pr.title")}
                </h3>
                <p className="text-sm opacity-90">
                  {t("services.special_features.direct_pr.description")}
                </p>
              </div>
              <div className="bg-primary/10 rounded-lg p-4 backdrop-blur-sm">
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
    </div>
  );
}
