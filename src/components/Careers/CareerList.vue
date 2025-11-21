<script setup>
import BoardFill from "@/components/icons/BoardFill.vue";
import ProfileFill from "@/components/icons/ProfileFill.vue";
import MapPin from "@/components/icons/MapPin.vue";
import CloseIcon from "@/components/icons/CloseIcon.vue";
import Instagram from "@/components/icons/Instagram.vue";
import Tiktok from "@/components/icons/Tiktok.vue";
import LinkedIn from "@/components/icons/Linkedin.vue";

import { timeAgo } from "@/components/Helper/timeAgo.js";
import { formatNumberSeparator } from "@/components/Helper/numberFormat.js";
import { onMounted, ref, watch } from "vue";
import axios from "axios";

const jobs = ref([]);

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
const selectedJob = ref(null);

// contoh buka modal
const openModal = (job) => {
  selectedJob.value = job;
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
};

// Kunci atau buka scroll body tergantung modal
watch(isModalOpen, (value) => {
  if (value) {
    document.body.classList.add("overflow-hidden"); // disable scroll
  } else {
    document.body.classList.remove("overflow-hidden"); // enable scroll
  }
});

onMounted(async () => {
  const BASEURL = "https://alentest.my.id";

  try {
    const response = await axios.get(`${BASEURL}/api/job`, {
      headers: { Accept: "application/json" },
    });

    const raw = response.data.data;

    // Normalisasi data
    jobs.value = raw.map((job) => ({
      id: job.id,
      title: job.job_title?.title || "-", // ambil title sebenarnya
      slug: job.slug,
      created_at: job.posted_at, // samakan dengan UI-mu
      employment_level: job.employee_level_data?.employee_level || "-",
      work_type: job.job_type_data?.job_type || "-",
      location: job.location_data?.location || "-",
      department: job.department_data?.department || "-",

      salary_status: true,
      salary_currency: job.salary_currency,
      salary_min: job.salary_min,
      salary_max: job.salary_max,

      description: job.description,
      responsibilities: job.responsibilities,
      requirements: job.requirements,
      benefits: job.benefits,
    }));
  } catch (error) {
    console.log("data gagal diambil", error);
  }
});
</script>

