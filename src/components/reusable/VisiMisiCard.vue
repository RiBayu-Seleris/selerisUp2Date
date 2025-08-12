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
    class="relative w-[300px] lg:w-full h-[400px] lg:h-[550px] rounded-lg flex flex-col items-center flex-shrink-0 lg:flex-shrink"
  >
    <div class="relative w-full h-[60%] px-5">
      <div class="w-full h-full rounded-lg">
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
    </div>
    <div
      class="absolute w-full h-[50%] lg:h-[40%] bottom-0 lg:bottom-10 p-5 hover:p-0 transition-all duration-500 group"
    >
      <div
        class="w-full h-full bg-[#DADADA] text-[#6F6F6F] group-hover:text-[#195279] group-hover:bg-gradient-to-br group-hover:from-[#01F27D] group-hover:to-[#00708C] rounded-lg p-[1px] group-hover:shadow-[0px_29px_68px_-35px_rgba(34,_197,_94,_0.5)]"
      >
        <div
          class="relative w-full h-full flex flex-col space-y-2 lg:space-y-3 bg-[#FAFAFA] rounded-lg p-5 group-hover:p-5 transition-all duration-500"
        >
          <div class="w-full h-auto">
            <p
              class="text-[17px] lg:text-[27px] group-hover:text-[19px] group-hover:lg:text-[32px] transition-all duration-500 font-[500]"
            >
              {{ title }}
            </p>
          </div>
          <div
            class="w-full h-auto line-clamp-3 group-hover:line-clamp-none transition-all duration-700"
          >
            <p
              class="text-[12px] lg:text-[14px] group-hover:lg:text-[17px] transition-all duration-700"
            >
              {{ description }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
