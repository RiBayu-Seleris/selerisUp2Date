<script setup>
import { ref } from "vue";
import { useLocalizedList } from "@/utils/i18nList";

import HeroText from "@productComponents/HeroText.vue";
import PhoneHero from "@productComponents/PhoneHero.vue";
import AboutUs from "@productComponents/AboutUs.vue";
import AboutUsDescription from "@productComponents/AboutUsDescription.vue";
import DownloadStore from "@productComponents/DownloadStore.vue";
import ApplicationWorkText from "@productComponents/ApplicationWorkText.vue";
import ApplicationWorkSlider from "@productComponents/ApplicationWorkSlider.vue";
import TitleAndSubCard from "@productComponents/TitleAndSubCard.vue";
import ClientCardFrameProduct from "@productComponents/ClientCardFrameProduct.vue";
import FaqFrame from "@productComponents/FaqFrame.vue";
import DownloadFrame from "@productComponents/DownloadFrame.vue";
import BookDemoProduct from "@productComponents/BookDemoProduct.vue";

import TestimonialCommentFrame from "@productComponents/TestimonialCommentFrame.vue";

import CardWithIcon from "@productComponents/CardWithIcon.vue";
import EasyQuickText from "@productComponents/EasyQuickText.vue";

import CareOrnament from "@productComponents/Svg/CareOrnament.vue";
import CareOrnament2 from "@productComponents/Svg/CareOrnament2.vue";
import CareOrnament3 from "@productComponents/Svg/CareOrnament3.vue";
import CareOrnament4 from "@productComponents/Svg/CareOrnament4.vue";

import imageAbout from "@/assets/Products/images/Care/about-care.png";
import FrameLineWorks from "@productComponents/Svg/HealthCareDescriptionWork.vue";
import medinsframebook from "@/assets/Products/images/bg-book-demo-medins.png";

import DownloadImage from "@/assets/Products/images/Care/download-care.png";

// HealthCare Data
import { healthCheck } from "@/Data/Products/HealthCare/HealthCheck";
import { faq } from "@/Data/Products/HealthCare/Faq.js";
import { careWorkSteps } from "@/Data/Products/HealthCare/CareWorkSteps.js";
import { testimonials } from "@/Data/Products/HealthCare/Testimonials.js";

import { clientLogos } from "@/Data/Products/HealthCare/CareClients";

// gabungkan otomatis base path + nama file
const stepsWithPath = careWorkSteps.map((step) => ({
  ...step,
  image: new URL(
    `/src/assets/Products/images/Care/${step.image}`,
    import.meta.url,
  ).href,
}));

// Teks daftar diambil dari file locale (lihat src/utils/i18nList.js)
const localizedHealthCheck = useLocalizedList(
  "products.healthCare.healthCheck",
  healthCheck,
  ["title", "description"],
);
const localizedFaq = useLocalizedList("products.healthCare.faq", faq, [
  "question",
  "answer",
]);
const localizedTestimonials = useLocalizedList(
  "products.shared.testimonialsConsumer",
  testimonials,
  ["name", "location", "text"],
);
const localizedSteps = useLocalizedList(
  "products.shared.workSteps",
  stepsWithPath,
  ["title", "description"],
);
</script>

