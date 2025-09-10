import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy - ICBM Law",
  description:
    "Privacy Policy for ICBM Law - Learn how we collect, use, and protect your personal information.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Privacy Policy
            </h1>
            <div className="w-24 h-1 bg-blue-600 mx-auto mb-6"></div>
            <p className="text-lg text-gray-600">
              Last updated:{" "}
              {new Date().toLocaleDateString("en-CA", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                1. Introduction
              </h2>
              <p className="text-gray-700 leading-relaxed">
                ICBM Law (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) is
                committed to protecting your privacy and personal information.
                This Privacy Policy explains how we collect, use, disclose, and
                safeguard your information when you visit our website or use our
                immigration consultation services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                2. Information We Collect
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    Personal Information
                  </h3>
                  <p className="text-gray-700 leading-relaxed mb-3">
                    We may collect the following types of personal information:
                  </p>
                  <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                    <li>Name, address, phone number, and email address</li>
                    <li>
                      Date of birth, place of birth, and citizenship information
                    </li>
                    <li>Education and employment history</li>
                    <li>Immigration history and status</li>
                    <li>Family information for sponsorship applications</li>
                    <li>Financial information for immigration purposes</li>
                    <li>Government-issued identification documents</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    Technical Information
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    We automatically collect certain technical information when
                    you visit our website, including IP address, browser type,
                    device information, and website usage patterns through
                    cookies and similar technologies.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                3. How We Use Your Information
              </h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                We use your personal information for the following purposes:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                <li>Providing immigration consultation and legal services</li>
                <li>Preparing and submitting immigration applications</li>
                <li>Communicating with government agencies on your behalf</li>
                <li>
                  Responding to your inquiries and providing customer support
                </li>
                <li>Improving our services and website functionality</li>
                <li>Complying with legal and regulatory requirements</li>
                <li>
                  Maintaining accurate records for professional obligations
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                4. Information Sharing and Disclosure
              </h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                We may share your personal information in the following
                circumstances:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                <li>
                  With Immigration, Refugees and Citizenship Canada (IRCC) and
                  other government agencies
                </li>
                <li>
                  With third-party service providers who assist us in delivering
                  our services
                </li>
                <li>
                  When required by law, court order, or government investigation
                </li>
                <li>With your explicit consent for specific purposes</li>
                <li>To protect our legal rights and interests</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                5. Data Security
              </h2>
              <p className="text-gray-700 leading-relaxed">
                We implement appropriate technical and organizational security
                measures to protect your personal information against
                unauthorized access, alteration, disclosure, or destruction.
                This includes secure file storage, encrypted communications, and
                regular security assessments.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                6. Data Retention
              </h2>
              <p className="text-gray-700 leading-relaxed">
                We retain your personal information for as long as necessary to
                provide our services and comply with legal and professional
                obligations. Immigration-related documents are typically
                retained for a minimum of seven years after the completion of
                your case, as required by regulatory standards.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                7. Your Rights
              </h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                Under Canadian privacy legislation, you have the right to:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                <li>Access your personal information in our possession</li>
                <li>Request correction of inaccurate information</li>
                <li>Withdraw consent where applicable</li>
                <li>File a complaint with privacy authorities</li>
                <li>Receive information about our privacy practices</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                8. Cookies and Tracking
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Our website uses cookies to enhance user experience and analyze
                website traffic. You can control cookie settings through your
                browser preferences. Some features of our website may not
                function properly if cookies are disabled.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                9. Third-Party Links
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Our website may contain links to third-party websites. We are
                not responsible for the privacy practices of these external
                sites and encourage you to review their privacy policies.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                10. Updates to This Policy
              </h2>
              <p className="text-gray-700 leading-relaxed">
                We may update this Privacy Policy periodically to reflect
                changes in our practices or applicable laws. We will notify you
                of significant changes by posting the updated policy on our
                website with a new effective date.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                11. Contact Information
              </h2>
              <div className="bg-blue-50 rounded-lg p-6">
                <p className="text-gray-700 leading-relaxed mb-4">
                  If you have questions about this Privacy Policy or wish to
                  exercise your privacy rights, please contact us:
                </p>
                <div className="text-gray-800">
                  <p className="font-semibold mb-2">ICBM Law</p>
                  <p>Email: info@icbmlaw.com</p>
                  <p>Phone: +1 416-992-7429</p>
                  <p>Address: 240 Humberline Dr, Toronto, ON M9W 5X1</p>
                  <p className="mt-2">
                    Business Hours: Monday - Friday: 10:00 AM - 5:00 PM
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
