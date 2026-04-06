<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import { SolutionLists } from "@/Data/SolutionLists";
import Circle from "@/assets/icons/Solutions/circle.vue";
import Circle2 from "@/assets/icons/Solutions/circle2.vue";
import Circle3 from "@/assets/icons/Solutions/circle3.vue";
import ChecklistIcon from "@/components/icons/Checklist.vue";

const route = useRoute();
const data = computed(() =>
  SolutionLists.find((s) => s.slug === route.params.slug),
);
</script>

<template>
  <div
    v-if="data"
    class="dark:bg-[#17181A] w-full h-auto flex flex-col gap-y-10"
  >
    <!-- Hero -->
    <section
      class="flex w-full h-auto pt-[120px] md:pt-[100px] xl:pt-[160px] dark:bg-[#17181A]"
    >
      <div
        class="flex flex-col w-full h-auto gap-y-2 lg:gap-y-4 justify-center items-center"
      >
        <div class="w-full h-auto">
          <p
            class="text-[24px] md:text-[34px] lg:text-[30px] xl:text-[30px] font-[500] text-[#1AB24F] text-center"
          >
            Solution
          </p>
        </div>
        <div class="w-full h-auto">
          <p
            class="text-[20px] sm:text-[24px] md:text-[28px] lg:text-[42px] xl:text-[46px] font-[500] text-[#195279] text-center leading-relaxed dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-br dark:from-[#FAFAFA] dark:via-[#D4D4D4] dark:to-[#AAAAAA]"
          >
            {{ data.hero.title }}
          </p>
        </div>
        <div class="w-full h-auto">
          <p
            class="text-[14px] md:text-[18px] lg:text-[24px] xl:text-[16px] font-[400] text-[#195279] px-8 md:px-0 xl:px-48 text-center leading-normal dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-br dark:from-[#FAFAFA] dark:via-[#D4D4D4] dark:to-[#AAAAAA]"
          >
            "{{ data.hero.subtitle }}"
          </p>
        </div>
      </div>
    </section>

    <!-- Overview -->
    <div class="w-full h-auto flex flex-col gap-y-10">
      <section class="flex flex-col lg:flex-row gap-y-5 gap-x-6 px-8 xl:px-28">
        <div
          class="w-full h-auto p-[1px] rounded-2xl bg-[#E3E3E3] dark:bg-gradient-to-r dark:from-[#17181A] dark:to-[#000000]/60"
        >
          <div
            class="w-full h-full bg-white dark:bg-[#1D1F23] rounded-2xl px-6 pt-5 pb-10 lg:pb-0"
          >
            <p
              class="text-[#1AB24F] font-[500] text-[14px] sm:text-[18px] mb-2 sm:mb-4"
            >
              Overview
            </p>
            <p
              class="text-[#374151] dark:text-[#E8ECF3] text-[12px] sm:text-[16px] md:text-[14px] lg:text-[16px] leading-loose"
            >
              {{ data.overview.description }}
            </p>
          </div>
        </div>
        <div
          class="relative w-full lg:w-[30%] shrink-0 h-auto bg-[#2A6993] dark:bg-gradient-to-br dark:from-[#2C7AAF] dark:from-[40%] dark:via-[#164A6B] dark:via-[130%] dark:to-[#0D202D] dark:to-[20%] rounded-2xl px-8 py-8 lg:py-10 justify-center flex flex-col gap-y-4 sm:gap-y-8 overflow-hidden shadow-[-9px_11px_200px_0_rgba(42,105,147,0.2)] dark:shadow-[-9px_11px_200px_0_rgba(42,105,147,0.2)]"
        >
          <div
            class="absolute z-10 w-full h-full -right-[45%] top-[40%] text-[#4882A9]"
          >
            <Circle class="w-full h-full" />
          </div>
          <div
            v-for="(stat, i) in data.overview.stats"
            :key="i"
            class="relative z-20 w-full h-auto flex flex-col gap-y-2"
          >
            <p
              class="text-white text-[20px] sm:text-[30px] font-[500] leading-tight tracking-wide"
            >
              {{ stat.value }}
            </p>
            <p class="text-[#87C6F2] text-[14px]">{{ stat.label }}</p>
          </div>
        </div>
      </section>
      <!-- Key Features -->
      <section class="flex flex-col lg:flex-row gap-6 px-8 xl:px-28">
        <div
          class="flex relative w-full sm:h-[420px] md:h-[460px] lg:h-[440px] bg-[#8EE7AB] justify-center items-center overflow-hidden rounded-2xl"
        >
          <div
            class="absolute z-10 w-full h-full -left-[0%] -bottom-[40%] lg:top-[45%] text-[#C4FFD7]"
          >
            <img
              src="@/assets/icons/Solutions/circle-2.svg"
              alt=""
              srcset=""
              class="w-full h-full object-cover object-top"
            />
          </div>
          <div
            class="relative lg:absolute z-20 w-auto lg:w-full h-auto flex -bottom-[30px] sm:-bottom-[38px] md:-bottom-[35px] lg:-bottom-[9%] justify-center"
          >
            <img
              src="@/assets/images/girl-pict.svg"
              class="w-[70%] sm:w-[90%] md:w-full xl:w-[75%] h-full object-contain object-bottom"
            />
          </div>
        </div>

        <div
          class="w-full lg:w-[63%] h-auto shrink-0 p-[1px] bg-[#E3E3E3] dark:bg-gradient-to-r dark:from-[#17181A] dark:to-[#000000]/60 rounded-2xl"
        >
          <div
            class="w-full h-full flex flex-col gap-y-4 md:gap-y-6 xl:gap-y-8 px-8 sm:px-10 md:px-8 lg:px-10 py-8 lg:py-0 justify-center rounded-2xl bg-[#FAFAFA] dark:bg-[#1D1F23] dark:text-[#E8ECF3]"
          >
            <p
              class="text-[#2AB857] font-[500] text-[16px] md:text-[20px] xl:text-[20px]"
            >
              Key Features
            </p>
            <div
              class="grid grid-cols-1 md:grid-cols-2 gap-x-2 md:gap-x-4 xl:gap-x-5 gap-y-4 sm:gap-y-6 md:gap-y-8 lg:gap-y-10 xl:gap-y-14"
            >
              <div
                v-for="(feature, i) in data.keyFeatures.items"
                :key="i"
                class="w-full h-auto flex flex-col gap-y-1 md:gap-y-1.5 lg:gap-y-2"
              >
                <p
                  class="h-auto text-[#195279] dark:text-white font-[500] text-[14px] sm:text-[16px] md:text-[16px] xl:text-[18px]"
                >
                  {{ feature.title }}
                </p>
                <p class="text-[#9CA3AF] text-[12px] lg:text-[14px] h-auto">
                  {{ feature.description }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <!-- More Features -->
      <section class="flex flex-col w-full h-auto gap-y-3 px-8 xl:px-28">
        <p class="text-[#1AB24F] font-[500] text-[18px]">More Features</p>
        <div
          class="grid gap-4"
          :class="
            data.moreFeatures.length > 3
              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
              : data.moreFeatures.length === 3
                ? 'grid-cols-3'
                : data.moreFeatures.length === 2
                  ? 'grid-cols-1 sm:grid-cols-2'
                  : 'grid-cols-1'
          "
        >
          <div
            v-for="(feature, i) in data.moreFeatures"
            :key="i"
            class="w-full h-auto p-[1px] bg-[#E3E3E3] dark:bg-gradient-to-r dark:from-[#17181A] dark:to-[#000000]/60 rounded-2xl"
          >
            <div
              class="w-full h-full flex flex-col gap-y-3 xl:gap-y-2 bg-white dark:bg-[#2C2C2C] rounded-2xl p-4 xl:p-6 shadow"
            >
              <p
                class="text-[#2A6993] dark:text-white font-[500] text-[16px] xl:text-[18px]"
              >
                {{ feature.title }}
              </p>
              <p class="text-[#5C6778] text-[12px] md:text-[14px] font-[400]">
                {{ feature.description }}
              </p>
            </div>
          </div>
        </div>
      </section>
      <!-- Business Benefits -->
      <section class="w-full h-auto px-8 xl:px-28">
        <div
          class="w-full h-auto p-[1px] bg-[#E3E3E3] dark:bg-gradient-to-r dark:from-[#17181A] dark:to-[#000000]/60 rounded-2xl"
        >
          <div
            class="flex flex-col w-auto gap-y-8 sm:gap-y-6 bg-[#FAFAFA] dark:bg-[#1D1F23] justify-center items-center px-6 sm:px-14 lg:px-8 py-6 rounded-2xl"
          >
            <div class="w-full h-auto flex flex-col gap-y-1">
              <p class="text-[#1AB24F] font-[500] text-[20px] text-center">
                {{ data.businessBenefits.title }}
              </p>
              <p class="text-[#9CA3AF] text-[13px] text-center">
                {{ data.businessBenefits.subtitle }}
              </p>
            </div>
            <div
              class="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-8 md:gap-x-5 md:gap-y-6"
            >
              <div
                v-for="(item, i) in data.businessBenefits.items"
                :key="i"
                class="flex flex-col items-center gap-y-2 sm:gap-y-4 text-center"
              >
                <div
                  class="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#ADF9C5] dark:bg-[#2AB857] flex items-center justify-center p-1.5 sm:p-2"
                >
                  <div
                    class="w-full h-full bg-gradient-to-b from-[#2AB857] to-[#7DD89A] rounded-full flex items-center justify-center text-white shadow-[0_12px_11.8px_0_rgba(0,0,0,0.1)]"
                  >
                    <ChecklistIcon />
                  </div>
                </div>
                <p
                  class="text-[#195279] dark:text-[#D4D4D4] text-[12px] sm:text-[14px]"
                >
                  {{ item.label }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <!-- CTA Banner -->
      <section
        class="w-full h-auto flex flex-col justify-center items-center px-8 xl:px-28"
      >
        <div
          class="w-full h-auto bg-[#1AB24F] rounded-2xl px-5 py-10 sm:px-0 sm:py-10 flex flex-col items-center gap-6 md:gap-4"
        >
          <div class="w-full h-auto flex flex-col gap-y-2">
            <p
              class="text-white font-[600] text-[16px] sm:text-[18px] md:text-[20px] text-center"
            >
              Smarter Risk. Faster Decision. Sustainable Protection
            </p>
            <p class="text-white text-[12px] md:text-[14px] text-center">
              Smarter Risk. Faster Decision. Sustainable Protection
            </p>
          </div>
          <a
            href="/book-a-demo"
            class="bg-white text-[#1AB24F] text-[14px] md:text-[16px] font-[500] px-8 sm:px-6 py-2 rounded-full hover:opacity-90 transition"
          >
            Book a Demo!
          </a>
        </div>
      </section>
    </div>
  </div>

  <div v-else class="flex justify-center items-center h-screen">
    <p class="text-[#9CA3AF]">Solution tidak ditemukan.</p>
  </div>
</template>
