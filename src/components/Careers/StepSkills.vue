<script setup>
// import { ref, onMounted, onBeforeUnmount } from "vue";
import { useUtilsStore } from "@/stores/utils.js";

const utils = useUtilsStore();

const props = defineProps({
  technicalSkills: String,
  softSkills: String,
  languageSkills: String,
});

const emit = defineEmits([
  "update:technicalSkills",
  "update:softSkills",
  "update:languageSkills",
]);
</script>

<template>
  <h2 class="text-xl font-semibold text-[#195279] mb-4">
    Skills & Competencies
  </h2>

  <!-- Skills -->
  <!-- <div class="flex flex-row w-full h-auto gap-10"> -->
  <div class="w-full h-auto flex flex-col gap-y-3 lg:gap-y-0">
    <div class="flex flex-col w-full">
      <label
        class="text-[14px] font-[500] text-[#4B5563] dark:text-[#6F6F6F] mb-1"
      >
        Technical Skills <span class="text-red-500">*</span>
      </label>
      <input
        type="text"
        name="technicalSkills"
        @input="emit('update:technicalSkills', $event.target.value)"
        :value="technicalSkills"
        class="w-full p-2 rounded-lg border border-gray-300 dark:border-[#FAFAFA]/25 bg-white dark:bg-[#323232] text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#2AB857] focus:border-transparent"
        placeholder="Microsoft Word, Microsoft Excel, Etc."
      />
    </div>
    <div class="flex flex-col w-full">
      <label
        class="text-[14px] font-[500] text-[#4B5563] dark:text-[#6F6F6F] mb-1"
      >
        Soft Skills<span class="text-red-500">*</span>
      </label>
      <input
        type="text"
        name="softSkills"
        @input="emit('update:softSkills', $event.target.value)"
        :value="softSkills"
        class="w-full p-2 rounded-lg border border-gray-300 dark:border-[#FAFAFA]/25 bg-white dark:bg-[#323232] text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#2AB857] focus:border-transparent"
        placeholder="Comunication, Team Work, Etc."
      />
    </div>
    <div class="flex flex-col w-full">
      <label
        class="text-[14px] font-[500] text-[#4B5563] dark:text-[#6F6F6F] mb-1"
      >
        Language<span class="text-red-500">*</span>
      </label>
      <input
        type="text"
        name="languageSkills"
        @input="emit('update:languageSkills', $event.target.value)"
        :value="languageSkills"
        class="w-full p-2 rounded-lg border border-gray-300 dark:border-[#FAFAFA]/25 bg-white dark:bg-[#323232] text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#2AB857] focus:border-transparent"
        placeholder="English, Bahasa Indonesia, Japan, Etc."
      />
    </div>
  </div>
  <!-- </div> -->
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

select:focus {
  outline: none !important;
  box-shadow: none !important;
  border-color: #d1d5db !important; /* sesuai styling normal */
}
</style>
