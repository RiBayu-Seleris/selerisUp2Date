<script setup>
defineProps({
  image: String,
  title: String,
  category: String,
  date: String,
  description: String,
});
</script>

<template>
  <div class="flex flex-col w-[384px] h-auto gap-y-[30px]">
    <div class="w-full h-[220px]">
      <img :src="image" :alt="title" class="w-full h-full object-cover" />
    </div>
    <div
      class="flex flex-row w-full h-auto justify-between text-sm text-[#7A7A7A]"
    >
      <p class="text-[#7B61FF] font-semibold">{{ category }}</p>
      <p class="bg-[#F1F5F9] text-[#0F172A] px-3 py-1 rounded">{{ date }}</p>
    </div>
    <div class="flex w-full h-auto">
      <p class="text-[24px] font-[600] text-[#111928]">
        {{ title }}
      </p>
    </div>
    <div class="flex w-full h-auto">
      <p class="text-[16px] font-[400] text-[#637381]">
        {{ description }}
      </p>
    </div>
  </div>
</template>
