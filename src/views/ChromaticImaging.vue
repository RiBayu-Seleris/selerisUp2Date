<script setup>
import HeroText from "@/components/reusable/TechHero.vue";
import TechLogo from "@/components/reusable/TechLogo.vue";
import TechCard from "@/components/reusable/TechCard.vue";

import SCI_Logo from "@/assets/images/technology/SCI-Logo.svg";
import Dark_SCI_Logo from "@/assets/images/technology/Dark-SCI-Logo.svg";

const cardContents = [
  {
    bgCard: "bg-[#2B7C3F]",
    title: "Capturing Facial Blood Flow Video",
    titleColor: "text-[#2B7C3F]",
    body: `Captures real-time facial video to analyze micro blood flow changes using standard cameras. This process is non-contact and helps extract physiological signals from skin color fluctuations linked to blood circulation.`,
  },
  {
    bgCard: "bg-[#2B7C3F]",
    title: "Object Detection",
    titleColor: "text-[#2B7C3F]",
    body: `Detects and tracks facial areas and other relevant objects to ensure the correct region is monitored throughout the video. This improves accuracy by isolating key visual components.`,
  },
  {
    bgCard: "bg-[#2B7C3F]",
    title: "Requirement Condition Detection",
    titleColor: "text-[#2B7C3F]",
    body: `Automatically checks for environmental and positional requirements such as lighting quality, subject distance, and motion artifacts. This ensures the system only processes usable and reliable visual data.`,
  },
  {
    bgCard: "bg-[#2B7C3F]",
    title: "Region of Interest (ROI)",
    titleColor: "text-[#2B7C3F]",
    body: `Selects specific facial zones (like the forehead or cheeks) where blood flow signals are most visible. Focusing on ROI improves signal strength and reduces noise from unrelated areas.`,
  },
  {
    bgCard: "bg-[#2B7C3F]",
    title: "Raw (RGB) Signals Extraction",
    titleColor: "text-[#2B7C3F]",
    body: `Extracts color channel values (Red, Green, Blue) from the ROI. These raw signals form the basis for further physiological analysis, capturing subtle changes caused by blood flow variations.`,
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
      class="w-full h-auto aspect-[16/8] flex justify-center mt-10 lg:mt-20 dark:bg-[#323232] rounded-3xl"
    >
      <video
        autoplay
        loop
        muted
        playsinline
        @contextmenu.prevent
        class="w-full h-full object-cover rounded-[20px] dark:hidden"
      >
        <source src="@/assets/videos/SCI_Video.mp4" type="video/mp4" />
      </video>
      <video
        autoplay
        loop
        muted
        playsinline
        @contextmenu.prevent
        class="w-full h-full object-cover rounded-[20px] hidden dark:block"
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
