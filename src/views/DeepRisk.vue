<script setup>
import { useIsDark } from "@/utils/useIsDark";
import { useLocalizedList } from "@/utils/i18nList";
import HeroText from "@/components/reusable/TechHero.vue";
import TechLogo from "@/components/reusable/TechLogo.vue";
import TechCard from "@/components/reusable/TechCard.vue";

import SDR_Logo from "@/assets/images/technology/SDR-Logo.svg";
import Dark_SDR_Logo from "@/assets/images/technology/Dark-SDR-Logo.svg";

import { SDR_Content } from "@/Data/SDR_Content";

// Teks kartu diambil dari file locale
const localizedCards = useLocalizedList("technology.sdr", SDR_Content, [
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
    class="flex relative w-full h-auto px-8 bg-[radial-gradient(ellipse_at_top,_#F01149_-70%,_#FAFAFA_60%)] dark:bg-[radial-gradient(ellipse_at_top,_#F01149_-70%,_#17181A_60%)]"
  >
    <HeroText subtitle="Seleris Deep Risk" />
  </section>

  <section
    data-aos="fade-up"
    class="flex relative w-full max-w-[1440px] 2xl:max-w-[1440px] mx-auto h-auto px-8 justify-center"
  >
    <TechLogo :imgUrl="SDR_Logo" :darkImgUrl="Dark_SDR_Logo" />
  </section>

  <section
    data-aos="fade-up"
    class="flex relative w-full max-w-[1440px] 2xl:max-w-[1440px] mx-auto h-auto px-8 justify-center"
  >
    <!-- h-[140px] md:h-[250px] lg:h-[350px] xl:h-[470px] xls:h-[490px] -->
    <div
      class="relative w-full h-auto flex justify-center mt-10 lg:mt-20 bg-[#F3F4F6] dark:bg-[#323232] rounded-3xl"
    >
      <video
        v-if="!isDark"
        autoplay
        loop
        muted
        playsinline
        @contextmenu.prevent
        class="w-full h-full object-cover object-bottom rounded-[20px] aspect-[16/5] dark:bg-[#323232]"
      >
        <source src="@/assets/videos/SDR_Video.mp4" type="video/mp4" />
      </video>
      <video
        v-else
        autoplay
        loop
        muted
        playsinline
        @contextmenu.prevent
        class="w-full h-full object-cover object-bottom rounded-[20px] aspect-[16/6] dark:bg-[#323232]"
      >
        <source src="@/assets/videos/Dark_SDR_Video.mp4" type="video/mp4" />
      </video>
    </div>
  </section>

  <section
    data-aos="fade-up"
    class="flex relative w-full max-w-[1440px] 2xl:max-w-[1440px] mx-auto h-auto px-8 justify-start mt-14 md:mt-20 overflow-x-auto snap-x snap-mandatory scroll-smooth hide-scrollbar gap-x-5 sm:gap-x-10 scroll-pl-8 pl-8 pr-8"
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
  </section>
</template>
