<script setup>
import playstore from "@/assets/images/playstore.png";

defineProps({
  appname: {
    type: String,
  },
  description: {
    type: String,
  },
  img: {
    type: String,
  },
});
</script>

<template>
  <div
    class="w-full h-auto flex flex-col-reverse md:flex-row md:items-center justify-between gap-x-8 lg:gap-x-12"
  >
    <div
      class="w-full md:w-[46%] h-auto flex flex-col px-8 md:px-0 mt-10 md:mt-0 md:-translate-y-[10%]"
    >
      <p
        class="text-[#2E504E] text-[28px] md:text-[42px] lg:text-[52px] xl:text-[64px] font-bold leading-[1.1] text-center md:text-left"
      >
        Download
        <br class="hidden md:block" />
        {{ appname }}
      </p>
      <p
        class="mt-4 md:mt-6 xl:mt-9 text-[#535862] text-[13px] md:text-[17px] lg:text-[21px] xl:text-[25px] font-[400] leading-[1.5] md:max-w-[490px] text-center md:text-left"
      >
        {{ description }}
      </p>
      <div
        class="mt-8 md:mt-10 xl:mt-14 w-full h-auto flex justify-center md:justify-start"
      >
        <a
          href="https://play.google.com/store/search?q=blooxia&c=apps&hl=id"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex w-auto h-auto"
        >
          <figure class="w-auto h-auto">
            <img
              :src="playstore"
              alt="Playstore"
              class="h-[38px] md:h-[45px] xl:h-[54px] w-auto object-contain object-left"
              loading="lazy"
              decoding="async"
            />
          </figure>
        </a>
      </div>
    </div>
    <div class="w-full md:w-[54%] h-auto">
      <figure class="w-full h-auto flex justify-center md:justify-end">
        <img
          :src="img"
          alt=""
          class="w-full max-w-[380px] md:max-w-[440px] lg:max-w-[500px] xl:max-w-[540px] h-auto object-contain md:translate-x-[5%]"
        />
      </figure>
    </div>
  </div>
</template>
