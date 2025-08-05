<script setup>
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

import imageAbout from "@/assets/products/images/health-care-about.png";
import FrameLineWorks from "@productComponents/Svg/HealthCareDescriptionWork.vue";
import medinsframebook from "@/assets/Products/images/bg-book-demo-medins.png";

// HealthCare Data
import { healthCheck } from "@/Data/Products/HealthCare/healthCheck";
import { faq } from "@/Data/Products/HealthCare/faq.js";
import { workSteps } from "@/Data/Products/HealthCare/workSteps.js";
import { testimonials } from "@/Data/Products/HealthCare/testimonials";

const work1 = ref(false);

import { clientLogos } from "@/Data/Products/Medins/medinsClients";
</script>

<template>
  <div class="relative w-full min-h-screen overflow-hidden">
    <!-- Hero -->
    <section class="relative w-full h-full rounded-[20px] z-20 p-4" id="hero">
      <div
        class="w-full h-[400px] md:h-[600px] lg:h-[650px] rounded-[20px] z-20"
      >
        <HeroText
          title="Smarter Corporate Health Monitoring"
          subtitle="Application"
          titlecolor="text-[#195279]"
          subtitlecolor="text-[#13B89C]"
          description=" Empower your organization with AI-driven employee wellness, preventive insights, and health cost control."
          descriptioncolor="text-[#6F6F6F]"
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
      <div
        class="relative w-full flex flex-col justify-center items-center z-20 mt-16 md:mt-20 lg:mt-40 px-8"
      >
        <AboutUs
          title="About Us"
          subtitle="Seleris Care"
          subtitleColor="text-[#42C5AF]"
        />
        <div class="w-full h-auto mt-10 md:mt-10 lg:mt-20">
          <AboutUsDescription
            :image="imageAbout"
            title="Smart Medical Platform"
            description=" Seleris Care is an AI-powered platform built for corporate health and wellness. It automates employee health monitoring, delivers real-time preventive care insights, and helps companies optimize wellness programs while reducing medical costs by up to 20%. With mobile-first deployment and population-level analytics, Seleris Care enables organizations to take proactive control over workforce health."
          />
        </div>
      </div>
    </section>

    <!-- How Application Work -->
    <section
      class="relative w-full h-auto max-w-[1440px] mx-auto mt-14 lg:mt-20"
      id="work"
    >
      <!-- Application Work Slider -->
      <div
        class="relative w-full flex flex-col justify-center items-center z-20"
      >
        <ApplicationWorkText
          productname="Seleris Care"
          textcolor="text-[#42C5AF]"
        />
        <div class="relative w-full h-auto mt-10 md:mt-12 lg:mt-14">
          <ApplicationWorkSlider
            circleColor="bg-gradient-to-b from-[#23C4BA] to-[#4ADDD4]"
            textcolor="text-[#38C1AA]"
            :steps="workSteps"
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
          class="w-full h-auto flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-x-5 gap-y-4 md:gap-y-8 lg:gap-12 mt-16"
        >
          <div
            v-for="(data, index) in healthCheck"
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
        <TestimonialCommentFrame :Testimonials="testimonials" />
      </div>
    </section>

    <!-- FAQ -->
    <section
      class="relative w-full h-auto max-w-[1440px] mx-auto mt-20 lg:mt-20"
      id="faq"
    >
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
          <FaqFrame :Faq="faq" opencolortext="text-[#2AB857]" />
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
        title="Seleris Medins A Complete Solution for Your Health Needs"
        :framebookdemo="medinsframebook"
        colorarrow="text-[#42C5AF]"
      />
    </section>
  </div>
</template>
