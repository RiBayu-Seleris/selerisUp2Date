<script setup>
import { ccHealthCheck } from "@/Data/Products/CreditCover/CCHealthCheck";
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
import playstore from "@/assets/images/playstore.png";

import TestimonialCommentFrame from "@productComponents/TestimonialCommentFrame.vue";
import Circle from "@productComponents/Svg/Circle.vue";

import CardWithIcon from "@productComponents/CardWithIcon.vue";
import EasyQuickText from "@productComponents/EasyQuickText.vue";

import imageAbout from "@/assets/Products/images/Credit-Cover/about-cc.png";
import FrameLineWorks from "@productComponents/Svg/CCDescriptionWork.vue";
import ccframebook from "@/assets/Products/images/bg-book-demo-cc.png";

// FAQ
import { ccFaq } from "@/Data/Products/CreditCover/CCFaq.js";
import { ccWorkSteps } from "@/Data/Products/CreditCover/CCWorkSteps.js";

import DownloadImage from "@/assets/Products/images/Credit-Cover/download-cc.png";

import { clientLogos } from "@/Data/Products/CreditCover/CCClients";
import { ccTestimonials } from "@/Data/Products/CreditCover/CCTestimonials";

const stepsWithPath = ccWorkSteps.map((step) => ({
  ...step,
  image: new URL(
    `/src/assets/Products/images/Credit-Cover/${step.image}`,
    import.meta.url,
  ).href,
}));

// Teks daftar diambil dari file locale (lihat src/utils/i18nList.js)
const localizedHealthCheck = useLocalizedList(
  "products.creditCover.healthCheck",
  ccHealthCheck,
  ["title", "description"],
);
const localizedFaq = useLocalizedList("products.creditCover.faq", ccFaq, [
  "question",
  "answer",
]);
const localizedTestimonials = useLocalizedList(
  "products.shared.testimonialsB2B",
  ccTestimonials,
  ["comment", "authorName", "authorPosition"],
);
const localizedSteps = useLocalizedList(
  "products.shared.workSteps",
  stepsWithPath,
  ["title", "description"],
);
</script>

