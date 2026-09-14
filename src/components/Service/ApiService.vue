<script setup>
import { useLocalizedList } from "@/utils/i18nList";
import { buatCarousel } from "@/utils/carousel";
import Atom from "@/assets/icons/Services/circle-atom.svg";
import Chip from "@/assets/icons/Services/chip-thunder.svg";
import Bars from "@/assets/icons/Services/bars-up.svg";
const ApiCards = [{ icon: Atom }, { icon: Chip }, { icon: Bars }];

const kartu = buatCarousel();

// Teks diambil dari file locale
const localizedCards = useLocalizedList("services.apiCards", ApiCards, [
  "title",
  "description",
]);
</script>

<template>
  <div
    class="flex w-full h-auto lg:h-[588px] xl:h-auto pb-5 lg:pb-10 dark:bg-transparent lg:bg-api dark:lg:bg-darkapi bg-no-repeat bg-cover bg-top xl:rounded-b-[3rem]"
  >
    <div
      class="flex flex-col w-full h-auto bg-[#F3F4F6] pb-10 lg:pb-0 lg:bg-transparent dark:bg-[#1E1F1C] dark:lg:bg-transparent rounded-[1.5rem]"
    >
      <div
        class="flex flex-col w-full h-auto mt-8 lg:mt-10 xl:mt-14 px-8 lg:px-14 gap-y-4 xl:gap-y-6"
      >
        <div class="flex w-full h-auto">
          <p class="text-[21px] lg:text-[25px] xl:text-[30px] text-[#1DC457]">
            {{ $t("services.eyebrow") }}
          </p>
        </div>
        <div class="flex w-full h-auto">
          <p
            class="text-[27px] lg:text-[29px] xl:text-[37px] text-[#195279] leading-[40px] font-[500] dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-br dark:from-[#FAFAFA] dark:via-[#D4D4D4] dark:to-[#AAAAAA]"
          >
            {{ $t("services.apiTitle") }}
          </p>
        </div>
        <div class="flex lg:w-[80%] h-auto">
          <p
            class="text-[15px] lg:text-[19px] xl:text-[21px] text-[#195279] dark:text-[#6F6F6F]"
          >
            {{ $t("services.apiDescription") }}
          </p>
        </div>
      </div>

      <div
        class="relative w-full h-auto flex flex-row mt-5 lg:mt-3 xl:mt-8 pl-1"
      >
        <transition
          enter-active-class="duration-300 ease-out"
          enter-from-class="opacity-0 scale-75 -translate-x-3"
          leave-active-class="duration-200 ease-in"
          leave-to-class="opacity-0 scale-75 -translate-x-3"
        >
          <button
            v-if="kartu.bisaKeKiri.value"
            @click="kartu.geser('left')"
            aria-label="Scroll left"
            class="hidden lg:flex absolute left-2 lg:left-8 top-1/2 -translate-y-1/2 mt-2.5 z-40 w-12 h-12 p-2 items-center justify-center rounded-full bg-white dark:bg-[#2A2B2D] shadow-md border border-[#E5E7EB] dark:border-[#3A3B3D] text-[#195279] dark:text-[#D4D4D4] hover:bg-[#195279] hover:text-white dark:hover:bg-[#3A3B3D] transition-all duration-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-full h-full"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
        </transition>

        <transition
          enter-active-class="duration-300 ease-out"
          enter-from-class="opacity-0 scale-75 translate-x-3"
          leave-active-class="duration-200 ease-in"
          leave-to-class="opacity-0 scale-75 translate-x-3"
        >
          <button
            v-if="kartu.bisaKeKanan.value"
            @click="kartu.geser('right')"
            aria-label="Scroll right"
            class="hidden lg:flex absolute right-2 lg:right-8 top-1/2 -translate-y-1/2 mt-2.5 z-40 w-12 h-12 p-2 items-center justify-center rounded-full bg-white dark:bg-[#2A2B2D] shadow-md border border-[#E5E7EB] dark:border-[#3A3B3D] text-[#195279] dark:text-[#D4D4D4] hover:bg-[#195279] hover:text-white dark:hover:bg-[#3A3B3D] transition-all duration-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-full h-full"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </transition>

        <div
          :ref="kartu.pasangEl"
          @mousedown="kartu.seretMulai"
          @mousemove="kartu.seretGerak"
          @mouseup="kartu.seretSelesai"
          @mouseleave="kartu.seretSelesai"
          @dragstart.prevent
          class="cursor-grab flex flex-row w-full h-auto mt-5 overflow-x-auto snap-x snap-mandatory scroll-pl-8 pl-8 pr-8 lg:scroll-pl-14 lg:pl-14 lg:pr-14 xl:scroll-pl-16 xl:pl-16 xl:pr-16 hide-scrollbar gap-x-5 md:gap-x-10"
        >
          <div
            v-for="(ApiCard, index) in localizedCards"
            :key="index"
            class="flex snap-start shrink-0 w-[100%] h-[150px] md:w-[60%] lg:w-[55%] xl:w-[60%] xl:h-[200px] md:h-auto lg:h-auto rounded-[22px] items-center bg-[#FAFAFA] dark:bg-[#323232] p-[1px] md:gap-x-5 dark:bg-gradient-to-tr dark:from-[#1E1F1C] dark:from-45% dark:to-[#565656]"
          >
            <div
              class="flex flex-row w-full h-full py-5 gap-x-5 md:gap-x-5 xl:gap-x-8 justify-center px-2 sm:px-0 bg-[#FAFAFA] dark:bg-[#1D1F23] dark:border-[#FAFAFA]/25 rounded-[22px]"
            >
              <div
                class="flex w-[50px] h-[50px] md:w-[50px] md:h-[50px] lg:w-[55px] lg:h-[55px] xl:w-[70px] xl:h-[70px] justify-center md:mt-2 lg:mt-0"
              >
                <img
                  :src="ApiCard.icon"
                  alt="Icon"
                  class="w-full lg:h-full xl:h-full object-contain object-top bg-white dark:bg-[#323232] rounded-full shadow-lg dark:shadow-white dark:shadow-[0px_0px_25px_-16px_#ffffff] p-3"
                />
              </div>
              <div
                class="flex flex-col w-[70%] h-auto gap-y-2 lg:gap-y-2 xl:gap-y-5"
              >
                <div class="flex w-full h-auto">
                  <p
                    class="text-[#1AB24F] text-[17px] md:text-[14px] lg:text-[17px] xl:text-[21px] font-[500]"
                  >
                    {{ ApiCard.title }}
                  </p>
                </div>
                <div class="flex w-full h-auto">
                  <p
                    class="text-[#195279] font-[400] text-[12px] sm:text-[14px] lg:text-[15px] xl:text-[19px] dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-br dark:from-[#FAFAFA] dark:via-[#D4D4D4] dark:to-[#AAAAAA]"
                  >
                    {{ ApiCard.description }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        class="flex lg:w-[65%] xl:w-[60%] h-auto px-8 lg:px-16 mt-10 lg:mt-10"
      >
        <p class="text-[#195279] dark:text-[#6F6F6F] xl:text-[20px]">
          {{ $t("services.apiSupport") }}
        </p>
      </div>
    </div>
  </div>

  <!-- <div></div> -->
</template>
