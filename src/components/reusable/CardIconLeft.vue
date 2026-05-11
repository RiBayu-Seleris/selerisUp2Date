<script setup>
defineProps({
  icon: String,
  title: String,
  description: String,
});
</script>
<template>
  <div class="w-full h-auto">
    <div class="w-full h-auto flex flex-row justify-start items-start gap-x-4">
      <div
        class="w-10 h-10 shrink-0 flex justify-center items-center mt-0.5 p-1 bg-[#F1F4F5] rounded-full"
      >
        <img :src="icon" alt="" srcset="" />
      </div>
      <div
        class="w-auto h-auto flex flex-col gap-y-1 justify-center items-center"
      >
        <div class="w-full h-auto">
          <p class="text-[16px] font-[500] text-[#2D3335]">{{ title }}</p>
        </div>
        <div class="w-full h-auto">
          <p class="text-[14px] font-[400] text-[#5A6062]">{{ description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
