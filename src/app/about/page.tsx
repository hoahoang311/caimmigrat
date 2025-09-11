import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About Us - ICBM Law",
  description:
    "Learn about ICBM Law, a premier Canadian immigration consultancy founded by Moumita Chakraborty and Richard Brown with over 16 years of combined expertise.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-6 py-16">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            About ICBM Law
          </h1>
          <div className="w-24 h-1 bg-blue-600 mx-auto mb-8"></div>
        </div>

        {/* Mission Statement */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-8">
              Welcome to{" "}
              <span className="font-bold text-blue-600">ICBM Law</span>, a
              premier Canadian immigration consultancy founded by Moumita
              Chakraborty, a distinguished RCIC with an MBA, and Richard Brown,
              a Licensed Paralegal and certified Immigration Consultant. With
              over 16 years of combined expertise in immigration, education, and
              legal services, ICBM Law is dedicated to guiding clients worldwide
              through their journey to make Canada their permanent home, reunite
              with family, pursue studies, or advance professional
              opportunities.
            </p>
            <div className="border-l-4 border-blue-600 pl-6 mb-8">
              <p className="text-xl text-gray-800 font-medium italic">
                Our mission is to provide unwavering guidance to those embarking
                on their journey to Canada, while nurturing their contributions
                to its flourishing economic landscape.
              </p>
            </div>
            <p className="text-lg text-blue-600 font-semibold text-center">
              Let ICBM illuminate your path to a brighter future in Canada.
            </p>
          </div>
        </div>

        {/* Team Section */}
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Meet Our Leadership Team
          </h2>

          <div className="grid md:grid-cols-2 gap-8 md:gap-12 max-w-4xl mx-auto">
            {/* Moumita Chakraborty */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden transform hover:scale-105 transition-transform duration-300">
              <div className="relative aspect-[4/3] bg-gradient-to-br from-blue-100 to-indigo-200">
                <Image
                  src="/team/moumita-chakraborty.jpg"
                  alt="Moumita Chakraborty, MBA, Managing Partner"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Moumita Chakraborty
                </h3>
                <p className="text-blue-600 font-semibold mb-2">
                  MBA, Managing Partner
                </p>
                <p className="text-gray-600 mb-4">
                  Regulated Canadian Immigration Consultant (RCIC)
                </p>
                <div className="bg-blue-50 rounded-lg p-3">
                  <p className="text-sm font-medium text-blue-800">
                    License Number: 532939
                  </p>
                </div>
              </div>
            </div>

            {/* Richard Brown */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden transform hover:scale-105 transition-transform duration-300">
              <div className="relative aspect-[4/3] bg-gradient-to-br from-gray-100 to-blue-200">
                <Image
                  src="/team/richard-brown.jpg"
                  alt="Richard Brown, Paralegal, Senior Partner"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Richard Brown
                </h3>
                <p className="text-blue-600 font-semibold mb-2">
                  Paralegal, Senior Partner
                </p>
                <p className="text-gray-600 mb-4">
                  Licensed Paralegal & Certified Immigration Consultant
                </p>
                <div className="bg-blue-50 rounded-lg p-3">
                  <p className="text-sm font-medium text-blue-800">
                    License Number: 514425
                  </p>
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
