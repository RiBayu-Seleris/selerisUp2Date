import { healthPricing360 } from "./healthpricing360.js";

export const WORKSHOP_LIST_PATH = "/workshops";

export const workshopCatalog = [
  { i18nKey: "healthpricing360", workshop: healthPricing360 },
];

const dynamicHost = () => {
  if (typeof window === "undefined") return false;
  const host = window.location.hostname;
  return (
    host === "localhost" ||
    host === "127.0.0.1" ||
    host === "selerisup2date.pages.dev" ||
    host.endsWith(".selerisup2date.pages.dev")
  );
};

const isDevBuild =
  typeof import.meta !== "undefined" && import.meta.env && import.meta.env.DEV;

export const WORKSHOP_DYNAMIC = Boolean(isDevBuild) || dynamicHost();

export const detailPathFor = (slug) =>
  workshopCatalog.find((entry) => entry.workshop.slug === slug)?.workshop
    .path || null;
