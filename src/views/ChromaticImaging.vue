<script setup>
import { useLocalizedList } from "@/utils/i18nList";
import { buatCarousel } from "@/utils/carousel";
import HeroText from "@/components/reusable/TechHero.vue";
import TechLogo from "@/components/reusable/TechLogo.vue";
import TechCard from "@/components/reusable/TechCard.vue";
import FlowSci from "@/components/Technology/FlowSci.vue";

import SCI_Logo from "@/assets/images/technology/SCI-Logo.svg";
import Dark_SCI_Logo from "@/assets/images/technology/Dark-SCI-Logo.svg";

import { SCI_Content } from "@/Data/SCI_Content";

const kartu = buatCarousel();

// Teks kartu diambil dari file locale
const localizedCards = useLocalizedList("technology.sci", SCI_Content, [
  "title",
  "body",
]);
</script>

<template>
  <section
    class="flex relative w-full h-auto px-8 bg-[radial-gradient(ellipse_at_top,_#3CFF7A_-70%,_#FAFAFA_60%)] dark:bg-[radial-gradient(ellipse_at_top,_#3CFF7A_-70%,_#17181A_60%)]"
  >
    <HeroText subtitle="Seleris Chromatic Imaging" />
  </section>

  <section
    data-aos="fade-up"
    class="flex relative w-full max-w-[1440px] 2xl:max-w-[1440px] mx-auto h-auto px-8 justify-center"
  >
    <TechLogo :imgUrl="SCI_Logo" :darkImgUrl="Dark_SCI_Logo" />
  </section>

  <section
    data-aos="fade-up"
    class="flex relative w-full max-w-[1440px] 2xl:max-w-[1440px] mx-auto h-auto px-8 justify-center mt-10 md:mt-20"
  >
    <div class="w-full h-auto flex justify-center mt-10 lg:mt-20 rounded-3xl">
      <FlowSci />
    </div>
  </section>

  <section
    data-aos="fade-up"
    class="relative w-full max-w-[1440px] 2xl:max-w-[1440px] mx-auto h-auto mt-14 md:mt-20 mb-32"
  >
    <transition
      enter-active-class="duration-300 ease-out"
      enter-from-class="opacity-0 scale-75 -translate-x-3"
      leave-active-class="duration-200 ease-in"
      leave-to-class="opacity-0 scale-75 -translate-x-3"
    >
      <button
        v-if="kartu.bisaKeKiri.value"
        @click="kartu.geser('left')"
        aria-label="Scroll left"
        class="flex absolute left-2 lg:left-8 top-1/2 -translate-y-1/2 z-40 w-10 h-10 lg:w-12 lg:h-12 p-2 items-center justify-center rounded-full bg-white dark:bg-[#2A2B2D] shadow-md border border-[#E5E7EB] dark:border-[#3A3B3D] text-[#195279] dark:text-[#D4D4D4] hover:bg-[#195279] hover:text-white dark:hover:bg-[#3A3B3D] transition-all duration-200"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-full h-full"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>
    </transition>

    <transition
      enter-active-class="duration-300 ease-out"
      enter-from-class="opacity-0 scale-75 translate-x-3"
      leave-active-class="duration-200 ease-in"
      leave-to-class="opacity-0 scale-75 translate-x-3"
    >
      <button
        v-if="kartu.bisaKeKanan.value"
        @click="kartu.geser('right')"
        aria-label="Scroll right"
        class="flex absolute right-2 lg:right-8 top-1/2 -translate-y-1/2 z-40 w-10 h-10 lg:w-12 lg:h-12 p-2 items-center justify-center rounded-full bg-white dark:bg-[#2A2B2D] shadow-md border border-[#E5E7EB] dark:border-[#3A3B3D] text-[#195279] dark:text-[#D4D4D4] hover:bg-[#195279] hover:text-white dark:hover:bg-[#3A3B3D] transition-all duration-200"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-full h-full"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>
    </transition>

    <div
      :ref="kartu.pasangEl"
      @mousedown="kartu.seretMulai"
      @mousemove="kartu.seretGerak"
      @mouseup="kartu.seretSelesai"
      @mouseleave="kartu.seretSelesai"
      @dragstart.prevent
      class="cursor-grab flex relative w-full h-auto px-8 justify-start overflow-x-auto snap-x snap-mandatory scroll-smooth hide-scrollbar gap-x-5 md:gap-x-5 lg:gap-x-8 scroll-pl-8 pl-8 pr-8"
    >
      <TechCard
        v-for="(cardContent, index) in localizedCards"
        :key="index"
        :icon="cardContent.icon"
        :bgCard="cardContent.bgCard"
        :title="cardContent.title"
        :titleColor="cardContent.titleColor"
        :body="cardContent.body"
      />
    </div>
  </section>
</template>
