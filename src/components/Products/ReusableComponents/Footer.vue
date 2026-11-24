<script setup>
import DarkLogo from "@/assets/images/darklogo.png";

// Sosmed Icon
import Instagram from "@/components/icons/Instagram.vue";
import Linkedin from "@/components/icons/Linkedin.vue";
import Tiktok from "@/components/icons/Tiktok.vue";
import Twitter from "@/components/icons/Twitter.vue";

// Images
import playstore from "@/assets/images/playstore.png";
import appstore from "@/assets/images/appstore.png";
import qrAssure from "@/assets/images/qr-assure.svg";
import qrShield from "@/assets/images/qr-shield.svg";

import { productList } from "@/Data/ProductList";
import { companyList } from "@/Data/CompanyList";
import { useProductLogoColor } from "@/Data/Products/useProductLogoColor.js";

import { computed, ref } from "vue";
import { useRoute } from "vue-router"; // ✅ Tambahkan ini

const route = useRoute(); // ✅ Ambil route saat ini

const { logo } = useProductLogoColor();

const isSelerisCredit = ref(route.path === "/product/seleris-credit");
const qr = computed(() => {
  if (route.path === "/product/assure") {
    return {
      src: qrAssure,
      href: "https://assure.seleris.ai/",
      label: "footer.scanQrAssure",
    };
  }
  if (route.path === "/product/shield") {
    return {
      src: qrShield,
      href: "https://shield.seleris.ai/",
      label: "footer.scanQrShield",
    };
  }
  return null;
});

const footerTitle = computed(() => {
  if (route.path === "/product/credit-cover") {
    return "Seleris Credit Cover";
  }
  if (route.path === "/product/shield") {
    return "Shield";
  }
  if (route.path === "/product/assure") {
    return "Assure";
  }
  if (route.path === "/product/health-care") {
    return "Seleris Care";
  }
  if (route.path === "/product/seleris-credit") {
    return "Seleris Credit";
  }
  return ""; // rute lain: tidak ada judul khusus
});

const connectColor = computed(() => {
  if (route.path === "/product/credit-cover") {
    return "text-[#E84C7F]";
  }
  if (route.path === "/product/shield") {
    return "text-[#0071E7]";
  }
  if (route.path === "/product/assure") {
    return "text-[#2AB857]";
  }
  if (route.path === "/product/health-care") {
    return "text-[#2AB857]";
  }
  return ""; // rute lain: pakai warna bawaan
});
</script>

