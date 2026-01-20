<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { useUtilsStore } from "@/stores/utils.js";

const utils = useUtilsStore();

const props = defineProps({
  technicalSkills: String,
  softSkills: String,
});

const emit = defineEmits(["update:technicalSkills", "update:softSkills"]);

/* ===========================
   LANGUAGE LIST
=========================== */
const languages = ["Indonesia", "Inggris", "Jepang"];

/* ===========================
   DATA STATE
=========================== */
const languageSkills = ref([
  { language: "", level: 1, levelLabel: "Beginner", open: false },
]);

/* ===========================
   METHODS
=========================== */
function addLanguageSkill() {
  languageSkills.value.push({
    language: "",
    level: 1,
    levelLabel: "Beginner",
    open: true,
  });
}

function removeLanguageSkill(index) {
  languageSkills.value.splice(index, 1);
}

function setLevel(item, level) {
  item.level = level;

  const labels = ["Beginner", "Basic", "Intermediate", "Advanced", "Fluent"];
  item.levelLabel = labels[level - 1];
}

/* ===========================
   TOGGLE
=========================== */
function toggleItem(item) {
  item.open = !item.open;
}

/* ===========================
   OUTSIDE CLICK HANDLER
=========================== */
function handleClickOutside(e) {
  const panels = document.querySelectorAll(".lang-panel");

  panels.forEach((panel, index) => {
    if (!panel.contains(e.target)) {
      languageSkills.value[index].open = false;
    }
  });
}

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>

<template>
  <h2 class="text-xl font-semibold text-[#195279] mb-4">
    Skills & Competencies
  </h2>

  <!-- Skills -->
  <!-- <div class="flex flex-row w-full h-auto gap-10"> -->
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
      name="softSkills"
      @input="emit('update:softSkills', $event.target.value)"
      :value="softSkills"
      class="w-full p-2 rounded-lg border border-gray-300 dark:border-[#FAFAFA]/25 bg-white dark:bg-[#323232] text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#2AB857] focus:border-transparent"
      placeholder="English, Bahasa Indonesia, Japan, Etc."
    />
  </div>
  <!-- </div> -->

  <!-- Language Skills -->
  <div class="flex flex-col w-full mt-5">
    <label
      class="text-[14px] font-[500] text-[#4B5563] dark:text-[#6F6F6F] mb-1"
    >
      Language Skills <span class="text-red-500">*</span>
    </label>

    <!-- Add Skill Button -->
    <button
      aria-label="Add Language Skill"
      @click="addLanguageSkill"
      class="w-full border border-dashed border-green-400 bg-green-50 hover:bg-green-100 text-green-600 py-2 rounded-md flex justify-center items-center gap-2 mb-3"
    >
      <span class="text-[16px]">+</span> Tambahkan Skill
    </button>

    <!-- LIST ITEM BAHASA -->
    <div
      v-for="(item, index) in languageSkills"
      :key="index"
      class="border rounded-lg mb-3 overflow-hidden"
    >
      <!-- HEADER -->
      <div
        class="flex justify-between p-4 cursor-pointer"
        @click="item.open = !item.open"
      >
        <div>
          <p class="font-semibold text-[14px]">
            {{ item.language || "Pilih Bahasa" }}
          </p>
          <p class="text-gray-500 text-[12px]">
            {{ item.levelLabel || "Beginner" }}
          </p>
        </div>

        <svg
          :class="[
            'transition-transform',
            item.open ? 'rotate-180' : 'rotate-0',
          ]"
          width="20"
          height="20"
          viewBox="0 0 24 24"
        >
          <path fill="currentColor" d="M7 10l5 5l5-5H7z" />
        </svg>
      </div>

      <!-- BODY -->
      <transition name="fade">
        <div v-if="item.open" class="p-4 bg-white border-t">
          <!-- Select Language -->
          <label class="text-sm text-gray-500">Bahasa</label>
          <select
            v-model="item.language"
            class="w-full border mt-1 p-2 rounded-md text-sm"
          >
            <option v-for="lang in languages" :key="lang" :value="lang">
              {{ lang }}
            </option>
          </select>
          <!-- Level -->
          <div class="mt-4">
            <div class="flex justify-between mb-1">
              <label class="text-sm text-gray-500">Level</label>
              <span class="text-sm text-blue-500">{{ item.levelLabel }}</span>
            </div>
            <!-- LEVEL BAR -->
            <div class="flex gap-2 mt-1">
              <div
                v-for="n in 5"
                :key="n"
                @click="setLevel(item, n)"
                class="h-6 flex-1 rounded-md cursor-pointer transition"
                :class="n <= item.level ? 'bg-blue-500' : 'bg-blue-100'"
              ></div>
            </div>
          </div>
          <!-- Delete -->
          <button
            aria-label="Remove Language Skill"
            @click="removeLanguageSkill(index)"
            class="mt-4 p-2 text-red-500 hover:bg-red-50 rounded-md"
          >
            Hapus
          </button>
        </div>
      </transition>
    </div>
  </div>
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
