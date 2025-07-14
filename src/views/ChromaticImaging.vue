<script setup>
import HeroSection from "@/components/Technology/Chromatic-Imaging.vue";
</script>

<template>
  <section
    class="flex relative w-full h-auto px-8 bg-[radial-gradient(ellipse_at_top,_#3CFF7A_-70%,_#FAFAFA_60%)]"
  >
    <HeroSection />
  </section>

  <section
    class="flex relative w-full max-w-[1440px] 2xl:max-w-[1440px] mx-auto h-auto px-8 justify-center"
  >
    <div class="w-full h-auto flex justify-center mt-10 lg:mt-20">
      <img
        src="@/assets/images/technology/SCI-Logo.svg"
        alt="Logo"
        class="w-[600px] sml:w-[150px] h-full object-contain"
      />
    </div>
  </section>

  <section
    class="flex relative w-full max-w-[1440px] 2xl:max-w-[1440px] mx-auto h-auto px-8 justify-center"
  >
    <div
      class="w-full h-auto flex justify-center mt-10 lg:mt-20 bg-red-500 px-5 py-5 lg:p-20"
    >
      <img
        src="@/assets/images/technology/SCI-Images.png"
        alt="Logo"
        class="w-full h-full object-contain"
      />
    </div>
  </section>
</template>
