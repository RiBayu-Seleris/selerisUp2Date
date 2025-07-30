<script setup>
defineProps({
  count: {
    type: String,
  },
});
</script>

<template>
  <div class="flex flex-row justify-between gap-x-1">
    <div class="w-full h-auto text-[#6E6E6E] dark:text-[#B2AEAE]">
      <slot name="icon" />
    </div>
    <div class="w-full h-auto">
      <span class="text-[#6E6E6E] dark:text-[#B2AEAE] text-[14px]">
        {{ count }}
      </span>
    </div>
  </div>
</template>
