import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export const metadata: Metadata = {
  title: "Terms of Service - ICBM Law",
  description:
    "Terms of Service for ICBM Law - Understanding our service agreements and client responsibilities.",
};

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function TermsPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {t("terms.title")}
            </h1>
            <div className="w-24 h-1 bg-blue-600 mx-auto mb-6"></div>
            <p className="text-lg text-gray-600">
              {t("terms.last_updated")}{" "}
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
                1. {t("terms.sections.acceptance.title")}
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {t("terms.sections.acceptance.content")}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                2. {t("terms.sections.services.title")}
              </h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                {t("terms.sections.services.content")}
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                <li>{t("terms.sections.services.items.0")}</li>
                <li>{t("terms.sections.services.items.1")}</li>
                <li>{t("terms.sections.services.items.2")}</li>
                <li>{t("terms.sections.services.items.3")}</li>
                <li>{t("terms.sections.services.items.4")}</li>
                <li>{t("terms.sections.services.items.5")}</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                3. {t("terms.sections.qualifications.title")}
              </h2>
              <div className="bg-blue-50 rounded-lg p-6 mb-4">
                <p className="text-gray-700 leading-relaxed mb-3">
                  {t("terms.sections.qualifications.content")}
                </p>
                <ul className="list-disc list-outside text-gray-700 space-y-1 ml-4">
                  <li>
                    <p>{t("terms.sections.qualifications.moumita")}</p>
                  </li>
                  <li>
                    <p>{t("terms.sections.qualifications.richard")}</p>
                  </li>
                </ul>
              </div>
              <p className="text-gray-700 leading-relaxed">
                {t("terms.sections.qualifications.membership")}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                4. {t("terms.sections.client_responsibilities.title")}
              </h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                {t("terms.sections.client_responsibilities.content")}
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                <li>{t("terms.sections.client_responsibilities.items.0")}</li>
                <li>{t("terms.sections.client_responsibilities.items.1")}</li>
                <li>{t("terms.sections.client_responsibilities.items.2")}</li>
                <li>{t("terms.sections.client_responsibilities.items.3")}</li>
                <li>{t("terms.sections.client_responsibilities.items.4")}</li>
                <li>{t("terms.sections.client_responsibilities.items.5")}</li>
                <li>{t("terms.sections.client_responsibilities.items.6")}</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                5. {t("terms.sections.fees.title")}
              </h2>
              <div className="space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  {t("terms.sections.fees.content")}
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4 mb-4">
                  <li>{t("terms.sections.fees.items.0")}</li>
                  <li>{t("terms.sections.fees.items.1")}</li>
                  <li>{t("terms.sections.fees.items.2")}</li>
                  <li>{t("terms.sections.fees.items.3")}</li>
                </ul>
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                  <div className="text-gray-700 leading-relaxed">
                    <p>{t("terms.sections.fees.important")}</p>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                6. {t("terms.sections.guarantee.title")}
              </h2>
              <div className="bg-red-50 border-l-4 border-red-400 p-4">
                <div className="text-gray-700 leading-relaxed">
                  <p>{t("terms.sections.guarantee.disclaimer")}</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                7. {t("terms.sections.confidentiality.title")}
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {t("terms.sections.confidentiality.content")}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                8. {t("terms.sections.communication.title")}
              </h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                {t("terms.sections.communication.content")}
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                <li>{t("terms.sections.communication.items.0")}</li>
                <li>{t("terms.sections.communication.items.1")}</li>
                <li>{t("terms.sections.communication.items.2")}</li>
                <li>{t("terms.sections.communication.items.3")}</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                9. {t("terms.sections.liability.title")}
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {t("terms.sections.liability.content")}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                10. {t("terms.sections.termination.title")}
              </h2>
              <div className="space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  {t("terms.sections.termination.content")}
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                  <li>{t("terms.sections.termination.items.0")}</li>
                  <li>{t("terms.sections.termination.items.1")}</li>
                  <li>{t("terms.sections.termination.items.2")}</li>
                  <li>{t("terms.sections.termination.items.3")}</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                11. {t("terms.sections.disputes.title")}
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {t("terms.sections.disputes.content")}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                12. {t("terms.sections.governing_law.title")}
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {t("terms.sections.governing_law.content")}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                13. {t("terms.sections.changes.title")}
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {t("terms.sections.changes.content")}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                14. {t("terms.sections.contact.title")}
              </h2>
              <div className="bg-blue-50 rounded-lg p-6">
                <p className="text-gray-700 leading-relaxed mb-4">
                  {t("terms.sections.contact.content")}
                </p>
                <div className="text-gray-800">
                  <p className="font-semibold mb-2">
                    {t("terms.sections.contact.company_name")}
                  </p>
                  <p>{t("terms.sections.contact.email")}</p>
                  <p>{t("terms.sections.contact.phone")}</p>
                  <p>{t("terms.sections.contact.address")}</p>
                  <p className="mt-2">
                    {t("terms.sections.contact.business_hours")}
                  </p>
                  <p className="mt-2 text-sm text-gray-600">
                    {t("terms.sections.contact.license_note")}
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
