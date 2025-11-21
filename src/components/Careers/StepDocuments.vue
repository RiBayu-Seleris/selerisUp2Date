<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";

const props = defineProps({
  fullname: String,
  email: String,
  phone: String,
  address: String,

  selectedGender: Object, // FIX 1
  selectedCountry: Object,
  countries: Array,
  genderOptions: Array,
  isOpenGender: Boolean,
  isOpenCountry: Boolean,
});

const emit = defineEmits([
  "update:fullname",
  "update:email",
  "update:phone",
  "update:address",
  "update:selectedGender", // FIX 2
  "update:selectedCountry", // FIX 3
  "toggleGender",
  "toggleCountry",
  "closeAll",
]);

const genderWrapper = ref(null);
const countryWrapper = ref(null);

const chooseGender = (gender) => {
  emit("update:selectedGender", gender); // kirim object
  emit("closeAll");
};

const chooseCountry = (country) => {
  emit("update:selectedCountry", country);
  emit("closeAll");
};

function handleClickOutside(e) {
  const genderEl = genderWrapper.value;
  const countryEl = countryWrapper.value;

  if (!genderEl?.contains(e.target) && !countryEl?.contains(e.target)) {
    emit("closeAll");
  }
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
    Additional Documents
  </h2>

  <!-- === Curriculum Vitae (CV) === -->
  <div class="flex flex-col w-full lg:mb-3 xl:mb-4">
    <label
      class="text-[14px] font-[500] text-[#4B5563] dark:text-[#6F6F6F] mb-1"
    >
      Curriculum Vitae (CV)
    </label>
    <div class="w-full h-auto flex flex-row gap-5">
      <!-- 🟩 Frame Input Upload -->
      <!-- <div class="flex flex-row gap-x-3 w-full h-auto items-center"> -->
      <div class="w-full h-full flex items-center">
        <div
          class="w-full border-[1px] border-green-500 rounded-lg p-2 flex flex-row items-center cursor-pointer hover:bg-green-50 transition"
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
            <span>
              <span class="text-green-600 font-medium"
                >Klik untuk Mengunggah</span
              >
              atau seret dan lepas
            </span>
          </p>

          <!-- Input File Asli (disembunyikan) -->
          <input type="file" ref="fileInput" class="hidden" />
        </div>
      </div>
      <div class="w-full h-auto flex items-center">
        <div
          class="w-full h-full border-[1px] border-green-500 rounded-lg p-2 flex flex-row items-center cursor-pointer hover:bg-green-50 transition"
        >
          <!-- Teks -->
          <p class="text-sm">
            <span class="font-medium">
              Dokumen Sertifikat My Skill
              <span class="text-[#1091F3]"> Lihat Dokumen </span>
            </span>
          </p>
        </div>
      </div>
    </div>
  </div>

  <!-- === Cover Letter === -->
  <div class="flex flex-col w-full lg:mb-3 xl:mb-4">
    <label
      class="text-[14px] font-[500] text-[#4B5563] dark:text-[#6F6F6F] mb-1"
    >
      Cover Letter
    </label>
    <div class="w-full h-auto flex flex-row gap-5">
      <!-- 🟩 Frame Input Upload -->
      <!-- <div class="flex flex-row gap-x-3 w-full h-auto items-center"> -->
      <div class="w-full h-full flex items-center">
        <div
          class="w-full border-[1px] border-green-500 rounded-lg p-2 flex flex-row items-center cursor-pointer hover:bg-green-50 transition"
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
            <span>
              <span class="text-green-600 font-medium"
                >Klik untuk Mengunggah</span
              >
              atau seret dan lepas
            </span>
          </p>

          <!-- Input File Asli (disembunyikan) -->
          <input type="file" ref="fileInput" class="hidden" />
        </div>
      </div>
      <div class="w-full h-auto flex items-center">
        <div
          class="w-full h-full border-[1px] border-green-500 rounded-lg p-2 flex flex-row items-center cursor-pointer hover:bg-green-50 transition"
        >
          <!-- Teks -->
          <p class="text-sm">
            <span class="font-medium">
              Dokumen Sertifikat My Skill
              <span class="text-[#1091F3]"> Lihat Dokumen </span>
            </span>
          </p>
        </div>
      </div>
    </div>
  </div>

  <!-- === Diploma === -->
  <div class="flex flex-col w-full lg:mb-3 xl:mb-4">
    <label
      class="text-[14px] font-[500] text-[#4B5563] dark:text-[#6F6F6F] mb-1"
    >
      Diploma
    </label>
    <div class="w-full h-auto flex flex-row gap-5">
      <!-- 🟩 Frame Input Upload -->
      <!-- <div class="flex flex-row gap-x-3 w-full h-auto items-center"> -->
      <div class="w-full h-full flex items-center">
        <div
          class="w-full border-[1px] border-green-500 rounded-lg p-2 flex flex-row items-center cursor-pointer hover:bg-green-50 transition"
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
            <span>
              <span class="text-green-600 font-medium"
                >Klik untuk Mengunggah</span
              >
              atau seret dan lepas
            </span>
          </p>

          <!-- Input File Asli (disembunyikan) -->
          <input type="file" ref="fileInput" class="hidden" />
        </div>
      </div>
      <div class="w-full h-auto flex items-center">
        <div
          class="w-full h-full border-[1px] border-green-500 rounded-lg p-2 flex flex-row items-center cursor-pointer hover:bg-green-50 transition"
        >
          <!-- Teks -->
          <p class="text-sm">
            <span class="font-medium">
              Dokumen Sertifikat My Skill
              <span class="text-[#1091F3]"> Lihat Dokumen </span>
            </span>
          </p>
        </div>
      </div>
    </div>
  </div>

  <!-- === Academic Transcript === -->
  <div class="flex flex-col w-full lg:mb-3 xl:mb-4">
    <label
      class="text-[14px] font-[500] text-[#4B5563] dark:text-[#6F6F6F] mb-1"
    >
      Academic Transcript
    </label>
    <div class="w-full h-auto flex flex-row gap-5">
      <!-- 🟩 Frame Input Upload -->
      <!-- <div class="flex flex-row gap-x-3 w-full h-auto items-center"> -->
      <div class="w-full h-full flex items-center">
        <div
          class="w-full border-[1px] border-green-500 rounded-lg p-2 flex flex-row items-center cursor-pointer hover:bg-green-50 transition"
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
            <span>
              <span class="text-green-600 font-medium"
                >Klik untuk Mengunggah</span
              >
              atau seret dan lepas
            </span>
          </p>

          <!-- Input File Asli (disembunyikan) -->
          <input type="file" ref="fileInput" class="hidden" />
        </div>
      </div>
      <div class="w-full h-auto flex items-center">
        <div
          class="w-full h-full border-[1px] border-green-500 rounded-lg p-2 flex flex-row items-center cursor-pointer hover:bg-green-50 transition"
        >
          <!-- Teks -->
          <p class="text-sm">
            <span class="font-medium">
              Dokumen Sertifikat My Skill
              <span class="text-[#1091F3]"> Lihat Dokumen </span>
            </span>
          </p>
        </div>
      </div>
    </div>
  </div>

  <!-- === Training/Work Experience Certificates === -->
  <div class="flex flex-col w-full lg:mb-3 xl:mb-4">
    <label
      class="text-[14px] font-[500] text-[#4B5563] dark:text-[#6F6F6F] mb-1"
    >
      Training/Work Experience Certificates
    </label>
    <div class="w-full h-auto flex flex-row gap-5">
      <!-- 🟩 Frame Input Upload -->
      <!-- <div class="flex flex-row gap-x-3 w-full h-auto items-center"> -->
      <div class="w-full h-full flex items-center">
        <div
          class="w-full border-[1px] border-green-500 rounded-lg p-2 flex flex-row items-center cursor-pointer hover:bg-green-50 transition"
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
            <span>
              <span class="text-green-600 font-medium"
                >Klik untuk Mengunggah</span
              >
              atau seret dan lepas
            </span>
          </p>

          <!-- Input File Asli (disembunyikan) -->
          <input type="file" ref="fileInput" class="hidden" />
        </div>
      </div>
      <div class="w-full h-auto flex items-center">
        <div
          class="w-full h-full border-[1px] border-green-500 rounded-lg p-2 flex flex-row items-center cursor-pointer hover:bg-green-50 transition"
        >
          <!-- Teks -->
          <p class="text-sm">
            <span class="font-medium">
              Dokumen Sertifikat My Skill
              <span class="text-[#1091F3]"> Lihat Dokumen </span>
            </span>
          </p>
        </div>
      </div>
    </div>
  </div>

  <!-- === Portfolio Link/File (PDF) === -->
  <div class="flex flex-col w-full lg:mb-3 xl:mb-4">
    <label
      class="text-[14px] font-[500] text-[#4B5563] dark:text-[#6F6F6F] mb-1"
    >
      Portfolio Link/File (PDF)
    </label>
    <div class="w-full h-auto flex flex-row gap-5">
      <!-- 🟩 Frame Input Upload -->
      <!-- <div class="flex flex-row gap-x-3 w-full h-auto items-center"> -->
      <div class="w-full h-full flex items-center">
        <div
          class="w-full border-[1px] border-green-500 rounded-lg p-2 flex flex-row items-center cursor-pointer hover:bg-green-50 transition"
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
            <span>
              <span class="text-green-600 font-medium"
                >Klik untuk Mengunggah</span
              >
              atau seret dan lepas
            </span>
          </p>

          <!-- Input File Asli (disembunyikan) -->
          <input type="file" ref="fileInput" class="hidden" />
        </div>
      </div>
      <div class="w-full h-auto flex items-center">
        <div
          class="w-full h-full border-[1px] border-green-500 rounded-lg p-2 flex flex-row items-center cursor-pointer hover:bg-green-50 transition"
        >
          <!-- Teks -->
          <p class="text-sm">
            <span class="font-medium">
              Dokumen Sertifikat My Skill
              <span class="text-[#1091F3]"> Lihat Dokumen </span>
            </span>
          </p>
        </div>
      </div>
    </div>
  </div>

  <!-- === Recent Formal Photograph === -->
  <div class="flex flex-col w-full lg:mb-3 xl:mb-4">
    <label
      class="text-[14px] font-[500] text-[#4B5563] dark:text-[#6F6F6F] mb-1"
    >
      Recent Formal Photograph
    </label>
    <div class="w-full h-auto flex flex-row gap-5">
      <!-- 🟩 Frame Input Upload -->
      <!-- <div class="flex flex-row gap-x-3 w-full h-auto items-center"> -->
      <div class="w-full h-full flex items-center">
        <div
          class="w-full border-[1px] border-green-500 rounded-lg p-2 flex flex-row items-center cursor-pointer hover:bg-green-50 transition"
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
            <span>
              <span class="text-green-600 font-medium"
                >Klik untuk Mengunggah</span
              >
              atau seret dan lepas
            </span>
          </p>

          <!-- Input File Asli (disembunyikan) -->
          <input type="file" ref="fileInput" class="hidden" />
        </div>
      </div>
      <div class="w-full h-auto flex items-center">
        <div
          class="w-full h-full border-[1px] border-green-500 rounded-lg p-2 flex flex-row items-center cursor-pointer hover:bg-green-50 transition"
        >
          <!-- Teks -->
          <p class="text-sm">
            <span class="font-medium">
              Dokumen Sertifikat My Skill
              <span class="text-[#1091F3]"> Lihat Dokumen </span>
            </span>
          </p>
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
