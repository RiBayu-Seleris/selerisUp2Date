import { useI18n } from "vue-i18n";
import { pickText } from "@/utils/workshopText";

export function useWorkshopContent(workshop) {
  const { t, tm, rt, locale } = useI18n();

  const own = (field) => workshop?.content?.[field];

  const pick = (value) => pickText(value, locale.value);

  const text = (field, fallbackKey) => pick(own(field)) || t(fallbackKey);

  const list = (field, fallbackKey) => {
    const items = (own(field) || []).map(pick).filter(Boolean);
    return items.length ? items : tm(fallbackKey).map((m) => rt(m));
  };

  return { pick, text, list };
}