<template>
  <div class="relative w-full h-auto">
    <div class="flex flex-col lg:flex-rows w-full h-auto">
      <div class="lg:flex lg:flex-row w-full h-auto lg:mb-14 mb-0">
        <div class="flex w-full h-auto">
          <div class="flex flex-col">
            <div
              class="flex flex-col md:flex-row lg:flex-col w-full h-auto gap-x-5"
            >
              <div
                class="flex w-full h-full md:w-[60%] lg:w-full lg:justify-start lg:items-start lg:content-start justify-center items-center content-center"
              >
                <img
                  v-if="logo"
                  :src="logo"
                  alt="Logo"
                  class="w-full h-[60px] md:h-[80px] lg:h-[40px] xl:h-[70px] object-contain object-left"
                />
              </div>
              <div
                class="flex flex-col w-full h-auto mt-5 md:mt-0 lg:mt-4 justify-between lg:justify-center items-center space-y-2 md:space-y-0 lg:space-y-2"
              >
                <div class="w-full h-full flex items-end">
                  <p
                    class="text-base md:text-[20px] lg:text-[16px] text-[#195279] font-[400]"
                  >
                    {{ footerTitle }}
                  </p>
                </div>
                <div class="w-full h-full flex items-end">
                  <p
                    class="text-base md:text-[18px] lg:text-[16px] text-[#195279] font-[400] lg:leading-snug"
                  >
                    Powered by Seleris Meditekno International
                  </p>
                </div>
              </div>
            </div>
            <div class="w-full h-auto mt-4">
              <p
                class="text-[#B8B8B8] text-base xl:text-[18px] text-justify lg:text-left xl:text-left"
              >
                {{ $t("footer.tagline") }}
              </p>
            </div>
            <div class="w-full h-auto mt-4">
              <div class="w-full h-auto flex flex-row justify-start gap-x-3">
                <div class="w-auto h-[30px] lg:h-[30px] text-[#195279]">
                  <a
                    href="https://www.instagram.com/selerisindonesia/?igsh=MXJ1Y3c1ZnFtZGdhNA%3D%3D#"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Instagram />
                  </a>
                </div>
                <div class="w-auto h-[30px] lg:h-[30px] text-[#195279]">
                  <a
                    href="https://www.linkedin.com/company/seleris-meditekno-internasional-smi/posts/?feedView=all"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Linkedin />
                  </a>
                </div>
                <div
                  class="w-auto h-[30px] lg:h-[30px] text-[#195279] dark:text-[#FAFAFA]"
                >
                  <a
                    href="https://www.tiktok.com/@selerisindonesia?lang=id-ID"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Seleris TikTok"
                  >
                    <Tiktok />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          class="flex lg:hidden w-full h-[1px] bg-[#F3F4F6] rounded-full my-3"
        />
        <div class="w-full h-auto">
          <div class="flex flex-col w-full h-auto lg:pl-8 xl:px-8">
            <p
              class="text-[#195279] text-[24px] lg:text-[19px] xl:text-[22px] font-medium pb-2"
            >
              Products
            </p>
            <div>
              <a
                v-for="(product, index) in productList"
                :key="index"
                :href="product.url"
                target="_blank"
                rel="noopener noreferrer"
              >
                <p class="text-[#B8B8B8] lg:text-[18px] xl:text-[18px] py-1.5">
                  {{ product.name }}
                </p>
              </a>
            </div>
          </div>
        </div>
        <div
          class="flex lg:hidden w-full h-[1px] bg-[#F3F4F6] rounded-full my-3"
        />
        <div class="flex relative w-full h-auto">
          <div class="flex flex-col w-full h-auto lg:pl-8 xl:pl-5">
            <p
              class="text-[#195279] text-[24px] lg:text-[19px] xl:text-[22px] font-medium pb-2"
            >
              Company
            </p>
            <router-link
              v-for="(company, index) in companyList"
              :key="index"
              :to="company.url"
            >
              <p class="text-[#B8B8B8] lg:text-[18px] xl:text-[18px] py-1.5">
                {{ company.name }}
              </p>
            </router-link>
          </div>
        </div>
        <div
          class="flex lg:hidden w-full h-[1px] bg-[#F3F4F6] rounded-full my-3"
        />
        <div class="w-full h-auto xl:w-[170%]">
          <div class="flex flex-col">
            <p
              class="text-[#195279] text-[24px] lg:text-[19px] xl:text-[22px] font-medium pb-2"
            >
              Stay Connects
            </p>

            <div class="mb-3">
              <p
                class="text-[#195279] text-[18px] lg:text-[18px] xl:text-[22px] pb-2"
              >
                Address
              </p>
              <div class="w-full h-auto flex flex-col xl:flex-row">
                <div class="w-full h-auto pb-2 lg:pr-5">
                  <p
                    class="text-[#343F52] font-[500] text-[14px] lg:text-[14px] xl:text-[16px] lg:pt-1.5 pb-1"
                  >
                    Seleris Asia Pacific Technology Pte.Ltd
                  </p>
                  <a
                    href="https://maps.app.goo.gl/8EZcoxw2NPYhc7ed8"
                    target="_blank"
                    rel="noopener noreferrer"
                    :class="[
                      `${connectColor} text-[12px] lg:text-[14px] xl:text-[16px] lg:pt-1.5 w-full`,
                    ]"
                  >
                    16 Raffles Quay #35 - 01B Hong Leong Building SINGAPORE
                    (048581)
                  </a>
                </div>
                <div class="w-full h-auto lg:pr-5">
                  <p
                    class="text-[#343F52] font-[500] text-[14px] lg:text-[14px] xl:text-[16px] lg:pt-1.5 pb-1"
                  >
                    PT Seleris Meditekno Internasional
                  </p>
                  <a
                    href="https://maps.app.goo.gl/ywhqmCdfhGod9Mps6"
                    target="_blank"
                    rel="noopener noreferrer"
                    :class="[
                      `${connectColor} text-[12px] lg:text-[14px] xl:text-[16px] lg:pt-1.5`,
                    ]"
                  >
                    Graha SMI, Jl. Raya Ragunan No. 29 A, Jakarta Selatan,
                    Indonesia 12540
                  </a>
                </div>
              </div>
            </div>
            <div class="flex flex-col xl:flex-row w-full h-auto">
              <div class="flex flex-col w-full h-auto mb-3 lg:mt-2">
                <p class="text-[#195279] text-[20px] lg:text-[18px]">Phone</p>
                <a
                  href="tel:+622178835193"
                  :class="[
                    `${connectColor} text-sm lg:text-base xl:text-[18px] lg:pt-1.5`,
                  ]"
                >
                  +62 (21) 7883 5193
                </a>
              </div>
              <div class="flex flex-col w-full h-auto mb-3 lg:mt-2">
                <p class="text-[#195279] text-[20px] lg:text-[18px]">E-Mail</p>
                <a
                  href="mailto:info@seleris.ai"
                  :class="[
                    `${connectColor} text-sm lg:text-base xl:text-[18px] lg:pt-1.5`,
                  ]"
                >
                  info@seleris.ai
                </a>
              </div>
            </div>
          </div>
        </div>
        <div
          class="flex lg:hidden w-full h-[1px] bg-[#F3F4F6] rounded-full my-3"
        />
        <div v-if="!isSelerisCredit" class="w-full h-auto">
          <div class="flex flex-col lg:pl-10">
            <p
              class="text-[#195279] dark:text-[#FAFAFA] text-[24px] lg:text-[18px] xl:text-[22px] font-medium pb-0"
            >
              Get The App
            </p>
            <div
              :class="
                qr
                  ? 'flex flex-col items-start gap-6 sm:flex-row sm:justify-center sm:gap-8 lg:flex-col lg:items-start lg:gap-4'
                  : 'flex flex-row lg:flex-col gap-10 lg:gap-0'
              "
            >
              <a
                href="https://play.google.com/store/search?q=blooxia&c=apps&hl=id"
                target="_blank"
                rel="noopener noreferrer"
                :class="
                  qr
                    ? 'flex w-full max-w-[220px] shrink-0 items-center justify-center sm:w-auto lg:justify-start'
                    : 'flex w-auto h-full md:justify-start justify-center items-center content-center xl:justify-start xl:content-start'
                "
              >
                <img
                  :src="playstore"
                  alt="Playstore"
                  :class="
                    qr
                      ? 'h-[88px] w-full object-contain object-center sm:h-[100px] sm:w-[200px]'
                      : 'w-auto sm:w-[100px] md:w-[200px] xl:w-[200px] sm:h-[100px] object-contain object-center'
                  "
                />
              </a>

              <div
                v-if="qr"
                class="flex w-auto shrink-0 flex-col items-start gap-y-2 lg:items-start"
              >
                <a
                  :href="qr.href"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="rounded-[12px] bg-white p-2 shadow-sm ring-1 ring-black/5"
                >
                  <img
                    :src="qr.src"
                    :alt="$t(qr.label)"
                    class="h-[100px] w-[100px] object-contain sm:h-[104px] sm:w-[104px]"
                    loading="lazy"
                    decoding="async"
                  />
                </a>
                <span class="text-[11px] text-[#7C8A99] dark:text-[#9AA5B1]">
                  {{ $t(qr.label) }}
                </span>
              </div>
              <!-- <div
                class="flex w-auto h-full justify-center items-center content-center xl:justify-start xl:content-start xl:-mt-5"
              >
                <div
                  class="relative group w-full sm:w-[200px] md:w-[200px] xl:w-[200px] h-[100px]"
                >
                  <img
                    :src="appstore"
                    alt="Appstore"
                    class="w-full h-full object-contain object-center"
                  />

                  Hover Overlay
                  <div
                    class="absolute flex items-center justify-center inset-0 group-hover:opacity-100 transition duration-300 bg-opacity-60 opacity-0 py-5"
                  >
                    <div
                      class="w-full h-full bg-[#FDFDFD] bg-opacity-60 flex items-center justify-center text-white cursor-pointer"
                    >
                      <span>Coming Soon!</span>
                    </div>
                  </div>
                </div>
              </div> -->
            </div>
          </div>
        </div>
      </div>
      <div class="w-full h-[1px] bg-[#d8dee4] rounded-full mt-5 lg:mt-0" />
      <div
        class="flex flex-col w-full justify-center text-center items-center pb-6 pt-4 gap-y-2"
      >
        <p
          class="text-[16px] lg:text-[18px] xl:text-[20px] dark:text-[#FAFAFA]/40 font-[400]"
        >
          PT Seleris Meditekno Internasional
        </p>
        <p
          class="text-[12px] lg:text-[14px] xl:text-[16px] dark:text-[#FAFAFA]/40 font-[400]"
        >
          © 2023 Seleris Asia Pacific Technology. All rights reserved
        </p>
      </div>
    </div>
  </div>
</template>
