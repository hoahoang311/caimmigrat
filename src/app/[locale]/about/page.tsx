import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About Us - ICBM Law",
  description:
    "Learn about ICBM Law, a premier Canadian immigration consultancy founded by Moumita Chakraborty and Richard Brown with over 16 years of combined expertise.",
};

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-primary/10">
      <div className="container mx-auto px-6 py-16">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {t("about.page.title")}
          </h1>
          <div className="w-24 h-1 bg-[#D9BA4E] mx-auto mb-8"></div>
        </div>

        {/* Mission Statement */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-4">
              {t("about.page.mission_intro")}
            </p>
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-8">
              {t("about.page.mission_intro2")}
            </p>
            <div className="border-l-4 border-primary pl-6 mb-8">
              <p className="text-xl text-gray-800 font-medium italic">
                {t("about.page.mission_statement")}
              </p>
            </div>
            <p className="text-lg text-primary font-semibold text-center">
              {t("about.page.tagline")}
            </p>
          </div>
        </div>

        {/* Team Section */}
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            {t("about.page.team_title")}
          </h2>

          <div className="grid md:grid-cols-2 gap-8 md:gap-12 max-w-4xl mx-auto">
            {/* Moumita Chakraborty */}
            <div className="bg-white flex flex-col rounded-2xl shadow-xl overflow-hidden transform hover:scale-105 transition-transform duration-300">
              <div className="relative w-full h-[500px] bg-gradient-to-br from-primary/10 to-primary/20">
                <Image
                  src="/team/mou.jpeg"
                  alt="Moumita Chakraborty, MBA, Managing Partner"
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="flex-1 p-6 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {t("about.page.moumita.name")}
                  </h3>
                  <p className="text-[#D9BA4E] font-semibold mb-2">
                    {t("about.page.moumita.title")}
                  </p>
                  <p className="text-gray-600 mb-4">
                    {t("about.page.moumita.description")}
                  </p>
                </div>
                <div className="bg-primary/10 rounded-lg p-3">
                  <p className="text-sm font-medium text-primary">
                    {t("about.page.moumita.license")}
                  </p>
                </div>
              </div>
            </div>

            {/* Richard Brown */}
            <div className="bg-white flex flex-col rounded-2xl shadow-xl overflow-hidden transform hover:scale-105 transition-transform duration-300">
              <div className="relative w-full h-[500px] bg-gradient-to-br from-primary/10 to-primary/20">
                <Image
                  src="/team/richard.jpeg"
                  alt="Richard Brown, Paralegal, Senior Partner"
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="flex-1 p-6 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {t("about.page.richard.name")}
                  </h3>
                  <p className="text-[#D9BA4E] font-semibold mb-2">
                    {t("about.page.richard.title")}
                  </p>
                  <p className="text-gray-600 mb-4">
                    {t("about.page.richard.description")}
                  </p>
                </div>
                <div className="bg-primary/10 rounded-lg p-3">
                  <p className="text-sm font-medium text-primary">
                    {t("about.page.richard.license")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Professional Certifications */}
        <div className="max-w-6xl mx-auto mt-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Professional Certifications
          </h2>
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-20">
              {/* RCIC Logo */}
              <div className="flex flex-col items-center w-full md:w-96">
                <div className="relative w-full h-64 mb-4">
                  <Image
                    src="/RCIC_logo.webp"
                    alt="RCIC - Regulated Canadian Immigration Consultant"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>

              {/* LSO Logo */}
              <div className="flex flex-col items-center w-full md:w-96">
                <div className="relative w-full h-64 mb-4">
                  <Image
                    src="/LSO_Logo_Colour.png"
                    alt="LSO - Law Society of Ontario"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        {/* <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 md:p-12 text-white">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to Start Your Canadian Journey?
            </h3>
            <p className="text-xl mb-8 opacity-90">
              Let our experienced team guide you through your immigration process
            </p>
            <a
              href="/contact"
              className="inline-block bg-white text-blue-600 font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors duration-300"
            >
              Contact Us Today
            </a>
          </div>
        </div> */}
      </div>
    </div>
  );
}
