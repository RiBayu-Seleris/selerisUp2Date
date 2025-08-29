<script setup>
defineProps({
  video: {
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
    class="relative w-full h-[320px] sm:h-[440px] md:h-[410px] lg:h-[530px] flex flex-col lg:px-8"
  >
    <div class="w-full h-[200px] sm:h-[300px] md:h-[250px] lg:h-[350px]">
      <video
        autoplay
        loop
        muted
        playsinline
        @contextmenu.prevent
        class="w-full h-full object-cover object-center rounded-lg"
      >
        <source :src="video" type="video/mp4" />
      </video>
    </div>
    <!-- Frame Hover -->
    <div
      class="absolute w-full md:h-[220px] left-0 bottom-0 sm:bottom-0 md:bottom-0 lg:bottom-5 lg:px-8 lg:hover:px-0 rounded-lg group transition-all duration-500 ease-in"
    >
      <div
        class="relative top-5 cursor-default lg:group-hover:top-0 w-full h-[170px] sm:h-[180px] md:h-[220px] lg:h-[180px] p-[1px] lg:p-[1px] lg:group-hover:h-full bg-gradient-to-br from-[#02fa82] to-[#00708C] lg:bg-[#DADADA] lg:bg-none dark:bg-gradient-to-br dark:from-[#01F27D] dark:to-[#00708C] rounded-lg lg:dark:bg-gradient-to-b lg:dark:from-[#565656] lg:dark:to-[#1D1F23] lg:group-hover:bg-gradient-to-br lg:group-hover:from-[#01F27D] lg:group-hover:to-[#00708C] lg:group-hover:p-[3px] lg:group-hover:shadow-[0px_40px_68px_-35px_rgba(34,197,94,0.5)] lg:group-hover:dark:shadow-[0px_40px_68px_-35px_rgba(42,184,87,1)] transition-all duration-500 ease-in"
      >
        <div
          class="relative w-full h-full bg-[#FAFAFA] dark:bg-[#1D1F23] text-[#6F6F6F] dark:text-white lg:dark:text-[#6F6F6F] lg:dark:group-hover:text-white flex flex-col justify-center md:justify-start lg:justify-center px-5 space-y-2 sm:space-y-3 md:space-y-2 rounded-lg transition-all duration-500 ease-in"
        >
          <div class="w-full h-auto flex items-center mt-0 md:mt-5 lg:mt-0">
            <p class="text-[18px] sm:text-[22px] lg:text-[28px] font-[500]">
              {{ title }}
            </p>
          </div>
          <div class="w-full h-auto">
            <p
              class="text-[10px] sm:text-[14px] md:text-[13px] lg:text-[14px] lg:line-clamp-3 leading-relaxed"
            >
              {{ description }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
