<script setup>
import Banner from "@/assets/images/Hero2.png";
import Navbar from "@/components/Navbar.vue";
import NavbarScroll from "@/components/NavbarScroll.vue";
import AiDesc from "@/components/AiDesc.vue";
import Certificate from "@/components/Certificate.vue";
import Description from "@/components/Description.vue";
import Benefits from "@/components/Benefits.vue";
import Products from "@/components/Products.vue";
import Different from "@/components/Different.vue";
import Partners from "@/components/Partners.vue";
import Clients from "@/components/Clients.vue";
import Touch from "@/components/Touch.vue";
import SpinOrbit from "@/components/example/SpinOrbit.vue";
import Sidebar from "@/components/Sidebar.vue";
import SliderDescription from "@/components/SliderDescription.vue";
import Logo from "@/assets/images/logo.png";
// Sosmed Icon
import Instagram from "@/components/icons/Instagram.vue";
import Linkedin from "@/components/icons/Linkedin.vue";
import Twitter from "@/components/icons/Twitter.vue";

// Images
import playstore from "@/assets/images/playstore.png";
import appstore from "@/assets/images/appstore.png";

import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { ref, onMounted, onUnmounted, watch } from "vue"; // ← Tambahkan ini!
// import { useScrollStore } from "@/stores/scroll";
import { useSidebarStore } from "@/stores/sidebar";

// Import Swiper CSS
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const isNavScrolled = ref(false);
const sidebarStore = useSidebarStore();

watch(
  () => sidebarStore.isOpen,
  (isOpen) => {
    document.body.classList.toggle("overflow-hidden", isOpen);
  }
);

const onScroll = () => {
  isNavScrolled.value = window.scrollY > 5;
};

