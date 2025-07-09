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
    <p
      class="lg:text-[30px] xl:text-[30px] font-[500] text-[#1AB24F] text-center"
    >
      {{ title }}
    </p>
    <p
      class="lg:text-[43px] xl:text-[60px] font-[500] text-[#195279] text-center"
    >
      {{ subtitle }}
    </p>
    <p class="text-[24px] font-[400] text-[#89A6BA] xl:px-48 text-center">
      {{ description }}
    </p>
  </div>
</template>
