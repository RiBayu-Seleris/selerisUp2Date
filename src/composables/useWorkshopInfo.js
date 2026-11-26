import { computed } from "vue";
import { useI18n } from "vue-i18n";
import { pickText } from "@/utils/workshopText";

const parseDate = (value) => {
  if (!value) return null;
  const [y, m, d] = String(value).split("-").map(Number);
  if (!y || !m || !d) return null;
  return new Date(y, m - 1, d);
};

export function useWorkshopInfo(source) {
  const { t, locale } = useI18n();

  const event = () =>
    (typeof source === "function" ? source() : source)?.event || {};

  const intlLocale = computed(() =>
    locale.value === "id" ? "id-ID" : "en-GB",
  );

  const dateLabel = computed(() => {
    const start = parseDate(event().startDate);
    if (!start) return null;
    const end = parseDate(event().endDate);
    const full = new Intl.DateTimeFormat(intlLocale.value, {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    if (!end || end.getTime() === start.getTime()) return full.format(start);
    return full.formatRange(start, end);
  });

  const timeLabel = computed(() => {
    if (!event().time) return null;
    return [event().time, pickText(event().timezone, locale.value)]
      .filter(Boolean)
      .join(" ");
  });

  const formatLabel = computed(() =>
    event().format ? t(`workshop.formats.${event().format}`) : null,
  );

  const priceLabel = computed(() => {
    const price = event().price;
    if (price === null || price === undefined || price === "") return null;
    if (price === 0) return t("workshop.info.free");
    if (typeof price === "number") {
      return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0,
      }).format(price);
    }
    return String(price);
  });

  const quotaLabel = computed(() =>
    event().quota ? t("workshop.info.quotaValue", { n: event().quota }) : null,
  );

  const items = computed(() =>
    [
      { key: "date", value: dateLabel.value },
      { key: "time", value: timeLabel.value },
      { key: "format", value: formatLabel.value },
      { key: "location", value: pickText(event().venue, locale.value) || null },
      { key: "price", value: priceLabel.value },
      { key: "quota", value: quotaLabel.value },
    ].map((item) => ({
      ...item,
      label: t(`workshop.info.${item.key}`),
      isSet: Boolean(item.value),
      display: item.value || t("workshop.info.tba"),
    })),
  );

  return { items, dateLabel, timeLabel, formatLabel, priceLabel, quotaLabel };
}