<template>
  <div class="relative w-full min-h-screen overflow-hidden">
    <section class="relative w-full h-full rounded-[20px] z-20 p-2" id="hero">
      <div
        class="w-full h-[400px] md:h-[550px] lg:h-[650px] bg-cc bg-no-repeat bg-cover bg-bottom rounded-[20px] z-20"
      >
        <HeroText
          :title="$t('products.creditCover.hero.title')"
          :subtitle="$t('products.creditCover.hero.subtitle')"
          :description="$t('products.creditCover.hero.description')"
        />
      </div>

      <div
        class="w-full h-auto flex -mt-[120px] md:-mt-[200px] lg:-mt-[250px] xl:-mt-[240px]"
      >
        <div class="w-full h-auto flex justify-center items-center">
          <figure class="w-auto max-w-max h-auto flex">
            <img
              src="/assets/images/product-hero-image/cc.png"
              alt=""
              class="w-full h-[190px] md:h-[300px] lg:h-[400px] object-contain drop-shadow-[-5px_8px_5px_rgba(0,0,0,0.15)] md:drop-shadow-[-10px_10px_10px_rgba(0,0,0,0.3)] lg:drop-shadow-[-20px_10px_10px_rgba(0,0,0,0.25)]"
            />
          </figure>
        </div>
      </div>

      <!-- <div class="w-full max-w-sm mx-auto h-auto mt-10 md:mt-20">
        <DownloadStore />
      </div> -->

      <div
        class="w-full max-w-sm mx-auto h-auto max-smallest:px-8 px-0 mt-10 md:mt-20"
      >
        <div class="w-full h-[100px] flex justify-center">
          <a
            href="https://play.google.com/store/search?q=blooxia&c=apps&hl=id"
            target="_blank"
            rel="noopener noreferrer"
            class="flex w-full h-auto justify-start"
          >
            <figure class="w-full h-auto">
              <img
                :src="playstore"
                alt="Playstore"
                class="w-full h-[30px] sm:h-[60px] object-contain object-center"
                loading="lazy"
                decoding="async"
              />
            </figure>
          </a>
        </div>
        <!-- <DownloadStore /> -->
      </div>
    </section>

    <section
      data-aos="fade-up"
      class="relative w-full h-auto max-w-[1440px] mx-auto"
      id="about"
    >
      <Circle
        heightClass="h-[300px] md:h-[400px] xl:h-[600px]"
        positionClass="-top-[340px] md:-top-[500px] lg:-top-[730px] left-1/2 -translate-x-1/2"
      />
      <div
        class="relative w-full flex flex-col justify-center items-center z-20 mt-16 md:mt-20 lg:mt-40 px-8"
      >
        <AboutUs
          :title="$t('products.shared.aboutUs')"
          :subtitle="$t('products.creditCover.name')"
          subtitleColor="text-[#E84C7F]"
        />
        <div class="w-full h-auto mt-10 md:mt-10 lg:mt-10">
          <AboutUsDescription
            :image="imageAbout"
            :title="$t('products.creditCover.about.title')"
            :description="$t('products.creditCover.about.description')"
          />
        </div>
      </div>
    </section>

    <section
      data-aos="fade-up"
      class="relative w-full h-auto max-w-[1440px] mx-auto mt-14 lg:mt-20 scroll-mt-[80px]"
      id="howapplicationwork"
    >
      <div
        class="relative w-full flex flex-col justify-center items-center z-20"
      >
        <ApplicationWorkText
          :productname="$t('products.creditCover.name')"
          textcolor="text-[#E84C7F]"
        />
        <div class="relative w-full h-auto mt-10 md:mt-12 lg:mt-14">
          <ApplicationWorkSlider
            circleColor="bg-gradient-to-b from-[#E84C7F] to-[#EF83A6]"
            textcolor="text-[#E84C7F]"
            :steps="localizedSteps"
          >
            <FrameLineWorks />
          </ApplicationWorkSlider>
        </div>
      </div>
    </section>

    <section
      data-aos="fade-up"
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
            subtitlecolor="text-[#E84C7F]"
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

    <section
      data-aos="fade-up"
      class="relative w-full h-auto max-w-[1440px] mx-auto max-smallest:px-0 lg:px-8 mt-20"
      id="client"
    >
      <div class="w-full h-auto flex flex-col">
        <TitleAndSubCard
          :title="$t('products.shared.ourClient')"
          :subtitle="$t('products.shared.company')"
          subtitleColor="text-[#E84C7F]"
        />
        <div class="mt-10 max-smallest:px-0 lg:px-12">
          <ClientCardFrameProduct :client-logos="clientLogos" />
        </div>
      </div>
    </section>

    <section
      data-aos="fade-up"
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
            subtitleColor="text-[#E84C7F]"
          />
        </div>
        <TestimonialCommentFrame :Testimonials="localizedTestimonials" />
      </div>
    </section>

    <section
      data-aos="fade-up"
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
              subtitleColor="text-[#E84C7F]"
            />
          </div>
        </div>
        <div class="w-full mx-auto mt-10 md:mt-10">
          <FaqFrame :Faq="localizedFaq" opencolortext="text-[#E84C7F]" />
        </div>
      </div>
    </section>

    <section
      data-aos="fade-up"
      class="relative w-full h-auto max-w-[1440px] mx-auto mt-20 md:px-12 lg:mt-40"
      id="download"
    >
      <div class="w-full h-auto md:max-w-6xl mx-auto">
        <DownloadFrame
          :appname="$t('products.creditCover.name')"
          :description="$t('products.shared.downloadDescription')"
          :img="DownloadImage"
        />
      </div>
    </section>

    <section
      data-aos="fade-up"
      class="relative w-full h-auto max-w-[1440px] mx-auto mt-20 lg:mt-40 px-8"
      id="bookdemo"
    >
      <BookDemoProduct
        :title="$t('products.creditCover.bookDemo')"
        :framebookdemo="ccframebook"
        colorarrow="text-[#E84C7F]"
        bgProduct="bg-[#E84C7F]"
      />
    </section>
  </div>
</template>
