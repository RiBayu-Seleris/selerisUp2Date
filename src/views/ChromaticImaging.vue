<script setup>
import { useIsDark } from "@/utils/useIsDark";
import { useLocalizedList } from "@/utils/i18nList";
import HeroText from "@/components/reusable/TechHero.vue";
import TechLogo from "@/components/reusable/TechLogo.vue";
import TechCard from "@/components/reusable/TechCard.vue";

import SCI_Logo from "@/assets/images/technology/SCI-Logo.svg";
import Dark_SCI_Logo from "@/assets/images/technology/Dark-SCI-Logo.svg";

import { SCI_Content } from "@/Data/SCI_Content";

// Teks kartu diambil dari file locale
const localizedCards = useLocalizedList("technology.sci", SCI_Content, [
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
    class="flex relative w-full h-auto px-8 bg-[radial-gradient(ellipse_at_top,_#3CFF7A_-70%,_#FAFAFA_60%)] dark:bg-[radial-gradient(ellipse_at_top,_#3CFF7A_-70%,_#17181A_60%)]"
  >
    <HeroText subtitle="Seleris Chromatic Imaging" />
  </section>

  <!-- SCI LOGO -->
  <section
    data-aos="fade-up"
    class="flex relative w-full max-w-[1440px] 2xl:max-w-[1440px] mx-auto h-auto px-8 justify-center"
  >
    <TechLogo :imgUrl="SCI_Logo" :darkImgUrl="Dark_SCI_Logo" />
  </section>

  <!-- IMAGES -->
  <section
    data-aos="fade-up"
    class="flex relative w-full max-w-[1440px] 2xl:max-w-[1440px] mx-auto h-auto px-8 justify-center mt-10 md:mt-20"
  >
    <!-- h-[190px] md:h-[400px] lg:h-[470px] xl:h-[640px] -->
    <div
      class="w-full h-auto aspect-[16/8] flex justify-center mt-10 lg:mt-20 dark:bg-[#323232] rounded-3xl"
    >
      <video
        v-if="!isDark"
        autoplay
        loop
        muted
        playsinline
        @contextmenu.prevent
        class="w-full h-full object-cover rounded-[20px]"
      >
        <source src="@/assets/videos/SCI_Video.mp4" type="video/mp4" />
      </video>
      <video
        v-else
        autoplay
        loop
        muted
        playsinline
        @contextmenu.prevent
        class="w-full h-full object-cover rounded-[20px]"
      >
        <source src="@/assets/videos/Dark_SCI_Video.mp4" type="video/mp4" />
      </video>
    </div>
  </section>

  <section
    data-aos="fade-up"
    class="flex relative w-full max-w-[1440px] 2xl:max-w-[1440px] mx-auto h-auto px-8 justify-start mt-14 md:mt-20 mb-32 overflow-x-auto snap-x snap-mandatory scroll-smooth hide-scrollbar gap-x-10 scroll-pl-8 pl-8 pr-8"
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
  </section>
</template>
