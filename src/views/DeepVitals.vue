<script setup>
import HeroText from "@/components/reusable/TechHero.vue";
import TechLogo from "@/components/reusable/TechLogo.vue";
import TechCard from "@/components/reusable/TechCard.vue";

import SDV_Logo from "@/assets/images/technology/SDV-Logo.svg";
import Dark_SDV_Logo from "@/assets/images/technology/Dark-SDV-Logo.svg";

const cardContents = [
  {
    bgCard: "bg-[#1738B8]",
    title: "Health Risk Assessment",
    titleColor: "text-[#1738B8]",
    body: `We analyze filtered rPPG signals to predict potential health risks, including abnormal heart rate patterns, stress indicators, and fatigue levels—enabling proactive health management.`,
  },
  {
    bgCard: "bg-[#1738B8]",
    title: "AI-Powered Health Insights",
    titleColor: "text-[#1738B8]",
    body: `Using deep learning on facial signal data, our system identifies early warning signs of physiological stress, cardiovascular irregularities, or lifestyle-related risk factors—all in real time.`,
  },
  {
    bgCard: "bg-[#1738B8]",
    title: "Remote Wellness Monitoring",
    titleColor: "text-[#1738B8]",
    body: `Our platform translates facial signal data into actionable wellness metrics, providing continuous health tracking for individuals, organizations, or clinical applications.`,
  },
  {
    bgCard: "bg-[#1738B8]",
    title: "Predictive Vital Analytics",
    titleColor: "text-[#1738B8]",
    body: `By extracting and processing key biometric features, we deliver predictive analytics on your health condition—helping anticipate risks before symptoms arise.`,
  },
];
</script>

<template>
  <section
    class="flex relative w-full h-auto px-8 bg-[radial-gradient(ellipse_at_top,_#466CFF_-70%,_#FAFAFA_60%)] dark:bg-[radial-gradient(ellipse_at_top,_#466CFF_-70%,_#17181A_60%)]"
  >
    <HeroText subtitle="Seleris Deep Vitals" />
  </section>

  <section
    class="flex relative w-full max-w-[1440px] 2xl:max-w-[1440px] mx-auto h-auto px-8 justify-center"
  >
    <TechLogo :imgUrl="SDV_Logo" :darkImgUrl="Dark_SDV_Logo" />
  </section>

  <section
    class="flex relative w-full max-w-[1440px] 2xl:max-w-[1440px] mx-auto h-auto px-8 justify-center"
  >
    <!-- sml:h-[200px] md:h-[250px] lg:h-[350px] xl:h-[650px] -->
    <div
      class="w-full h-auto aspect-[16/8] flex justify-center mt-10 lg:mt-20 bg-[#F3F4F6] dark:bg-[#323232] rounded-3xl"
    >
      <video
        autoplay
        loop
        muted
        playsinline
        @contextmenu.prevent
        class="w-full h-full object-cover rounded-[20px] dark:bg-[#323232] dark:hidden"
      >
        <source src="@/assets/videos/SDV_Video.mp4" type="video/mp4" />
      </video>
      <video
        autoplay
        loop
        muted
        playsinline
        @contextmenu.prevent
        class="w-full h-full object-cover rounded-[20px] dark:bg-[#323232] hidden dark:block"
      >
        <source src="@/assets/videos/Dark_SDV_Video.mp4" type="video/mp4" />
      </video>
    </div>
  </section>

  <section
    class="flex relative w-full max-w-[1440px] 2xl:max-w-[1440px] mx-auto h-auto px-8 justify-start mt-14 md:mt-20 overflow-x-auto snap-x snap-mandatory scroll-smooth hide-scrollbar gap-x-10 scroll-pl-8 pl-8 pr-8"
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
