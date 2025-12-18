<script setup>
import { ref, onMounted, onBeforeUnmount, watch, computed } from "vue";
import { useUtilsStore } from "@/stores/utils.js";

const utils = useUtilsStore();

/* ================================
📚 Bagian Education Dropdown
================================ */
const props = defineProps({
  schoolName: String,
  fieldOfStudy: String,
  gpaScore: String,
  startDate: String,
  endDate: String,
  file: {
    type: File,
    default: null,
  },

  selectedEducation: Object,
  educationOptions: Array,
  isOpenEducation: Boolean,
});

const emit = defineEmits([
  "update:schoolName",
  "update:fieldOfStudy",
  "update:selectedEducation",
  "update:gpaScore",
  "update:startDate",
  "update:endDate",
  "update:file",
  "toggleEducation",
  "closeAll", // menutup dropdown lain
]);

const educationWrapper = ref(null);

const startDateWrapper = ref(null);
const isStartDateOpen = ref(false);

const endDateWrapper = ref(null);
const isEndDateOpen = ref(false);

const startDateModel = computed({
  get: () => props.startDate ?? "",
  set: (val) => emit("update:startDate", val ?? ""),
});

const endDateModel = computed({
  get: () => props.endDate ?? "",
  set: (val) => emit("update:endDate", val ?? ""),
});

// 🔄 Toggle buka/tutup date range
const toggleStartDate = () => {
  emit("closeAll");
  isStartDateOpen.value = !isStartDateOpen.value;
  isEndDateOpen.value = false;
};

const toggleEndDate = () => {
  emit("closeAll");
  isStartDateOpen.value = false;
  isEndDateOpen.value = !isEndDateOpen.value;
};

// 📘 Pilih salah satu opsi education
const chooseEducation = (education) => {
  emit("update:selectedEducation", education);
  emit("closeAll");
  isStartDateOpen.value = false;
  isEndDateOpen.value = false;
};

// 🖱️ Deteksi klik di luar dropdown & input
function handleClickOutside(e) {
  const wrapper = educationWrapper.value;
  const startWrapper = startDateWrapper.value;
  const endWrapper = endDateWrapper.value;

  if (wrapper?.contains(e.target)) {
    return;
  }

  if (!startWrapper?.contains(e.target)) {
    isStartDateOpen.value = false;
  }
  if (!endWrapper?.contains(e.target)) {
    isEndDateOpen.value = false;
  }

  emit("closeAll");
}

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
});

// 👁️ Tutup otomatis jika dua tanggal sudah diisi

/* ================================
📁 Bagian Upload Sertifikat (Drag & Drop + Multiple File)
================================ */
const fileInput = ref(null);
const isDragging = ref(false);
const uploadedFiles = ref([]);

// Klik area → buka file picker
const triggerFileInput = () => {
  fileInput.value.click();
};

// 📂 Saat memilih file manual
const handleFileChange = (event) => {
  const file = event.target.files[0];
  addFile(file);
};

// 📂 Saat drag & drop file
const handleDrop = (event) => {
  isDragging.value = false;
  const file = event.dataTransfer.files[0];
  addFile(file);
};

// Saat file diseret masuk & keluar (ubah state UI)
const handleDragOver = (event) => {
  event.preventDefault();
  isDragging.value = true;
};
const handleDragLeave = () => {
  isDragging.value = false;
};

// ➕ Tambah file ke daftar
const addFile = (file) => {
  if (!file) return;

  const fileData = {
    file,
    name: file.name,
    url: URL.createObjectURL(file),
  };

  uploadedFiles.value = [fileData];

  // 🔥 Kirim ke parent
  emit("update:file", file);
};

// ➕ Klik tombol tambah → buka file picker
const addFileButton = () => {
  fileInput.value.click();
};

// ➖ Hapus file dari daftar
const removeFile = (index) => {
  uploadedFiles.value.splice(index, 1);
};

