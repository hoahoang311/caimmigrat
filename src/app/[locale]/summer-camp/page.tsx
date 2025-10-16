import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Camera, Globe, GraduationCap } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import dynamic from "next/dynamic";
import { Suspense } from "react";

// Lazy load SummerCampRegistrationForm component
const SummerCampRegistrationForm = dynamic(
  () => import("@/components/forms/SummerCampRegistrationForm"),
  {
    loading: () => (
      <section className="py-20 bg-gradient-to-br from-primary/5 to-primary/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <div className="h-10 bg-gray-200 rounded w-96 mx-auto animate-pulse" />
            <div className="h-6 bg-gray-200 rounded w-64 mx-auto animate-pulse" />
          </div>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {[1, 2].map((i) => (
              <div
                key={i}
                className="h-96 bg-gray-200 rounded-lg animate-pulse"
              />
            ))}
          </div>
        </div>
      </section>
    ),
  }
);

export const metadata: Metadata = {
  title: "Toronto Summer Camp 2026 - FIFA World Cup Special Edition | ICBM Law",
  description:
    "Join our Toronto Summer Camp 2026 during FIFA World Cup! English study, Canon Canada Arts Training, cultural exploration at University of Toronto for ages 8-17.",
  keywords:
    "Toronto summer camp, FIFA World Cup 2026, University of Toronto camp, Canon Canada arts program, international student camp, English ESL camp Canada",
};

export const revalidate = 60;

// Helper function to get why choose data
function getWhyChooseData() {
  return [
    {
      icon: GraduationCap,
      title: "Elite University Experience",
      description:
        "Discover the charm of a top university campus where tradition meets innovation. Interact with diverse global peers in engaging, interactive classes hosted right at the University of Toronto.",
    },
    {
      icon: Globe,
      title: "Cultural & Global Perspective",
      description:
        "Experience the richness of Canadian customs and traditions. Embark on memorable weekend journeys to iconic landmarks like Niagara Falls, broadening your global perspective and appreciation for culture.",
    },
    {
      icon: Camera,
      title: "Arts, Leadership & English Fluency",
      description:
        "Earn an Ontario Ministry of Education approved Certificate (Specialist High Skills Major) & Level 1 Certificate in Video Storytelling and Photography from Canon Canada, which essentially boost your academic profile and pave a pathway to study in Canada.",
    },
  ];
}

export default async function SummerCampPage() {
  const whyChoose = getWhyChooseData();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/10 to-[#D9BA4E]/20 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6">
            <div className="inline-block bg-[#D9BA4E] text-primary px-6 py-3 rounded-full text-sm font-bold mb-4 shadow-lg animate-pulse">
              ⚽ SPECIAL EDITION: FIFA WORLD CUP 2026 ⚽
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-red-600 sm:text-5xl lg:text-6xl">
              🍁 Toronto Summer Camp 🍁
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              June - July 2026 | International Students Aged 8 to 17
            </p>
            <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed">
              An unforgettable learning adventure blending{" "}
              <strong>immersive English study</strong>,{" "}
              <strong>cultural exploration</strong>, and the{" "}
              <strong>Canon Canada Arts Training Program</strong>, hosted at the
              iconic <strong>University of Toronto</strong>.
            </p>

            {/* Partner Logos */}
            <div className="pt-8">
              <p className="text-sm text-gray-500 mb-6">In Partnership With</p>
              <TooltipProvider>
                <div className="flex flex-wrap justify-center items-stretch gap-8 md:gap-12">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="relative w-48 h-32 hover:grayscale transition-all cursor-pointer">
                        <Image
                          src="/camp/partner-logo-1.jpg"
                          alt="University of Toronto"
                          fill
                          className="object-contain"
                          sizes="192px"
                          loading="lazy"
                          quality={90}
                        />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>University of Toronto</p>
                    </TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="relative w-48 h-32 hover:grayscale transition-all cursor-pointer">
                        <Image
                          src="/camp/partner-logo-2.jpg"
                          alt="Canon Canada"
                          fill
                          className="object-contain"
                          sizes="192px"
                          loading="lazy"
                          quality={90}
                        />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Canon Canada</p>
                    </TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="relative w-48 h-32 hover:grayscale transition-all cursor-pointer">
                        <Image
                          src="/camp/partner-logo-3.jpg"
                          alt="FIFA World Cup 2026"
                          fill
                          className="object-contain"
                          sizes="192px"
                          loading="lazy"
                          quality={90}
                        />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>CANADA-VIETNAM CULTURAL AND EDUCATIONAL COUNCIL</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </TooltipProvider>
            </div>

            {/* Summer Camp Cover Image */}
            <div className="mt-12">
              <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/camp/camp_cover.jpeg"
                  alt="Toronto Summer Camp 2026 - FIFA World Cup Special Edition"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 90vw, 1280px"
                  quality={85}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">
              Shape the Future: Why Choose ICBM Summer Camp?
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {whyChoose.map((item, index) => (
              <Card
                key={index}
                className="text-center border-none shadow-lg hover:shadow-xl transition-shadow"
              >
                <CardHeader>
                  <div className="mx-auto w-16 h-16 bg-[#D9BA4E]/10 rounded-full flex items-center justify-center mb-4">
                    <item.icon className="h-8 w-8 text-[#D9BA4E]" />
                  </div>
                  <CardTitle className="text-xl">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">
                    {item.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Programs, Registration Form, and CTA Section */}
      <Suspense
        fallback={
          <section className="py-20 bg-gradient-to-br from-primary/5 to-primary/10">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="text-center space-y-4 mb-16">
                <div className="h-10 bg-gray-200 rounded w-96 mx-auto animate-pulse" />
                <div className="h-6 bg-gray-200 rounded w-64 mx-auto animate-pulse" />
              </div>
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                {[1, 2].map((i) => (
                  <div
                    key={i}
                    className="h-96 bg-gray-200 rounded-lg animate-pulse"
                  />
                ))}
              </div>
            </div>
          </section>
        }
      >
        <SummerCampRegistrationForm />
      </Suspense>
    </div>
  );
}
