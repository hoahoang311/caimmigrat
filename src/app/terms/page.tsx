import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service - ICBM Law",
  description: "Terms of Service for ICBM Law - Understanding our service agreements and client responsibilities.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Terms of Service
            </h1>
            <div className="w-24 h-1 bg-blue-600 mx-auto mb-6"></div>
            <p className="text-lg text-gray-600">
              Last updated: {new Date().toLocaleDateString('en-CA', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-700 leading-relaxed">
                By accessing and using the services provided by ICBM Law, you acknowledge that you have read, 
                understood, and agree to be bound by these Terms of Service. If you do not agree to these terms, 
                please do not use our services or website.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. About Our Services</h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                ICBM Law provides immigration consultation services including:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                <li>Immigration assessment and eligibility reviews</li>
                <li>Application preparation and submission</li>
                <li>Representation before Immigration, Refugees and Citizenship Canada (IRCC)</li>
                <li>Legal advice on Canadian immigration matters</li>
                <li>Document review and translation services</li>
                <li>Appeal and judicial review representation</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Professional Qualifications</h2>
              <div className="bg-blue-50 rounded-lg p-6 mb-4">
                <p className="text-gray-700 leading-relaxed mb-3">
                  ICBM Law is operated by qualified professionals:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                  <li><strong>Moumita Chakraborty:</strong> Regulated Canadian Immigration Consultant (RCIC), License #532939</li>
                  <li><strong>Richard Brown:</strong> Licensed Paralegal and Certified Immigration Consultant, License #514425</li>
                </ul>
              </div>
              <p className="text-gray-700 leading-relaxed">
                Our consultants are members in good standing with the College of Immigration and Citizenship 
                Consultants (CICC) and/or Law Society of Ontario, as applicable.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Client Responsibilities</h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                As our client, you agree to:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                <li>Provide complete, accurate, and truthful information</li>
                <li>Respond promptly to our requests for information or documentation</li>
                <li>Pay all fees and costs as agreed in our retainer agreement</li>
                <li>Comply with all immigration laws and regulations</li>
                <li>Inform us immediately of any changes in circumstances</li>
                <li>Follow our professional advice and recommendations</li>
                <li>Maintain confidentiality of sensitive case information</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Fees and Payment Terms</h2>
              <div className="space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  Our fees are outlined in individual retainer agreements and may include:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4 mb-4">
                  <li>Professional service fees</li>
                  <li>Government filing fees</li>
                  <li>Third-party costs (translations, medical exams, etc.)</li>
                  <li>Administrative and document handling fees</li>
                </ul>
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                  <p className="text-gray-700 leading-relaxed">
                    <strong>Important:</strong> Fees are generally non-refundable once work has commenced. 
                    Government fees are never refundable, regardless of application outcome.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. No Guarantee of Success</h2>
              <div className="bg-red-50 border-l-4 border-red-400 p-4">
                <p className="text-gray-700 leading-relaxed">
                  <strong>Disclaimer:</strong> While we provide professional immigration services with expertise 
                  and diligence, we cannot guarantee the success of any immigration application. Final decisions 
                  rest with Canadian immigration authorities, and outcomes depend on various factors beyond our control.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Confidentiality and Privacy</h2>
              <p className="text-gray-700 leading-relaxed">
                We maintain strict confidentiality regarding all client information in accordance with professional 
                standards and privacy legislation. Client information will only be disclosed as necessary to provide 
                services or as required by law. Please refer to our Privacy Policy for detailed information about 
                data handling practices.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Communication and Updates</h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                We commit to:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                <li>Provide regular updates on case progress</li>
                <li>Respond to client inquiries within reasonable timeframes</li>
                <li>Maintain professional communication standards</li>
                <li>Forward all government correspondence promptly</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Limitation of Liability</h2>
              <p className="text-gray-700 leading-relaxed">
                Our liability is limited to the fees paid for services rendered. We are not liable for indirect, 
                consequential, or punitive damages, including but not limited to lost opportunities, emotional 
                distress, or costs associated with application delays or refusals.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Termination of Services</h2>
              <div className="space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  Either party may terminate the professional relationship with reasonable notice. Upon termination:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                  <li>You remain responsible for all fees incurred to the date of termination</li>
                  <li>We will provide your file and documents as requested</li>
                  <li>We may complete work in progress at our discretion</li>
                  <li>Confidentiality obligations continue indefinitely</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Dispute Resolution</h2>
              <p className="text-gray-700 leading-relaxed">
                Any disputes arising from our services will first be addressed through direct communication. 
                If unresolved, disputes may be subject to mediation or arbitration as outlined in individual 
                retainer agreements. You also have the right to file complaints with relevant professional 
                regulatory bodies.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Governing Law</h2>
              <p className="text-gray-700 leading-relaxed">
                These Terms of Service are governed by the laws of Ontario, Canada. Any legal proceedings 
                will be conducted in the appropriate courts of Ontario.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">13. Changes to Terms</h2>
              <p className="text-gray-700 leading-relaxed">
                We reserve the right to modify these Terms of Service at any time. Updated terms will be 
                posted on our website with a new effective date. Continued use of our services constitutes 
                acceptance of revised terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">14. Contact Information</h2>
              <div className="bg-blue-50 rounded-lg p-6">
                <p className="text-gray-700 leading-relaxed mb-4">
                  For questions about these Terms of Service or to discuss our services, please contact us:
                </p>
                <div className="text-gray-800">
                  <p className="font-semibold mb-2">ICBM Law</p>
                  <p>Email: info@icbmlaw.com</p>
                  <p>Phone: +1 416-992-7429</p>
                  <p>Address: 240 Humberline Dr, Toronto, ON M9W 5X1</p>
                  <p className="mt-2">Business Hours: Monday - Friday: 10:00 AM - 5:00 PM</p>
                  <p className="mt-2 text-sm text-gray-600">
                    Licensed immigration consultants providing professional services across Canada
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