// 🔍 Lihat file (buka tab baru)
const viewFile = (file) => {
  window.open(file.url, "_blank");
};
</script>

<template>
  <div class="w-full h-auto flex flex-col gap-y-3">
    <div class="flex flex-col lg:flex-row gap-y-3 lg:gap-y-0 lg:gap-x-5">
      <!-- Highest Education DROPDOWN -->
      <div ref="educationWrapper" class="flex flex-col w-full">
        <label
          class="text-[14px] font-[500] text-[#4B5563] dark:text-[#6F6F6F] lg:mb-1"
        >
          Highest Level of Education <span class="text-red-500">*</span>
        </label>
        <div class="relative">
          <div
            class="w-full p-2 rounded-[8px] border-gray-300 bg-white dark:bg-[#323232] border-[0.1px] dark:border-[#FAFAFA]/25 focus:ring-1 focus:ring-[#2AB857] cursor-pointer flex justify-between"
            @click.stop="
              isStartDateOpen = false;
              isEndDateOpen = false;
              emit('toggleEducation');
            "
          >
            <span
              :class="{
                'text-[#9CA3AF]': !selectedEducation, // warna merah saat belum pilih
                'text-[#4B5563] dark:text-[#FAFAFA]': selectedEducation, // warna normal saat sudah pilih
              }"
              >{{ selectedEducation?.label || "Choose Last Education" }}</span
            >
            <svg
              class="w-5 h-auto transition-transform"
              :class="{ 'rotate-180': props.isOpenEducation }"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
          <transition name="fade">
            <div
              v-if="props.isOpenEducation"
              class="absolute w-full bg-white dark:bg-[#323232] mt-1 shadow-lg rounded-md border z-10"
            >
              <div
                v-for="education in educationOptions"
                :key="education.value"
                @click="chooseEducation(education)"
                class="p-2 hover:bg-white/30 cursor-pointer rounded-md"
              >
                {{ education.label }}
              </div>
            </div>
          </transition>
        </div>
      </div>
      <!-- School/University -->
      <div class="flex flex-col w-full">
        <label
          class="text-[14px] font-[500] text-[#4B5563] dark:text-[#6F6F6F] lg:mb-1"
        >
          School / University Name <span class="text-red-500">*</span>
        </label>
        <input
          name="schoolName"
          :value="schoolName"
          @input="emit('update:schoolName', $event.target.value)"
          type="text"
          class="w-full p-2 rounded-lg border border-gray-300 dark:border-[#FAFAFA]/25 bg-white dark:bg-[#323232] text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#2AB857] focus:border-transparent"
          placeholder="School/University Name"
        />
      </div>
    </div>
    <div class="flex flex-col w-full">
      <label
        class="text-[14px] font-[500] text-[#4B5563] dark:text-[#6F6F6F] lg:mb-1"
      >
        Field of Study <span class="text-red-500">*</span>
      </label>
      <input
        name="fieldOfStudy"
        :value="fieldOfStudy"
        @input="emit('update:fieldOfStudy', $event.target.value)"
        type="text"
        class="w-full p-2 rounded-lg border border-gray-300 dark:border-[#FAFAFA]/25 bg-white dark:bg-[#323232] text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#2AB857] focus:border-transparent"
        placeholder="e.g., Computer Science"
      />
    </div>
    <!-- FRAME Tanggal Masuk dan Lulus serta Nilai Rata-Rata (GPA) -->
    <div
      class="flex flex-col lg:flex-row w-full h-auto gap-y-3 lg:gap-y-0 lg:gap-x-5"
    >
      <!-- Tanggal Masuk -->
      <div class="flex flex-col w-full">
        <label
          class="text-[14px] font-[500] text-[#4B5563] dark:text-[#6F6F6F] lg:mb-1"
        >
          Start Date Of Study <span class="text-red-500">*</span>
        </label>
        <!-- ref="dobWrapper" -->
        <div
          class="col-span-12 sm:col-span-4 h-full rounded-lg bg-[#D9D9D9] p-[1px] dark:bg-[#565656] mt-0"
        >
          <div
            class="w-full h-full bg-white dark:bg-[#323232] rounded-lg text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
          >
            <input
              type="date"
              v-model="startDateModel"
              class="w-full bg-white p-2 dark:bg-[#323232] rounded-lg text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#2AB857] focus:border-transparent appearance-none [&::-webkit-calendar-picker-indicator]:opacity-60 dark:[&::-webkit-calendar-picker-indicator]:invert"
            />
          </div>
        </div>
      </div>
      <!-- Tanggal Selesai -->
      <div class="flex flex-col w-full">
        <label
          class="text-[14px] font-[500] text-[#4B5563] dark:text-[#6F6F6F] lg:mb-1"
        >
          End Date Of Study <span class="text-red-500">*</span>
        </label>
        <!-- ref="dobWrapper" -->
        <div
          class="col-span-12 sm:col-span-4 h-full rounded-lg bg-[#D9D9D9] p-[1px] dark:bg-[#565656] mt-0"
        >
          <div
            class="w-full h-full bg-white dark:bg-[#323232] rounded-lg text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
          >
            <input
              type="date"
              id="start_date"
              v-model="endDateModel"
              class="w-full bg-white p-2 dark:bg-[#323232] rounded-lg text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#2AB857] focus:border-transparent appearance-none [&::-webkit-calendar-picker-indicator]:opacity-60 dark:[&::-webkit-calendar-picker-indicator]:invert"
            />
          </div>
        </div>
      </div>
      <!-- GPA ATAU NILAI RATA-RATA -->
      <div class="flex flex-col w-full h-full">
        <label
          class="text-[14px] font-[500] text-[#4B5563] dark:text-[#6F6F6F] lg:mb-1"
        >
          GPA (Grade Point Average) <span class="text-red-500">*</span>
        </label>
        <input
          type="text"
          :value="gpaScore"
          @input="emit('update:gpaScore', $event.target.value)"
          class="w-full p-2 rounded-[8px] border-gray-300 dark:bg-[#323232] border-[0.1px] dark:border-[#FAFAFA]/25"
          placeholder="e.g., 3.85"
        />
      </div>
    </div>
    <!-- Dokumen File Pendukung -->
    <div class="flex flex-col w-full">
      <label
        class="text-[14px] font-[500] text-[#4B5563] dark:text-[#6F6F6F] lg:mb-1"
      >
        Additional training certificates, if any (combine into a single PDF)
      </label>
      <div class="w-full h-auto flex flex-col gap-y-5">
        <!-- 🟩 Frame Input Upload -->
        <!-- <div class="flex flex-row gap-x-3 w-full h-auto items-center"> -->
        <div class="w-full h-full flex items-center">
          <div
            class="w-full border-[1px] border-green-500 rounded-lg p-2 flex flex-row items-center cursor-pointer hover:bg-green-50 transition"
            @click="triggerFileInput"
            @dragover.prevent="handleDragOver"
            @dragleave.prevent="handleDragLeave"
            @drop.prevent="handleDrop"
            :class="{ 'bg-green-50 border-green-600': isDragging }"
          >
            <!-- Ikon Upload -->
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6 text-green-600 lg:mb-1"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 16v-8m0 0l-3 3m3-3l3 3M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2"
              />
            </svg>
            <!-- Teks -->
            <p class="text-sm">
              <span v-if="uploadedFiles.length === 0">
                <span class="text-green-600 font-medium"
                  >Klik untuk Mengunggah</span
                >
                atau seret dan lepas
              </span>
              <span v-else class="text-green-600 font-medium">
                {{ uploadedFiles[0].name }}
              </span>
            </p>
            <!-- Input File Asli (disembunyikan) -->
            <input
              type="file"
              ref="fileInput"
              class="hidden"
              @change="handleFileChange"
            />
          </div>
        </div>
      </div>
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
</style>
