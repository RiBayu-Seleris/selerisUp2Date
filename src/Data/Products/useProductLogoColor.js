// src/Data/Products/Logo.js
import { computed } from "vue";
import { useRoute } from "vue-router";

export function useProductLogoColor() {
  const route = useRoute();

  const logo = computed(() => {
    if (route.path === "/product/credit-cover") {
      return new URL(
        "@/assets/Products/images/Logo/CC-logo-color.png",
        import.meta.url
      ).href;
    }
    if (route.path === "/product/medins") {
      return new URL(
        "@/assets/Products/images/Logo/medins-logo-color.png",
        import.meta.url
      ).href;
    }
    if (route.path === "/product/lifins") {
      return new URL(
        "@/assets/Products/images/Logo/Lifins-logo.png",
        import.meta.url
      ).href;
    }
    if (route.path === "/product/health-care") {
      return new URL(
        "@/assets/Products/images/Logo/Lifins-logo.png",
        import.meta.url
      ).href;
    }
    return null; // fallback
  });

  return { logo };
}
