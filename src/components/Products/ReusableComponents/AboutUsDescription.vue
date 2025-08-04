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
    class="w-full h-auto flex flex-col md:flex-row justify-between md:gap-x-10 xl:gap-x-16 md:px-10"
  >
    <figure class="w-full md:max-w-max justify-center h-auto flex">
      <img :src="image" alt="" class="h-[270px] md:h-[350px] lg:h-[500px]" />
    </figure>
    <div
      class="w-full h-auto flex flex-col pt-8 md:pt-14 lg:pt-20 space-y-4 lg:space-y-8"
    >
      <p
        class="text-[#2E504E] text-[21px] md:text-[27px] lg:text-[37px] font-[600]"
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
