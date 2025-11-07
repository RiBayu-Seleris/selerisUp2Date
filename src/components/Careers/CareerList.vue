<script setup>
import BoardFill from "@/components/icons/BoardFill.vue";
import ProfileFill from "@/components/icons/ProfileFill.vue";
import MapPin from "@/components/icons/MapPin.vue";
import CloseIcon from "@/components/icons/CloseIcon.vue";
import Instagram from "@/components/icons/Instagram.vue";
import Tiktok from "@/components/icons/Tiktok.vue";
import LinkedIn from "@/components/icons/Linkedin.vue";

import { timeAgo } from "@/components/Helper/timeAgo.js";

import {
  jobPosts,
  employment_level_list,
  division_list,
  location_list,
  job_type_list,
} from "@/Data/Careers.js";
import { ref, watch } from "vue";

// === Helper functions ===

// Ambil nama division
function getDivisionName(id) {
  const division = division_list.find((d) => d.id === id);
  return division ? division.name : "-";
}

// Ambil Employment Level
function getEmploymentLevel(id) {
  const level = employment_level_list.find((d) => d.id === id);
  return level ? level.name : "-";
}

// Ambil nama job type
function getJobTypeName(id) {
  const type = job_type_list.find((t) => t.id === id);
  return type ? type.name : "-";
}

// Ambil nama location
function getLocationName(id) {
  const loc = location_list.find((l) => l.id === id);
  return loc ? loc.name : "-";
}

// Format tanggal (contoh sederhana)
function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

const isModalOpen = ref(false);

// Kunci atau buka scroll body tergantung modal
watch(isModalOpen, (value) => {
  if (value) {
    document.body.classList.add("overflow-hidden"); // disable scroll
  } else {
    document.body.classList.remove("overflow-hidden"); // enable scroll
  }
});

// contoh buka modal
const openModal = () => {
  isModalOpen.value = true;
};
const closeModal = () => {
  isModalOpen.value = false;
};
</script>

