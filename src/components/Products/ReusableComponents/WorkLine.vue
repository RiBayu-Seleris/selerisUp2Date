<script setup>
defineProps({
  circleColor: {
    type: String,
  },
  textcolor: {
    type: String,
  },
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  isLast: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <div class="w-auto h-auto flex items-center">
    <div class="relative flex flex-row w-auto h-full">
      <div class="absolute w-full h-1/2 bottom-[0px] justify-center flex pt-8">
        <div class="relative w-full h-full md:w-auto md:h-auto">
          <slot />
          <!-- INI FRAME DIBAWAH LINGKARAN -->
          <div
            class="absolute w-full h-full top-0 flex flex-col justify-center items-center px-8 gap-y-1 lg:gap-y-2 pt-4 md:pt-8"
          >
            <div class="w-full flex justify-center">
              <p
                :class="[
                  `${textcolor} text-center text-[17px] md:text-[23px] lg:text-[21px] `,
                ]"
              >
                {{ title }}
              </p>
            </div>
            <div class="w-full flex justify-center">
              <p
                class="text-center text-[12px] md:text-[14px] lg:text-[17px] text-[#6F6F6F]"
              >
                {{ description }}
              </p>
            </div>
          </div>
        </div>
      </div>
      <!-- LineStart -->
      <div class="w-[90px] md:w-32 lg:w-44 h-auto flex items-center">
        <div class="w-full h-[2.5px] bg-[#868686] rounded-full" />
      </div>
      <!-- Circle -->
      <div class="relative w-auto h-auto rounded-full flex items-center">
        <div :class="[`w-10 h-10 ${circleColor} rounded-full shadow-xl`]" />
      </div>
      <!-- LineEnd -->
      <div class="w-[90px] md:w-32 lg:w-44 h-auto flex items-center">
        <div
          v-if="!isLast"
          class="w-full h-[2.5px] bg-[#868686] rounded-full"
        />
      </div>
    </div>
  </div>
</template>
