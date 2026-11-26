import { useI18n } from "vue-i18n";
import { pickText } from "@/utils/workshopText";

const NS = "workshop.healthpricing360";

export function useHpDays(workshop) {
  const { t, tm, rt, locale } = useI18n();

  const fromSentris = (n) =>
    (workshop.agenda || []).find((day) => day.day === n);

  const title = (n) => {
    const own = pickText(fromSentris(n)?.title, locale.value);
    if (own) return own;
    const builtIn = tm(`${NS}.days`)[n - 1]?.title;
    return builtIn ? rt(builtIn) : t(`${NS}.hero.dial.day`, { n });
  };

  const summary = (n) => {
    const own = pickText(fromSentris(n)?.summary, locale.value);
    if (own) return own;
    const builtIn = tm(`${NS}.agenda.summaries`)[n - 1];
    return builtIn ? rt(builtIn) : "";
  };

  return { title, summary };
}
