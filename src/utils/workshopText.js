import en from "@/locales/en.json";
import id from "@/locales/id.json";

const normalize = (text) =>
  String(text ?? "")
    .trim()
    .replace(/\s+/g, " ")
    .toLowerCase();

const englishByIndonesian = new Map(
  Object.entries(id.workshop?.glossary || {})
    .filter(([key]) => en.workshop?.glossary?.[key])
    .map(([key, source]) => [normalize(source), en.workshop.glossary[key]]),
);

export const toEnglish = (text) =>
  englishByIndonesian.get(normalize(text)) || "";

export const pickText = (value, locale) => {
  if (!value) return "";
  if (typeof value === "string") {
    return locale === "en" ? toEnglish(value) || value : value;
  }
  if (locale === "en") return value.en || toEnglish(value.id) || value.id || "";
  return value.id || value.en || "";
};