<template>
  <div class="relative w-full min-h-screen overflow-hidden">
    <!-- Hero -->
    <section class="relative w-full h-full rounded-[20px] z-20" id="hero">
      <div
        class="w-full h-[450px] md:h-[700px] lg:h-[650px] rounded-[20px] z-20"
      >
        <HeroText
          :title="$t('products.healthCare.hero.title')"
          :subtitle="$t('products.healthCare.hero.subtitle')"
          titlecolor="text-[#195279]"
          subtitlecolor="text-[#13B89C]"
          :description="$t('products.healthCare.hero.description')"
          descriptioncolor="text-[#6F6F6F]"
        />
      </div>
      <!-- Image Phone -->
      <div class="relative w-full h-auto flex -mt-[120px] md:-mt-[250px]">
        <CareOrnament positionClass="top-[10px] md:-top-[30px] xl:-top-5" />
        <div class="w-full h-auto flex xl:-mt-[0px]">
          <div class="w-full h-auto flex justify-center items-center">
            <figure class="w-auto max-w-max h-auto flex">
              <img
                src="/assets/images/product-hero-image/care.png"
                alt=""
                class="w-full h-[190px] md:h-[300px] lg:h-[450px] object-contain drop-shadow-[-5px_8px_5px_rgba(0,0,0,0.15)] md:drop-shadow-[-10px_10px_10px_rgba(0,0,0,0.3)] lg:drop-shadow-[-20px_10px_10px_rgba(0,0,0,0.25)]"
              />
            </figure>
          </div>
        </div>
      </div>
      <!-- DownloadStore -->
      <div class="w-full max-w-sm mx-auto h-auto mt-10 md:mt-20">
        <DownloadStore />
      </div>
    </section>

    <!-- About Us -->
    <section class="relative w-full h-auto" id="about">
      <CareOrnament3
        positionClass="top-[150px] sm:-top-5 xl:-top-7"
        heightClass="w-full h-auto lg:h-full"
      />
      <CareOrnament2
        positionClass="bottom-[100px] sm:bottom-0 xl:top-44"
        heightClass="w-full h-auto lg:h-full"
      />
      <div
        class="relative w-full flex flex-col max-w-[1440px] mx-auto justify-center items-center z-20 mt-16 md:mt-20 lg:mt-40 px-8"
      >
        <AboutUs
          :title="$t('products.shared.aboutUs')"
          :subtitle="$t('products.healthCare.name')"
          subtitleColor="text-[#42C5AF]"
        />
        <div class="w-full h-auto mt-10 md:mt-10 lg:mt-10">
          <AboutUsDescription
            :image="imageAbout"
            :title="$t('products.healthCare.about.title')"
            :description="$t('products.healthCare.about.description')"
          />
        </div>
      </div>
    </section>

    <!-- How Application Work -->
    <section
      class="relative w-full h-auto max-w-[1440px] mx-auto mt-14 lg:mt-20 scroll-mt-[80px]"
      id="howapplicationwork"
    >
      <!-- Application Work Slider -->
      <div
        class="relative w-full flex flex-col justify-center items-center z-20"
      >
        <ApplicationWorkText
          :productname="$t('products.healthCare.name')"
          textcolor="text-[#42C5AF]"
        />
        <div class="relative w-full h-auto mt-10 md:mt-12 lg:mt-14">
          <ApplicationWorkSlider
            circleColor="bg-gradient-to-b from-[#23C4BA] to-[#4ADDD4]"
            textcolor="text-[#38C1AA]"
            :steps="localizedSteps"
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
            :title="$t('products.shared.easyQuickTitle')"
            :subtitle="$t('products.shared.easyQuickSubtitle')"
            subtitlecolor="text-[#42C5AF]"
            sub:subtitle="$t('products.shared.company')"
          />
        </div>
        <div
          class="w-full h-auto flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-x-5 gap-y-8 md:gap-y-8 lg:gap-12 mt-10 lg:mt-16"
        >
          <div
            v-for="(data, index) in localizedHealthCheck"
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
      class="relative w-full h-auto max-w-[1440px] mx-auto max-smallest:px-0 px-8 mt-20"
      id="client"
    >
      <div class="w-full h-auto flex flex-col">
        <TitleAndSubCard
          :title="$t('products.shared.ourClient')"
          :subtitle="$t('products.shared.company')"
          subtitleColor="text-[#42C5AF]"
        />
        <div class="mt-10 max-smallest:px-0 px-12">
          <ClientCardFrameProduct :client-logos="clientLogos" />
        </div>
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
            :title="$t('products.shared.testimonial')"
            :subtitle="$t('products.shared.company')"
            subtitleColor="text-[#42C5AF]"
          />
        </div>
        <TestimonialCommentFrame :Testimonials="localizedTestimonials" />
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
              :title="$t('products.shared.faq')"
              :subtitle="$t('products.shared.company')"
              subtitleColor="text-[#42C5AF]"
            />
          </div>
        </div>
        <div class="w-full mx-auto mt-10 md:mt-10">
          <FaqFrame :Faq="localizedFaq" opencolortext="text-[#2AB857]" />
        </div>
      </div>
    </section>

    <!-- Download App -->
    <section
      class="relative w-full h-auto max-w-[1440px] mx-auto mt-20 lg:mt-40"
      id="download"
    >
      <CareOrnament4
        positionClass="top-[150px] sm:-top-5 xl:-top-[200px]"
        heightClass="w-full h-auto lg:h-full"
      />
      <div class="w-full h-auto md:max-w-6xl mx-auto relative z-30">
        <DownloadFrame
          :appname="$t('products.healthCare.name')"
          :description="$t('products.shared.downloadDescription')"
          :img="DownloadImage"
        />
      </div>
    </section>

    <!-- Book Demo -->
    <section
      class="relative w-full h-auto max-w-[1440px] mx-auto mt-20 lg:mt-40 px-8"
      id="bookdemo"
    >
      <BookDemoProduct
        :title="$t('products.healthCare.bookDemo')"
        :framebookdemo="medinsframebook"
        colorarrow="text-[#42C5AF]"
        bgProduct="bg-[#42C5AF]"
      />
    </section>
  </div>
</template>
