<script setup>
import { onBeforeUnmount, onMounted, ref } from "vue";

import HeroText from "@productComponents/HeroText.vue";
import TitleAndSubCard from "@productComponents/TitleAndSubCard.vue";
import ClientCardFrameProduct from "@productComponents/ClientCardFrameProduct.vue";
import { clientLogos } from "@/Data/Products/SelerisCredit/SCClients";
import HealthScoreGif from "@/assets/Products/images/Credit/health-score.gif";
import ChecklistIcon from "@/components/icons/Checklist.vue";

import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import { useVideoOnView } from "@/composables/useVideoOnView";

const creditVideo = ref(null);
const creditBlock = ref(null);

const transformVideo = ref(null);
const transformBlock = ref(null);

const keunggulanVideo = ref(null);
const keunggulanBlock = ref(null);

const selerisVideo = ref(null);
const selerisBlock = ref(null);

const card = ref(null);
const transformStyle = ref("perspective(1200px) rotateX(0deg) rotateY(0deg)");

function handleMouseMove(e) {
  if (!card.value) return;

  const rect = card.value.getBoundingClientRect();

  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  const rotateX = (y / rect.height - 0.5) * -10;
  const rotateY = (x / rect.width - 0.5) * 10;

  transformStyle.value = `
    perspective(1200px)
    rotateX(${rotateX.toFixed(2)}deg)
    rotateY(${rotateY.toFixed(2)}deg)
    translateY(-6px)
  `;
}

function resetTransform() {
  transformStyle.value = `
    perspective(1200px)
    rotateX(0deg)
    rotateY(0deg)
  `;
}

const whosContent = [
  {
    // icon: Innovation,
    title: "Perusahaan Asuransi Jiwa, Asuransi Umum dan Penjaminan Kredit",
    subtitle:
      "Meningkatkan kualitas underwriting dan keberlanjutan portofolio asuransi jiwa kredit",
  },
  {
    // icon: Innovation,
    title: "Perusahaan Asuransi Jiwa, Asuransi Umum dan Penjaminan Kredit",
    subtitle:
      "Meningkatkan kualitas underwriting dan keberlanjutan portofolio asuransi jiwa kredit",
  },
];

const SelerisDo = [
  {
    icon: new URL("@/assets/Products/icons/vital-sign.png", import.meta.url)
      .href,
    title: "Vital Signs",
    description:
      "Dengan teknologi facial scanning, AI menganalisis tanda vital dan menilai kondisi kesehatan secara cepat",
  },
  {
    icon: new URL("@/assets/Products/icons/bio-marker.png", import.meta.url)
      .href,
    title: "Biomarker kesehatan",
    description:
      "AI mengolah biomarker kesehatan untuk menghasilkan insight objektif dan terukur mengenai kondisi kesehatan secara menyeluruh",
  },
  {
    icon: new URL(
      "@/assets/Products/icons/prediksi-risiko.png",
      import.meta.url,
    ).href,
    title: "Prediksi Risiko Penyakit",
    description:
      "Teknologi AI menganalisis data kesehatan untuk memprediksi risiko penyakit secara lebih akurat",
  },
];

const slider1 = [
  {
    title: "Extra Mortality Calculation",
    description:
      "Menghasilkan nilai extra mortality secara kuantitatif dan berbasis data.",
  },
  {
    title: "Prudent & Objective Risk Assessment",
    description:
      "Mengurangi subjektivitas, meningkatkan konsistensi, dan memperkuat tata kelola risiko.",
  },
  {
    title: "Faster Time to Yes / No",
    description:
      "Mempercepat proses persetujuan kredit yang membutuhkan proteksi asuransi jiwa kredit.",
  },
];

const slider2 = [
  {
    title: "Accepted - Standard",
  },
  {
    title: "Accepted - Sub Standard",
  },
  {
    title: "Declined",
  },
];

// Credit section
useVideoOnView(creditVideo, creditBlock);
useVideoOnView(transformVideo, transformBlock);
useVideoOnView(keunggulanVideo, keunggulanBlock);
useVideoOnView(selerisVideo, selerisBlock);
</script>

