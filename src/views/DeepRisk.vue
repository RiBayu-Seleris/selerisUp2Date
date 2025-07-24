<script setup>
import HeroText from "@/components/reusable/TechHero.vue";
import TechLogo from "@/components/reusable/TechLogo.vue";
import TechCard from "@/components/reusable/TechCard.vue";

import SDR_Logo from "@/assets/images/technology/SDR-Logo.svg";
import Dark_SDR_Logo from "@/assets/images/technology/Dark-SDR-Logo.svg";

const cardContents = [
  {
    bgCard: "bg-[#81021E]",
    title: "Advanced Risk Profiling",
    titleColor: "text-[#81021E]",
    body: `Our system translates biometric data into advanced health risk scores, enabling precise prediction of insurance underwriting risks, potential disease development, and overall life expectancy trends.`,
  },
  {
    bgCard: "bg-[#81021E]",
    title: "Comprehensive Health Risk Insights",
    titleColor: "text-[#81021E]",
    body: `Beyond basic vitals, we provide predictive insights into chronic disease risks, mortality likelihood, and other key factors that support medical decision making and insurance evaluations.`,
  },
  {
    bgCard: "bg-[#81021E]",
    title: "Underwriting & Disease Prediction",
    titleColor: "text-[#81021E]",
    body: `With AI-powered analytics, we offer deep risk assessment across multiple health domains supporting accurate underwriting decisions, early disease identification, and morbidity predictions.`,
  },
  {
    bgCard: "bg-[#81021E]",
    title: "AI-Based Risk Modeling",
    titleColor: "text-[#81021E]",
    body: `Seleris Deep Risk™ combines real-time biometric sensing with advanced risk prediction models to deliver actionable insights for life insurance, preventive healthcare, and chronic disease management.`,
  },
  {
    bgCard: "bg-[#81021E]",
    title: "From Data to Decision",
    titleColor: "text-[#81021E]",
    body: `Using physiological signals and behavioral indicators, we help insurers and healthcare providers predict disease onset, assess mortality risk, and make smarter, faster decisions.`,
  },
];
</script>

<template>
  <section
    class="flex relative w-full h-auto px-8 bg-[radial-gradient(ellipse_at_top,_#F01149_-70%,_#FAFAFA_60%)] dark:bg-[radial-gradient(ellipse_at_top,_#F01149_-70%,_#17181A_60%)]"
  >
    <HeroText subtitle="Seleris Deep Risk" />
  </section>

  <section
    class="flex relative w-full max-w-[1440px] 2xl:max-w-[1440px] mx-auto h-auto px-8 justify-center"
  >
    <TechLogo :imgUrl="SDR_Logo" :darkImgUrl="Dark_SDR_Logo" />
  </section>

  <section
    class="flex relative w-full max-w-[1440px] 2xl:max-w-[1440px] mx-auto h-auto px-8 justify-center"
  >
    <!-- sml:h-[140px] md:h-[250px] lg:h-[350px] xl:h-[470px] xls:h-[490px] -->
    <div
      class="relative w-full h-auto aspect-[16/6] flex justify-center mt-10 lg:mt-20 bg-[#F3F4F6] dark:bg-[#323232] rounded-3xl"
    >
      <video
        autoplay
        loop
        muted
        playsinline
        @contextmenu.prevent
        class="w-full h-full object-cover object-bottom rounded-[20px] dark:bg-[#323232] dark:hidden"
      >
        <source src="@/assets/videos/SDR_Video.mp4" type="video/mp4" />
      </video>
      <video
        autoplay
        loop
        muted
        playsinline
        @contextmenu.prevent
        class="w-full h-full object-cover object-bottom rounded-[20px] dark:bg-[#323232] hidden dark:block"
      >
        <source src="@/assets/videos/Dark_SDR_Video.mp4" type="video/mp4" />
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
