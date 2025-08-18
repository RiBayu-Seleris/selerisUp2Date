<script setup>
defineProps({
  image: {
    type: String,
  },
  title: {
    type: String,
  },
  description: {
    type: String,
  },
});
</script>

<template>
  <div
    class="w-full h-auto flex flex-col lg:flex-row justify-between md:gap-x-10 xl:gap-x-16 md:px-10"
  >
    <figure class="w-full lg:w-1/2 justify-center h-auto flex">
      <img :src="image" alt="" class="h-[270px] md:h-[400px] lg:h-[500px]" />
    </figure>
    <div
      class="w-full lg:w-1/2 h-auto flex flex-col pt-0 lg:pt-20 space-y-4 lg:space-y-8"
    >
      <p
        class="text-[#2E504E] text-[21px] md:text-[23px] lg:text-[37px] font-[600]"
      >
        <!-- AI Health Care Application -->
        {{ title }}
      </p>
      <p class="text-[#535862] text-[14px] md:text-[17px] lg:text-[21px]">
        {{ description }}
      </p>
    </div>
  </div>
</template>
