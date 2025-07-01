<script setup>
import PartnersCard from "./reusable/PartnersCard.vue";

const Partners = [
  {
    image: new URL("@/assets/partners/rynest.png", import.meta.url).href,
  },
  {
    image: new URL("@/assets/partners/math-faculty.png", import.meta.url).href,
  },
  {
    image: new URL("@/assets/partners/dsc.png", import.meta.url).href,
  },
  {
    image: new URL("@/assets/partners/boa.png", import.meta.url).href,
  },
  {
    image: new URL("@/assets/partners/grm.png", import.meta.url).href,
  },
  {
    image: new URL("@/assets/partners/bc.png", import.meta.url).href,
  },
  {
    image: new URL("@/assets/partners/cc.png", import.meta.url).href,
  },
  {
    image: new URL("@/assets/partners/data-ai.png", import.meta.url).href,
  },
  {
    image: new URL("@/assets/partners/hunting.png", import.meta.url).href,
  },
];
</script>

<template>
  <div class="mt-20">
    <div class="w-full h-[100vh] bg-partners px-14">
      <div class="flex flex-col w-full h-full">
        <div class="flex flex-col w-full h-auto">
          <div class="flex w-full justify-center items-center">
            <p class="text-6xl font-semibold text-[#195279]">OUR PARTNERS</p>
          </div>
          <div class="flex w-full justify-center items-center my-4">
            <p class="text-2xl text-[#1DC457]">
              Seleris collaborates with partners to make a positive impact in
              health and insurance.
            </p>
          </div>
        </div>
        <div class="grid grid-cols-3 w-full h-auto gap-x-10 gap-y-5 mt-5">
          <PartnersCard
            v-for="(partner, index) in Partners"
            :key="index"
            :image="partner.image"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.bg-partners {
  background-image: url("@/assets/images/bg-partners.png");
  background-size: cover;
  background-repeat: no-repeat;
}
</style>
