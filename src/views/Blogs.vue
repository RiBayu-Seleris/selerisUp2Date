<script setup>
import HeroSection from "@/components/Blog/HeroSection.vue";
import BlogList from "@/components/Blog/BlogList.vue";
import ArrowDown from "@/components/icons/ArrowDown.vue";
import { ref } from "vue";

const isAccountDropdown = ref(false);
const toggleDropdown = () => {
  isAccountDropdown.value = !isAccountDropdown.value;
};

const loginStatus = ref(false);
</script>

<template>
  <!-- bg-[radial-gradient(ellipse_at_top,_#3CFF7A_-70%,_#FAFAFA_60%)] dark:bg-[radial-gradient(ellipse_at_top,_#3CFF7A_-70%,_#17181A_40%)] -->
  <section class="flex relative w-full h-auto md:px-12 xl:px-14">
    <HeroSection />
  </section>

  <!-- Account Section -->
  <section
    v-if="loginStatus === true"
    class="flex flex-row relative w-full h-[70px] max-w-md mx-auto mt-10 lg:mt-10"
  >
    <!-- <div class="relative w-[30%] h-auto flex justify-center items-center">
      <img
        src="/assets/images/profile/example.png"
        alt=""
        class="w-[70px] h-[70px] rounded-full bg-contain object-center"
      />
    </div> -->
    <div class="relative w-full h-auto flex flex-row bg-green-500">
      <div
        class="w-[70%] h-auto flex flex-col justify-between px-3 bg-orange-400"
      >
        <div class="w-full">
          <p class="text-[21px] text-[#195279] font-[400]">
            Riski Yusuf Maulana
          </p>
        </div>
        <div class="w-full">
          <p class="text-[19px] text-[#B8B8B8] font-[400]">Account</p>
        </div>
      </div>
      <div class="relative w-[30%] h-auto pt-0.5 bg-purple-600">
        <button
          aria-label="Toggle Logout Button"
          @click="toggleDropdown"
          class="w-7 h-7 p-1"
        >
          <ArrowDown />
        </button>
        <div
          ref="isAccountDropdown"
          v-if="isAccountDropdown"
          class="absolute w-full h-[50px] border-[1px] top-10 right-0 transition-all duration-500"
        >
          <div class="w-full h-full flex justify-center items-center">
            <p class="text-[14px]">Logout</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section
    class="flex flex-col relative w-full h-auto xl:px-16 mt-10 lg:mt-8 mb-20"
  >
    <BlogList />
  </section>
</template>