<template>
  <div class="relative w-full overflow-hidden">
    <!-- Hero -->
    <section
      class="relative w-full h-full rounded-[20px] z-20 mx-auto max-w-[1440px]"
      id="hero"
    >
      <figure
        class="absolute w-auto h-auto top-[15%] md:top-[29%] lg:top-[20%] xl:top-[150px] -right-[60%] md:-right-[30%] lg:-right-[37%] xl:-right-[23%]"
      >
        <img
          src="@/assets/Products/images/Credit/blue-wave2.png"
          alt=""
          class="h-auto w-[650px] md:w-[600px] lg:w-full object-cover"
        />
      </figure>
      <figure
        class="absolute w-auto h-auto bottom-[44%] md:bottom-[0%] lg:-bottom-0 xl:bottom-0 -right-[15%] md:-right-[10%] lg:-right-[35%] xl:-right-[200px]"
      >
        <img
          src="@/assets/Products/images/Credit/orange-wave2.png"
          alt=""
          class="h-auto w-full md:w-[600px] lg:w-full object-cover"
        />
      </figure>
      <div
        class="relative w-full h-auto rounded-[20px] z-20 max-w-[1440px] mx-auto"
      >
        <div
          class="relative w-full h-full flex flex-col md:flex-row gap-x-0 pt-32 px-0 lg:px-16 xl:px-20 lg:pt-40 gap-y-10"
        >
          <!-- Phone mobile -->
          <div
            class="relative flex w-full h-auto md:hidden flex-row gap-x-5 items-end justify-center md:items-end md:justify-end"
          >
            <figure class="w-auto h-auto">
              <img
                src="@/assets/Products/images/Credit/phone1.png"
                alt=""
                class="w-full h-[240px] object-contain"
              />
            </figure>
            <figure class="w-auto h-auto">
              <img
                src="@/assets/Products/images/Credit/phone2.png"
                alt=""
                class="w-full h-[300px] object-contain"
              />
            </figure>
          </div>
          <div
            class="relative flex flex-col w-full h-auto gap-y-7 lg:gap-y-14 justify-end pb-12 lg:pb-0 lg:justify-center"
          >
            <div
              class="w-full h-auto flex flex-col gap-y-5 justify-start items-center md:justify-normal md:items-start"
            >
              <div
                class="w-full h-auto flex flex-col gap-y-0 justify-center items-center md:justify-normal md:items-start pl-0 md:pl-12 lg:pl-0"
              >
                <p
                  class="font-[500] text-[28px] md:text-[28px] lg:text-[38px] xl:text-[50px]"
                >
                  <span class="text-[#195279]">AI Powered </span>
                  <span class="text-[#FDB403]">Credit Life</span>
                </p>
                <p
                  class="text-[#1889D1] font-[600] text-[22px] md:text-[22px] lg:text-[32px] xl:text-[40px]"
                >
                  Underwriting Intelligence
                </p>
              </div>
              <p
                class="text-[#6F6F6F] text-[14px] md:text-[16px] lg:text-[18px] xl:text-[22px] px-12 md:px-0 md:pl-12 lg:pl-0 w-full lg:w-[80%] text-center md:text-start"
              >
                Point your camera to your face and let
                <span class="font-[600]">artificial intelligence</span> do the
                work.
              </p>
            </div>
            <div
              class="w-full h-auto flex flex-row gap-x-5 justify-center md:justify-start pl-0 md:pl-12 lg:pl-0"
            >
              <button
                aria-label="View Demo Seleris Credit"
                class="w-auto h-auto px-6 py-2 bg-[#195279] rounded-[40px]"
              >
                <p
                  class="text-[#FFFFFF] text-[14px] md:text-[12px] lg:text-[16px]"
                >
                  View Demo
                </p>
              </button>
              <router-link
                to="/book-a-demo"
                class="w-auto h-auto px-6 py-2 bg-[#1889D1] rounded-[40px]"
              >
                <p
                  class="text-[#FFFFFF] text-[14px] md:text-[12px] lg:text-[16px]"
                >
                  Request Demo
                </p>
              </router-link>
            </div>
          </div>
          <!-- Phone Desktop -->
          <div
            class="hidden w-full h-auto relative md:flex flex-row gap-x-5 items-center justify-end md:items-end lg:justify-end pr-12 lg:pr-0"
          >
            <figure class="w-auto h-auto">
              <img
                src="@/assets/Products/images/Credit/phone1.png"
                alt=""
                class="w-full h-[180px] md:h-[240px] lg:h-[360px] xl:h-[400px] object-contain"
              />
            </figure>
            <figure class="w-auto h-auto">
              <img
                src="@/assets/Products/images/Credit/phone2.png"
                alt=""
                class="w-full h-[180px] md:h-[300px] lg:h-[450px] xl:h-[500px] object-contain"
              />
            </figure>
          </div>
        </div>
      </div>
    </section>

    <!-- Section Partner -->
    <section
      class="relative w-full h-auto max-w-[1440px] mx-auto px-0 lg:px-16 xl:px-24 sm:mt-16 flex flex-col gap-y-0"
      id="client"
    >
      <div class="w-full h-auto flex justify-center items-center">
        <p
          class="text-[#626262] font-[500] md:text-[28px] lg:text-[32px] leading-relaxed lg:leading-relaxed"
        >
          Seleris Credit Clients
        </p>
      </div>
      <div class="w-full h-auto">
        <ClientCardFrameProduct :client-logos="clientLogos" />
      </div>
    </section>

    <!-- Section About -->
    <section
      class="max-w-[1440px] mx-auto relative w-full h-full rounded-[20px] z-20 mt-10"
      id="about"
    >
      <!-- SELERIS CREDIT -->
      <div
        ref="creditBlock"
        class="relative w-full h-auto sm:h-[380px] lg:h-[480px] flex flex-col sm:flex-row px-8 sm:px-12 lg:px-16 xl:px-28 gap-y-3 sm:gap-y-0 gap-x-5 lg:gap-x-0"
      >
        <div class="relative flex w-full h-full justify-center">
          <figure
            class="w-auto h-auto flex justify-center items-center xm:pt-10"
          >
            <video
              ref="creditVideo"
              muted
              playsinline
              preload="auto"
              loop
              class="w-full h-full object-cover"
            >
              <source
                src="@/assets/Products/images/Credit/health-score.webm"
                type="video/webm"
              />
            </video>
          </figure>
        </div>
        <div
          ref="card"
          :style="{ transform: transformStyle }"
          @mousemove="handleMouseMove"
          @mouseleave="resetTransform"
          class="w-full h-auto bg-[#FFFFFF] rounded-[20px] sm:rounded-[38px] py-5 md:py-10 lg:py-0 transform-gpu transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-2 hover:rotate-x-[6deg] hover:-rotate-y-[6deg] hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.25)] [perspective:1200px]"
        >
          <div
            class="flex flex-col gap-y-3 md:gap-y-5 lg:gap-y-10 items-center justify-center w-full h-full px-8 sm:px-10"
          >
            <div class="w-full h-auto">
              <p
                class="text-[#1889D1] font-[600] text-[24px] md:text-[26px] lg:text-[40px]"
              >
                Seleris <span class="text-[#FDB403]">Credit</span>
              </p>
            </div>
            <div class="w-full h-auto">
              <p
                class="text-[#626262] font-[400] text-[14px] md:text-[14px] lg:text-[20px] leading-relaxed lg:leading-relaxed"
              >
                <span class="font-[600]"
                  >Seleris Credit adalah platform underwriting</span
                >
                asuransi jiwa kredit berbasis Artificial Intelligence (AI) yang
                dirancang untuk membantu perusahaan asuransi dan lembaga
                keuangan mengambil keputusan risiko secara lebih cepat, akurat,
                dan prudent.
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- TRANSFORMASI ASURANSI -->
      <div
        ref="transformBlock"
        class="relative w-full h-auto flex flex-col-reverse gap-y-3 sm:flex-row lg:pr-28 lg:pl-24 mt-20 sm:mt-36 px-10 lg:px-16"
      >
        <div class="relative flex w-full h-full justify-center">
          <div
            class="flex flex-col gap-y-2 md:gap-y-5 lg:gap-y-8 items-start justify-start w-full h-full lg:px-10 pt-5 lg:pt-10"
          >
            <div class="w-full h-auto">
              <p
                class="text-[#111827] font-[600] text-[24px] md:text-[24px] lg:text-[40px] text-center sm:text-start"
              >
                Tranformasi <br class="hidden sm:block" />
                Asuransi Kredit
              </p>
            </div>
            <div class="w-full h-auto sm:pr-8 lg:pr-0">
              <p
                class="text-[#626262] font-[400] text-[14px] md:text-[12px] lg:text-[18px] leading-loose text-center sm:text-start"
              >
                Sebagai transformasi dari aplikasi
                <span class="font-[600]">Smart Credit</span> yang telah
                digunakan oleh mitra perusahaan asuransi dan broker asuransi,
                Seleris Credit menghadirkan pendekatan underwriting generasi
                baru yang berbasis data, sains aktuaria, dan analitik prediktif.
              </p>
            </div>
          </div>
        </div>
        <div
          class="relative flex flex-col justify-center w-full h-auto rounded-[38px]"
        >
          <figure class="flex items-center justify-center w-full h-full">
            <video
              ref="transformVideo"
              muted
              playsinline
              preload="auto"
              loop
              class="w-full h-full object-cover"
            >
              <source
                src="@/assets/Products/images/Credit/transformasi.webm"
                type="video/webm"
              />
            </video>
          </figure>
        </div>
      </div>
    </section>

    <!-- Section Apa Yang Dikerjakan Seleris -->
    <section
      id="technology"
      class="max-w-[1440px] mx-auto relative flex flex-col w-full h-auto bg-[#FFFFFF] z-20 py-10 sm:py-20 mt-10 gap-y-5 sm:gap-y-10 lg:gap-y-14"
    >
      <div class="w-full h-auto flex flex-col gap-y-4 px-8">
        <div class="w-full h-auto flex justify-center items-center">
          <p
            class="font-[600] text-[18px] sm:text-[28px] lg:text-[40px] text-center text-[#2C3131]"
          >
            Apa yang Dikerjakan Seleris Credit?
          </p>
        </div>
        <div class="w-full h-auto flex justify-center items-center">
          <p
            class="font-[400] text-[12px] sm:text-[20px] xl:text-[20px] text-center text-[#626262]"
          >
            Seleris Credit melakukan deteksi dan penilaian
            <br class="hidden sm:block" />
            risiko mortalitas debitur melalui analisis
          </p>
        </div>
      </div>
      <!-- Desktop -->
      <div
        class="hidden w-full h-auto lg:flex flex-row sm:gap-x-5 lg:gap-x-10 px-12 lg:px-20"
      >
        <div
          v-for="(data, index) in SelerisDo"
          :key="index"
          class="w-full h-auto flex flex-col bg-[#FFFFFF] border-[1px] border-[#E3E3E3] rounded-[20px] px-8 pb-8 gap-y-10 transform-gpu transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-[#1889D1] hover:-translate-y-2 hover:rotate-x-[6deg] hover:-rotate-y-[6deg] hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.25)] [perspective:1200px]"
        >
          <div class="w-full h-auto flex items-center justify-center">
            <img
              :src="data.icon"
              alt=""
              class="w-[80%] h-auto object-contain object-center items-center"
            />
          </div>
          <div
            class="w-full h-auto flex flex-col justify-center items-center gap-y-3"
          >
            <div class="w-full h-auto">
              <p class="font-[600] text-[24px] text-[#2C3131] text-center">
                {{ data.title }}
              </p>
            </div>
            <div class="w-full h-auto">
              <p class="font-[400] text-[14px] text-[#626262] text-center">
                {{ data.description }}
              </p>
            </div>
          </div>
        </div>
      </div>
      <!-- mobile -->
      <div
        class="relative flex lg:hidden flex-row w-full max-h-screen gap-x-5 md:gap-x-10 py-5 overflow-x-auto snap-x snap-mandatory sm:pl-10 px-8 sm:pr-10 md:pl-12 md:pr-12 hide-scrollbar"
      >
        <div
          v-for="(data, index) in SelerisDo"
          :key="index"
          class="flex flex-col lg:hidden snap-center shrink-0 w-full sm:w-[60%] md:w-[60%] h-auto rounded-xl px-5 py-2 sm:py-2 shadow-lg border-[1px] gap-y-5"
        >
          <div class="flex flex-row">
            <div class="flex w-[40%] h-auto">
              <img
                :src="data.icon"
                alt="BenefitRobot"
                class="w-full h-full object-center object-contain"
              />
            </div>
            <div class="flex w-full h-auto pl-5 pt-9 items-center">
              <p class="text-[20px] text-[#2C3131] font-[600]">
                {{ data.title }}
              </p>
            </div>
          </div>
          <div class="flex flex-col w-full h-full pb-5">
            <div class="flex w-full h-full items-start justify-start">
              <p class="text-[12px] sm:text-[14px] text-[#626262] font-[400]">
                {{ data.description }}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="w-full h-auto px-8 sm:px-12 lg:px-44">
        <p
          class="text-center text-[#626262] font-[400] text-[14px] sm:text-[16px] lg:text-[18px] leading-relaxed"
        >
          Parameter-parameter ini diolah menggunakan teknologi AI untuk
          membangun model penilaian risiko yang komprehensif dan konsisten,
          sehingga potensi risiko kesehatan yang belum terdeteksi dapat
          diidentifikasi lebih dini dan objektif.
        </p>
      </div>
    </section>

    <!-- Keunggulan Utama Seleris Credit -->
    <section
      class="max-w-[1440px] mx-auto relative w-full h-full rounded-[20px] z-20 mt-32"
    >
      <!-- Keunggulan Video -->
      <div
        ref="keunggulanBlock"
        class="relative w-full h-auto sm:h-[480px] lg:h-[550px] flex flex-col-reverse sm:flex-row"
      >
        <div class="relative flex w-full sm:w-[55%] lg:w-1/2 h-full bg-white">
          <div
            class="flex flex-col gap-y-8 lg:gap-y-10 w-full h-full pt-10 pb-10 sm:pt-10 sm:pb-0 lg:pt-8"
          >
            <!-- TITLE -->
            <h2
              class="text-[#1889D1] font-[600] text-[26px] sm:text-[24px] lg:text-[38px] px-8 sm:px-12 lg:px-20"
            >
              Keunggulan Utama <br class="hidden sm:block" />
              Seleris Credit
            </h2>

            <!-- SWIPER WRAPPER (INI YANG NGUNCI LEBAR) -->
            <div class="relative w-full max-w-full overflow-hidden h-auto">
              <Swiper
                class="w-full h-full cursor-grab active:cursor-grabbing"
                :modules="[Navigation, Autoplay]"
                :navigation="false"
                :pagination="false"
                :autoplay="{ delay: 3000, disableOnInteraction: false }"
                loop
              >
                <SwiperSlide class="w-full h-auto px-8 sm:px-12 lg:px-20">
                  <div class="w-full h-auto flex flex-col gap-y-8">
                    <div
                      v-for="(data_slider1, index) in slider1"
                      :key="index"
                      class="w-full h-auto flex flex-col gap-y-1"
                    >
                      <div class="w-full h-auto flex flex-col">
                        <p
                          class="text-[#2C3131] font-[600] text-[16px] lg:text-[20px]"
                        >
                          {{ data_slider1.title }}
                        </p>
                      </div>
                      <div class="w-full h-auto flex flex-col pr-0 lg:pr-28">
                        <p
                          class="text-[#626262] font-[400] text-[14px] lg:text-[16px]"
                        >
                          {{ data_slider1.description }}
                        </p>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>

                <SwiperSlide class="w-full h-auto px-8 sm:px-12 lg:px-20">
                  <div class="w-full h-auto flex flex-col gap-y-8">
                    <div class="w-full h-auto flex flex-col gap-y-2">
                      <div class="w-full h-auto">
                        <p
                          class="text-[#2C3131] font-[600] text-[18px] lg:text-[24px]"
                        >
                          Automated Underwriting Decision
                        </p>
                      </div>
                      <div class="w-full h-auto">
                        <p
                          class="text-[#626262] font-[400] text-[14px] lg:text-[18px]"
                        >
                          Menentukan keputusan underwriting secara
                          <br class="hidden lg:block" />
                          real time:
                        </p>
                      </div>
                    </div>
                    <div class="w-full h-auto flex flex-col gap-y-8">
                      <div
                        v-for="(data_slider2, index) in slider2"
                        :key="index"
                        class="w-full h-auto flex flex-row gap-x-4 lg:gap-x-10"
                      >
                        <div class="w-[5%] h-auto">
                          <div
                            class="w-6 h-6 lg:w-8 lg:h-8 xl:w-8 xl:h-8 bg-[#1889D1] rounded-[8px]"
                          >
                            <ChecklistIcon />
                          </div>
                        </div>
                        <div class="w-full h-auto flex items-center">
                          <p
                            class="text-[#1889D1] font-[600] text-[16px] lg:text-[18px]"
                          >
                            {{ data_slider2.title }}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              </Swiper>
            </div>
          </div>
        </div>
        <div class="relative flex flex-col justify-center w-full h-auto">
          <figure class="flex items-center justify-center w-full h-full">
            <video
              ref="keunggulanVideo"
              muted
              playsinline
              preload="auto"
              loop
              class="w-full h-full object-cover"
            >
              <source
                src="@/assets/Products/images/Credit/keunggulan-utama.webm"
                type="video/webm"
              />
            </video>
          </figure>
        </div>
      </div>
    </section>

    <!-- Untuk Siapa Seleris Credit -->
    <section
      class="max-w-[1440px] mx-auto relative w-full h-auto z-20 mt-32 bg-white py-14 lg:py-20 px-8 sm:px-12 lg:px-20"
    >
      <div class="w-full h-auto flex flex-col sm:flex-row gap-x-10">
        <div class="w-full sm:w-[60%] h-auto flex">
          <img
            src="@/assets/Products/images/Credit/image1.png"
            alt=""
            class="w-full h-full object-fill sm:object-cover object-center rounded-none sm:rounded-[37px]"
          />
        </div>

        <div class="w-full h-auto flex flex-col gap-y-8 lg:gap-y-10">
          <div class="w-full h-auto flex flex-col gap-y-8 lg:gap-y-10">
            <div class="w-full h-auto flex flex-row gap-x-5 pt-8">
              <div class="w-[30%] h-auto flex items-end">
                <img
                  src="@/assets/Products/images/Credit/icons1.png"
                  alt=""
                  class="w-full h-full object-contain object-center"
                />
              </div>
              <div class="w-full h-auto flex items-end">
                <p class="text-[#195279] font-[600] text-[24px] lg:text-[40px]">
                  Untuk Siapa <br />
                  <span class="text-[#1485CB]">Seleris </span>
                  <span class="text-[#FDB403]">Credit?</span>
                </p>
              </div>
            </div>
            <div class="w-full h-auto">
              <p
                class="text-[#626262] font-[400] text-[14px] sm:text-[16px] lg:text-[18px]"
              >
                Seleris Credit melakukan deteksi dan penilaian
                <br class="hidden sm:block" />
                risiko mortalitas debitur melalui analisis
              </p>
            </div>
            <div
              class="w-full h-[130px] sm:h-[140px] lg:h-[240px] flex items-center justify-center"
            >
              <Swiper
                :modules="[Navigation, Autoplay, Pagination]"
                :direction="'vertical'"
                :navigation="false"
                :pagination="false"
                :autoplay="{ delay: 3000, disableOnInteraction: false }"
                loop
                class="h-full rounded-xl overflow-hidden flex justify-center items-center"
              >
                <SwiperSlide
                  v-for="(item, index) in whosContent"
                  :key="index"
                  class="!flex items-center justify-center"
                >
                  <!-- CARD -->
                  <div
                    class="w-full h-auto bg-[#FFFFFF] border-[2px] rounded-[22px] px-8 lg:px-12 py-4 lg:py-10"
                  >
                    <div class="w-full h-auto flex flex-row gap-x-5">
                      <div class="w-auto h-auto pt-0.5 sm:pt-1">
                        <img
                          src="@/assets/Products/icons/shield.png"
                          alt=""
                          class="w-10 sm:w-12 lg:w-16 h-auto object-cover object-center p-1.5 lg:p-3 rounded-full bg-[#1485CB]"
                        />
                      </div>
                      <div
                        class="w-full h-auto flex flex-col gap-y-3 lg:gap-y-5"
                      >
                        <div class="w-full h-auto">
                          <p
                            class="text-[#195279] font-[600] text-[12px] sm:text-[14px] lg:text-[20px]"
                          >
                            {{ item.title }}
                          </p>
                        </div>
                        <div class="w-full h-auto">
                          <p
                            class="text-[#626262] font-[400] text-[10px] sm:text-[12px] lg:text-[16px]"
                          >
                            {{ item.subtitle }}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Mengapa Seleris Credit -->
    <section
      class="max-w-[1440px] mx-auto relative w-full h-full rounded-[20px] z-20 mt-32 py-14 lg:py-20"
      id="whyus"
    >
      <!-- TRANSFORMASI ASURANSI -->
      <div
        ref="selerisBlock"
        class="relative w-full h-auto sm:h-[450px] lg:h-[550px] flex flex-col-reverse sm:flex-row"
      >
        <div class="w-full h-auto bg-white py-8 sm:py-12 lg:py-16">
          <div
            class="w-full h-full flex flex-col justify-between px-8 gap-y-4 sm:gap-y-0 sm:px-0 sm:pl-12 lg:pl-20 sm:pr-8 lg:pr-20"
          >
            <div class="w-full h-auto">
              <p class="text-[28px] lg:text-[38px] font-[600]">
                Mengapa <br class="hidden sm:block" />
                <span class="text-[#1485CB]"> Seleris </span>
                <span class="text-[#FDB403]">Credit?</span>
              </p>
            </div>
            <div class="w-full h-auto">
              <p
                class="text-[14px] lg:text-[20px] font-[400] text-[#626262] leading-relaxed"
              >
                Di era digital dan AI, underwriting tidak lagi cukup berbasis
                intuisi dan proses manual.
                <span class="font-[600]">Seleris Credit</span> menghadirkan
                underwriting intelligence yang selaras dengan prinsip
                kehati-hatian, regulasi, dan kebutuhan industri keuangan modern.
              </p>
            </div>
            <div class="w-full h-auto">
              <router-link to="/book-a-demo">
                <button
                  aria-label="Request Demo Seleris Credit"
                  class="w-auto h-auto px-8 py-3 bg-[#1485CB] rounded-[8px]"
                >
                  <p class="text-[#FFFFFF] font-[600] text-[14px]">
                    Request Demo
                  </p>
                </button>
              </router-link>
            </div>
          </div>
        </div>
        <div class="relative flex flex-col justify-center w-full h-auto">
          <figure class="flex items-center justify-center w-full h-full">
            <video
              ref="selerisVideo"
              muted
              playsinline
              preload="auto"
              loop
              class="w-full h-full object-cover"
            >
              <source
                src="@/assets/Products/images/Credit/kenapa-seleris.webm"
                type="video/webm"
              />
            </video>
          </figure>
        </div>
      </div>
    </section>

    <!-- Book A Demo -->
    <section
      class="max-w-[1440px] mx-auto relative w-full h-auto z-20 mt-16 sm:mt-32 px-8 sm:px-12 lg:px-20"
    >
      <div
        class="w-full h-auto flex flex-row bg-[#1485CB] gap-x-3 sm:gap-x-10 rounded-[24px] py-5 sm:py-10 lg:py-14"
      >
        <div class="w-full sm:w-[60%] h-full flex items-center">
          <div
            class="w-full h-full flex flex-col items-center justify-center pl-4 sm:pl-12 lg:px-20 gap-y-5"
          >
            <div class="w-full h-auto flex items-center">
              <p
                class="text-[#FAFAFA] font-[600] text-[14px] sm:text-[20px] lg:text-[30px] leading-tight"
              >
                Smarter Risk. Faster Decision. <br class="hidden sm:block" />
                Sustainable Protection
              </p>
            </div>
            <div class="w-full h-auto">
              <p
                class="text-[#FAFAFA] font-[400] text-[12px] sm:text-[14px] lg:text-[20px]"
              >
                Request Demo Now!
              </p>
            </div>
          </div>
        </div>
        <div
          class="w-[70%] sm:w-[45%] lg:w-[40%] h-auto flex items-center justify-center"
        >
          <a href="/book-a-demo" target="_blank">
            <div
              class="w-auto h-auto flex flex-row bg-[#FAFAFA] px-2 sm:px-4 lg:px-14 py-2 lg:py-3 rounded-[10px]"
            >
              <div
                class="w-full h-full flex items-center justify-center gap-x-2 md:gap-x-2 text-[#1485CB]"
              >
                <p class="font-[500] text-[10px] md:text-[16px] lg:text-[24px]">
                  Book a Demo
                </p>
                <svg
                  class="w-6 h-6 sm:w-8 sm:h-8 lg:w-12 lg:h-12"
                  viewBox="0 0 48 48"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M28 36L40 24L28 12"
                    stroke="currentColor"
                    stroke-width="3"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M11 22.5C10.1716 22.5 9.5 23.1716 9.5 24C9.5 24.8284 10.1716 25.5 11 25.5V24V22.5ZM39.5 24V22.5H11V24V25.5H39.5V24Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
            </div>
          </a>
        </div>
      </div>
    </section>
  </div>
</template>
