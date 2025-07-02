<script setup>
import CardTilt from "@/components/reusable/CardTilt.vue";
import CardSlide from "@/components/reusable/CardSlide.vue";

const Partners = [
  {
    image: new URL("@/assets/images/partners/rynest.png", import.meta.url).href,
  },
  {
    image: new URL("@/assets/images/partners/math-faculty.png", import.meta.url)
      .href,
  },
  {
    image: new URL("@/assets/images/partners/dsc.png", import.meta.url).href,
  },
  {
    image: new URL("@/assets/images/partners/boa.png", import.meta.url).href,
  },
  {
    image: new URL("@/assets/images/partners/grm.png", import.meta.url).href,
  },
  {
    image: new URL("@/assets/images/partners/bc.png", import.meta.url).href,
  },
  {
    image: new URL("@/assets/images/partners/cc.png", import.meta.url).href,
  },
  {
    image: new URL("@/assets/images/partners/data-ai.png", import.meta.url)
      .href,
  },
  {
    image: new URL("@/assets/images/partners/hunting.png", import.meta.url)
      .href,
  },
];
const PartnersRow1 = Partners.slice(0, Math.ceil(Partners.length / 2));
const PartnersRow2 = Partners.slice(Math.ceil(Partners.length / 2));
</script>

<template>
  <div class="mt-20">
    <div class="w-full max-h-screen bg-partners px-0 lg:px-14 pt-5 lg:pb-0">
      <div class="flex flex-col w-full h-full pb-10">
        <div class="flex flex-col w-full px-14 lg:px-0 h-auto">
          <div class="flex w-full justify-center items-center">
            <p class="text-4xl lg:text-4xl font-semibold text-[#195279]">
              OUR PARTNERS
            </p>
          </div>
          <div class="flex w-full justify-center items-center my-4">
            <p class="text-2xl lg:text-2xl text-[#1DC457] text-center">
              Seleris collaborates with partners to make a positive impact in
              health and insurance.
            </p>
          </div>
        </div>
        <div
          class="hidden lg:grid grid-cols-3 w-full h-auto gap-x-10 gap-y-5 mt-5"
        >
          <CardTilt
            v-for="(partner, index) in Partners"
            :key="index"
            :image="partner.image"
          />
        </div>

        <!-- Mobile -->
        <div class="lg:hidden w-full overflow-hidden">
          <!-- animate-marquee whitespace-nowrap -->
          <div class="w-full h-auto flex flex-col gap-10 pt-6 pb-16">
            <!-- Row 1 -->
            <div class="animate-marquee whitespace-nowrap">
              <div class="flex gap-x-6 w-max">
                <template v-for="i in 2">
                  <CardSlide
                    v-for="(partner, index) in PartnersRow1"
                    :key="`row1-${i}-${index}`"
                    :image="partner.image"
                  />
                </template>
              </div>
            </div>

            <!-- Row 2 -->
            <div class="animate-marquee whitespace-nowrap">
              <div class="flex gap-x-6 w-max">
                <template v-for="i in 2">
                  <CardSlide
                    v-for="(partner, index) in PartnersRow2"
                    :key="`row2-${i}-${index}`"
                    :image="partner.image"
                  />
                </template>
              </div>
            </div>
          </div>
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
  background-position: top;
}

.marquee-row {
  overflow: hidden;
  width: 100%;
}

.marquee-track {
  display: flex;
  width: fit-content;
  white-space: nowrap;
}

.animation-row-1 {
  animation: marquee-left 20s linear infinite;
}

@keyframes marquee-left {
  0% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(-50%);
  }
}
</style>