<template>
  <!-- Frame Filter -->
  <section
    class="flex flex-col relative w-full h-auto lg:max-w-4xl mx-auto px-8 md:px-8 lg:px-0 pt-5"
  >
    <div
      class="w-full h-auto p-[1px] bg-[#D9D9D9] dark:bg-gradient-to-tr dark:from-[#17181A] dark:to-[#565656] rounded-[10px]"
    >
      <div
        class="flex flex-row w-full h-auto p-2 rounded-[10px] bg-[#FAFAFA] dark:bg-[#1D1F23] gap-x-5"
      >
        <div
          class="w-full h-auto flex flex-row justify-center items-center gap-x-2 bg-[#FAFAFA] dark:bg-[#2D2F33] text-[#0088FF] dark:text-[#FAFAFA] py-1 rounded-[10px] border-[1px] border-[#DADADA] dark:border-none"
        >
          <BoardFill />
          <p class="font-[400] text-[14px] text-[#195279]">Department</p>
        </div>
        <div
          class="w-full h-auto flex flex-row justify-center items-center gap-x-2 bg-[#FAFAFA] dark:bg-[#2D2F33] text-[#FF383C] dark:text-[#FAFAFA] py-1 rounded-[10px] border-[1px] border-[#DADADA] dark:border-none"
        >
          <MapPin />
          <p class="font-[400] text-[14px] text-[#195279]">Semua Lokasi</p>
        </div>
        <div
          class="w-full h-auto flex flex-row justify-center items-center gap-x-2 bg-[#FAFAFA] dark:bg-[#2D2F33] text-[#34C759] dark:text-[#FAFAFA] py-1 rounded-[10px] border-[1px] border-[#DADADA] dark:border-none"
        >
          <ProfileFill />
          <p class="font-[400] text-[14px] text-[#195279]">Semua Pelamar</p>
        </div>
        <div
          class="w-auto h-auto bg-orange-400 rounded-xl flex items-center px-8"
        >
          <p>Cari</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Frame Jobs -->
  <section
    class="relative z-0 w-full h-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 lg:mt-10 gap-6 px-8 md:px-8 xl:px-0"
  >
    <!-- v-for="job in jobPosts" -->
    <div
      v-for="job in jobs"
      :key="job.id"
      @click="openModal(job)"
      class="w-full h-auto rounded-[10px] p-[1px] bg-[#D9D9D9] dark:bg-gradient-to-tr dark:from-[#17181A] dark:to-[#565656] transition-all duration-300 hover:scale-[1.03]"
    >
      <div
        class="flex flex-col w-full h-full p-5 rounded-[9px] bg-[#FAFAFA] dark:bg-[#1D1F23] cursor-pointer"
      >
        <div class="w-full h-full flex items-start">
          <p class="text-[22px] text-[#2AB857] font-[600]">
            <!-- {{ `${getEmploymentLevel(job.employment_level)} - ${job.title}` }} -->
            {{ job.employment_level }} - {{ job.title }}
          </p>
        </div>
        <div class="w-full h-auto mt-3">
          <p class="text-[12px] text-[#B8B8B8] font-[400]">
            {{ timeAgo(job.posted_at) }}
          </p>
        </div>
        <div class="flex flex-wrap gap-x-3 gap-y-4 mt-6 pr-4">
          <div
            class="flex flex-row items-center gap-x-2 bg-[#FAFAFA] dark:bg-[#2D2F33] text-[#195279] dark:text-[#FAFAFA] px-5 lg:px-5 py-1 rounded-full border-[1px] border-[#DADADA] dark:border-none"
          >
            <BoardFill />
            <p class="font-[400] text-[14px]">
              <!-- {{ getDivisionName(job.division_category) }} -->
              {{ job.department }}
              Department
            </p>
          </div>

          <div
            class="flex flex-row items-center gap-x-2 bg-[#FAFAFA] dark:bg-[#2D2F33] text-[#195279] dark:text-[#FAFAFA] px-5 lg:px-5 py-1 rounded-full border-[1px] border-[#DADADA] dark:border-none"
          >
            <ProfileFill />
            <p class="font-[400] text-[14px]">
              <!-- {{ getJobTypeName(job.job_type_category) }} -->
              {{ job.work_type }}
            </p>
          </div>
          <div
            class="flex flex-row items-center gap-x-2 bg-[#FAFAFA] dark:bg-[#2D2F33] text-[#195279] dark:text-[#FAFAFA] px-5 lg:px-5 py-1 rounded-full border-[1px] border-[#DADADA] dark:border-none"
          >
            <MapPin />
            <p class="font-[400] text-[14px]">
              <!-- {{ getLocationName(job.location_category) }} -->
              {{ job.location }}
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
                  {{ selectedJob?.employment_level }} -
                  {{ selectedJob?.title }}
                  <span
                    v-if="selectedJob?.salary_status"
                    class="text-[12px] text-[#195279] dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-br dark:from-[#FAFAFA] dark:via-[#D4D4D4] dark:to-[#AAAAAA]"
                  >
                    (
                    {{ selectedJob?.salary_currency }}
                    {{ formatNumberSeparator(selectedJob?.salary_min) }} -
                    {{ formatNumberSeparator(selectedJob?.salary_max) }}
                    )
                  </span>
                </p>
              </div>
              <div class="w-full h-auto mt-1 px-20">
                <p
                  class="text-[16px] font-[400] text-[#B8B8B8] dark:text-[#B8B8B8]"
                >
                  {{ timeAgo(selectedJob?.created_at) }}
                </p>
              </div>
              <div class="w-full h-auto flex flex-row my-8 space-x-5 px-20">
                <div
                  class="flex flex-row items-center gap-x-2 bg-[#FAFAFA] dark:bg-[#2D2F33] text-[#195279] dark:text-[#FAFAFA] px-5 lg:px-5 py-1 rounded-full border-[1px] border-[#DADADA] dark:border-none"
                >
                  <BoardFill />
                  <p class="font-[400] text-[14px]">
                    {{ selectedJob?.division_category }}
                    Department
                  </p>
                </div>

                <div
                  class="flex flex-row items-center gap-x-2 bg-[#FAFAFA] dark:bg-[#2D2F33] text-[#195279] dark:text-[#FAFAFA] px-5 lg:px-5 py-1 rounded-full border-[1px] border-[#DADADA] dark:border-none"
                >
                  <ProfileFill />
                  <p class="font-[400] text-[14px]">
                    {{ selectedJob?.work_type }}
                  </p>
                </div>
                <div
                  class="flex flex-row items-center gap-x-2 bg-[#FAFAFA] dark:bg-[#2D2F33] text-[#195279] dark:text-[#FAFAFA] px-5 lg:px-5 py-1 rounded-full border-[1px] border-[#DADADA] dark:border-none"
                >
                  <MapPin />
                  <p class="font-[400] text-[14px]">
                    {{ selectedJob?.location }}
                  </p>
                </div>
              </div>
              <!-- Ini Deskripsi -->
              <div
                v-if="selectedJob?.description"
                class="w-full h-auto mt-10 flex flex-col gap-y-5 text-[18px] font-[400] text-[#323232] dark:text-[#B8B8B8] pr-20 pl-20"
              >
                <p>{{ selectedJob.description }}</p>
              </div>

              <!--  === GARIS === -->
              <div class="w-full h-auto flex flex-row gap-x-2 my-10">
                <div
                  v-for="i in 40"
                  :key="i"
                  class="w-full h-[1px] bg-[#E1E1E1]"
                />
              </div>

              <!-- === Responsibilities === -->
              <div
                v-if="selectedJob?.responsibilities"
                class="w-full h-auto mt-10 flex flex-col gap-y-2 text-[18px] font-[400] text-[#323232] dark:text-[#B8B8B8] pr-20 pl-20"
              >
                <p
                  class="text-[20px] font-semibold text-[#195279] dark:text-[#FAFAFA]"
                >
                  Tanggung Jawab Utama
                </p>
                <p>{{ selectedJob.responsibilities }}</p>
              </div>

              <!-- === Requirements === -->
              <div
                v-if="selectedJob?.requirements"
                class="w-full h-auto mt-10 flex flex-col gap-y-2 text-[18px] font-[400] text-[#323232] dark:text-[#B8B8B8] pr-20 pl-20"
              >
                <p
                  class="text-[20px] font-semibold text-[#195279] dark:text-[#FAFAFA]"
                >
                  Kualifikasi
                </p>
                <p>{{ selectedJob.requirements }}</p>
              </div>

              <!-- === Benefits === -->
              <div
                v-if="selectedJob?.benefits"
                class="w-full h-auto mt-10 flex flex-col gap-y-2 text-[18px] font-[400] text-[#323232] dark:text-[#B8B8B8] pr-20 pl-20"
              >
                <p
                  class="text-[20px] font-semibold text-[#195279] dark:text-[#FAFAFA]"
                >
                  Benefit
                </p>
                <p>{{ selectedJob.benefits }}</p>
              </div>

              <div
                v-if="selectedJob?.requirements"
                class="w-full h-auto mt-10 flex flex-col gap-y-2 text-[18px] font-[400] text-[#323232] dark:text-[#B8B8B8] pr-20 pl-20"
              >
                <p
                  class="text-[20px] font-semibold text-[#195279] dark:text-[#FAFAFA]"
                >
                  Requirements:
                </p>
                <ul class="list-disc pl-5 space-y-2">
                  <li
                    v-for="(item, index) in selectedJob.requirements.split(',')"
                    :key="index"
                  >
                    {{ item.trim() }}
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
