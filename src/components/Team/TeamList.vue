<script setup>
const teams = [
  {
    image: new URL(
      "@/assets/images/leadership-teams/example.png",
      import.meta.url
    ).href,
    name: "Vania Denia",
    position: "Chief Technology Officer",
  },
  {
    image: new URL(
      "@/assets/images/leadership-teams/example.png",
      import.meta.url
    ).href,
    name: "Vania Denia",
    position: "Chief Technology Officer",
  },
  {
    image: new URL(
      "@/assets/images/leadership-teams/example.png",
      import.meta.url
    ).href,
    name: "Vania Denia",
    position: "Chief Technology Officer",
  },
  {
    image: new URL(
      "@/assets/images/leadership-teams/example.png",
      import.meta.url
    ).href,
    name: "Vania Denia",
    position: "Chief Technology Officer",
  },
  {
    image: new URL(
      "@/assets/images/leadership-teams/example.png",
      import.meta.url
    ).href,
    name: "Vania Denia",
    position: "Chief Technology Officer",
  },
  {
    image: new URL(
      "@/assets/images/leadership-teams/example.png",
      import.meta.url
    ).href,
    name: "Vania Denia",
    position: "Chief Technology Officer",
  },
];
</script>

<template>
  <div class="flex flex-col w-full h-auto">
    <div
      class="flex flex-col w-full h-auto justify-center items-center xl:px-14 md:px-10 lg:px-10"
    >
      <p class="lg:text-[48px] xl:text-[48px] font-[500] text-[#1AB24F]">
        Leadership Team
      </p>
      <p class="lg:text-[20px] xl:text-[20px] font-[400] text-[#89A6BA]">
        Our leadership team brings decades of experiences, a proven track record
        of success.
      </p>
    </div>
    <div class="w-full h-auto flex flex-row lg:mt-3 xl:mt-8">
      <div
        class="flex flex-row py-2 w-full h-auto gap-x-10 mt-5 overflow-x-auto snap-x snap-mandatory scroll-pl-14 pl-14 pr-14 hide-scrollbar"
      >
        <div
          v-for="(team, index) in teams"
          :key="index"
          class="snap-start shrink-0 xl:w-[350px] sml:h-[270px] md:h-[200px] lg:h-[440px] xl:h-[440px] rounded-[22px]"
        >
          <div
            class="relative flex w-full h-full bg-blue-300 rounded-[22px] justify-center items-end"
          >
            <img
              :src="team.image"
              alt="Robot"
              class="w-full h-full object-cover rounded-[22px]"
            />
            <div
              class="absolute flex w-full h-auto justify-center items-center py-5"
            >
              <div class="relative flex justify-center items-center">
                <img
                  src="@/assets/images/desc-card-team.png"
                  alt="Robot"
                  class="w-[330px] h-[111.93px] object-cover rounded-[22px] shadow-xl"
                />
                <div class="absolute flex w-full h-auto pl-5 flex-col pt-2">
                  <p class="font-[600] text-[#195279] text-[24px]">
                    {{ team.name }}
                  </p>
                  <p class="font-[400] text-[#195279] text-[16px]">
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
