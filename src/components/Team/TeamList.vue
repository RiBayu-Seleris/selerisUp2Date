<script setup>
import DescTeamFrame from "@/components/icons/DescCardTeam.vue";
import DarkDescTeamFrame from "@/components/icons/DarkDescCardTeam.vue";

const directorSeniorteams = [
  // Board of Directors and Senior Management
  {
    image: new URL(
      "@/assets/images/leadership-teams/rinaldi.png",
      import.meta.url
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
      import.meta.url
    ).href,
    name: "Fendy Setiawan",
    position: "Chief Technology Officer",
  },
  {
    image: new URL(
      "@/assets/images/leadership-teams/rizal.png",
      import.meta.url
    ).href,
    name: "Rizal Alfaridzi",
    position: "Chief Product Officer",
  },
  {
    image: new URL(
      "@/assets/images/leadership-teams/remzy.png",
      import.meta.url
    ).href,
    name: "Remzy Ramazan",
    position: "Chief Analytics Officer",
  },
  {
    image: new URL(
      "@/assets/images/leadership-teams/harum.png",
      import.meta.url
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
      import.meta.url
    ).href,
    name: "dr. Benedicta E.T, M.Kes",
    position: "Senior Medical Advisor",
  },
];
const managementTeam = [
  // Management Team
  {
    image: new URL(
      "@/assets/images/leadership-teams/dhita.png",
      import.meta.url
    ).href,
    name: "Dhita Septiani",
    position: "Product Manager",
  },
  {
    image: new URL("@/assets/images/leadership-teams/riza.png", import.meta.url)
      .href,
    name: "Riza Afriani",
    position: "Marketing Manager",
  },
  {
    image: new URL(
      "@/assets/images/leadership-teams/davva.png",
      import.meta.url
    ).href,
    name: "M. Davva Alfaiz",
    position: "VP Finance & Investment",
  },
];
</script>

<template>
  <!-- Board of Directors and Senior Management -->
  <div class="flex flex-col w-full h-auto dark:bg-[#17181A]">
    <div
      class="flex flex-col w-full h-auto justify-center items-center space-y-2 md:px-10 lg:px-10 xl:px-14"
    >
      <p
        class="px-8 sm:px-0 text-center text-[20px] sm:text-[26px] md:text-[32px] lg:text-[36px] xl:text-[40px] font-[500] text-[#1AB24F] dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-br dark:from-[#FAFAFA] dark:via-[#D4D4D4] dark:to-[#AAAAAA]"
      >
        Directors and Senior Management Team
      </p>
      <p
        class="text-[14px] md:text-[18px] lg:text-[18px] xl:text-[20px] px-10 sm:px-0 font-[400] tracking-wider lg:tracking-normal text-[#89A6BA] dark:text-[#6F6F6F] text-center"
      >
        <!-- Desktop -->
        <span class="hidden md:block">
          Our leadership team brings decades of experiences,
          <br class="md:block lg:hidden" />
          a proven track record of success.
        </span>
        <!-- Mobile -->
        <span class="block md:hidden">
          Our leadership team brings decades of experiences,
          <br class="hidden sm:block" />
          a proven track
          <br class="block sm:hidden" />
          record of success.
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
        class="flex flex-row py-0 w-full h-auto gap-x-5 sm:gap-x-7 md:gap-x-8 lg:gap-x-10 mt-5 overflow-x-auto snap-x snap-mandatory scroll-pl-10 pl-10 pr-10 sm:scroll-pl-10 sm:pl-10 sm:pr-10 lg:scroll-pl-16 lg:pl-16 lg:pr-16 hide-scrollbar"
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

  <!-- Management Team -->
  <div class="flex flex-col w-full h-auto mt-24 dark:bg-[#17181A]">
    <div
      class="flex flex-col w-full h-auto justify-center items-center space-y-2 md:px-10 lg:px-10 xl:px-14"
    >
      <p
        class="text-[20px] sm:text-[26px] md:text-[32px] lg:text-[36px] xl:text-[40px] font-[500] text-[#1AB24F] dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-br dark:from-[#FAFAFA] dark:via-[#D4D4D4] dark:to-[#AAAAAA]"
      >
        Management Team
      </p>
      <p
        class="text-[14px] md:text-[18px] lg:text-[18px] xl:text-[20px] px-10 sm:px-0 font-[400] tracking-wider lg:tracking-normal text-[#89A6BA] dark:text-[#6F6F6F] text-center"
      >
        <!-- Desktop -->
        <span class="hidden md:block">
          Our leadership team brings decades of experiences,
          <br class="md:block lg:hidden" />
          a proven track record of success.
        </span>
        <!-- Mobile -->
        <span class="block md:hidden">
          Our leadership team brings decades of experiences,
          <br class="hidden sm:block" />
          a proven track
          <br class="block sm:hidden" />
          record of success.
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
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
</style>
