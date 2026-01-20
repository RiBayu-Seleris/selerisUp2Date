<script setup>
import Input from "@/components/reusable/Input.vue";
import CountrySelect from "@/components/reusable/CountrySelect.vue";
import ProductSelect from "@/components/reusable/ProductSelect.vue";
import RobotImage from "@/assets/images/robot-ai5-full.png";
import { productBannerLists } from "@/Data/ListProduct";
import { faqList } from "@/Data/faqList.js";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { ref, onMounted, onBeforeUnmount } from "vue";

// --- Form data ---
const FullName = ref("");
const CompanyName = ref("");
const Email = ref("");
const PhoneNumber = ref("");
const Products = ref("");
const Message = ref("");
const Country = ref({
  name: "Indonesia",
  code: "ID",
  flag: "https://flagcdn.com/w40/id.png",
});

// --- UI control ---
const activeIndex = ref(0);
const currentIndex = ref(0);
const show = ref(true);

// --- Dropdown control ---
const activeDropdown = ref(null);

function handleDropdownOpen(type) {
  activeDropdown.value = activeDropdown.value === type ? null : type;
}

function handleClickOutside(e) {
  if (
    !e.target.closest(".country-selector-wrapper") &&
    !e.target.closest(".product-selector-wrapper")
  ) {
    activeDropdown.value = null;
  }
}

let interval;

onMounted(() => {
  // Tambahkan event listener dengan passive
  document.addEventListener("click", handleClickOutside, { passive: true });

  // Animasi FAQ berganti otomatis
  interval = setInterval(() => {
    show.value = false;
    setTimeout(() => {
      currentIndex.value = (currentIndex.value + 1) % faqList.length;
      show.value = true;
    }, 500);
  }, 4000);
});

onBeforeUnmount(() => {
  clearInterval(interval);
  document.removeEventListener("click", handleClickOutside, { passive: true });
});

// --- Swiper ---
function onSlideChange(swiper) {
  activeIndex.value = swiper.realIndex;
}
</script>

