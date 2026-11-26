import { computed } from "vue";
import { useI18n } from "vue-i18n";

const NS = "workshop.healthpricing360";

const pick = (value, lang) => value?.[lang] || value?.id || "";

const TYPES = {
  lecture: "lecture",
  hands_on: "handsOn",
  simulation: "simulation",
};

export function useHpModules(workshop) {
  const { tm, rt, locale } = useI18n();

  return computed(() => {
    const lang = locale.value;
    const base = tm(`${NS}.modules`).map((m, index) => ({
      number: index + 1,
      day: null,
      type: null,
      title: rt(m.title),
      scope: rt(m.scope),
      topics: (m.topics || []).map((topic) => rt(topic)),
    }));
    const remote = workshop.modules || [];
    if (!remote.length) return base;
    return [...remote]
      .sort((a, b) => a.number - b.number)
      .map((m) => {
        const fallback = base.find((b) => b.number === m.number);
        return {
          number: m.number,
          day: m.day ?? null,
          title: pick(m.title, lang) || fallback?.title || "",
          scope: pick(m.summary, lang) || fallback?.scope || "",
          topics: (m.topics || []).length
            ? m.topics.map((topic) => pick(topic, lang)).filter(Boolean)
            : fallback?.topics || [],
          type: TYPES[m.type] || null,
        };
      });
  });
}