onMounted(() => {
  window.addEventListener("scroll", onScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", onScroll);
});
</script>

<template>
  <Sidebar v-if="sidebarStore.isOpen" />
  <div
    :class="[
      'flex flex-col w-full font-poppins bg-[#F9F9FB]',
      isNavScrolled ? 'pt-0' : 'pt-2',
    ]"
  >
    <header
      :class="[
        'flex flex-col relative w-full px-9 sml:pt-0  items-center',
        isNavScrolled ? 'lg:pt-0 ' : 'lg:pt-2',
      ]"
    >
      <!-- Navbar -->
      <component :is="isNavScrolled ? NavbarScroll : Navbar" />

      <main
        class="w-full z-30 lg:-mt-5 bg-[#F3F4F6] rounded-[2.5rem] sml:rounded-lg"
      >
        <!-- Hero Text -->

        <div
          class="flex flex-col w-full h-auto mt-5 text-center justify-center items-center z-30"
        >
          <div class="w-full pb-2 sml:pb-4">
            <p class="text-3xl sml:text-2xl text-[#1AB24F] font-medium">
              AI Inovation
            </p>
          </div>
          <div class="w-full pb-2 sml:pb-4 text-[#195279]">
            <p class="text-5xl sml:text-3xl font-semibold leading-[55px]">
              The Future of Life
            </p>
            <p class="text-5xl sml:text-3xl font-semibold leading-[55px]">
              Insurance Underwriting
            </p>
          </div>

          <!-- Swipe caption -->
          <div class="flex flex-row items-center mb-2">
            <p
              class="text-lg sml:text-md font-medium bg-gradient-to-r from-[#B9CAD5] to-[#195279] bg-clip-text text-transparent cursor-pointer"
            >
              Swipe to view product
            </p>
            <div class="ml-1">
              <svg
                class="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14.43 18.07L20.5 12L14.43 5.92999"
                  stroke="#13405E"
                  stroke-width="1.5"
                  stroke-miterlimit="10"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M3.50002 12L20.33 12"
                  stroke="#13405E"
                  stroke-width="1.5"
                  stroke-miterlimit="10"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>

        <!-- Swiper -->
        <div class="w-full sml:h-auto sml:mt-5 lg:h-[330px] lg:px-0">
          <Swiper
            :modules="[Navigation, Autoplay]"
            :navigation="false"
            :autoplay="{ delay: 2500, disableOnInteraction: false }"
            :pagination="false"
            loop
            class="w-full h-full group animate__animated animate__fadeIn animate__delay-3s"
          >
            <SwiperSlide>
              <img
                :src="Banner"
                alt="Logo Besar"
                class="w-full lg:h-full lg:object-contain object-bottom lg:px-10"
              />
              <SliderDescription />
            </SwiperSlide>

            <SwiperSlide>
              <img
                :src="Banner"
                alt="Logo Besar"
                class="w-full lg:h-full lg:object-contain object-bottom lg:px-10"
              />
              <SliderDescription />
            </SwiperSlide>

            <SwiperSlide>
              <img
                :src="Banner"
                alt="Logo Besar"
                class="w-full lg:h-full lg:object-contain object-bottom lg:px-10"
              />
              <SliderDescription />
            </SwiperSlide>
          </Swiper>
        </div>
      </main>
    </header>
    <main>
      <div class="w-full h-auto">
        <Description />
      </div>
      <div class="w-full h-auto">
        <AiDesc />
      </div>
      <div class="w-full h-auto">
        <Certificate />
      </div>
      <div class="w-full h-auto">
        <Benefits />
      </div>
      <div class="w-full h-auto">
        <Products />
      </div>
      <div class="w-full h-auto">
        <Different />
      </div>
      <div class="w-full h-auto">
        <Partners />
      </div>
      <div class="w-full h-auto">
        <Clients />
      </div>
      <div class="w-full h-auto">
        <Touch />
      </div>
    </main>
    <footer class="px-16 mt-16">
      <div class="flex flex-col w-full h-auto">
        <div class="grid grid-cols-5 w-full h-auto mb-20">
          <div class="flex w-full h-auto">
            <div class="flex flex-col">
              <div
                class="flex w-full h-full justify-start items-start content-start"
              >
                <img
                  :src="Logo"
                  alt="Logo"
                  class="w-full h-[100px] object-contain object-left"
                />
              </div>
              <div class="w-full h-auto mt-4">
                <p class="text-[#195279] font-semibold">
                  PT Seleris Meditekno Internasional
                </p>
              </div>
              <div class="w-full h-auto mt-4">
                <p class="text-[#B8B8B8] text-md">
                  Transform the Life and Medical Insurance Underwriting industry
                  by making it more efficient, accurate, and accessible for
                  everyone
                </p>
              </div>
              <div class="w-full h-auto mt-4">
                <div class="w-full h-auto flex flex-row justify-start gap-x-3">
                  <div class="w-auto h-[40px]">
                    <Instagram />
                  </div>
                  <div class="w-auto h-[40px]">
                    <Linkedin />
                  </div>
                  <div class="w-auto h-[40px]">
                    <Twitter />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="w-full h-auto">
            <div class="flex flex-col px-10">
              <p class="text-[#195279] text-3xl font-medium pb-2">Products</p>
              <p class="text-[#B8B8B8] text-xl py-1.5">Seleris Lifins</p>
              <p class="text-[#B8B8B8] text-xl py-1.5">Seleris Medins</p>
              <p class="text-[#B8B8B8] text-xl py-1.5">Seleris Credit Cover</p>
              <p class="text-[#B8B8B8] text-xl py-1.5">Seleris Care</p>
              <p class="text-[#B8B8B8] text-xl py-1.5">Flexa Asia</p>
              <p class="text-[#B8B8B8] text-xl py-1.5">Auto Claim</p>
            </div>
          </div>
          <div class="w-full h-auto">
            <div class="flex flex-col px-10">
              <p class="text-[#195279] text-3xl font-medium pb-2">Company</p>
              <p class="text-[#B8B8B8] text-xl py-1.5">Home</p>
              <p class="text-[#B8B8B8] text-xl py-1.5">About</p>
              <p class="text-[#B8B8B8] text-xl py-1.5">Our Team</p>
              <p class="text-[#B8B8B8] text-xl py-1.5">Blog</p>
              <p class="text-[#B8B8B8] text-xl py-1.5">Services</p>
              <p class="text-[#B8B8B8] text-xl py-1.5">Contact</p>
            </div>
          </div>
          <div class="w-full h-auto">
            <div class="flex flex-col">
              <p class="text-[#195279] text-3xl font-medium pb-2">
                Stay Connects
              </p>
              <div>
                <p class="text-[#195279] text-xl py-1.5">Address</p>
                <p class="text-[#2AB857] text-xl py-1.5">
                  16 Raffles Quay #35 - 01B Hong Leong Building SINGAPORE
                  (048581
                </p>
              </div>
              <div>
                <p class="text-[#195279] text-xl py-1.5">Phone</p>
                <p class="text-[#2AB857] text-xl py-1.5">+62 (21) 526 52 35</p>
              </div>
              <div>
                <p class="text-[#195279] text-xl py-1.5">E-Mail</p>
                <p class="text-[#2AB857] text-xl py-1.5">support@seleris.ai</p>
              </div>
            </div>
          </div>
          <div class="w-full h-auto">
            <div class="flex flex-col pl-10">
              <p class="text-[#195279] text-3xl font-medium pb-2">
                Get The App
              </p>
              <div class="flex flex-col">
                <div
                  class="flex w-full h-full justify-center items-center content-center"
                >
                  <img
                    :src="playstore"
                    alt="Logo"
                    class="w-full h-[100px] object-contain object-center"
                  />
                </div>
                <div
                  class="flex w-full h-full justify-center items-center content-center"
                >
                  <img
                    :src="appstore"
                    alt="Logo"
                    class="w-full h-[100px] object-contain object-center"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="flex w-full justify-center text-center items-center py-5">
          <p>© 2023 Seleris Asia Pacific Technology. All rights reserved</p>
        </div>
      </div>
    </footer>
    <!-- <div class="w-full h-auto">
      <SpinOrbit />
    </div> -->
  </div>
</template>
