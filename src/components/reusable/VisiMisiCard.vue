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
  <div class="relative w-full h-[350px] md:h-[530px] flex flex-col lg:px-8">
    <div class="w-full h-[200px] md:h-[350px]">
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
      class="absolute w-full md:h-[220px] left-0 bottom-0 md:bottom-5 lg:px-8 lg:hover:px-0 rounded-lg group transition-all duration-500 ease-in"
    >
      <div
        class="relative top-5 lg:group-hover:top-0 w-full h-[180px] lg:group-hover:h-full bg-[#DADADA] rounded-lg p-[1px] dark:bg-gradient-to-b dark:from-[#565656] dark:to-[#1D1F23] text-[#6F6F6F] lg:group-hover:bg-gradient-to-br lg:group-hover:from-[#01F27D] lg:group-hover:to-[#00708C] lg:group-hover:p-[3px] lg:group-hover:shadow-[0px_40px_68px_-35px_rgba(34,197,94,0.5)] lg:group-hover:dark:shadow-[0px_40px_68px_-35px_rgba(42,184,87,1)] transition-all duration-500 ease-in"
      >
        <div
          class="relative w-full h-full bg-[#FAFAFA] dark:bg-[#1D1F23] flex flex-col justify-center px-5 space-y-3.5 rounded-lg transition-all duration-500 ease-in"
        >
          <div class="w-full h-auto">
            <p class="text-[17px] lg:text-[27px]">{{ title }}</p>
          </div>
          <div class="w-full h-auto">
            <p class="text-[12px] lg:text-[14px] lg:line-clamp-3">
              {{ description }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
