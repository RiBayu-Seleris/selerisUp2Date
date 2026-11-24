const REGISTRATION_STATUSES = ["open", "full", "closed"];

const endOfDay = (value) => {
  if (!value) return null;
  const [y, m, d] = String(value).split("-").map(Number);
  if (!y || !m || !d) return null;
  return new Date(y, m - 1, d, 23, 59, 59);
};

export function workshopStatus(item, now = new Date()) {
  const end = endOfDay(item?.end_date || item?.start_date);
  if (end && now > end) return "past";
  const status = item?.registration?.status;
  return REGISTRATION_STATUSES.includes(status) ? status : "closed";
}

export function featuredWorkshop(list, now = new Date()) {
  const chosen = list.find(
    (item) => item.is_featured && workshopStatus(item, now) !== "past",
  );
  if (chosen) return chosen;
  return (
    list
      .filter((item) => workshopStatus(item, now) === "open")
      .sort((a, b) =>
        (a.start_date || "9999-12-31").localeCompare(
          b.start_date || "9999-12-31",
        ),
      )[0] || null
  );
}
