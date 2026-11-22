<script setup>
defineProps({
  index: { type: String, required: true },
  label: { type: String, required: true },
  dark: { type: Boolean, default: false },
});
</script>

<template>
  <span
    class="inline-flex items-center gap-2 rounded-full border px-3 py-1 font-mono text-[11px] sm:text-[11.5px] font-[600] uppercase tracking-[0.14em]"
    :class="
      dark
        ? 'border-[#3DDC84]/30 bg-[#3DDC84]/10 text-[#3DDC84]'
        : 'border-[#1AB24F]/25 bg-[#1AB24F]/[0.07] text-[#138A3D] dark:border-[#3DDC84]/25 dark:bg-[#3DDC84]/10 dark:text-[#5EE38F]'
    "
  >
    <span :class="dark ? 'text-[#3DDC84]/60' : 'text-[#1AB24F]/60'">{{
      index
    }}</span>
    <span
      aria-hidden="true"
      :class="dark ? 'text-white/25' : 'text-[#1AB24F]/35'"
      >/</span
    >
    {{ label }}
  </span>
</template>
