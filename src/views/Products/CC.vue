<script setup>
import HeroText from "@productComponents/HeroText.vue";
import PhoneHero from "@productComponents/PhoneHero.vue";
import AboutUs from "@productComponents/AboutUs.vue";
import AboutUsDescription from "@productComponents/AboutUsDescription.vue";
import DownloadStore from "@productComponents/DownloadStore.vue";
import ApplicationWorkText from "@productComponents/ApplicationWorkText.vue";
import ApplicationWorkSlider from "@productComponents/ApplicationWorkSlider.vue";
import Circle from "@productComponents/Circle.vue";
import { ref } from "vue";

const work1 = ref(false);

const steps = [
  {
    title: "Face Screening",
    subtitle: "Easy and Quick Health Check with Seleris Medins",
  },
  {
    title: "Face Screening",
    subtitle: "Easy and Quick Health Check with Seleris Medins",
  },
];
</script>

<template>
  <div class="relative w-full min-h-screen overflow-x-hidden">
    <section class="relative w-full h-full rounded-[20px] z-20 p-4" id="hero">
      <div
        class="w-full h-[400px] md:h-[600px] lg:h-[650px] bg-cc bg-no-repeat bg-cover bg-center rounded-[20px] z-20"
      >
        <HeroText
          title="AI Health Care"
          subtitle="Application"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ullamcorper mattis lorem non."
        />
      </div>
      <!-- Image Phone -->
      <div class="w-full h-auto flex -mt-[120px] md:-mt-[250px]">
        <PhoneHero />
      </div>
      <!-- DownloadStore -->
      <div class="w-full h-auto mt-10 md:mt-20">
        <DownloadStore />
      </div>
    </section>
    <!-- Section About Us -->
    <section class="relative w-full h-auto max-w-[1440px] mx-auto" id="about">
      <!-- Circle First -->
      <Circle
        heightClass="h-[200px] md:h-[400px] xl:h-[600px]"
        positionClass="-top-[200px] md:-top-[270px] lg:-top-[400px] -right-[60px] lg:right-[70px]"
      />

      <!-- Circle Second -->
      <Circle
        positionClass="top-[20px] md:top-[0px] lg:-top-[30px] -left-[150px] md:-left-[100px]"
        heightClass="h-[300px] md:h-[400px] xl:h-[500px]"
      />
      <div
        class="relative w-full flex flex-col justify-center items-center z-20 mt-16 md:mt-20 lg:mt-40 px-8"
      >
        <AboutUs
          title="About Us"
          subtitle="Seleris Medins"
          subtitleColor="text-[#42C5AF]"
        />
        <div class="w-full h-auto mt-10 md:mt-10 lg:mt-20">
          <AboutUsDescription
            title="AI Health Care Application"
            description="Seleris Medins uses AI to automate medical data processing and health claims. Our solution helps insurers and corporate healthcare providers reduce costs, detect fraud, predict claim values, and ensure regulatory compliance with ease and accuracy."
          />
        </div>
      </div>
    </section>
    <!-- How Application Work -->
    <section
      class="relative w-full h-auto max-w-[1440px] mx-auto mt-14 lg:mt-20"
      id="work"
    >
      <!-- Circle Third -->
      <Circle
        positionClass="-top-[200px] lg:-top-[170px] -right-0 lg:-right-[70px]"
        heightClass="md:h-[400px] xl:h-[550px]"
        class="sml:hidden md:block"
      />
      <!-- Application Work Slider -->
      <div
        class="relative w-full flex flex-col justify-center items-center z-20"
      >
        <ApplicationWorkText />
        <div class="relative w-full h-auto mt-10 md:mt-12 lg:mt-14">
          <ApplicationWorkSlider :steps="steps" />
        </div>
      </div>
    </section>
    <!-- Section Easy Quick -->
    <section
      class="relative w-full h-auto max-w-[1440px] mx-auto px-8"
      id="easyquick"
    >
      <div class="w-full h-[200px] bg-[#F3F4F6]"></div>
    </section>
  </div>
</template>
