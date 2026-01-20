<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { useUtilsStore } from "@/stores/utils.js";

/* ================================
📚 Bagian Education Dropdown
================================ */
const props = defineProps({
  schoolName: String,
  fieldOfStudy: String,
  educationPeriod: String,

  selectedEducation: Object,
  educationOptions: Array,
  isOpenEducation: Boolean,
});

const emit = defineEmits([
  "update:schoolName",
  "update:fieldOfStudy",
  "update:selectedEducation",
  "update:educationPeriod",
  "toggleEducation",
  "closeAll", // menutup dropdown lain
]);

const educationWrapper = ref(null);
const showDateRange = ref(false);
const utils = useUtilsStore();
const customDateRange = ref({
  start: "",
  end: "",
});

// 🔄 Toggle buka/tutup date range
const toggleDateRange = () => {
  showDateRange.value = !showDateRange.value;
};

// 📘 Pilih salah satu opsi education
const chooseEducation = (education) => {
  emit("update:selectedEducation", education);
  emit("closeAll");
};

// 🖱️ Deteksi klik di luar dropdown & input
function handleClickOutside(e) {
  const wrapper = educationWrapper.value;

  if (
    wrapper?.contains(e.target) ||
    e.target.closest(".calendar-popup") ||
    e.target.tagName === "INPUT"
  ) {
    return;
  }

  showDateRange.value = false;
  emit("closeAll");
}

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
});

// 👁️ Tutup otomatis jika dua tanggal sudah diisi
watch(
  () => [customDateRange.value.start, customDateRange.value.end],
  ([start, end]) => {
    if (start && end) {
      emit("update:educationPeriod", `${start} - ${end}`);
      showDateRange.value = false;
    }
  },
);

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
  const files = event.target.files;
  for (const file of files) {
    addFile(file);
  }
};

