import { healthPricing360 } from "./healthpricing360.js";

export const WORKSHOP_LIST_PATH = "/workshops";

export const workshopCatalog = [
  { i18nKey: "healthpricing360", workshop: healthPricing360 },
];

export const detailPathFor = (slug) =>
  workshopCatalog.find((entry) => entry.workshop.slug === slug)?.workshop
    .path || null;
