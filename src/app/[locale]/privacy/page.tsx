import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export const metadata: Metadata = {
  title: "Privacy Policy - ICBM Law",
  description:
    "Privacy Policy for ICBM Law - Learn how we collect, use, and protect your personal information.",
};

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function PrivacyPage({ params }: Props) {
  const { locale } = await params;

  const t = await getTranslations({ locale });
  console.log(t("privacy.sections.introduction.content"));

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {t("privacy.title")}
            </h1>
            <div className="w-24 h-1 bg-blue-600 mx-auto mb-6"></div>
            <p className="text-lg text-gray-600">
              {t("privacy.last_updated")}{" "}
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
                1. {t("privacy.sections.introduction.title")}
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {t("privacy.sections.introduction.content")}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                2. {t("privacy.sections.information_collect.title")}
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {t(
                      "privacy.sections.information_collect.personal_info_title"
                    )}
                  </h3>
                  <p className="text-gray-700 leading-relaxed mb-3">
                    {t(
                      "privacy.sections.information_collect.personal_info_content"
                    )}
                  </p>
                  <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                    <li>
                      {t(
                        "privacy.sections.information_collect.personal_info_items.0"
                      )}
                    </li>
                    <li>
                      {t(
                        "privacy.sections.information_collect.personal_info_items.1"
                      )}
                    </li>
                    <li>
                      {t(
                        "privacy.sections.information_collect.personal_info_items.2"
                      )}
                    </li>
                    <li>
                      {t(
                        "privacy.sections.information_collect.personal_info_items.3"
                      )}
                    </li>
                    <li>
                      {t(
                        "privacy.sections.information_collect.personal_info_items.4"
                      )}
                    </li>
                    <li>
                      {t(
                        "privacy.sections.information_collect.personal_info_items.5"
                      )}
                    </li>
                    <li>
                      {t(
                        "privacy.sections.information_collect.personal_info_items.6"
                      )}
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {t(
                      "privacy.sections.information_collect.technical_info_title"
                    )}
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {t(
                      "privacy.sections.information_collect.technical_info_content"
                    )}
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                3. {t("privacy.sections.how_we_use.title")}
              </h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                {t("privacy.sections.how_we_use.content")}
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                <li>{t("privacy.sections.how_we_use.items.0")}</li>
                <li>{t("privacy.sections.how_we_use.items.1")}</li>
                <li>{t("privacy.sections.how_we_use.items.2")}</li>
                <li>{t("privacy.sections.how_we_use.items.3")}</li>
                <li>{t("privacy.sections.how_we_use.items.4")}</li>
                <li>{t("privacy.sections.how_we_use.items.5")}</li>
                <li>{t("privacy.sections.how_we_use.items.6")}</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                4. {t("privacy.sections.information_sharing.title")}
              </h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                {t("privacy.sections.information_sharing.content")}
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                <li>{t("privacy.sections.information_sharing.items.0")}</li>
                <li>{t("privacy.sections.information_sharing.items.1")}</li>
                <li>{t("privacy.sections.information_sharing.items.2")}</li>
                <li>{t("privacy.sections.information_sharing.items.3")}</li>
                <li>{t("privacy.sections.information_sharing.items.4")}</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                5. {t("privacy.sections.data_security.title")}
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {t("privacy.sections.data_security.content")}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                6. {t("privacy.sections.data_retention.title")}
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {t("privacy.sections.data_retention.content")}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                7. {t("privacy.sections.your_rights.title")}
              </h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                {t("privacy.sections.your_rights.content")}
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                <li>{t("privacy.sections.your_rights.items.0")}</li>
                <li>{t("privacy.sections.your_rights.items.1")}</li>
                <li>{t("privacy.sections.your_rights.items.2")}</li>
                <li>{t("privacy.sections.your_rights.items.3")}</li>
                <li>{t("privacy.sections.your_rights.items.4")}</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                8. {t("privacy.sections.cookies_tracking.title")}
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {t("privacy.sections.cookies_tracking.content")}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                9. {t("privacy.sections.third_party_links.title")}
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {t("privacy.sections.third_party_links.content")}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                10. {t("privacy.sections.updates.title")}
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {t("privacy.sections.updates.content")}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                11. {t("privacy.sections.contact.title")}
              </h2>
              <div className="bg-blue-50 rounded-lg p-6">
                <p className="text-gray-700 leading-relaxed mb-4">
                  {t("privacy.sections.contact.content")}
                </p>
                <div className="text-gray-800">
                  <p className="font-semibold mb-2">
                    {t("privacy.sections.contact.company_name")}
                  </p>
                  <p>{t("privacy.sections.contact.email")}</p>
                  <p>{t("privacy.sections.contact.phone")}</p>
                  <p>{t("privacy.sections.contact.address")}</p>
                  <p className="mt-2">
                    {t("privacy.sections.contact.business_hours")}
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
