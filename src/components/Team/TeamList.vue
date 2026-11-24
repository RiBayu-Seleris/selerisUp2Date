<script setup>
import DescTeamFrame from "@/components/icons/DescCardTeam.vue";
import DarkDescTeamFrame from "@/components/icons/DarkDescCardTeam.vue";
import { buatCarousel } from "@/utils/carousel";

const direksi = buatCarousel();

const directorSeniorteams = [
  // Board of Directors and Senior Management
  {
    image: new URL(
      "@/assets/images/leadership-teams/rinaldi.png",
      import.meta.url,
    ).href,
    name: "Rinaldi Anwar",
    position: "Founder & CEO",
  },
  // {
  //   image: new URL(
  //     "@/assets/images/leadership-teams/shandy.png",
  //     import.meta.url
  //   ).href,
  //   name: "Shandy Rahussholihin",
  //   position: "Chief Operation Officer",
  // },
  {
    image: new URL(
      "@/assets/images/leadership-teams/fendy.png",
      import.meta.url,
    ).href,
    name: "Fendy Setiawan",
    position: "Chief Technology Officer",
  },
  {
    image: new URL(
      "@/assets/images/leadership-teams/rizal.png",
      import.meta.url,
    ).href,
    name: "Rizal Alfaridzi",
    position: "Chief Product Officer",
  },
  {
    image: new URL(
      "@/assets/images/leadership-teams/remzy.png",
      import.meta.url,
    ).href,
    name: "Remzy Ramazan",
    position: "Chief Analytics Officer",
  },
  {
    image: new URL(
      "@/assets/images/leadership-teams/harum.png",
      import.meta.url,
    ).href,
    name: "Harum Ananda",
    position: "Chief Research Officer",
  },
  {
    image: new URL("@/assets/images/leadership-teams/prof.png", import.meta.url)
      .href,
    name: "Prof. Alhadi Bustamam",
    position: "Senior Advisor",
  },
  {
    image: new URL(
      "@/assets/images/leadership-teams/Benedicta.png",
      import.meta.url,
    ).href,
    name: "dr. Benedicta E.T, M.Kes",
    position: "Senior Medical Advisor",
  },
  {
    image: new URL(
      "@/assets/images/leadership-teams/Yurika.png",
      import.meta.url,
    ).href,
    name: "dr. Yurika Martalia",
    position: "Medical Advisor",
  },
  {
    image: new URL("@/assets/images/leadership-teams/Febi.png", import.meta.url)
      .href,
    name: "dr. Febi Revia",
    position: "Medical Advisor",
  },
];
const managementTeam = [
  // Management Team
  {
    image: new URL(
      "@/assets/images/leadership-teams/Zahra.png",
      import.meta.url,
    ).href,
    name: "Zahra Ulfa",
    position: "Marketing Manager",
  },
  {
    image: new URL(
      "@/assets/images/leadership-teams/davva.png",
      import.meta.url,
    ).href,
    name: "M. Davva Alfaiz",
    position: "VP Finance & Investment",
  },
];
</script>

