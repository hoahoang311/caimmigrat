import { getRequestConfig } from "next-intl/server";

// Can be imported from a shared config
const locales = ["en", "vi"];

export default getRequestConfig(async ({ locale }) => {
  // Ensure locale is always a string and valid
  const validLocale =
    typeof locale === "string" && locales.includes(locale) ? locale : "en";

  return {
    locale: validLocale,
    messages: (await import(`./messages/${validLocale}.json`)).default,
  };
});

export { locales };
