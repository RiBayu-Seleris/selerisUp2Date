<script setup>
import { onMounted, ref } from "vue";

import HeroText from "@productComponents/HeroText.vue";
import TitleAndSubCard from "@productComponents/TitleAndSubCard.vue";
import ClientCardFrameProduct from "@productComponents/ClientCardFrameProduct.vue";
import { clientLogos } from "@/Data/Products/SelerisCredit/SCClients";
import HealthScoreGif from "@/assets/Products/images/Credit/health-score.gif";
import ChecklistIcon from "@/components/icons/Checklist.vue";

import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import lottie from "lottie-web/build/player/lottie_light";
import Scene1 from "@/assets/Products/images/Credit/scene-1.json";
import Scene2 from "@/assets/Products/images/Credit/scene-2.json";
import Scene3 from "@/assets/Products/images/Credit/scene-3.json";

const container = ref(null);
const container2 = ref(null);
const container3 = ref(null);

const SelerisDo = [
  {
    icon: new URL("@/assets/Products/icons/vital-sign.png", import.meta.url)
      .href,
    title: "Vital Signs",
    description:
      "Buy Bitcoin or Ethereum, the securely store it in your wallet or send it on easily to friends ",
  },
  {
    icon: new URL("@/assets/Products/icons/bio-marker.png", import.meta.url)
      .href,
    title: "Biomarker kesehatan",
    description:
      "Choose you preferred payment method such as bank transfer or credit card to top up your wallet ",
  },
  {
    icon: new URL(
      "@/assets/Products/icons/prediksi-risiko.png",
      import.meta.url
    ).href,
    title: "Prediksi Risiko Penyakit",
    description:
      "Sign up for free wallet on web, IOS or Android and follow our easy process to set up your profile",
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

onMounted(() => {
  lottie.loadAnimation({
    container: container.value, // elemen target
    renderer: "svg",
    loop: true,
    autoplay: true,
    animationData: Scene1, // langsung pakai data JSON
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice", // <-- penting: "slice" memotong area kosong
    },
  });

  lottie.loadAnimation({
    container: container2.value,
    renderer: "svg",
    loop: true,
    autoplay: true,
    animationData: Scene2,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  });

  lottie.loadAnimation({
    container: container3.value,
    renderer: "svg",
    loop: true,
    autoplay: true,
    animationData: Scene3,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  });
});
</script>

<template>
  <div class="relative w-full overflow-hidden max-w-[1440px] mx-auto">
    <!-- Hero -->
    <section class="relative w-full h-full rounded-[20px] z-20 p-4" id="hero">
      <figure class="absolute w-auto h-auto right-0 top-40 lg:top-24">
        <img
          src="@/assets/Products/images/Credit/blue-wave.png"
          alt=""
          class="w-full h-[100px] md:h-[280px] lg:w-[600px] lg:h-[300px] object-contain"
        />
      </figure>
      <figure class="absolute w-auto h-auto right-0 bottom-0">
        <img
          src="@/assets/Products/images/Credit/orange-wave.png"
          alt=""
          class="w-full h-[100px] md:h-[280px] lg:w-full lg:h-[300px] object-contain"
        />
      </figure>
      <div
        class="relative w-full h-[400px] md:h-[600px] lg:h-auto rounded-[20px] z-20"
      >
        <div
          class="relative w-full h-full flex flex-col lg:flex-row gap-x-0 pt-32 lg:px-28 lg:pt-32 gap-y-10"
        >
          <!-- Phone mobile -->
          <div
            class="flex relative lg:hidden flex-row gap-x-5 items-center justify-center lg:items-end lg:justify-end w-full h-auto"
          >
            <figure class="w-auto h-auto">
              <img
                src="@/assets/Products/images/Credit/phone1.png"
                alt=""
                class="w-full h-[180px] md:h-[320px] lg:h-[400px] object-contain"
              />
            </figure>
            <figure class="w-auto h-auto">
              <img
                src="@/assets/Products/images/Credit/phone2.png"
                alt=""
                class="w-full h-[180px] md:h-[420px] lg:h-[500px] object-contain"
              />
            </figure>
          </div>
          <div
            class="relative flex flex-col w-full h-auto gap-y-14 justify-center"
          >
            <div
              class="w-full h-auto flex flex-col gap-y-5 justify-center items-center lg:justify-normal lg:items-start"
            >
              <div
                class="w-full h-auto flex flex-col gap-y-0 justify-center items-center lg:justify-normal lg:items-start"
              >
                <p class="font-[500] text-[24px] lg:text-[50px]">
                  <span class="text-[#195279]">AI Powered </span>
                  <span class="text-[#FDB403]">Credit Life</span>
                </p>
                <p class="text-[#1889D1] font-[600] text-[14px] lg:text-[40px]">
                  Underwriting Intelligence
                </p>
              </div>
              <p class="text-[#6F6F6F] text-[22px] w-[80%]">
                Point your camera at any damage and let
                <span class="font-[600]">artificial intelligence</span>
                do the work.
              </p>
            </div>
            <div class="w-full h-auto flex flex-row gap-x-5">
              <button
                class="w-auto h-auto px-6 py-2 bg-[#195279] rounded-[40px]"
              >
                <p class="text-[#FFFFFF]">Try To Free</p>
              </button>
              <button
                class="w-auto h-auto px-6 py-2 bg-[#1889D1] rounded-[40px]"
              >
                <p class="text-[#FFFFFF]">Request Demo</p>
              </button>
            </div>
          </div>
          <!-- Phone Desktop -->
          <div
            class="hidden relative lg:flex flex-row gap-x-5 items-center justify-center lg:items-end lg:justify-end w-full h-auto"
          >
            <figure class="w-auto h-auto">
              <img
                src="@/assets/Products/images/Credit/phone1.png"
                alt=""
                class="w-full h-[180px] md:h-[280px] lg:h-[400px] object-contain"
              />
            </figure>
            <figure class="w-auto h-auto">
              <img
                src="@/assets/Products/images/Credit/phone2.png"
                alt=""
                class="w-full h-[180px] md:h-[280px] lg:h-[500px] object-contain"
              />
            </figure>
          </div>
        </div>
      </div>
    </section>

    <!-- Section Partner -->
    <section
      class="relative w-full h-auto max-w-[1440px] mx-auto px-[132px] mt-10"
      id="client"
    >
      <div class="mt-10">
        <ClientCardFrameProduct :client-logos="clientLogos" />
      </div>
    </section>

    <!-- Section About -->
    <section
      class="relative flex flex-col w-full h-full rounded-[20px] z-20 p-4 mt-10"
      id="about"
    >
      <!-- SELERIS CREDIT -->
      <div class="relative w-full h-[480px] flex flex-row px-28">
        <div class="relative flex w-full h-full justify-center">
          <figure class="w-auto h-auto flex justify-center items-center pt-10">
            <img
              src="@/assets/Products/images/Credit/health-score.gif"
              alt=""
              class="w-full h-full object-cover object-center"
            />
          </figure>
        </div>
        <div class="w-full h-auto bg-[#FFFFFF] rounded-[38px]">
          <div
            class="flex flex-col gap-y-10 items-center justify-center w-full h-full px-10"
          >
            <div class="w-full h-auto">
              <p class="text-[#1889D1] font-[600] text-[40px]">
                Seleris <span class="text-[#FDB403]">Credit</span>
              </p>
            </div>
            <div class="w-full h-auto">
              <p class="text-[#626262] font-[400] text-[20px]">
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
      <div class="relative w-full h-auto flex flex-row pr-28 pl-24 mt-36">
        <div class="relative flex w-full h-full justify-center">
          <div
            class="flex flex-col gap-y-8 items-start justify-start w-full h-full px-10 pt-10"
          >
            <div class="w-full h-auto">
              <p class="text-[#111827] font-[600] text-[40px]">
                Tranformasi <br />
                Asuransi Kredit
              </p>
            </div>
            <div class="w-full h-auto">
              <p class="text-[#626262] font-[400] text-[18px] leading-loose">
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
          <div class="flex items-center justify-center w-full h-full">
            <div class="flex w-auto h-full" ref="container"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- Section Apa Yang Dikerjakan Seleris -->
    <section
      class="relative flex flex-col w-full h-auto bg-[#FFFFFF] z-20 py-20 mt-10 gap-y-14"
    >
      <div class="w-full h-auto flex flex-col gap-y-4">
        <div class="w-full h-auto flex justify-center items-center">
          <p class="font-[600] text-[40px] text-center text-[#2C3131]">
            Apa yang Dikerjakan Seleris Credit?
          </p>
        </div>
        <div class="w-full h-auto flex justify-center items-center">
          <p class="font-[400] text-[24px] text-center text-[#626262]">
            Seleris Credit melakukan deteksi dan penilaian <br />
            risiko mortalitas debitur melalui analisis
          </p>
        </div>
      </div>
      <div class="w-full h-auto flex flex-row gap-x-10 px-20">
        <div
          v-for="(data, index) in SelerisDo"
          :key="index"
          class="w-full h-auto flex flex-col bg-[#FFFFFF] border-[1px] border-[#E3E3E3] rounded-[20px] px-8 pb-8 gap-y-10"
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
      <div class="w-full h-auto px-44">
        <p
          class="text-center text-[#626262] font-[400] text-[18px] leading-relaxed"
        >
          Parameter-parameter ini diolah menggunakan teknologi AI untuk
          membangun model penilaian risiko yang komprehensif dan konsisten,
          sehingga risiko kesehatan laten dapat diidentifikasi lebih dini dan
          objektif.
        </p>
      </div>
    </section>

    <!-- Keunggulan Utama Seleris Credit -->
    <section
      class="relative flex flex-col w-full h-full rounded-[20px] z-20 mt-32"
    >
      <!-- TRANSFORMASI ASURANSI -->
      <div class="relative w-full h-[550px] flex flex-row">
        <div class="relative flex w-1/2 h-full bg-white">
          <div class="flex flex-col gap-y-6 w-full h-full px-20 pt-16">
            <!-- TITLE -->
            <h2 class="text-[#1889D1] font-semibold text-[40px]">
              Keunggulan Utama Seleris Credit
            </h2>

            <!-- SWIPER WRAPPER (INI YANG NGUNCI LEBAR) -->
            <div class="relative w-full max-w-full overflow-hidden">
              <Swiper
                class="w-full h-full cursor-grab active:cursor-grabbing"
                :modules="[Navigation, Autoplay]"
                :navigation="false"
                :pagination="false"
                :autoplay="{ delay: 3000, disableOnInteraction: false }"
                loop
              >
                <SwiperSlide class="w-full h-auto">
                  <div class="w-full h-auto flex flex-col gap-y-10">
                    <div
                      v-for="(data_slider1, index) in slider1"
                      :key="index"
                      class="w-full h-auto flex flex-col"
                    >
                      <div class="w-full h-auto flex flex-col">
                        <p class="text-[#2C3131] font-[600]">
                          {{ data_slider1.title }}
                        </p>
                      </div>
                      <div class="w-full h-auto flex flex-col">
                        <p class="text-[#626262] font-[400]">
                          {{ data_slider1.description }}
                        </p>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>

                <SwiperSlide class="w-full h-auto">
                  <div class="w-full h-auto flex flex-col gap-y-8">
                    <div class="w-full h-auto flex flex-col gap-y-2">
                      <div class="w-full h-auto">
                        <p class="text-[#2C3131] font-[600] text-[24px]">
                          Automated Underwriting Decision
                        </p>
                      </div>
                      <div class="w-full h-auto">
                        <p class="text-[#626262] font-[400] text-[18px]">
                          Menentukan keputusan underwriting secara <br />
                          real time:
                        </p>
                      </div>
                    </div>
                    <div class="w-full h-auto flex flex-col gap-y-8">
                      <div
                        v-for="(data_slider2, index) in slider2"
                        :key="index"
                        class="w-full h-auto flex flex-row gap-x-10"
                      >
                        <div class="w-[5%] h-auto">
                          <div
                            class="w-7 h-7 lg:w-7 lg:h-7 xl:w-8 xl:h-8 bg-[#1889D1] rounded-[8px]"
                          >
                            <ChecklistIcon />
                          </div>
                        </div>
                        <div class="w-full h-auto flex items-center">
                          <p class="text-[#1889D1] font-[600] text-[18px]">
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
          <div class="flex items-center justify-center w-full h-full">
            <div class="flex w-full h-full" ref="container2"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- Untuk Siapa Seleris Credit -->
    <section class="relative w-full h-auto z-20 mt-32 bg-white py-20 px-20">
      <div class="w-full h-auto flex flex-row gap-x-10">
        <div class="w-[60%] h-auto flex">
          <img
            src="@/assets/Products/images/Credit/image1.png"
            alt=""
            class="w-full h-full object-cover object-center rounded-[37px]"
          />
        </div>
        <div class="w-full h-auto flex flex-col gap-y-10">
          <div class="w-full h-auto flex flex-row gap-x-5 pt-8">
            <div class="w-[30%] h-auto flex items-end">
              <img
                src="@/assets/Products/images/Credit/icons1.png"
                alt=""
                class="w-full h-full object-contain object-center"
              />
            </div>
            <div class="w-full h-auto flex items-end">
              <p class="text-[#195279] font-[600] text-[40px]">
                Untuk Siapa <br />
                <span class="text-[#1485CB]">Seleris </span>
                <span class="text-[#FDB403]">Credit?</span>
              </p>
            </div>
          </div>
          <div class="w-full h-auto">
            <p class="text-[#626262] font-[400] text-[18px]">
              Seleris Credit melakukan deteksi dan penilaian <br />
              risiko mortalitas debitur melalui analisis
            </p>
          </div>
          <div
            class="w-full h-auto bg-[#FFFFFF] border-[2px] rounded-[22px] px-12 py-10"
          >
            <div class="w-full h-auto flex flex-row gap-x-5">
              <div class="w-auto h-auto pt-1">
                <img
                  src="@/assets/Products/icons/shield.png"
                  alt=""
                  class="w-16 h-auto object-cover object-center p-3 rounded-full bg-[#1485CB]"
                />
              </div>
              <div class="w-full h-auto flex flex-col gap-y-5">
                <div class="w-full h-auto">
                  <p class="text-[#195279] font-[600] text-[20px]">
                    Perusahaan Asuransi Jiwa, Asuransi Umum dan Penjaminan
                    Kredit
                  </p>
                </div>
                <div class="w-full h-auto">
                  <p class="text-[#626262] font-[400] text-[16px]">
                    Meningkatkan kualitas underwriting dan keberlanjutan
                    portofolio asuransi jiwa kredit
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Mengapa Seleris Credit -->
    <section
      class="relative flex flex-col w-full h-full rounded-[20px] z-20 mt-32"
    >
      <!-- TRANSFORMASI ASURANSI -->
      <div class="relative w-full h-[550px] flex flex-row">
        <div class="w-full h-auto bg-white py-16">
          <div class="w-full h-full flex flex-col justify-between pl-20 pr-20">
            <div class="w-full h-auto">
              <p class="text-[38px] font-[600]">
                Mengapa <br />
                <span class="text-[#1485CB]"> Seleris </span>
                <span class="text-[#FDB403]">Credit?</span>
              </p>
            </div>
            <div class="w-full h-auto">
              <p class="text-[20px] font-[400] text-[#626262] leading-relaxed">
                Di era digital dan AI, underwriting tidak lagi cukup berbasis
                intuisi dan proses manual.
                <span class="font-[600]">Seleris Credit</span> menghadirkan
                underwriting intelligence yang selaras dengan prinsip
                kehati-hatian, regulasi, dan kebutuhan industri keuangan modern.
              </p>
            </div>
            <div class="w-full h-auto">
              <button
                class="w-auto h-auto px-8 py-3 bg-[#1485CB] rounded-[8px]"
              >
                <p class="text-[#FFFFFF] font-[600] text-[14px]">
                  Request Demo
                </p>
              </button>
            </div>
          </div>
        </div>
        <div class="relative flex flex-col justify-center w-full h-auto">
          <div class="flex items-center justify-center w-full h-full">
            <div class="flex w-full h-full" ref="container3"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- Book A Demo -->
    <section class="relative w-full h-auto z-20 mt-32 px-20">
      <div
        class="w-full h-auto flex flex-row bg-[#1485CB] gap-x-10 rounded-[24px] py-14"
      >
        <div class="w-[60%] h-full flex items-center">
          <div
            class="w-full h-full flex flex-col items-center justify-center px-20 gap-y-5"
          >
            <div class="w-full h-auto flex items-center">
              <p class="text-[#FAFAFA] font-[600] text-[30px] leading-tight">
                Smarter Risk. Faster Decision. <br />
                Sustainable Protection
              </p>
            </div>
            <div class="w-full h-auto">
              <p class="text-[#FAFAFA] font-[400] text-[20px]">
                Request Demo Now!
              </p>
            </div>
          </div>
        </div>
        <div class="w-[40%] h-auto flex items-center justify-center">
          <a href="/book-a-demo" target="_blank">
            <div
              class="w-auto h-auto flex flex-row bg-[#FAFAFA] px-14 py-3 rounded-[10px]"
            >
              <div
                class="w-full h-full flex items-center justify-center gap-x-2 md:gap-x-2 text-[#1485CB]"
              >
                <p class="font-[500] text-[10px] md:text-[19px] lg:text-[24px]">
                  Book a Demo
                </p>
                <svg
                  class="w-6 h-6 md:w-12 md:h-12"
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
