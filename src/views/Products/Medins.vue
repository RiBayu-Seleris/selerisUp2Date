<script setup>
import { medinsHealthCheck } from "@/Data/Products/Medins/medinsHealthCheck";
import { ref } from "vue";

import HeroText from "@productComponents/HeroText.vue";
import PhoneHero from "@productComponents/PhoneHero.vue";
import AboutUs from "@productComponents/AboutUs.vue";
import AboutUsDescription from "@productComponents/AboutUsDescription.vue";
import DownloadStore from "@productComponents/DownloadStore.vue";
import ApplicationWorkText from "@productComponents/ApplicationWorkText.vue";
import ApplicationWorkSlider from "@productComponents/ApplicationWorkSlider.vue";
import TitleAndSubCard from "@productComponents/TitleAndSubCard.vue";
import ClientCardFrame from "@productComponents/ClientCardFrame.vue";
import FaqFrame from "@productComponents/FaqFrame.vue";
import DownloadFrame from "@productComponents/DownloadFrame.vue";
import BookDemoProduct from "@productComponents/BookDemoProduct.vue";

import TestimonialCommentFrame from "@productComponents/TestimonialCommentFrame.vue";
import Circle from "@productComponents/Circle.vue";

import CardWithIcon from "@productComponents/CardWithIcon.vue";
import EasyQuickText from "@productComponents/EasyQuickText.vue";
import InnovationIcon from "@/assets/icons/innovation.svg";
import ArrowRight from "@/assets/Products/icons/arrow-right.svg";

import imageAbout from "@/assets/products/images/medins-about.png";
import FrameLineWorks from "@productComponents/Svg/MedinsDescriptionWork.vue";
import medinsframebook from "@/assets/Products/images/bg-book-demo-medins.png";

// FAQ
import { medinsFaq } from "@/Data/Products/Medins/medinsFaq.js";
import { medinsWorkSteps } from "@/Data/Products/Medins/medinsWorkSteps.js";

const work1 = ref(false);

import { clientLogos } from "@/Data/Products/Medins/medinsClients";
import { medinsTestimonials } from "@/Data/Products/Medins/medinsTestimonials";
</script>

