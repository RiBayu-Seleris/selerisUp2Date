import { healthPricing360 } from "./healthpricing360.js";

export const WORKSHOP_LIST_PATH = "/workshops";

export const WORKSHOP_DATA_SOURCE = "static";

export const workshopCatalog = [
  { i18nKey: "healthpricing360", featured: true, workshop: healthPricing360 },
];

export const publishedWorkshops = workshopCatalog
  .map((entry) => entry.workshop)
  .filter((workshop) => workshop.isPublished);

export const hasPublishedWorkshops = publishedWorkshops.length > 0;