<template>
  <div class="px-8 pt-40 lg:grid lg:grid-cols-2 w-full h-auto gap-x-5">
    <!-- KIRI -->
    <div
      class="w-full h-auto bg-[#D9D9D9] dark:bg-gradient-to-tr dark:from-[#17181A] dark:from-45% dark:to-[#565656]/60 p-[1px] rounded-xl"
    >
      <div
        class="justify-between w-full h-full flex flex-col bg-[#F9FAFB] dark:bg-[#1D1F23] dark:border-[#FAFAFA]/25 px-8 py-10 lg:px-6 lg:py-10 rounded-xl"
      >
        <div class="w-full h-auto">
          <p
            class="text-[24px] md:text-[36px] lg:text-[28px] xl:text-[36px] text-[#195279] font-[500] dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-br dark:from-[#FAFAFA] dark:via-[#D4D4D4] dark:to-[#AAAAAA]"
          >
            Let's Seleris Together
          </p>
        </div>

        <div class="w-full h-auto mt-8">
          <form @submit.prevent class="flex flex-col gap-5">
            <!-- Input dua kolom -->
            <div
              class="w-full h-auto flex flex-col md:grid md:grid-cols-2 gap-5"
            >
              <Input
                name="firstname"
                label="First Name"
                type="text"
                placeholder="Jhon"
              />
              <Input
                name="lastname"
                label="Last Name"
                type="text"
                placeholder="Doe"
              />
              <Input
                name="company"
                label="Company"
                type="text"
                placeholder="Your Company"
              />
              <Input
                name="jobtitle"
                label="Job Title"
                type="text"
                placeholder="Title"
              />
            </div>

            <!-- Email -->
            <div class="w-full h-auto">
              <Input
                name="email"
                label="Email"
                type="email"
                placeholder="example@gmail.com"
              />
            </div>

            <!-- COUNTRY SELECT -->
            <div
              id="country-selector"
              ref="countryRef"
              class="w-full h-auto flex flex-col space-y-1 relative"
            >
              <!-- v-model="selectedCountry" -->
              <CountrySelect
                :is-open="activeDropdown === 'country'"
                @open="handleDropdownOpen"
              />
            </div>

            <!-- PRODUCT SELECT -->
            <div
              id="product-selector"
              ref="productRef"
              class="w-full h-auto flex flex-col space-y-1 relative"
            >
              <!-- v-model="selectedProduct" -->
              <ProductSelect
                :is-open="activeDropdown === 'product'"
                @open="handleDropdownOpen"
              />
            </div>

            <!-- MESSAGE -->
            <div class="w-full h-auto space-y-1">
              <label for="Message">Message</label>
              <textarea
                id="messageBookDemo"
                aria-label="Message Book Demo"
                class="w-full lg:h-[70px] xl:h-[130px] p-2 rounded-[8px] border-gray-300 placeholder-[6F6F6F] dark:bg-[#323232] border-[0.1px] dark:border-[#FAFAFA]/25 focus:outline-none focus:ring-1 focus:ring-[#2AB857] resize-none align-top"
                placeholder="Message"
              />
            </div>

            <!-- PRIVACY POLICY -->
            <div class="w-full h-auto">
              <p
                class="text-[14px] md:text-[17px] text-[#6E6E6E] dark:text-[#FFFFFF]"
              >
                By submitting this form, your information will be processed in
                accordance with our
                <router-link to="/privacy" class="underline"
                  >Privacy Policy.</router-link
                >
              </p>
            </div>

            <!-- BUTTON -->
            <div class="w-full h-auto">
              <button
                aria-label="Send Book Demo"
                type="submit"
                class="w-full h-auto py-2 flex justify-center items-center bg-[#2AB857] rounded-[20px]"
              >
                <p class="text-white">Send</p>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- KANAN -->
    <div
      class="flex flex-col w-full h-full rounded-xl justify-between lg:justify-between xl:justify-between gap-y-5 md:gap-y-8 lg:gap-y-10 xl:gap-y-5 mt-5 md:mt-10 lg:mt-0"
    >
      <!-- Atas -->
      <!-- lg:h-[358px] xl:h-[485px] -->
      <div
        class="w-full h-auto lg:h-auto flex flex-col bg-frameBookDemo dark:bg-darkFrameBookDemo bg-no-repeat bg-cover lg:bg-cover border-b-[2px] border-[#EBEBEB] dark:border-none rounded-b-[20px] pb-6"
      >
        <div class="mt-8 sm:mt-12 md:mt-14 lg:mt-14 xl:mt-14 px-6 sm:px-8">
          <div class="w-full z-20">
            <p
              class="text-[16px] sm:text-[18px] md:text-[26px] lg:text-[22px] xl:text-[24px] text-[#1AB24F] font-[500]"
            >
              AI Innovation
            </p>
          </div>

          <div class="w-full mt-1 sm:mt-3 lg:mt-2 xl:mt-3 z-20">
            <p
              class="text-[#195279] text-[22px] sm:text-[28px] md:text-[30px] lg:text-[26px] xl:text-[38px] font-[500] leading-[26px] sm:leading-[34px] md:leading-[38px] lg:leading-[34px] xl:leading-[46px] tracking-[1px] dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-br dark:from-[#FAFAFA] dark:via-[#D4D4D4] dark:to-[#AAAAAA]"
            >
              The Future of Life <br />
              Technology
            </p>
          </div>

          <!-- Container gambar -->
          <div
            class="w-full h-auto flex justify-end mt-2 lg:mt-3 xl:mt-3 pr-10 sm:pr-16"
          >
            <img
              :src="RobotImage"
              alt="Robot"
              class="h-[85px] sm:h-[160px] md:h-[200px] lg:h-[150px] xl:h-[230px] max-w-[400px] object-contain object-top"
            />
          </div>
        </div>
      </div>

      <!-- Tengah -->
      <div
        class="flex flex-col sm:flex-row h-auto gap-x-0 sm:gap-x-7 gap-y-5 lg:gap-y-0"
      >
        <!-- dark:bg-gradient-to-r dark:from-[#17181A] dark:from-45% dark:to-[#565656]/95 p-[1px] rounded-xl -->
        <div
          class="w-full h-auto bg-[#D9D9D9] dark:bg-gradient-to-r dark:from-[#17181A] dark:from-45% dark:to-[#565656]/95 p-[1px] rounded-xl"
        >
          <div
            class="w-full h-full flex flex-col bg-[#F9FAFB] dark:bg-[#1D1F23] dark:border-[#FAFAFA]/25 px-6 py-4 rounded-xl gap-y-2.5 lg:gap-y-0 justify-between"
          >
            <div class="w-full h-auto">
              <span class="text-[18px] text-[#1AB24F]">About us</span>
            </div>
            <div class="w-full h-auto">
              <span
                class="text-[#195279] text-[18px] md:text-[22px] lg:text-[18px] xl:text-[24px] leading-tight font-[500] tracking-normal dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-br dark:from-[#FAFAFA] dark:via-[#D4D4D4] dark:to-[#AAAAAA]"
                >Seleris Meditekno <br />
                Internasional</span
              >
            </div>
            <div
              class="w-full h-auto leading-tight line-clamp-3 xl:line-clamp-4 text-[#89A6BA] dark:text-[#565656]"
            >
              <span
                class="text-[12px] md:text-[14px] lg:text-[12px] text-justify"
                >Seleris is a technology company that develops facial
                video-based applications to help businesses assess
                individuals...</span
              >
            </div>
            <router-link
              to="/about/company"
              class="w-auto h-auto cursor-pointer flex flex-row items-center justify-start"
            >
              <div>
                <p class="text-[14px] lg:text-[16px] font-[400] text-[#2AB857]">
                  Read More
                </p>
              </div>
              <div class="ml-1 text-[#2AB857] dark:text-[#2AB857]">
                <svg
                  class="w-4 h-4 sm:w-4 sm:h-4 lg:w-6 lg:h-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14.43 18.07L20.5 12L14.43 5.92999"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-miterlimit="10"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M3.50002 12L20.33 12"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-miterlimit="10"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
            </router-link>
          </div>
        </div>
        <div
          class="w-full h-auto bg-[#D9D9D9] dark:bg-gradient-to-r dark:from-[#17181A] dark:from-45% dark:to-[#565656]/95 p-[1px] rounded-xl"
        >
          <div
            class="w-full h-full flex flex-col bg-[#F9FAFB] dark:bg-[#1D1F23] dark:border-[#FAFAFA]/25 rounded-xl"
          >
            <div
              class="w-full h-auto flex flex-col px-0 py-4 gap-y-5 lg:gap-y-5"
            >
              <Swiper
                :modules="[Navigation, Autoplay]"
                :navigation="false"
                :pagination="false"
                :autoplay="{ delay: 3000, disableOnInteraction: false }"
                loop
                @slideChange="onSlideChange"
                class="w-auto"
              >
                <SwiperSlide
                  v-for="(data, index) in productBannerLists"
                  :key="index"
                  class="!w-full flex-shrink-0 px-4"
                >
                  <!-- src="/assets/images/product-hero-image/medins.png" -->
                  <img
                    :src="`/assets/images/product-hero-image/${data.banner}`"
                    alt="Banner"
                    class="w-full h-[150px] sm:h-[130px] md:h-[120px] lg:h-[100px] xl:h-[125px] object-contain object-bottom"
                  />
                </SwiperSlide>
              </Swiper>
              <div
                class="flex flex-col gap-y-1.5 lg:gap-y-2 xl:gap-y-1 px-6 lg:px-4 justify-between"
              >
                <div class="w-full h-auto">
                  <span class="text-[#6F6F6F] font-[400] text-[14px]"
                    >How Application Work</span
                  >
                </div>
                <div class="w-full h-full">
                  <transition name="fade" mode="out-in">
                    <span
                      :key="productBannerLists[activeIndex].product_name"
                      class="text-[18px] lg:text-[16px] xl:text-[22px] font-[600] text-[#323232] dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-br dark:from-[#FAFAFA] dark:via-[#D4D4D4] dark:to-[#AAAAAA]"
                    >
                      {{ productBannerLists[activeIndex].product_name }}
                    </span>
                  </transition>
                </div>
                <router-link
                  :to="productBannerLists[activeIndex].url"
                  class="w-full h-auto cursor-pointer flex flex-row items-center justify-start"
                  :class="productBannerLists[activeIndex].color"
                >
                  <div>
                    <p
                      :key="productBannerLists[activeIndex].id"
                      class="text-[14px] lg:text-[16px] font-[400]"
                      :class="productBannerLists[activeIndex].color"
                    >
                      View Product
                    </p>
                  </div>
                  <div class="ml-1">
                    <svg
                      class="w-5 h-5 sm:w-4 sm:h-4 lg:w-6 lg:h-6"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M14.43 18.07L20.5 12L14.43 5.92999"
                        stroke="currentColor"
                        stroke-width="1.5"
                        stroke-miterlimit="10"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M3.50002 12L20.33 12"
                        stroke="currentColor"
                        stroke-width="1.5"
                        stroke-miterlimit="10"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </div>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Bawah -->
      <div
        class="w-full h-auto bg-[#D9D9D9] dark:bg-gradient-to-r dark:from-[#17181A] dark:from-45% dark:to-[#565656]/95 p-[1px] rounded-xl"
      >
        <div
          class="w-full h-full flex flex-col bg-[#F9FAFB] dark:bg-[#1D1F23] dark:border-[#FAFAFA]/25 px-6 py-4 gap-y-2 rounded-xl"
        >
          <div class="w-full h-auto">
            <span class="text-[#B8B8B8] dark:text-[#2AB857]"
              >Frequently Asked Question</span
            >
          </div>
          <div
            class="w-full h-[50px] lg:h-[30px] xl:h-[35px] flex items-center"
          >
            <transition name="fade" mode="out-in">
              <span
                v-if="show"
                :key="currentIndex"
                class="text-[16px] lg:text-[16px] xl:text-[22px] font-[500] text-[#195279] text-justify dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-br dark:from-[#FAFAFA] dark:via-[#D4D4D4] dark:to-[#AAAAAA]"
              >
                {{ faqList[currentIndex].question }}
              </span>
            </transition>
          </div>
          <div
            class="w-full h-auto cursor-pointer flex flex-row items-center justify-end"
          >
            <router-link to="/book-a-demo">
              <p class="text-[14px] lg:text-[16px] font-[400] text-[#2AB857]">
                Read More
              </p>
            </router-link>
            <div class="ml-1 text-[#2AB857] dark:text-[#2AB857]">
              <svg
                class="w-3 h-3 lg:w-6 lg:h-6"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14.43 18.07L20.5 12L14.43 5.92999"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-miterlimit="10"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M3.50002 12L20.33 12"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-miterlimit="10"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* 🌞 LIGHT MODE */
input {
  border: 0.25px solid #d1d5db;
  background-color: #ffffff;
  color: #000;
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;
}

input:focus {
  border-color: #2ab857 !important;
  outline: none;
  box-shadow: 0 0 0 1px #2ab857 !important;
}

/* 🌙 DARK MODE */
.dark input {
  border: 0.25px solid rgba(250, 250, 250, 0.25);
  background-color: #323232;
  color: #fafafa;
}

.dark input:focus {
  border-color: #2ab857 !important;
  outline: none;
  box-shadow: 0 0 0 1px #2ab857 !important;
}
</style>