<template>
  <div class="relative w-full min-h-screen overflow-hidden">
    <!-- Hero -->
    <section class="relative w-full h-full rounded-[20px] z-20 p-4" id="hero">
      <div
        class="w-full h-[400px] md:h-[600px] lg:h-[650px] bg-medins bg-no-repeat bg-cover bg-center rounded-[20px] z-20"
      >
        <HeroText
          title="Seleris Medins"
          subtitle="Application"
          description="Enhance efficiency and accuracy in health insurance operations with AI-driven medical data automation."
        />
      </div>
      <!-- Image Phone -->
      <div class="w-full h-auto flex -mt-[120px] md:-mt-[250px]">
        <PhoneHero />
      </div>
      <!-- DownloadStore -->
      <div class="w-full max-w-sm mx-auto h-auto mt-10 md:mt-20">
        <DownloadStore />
      </div>
    </section>

    <!-- About Us -->
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
            :image="imageAbout"
            title="Smart Medical Platform"
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
        <ApplicationWorkText
          productname="Seleris Medins"
          textcolor="text-[#42C5AF]"
        />
        <div class="relative w-full h-auto mt-10 md:mt-12 lg:mt-14">
          <ApplicationWorkSlider
            circleColor="bg-gradient-to-b from-[#23C4BA] to-[#4ADDD4]"
            textcolor="text-[#38C1AA]"
            :steps="medinsWorkSteps"
          >
            <FrameLineWorks />
          </ApplicationWorkSlider>
        </div>
      </div>
    </section>

    <!-- Easy Quick -->
    <section
      class="relative w-full h-auto max-w-[1440px] mx-auto px-8 mt-20"
      id="easyquick"
    >
      <div
        class="w-full h-auto flex flex-col px-8 pt-14 pb-20 bg-[#F3F4F6] rounded-[20px]"
      >
        <div class="w-full h-auto flex flex-col gap-y-2">
          <EasyQuickText
            title="Smarter Medical Claims with"
            subtitle="AI-Powered Automation"
            subtitlecolor="text-[#42C5AF]"
            subsubtitle="Seleris Meditekno Internasional"
          />
        </div>
        <div
          class="w-full h-auto flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-x-5 gap-y-4 md:gap-y-8 lg:gap-12 mt-10"
        >
          <div
            v-for="(data, index) in medinsHealthCheck"
            :key="index"
            class="w-full h-auto"
          >
            <CardWithIcon
              :icon="data.icon"
              :title="data.title"
              :description="data.description"
              :subtitleClass="data.subtitleClass"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Client -->
    <section
      class="relative w-full h-auto max-w-[1440px] mx-auto px-8 mt-20"
      id="client"
    >
      <div class="w-full h-auto flex flex-col">
        <TitleAndSubCard
          title="Our Client"
          subtitle="Seleris Meditekno Internasional"
          subtitleColor="text-[#42C5AF]"
        />
        <ClientCardFrame :client-logos="clientLogos" />
      </div>
    </section>

    <!-- Testimonial -->
    <section
      class="relative w-full h-auto max-w-[1440px] mx-auto mt-20 md:mt-28 lg:mt-40"
      id="Testimonial"
    >
      <!-- Circle Fourth -->
      <Circle
        heightClass="h-[280px] md:h-[500px] xl:h-[500px]"
        positionClass="top-[10px] md:-top-[70px] xl:-top-[60px] left-[45px] md:left-1/2 md:-translate-x-1/2"
      />

      <div
        class="relative w-full flex flex-col justify-center items-center z-20 pt-20"
      >
        <div class="w-full h-auto px-8">
          <TitleAndSubCard
            title="Testimonial"
            subtitle="Seleris Meditekno Internasional"
            subtitleColor="text-[#42C5AF]"
          />
        </div>
        <TestimonialCommentFrame :Testimonials="medinsTestimonials" />
      </div>
    </section>

    <!-- FAQ -->
    <section
      class="relative w-full h-auto max-w-[1440px] mx-auto mt-20 lg:mt-20"
      id="faq"
    >
      <!-- Circle Fifth -->
      <Circle
        heightClass="h-[200px] md:h-[500px] xl:h-[550px]"
        positionClass="-top-[20px] md:-top-[180px] xl:-top-[200px] md:-right-40 lg:right-10"
      />

      <!-- Circle Sixth -->
      <Circle
        heightClass="h-[200px] md:h-[500px] xl:h-[400px]"
        positionClass="-top-[20px] md:top-[200px] xl:top-[200px] -left-[200px] lg:-left-[80px]"
      />

      <div class="relative w-full z-30">
        <div
          class="relative w-full flex flex-col justify-center items-center z-20 pt-20"
        >
          <div class="w-full h-auto px-8">
            <TitleAndSubCard
              title="FAQ's"
              subtitle="Seleris Meditekno Internasional"
              subtitleColor="text-[#42C5AF]"
            />
          </div>
        </div>
        <div class="w-full mx-auto mt-10 md:mt-20">
          <FaqFrame :Faq="medinsFaq" opencolortext="text-[#2AB857]" />
        </div>
      </div>
    </section>

    <!-- Download App -->
    <section
      class="relative w-full h-auto max-w-[1440px] mx-auto mt-20 lg:mt-40"
      id="download"
    >
      <div class="w-full h-auto md:max-w-6xl mx-auto">
        <DownloadFrame
          appname="Seleris Medins"
          description="Stay in control of your health data and claims anytime, anywhere. Our
          AI-powered platform makes medical data processing, claims tracking,
          and risk analysis easier and faster."
        />
      </div>
    </section>

    <!-- Book Demo -->
    <section
      class="relative w-full h-auto max-w-[1440px] mx-auto mt-20 lg:mt-40 px-8"
      id="bookdemo"
    >
      <BookDemoProduct
        :framebookdemo="medinsframebook"
        colorarrow="text-[#42C5AF]"
      />
    </section>
  </div>
</template>
