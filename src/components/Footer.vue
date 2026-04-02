<script setup>
import Logo from "@/assets/images/logo.png";
import DarkLogo from "@/assets/images/darklogo.png";

// Sosmed Icon
import Instagram from "@/components/icons/Instagram.vue";
import Linkedin from "@/components/icons/Linkedin.vue";
import Tiktok from "@/components/icons/Tiktok.vue";
import Twitter from "@/components/icons/Twitter.vue";

// Images
import playstore from "@/assets/images/playstore.png";
import appstore from "@/assets/images/appstore.png";

import { productList } from "@/Data/productList";
import { companyList } from "@/Data/companyList";
</script>

<template>
  <div class="relative w-full h-auto">
    <div class="flex flex-col lg:flex-rows w-full h-auto">
      <div class="lg:flex lg:flex-row w-full h-auto lg:mb-14 mb-0">
        <div class="flex w-full h-auto">
          <div class="flex flex-col">
            <div class="flex flex-row lg:flex-col w-full h-auto">
              <div
                class="flex w-full h-full md:w-[60%] lg:w-full lg:justify-start lg:items-start lg:content-start justify-center items-center content-center"
              >
                <img
                  :src="Logo"
                  alt="Logo"
                  class="w-full h-[75%] md:h-[80px] xl:h-[80px] object-contain object-left dark:hidden"
                />
                <img
                  :src="DarkLogo"
                  alt="Logo"
                  class="w-full h-[75%] md:h-[80px] xl:h-[80px] object-contain object-left hidden dark:block"
                />
              </div>
              <div
                class="flex w-full h-auto lg:mt-4 justify-center items-center"
              >
                <p
                  class="text-[#195279] dark:text-[#FAFAFA] font-normal md:text-[28px] lg:text-[22px] xl:text-[18px] leading-tight lg:leading-snug"
                >
                  PT Seleris Meditekno Internasional
                </p>
              </div>
            </div>
            <div class="w-full h-auto mt-4">
              <p
                class="text-[#B8B8B8] text-base xl:text-[18px] text-justify lg:text-left xl:text-left"
              >
                Transform the Life and Medical industry by making it more
                efficient, accurate, and accessible for everyone
              </p>
            </div>
            <div class="w-full h-auto mt-4">
              <div class="w-full h-auto flex flex-row justify-start gap-x-3">
                <div
                  class="w-auto h-[30px] lg:h-[30px] text-[#195279] dark:text-[#FAFAFA]"
                >
                  <a
                    href="https://www.instagram.com/selerisindonesia/?igsh=MXJ1Y3c1ZnFtZGdhNA%3D%3D#"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Seleris Instagram"
                  >
                    <Instagram />
                  </a>
                </div>
                <div
                  class="w-auto h-[30px] lg:h-[30px] text-[#195279] dark:text-[#FAFAFA]"
                >
                  <a
                    href="https://www.linkedin.com/company/seleris-meditekno-internasional-smi/posts/?feedView=all"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Seleris LinkedIn"
                  >
                    <Linkedin />
                  </a>
                </div>
                <div
                  class="w-auto h-[30px] lg:h-[30px] text-[#195279] dark:text-[#FAFAFA]"
                >
                  <a
                    href="https://www.tiktok.com/@seleris.id"
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
        <div class="flex lg:hidden w-full h-[1px] rounded-full mt-8" />
        <div class="w-full h-auto">
          <!-- lg:pl-6 xl:pl-12 -->
          <div class="flex flex-col w-full h-auto lg:pl-8 xl:px-8">
            <p
              class="text-[#195279] dark:text-[#FAFAFA] text-[24px] lg:text-[20px] xl:text-[22px] font-medium"
            >
              Products
            </p>
            <div>
              <router-link
                v-for="(product, index) in productList"
                :key="index"
                :to="product.url"
              >
                <p class="text-[#B8B8B8] lg:text-[18px] xl:text-[18px] pt-3">
                  {{ product.name }}
                </p>
              </router-link>
            </div>
          </div>
        </div>
        <div class="flex lg:hidden w-full h-[1px] rounded-full mt-8" />
        <div class="flex relative w-full h-auto">
          <div class="flex flex-col w-full h-auto lg:pl-8 xl:pl-5">
            <p
              class="text-[#195279] dark:text-[#FAFAFA] text-[24px] lg:text-[20px] xl:text-[22px] font-medium"
            >
              Company
            </p>
            <router-link
              v-for="(company, index) in companyList"
              :key="index"
              :to="company.url"
            >
              <p class="text-[#B8B8B8] lg:text-[18px] xl:text-[18px] pt-3">
                {{ company.name }}
              </p>
            </router-link>
          </div>
        </div>
        <div class="flex lg:hidden w-full h-[1px] rounded-full mt-8" />
        <div class="w-full h-auto xl:w-[170%]">
          <div class="flex flex-col">
            <p
              class="text-[#195279] dark:text-[#FAFAFA] text-[24px] lg:text-[18px] xl:text-[22px] font-medium"
            >
              Stay Connects
            </p>

            <div class="mb-3">
              <p
                class="text-[#195279] dark:text-[#FAFAFA] text-[18px] lg:text-[18px] xl:text-[22px] pb-2 pt-3"
              >
                Address
              </p>
              <div class="w-full h-auto flex flex-col xl:flex-row">
                <div class="w-full h-auto pb-2 lg:pr-5">
                  <p
                    class="text-[#343F52] dark:text-[#FAFAFA] font-[500] text-[14px] lg:text-[14px] xl:text-[16px] lg:pt-1.5 pb-1"
                  >
                    Seleris Asia Pacific Technology Pte.Ltd
                  </p>
                  <a
                    href="https://maps.app.goo.gl/DrebGjYQbBHyY8DF8"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="text-[#2AB857] text-[12px] lg:text-[14px] xl:text-[16px] lg:pt-1.5 w-full"
                  >
                    18 Robinson Road #15-01 Singapore 048547.
                  </a>
                </div>
                <div class="w-full h-auto lg:pr-5">
                  <p
                    class="text-[#343F52] dark:text-[#FAFAFA] font-[500] text-[14px] lg:text-[14px] xl:text-[16px] lg:pt-1.5 pb-1"
                  >
                    PT Seleris Meditekno Internasional
                  </p>
                  <a
                    href="https://maps.app.goo.gl/ywhqmCdfhGod9Mps6"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="text-[#2AB857] text-[12px] lg:text-[14px] xl:text-[16px] lg:pt-1.5"
                  >
                    Graha SMI, Jl. Raya Ragunan No. 29 A, Jakarta Selatan,
                    Indonesia 12540
                  </a>
                </div>
              </div>
            </div>
            <div class="flex flex-col xl:flex-row w-full h-auto">
              <div class="flex flex-col w-full h-auto mb-3 lg:mt-2">
                <p
                  class="text-[#195279] dark:text-[#FAFAFA] text-[20px] lg:text-[18px]"
                >
                  Phone
                </p>
                <a
                  href="tel:+62215265235"
                  class="text-[#2AB857] text-sm lg:text-base xl:text-[18px] lg:pt-1.5"
                >
                  +62 (21) 526 52 35
                </a>
              </div>
              <div class="flex flex-col w-full h-auto mb-3 lg:mt-2">
                <p
                  class="text-[#195279] dark:text-[#FAFAFA] text-[20px] lg:text-[18px]"
                >
                  E-Mail
                </p>
                <a
                  href="mailto:info@seleris.id"
                  class="text-[#2AB857] text-sm lg:text-base xl:text-[18px] lg:pt-1.5"
                >
                  info@seleris.id
                </a>
              </div>
            </div>
          </div>
        </div>
        <div class="flex lg:hidden w-full h-[1px] rounded-full mt-10" />
        <div class="w-full h-auto">
          <div class="flex flex-col lg:pl-10">
            <p
              class="text-[#195279] dark:text-[#FAFAFA] text-[24px] lg:text-[18px] xl:text-[22px] font-medium pb-0"
            >
              Get The App
            </p>
            <div class="flex flex-row lg:flex-col gap-10 lg:gap-0">
              <a
                href="https://play.google.com/store/apps/developer?id=PT.+Seleris+Meditekno+Internasional"
                target="_blank"
                rel="noopener noreferrer"
                class="flex w-auto h-full md:justify-start justify-center items-center content-center xl:justify-start xl:content-start"
              >
                <img
                  :src="playstore"
                  alt="Playstore"
                  class="w-full sm:w-[200px] md:w-[200px] xl:w-[200px] h-[100px] object-contain object-center"
                />
              </a>
              <div
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

                  <!-- Hover Overlay -->
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
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="flex w-full justify-center text-center items-center py-8">
        <p
          class="text-[14px] lg:text-[16px] xl:text-[18px] dark:text-[#FAFAFA]/40 font-[400]"
        >
          © 2023 Seleris Asia Pacific Technology. All rights reserved
        </p>
      </div>
    </div>
  </div>
</template>
