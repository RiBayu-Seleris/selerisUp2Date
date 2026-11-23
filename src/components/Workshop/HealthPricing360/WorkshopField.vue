<script setup>
defineProps({
  id: { type: String, required: true },
  label: { type: String, required: true },
  error: { type: String, default: "" },
  optional: { type: Boolean, default: false },
});
</script>

<template>
  <div class="flex flex-col">
    <label
      :for="id"
      class="flex items-center justify-between gap-3 text-[13.5px] font-[600] text-[#1F2937] dark:text-[#E5E7EB]"
    >
      {{ label }}
      <span
        v-if="optional"
        class="text-[11.5px] font-[500] text-[#9CA3AF] dark:text-[#737373]"
        >{{ $t("workshop.form.optional") }}</span
      >
    </label>
    <div class="mt-2">
      <slot />
    </div>
    <p
      v-if="error"
      :id="`${id}-error`"
      class="mt-1.5 flex items-center gap-1.5 text-[12.5px] font-[500] text-[#DC2626] dark:text-[#F87171]"
    >
      <svg
        viewBox="0 0 24 24"
        class="w-3.5 h-3.5 shrink-0"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7.5v5.5M12 16.5h.01" />
      </svg>
      {{ error }}
    </p>
  </div>
</template>
