import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";
import { usePageLoadingStore } from "@/stores/pageLoading";
import { detailPathFor } from "@/Data/workshops";
import { loadWorkshopList, sentrisWorkshops } from "@/consumeAPI/workshopsApi";

const STATUSES = ["open", "full", "closed", "past"];

export const pickText = (value, locale) => {
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
  path: detailPathFor(item.slug),
  name: item.name,
  organizer: item.organizer || "",
  subtitle: pickText(item.subtitle, locale),
  summary: pickText(item.summary, locale),
  highlights: (item.highlights || [])
    .map((highlight) => pickText(highlight, locale))
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

export function useWorkshopList() {
  const { locale } = useI18n();
  const state = ref(sentrisWorkshops.value ? "ready" : "loading");

  const load = async ({ fresh = true } = {}) => {
    const pageLoading = usePageLoadingStore();
    if (!sentrisWorkshops.value) state.value = "loading";
    pageLoading.start();
    try {
      await loadWorkshopList({ fresh });
      state.value = "ready";
    } catch {
      state.value = sentrisWorkshops.value ? "ready" : "error";
    } finally {
      pageLoading.done();
    }
  };

  const items = computed(() => {
    const lang = locale.value;
    const today = todayKey();
    return (sentrisWorkshops.value || [])
      .map((item) => fromSentris(item, lang))
      .map((item) => ({ ...item, status: resolveStatus(item, today) }))
      .sort(compare);
  });

  load();

  return { items, state, reload: () => load({ fresh: true }) };
}
