import { computed } from "vue";
import { useI18n } from "vue-i18n";

const parseDate = (value) => {
  if (!value) return null;
  const [y, m, d] = String(value).split("-").map(Number);
  if (!y || !m || !d) return null;
  return new Date(y, m - 1, d);
};

export function useWorkshopInfo(workshop) {
  const { t, locale } = useI18n();

  const intlLocale = computed(() =>
    locale.value === "id" ? "id-ID" : "en-GB",
  );

  const dateLabel = computed(() => {
    const start = parseDate(workshop.event.startDate);
    if (!start) return null;
    const end = parseDate(workshop.event.endDate);
    const full = new Intl.DateTimeFormat(intlLocale.value, {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    if (!end || end.getTime() === start.getTime()) return full.format(start);
    return full.formatRange(start, end);
  });

  const timeLabel = computed(() => {
    if (!workshop.event.time) return null;
    return [workshop.event.time, workshop.event.timezone]
      .filter(Boolean)
      .join(" ");
  });

  const formatLabel = computed(() =>
    workshop.event.format
      ? t(`workshop.formats.${workshop.event.format}`)
      : null,
  );

  const priceLabel = computed(() => {
    const price = workshop.event.price;
    if (price === null || price === undefined || price === "") return null;
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
    workshop.event.quota
      ? t("workshop.info.quotaValue", { n: workshop.event.quota })
      : null,
  );

  const items = computed(() =>
    [
      { key: "date", value: dateLabel.value },
      { key: "time", value: timeLabel.value },
      { key: "format", value: formatLabel.value },
      { key: "location", value: workshop.event.venue || null },
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
