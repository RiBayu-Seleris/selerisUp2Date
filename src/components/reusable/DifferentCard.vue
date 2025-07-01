<script setup>
defineProps({
  image: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    required: true,
  },
  imageClass: {
    type: String,
    default: "",
  },
  subtitleClass: {
    type: String,
    default: "",
  },
});
</script>

<template>
  <!-- Desktop -->
  <div class="hidden lg:flex w-full h-auto">
    <div class="flex flex-row w-full h-full">
      <div class="flex w-[25%] h-full">
        <img
          :src="image"
          alt="Icon"
          class="w-[70px] h-[70px] object-contain bg-white rounded-full shadow-lg p-2"
        />
      </div>
      <div class="flex flex-col w-full h-auto pl-2">
        <div class="flex w-full h-auto text-[#195279]">
          <p class="text-2xl pt-3 pb-2">{{ title }}</p>
        </div>
        <div :class="`flex w-full h-auto text-[#4F90BC] {${subtitleClass}}`">
          <p class="text-2xl">{{ subtitle }}</p>
        </div>
      </div>
    </div>
  </div>

  <!-- Mobile & Tabs -->
  <div class="flex lg:hidden w-full h-auto md:justify-center md:items-center">
    <div
      class="flex flex-col sml:flex-row w-full h-full md:justify-center md:items-center"
    >
      <div
        class="flex w-full sml:w-[25%] h-full md:justify-center md:items-center md:pt-4"
      >
        <img
          :src="image"
          alt="Icon"
          class="w-[20%] sml:w-[50px] h-full object-contain bg-white rounded-full shadow-lg p-2"
        />
      </div>
      <div
        class="flex flex-col w-full h-auto md:justify-center md:items-center sml:pl-4"
      >
        <div
          class="flex w-full h-auto text-[#195279] md:justify-center md:items-center md:content-center"
        >
          <p class="sml:text-xl md:text-2xl pb-1 md:pt-2 md:text-center">
            {{ title }}
          </p>
        </div>
        <div
          class="flex w-full h-auto md:h-[75px] text-[#4F90BC] md:justify-center md:items-center"
        >
          <p class="sml:text-md md:text-xl md:text-center md:px-2">
            {{ subtitle }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
