<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <div class="flex flex-col w-full h-auto gap-y-2 justify-center items-center">
    <p class="text-[30px] font-[500] text-[#1AB24F]">{{ title }}</p>
    <p class="text-[60px] font-[500] text-[#195279]">{{ subtitle }}</p>
    <p class="text-[24px] font-[400] text-[#89A6BA] xl:px-48 text-center">
      {{ description }}
    </p>
  </div>
</template>
