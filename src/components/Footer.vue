<script setup>
import Logo from "@/assets/images/logo.png";

// Sosmed Icon
import Instagram from "@/components/icons/Instagram.vue";
import Linkedin from "@/components/icons/Linkedin.vue";
import Twitter from "@/components/icons/Twitter.vue";

// Images
import playstore from "@/assets/images/playstore.png";
import appstore from "@/assets/images/appstore.png";
</script>

<template>
  <div class="relative w-full h-auto">
    <div class="flex flex-col lg:flex-rows w-full h-auto">
      <div class="lg:grid lg:grid-cols-5 w-full h-auto lg:mb-14 mb-0">
        <div class="flex w-full h-auto">
          <div class="flex flex-col">
            <div class="flex flex-row lg:flex-col w-full h-auto">
              <div
                class="flex w-full h-full md:w-[60%] lg:justify-start lg:items-start lg:content-start justify-center items-center content-center"
              >
                <img
                  :src="Logo"
                  alt="Logo"
                  class="w-full sml:h-[60px] md:h-[80px] lg:h-[100px] object-contain object-left"
                />
              </div>
              <div
                class="flex w-full h-auto lg:mt-4 justify-center items-center"
              >
                <p
                  class="text-[#195279] font-semibold lg:text-xl sml:text-md md:text-[1.7rem]"
                >
                  PT Seleris Meditekno Internasional
                </p>
              </div>
            </div>
            <div class="w-full h-auto mt-4">
              <p class="text-[#B8B8B8] text-base text-justify">
                Transform the Life and Medical Insurance Underwriting industry
                by making it more efficient, accurate, and accessible for
                everyone
              </p>
            </div>
            <div class="w-full h-auto mt-4">
              <div class="w-full h-auto flex flex-row justify-start gap-x-3">
                <div class="w-auto h-[30px] lg:h-[40px]">
                  <Instagram />
                </div>
                <div class="w-auto h-[30px] lg:h-[40px]">
                  <Linkedin />
                </div>
                <div class="w-auto h-[30px] lg:h-[40px]">
                  <Twitter />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="flex lg:hidden w-full h-1 bg-[#F3F4F6] rounded-full my-3" />
        <div class="w-full h-auto">
          <div class="flex flex-col lg:px-10">
            <p class="text-[#195279] text-2xl lg:text-3xl font-medium pb-2">
              Products
            </p>
            <div>
              <p class="text-[#B8B8B8] text-lg lg:text-xl py-1.5">
                Seleris Lifins
              </p>
              <p class="text-[#B8B8B8] text-lg lg:text-xl py-1.5">
                Seleris Medins
              </p>
              <p class="text-[#B8B8B8] text-lg lg:text-xl py-1.5">
                Seleris Credit Cover
              </p>
              <p class="text-[#B8B8B8] text-lg lg:text-xl py-1.5">
                Seleris Care
              </p>
              <p class="text-[#B8B8B8] text-lg lg:text-xl py-1.5">Flexa Asia</p>
              <p class="text-[#B8B8B8] text-lg lg:text-xl py-1.5">Auto Claim</p>
            </div>
          </div>
        </div>
        <div class="flex lg:hidden w-full h-1 bg-[#F3F4F6] rounded-full my-3" />
        <div class="w-full h-auto">
          <div class="flex flex-col lg:px-10">
            <p class="text-[#195279] text-2xl lg:text-3xl font-medium pb-2">
              Company
            </p>
            <p class="text-[#B8B8B8] text-lg lg:text-xl py-1.5">Home</p>
            <p class="text-[#B8B8B8] text-lg lg:text-xl py-1.5">About</p>
            <p class="text-[#B8B8B8] text-lg lg:text-xl py-1.5">Our Team</p>
            <p class="text-[#B8B8B8] text-lg lg:text-xl py-1.5">Blog</p>
            <p class="text-[#B8B8B8] text-lg lg:text-xl py-1.5">Services</p>
            <p class="text-[#B8B8B8] text-lg lg:text-xl py-1.5">Contact</p>
          </div>
        </div>
        <div class="flex lg:hidden w-full h-1 bg-[#F3F4F6] rounded-full my-3" />
        <div class="w-full h-auto">
          <div class="flex flex-col">
            <p class="text-[#195279] text-2xl lg:text-3xl font-medium pb-2">
              Stay Connects
            </p>
            <div class="mb-3 mt-2 lg:mt-2">
              <p class="text-[#195279] text-xl">Address</p>
              <p class="text-[#2AB857] text-lg lg:text-xl lg:py-1.5">
                16 Raffles Quay #35 - 01B Hong Leong Building SINGAPORE (048581)
              </p>
            </div>
            <div class="mb-3 lg:mt-2">
              <p class="text-[#195279] text-xl">Phone</p>
              <p class="text-[#2AB857] text-lg lg:text-xl lg:py-1.5">
                +62 (21) 526 52 35
              </p>
            </div>
            <div class="mb-3 lg:mt-2">
              <p class="text-[#195279] text-xl">E-Mail</p>
              <p class="text-[#2AB857] text-lg lg:text-xl lg:py-1.5">
                support@seleris.ai
              </p>
            </div>
          </div>
        </div>
        <div class="flex lg:hidden w-full h-1 bg-[#F3F4F6] rounded-full my-3" />
        <div class="w-full h-auto">
          <div class="flex flex-col lg:pl-10">
            <p class="text-[#195279] text-3xl font-medium pb-2 sml:pb-0">
              Get The App
            </p>
            <div class="flex flex-row lg:flex-col gap-10 lg:gap-0">
              <div
                class="flex w-full h-full md:justify-start justify-center items-center content-center"
              >
                <img
                  :src="playstore"
                  alt="Playstore"
                  class="w-full md:w-[300px] h-[100px] object-contain object-center"
                />
              </div>
              <div
                class="flex w-full h-full justify-center items-center content-center"
              >
                <img
                  :src="appstore"
                  alt="Appstore"
                  class="w-full md:w-[300px] h-[100px] object-contain object-center"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="flex w-full justify-center text-center items-center pb-8">
        <p>© 2023 Seleris Asia Pacific Technology. All rights reserved</p>
      </div>
    </div>
  </div>
</template>
