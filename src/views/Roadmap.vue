<script setup>
import HeroText from "@/components/reusable/HeroText.vue";

import { roadmapData } from "@/Data/RoadmapData";
import { ref } from "vue";

// cari tahun 2023
const initialYearIndex = roadmapData.findIndex((item) => item.year === 2025);
// ambil produk pertama
const initialProduct = roadmapData[initialYearIndex].data[0];

// set default
const selectedProduct = ref(initialProduct);

// state produk aktif (default null atau index pertama)
const activeProduct = ref({
  yearIndex: initialYearIndex,
  productIndex: 0,
});

// fungsi untuk set aktif
function setActive(yearIndex, productIndex) {
  activeProduct.value = { yearIndex, productIndex };
  selectedProduct.value = roadmapData[yearIndex].data[productIndex];
}

function selectProduct(product) {
  selectedProduct.value = product;
}
</script>
<template>
  <section
    class="flex w-full h-auto sml:pt-[120px] md:pt-[150px] lg:pt-[160px] xl:pt-[160px] mb-10"
  >
    <HeroText
      title="Innovation"
      subtitle="Roadmap Seleris Meditekno Internasional"
    />
  </section>
  <section class="relative w-full h-auto mb-20">
    <video
      autoplay
      loop
      muted
      playsinline
      @contextmenu.prevent
      class="w-full object-cover object-center dark:hidden"
    >
      <source src="@/assets/videos/Wave.mp4" type="video/mp4" />
    </video>
    <video
      autoplay
      loop
      muted
      playsinline
      @contextmenu.prevent
      class="w-full object-cover object-center hidden dark:block"
    >
      <source src="@/assets/videos/WaveDark.mp4" type="video/mp4" />
    </video>
  </section>
  <section class="relative w-full h-auto top-0">
    <div class="relative w-full h-auto justify-center">
      <!-- Frame Content Scroll -->
      <div
        class="flex flex-row w-full h-[550px] md:h-[550px] lg:h-[700px] z-20 overflow-x-auto snap-x snap-mandatory scroll-pl-28 pl-28 pr-14 hide-scrollbar"
      >
        <div
          v-for="(yearItem, yearIndex) in roadmapData"
          :key="yearIndex"
          class="relative flex flex-row w-auto h-full snap-start flex-shrink-0 z-10 space-x-0 sm:space-x-6"
        >
          <div class="relative w-[20%] h-auto">
            <div class="relative w-full h-full flex flex-col">
              <div class="w-full h-full">
                <figure
                  class="w-full max-w-max h-auto flex left-1/2 -translate-x-1/2 absolute top-1/2 -translate-y-1/2"
                >
                  <img
                    src="@/assets/images/Diamond.svg"
                    alt=""
                    class="w-full h-[120px] sm:h-[120px] md:h-[130px] lg:h-[130px] object-cover drop-shadow-[-5px_8px_5px_rgba(0,0,0,0.15)] md:drop-shadow-[-10px_10px_10px_rgba(0,0,0,0.25)] dark:drop-shadow-[0_0_30px_rgba(44,255,255,1)]"
                  />
                </figure>
              </div>
              <div
                class="w-auto h-auto relative bottom-[150px] sm:bottom-[150px] md:bottom-[150px] lg:bottom-[250px] xl:bottom-[220px] flex justify-center items-center"
              >
                <div
                  class="w-[100px] h-full py-2 rounded-md bg-gradient-to-r from-[#2C43B7] to-[#50B6EE] flex justify-center items-center"
                >
                  <span
                    class="text-[#FAFAFA] font-[400] text-[17px] text-center"
                    >{{ yearItem.year }}</span
                  >
                </div>
              </div>
            </div>
          </div>

          <!-- Loop produk (bisa lebih dari 1 per tahun) -->
          <!-- klik untuk aktif -->
          <div
            v-for="(product, productIndex) in yearItem.data"
            :key="productIndex"
            class="relative w-auto h-full"
          >
            <div class="relative w-full h-full">
              <!-- Titik Tengah Line -->
              <div
                @click="
                  setActive(yearIndex, productIndex);
                  selectProduct(product);
                "
                class="absolute w-8 h-8 p-1.5 rounded-full bg-gradient-to-r from-[#2C43B7] from-20% to-[#50B6EE] to-90% left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-20 cursor-pointer"
              >
                <div
                  class="w-full h-full rounded-full"
                  :class="{
                    'bg-white dark:shadow-[0_0_30px_rgba(255,255,255,1)] transition-all duration-500 ease-in':
                      activeProduct.yearIndex === yearIndex &&
                      activeProduct.productIndex === productIndex,
                    'dark:bg-transparent transition-all duration-500 ease-in':
                      !(
                        activeProduct.yearIndex === yearIndex &&
                        activeProduct.productIndex === productIndex
                      ),
                  }"
                />
              </div>
              <!-- Quarter jika ada -->
              <div
                v-if="product.quarters"
                class="absolute bottom-[210px] sm:bottom-[210px] md:bottom-[210px] xl:bottom-[280px] z-20 px-10 py-1 bg-gradient-to-r from-[#2C43B7] to-[#50B6EE] rounded-md left-1/2 -translate-x-1/2"
              >
                <span class="text-white text-[17px]">
                  Q{{ product.quarters }}
                </span>
              </div>
              <!-- Kartu Produk -->
              <!-- Ubah menjadi pt-0 dibawah ini untuk active -->
              <div
                class="relative w-full h-1/2 z-10 flex flex-col"
                :class="{
                  'pt-0 transition-all duration-500 ease-in':
                    activeProduct.yearIndex === yearIndex &&
                    activeProduct.productIndex === productIndex,
                  'pt-20 sm:pt-20 md:pt-20 xl:pt-28 transition-all duration-500 ease-in':
                    !(
                      activeProduct.yearIndex === yearIndex &&
                      activeProduct.productIndex === productIndex
                    ),
                }"
              >
                <!-- Tambahkan bg-gradient-to-r from-[#2C43B7] to-[#50B6EE] untuk active -->
                <div
                  class="flex justify-center relative left-1/2 -translate-x-1/2 w-[270px] md:w-[250px] xl:w-[350px] p-[3px] rounded-xl"
                  :class="{
                    'bg-gradient-to-r from-[#2C43B7] via-[#3ED2B2] to-[#50B6EE] dark:shadow-[0_0_30px_rgba(62,210,178,0.3)]':
                      activeProduct.yearIndex === yearIndex &&
                      activeProduct.productIndex === productIndex,
                    '': !(
                      activeProduct.yearIndex === yearIndex &&
                      activeProduct.productIndex === productIndex
                    ),
                  }"
                >
                  <!-- Tambahkan bg-white untuk active -->
                  <div
                    @click="
                      setActive(yearIndex, productIndex);
                      selectProduct(product);
                    "
                    class="w-full rounded-lg flex flex-col items-center p-5 cursor-pointer"
                    :class="{
                      'bg-white dark:bg-[#323232]':
                        activeProduct.yearIndex === yearIndex &&
                        activeProduct.productIndex === productIndex,
                      '': !(
                        activeProduct.yearIndex === yearIndex &&
                        activeProduct.productIndex === productIndex
                      ),
                    }"
                  >
                    <div
                      v-if="product.logo"
                      class="flex flex-col justify-center items-center h-[100px]"
                    >
                      <img
                        :src="product.logo"
                        alt="logo"
                        class="w-full h-[40px] object-contain mb-4"
                      />
                      <p class="text-[#195279] font-[500] text-[22px]">
                        {{ product.title }}
                      </p>
                      <p
                        class="text-[#195279] font-[400] text-[16px] text-center"
                      >
                        {{ product.subtitle }}
                      </p>
                    </div>
                    <!-- Card untuk tidak punya logo -->
                    <div
                      v-else
                      class="flex flex-col items-center"
                      :class="{
                        'justify-center transition-all duration-500 ease-in h-[60px] md:h-[60px] xl:h-[100px]':
                          activeProduct.yearIndex === yearIndex &&
                          activeProduct.productIndex === productIndex,
                        'justify-start transition-all duration-500 ease-in': !(
                          activeProduct.yearIndex === yearIndex &&
                          activeProduct.productIndex === productIndex
                        ),
                      }"
                    >
                      <p
                        class="text-center font-[500] text-[14px] sm:text-[14px] md:text-[16px] xl:text-[22px] text-[#195279] dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-br dark:from-[#FAFAFA] dark:via-[#D4D4D4] dark:to-[#AAAAAA]"
                      >
                        {{ product.title }}
                      </p>
                      <p
                        class="font-[400] text-[12px] sm:text-[12px] md:text-[12px] xl:text-[16px] text-center text-[#195279] dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-br dark:from-[#FAFAFA] dark:via-[#D4D4D4] dark:to-[#AAAAAA]"
                      >
                        {{ product.subtitle }}
                      </p>
                    </div>
                  </div>
                </div>
                <!-- Garis vertikal -->
                <div
                  class="relative w-1 h-[80%] bg-gradient-to-t from-[#1091F3]/0 from-[15%] rounded-b-full to-[#1091F3] left-1/2 -translate-x-1/2"
                  :class="{
                    'mt-2 transition-all duration-500 ease-in':
                      activeProduct.yearIndex === yearIndex &&
                      activeProduct.productIndex === productIndex,
                    'mt-0 transition-all duration-500 ease-in': !(
                      activeProduct.yearIndex === yearIndex &&
                      activeProduct.productIndex === productIndex
                    ),
                  }"
                >
                  <div
                    class="w-5 h-5 rounded-full bg-[#2B9DF4] absolute left-1/2 -translate-x-1/2"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Line Full -->
      <div
        class="absolute top-1/2 w-full h-[4px] bg-gradient-to-r from-[#2C43B7] from-1% via-[#3ED2B2] via-40% to-[#50B6EE] to-100% z-0 dark:shadow-[0_0_20px_rgba(80,182,238,1)] rounded-full"
      ></div>
    </div>
  </section>
  <!-- Card Description -->
  <section
    v-if="selectedProduct"
    class="w-full h-auto -mt-[70px] sm:-mt-[70px] md:-mt-[100px] lg:-mt-[130px] xl:-mt-[130px] relative z-20"
  >
    <div class="w-full h-auto flex flex-col">
      <div class="w-full h-auto px-8 sm:px-8 md:px-10 xl:px-32">
        <div
          class="w-full h-auto relative p-0.5 bg-gradient-to-r from-[#2C43B7] via-[#3ED2B2] to-[#50B6EE] rounded-[30px]"
        >
          <div
            class="w-full h-full flex flex-col bg-[#FFFFFF] dark:bg-[#323232] p-8 lg:p-10 rounded-[30px] space-y-2 xl:space-y-5"
          >
            <p
              class="text-[18px] sm:text-[20px] md:text-[24px] xl:text-[24px] text-center text-[#195279] font-[500] dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-br dark:from-[#FAFAFA] dark:via-[#D4D4D4] dark:to-[#AAAAAA]"
            >
              {{ selectedProduct.title }}
            </p>
            <p
              class="text-center text-[#195279] dark:text-[#6F6F6F] text-[12px] sm:text-[12px] md:text-[14px] lg:text-[20px] lg:px-8"
            >
              {{ selectedProduct.description }}
            </p>
          </div>
        </div>
      </div>
      <div class="relative w-full h-auto mt-4 md:mt-5">
        <div
          class="hidden xl:flex absolute w-32 h-full bg-gradient-to-r from-[#FAFAFA] from-0% to-[#FAFAFA]/0 to-60% dark:bg-gradient-to-r dark:from-[#17181A] dark:from-0% dark:to-[#17181A]/0 dark:to-60% left-0 z-20 rounded-r-2xl"
        />
        <div
          class="hidden xl:flex absolute w-32 h-full bg-gradient-to-l from-[#FAFAFA] from-0% to-[#FAFAFA]/0 to-60% dark:bg-gradient-to-l dark:from-[#17181A] dark:from-0% dark:to-[#17181A]/0 dark:to-60% right-0 z-20 rounded-l-2xl"
        />
        <div
          class="relative flex flex-row w-full max-h-screen gap-x-10 sml:gap-x-5 md:gap-x-10 py-5 overflow-x-auto snap-x snap-mandatory sml:scroll-pl-10 sml:pl-10 sml:pr-10 md:scroll-pl-10 md:pl-10 md:pr-10 xl:scroll-pl-32 xl:pl-32 xl:pr-32 hide-scrollbar"
        >
          <div
            v-for="(item, index) in selectedProduct.content"
            :key="index"
            class="w-full h-auto relative p-0.5 bg-gradient-to-r from-[#2C43B7] via-[#3ED2B2] to-[#50B6EE] rounded-[30px]"
          >
            <div
              class="w-[300px] sm:w-[300px] md:w-[500px] h-full flex flex-col bg-[#FFFFFF] dark:bg-[#323232] p-5 md:p-8 rounded-[30px]"
            >
              <p
                class="text-center h-[60px] bg-green-500 px-0 sm:px-8 md:px-16 pb-4 text-[#195279] font-[500] text-[12px] sm:text-[14px] md:text-[16px] dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-br dark:from-[#FAFAFA] dark:via-[#D4D4D4] dark:to-[#AAAAAA]"
              >
                {{ item.title }}
              </p>
              <p
                class="text-center bg-orange-300 justify-start items-start text-[#195279] text-[12px] sm:text-[12px] md:text-[14px] dark:text-[#6F6F6F]"
              >
                {{ item.description }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
