// src/Data/Products/Logo.js
import { computed } from "vue";
import { useRoute } from "vue-router";

export function useProductLogoColor() {
  const route = useRoute();

  const logo = computed(() => {
    if (route.path === "/product/credit-cover") {
      return new URL(
        "@/assets/Products/images/Logo/CC-Logo-Color.png",
        import.meta.url,
      ).href;
    }
    if (route.path === "/product/medins") {
      return new URL(
        "@/assets/Products/images/Logo/Medins-Logo-Color.png",
        import.meta.url,
      ).href;
    }
    if (route.path === "/product/lifins") {
      return new URL(
        "@/assets/Products/images/Logo/Lifins-Logo-Color.png",
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
        "@/assets/Products/images/Logo/Credit-logo.png",
        import.meta.url,
      ).href;
    }
    return null; // fallback
  });

  return { logo };
}
