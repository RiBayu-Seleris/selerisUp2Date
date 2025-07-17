<script setup>
import HeroText from "@/components/reusable/HeroText.vue";
import TechCard from "@/components/reusable/TechCard.vue";

const cardContents = [
  {
    bgCard: "bg-[#81021E]",
    title: "Health Risk",
    titleColor: "text-[#81021E]",
    body: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
    Donec ullamcorper mattis lorem non. Ultrices praesent amet ipsum justo massa. 
    Eu dolor aliquet risus gravida nunc at feugiat consequat purus. 
    Non massa enim vitae duis mattis. Vel in ultricies vel fringilla.`,
  },
  {
    bgCard: "bg-[#81021E]",
    title: "Health Risk",
    titleColor: "text-[#81021E]",
    body: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
    Donec ullamcorper mattis lorem non. Ultrices praesent amet ipsum justo massa. 
    Eu dolor aliquet risus gravida nunc at feugiat consequat purus. 
    Non massa enim vitae duis mattis. Vel in ultricies vel fringilla.`,
  },
  {
    bgCard: "bg-[#81021E]",
    title: "Health Risk",
    titleColor: "text-[#81021E]",
    body: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
    Donec ullamcorper mattis lorem non. Ultrices praesent amet ipsum justo massa. 
    Eu dolor aliquet risus gravida nunc at feugiat consequat purus. 
    Non massa enim vitae duis mattis. Vel in ultricies vel fringilla.`,
  },
  {
    bgCard: "bg-[#81021E]",
    title: "Health Risk",
    titleColor: "text-[#81021E]",
    body: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
    Donec ullamcorper mattis lorem non. Ultrices praesent amet ipsum justo massa. 
    Eu dolor aliquet risus gravida nunc at feugiat consequat purus. 
    Non massa enim vitae duis mattis. Vel in ultricies vel fringilla.`,
  },
];
</script>

<template>
  <section
    class="flex relative w-full h-auto px-8 bg-[radial-gradient(ellipse_at_top,_#F01149_-70%,_#FAFAFA_60%)] lg:pt-28 xl:pt-0"
  >
    <div class="flex w-full h-auto xl:pt-[160px] md:pt-[100px] sml:pt-[90px]">
      <HeroText title="Technology" subtitle="Seleris Deep Risk" />
    </div>
  </section>

  <section
    class="flex relative w-full max-w-[1440px] 2xl:max-w-[1440px] mx-auto h-auto px-8 justify-center"
  >
    <div class="w-full h-auto flex justify-center mt-10 lg:mt-20">
      <img
        src="@/assets/images/technology/SDR-Logo.svg"
        alt="Logo"
        class="w-[600px] sml:w-[150px] h-full object-contain"
      />
    </div>
  </section>

  <section
    class="flex relative w-full max-w-[1440px] 2xl:max-w-[1440px] mx-auto h-auto px-8 justify-center"
  >
    <div
      class="w-full h-auto flex justify-center mt-10 lg:mt-20 bg-[#F3F4F6] rounded-3xl"
    >
      <img
        src="@/assets/images/technology/SDR-Images.png"
        alt="Logo"
        class="w-full h-full object-contain"
      />
    </div>
  </section>

  <section
    class="flex relative w-full max-w-[1440px] 2xl:max-w-[1440px] mx-auto h-auto px-8 justify-start mt-20 overflow-x-auto snap-x snap-mandatory scroll-smooth hide-scrollbar gap-x-10 scroll-pl-20 pl-20 pr-20"
  >
    <TechCard
      v-for="(cardContent, index) in cardContents"
      :key="index"
      :bgCard="cardContent.bgCard"
      :title="cardContent.title"
      :titleColor="cardContent.titleColor"
      :body="cardContent.body"
    />
  </section>
</template>
