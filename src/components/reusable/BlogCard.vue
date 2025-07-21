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
  <div
    class="flex flex-col w-full px-0 sml:px-8 md:px-0 md:w-[350px] lg:w-[290px] xl:w-[360px] h-auto"
  >
    <div class="w-full h-[200px]">
      <img
        :src="image"
        :alt="title"
        class="w-full h-full object-cover rounded-[10px]"
      />
    </div>
    <div
      class="flex flex-row w-full h-auto justify-between text-sm text-[#7A7A7A] my-6"
    >
      <div
        class="flex items-center bg-[#7B61FF]/10 dark:bg-transparent px-4 dark:px-0 rounded-[16px]"
      >
        <p class="text-[#7B61FF] dark:text-[#FFFFFF] font-semibold">
          {{ category }}
        </p>
      </div>
      <div class="flex items-center bg-[#3758F9] px-5 py-1 rounded-[5px]">
        <p class="text-[#FFFFFF]">
          {{ date }}
        </p>
      </div>
    </div>
    <div class="flex w-full h-[80px] text-left">
      <p
        class="text-[19px] font-[600] text-[#111928] dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-br dark:from-[#FAFAFA] dark:via-[#D4D4D4] dark:to-[#AAAAAA]"
      >
        {{ title }}
      </p>
    </div>
    <div class="flex w-full h-[100px]">
      <p class="text-[14px] font-[400] text-[#637381] dark:text-[#6F6F6F]">
        {{ description }}
      </p>
    </div>
  </div>
</template>
