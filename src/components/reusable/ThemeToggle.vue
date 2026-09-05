<script setup>
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import { useThemeStore } from "@/stores/theme";

const themeStore = useThemeStore();
const { t } = useI18n();

const label = computed(() =>
  themeStore.isDark ? t("common.switchToLight") : t("common.switchToDark"),
);
</script>

<template>
  <button
    type="button"
    :aria-label="label"
    :title="label"
    :aria-pressed="themeStore.isDark"
    @click="themeStore.toggleTheme"
    class="w-10 h-10 sm:w-11 sm:h-11 lg:w-10 lg:h-10 xl:w-11 xl:h-11 shrink-0 rounded-lg bg-white dark:bg-[#323232] border-[0.5px] border-[#DEDEDE] dark:border-[#FAFAFA]/30 shadow-[inset_0px_0px_17px_-3px_rgba(0,_0,_0,_0.1)] cursor-pointer flex items-center justify-center relative overflow-hidden transition-all duration-300 hover:border-[#1AB24F]/60 dark:hover:border-[#FAFAFA]/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1AB24F]/60"
  >
    <!-- Sun Icon (light mode) -->
    <svg
      class="absolute w-5 h-5 sm:w-[22px] sm:h-[22px] text-[#1AB24F] transition-all duration-300 ease-in-out"
      :class="
        themeStore.isDark
          ? 'opacity-0 scale-50 -rotate-90'
          : 'opacity-100 scale-100 rotate-0'
      "
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      viewBox="0 0 24 24"
    >
      <circle cx="12" cy="12" r="5" />
      <path
        d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"
      />
    </svg>

    <!-- Moon Icon (dark mode) -->
    <svg
      class="absolute w-5 h-5 sm:w-[22px] sm:h-[22px] text-[#FAFAFA] transition-all duration-300 ease-in-out"
      :class="
        themeStore.isDark
          ? 'opacity-100 scale-100 rotate-0'
          : 'opacity-0 scale-50 rotate-90'
      "
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      viewBox="0 0 24 24"
    >
      <path d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" />
    </svg>
  </button>
</template>