<template>
  <!-- Frame Filter -->
  <section
    class="flex flex-col relative w-full h-auto lg:max-w-2xl mx-auto px-8 md:px-8 lg:px-0"
  ></section>

  <!-- Frame Jobs -->
  <section
    class="relative z-0 w-full h-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 lg:mt-10 gap-6 px-8 md:px-8 xl:px-0"
  >
    <div
      v-for="job in jobPosts"
      :key="job.id"
      @click="openModal"
      class="w-full h-auto rounded-[10px] p-[1px] bg-[#D9D9D9] dark:bg-gradient-to-tr dark:from-[#17181A] dark:to-[#565656] transition-all duration-300 hover:scale-[1.03]"
    >
      <div
        class="flex flex-col w-full h-full p-5 rounded-[9px] bg-[#FAFAFA] dark:bg-[#1D1F23] cursor-pointer"
      >
        <div class="w-full h-full flex items-start">
          <p class="text-[22px] text-[#2AB857] font-[600]">
            {{ `${getEmploymentLevel(job.employment_level)} - ${job.title}` }}
          </p>
        </div>
        <div class="w-full h-auto mt-3">
          <p class="text-[12px] text-[#B8B8B8] font-[400]">
            {{ timeAgo(job.created_at) }}
          </p>
        </div>
        <div class="flex flex-wrap gap-x-3 gap-y-4 mt-6">
          <div
            class="flex flex-row items-center gap-x-2 bg-[#FAFAFA] dark:bg-[#2D2F33] text-[#195279] dark:text-[#FAFAFA] px-5 lg:px-5 py-1 rounded-full border-[1px] border-[#DADADA] dark:border-none"
          >
            <BoardFill />
            <p class="font-[400] text-[14px]">
              {{ getDivisionName(job.division_category) }}
              Department
            </p>
          </div>

          <div
            class="flex flex-row items-center gap-x-2 bg-[#FAFAFA] dark:bg-[#2D2F33] text-[#195279] dark:text-[#FAFAFA] px-5 lg:px-5 py-1 rounded-full border-[1px] border-[#DADADA] dark:border-none"
          >
            <ProfileFill />
            <p class="font-[400] text-[14px]">
              {{ getJobTypeName(job.job_type_category) }}
            </p>
          </div>
          <div
            class="flex flex-row items-center gap-x-2 bg-[#FAFAFA] dark:bg-[#2D2F33] text-[#195279] dark:text-[#FAFAFA] px-5 lg:px-5 py-1 rounded-full border-[1px] border-[#DADADA] dark:border-none"
          >
            <MapPin />
            <p class="font-[400] text-[14px]">
              {{ getLocationName(job.location_category) }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Modal -->
  <transition name="fade">
    <div
      v-if="isModalOpen"
      class="fixed inset-0 z-50 flex flex-col transition-all duration-300 overflow-auto bg-[#1C1B1B]/80"
    >
      <!-- Sidebar -->
      <transition name="slide">
        <div class="ml-auto w-full h-auto p-20 z-50">
          <div
            class="w-full h-full bg-white dark:bg-[#17181A] relative z-50 flex flex-col items-center rounded-3xl"
          >
            <!-- MODALS HEADER  -->
            <div
              class="relative w-full h-auto flex flex-col bg-[#2AB857] py-14 px-20 rounded-t-3xl"
            >
              <div
                @click="closeModal"
                class="w-auto h-auto absolute top-6 right-6 bg-[#94FBB5] rounded-full text-[#2AB857] cursor-pointer"
              >
                <CloseIcon class="w-auto h-[40px]" />
              </div>
              <div class="w-full h-auto text-[#FAFAFA]">
                <p class="text-[20px] font-[400]">Grow With</p>
              </div>
              <div class="w-full h-auto text-[#FAFAFA]">
                <p class="text-[48px] font-[600]">Seleris</p>
              </div>
            </div>
            <!-- MODALS BODY -->
            <div class="w-full h-auto py-8">
              <div class="w-full h-auto px-20">
                <p
                  class="text-[30px] font-[600] text-[#195279] dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-br dark:from-[#FAFAFA] dark:via-[#D4D4D4] dark:to-[#AAAAAA]"
                >
                  Technical Writer
                </p>
              </div>
              <div class="w-full h-auto mt-1 px-20">
                <p
                  class="text-[16px] font-[400] text-[#B8B8B8] dark:text-[#B8B8B8]"
                >
                  23 Hours Ago
                </p>
              </div>
              <div class="w-full h-auto flex flex-row my-8 space-x-5 px-20">
                <div
                  class="flex flex-row items-center gap-x-2 bg-[#FAFAFA] dark:bg-[#2D2F33] text-[#195279] dark:text-[#FAFAFA] px-5 lg:px-5 py-1 rounded-full border-[1px] border-[#DADADA] dark:border-none"
                >
                  <BoardFill />
                  <p class="font-[400] text-[14px]">Product Department</p>
                </div>

                <div
                  class="flex flex-row items-center gap-x-2 bg-[#FAFAFA] dark:bg-[#2D2F33] text-[#195279] dark:text-[#FAFAFA] px-5 lg:px-5 py-1 rounded-full border-[1px] border-[#DADADA] dark:border-none"
                >
                  <ProfileFill />
                  <p class="font-[400] text-[14px]">Experienced</p>
                </div>
                <div
                  class="flex flex-row items-center gap-x-2 bg-[#FAFAFA] dark:bg-[#2D2F33] text-[#195279] dark:text-[#FAFAFA] px-5 lg:px-5 py-1 rounded-full border-[1px] border-[#DADADA] dark:border-none"
                >
                  <MapPin />
                  <p class="font-[400] text-[14px]">Jakarta</p>
                </div>
              </div>
              <!-- Ini Deskripsi -->
              <div
                class="w-full h-auto mt-10 flex flex-col gap-y-5 text-[18px] font-[400] dark:text-[#B8B8B8] pr-48 pl-20"
              >
                <p>
                  We think you also hate when travel app is giving you a
                  headache, right? A slight misinformation can ruin the trip.
                </p>
                <p>
                  That is exactly what we are tackling as t-fam! Making sure
                  that our 50+ million users have the best experience in
                  crafting their own adventure.
                </p>
                <p>#LI-FL1</p>
              </div>
              <div class="w-full h-auto flex flex-row gap-x-2 my-10">
                <div
                  v-for="i in 40"
                  :key="i"
                  class="w-full h-[3px] bg-[#6F6F6F]"
                />
              </div>
              <div
                class="w-full h-auto mt-10 flex flex-col gap-y-5 text-[18px] font-[400] dark:text-[#B8B8B8] pr-48 pl-20"
              >
                <!-- Ini title dari data, misal Responsibilities -->
                <p class="text-[20px]">Your main duties in flying with us</p>
                <ul class="list-disc pl-5 space-y-3">
                  <li>
                    Conduct research on potential partner industries, companies,
                    and trends (e.g., loyalty platforms, fintechs, telcos, super
                    apps)
                  </li>
                  <li>
                    Analyze data to identify opportunities for partnership
                    growth and optimization
                  </li>
                  <li>
                    Help build and maintain internal documentation, including
                    partner trackers, campaign calendars, contact logs, and deal
                    summaries
                  </li>
                  <li>
                    Contribute to structuring templates and Standard Operating
                    Procedures (SOPs) for partner onboarding, campaign planning,
                    and reporting
                  </li>
                  <li>
                    Assistant API team with mapping and other task when required
                  </li>
                </ul>
              </div>
            </div>

            <!-- MODALS FOOTER -->
            <div
              class="relative bottom-0 flex flex-row justify-between gap-x-10 w-full h-auto py-5 px-20 bg-[#D6E8F4] dark:bg-gradient-to-r dark:from-[#424242] dark:from-[75%] dark:to-[#696969] rounded-b-3xl"
            >
              <div class="flex items-center w-full gap-x-4">
                <p class="font-medium text-[#195279] dark:text-[#FAFAFA]">
                  Explore
                </p>

                <div class="flex items-center gap-x-3">
                  <button
                    class="w-auto h-10 p-2 rounded-full text-[#195279] bg-[#92D1FC]"
                  >
                    <Instagram class="w-full h-full" />
                  </button>

                  <button
                    class="w-auto h-10 p-2 rounded-full text-[#195279] bg-[#92D1FC]"
                  >
                    <LinkedIn class="w-full h-full" />
                  </button>

                  <button
                    class="w-auto h-10 p-2 rounded-full text-[#195279] bg-[#92D1FC]"
                  >
                    <Tiktok class="w-full h-full" />
                  </button>
                </div>
              </div>

              <div
                class="flex flex-row items-center justify-end w-full h-auto gap-x-5"
              >
                <div
                  @click="closeModal"
                  class="w-auto h-auto p-[1px] bg-[#D9D9D9] dark:bg-gradient-to-r dark:from-[#565656] dark:from-0% dark:to-[#BCBCBC] shadow-lg rounded-full cursor-pointer"
                >
                  <div
                    class="w-auto h-auto bg-[#FFC9C9] dark:bg-[#E43939] text-[#FF0000] dark:text-[#FAFAFA] flex items-center justify-center px-14 py-2 rounded-full cursor-pointer"
                  >
                    Close
                  </div>
                </div>
                <div
                  class="w-auto h-auto p-[1px] bg-[#D9D9D9] dark:bg-gradient-to-r dark:from-[#565656] dark:from-0% dark:to-[#BCBCBC] shadow-lg rounded-full cursor-pointer"
                >
                  <div
                    class="w-full h-full flex items-center justify-center px-14 py-2 rounded-full bg-[#195279] dark:bg-gradient-to-br dark:from-[#195279] dark:from-[50%] dark:to-[#2E97DF] dark:to-[100%]"
                  >
                    <p
                      class="text-[#FAFAFA] font-500 dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-br dark:from-[#FAFAFA] dark:via-[#D4D4D4] dark:to-[#AAAAAA]"
                    >
                      Apply
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease-in-out;
}
.slide-enter-from {
  transform: translateX(100%);
}
.slide-enter-to {
  transform: translateX(0%);
}
.slide-leave-from {
  transform: translateX(0%);
}
.slide-leave-to {
  transform: translateX(100%);
}
</style>
