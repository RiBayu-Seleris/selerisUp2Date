<script setup>
import HeroText from "@/components/reusable/TechHero.vue";
import TechLogo from "@/components/reusable/TechLogo.vue";
import TechCard from "@/components/reusable/TechCard.vue";

import SDR_Logo from "@/assets/images/technology/SDR-Logo.svg";
import Dark_SDR_Logo from "@/assets/images/technology/Dark-SDR-Logo.svg";

const cardContents = [
  {
    bgCard: "bg-[#81021E]",
    title: "Health Risk Scoring",
    titleColor: "text-[#81021E]",
    body: `Generates a quantifiable score based on physiological input to assess an individual's current health condition. This score helps users and providers make informed wellness or diagnostic decisions.`,
  },
  {
    bgCard: "bg-[#81021E]",
    title: "Underwriting Risk Prediction",
    titleColor: "text-[#81021E]",
    body: `Predicts insurance underwriting risks by analyzing biometric data. It provides insurers with automated risk profiling to accelerate and improve decision-making accuracy.`,
  },
  {
    bgCard: "bg-[#81021E]",
    title: "Risk Diseases Prediction",
    titleColor: "text-[#81021E]",
    body: `Assesses the likelihood of chronic or critical diseases by combining physiological indicators with AI modeling. It aids early detection and targeted interventions.`,
  },
  {
    bgCard: "bg-[#81021E]",
    title: "Mortality/Morbidity Risk Prediction",
    titleColor: "text-[#81021E]",
    body: `Estimates potential health deterioration or death risk using biometric and behavioral data. This insight supports healthcare, insurance, and wellness decision-making for long-term planning.`,
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
      class="relative w-full h-auto flex justify-center mt-10 lg:mt-20 bg-[#F3F4F6] dark:bg-[#323232] rounded-3xl"
    >
      <video
        autoplay
        loop
        muted
        playsinline
        @contextmenu.prevent
        class="w-full h-full object-cover object-bottom rounded-[20px] aspect-[16/5] dark:bg-[#323232] dark:hidden"
      >
        <source src="@/assets/videos/SDR_Video.mp4" type="video/mp4" />
      </video>
      <video
        autoplay
        loop
        muted
        playsinline
        @contextmenu.prevent
        class="w-full h-full object-cover object-bottom rounded-[20px] aspect-[16/6] dark:bg-[#323232] hidden dark:block"
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
