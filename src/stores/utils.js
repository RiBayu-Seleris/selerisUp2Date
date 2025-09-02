import { defineStore } from "pinia";
export const useUtilsStore = defineStore("utils", {
  state: () => ({}),
  actions: {
    fromISODate(dateString, locale = "en-US") {
      if (!dateString) return "-";
      const d = new Date(dateString);
      return d.toLocaleDateString(locale, {
        month: "short",
        day: "2-digit",
        year: "numeric",
      });
    },
  },
});
