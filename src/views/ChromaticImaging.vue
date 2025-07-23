<script setup>
import HeroText from "@/components/reusable/TechHero.vue";
import TechLogo from "@/components/reusable/TechLogo.vue";
import TechCard from "@/components/reusable/TechCard.vue";

import SCI_Logo from "@/assets/images/technology/SCI-Logo.svg";
import Dark_SCI_Logo from "@/assets/images/technology/Dark-SCI-Logo.svg";

const cardContents = [
  {
    bgCard: "bg-[#2B7C3F]",
    title: "Vital Sign Monitoring",
    titleColor: "text-[#2B7C3F]",
    body: `By analyzing facial blood flow patterns, our system provides accurate, contactless monitoring of key vital signs such as heart rate, respiratory rate, and stress indicators—anytime, anywhere.`,
  },
  {
    bgCard: "bg-[#2B7C3F]",
    title: "Early Health Insights",
    titleColor: "text-[#2B7C3F]",
    body: `Our platform detects subtle physiological changes, allowing early identification of potential health issues such as fatigue, cardiovascular irregularities, or stress—enabling smarter lifestyle choices.`,
  },
  {
    bgCard: "bg-[#2B7C3F]",
    title: "Contactless Screening",
    titleColor: "text-[#2B7C3F]",
    body: `Utilizing advanced facial video analysis, we offer a hygienic and convenient way to assess health status without physical contact—ideal for public settings, clinics, or daily self-monitoring.`,
  },
];
</script>

<template>
  <section
    class="flex relative w-full h-auto px-8 bg-[radial-gradient(ellipse_at_top,_#3CFF7A_-70%,_#FAFAFA_60%)] dark:bg-[radial-gradient(ellipse_at_top,_#3CFF7A_-70%,_#17181A_60%)]"
  >
    <HeroText subtitle="Seleris Chromatic Imaging" />
  </section>

  <!-- SCI LOGO -->
  <section
    class="flex relative w-full max-w-[1440px] 2xl:max-w-[1440px] mx-auto h-auto px-8 justify-center"
  >
    <TechLogo :imgUrl="SCI_Logo" :darkImgUrl="Dark_SCI_Logo" />
  </section>

  <!-- IMAGES -->
  <section
    class="flex relative w-full max-w-[1440px] 2xl:max-w-[1440px] mx-auto h-auto px-8 justify-center mt-10 md:mt-20"
  >
    <!-- sml:h-[190px] md:h-[400px] lg:h-[470px] xl:h-[640px] -->
    <div
      class="w-full h-auto aspect-[16/8] flex justify-center mt-10 lg:mt-20 bg-[#F3F4F6] dark:bg-[#323232] rounded-3xl"
    >
      <video
        autoplay
        loop
        muted
        playsinline
        @contextmenu.prevent
        class="w-full h-full object-cover rounded-[20px] dark:border-[0.1px] dark:border-[#FAFAFA]/25 dark:hidden"
      >
        <source src="@/assets/videos/SCI_Video.mp4" type="video/mp4" />
      </video>
      <video
        autoplay
        loop
        muted
        playsinline
        @contextmenu.prevent
        class="w-full h-full object-cover rounded-[20px] dark:border-[0.1px] dark:border-[#FAFAFA]/25 hidden dark:block"
      >
        <source src="@/assets/videos/Dark_SCI_Video.mp4" type="video/mp4" />
      </video>
    </div>
  </section>

  <section
    class="flex relative w-full max-w-[1440px] 2xl:max-w-[1440px] mx-auto h-auto px-8 justify-start mt-14 md:mt-20 mb-32 overflow-x-auto snap-x snap-mandatory scroll-smooth hide-scrollbar gap-x-10 scroll-pl-8 pl-8 pr-8"
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