<template>
  <div class="flex flex-col w-full h-auto dark:bg-[#17181A]">
    <div
      class="flex flex-col w-full h-auto justify-center items-center space-y-2 md:px-10 lg:px-10 xl:px-14"
    >
      <p
        class="px-8 sm:px-0 text-center text-[20px] sm:text-[26px] md:text-[32px] lg:text-[36px] xl:text-[40px] font-[500] text-[#1AB24F] dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-br dark:from-[#FAFAFA] dark:via-[#D4D4D4] dark:to-[#AAAAAA]"
      >
        {{ $t("misc.directorsTeam") }}
      </p>
      <p
        class="text-[14px] md:text-[18px] lg:text-[18px] xl:text-[20px] px-10 sm:px-0 font-[400] tracking-wider lg:tracking-normal text-[#89A6BA] dark:text-[#6F6F6F] text-center"
      >
        <span class="hidden md:block">
          {{ $t("misc.leadership1") }}
          <br class="md:block lg:hidden" />
          {{ $t("misc.leadership2") }}
        </span>

        <span class="block md:hidden">
          {{ $t("misc.leadership1") }}
          <br class="hidden sm:block" />
          {{ $t("misc.leadershipMobile2") }}
          <br class="block sm:hidden" />
          {{ $t("misc.leadershipMobile3") }}
        </span>
      </p>
    </div>
    <div class="relative w-full h-auto flex flex-row mt-10">
      <div
        class="hidden xl:flex absolute w-32 h-full bg-gradient-to-r from-[#FAFAFA] from-0% to-[#FAFAFA]/0 to-60% dark:bg-gradient-to-r dark:from-[#17181A] dark:from-0% dark:to-[#17181A]/0 dark:to-60% left-0 top-0 z-30 pointer-events-none"
      />
      <div
        class="hidden xl:flex absolute w-32 h-full bg-gradient-to-l from-[#FAFAFA] from-0% to-[#FAFAFA]/0 to-60% dark:bg-gradient-to-l dark:from-[#17181A] dark:from-0% dark:to-[#17181A]/0 dark:to-60% right-0 top-0 z-30 pointer-events-none"
      />
      <transition
        enter-active-class="duration-300 ease-out"
        enter-from-class="opacity-0 scale-75 -translate-x-3"
        leave-active-class="duration-200 ease-in"
        leave-to-class="opacity-0 scale-75 -translate-x-3"
      >
        <button
          v-if="direksi.bisaKeKiri.value"
          @click="direksi.geser('left')"
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
          v-if="direksi.bisaKeKanan.value"
          @click="direksi.geser('right')"
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
        :ref="direksi.pasangEl"
        @mousedown="direksi.seretMulai"
        @mousemove="direksi.seretGerak"
        @mouseup="direksi.seretSelesai"
        @mouseleave="direksi.seretSelesai"
        @dragstart.prevent
        class="cursor-grab flex flex-row py-0 w-full h-auto gap-x-5 sm:gap-x-7 md:gap-x-8 lg:gap-x-10 mt-5 overflow-x-auto snap-x snap-mandatory scroll-pl-10 pl-10 pr-10 sm:scroll-pl-10 sm:pl-10 sm:pr-10 lg:scroll-pl-16 lg:pl-16 lg:pr-16 hide-scrollbar"
      >
        <div
          v-for="(team, index) in directorSeniorteams"
          :key="index"
          class="snap-center w-auto shrink-0 h-auto rounded-[22px]"
        >
          <div
            class="relative flex w-full h-auto rounded-[22px] justify-center items-end"
          >
            <img
              :src="team.image"
              alt="Photo"
              class="w-auto h-[200px] sm:h-[260px] md:h-[310px] lg:h-[370px] xl:h-[350px] object-cover bg-no-repeat rounded-[22px]"
            />
            <div
              class="absolute flex w-full h-auto justify-center items-center pb-3"
            >
              <div class="relative flex justify-center items-center">
                <DescTeamFrame
                  svgClass="h-auto w-[165px] sm:w-[220px] md:w-[260px] lg:w-[310px] xl:w-[300px] dark:hidden"
                />
                <DarkDescTeamFrame
                  svgClass="h-auto w-[165px] sm:w-[220px] md:w-[260px] lg:w-[310px] xl:w-[300px] hidden dark:block"
                />
                <div
                  class="absolute flex flex-col w-full h-auto pl-3 lg:pl-5 pt-3 lg:pt-3"
                >
                  <p
                    class="font-[600] text-[#195279] dark:text-[#FFFFFF] text-[12px] sm:text-[14px] md:text-[16px] lg:text-[20px]"
                  >
                    {{ team.name }}
                  </p>
                  <p
                    class="font-[500] text-[#195279] dark:text-[#FAFAFA] text-[10px] sm:text-[12px] md:text-[14px] lg:text-[16px]"
                  >
                    {{ team.position }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="flex flex-col w-full h-auto mt-24 dark:bg-[#17181A]">
    <div
      class="flex flex-col w-full h-auto justify-center items-center space-y-2 md:px-10 lg:px-10 xl:px-14"
    >
      <p
        class="text-[20px] sm:text-[26px] md:text-[32px] lg:text-[36px] xl:text-[40px] font-[500] text-[#1AB24F] dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-br dark:from-[#FAFAFA] dark:via-[#D4D4D4] dark:to-[#AAAAAA]"
      >
        {{ $t("misc.managementTeam") }}
      </p>
      <p
        class="text-[14px] md:text-[18px] lg:text-[18px] xl:text-[20px] px-10 sm:px-0 font-[400] tracking-wider lg:tracking-normal text-[#89A6BA] dark:text-[#6F6F6F] text-center"
      >
        <span class="hidden md:block">
          {{ $t("misc.leadership1") }}
          <br class="md:block lg:hidden" />
          {{ $t("misc.leadership2") }}
        </span>

        <span class="block md:hidden">
          {{ $t("misc.leadership1") }}
          <br class="hidden sm:block" />
          {{ $t("misc.leadershipMobile2") }}
          <br class="block sm:hidden" />
          {{ $t("misc.leadershipMobile3") }}
        </span>
      </p>
    </div>
    <div class="relative w-full h-auto flex flex-row mt-10">
      <div
        class="hidden xl:flex absolute w-32 h-full bg-gradient-to-r from-[#FAFAFA] from-0% to-[#FAFAFA]/0 to-60% dark:bg-gradient-to-r dark:from-[#17181A] dark:from-0% dark:to-[#17181A]/0 dark:to-60% left-0 z-20"
      />
      <div
        class="hidden xl:flex absolute w-32 h-full bg-gradient-to-l from-[#FAFAFA] from-0% to-[#FAFAFA]/0 to-60% dark:bg-gradient-to-l dark:from-[#17181A] dark:from-0% dark:to-[#17181A]/0 dark:to-60% right-0 z-20"
      />
      <div
        class="flex flex-row lg:justify-center lg:items-center py-0 w-full h-auto gap-x-5 sm:gap-x-7 md:gap-x-8 lg:gap-x-10 mt-5 overflow-x-auto snap-x snap-mandatory scroll-pl-10 pl-10 pr-10 sm:scroll-pl-10 sm:pl-10 sm:pr-10 lg:scroll-pl-16 lg:pl-16 lg:pr-16 hide-scrollbar"
      >
        <div
          v-for="(team, index) in managementTeam"
          :key="index"
          class="snap-center w-auto shrink-0 h-auto rounded-[22px]"
        >
          <div
            class="relative flex w-full h-auto rounded-[22px] justify-center items-end"
          >
            <img
              :src="team.image"
              alt="Photo"
              class="w-auto h-[200px] sm:h-[260px] md:h-[310px] lg:h-[370px] xl:h-[350px] object-cover bg-no-repeat rounded-[22px]"
            />
            <div
              class="absolute flex w-full h-auto justify-center items-center pb-3"
            >
              <div class="relative flex justify-center items-center">
                <DescTeamFrame
                  svgClass="h-auto w-[165px] sm:w-[220px] md:w-[260px] lg:w-[310px] xl:w-[300px] dark:hidden"
                />
                <DarkDescTeamFrame
                  svgClass="h-auto w-[165px] sm:w-[220px] md:w-[260px] lg:w-[310px] xl:w-[300px] hidden dark:block"
                />
                <div
                  class="absolute flex flex-col w-full h-auto pl-3 lg:pl-5 pt-3 lg:pt-3"
                >
                  <p
                    class="font-[600] text-[#195279] dark:text-[#FFFFFF] text-[12px] sm:text-[14px] md:text-[16px] lg:text-[20px]"
                  >
                    {{ team.name }}
                  </p>
                  <p
                    class="font-[500] text-[#195279] dark:text-[#FAFAFA] text-[10px] sm:text-[12px] md:text-[14px] lg:text-[16px]"
                  >
                    {{ team.position }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}
.hide-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
