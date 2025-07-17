<script setup>
import { useThemeStore } from "@/stores/theme";

const themeStore = useThemeStore();
</script>

<template>
  <div
    @click="themeStore.toggleTheme"
    class="w-24 h-12 bg-white dark:bg-gray-800 rounded-full border-[1px] shadow-[inset_0px_0px_17px_-3px_rgba(0,_0,_0,_0.1)] relative cursor-pointer flex items-center px-3 transition-all duration-300"
  >
    <!-- Circle -->
    <div
      class="absolute w-8 h-8 rounded-full bg-white shadow-lg transition-all duration-300"
      :class="
        themeStore.isDark
          ? 'translate-x-[41px] lg:translate-x-[25px] xl:translate-x-[41px]'
          : 'translate-x-[-6px]'
      "
    ></div>

    <!-- Sun Icon -->
    <svg
      class="flex w-5 h-5 z-10 ml-0 transition-colors duration-300"
      :class="themeStore.isDark ? 'text-gray-400' : 'text-green-500'"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      viewBox="0 0 24 24"
    >
      <circle cx="12" cy="12" r="5" />
      <path
        d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"
      />
    </svg>

    <!-- Moon Icon -->
    <svg
      class="w-5 h-5 z-10 ml-auto mr-0 transition-colors duration-300"
      :class="themeStore.isDark ? 'text-green-500' : 'text-gray-400'"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      viewBox="0 0 24 24"
    >
      <path d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" />
    </svg>
  </div>
</template>
