const endOfDay = (value) => {
  if (!value) return null;
  const [y, m, d] = String(value).split("-").map(Number);
  if (!y || !m || !d) return null;
  return new Date(y, m - 1, d, 23, 59, 59);
};

export function isWorkshopHighlighted(workshop, now = new Date()) {
  if (!workshop?.isPublished || !workshop?.registration?.isOpen) return false;
  const end = endOfDay(workshop.event?.endDate || workshop.event?.startDate);
  return !end || now <= end;
}
