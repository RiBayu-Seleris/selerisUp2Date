<script setup>
import { useIsDark } from "@/utils/useIsDark";
import { useLocalizedList } from "@/utils/i18nList";
import { buatCarousel } from "@/utils/carousel";
import HeroText from "@/components/reusable/TechHero.vue";
import TechLogo from "@/components/reusable/TechLogo.vue";
import TechCard from "@/components/reusable/TechCard.vue";

import SDV_Logo from "@/assets/images/technology/SDV-Logo.svg";
import Dark_SDV_Logo from "@/assets/images/technology/Dark-SDV-Logo.svg";

import { SDV_Content } from "@/Data/SDV_Content";

const kartu = buatCarousel();

// Teks kartu diambil dari file locale
const localizedCards = useLocalizedList("technology.sdv", SDV_Content, [
  "title",
  "body",
]);

// Dipakai di template: video mode terang pakai v-if="!isDark", yang gelap
// pakai v-else. Tujuannya supaya cuma satu video yang benar-benar dibuat
// dan diunduh browser. Penjelasan lengkap ada di src/utils/useIsDark.js
const isDark = useIsDark();
</script>

<template>
  <section
    class="flex relative w-full h-auto px-8 bg-[radial-gradient(ellipse_at_top,_#466CFF_-70%,_#FAFAFA_60%)] dark:bg-[radial-gradient(ellipse_at_top,_#466CFF_-70%,_#17181A_60%)]"
  >
    <HeroText subtitle="Seleris Deep Vitals" />
  </section>

  <section
    data-aos="fade-up"
    class="flex relative w-full max-w-[1440px] 2xl:max-w-[1440px] mx-auto h-auto px-8 justify-center"
  >
    <TechLogo :imgUrl="SDV_Logo" :darkImgUrl="Dark_SDV_Logo" />
  </section>

  <section
    data-aos="fade-up"
    class="flex relative w-full max-w-[1440px] 2xl:max-w-[1440px] mx-auto h-auto px-8 justify-center"
  >
    <div
      class="w-full h-auto aspect-[16/8] flex justify-center mt-10 lg:mt-20 bg-[#F3F4F6] dark:bg-[#323232] rounded-3xl"
    >
      <video
        v-if="!isDark"
        autoplay
        loop
        muted
        playsinline
        @contextmenu.prevent
        class="w-full h-full object-cover rounded-[20px] dark:bg-[#323232]"
      >
        <source src="@/assets/videos/SDV_Video.mp4" type="video/mp4" />
      </video>
      <video
        v-else
        autoplay
        loop
        muted
        playsinline
        @contextmenu.prevent
        class="w-full h-full object-cover rounded-[20px] dark:bg-[#323232]"
      >
        <source src="@/assets/videos/Dark_SDV_Video.mp4" type="video/mp4" />
      </video>
    </div>
  </section>

  <section
    data-aos="fade-up"
    class="relative w-full max-w-[1440px] 2xl:max-w-[1440px] mx-auto h-auto mt-14 md:mt-20"
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
        class="hidden lg:flex absolute left-2 lg:left-8 top-1/2 -translate-y-1/2 z-40 w-12 h-12 p-2 items-center justify-center rounded-full bg-white dark:bg-[#2A2B2D] shadow-md border border-[#E5E7EB] dark:border-[#3A3B3D] text-[#195279] dark:text-[#D4D4D4] hover:bg-[#195279] hover:text-white dark:hover:bg-[#3A3B3D] transition-all duration-200"
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
        class="hidden lg:flex absolute right-2 lg:right-8 top-1/2 -translate-y-1/2 z-40 w-12 h-12 p-2 items-center justify-center rounded-full bg-white dark:bg-[#2A2B2D] shadow-md border border-[#E5E7EB] dark:border-[#3A3B3D] text-[#195279] dark:text-[#D4D4D4] hover:bg-[#195279] hover:text-white dark:hover:bg-[#3A3B3D] transition-all duration-200"
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
      class="cursor-grab flex relative w-full h-auto px-8 justify-start overflow-x-auto snap-x snap-mandatory scroll-smooth hide-scrollbar gap-x-10 scroll-pl-8 pl-8 pr-8"
    >
      <TechCard
        v-for="(cardContent, index) in localizedCards"
        :key="index"
        :bgCard="cardContent.bgCard"
        :icon="cardContent.icon"
        :title="cardContent.title"
        :titleColor="cardContent.titleColor"
        :body="cardContent.body"
      />
    </div>
  </section>
</template>
