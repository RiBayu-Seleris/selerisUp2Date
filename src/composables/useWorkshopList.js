import { computed, ref, unref } from "vue";
import axios from "axios";
import { useI18n } from "vue-i18n";
import { usePageLoadingStore } from "@/stores/pageLoading";
import { WORKSHOP_DATA_SOURCE, workshopCatalog } from "@/Data/workshops";
import { workshopExamples } from "@/Data/workshops/workshopExamples";

const BASE_URL = import.meta.env.VITE_API_URL ?? "";

const STATUSES = ["open", "full", "closed", "past"];

const pick = (value, locale) => {
  if (!value) return "";
  if (typeof value === "string") return value;
  return value[locale] || value.id || value.en || "";
};

const todayKey = () => {
  const now = new Date();
  const pad = (n) => String(n).padStart(2, "0");
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
};

export const fromSentris = (item, locale) => ({
  slug: item.slug,
  path: `/workshop/${item.slug}`,
  name: item.name,
  organizer: item.organizer || "",
  subtitle: pick(item.subtitle, locale),
  summary: pick(item.summary, locale),
  highlights: (item.highlights || [])
    .map((highlight) => pick(highlight, locale))
    .filter(Boolean),
  event: {
    startDate: item.start_date || null,
    endDate: item.end_date || null,
    time: null,
    timezone: item.timezone || "WIB",
    format: item.format || null,
    venue: item.city || null,
    price: null,
    quota: null,
  },
  registrationStatus: item.registration?.status || "closed",
  featured: Boolean(item.is_featured),
});

const fromCatalog = ({ workshop, i18nKey, featured }, t, tm, rt) => {
  const ns = `workshop.${i18nKey}.hero`;
  return {
    slug: workshop.slug,
    path: workshop.path,
    name: workshop.name,
    organizer: workshop.organizer,
    subtitle: t(`${ns}.subtitle`),
    summary: t(`${ns}.lead`),
    highlights: tm(`${ns}.pills`).map((message) => rt(message)),
    event: workshop.event,
    registrationStatus: workshop.registration.isOpen ? "open" : "closed",
    featured,
  };
};

const resolveStatus = (item, today) => {
  const lastDay = item.event.endDate || item.event.startDate;
  if (lastDay && lastDay < today) return "past";
  return STATUSES.includes(item.registrationStatus)
    ? item.registrationStatus
    : "closed";
};

const compare = (a, b) => {
  const rank = STATUSES.indexOf(a.status) - STATUSES.indexOf(b.status);
  if (rank) return rank;
  const first = a.event.startDate || "9999-12-31";
  const second = b.event.startDate || "9999-12-31";
  return a.status === "past"
    ? second.localeCompare(first)
    : first.localeCompare(second);
};

export function useWorkshopList({
  includeDrafts = false,
  includeExamples = false,
} = {}) {
  const { t, tm, rt, locale } = useI18n();
  const remote = ref([]);
  const state = ref(WORKSHOP_DATA_SOURCE === "sentris" ? "loading" : "ready");

  const load = async () => {
    if (WORKSHOP_DATA_SOURCE !== "sentris") return;
    const pageLoading = usePageLoadingStore();
    state.value = "loading";
    pageLoading.start();
    try {
      const { data } = await axios.get(`${BASE_URL}/api/v1/app/workshops`, {
        headers: { Accept: "application/json" },
      });
      remote.value = Array.isArray(data?.data) ? data.data : [];
      state.value = "ready";
    } catch {
      state.value = "error";
    } finally {
      pageLoading.done();
    }
  };

  const items = computed(() => {
    const lang = locale.value;
    const today = todayKey();
    const base =
      WORKSHOP_DATA_SOURCE === "sentris"
        ? remote.value.map((item) => fromSentris(item, lang))
        : workshopCatalog
            .filter((entry) => entry.workshop.isPublished || includeDrafts)
            .map((entry) => fromCatalog(entry, t, tm, rt));
    const examples = unref(includeExamples)
      ? workshopExamples.map((item) => ({
          ...fromSentris(item, lang),
          path: null,
          isExample: true,
        }))
      : [];
    return [...base, ...examples]
      .map((item) => ({ ...item, status: resolveStatus(item, today) }))
      .sort(compare);
  });

  load();

  return { items, state, reload: load };
}
