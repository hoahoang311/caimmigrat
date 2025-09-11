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
import Link from "next/link";

export const metadata: Metadata = {
  title: "Immigration Services - ICBM Law",
  description:
    "Comprehensive Canadian immigration services including temporary visas, study permits, skilled worker programs, investor programs, sponsorship, and specialized legal services.",
  keywords:
    "Canadian immigration services, temporary visa, study permit, express entry, PNP, investor programs, sponsorship, immigration appeals",
};

const services = [
  {
    id: "temporary-visa",
    icon: Plane,
    title: "Temporary Resident Visa",
    description: "Complete visa services for temporary stays in Canada",
    services: [
      "Tourist Visa",
      "Super Visa (for parents/grandparents)",
      "Medical Visa",
      "Exploratory Visa for Investors",
    ],
    color: "bg-white border-gray-200",
    iconColor: "text-blue-600",
  },
  {
    id: "study",
    icon: GraduationCap,
    title: "Study Programs",
    description: "Educational pathway guidance and study permit assistance",
    services: [
      "School & Program Selection Guidance",
      "Study Permit Applications",
      "Summer Camp Programs",
      "Winter Camp Programs",
    ],
    color: "bg-white border-gray-200",
    iconColor: "text-green-600",
  },
  {
    id: "skilled-worker",
    icon: Briefcase,
    title: "Skilled Worker Programs",
    description: "Permanent residence pathways for skilled professionals",
    services: [
      "Express Entry System",
      "Provincial Nominee Programs (PNP)",
      "Atlantic Immigration Program (AIP)",
      "Rural & Northern Immigration Pilot (RNIP)",
      "Home Support Caregiver Program",
      "LMIA & LMIA-exempt Work Permits",
      "Vulnerable Open Work Permit (VOWP)",
      "Charitable & Religious Work Permits",
    ],
    color: "bg-white border-gray-200",
    iconColor: "text-purple-600",
  },
  {
    id: "investors",
    icon: TrendingUp,
    title: "Investor Programs",
    description: "Business and investment immigration pathways",
    services: [
      "Provincial Investor Programs (BC, AB, SK, MB, ON, NB, NS, PEI, NL)",
      "Start-up Visa Program (SUV)",
      "Self-employed Persons Program (C11)",
      "Intra-Company Transfer (C12)",
      "Special Programs (No English requirement for direct PR/Work Permit)",
    ],
    color: "bg-white border-gray-200",
    iconColor: "text-orange-600",
  },
  {
    id: "sponsorship",
    icon: Heart,
    title: "Family Sponsorship",
    description: "Reunite with your loved ones in Canada",
    services: [
      "Spousal & Partner Sponsorship",
      "Parent & Grandparent Sponsorship",
      "Dependent Children Sponsorship",
      "Refugee Hearing & Appeals",
      "Humanitarian & Compassionate Applications",
    ],
    color: "bg-white border-gray-200",
    iconColor: "text-pink-600",
  },
  {
    id: "special-services",
    icon: Shield,
    title: "Specialized Legal Services",
    description: "Complex immigration matters and appeals",
    services: [
      "Visa Refusal Review & Appeals",
      "Federal Court Judicial Reviews",
      "Procedural Fairness Letters",
      "Removal Order Appeals",
      "Authorization to Return (ARC)",
      "Reconsideration Requests",
      "Criminal Rehabilitation",
      "Permanent Resident Travel Document (PRTD)",
      "CBSA Matters & Detention Reviews",
    ],
    color: "bg-white border-gray-200",
    iconColor: "text-red-600",
  },
];

const whyChooseUs = [
  {
    icon: Users,
    title: "Expert Team",
    description:
      "Certified immigration consultants with 16+ years combined experience",
  },
  {
    icon: Award,
    title: "High Success Rate",
    description:
      "Proven track record with thousands of successful applications",
  },
  {
    icon: Globe,
    title: "Comprehensive Services",
    description: "Full spectrum of immigration services under one roof",
  },
  {
    icon: Scale,
    title: "Legal Expertise",
    description: "Licensed paralegals handling complex legal matters",
  },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-700">
        <div className="container mx-auto px-6">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Comprehensive Immigration Services
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto opacity-90">
              From temporary visits to permanent residence, we provide expert
              guidance for all your Canadian immigration needs
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
                  Book Consultation
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                className="bg-green-600 hover:bg-green-700 text-white border-none shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Link href="tel:+14169927429" className="flex items-center">
                  <Phone className="mr-2 h-5 w-5" />
                  Call Us Now
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
              Our Services
            </h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto mb-6"></div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We offer comprehensive immigration services to help you achieve
              your Canadian dreams
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
              Why Choose ICBM Law?
            </h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto mb-6"></div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our commitment to excellence and client success sets us apart
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
              Special Investment Programs
            </h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90">
              Exclusive programs that don&#39;t require English proficiency and
              offer direct pathways to Permanent Residence or Work Permits for
              qualified investors
            </p>
            <div className="grid gap-4 md:grid-cols-3 max-w-4xl mx-auto">
              <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                <h3 className="font-semibold mb-2">No English Requirement</h3>
                <p className="text-sm opacity-90">Special pathways available</p>
              </div>
              <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                <h3 className="font-semibold mb-2">Direct PR Access</h3>
                <p className="text-sm opacity-90">
                  Fast-track to permanent residence
                </p>
              </div>
              <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                <h3 className="font-semibold mb-2">Work Permit Options</h3>
                <p className="text-sm opacity-90">
                  Immediate work authorization
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
              Ready to Start Your Immigration Journey?
            </h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90">
              Our experienced team is here to guide you through every step of
              the process. Contact us today for a personalized consultation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-white text-blue-600 hover:bg-gray-100"
              >
                <Link href="/contact">
                  <FileText className="mr-2 h-5 w-5" />
                  Get Started Today
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
                  Schedule Consultation
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
