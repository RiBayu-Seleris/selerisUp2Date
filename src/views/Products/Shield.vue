<script setup>
import { shieldHealthCheck } from "@/Data/Products/Shield/ShieldHealthCheck";
import ShieldHero from "@/components/Products/Shield/ShieldHero.vue";
import ShieldShowcase from "@/components/Products/Shield/ShieldShowcase.vue";
import ShieldHowItWorks from "@/components/Products/Shield/ShieldHowItWorks.vue";
import ShieldAutomation from "@/components/Products/Shield/ShieldAutomation.vue";
import ShieldClients from "@/components/Products/Shield/ShieldClients.vue";
import ShieldReviews from "@/components/Products/Shield/ShieldReviews.vue";
import ShieldFaq from "@/components/Products/Shield/ShieldFaq.vue";
import ShieldCta from "@/components/Products/Shield/ShieldCta.vue";
import { useLocalizedList } from "@/utils/i18nList";

import ApplicationWorkText from "@productComponents/ApplicationWorkText.vue";
import ApplicationWorkSlider from "@productComponents/ApplicationWorkSlider.vue";
import TitleAndSubCard from "@productComponents/TitleAndSubCard.vue";
import ClientCardFrameProduct from "@productComponents/ClientCardFrameProduct.vue";
import FaqFrame from "@productComponents/FaqFrame.vue";
import DownloadFrameShield from "@productComponents/DownloadFrameShield.vue";
import BookDemoProduct from "@productComponents/BookDemoProduct.vue";

import TestimonialCommentFrame from "@productComponents/TestimonialCommentFrame.vue";
import Circle from "@productComponents/Svg/Circle.vue";

import CardWithIcon from "@productComponents/CardWithIcon.vue";
import EasyQuickText from "@productComponents/EasyQuickText.vue";

import FrameLineWorks from "@productComponents/Svg/ShieldDescriptionWork.vue";
import shieldframebook from "@/assets/Products/images/bg-book-demo-medins.webp";

import DownloadImage from "@/assets/Products/images/Shield/download-shield.png";
import DownloadWave from "@/assets/Products/images/Shield/frame-download-shield.svg";

// FAQ
import { shieldFaq } from "@/Data/Products/Shield/ShieldFaq.js";
import { shieldWorkSteps } from "@/Data/Products/Shield/ShieldWorkSteps.js";

import { clientLogos } from "@/Data/Products/Shield/ShieldClients";
import { shieldTestimonials } from "@/Data/Products/Shield/ShieldTestimonials";

// gabungkan otomatis base path + nama file
const tampilkanBagianLama = false;

const stepsWithPath = shieldWorkSteps.map((step) => ({
  ...step,
  image: new URL(
    `/src/assets/Products/images/Shield/${step.image}`,
    import.meta.url,
  ).href,
}));

// Teks daftar diambil dari file locale (lihat src/utils/i18nList.js)
const localizedHealthCheck = useLocalizedList(
  "products.shield.healthCheck",
  shieldHealthCheck,
  ["title", "description"],
);
const localizedFaq = useLocalizedList("products.shield.faq", shieldFaq, [
  "question",
  "answer",
]);
const localizedTestimonials = useLocalizedList(
  "products.shared.testimonialsB2B",
  shieldTestimonials,
  ["comment", "authorName", "authorPosition"],
);
const localizedSteps = useLocalizedList(
  "products.shield.workSteps",
  stepsWithPath,
  ["title", "description"],
);
</script>

