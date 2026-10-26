// src/Data/Products/Logo.js
import { computed } from "vue";
import { useRoute } from "vue-router";

export function useProductLogo() {
  const route = useRoute();

  const logo = computed(() => {
    if (route.path === "/product/credit-cover") {
      return new URL(
        "@/assets/Products/images/Logo/CC-Logo.png",
        import.meta.url,
      ).href;
    }
    if (route.path === "/product/shield") {
      return new URL(
        "@/assets/Products/images/Logo/Shield-Logo.png",
        import.meta.url,
      ).href;
    }
    if (route.path === "/product/assure") {
      return new URL(
        "@/assets/Products/images/Logo/Assure-Logo.png",
        // "@/assets/Products/images/Logo/Lifins-Logo-Color.png",
        import.meta.url,
      ).href;
    }
    if (route.path === "/product/health-care") {
      return new URL(
        "@/assets/Products/images/Logo/Care-Logo.png",
        import.meta.url,
      ).href;
    }
    if (route.path === "/product/seleris-credit") {
      return new URL(
        "@/assets/Products/images/Logo/credit-logo.png",
        import.meta.url,
      ).href;
    }
    return null; // fallback
  });

  return { logo };
}
