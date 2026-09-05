// i18n.js
import { createI18n } from "vue-i18n";
import en from "@/locales/en.json";
import id from "@/locales/id.json";

export const SUPPORTED_LOCALES = ["en", "id"];
export const DEFAULT_LOCALE = "en";

const savedLocale = localStorage.getItem("locale");

// Set lebih awal (sebelum Vue mount) supaya varian Tailwind id:/en: langsung
// benar dan tidak ada kedipan pakai jarak bahasa yang salah.
document.documentElement.setAttribute(
  "lang",
  SUPPORTED_LOCALES.includes(savedLocale) ? savedLocale : DEFAULT_LOCALE,
);

const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: SUPPORTED_LOCALES.includes(savedLocale)
    ? savedLocale
    : DEFAULT_LOCALE,
  fallbackLocale: DEFAULT_LOCALE,
  messages: { en, id },
});

export default i18n;
