<script setup>
import { lifinsHealthCheck } from "@/Data/Products/Lifins/lifinsHealthCheck";
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
import CircleGradientLeft from "@productComponents/Svg/CircleGradientLeft.vue";
import CircleGradient from "@productComponents/Svg/CircleGradient.vue";
import CircleGradientRight from "@productComponents/Svg/CircleGradientRight.vue";

import CardWithIcon from "@productComponents/CardWithIcon.vue";
import EasyQuickText from "@productComponents/EasyQuickText.vue";
import InnovationIcon from "@/assets/icons/innovation.svg";
import ArrowRight from "@/assets/Products/icons/arrow-right.svg";

import imageAbout from "@/assets/products/images/lifins-about.png";
import FrameLineWorks from "@productComponents/Svg/LifinsDescriptionWork.vue";
import lifinsframebook from "@/assets/Products/images/bg-book-demo-lifins.png";

// FAQ
import { lifinsFaq } from "@/Data/Products/Lifins/lifinsFaq.js";
import { lifinsWorkSteps } from "@/Data/Products/Lifins/lifinsWorkSteps.js";

const work1 = ref(false);

import { clientLogos } from "@/Data/Products/Medins/medinsClients";
import { lifinsTestimonials } from "@/Data/Products/Lifins/lifinsTestimonials";
</script>

<template>
  <div class="relative w-full min-h-screen overflow-hidden">
    <!-- Hero -->
    <section class="relative w-full h-full rounded-[20px] z-20 p-4" id="hero">
      <div
        class="relative w-full h-[400px] md:h-[600px] lg:h-[650px] rounded-[20px] z-20"
      >
        <HeroText
          class="relative"
          title="Automated Life Insurance"
          subtitle="Underwriting"
          titlecolor="text-[#195279]"
          subtitlecolor="text-[#2AB857]"
          description="Accelerate life policy approvals with intelligent, accurate, and customizable AI underwriting."
          descriptioncolor="text-[#6F6F6F]"
        />
      </div>
      <!-- Image Phone -->
      <div
        class="relative w-full max-w-[1440px] mx-auto h-auto flex -mt-[120px] md:-mt-[250px]"
      >
        <!-- Left Circle -->
        <CircleGradientLeft
          heightClass="h-[280px] md:h-[500px] xl:h-[470px]"
          positionClass="top-[10px] md:-top-[70px] xl:-top-[100px] -left-[90px]"
        />
        <!-- Center Circle -->
        <CircleGradient
          heightClass="h-[280px] md:h-[500px] xl:h-[700px]"
          positionClass="top-[10px] md:-top-[70px] xl:-top-[50px] left-1/2 transform -translate-x-1/2"
        />
        <!-- Right Circle -->
        <CircleGradientRight
          heightClass="h-[280px] md:h-[500px] xl:h-[470px]"
          positionClass="top-[10px] md:-top-[70px] xl:-top-[100px] -right-[90px]"
        />
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
          subtitle="Seleris Lifins"
          subtitleColor="text-[#2AB857]"
        />
        <div class="w-full h-auto mt-10 md:mt-10 lg:mt-10">
          <AboutUsDescription
            :image="imageAbout"
            title="Smart Medical Platform"
            description="Seleris Lifins is an intelligent AI platform designed to automate the underwriting process for individual and group life insurance policies. With a 90% faster decision-making engine and configurable business rules, Lifins empowers insurers to streamline risk assessment, minimize human errors, and deliver exceptional customer experience all through a scalable, API-ready architecture."
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
          productname="Seleris Lifins"
          textcolor="text-[#2AB857]"
        />
        <div class="relative w-full h-auto mt-10 md:mt-12 lg:mt-14">
          <ApplicationWorkSlider
            circleColor="bg-gradient-to-b from-[#2B7C3F] to-[#30C254]"
            textcolor="text-[#2AB857]"
            :steps="lifinsWorkSteps"
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
            subtitlecolor="text-[#2AB857]"
            subsubtitle="Seleris Meditekno Internasional"
          />
        </div>
        <div
          class="w-full h-auto flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-x-5 gap-y-4 md:gap-y-8 lg:gap-12 mt-16"
        >
          <div
            v-for="(data, index) in lifinsHealthCheck"
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
          subtitleColor="text-[#2AB857]"
        />
        <ClientCardFrame :client-logos="clientLogos" />
      </div>
    </section>

    <!-- Testimonial -->
    <section
      class="relative w-full h-auto max-w-[1440px] mx-auto mt-20 md:mt-28 lg:mt-40"
      id="testimonial"
    >
      <div
        class="relative w-full flex flex-col justify-center items-center z-20 pt-20"
      >
        <div class="w-full h-auto px-8">
          <TitleAndSubCard
            title="Testimonial"
            subtitle="Seleris Meditekno Internasional"
            subtitleColor="text-[#2AB857]"
          />
        </div>
        <TestimonialCommentFrame :Testimonials="lifinsTestimonials" />
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
              subtitleColor="text-[#2AB857]"
            />
          </div>
        </div>
        <div class="w-full mx-auto mt-10 md:mt-10">
          <FaqFrame :Faq="lifinsFaq" opencolortext="text-[#2AB857]" />
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
          appname="Seleris Lifins"
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
        :framebookdemo="lifinsframebook"
        colorarrow="text-[#2AB857]"
      />
    </section>
  </div>
</template>