<template>
  <div class="shield-page relative w-full min-h-screen">
    <ShieldHero />
    <ShieldShowcase />
    <ShieldHowItWorks />
    <ShieldAutomation />
    <ShieldClients />
    <ShieldReviews />
    <ShieldFaq />
    <ShieldCta />

    <template v-if="tampilkanBagianLama">
      <section
        class="relative w-full h-auto max-w-[1440px] mx-auto mt-14 lg:mt-20 scroll-mt-[80px]"
        id="howapplicationwork"
      >
        <Circle
          positionClass="-top-[200px] lg:-top-[170px] -right-0 lg:-right-[70px]"
          heightClass="md:h-[400px] xl:h-[550px]"
          class="hidden md:block"
        />

        <div
          class="relative w-full flex flex-col justify-center items-center z-20"
        >
          <ApplicationWorkText
            :productname="$t('products.shield.name')"
            textcolor="text-[#42C5AF]"
          />
          <div class="relative w-full h-auto mt-10 md:mt-12 lg:mt-14">
            <ApplicationWorkSlider
              circleColor="bg-gradient-to-b from-[#23C4BA] to-[#4ADDD4]"
              textcolor="text-[#38C1AA]"
              :steps="localizedSteps"
              growCard
              descriptionClass="text-[10px] md:text-[13px] lg:text-[16px]"
            >
              <FrameLineWorks />
            </ApplicationWorkSlider>
          </div>
        </div>
      </section>

      <section
        class="relative w-full h-auto max-w-[1440px] mx-auto px-8 mt-20"
        id="easyquick"
      >
        <div
          class="w-full h-auto flex flex-col px-8 pt-14 pb-14 bg-[#F3F4F6] rounded-[20px]"
        >
          <div class="w-full h-auto flex flex-col gap-y-2">
            <EasyQuickText
              :title="$t('products.shared.easyQuickTitle')"
              :subtitle="$t('products.shared.easyQuickSubtitle')"
              subtitlecolor="text-[#42C5AF]"
              :subsubtitle="$t('products.shared.company')"
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

      <section
        class="relative w-full h-auto max-w-[1440px] mx-auto max-smallest:px-0 lg:px-8 mt-20"
        id="client"
      >
        <div class="w-full h-auto flex flex-col">
          <TitleAndSubCard
            :title="$t('products.shared.ourClient')"
            :subtitle="$t('products.shared.company')"
            subtitleColor="text-[#42C5AF]"
          />
          <div class="mt-10 max-smallest:px-0 lg:px-12">
            <ClientCardFrameProduct :client-logos="clientLogos" />
          </div>
        </div>
      </section>

      <section
        class="relative w-full h-auto max-w-[1440px] mx-auto mt-20 md:mt-28 lg:mt-40"
        id="testimonial"
      >
        <Circle
          heightClass="h-[280px] md:h-[500px] xl:h-[500px]"
          positionClass="top-[10px] md:-top-[70px] xl:-top-[60px] left-[45px] md:left-1/2 md:-translate-x-1/2"
        />

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

      <section
        class="relative w-full h-auto max-w-[1440px] mx-auto mt-20 lg:mt-20"
        id="faq"
      >
        <Circle
          heightClass="h-[200px] md:h-[500px] xl:h-[550px]"
          positionClass="-top-[20px] md:-top-[180px] xl:-top-[200px] md:-right-40 lg:right-10"
        />

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
                :title="$t('products.shared.faq')"
                :subtitle="$t('products.shared.company')"
                subtitleColor="text-[#42C5AF]"
              />
            </div>
          </div>
          <div class="w-full mx-auto mt-10 md:mt-10">
            <FaqFrame :Faq="localizedFaq" opencolortext="text-[#2ec4b6]" />
          </div>
        </div>
      </section>

      <section
        data-aos="fade-up"
        class="relative w-full h-auto mt-20 lg:mt-40 py-10 md:py-[12.5%] overflow-hidden"
        id="download"
      >
        <img
          :src="DownloadWave"
          alt=""
          aria-hidden="true"
          class="pointer-events-none select-none absolute left-0 top-1/2 -translate-y-1/2 w-full h-auto z-0"
        />
        <div
          class="relative z-10 w-full h-auto max-w-[1440px] mx-auto md:px-10"
        >
          <div class="w-full h-auto md:max-w-6xl mx-auto">
            <DownloadFrameShield
              :appname="$t('products.shield.name')"
              :description="$t('products.shared.downloadDescription')"
              :img="DownloadImage"
            />
          </div>
        </div>
      </section>

      <section
        class="relative w-full h-auto max-w-[1440px] mx-auto mt-20 lg:mt-40 px-8 z-30 pt-24"
        id="bookdemo"
      >
        <Circle
          heightClass="h-[200px] md:h-[500px] xl:h-[600px]"
          positionClass="-top-[20px] md:top-[200px] xl:top-[-100px] -left-[200px] lg:-left-[80px]"
        />
        <div>
          <BookDemoProduct
            :title="$t('products.shield.bookDemo')"
            :framebookdemo="shieldframebook"
            colorarrow="text-[#42C5AF]"
            bgProduct="bg-[#42C5AF]"
          />
        </div>
      </section>
    </template>
  </div>
</template>

<style scoped>
.shield-page {
  overflow-x: clip;
}
</style>
