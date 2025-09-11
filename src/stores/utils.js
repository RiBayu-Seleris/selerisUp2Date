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

    shortNumber(num) {
      if (num === null || num === undefined) return "-"; // jaga-jaga null/undefined
      if (isNaN(num)) return "-"; // kalau bukan angka

      if (num >= 1_000_000_000) {
        return (
          (num / 1_000_000_000).toFixed(num % 1_000_000_000 === 0 ? 0 : 1) + "B"
        );
      } else if (num >= 1_000_000) {
        return (num / 1_000_000).toFixed(num % 1_000_000 === 0 ? 0 : 1) + "M";
      } else if (num >= 1000) {
        return (num / 1000).toFixed(num % 1000 === 0 ? 0 : 1) + "k";
      }

      return num.toString(); // aman karena sudah difilter di atas
    },
  },
});
