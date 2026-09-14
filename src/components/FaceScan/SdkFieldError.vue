<script setup>
defineProps({
  pesan: { type: String, default: "" },
});
</script>

<template>
  <p
    v-if="pesan"
    class="flex items-start gap-1.5 text-[12px] leading-snug text-red-600 dark:text-red-400"
  >
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="w-3.5 h-3.5 shrink-0 mt-px"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 8v4" />
      <path d="M12 16h.01" />
    </svg>
    <span>{{ pesan }}</span>
  </p>
</template>