// 📂 Saat drag & drop file
const handleDrop = (event) => {
  isDragging.value = false;
  const files = event.dataTransfer.files;
  for (const file of files) {
    addFile(file);
  }
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
  uploadedFiles.value.push({
    file, // simpan file asli
    name: file.name,
    url: URL.createObjectURL(file),
  });
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
  <h2 class="text-xl font-semibold text-[#195279] mb-4">Education</h2>

  <div class="flex gap-10">
    <!-- Highest Education DROPDOWN -->
    <div ref="educationWrapper" class="flex flex-col w-full lg:mb-3 xl:mb-4">
      <label
        class="text-[14px] font-[500] text-[#4B5563] dark:text-[#6F6F6F] mb-1"
      >
        Highest Level of Education <span class="text-red-500">*</span>
      </label>

      <div class="relative">
        <div
          class="w-full p-2 rounded-[8px] border-gray-300 bg-white dark:bg-[#323232] border-[0.1px] dark:border-[#FAFAFA]/25 focus:ring-1 focus:ring-[#2AB857] cursor-pointer flex justify-between"
          @click.stop="emit('toggleEducation')"
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
    <div class="flex flex-col w-full lg:mb-3 xl:mb-4">
      <label
        class="text-[14px] font-[500] text-[#4B5563] dark:text-[#6F6F6F] mb-1"
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
  <div class="flex flex-col w-full lg:mb-3 xl:mb-4">
    <label
      class="text-[14px] font-[500] text-[#4B5563] dark:text-[#6F6F6F] mb-1"
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
  <div class="flex flex-row w-full h-auto gap-x-5">
    <!-- Tanggal Masuk dan Lulus Akademik -->
    <div class="flex flex-col w-full lg:mb-3 xl:mb-4">
      <!-- Label -->
      <label
        class="text-[14px] font-[500] text-[#4B5563] dark:text-[#6F6F6F] mb-1"
      >
        Tahun Masuk dan Tahun Lulus <span class="text-red-500">*</span>
      </label>
      <!-- Input -->
      <div
        ref="educationWrapper"
        class="col-span-12 sm:col-span-4 h-full rounded-[5px] bg-[#D9D9D9] p-[1px] dark:bg-[#565656] mt-3 sm:mt-0"
      >
        <div
          class="daterange-box relative w-full h-full bg-white dark:bg-[#323232] rounded-[5px]"
        >
          <div
            @click="toggleDateRange"
            class="w-full h-full flex flex-row items-center px-6 sm:px-3 py-2 rounded-[5px] justify-between cursor-pointer select-none"
          >
            <div class="flex items-center">
              <span
                class="flex items-center text-[14px]"
                :class="[
                  customDateRange.start && customDateRange.end
                    ? 'text-[12px] text-[#6C6C6C] dark:text-[#ADADAD]'
                    : 'capitalize text-[#6C6C6C] dark:text-[#ADADAD]',
                ]"
              >
                {{
                  customDateRange.start && customDateRange.end
                    ? utils.fromISODate(customDateRange.start) +
                      " - " +
                      utils.fromISODate(customDateRange.end)
                    : "Start Date - End Date"
                }}
              </span>
            </div>
            <!-- Ikon kalender -->
            <div class="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                class="w-5 h-5 text-gray-500"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
          </div>
          <!-- Dropdown Date Range -->
          <transition name="fade"
            ><div
              v-if="showDateRange"
              class="absolute right-0 top-10 mt-1 w-full rounded-[5px] shadow bg-white dark:bg-[#565656] z-10 p-[1px]"
            >
              <div
                class="w-full h-auto rounded-[5px] bg-white dark:bg-[#17181A] p-3"
              >
                <div class="flex w-auto flex-row items-center gap-x-1">
                  <!-- Start Date -->
                  <input
                    type="date"
                    v-model="customDateRange.start"
                    class="w-full border rounded px-2 py-1 text-[14px] text-[#6C6C6C] dark:text-black"
                  />
                  <span>-</span>
                  <!-- End Date -->
                  <input
                    type="date"
                    v-model="customDateRange.end"
                    class="w-full border rounded px-2 py-1 text-[14px] text-[#6C6C6C] dark:text-black"
                  />
                </div>
              </div>
            </div>
          </transition>
        </div>
      </div>
    </div>
    <!-- GPA ATAU NILAI RATA-RATA -->
    <div class="flex flex-col w-full lg:mb-3 xl:mb-4">
      <label
        class="text-[14px] font-[500] text-[#4B5563] dark:text-[#6F6F6F] mb-1"
      >
        GPA (Grade Point Average) <span class="text-red-500">*</span>
      </label>
      <input
        type="text"
        class="w-full p-2 rounded-[8px] border-gray-300 dark:bg-[#323232] border-[0.1px] dark:border-[#FAFAFA]/25"
        placeholder="e.g., 3.85"
      />
    </div>
  </div>
  <!-- Dokumen File Pendukung -->
  <div class="flex flex-col w-full lg:mb-3 xl:mb-4">
    <label
      class="text-[14px] font-[500] text-[#4B5563] dark:text-[#6F6F6F] mb-1"
    >
      Sertifikat pelatihan tambahan (jika ada)
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
            class="w-6 h-6 text-green-600 mb-1"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 16v-8m0 0l-3 3m3-3l3 3M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2"
            />
          </svg>

          <!-- Teks -->
          <p class="text-sm">
            <span class="text-green-600 font-medium"
              >Klik untuk Mengunggah</span
            >
            atau seret dan lepas
          </p>

          <!-- Input File Asli (disembunyikan) -->
          <input
            type="file"
            ref="fileInput"
            class="hidden"
            multiple
            @change="handleFileChange"
          />
        </div>
      </div>

      <!-- Tombol + -->
      <!-- <div
          class="w-10 h-10 flex justify-center bg-[#2AB857]/30 items-center rounded-xl p-1"
        >
          <div class="w-full h-full rounded-xl">
            <button
              aria-label="Add File"
              type="button"
              class="w-full h-full bg-green-400 rounded-xl hover:bg-green-500 transition"
              @click="triggerFileInput"
            >
              <p class="text-[24px] font-[400] text-white">+</p>
            </button>
          </div>
        </div> -->
      <!-- </div> -->

      <!-- 🧾 Daftar File Sertifikat -->
      <div
        v-for="(file, index) in uploadedFiles"
        :key="index"
        class="flex flex-row gap-x-3 w-full h-auto items-center"
      >
        <div class="w-full h-auto">
          <div
            class="w-full p-2 rounded-[8px] bg-[#EDEEEF] flex items-center justify-between"
          >
            <p class="font-[400] text-[14px] text-[#6F6F6F] truncate">
              {{ file.name }}
              <span
                class="text-[#1091F3] font-[600] cursor-pointer hover:underline"
                @click="viewFile(file)"
              >
                Lihat Dokumen
              </span>
            </p>
          </div>
        </div>
        <div class="w-10 h-10 flex justify-center items-center rounded-xl">
          <button
            aria-label="Remove File"
            type="button"
            class="w-full h-full bg-[#FFBABA] rounded-xl hover:bg-[#ff9b9b] transition"
            @click="removeFile(index)"
          >
            <p class="text-[24px] font-[400] text-white">-</p>
          </button>
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
