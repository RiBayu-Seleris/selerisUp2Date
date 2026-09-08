<script setup>
import { ref, watch } from "vue";
import { useI18n } from "vue-i18n";
import Swal from "sweetalert2";

const { t } = useI18n();

/* ======================================
📌 Pemeriksaan berkas unggahan

Kolom unggah ini dulu menerima berkas APA PUN, tanpa batas ukuran — termasuk
berkas program (.exe) atau berkas 2 GB yang membuat pengiriman gagal diam-diam.

PENTING: pemeriksaan di sini hanya untuk kenyamanan pelamar, supaya salah
berkas ketahuan langsung, bukan setelah menunggu unggahan panjang. Ini BUKAN
pengaman. Siapa pun bisa melewatinya lewat alat pengembang browser, jadi
penyaring yang sesungguhnya tetap WAJIB ada di sisi server.
====================================== */
const MAKS_DOKUMEN_MB = 5;
const MAKS_FOTO_MB = 2;

const EKSTENSI_DOKUMEN = [".pdf", ".doc", ".docx"];
const EKSTENSI_FOTO = [".jpg", ".jpeg", ".png", ".webp"];

const tolak = (pesan) => {
  Swal.fire({
    icon: "warning",
    title: t("careers.fileInvalidTitle"),
    text: pesan,
  });
};

/**
 * Mengembalikan true kalau berkasnya boleh dipakai.
 *
 * Yang diperiksa nama berkasnya (ekstensi), bukan "tipe" yang dilaporkan
 * browser — karena tipe itu bisa kosong atau dipalsukan, sedangkan ekstensi
 * lebih dapat diandalkan untuk keperluan tampilan.
 */
const berkasLolos = (berkas, daftarEkstensi, maksMB) => {
  const nama = (berkas.name || "").toLowerCase();
  const cocok = daftarEkstensi.some((e) => nama.endsWith(e));

  if (!cocok) {
    tolak(
      t("careers.fileWrongTypeText", {
        types: daftarEkstensi.join(", "),
      }),
    );
    return false;
  }

  const ukuranMB = berkas.size / (1024 * 1024);
  if (ukuranMB > maksMB) {
    tolak(
      t("careers.fileTooLargeText", {
        max: maksMB,
        size: ukuranMB.toFixed(1),
      }),
    );
    return false;
  }

  return true;
};

/* ======================================
📌 Props untuk v-model:cvFile
====================================== */
const props = defineProps({
  cvFile: File,
  clFile: File,
  diplomaFile: File,
  transcriptFile: File,
  experienceCertificateFile: File,
  portfolioFile: File,
  photoFile: File,
});

/* ======================================
📌 Emit untuk v-model:cvFile
(⚠️ WAJIB: update:cvFile)
====================================== */
const emit = defineEmits([
  "update:cvFile",
  "update:clFile",
  "update:diplomaFile",
  "update:transcriptFile",
  "update:experienceCertificateFile",
  "update:portfolioFile",
  "update:photoFile",
]);

/* ======================================
📌 Upload CV
====================================== */
const cvInput = ref(null);
const cvFileName = ref("");
const cvPreviewUrl = ref("");

const openCvUpload = () => {
  cvInput.value?.click();
};

const handleCvChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    if (!berkasLolos(file, EKSTENSI_DOKUMEN, MAKS_DOKUMEN_MB)) {
      event.target.value = ""; // supaya berkas yang sama bisa dipilih lagi
      return;
    }
    emit("update:cvFile", file);
  }
};

const openCvPreviewPage = () => {
  if (cvPreviewUrl.value) {
    window.open(cvPreviewUrl.value, "_blank");
  }
};

watch(
  () => props.cvFile,
  (file) => {
    cvFileName.value = file ? file.name : "";

    if (cvPreviewUrl.value) {
      URL.revokeObjectURL(cvPreviewUrl.value);
      cvPreviewUrl.value = "";
    }

    if (file) {
      cvPreviewUrl.value = URL.createObjectURL(file);
    }
  },
  { immediate: true },
);

/* ======================================
📌 Upload Cover Letter
====================================== */
const clInput = ref(null);
const clFileName = ref("");
const clPreviewUrl = ref("");

const openClUpload = () => {
  clInput.value?.click();
};

const handleClChange = (event) => {
  const file = event.target.files[0];

  if (file) {
    if (!berkasLolos(file, EKSTENSI_DOKUMEN, MAKS_DOKUMEN_MB)) {
      event.target.value = ""; // supaya berkas yang sama bisa dipilih lagi
      return;
    }
    clFileName.value = file.name;

    // 🔥 Kirim ke parent via v-model:clFile
    emit("update:clFile", file);
  }
};

const openClPreviewPage = () => {
  if (clPreviewUrl.value) {
    window.open(clPreviewUrl.value, "_blank");
  }
};

watch(
  () => props.clFile,
  (file) => {
    clFileName.value = file ? file.name : "";

    if (clPreviewUrl.value) {
      URL.revokeObjectURL(clPreviewUrl.value);
      clPreviewUrl.value = "";
    }

    if (file) {
      clPreviewUrl.value = URL.createObjectURL(file);
    }
  },
  { immediate: true },
);

/* ======================================
📌 Upload Diploma
====================================== */
const diplomaInput = ref(null);
const diplomaFileName = ref("");
const diplomaPreviewUrl = ref("");

const openDiplomaUpload = () => {
  diplomaInput.value?.click();
};

const handleDiplomaChange = (event) => {
  const file = event.target.files[0];

  if (file) {
    if (!berkasLolos(file, EKSTENSI_DOKUMEN, MAKS_DOKUMEN_MB)) {
      event.target.value = ""; // supaya berkas yang sama bisa dipilih lagi
      return;
    }
    diplomaFileName.value = file.name;

    // 🔥 Kirim ke parent via v-model:diplomaFile
    emit("update:diplomaFile", file);
  }
};

const openDiplomaPreviewPage = () => {
  if (diplomaPreviewUrl.value) {
    window.open(diplomaPreviewUrl.value, "_blank");
  }
};

watch(
  () => props.diplomaFile,
  (file) => {
    diplomaFileName.value = file ? file.name : "";

    if (diplomaPreviewUrl.value) {
      URL.revokeObjectURL(diplomaPreviewUrl.value);
      diplomaPreviewUrl.value = "";
    }

    if (file) {
      diplomaPreviewUrl.value = URL.createObjectURL(file);
    }
  },
  { immediate: true },
);

/* ======================================
📌 Upload Transkrip
====================================== */
const transcriptInput = ref(null);
const transcriptFileName = ref("");
const transcriptPreviewUrl = ref("");

const openTranscriptUpload = () => {
  transcriptInput.value?.click();
};

const handleTranscriptChange = (event) => {
  const file = event.target.files[0];

  if (file) {
    if (!berkasLolos(file, EKSTENSI_DOKUMEN, MAKS_DOKUMEN_MB)) {
      event.target.value = ""; // supaya berkas yang sama bisa dipilih lagi
      return;
    }
    transcriptFileName.value = file.name;

    // 🔥 Kirim ke parent via v-model:cvFile
    emit("update:transcriptFile", file);
  }
};

const openTranscriptPreviewPage = () => {
  if (transcriptPreviewUrl.value) {
    window.open(transcriptPreviewUrl.value, "_blank");
  }
};

watch(
  () => props.transcriptFile,
  (file) => {
    transcriptFileName.value = file ? file.name : "";

    if (transcriptPreviewUrl.value) {
      URL.revokeObjectURL(transcriptPreviewUrl.value);
      transcriptPreviewUrl.value = "";
    }

    if (file) {
      transcriptPreviewUrl.value = URL.createObjectURL(file);
    }
  },
  { immediate: true },
);

/* ======================================
📌 Upload Experience Certificate
====================================== */
const experienceCertificateInput = ref(null);
const experienceCertificateFileName = ref("");
const experienceCertificatePreviewUrl = ref("");

const openExperienceCertificateUpload = () => {
  experienceCertificateInput.value?.click();
};

const handleExperienceCertificateChange = (event) => {
  const file = event.target.files[0];

  if (file) {
    if (!berkasLolos(file, EKSTENSI_DOKUMEN, MAKS_DOKUMEN_MB)) {
      event.target.value = ""; // supaya berkas yang sama bisa dipilih lagi
      return;
    }
    experienceCertificateFileName.value = file.name;

    // 🔥 Kirim ke parent via v-model:cvFile
    emit("update:experienceCertificateFile", file);
  }
};

const openExperienceCertificatePreviewPage = () => {
  if (experienceCertificatePreviewUrl.value) {
    window.open(experienceCertificatePreviewUrl.value, "_blank");
  }
};

watch(
  () => props.experienceCertificateFile,
  (file) => {
    experienceCertificateFileName.value = file ? file.name : "";

    if (experienceCertificatePreviewUrl.value) {
      URL.revokeObjectURL(experienceCertificatePreviewUrl.value);
      experienceCertificatePreviewUrl.value = "";
    }

    if (file) {
      experienceCertificatePreviewUrl.value = URL.createObjectURL(file);
    }
  },
  { immediate: true },
);

/* ======================================
📌 Upload Portfolio
====================================== */
const portfolioInput = ref(null);
const portfolioFileName = ref("");
const portfolioPreviewUrl = ref("");

const openPortfolioUpload = () => {
  portfolioInput.value?.click();
};

const handlePortfolioChange = (event) => {
  const file = event.target.files[0];

  if (file) {
    if (!berkasLolos(file, EKSTENSI_DOKUMEN, MAKS_DOKUMEN_MB)) {
      event.target.value = ""; // supaya berkas yang sama bisa dipilih lagi
      return;
    }
    portfolioFileName.value = file.name;

    // 🔥 Kirim ke parent via v-model:cvFile
    emit("update:portfolioFile", file);
  }
};

const openPortfolioPreviewPage = () => {
  if (portfolioPreviewUrl.value) {
    window.open(portfolioPreviewUrl.value, "_blank");
  }
};

watch(
  () => props.portfolioFile,
  (file) => {
    portfolioFileName.value = file ? file.name : "";

    if (portfolioPreviewUrl.value) {
      URL.revokeObjectURL(portfolioPreviewUrl.value);
      portfolioPreviewUrl.value = "";
    }

    if (file) {
      portfolioPreviewUrl.value = URL.createObjectURL(file);
    }
  },
  { immediate: true },
);

/* ======================================
📌 Upload Photo Terbaru
====================================== */
const photoInput = ref(null);
const photoFileName = ref("");
const photoPreviewUrl = ref("");

const openPhotoUpload = () => {
  photoInput.value?.click();
};

const handlePhotoChange = (event) => {
  const file = event.target.files[0];

  if (file) {
    if (!berkasLolos(file, EKSTENSI_FOTO, MAKS_FOTO_MB)) {
      event.target.value = ""; // supaya berkas yang sama bisa dipilih lagi
      return;
    }
    photoFileName.value = file.name;

    // 🔥 Kirim ke parent via v-model:cvFile
    emit("update:photoFile", file);
  }
};

const openPhotoPreviewPage = () => {
  if (photoPreviewUrl.value) {
    window.open(photoPreviewUrl.value, "_blank");
  }
};

watch(
  () => props.photoFile,
  (file) => {
    photoFileName.value = file ? file.name : "";

    if (photoPreviewUrl.value) {
      URL.revokeObjectURL(photoPreviewUrl.value);
      photoPreviewUrl.value = "";
    }

    if (file) {
      photoPreviewUrl.value = URL.createObjectURL(file);
    }
  },
  { immediate: true },
);

const handleDeleteFile = (type) => {
  switch (type) {
    case "cv":
      emit("update:cvFile", null);
      cvFileName.value = "";
      if (cvInput.value) cvInput.value.value = null;
      break;

    case "cl":
      emit("update:clFile", null);
      clFileName.value = "";
      if (clInput.value) clInput.value.value = null;
      break;

    case "diploma":
      emit("update:diplomaFile", null);
      diplomaFileName.value = "";
      if (diplomaInput.value) diplomaInput.value.value = null;
      break;

    case "transcript":
      emit("update:transcriptFile", null);
      transcriptFileName.value = "";
      if (transcriptInput.value) transcriptInput.value.value = null;
      break;

    case "experience":
      emit("update:experienceCertificateFile", null);
      experienceCertificateFileName.value = "";
      if (experienceCertificateInput.value)
        experienceCertificateInput.value.value = null;
      break;

    case "portfolio":
      emit("update:portfolioFile", null);
      portfolioFileName.value = "";
      if (portfolioInput.value) portfolioInput.value.value = null;
      break;

    case "photo":
      emit("update:photoFile", null);
      photoFileName.value = "";
      if (photoInput.value) photoInput.value.value = null;
      break;
  }
};
</script>

<template>
  <div class="w-full h-auto flex flex-col gap-y-3">
    <!-- === Curriculum Vitae (CV) === -->
    <div class="flex flex-col w-full">
      <label
        class="text-[14px] font-[500] text-[#4B5563] dark:text-[#6F6F6F] mb-1"
      >
        {{ $t("careers.curriculum_vitae_cv") }}
      </label>
      <div
        class="w-full h-auto flex flex-col lg:grid lg:grid-cols-2 gap-2 lg:gap-5"
      >
        <!-- 🟩 Frame Input Upload -->
        <div class="w-full h-full flex items-center">
          <div
            @click="openCvUpload"
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
              </span>
            </p>
            <!-- Input File Asli (disembunyikan) -->
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              ref="cvInput"
              @change="handleCvChange"
              class="hidden"
            />
          </div>
        </div>
        <transition name="fade">
          <div
            v-if="cvFileName"
            class="relative w-full h-auto flex items-center"
          >
            <div
              class="w-full h-full border-[1px] border-green-500 rounded-lg p-3 lg:p-2 flex flex-row items-center cursor-pointer hover:bg-green-50 transition"
            >
              <!-- Teks -->
              <p class="text-sm">
                <span class="font-medium">
                  {{ cvFileName || "Belum ada dokumen" }}
                  <span class="text-[#1091F3]" @click.stop="openCvPreviewPage">
                    {{ $t("careers.lihat_dokumen") }}
                  </span>
                </span>
              </p>
            </div>
            <button
              aria-label="CV"
              @click.stop="handleDeleteFile('cv')"
              class="absolute right-3 w-auto h-auto p-3 flex items-center bg-[#FFBABA] rounded-[6px] cursor-pointer"
            >
              <div class="w-3.5 h-1 bg-[#FF2020] rounded-full" />
            </button>
          </div>
        </transition>
      </div>
    </div>
    <!-- === Cover Letter === -->
    <div class="flex flex-col w-full">
      <label
        class="text-[14px] font-[500] text-[#4B5563] dark:text-[#6F6F6F] mb-1"
      >
        {{ $t("careers.cover_letter") }}
      </label>
      <div
        class="w-full h-auto flex flex-col lg:grid lg:grid-cols-2 gap-2 lg:gap-5"
      >
        <!-- 🟩 Frame Input Upload -->
        <div class="w-full h-full flex items-center">
          <div
            @click="openClUpload"
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
              </span>
            </p>
            <!-- Input File Asli (disembunyikan) -->
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              ref="clInput"
              @change="handleClChange"
              class="hidden"
            />
          </div>
        </div>
        <transition name="fade">
          <div
            v-if="clFileName"
            class="relative w-full h-auto flex items-center"
          >
            <div
              class="w-full h-full border-[1px] border-green-500 rounded-lg p-3 lg:p-2 flex flex-row items-center cursor-pointer hover:bg-green-50 transition"
            >
              <!-- Teks -->
              <p class="text-sm">
                <span class="font-medium">
                  {{ clFileName || "Belum ada dokumen" }}
                  <span class="text-[#1091F3]" @click.stop="openClPreviewPage">
                    {{ $t("careers.lihat_dokumen") }}
                  </span>
                </span>
              </p>
            </div>
            <button
              aria-label="CL"
              @click.stop="handleDeleteFile('cl')"
              class="absolute right-3 w-auto h-auto p-3 flex items-center bg-[#FFBABA] rounded-[6px] cursor-pointer"
            >
              <div class="w-3.5 h-1 bg-[#FF2020] rounded-full" />
            </button>
          </div>
        </transition>
      </div>
    </div>
    <!-- === Diploma === -->
    <div class="flex flex-col w-full">
      <label
        class="text-[14px] font-[500] text-[#4B5563] dark:text-[#6F6F6F] mb-1"
      >
        {{ $t("careers.diploma") }}
      </label>
      <div
        class="w-full h-auto flex flex-col lg:grid lg:grid-cols-2 gap-2 lg:gap-5"
      >
        <!-- 🟩 Frame Input Upload -->
        <div class="w-full h-full flex items-center">
          <div
            @click="openDiplomaUpload"
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
              </span>
            </p>
            <!-- Input File Asli (disembunyikan) -->
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              ref="diplomaInput"
              @change="handleDiplomaChange"
              class="hidden"
            />
          </div>
        </div>
        <transition name="fade">
          <div
            v-if="diplomaFileName"
            class="relative w-full h-auto flex items-center"
          >
            <div
              class="w-full h-full border-[1px] border-green-500 rounded-lg p-3 lg:p-2 flex flex-row items-center cursor-pointer hover:bg-green-50 transition"
            >
              <!-- Teks -->
              <p class="text-sm">
                <span class="font-medium">
                  {{ diplomaFileName || "Belum ada dokumen" }}
                  <span
                    class="text-[#1091F3]"
                    @click.stop="openDiplomaPreviewPage"
                  >
                    {{ $t("careers.lihat_dokumen") }}
                  </span>
                </span>
              </p>
            </div>
            <button
              aria-label="Diploma"
              @click.stop="handleDeleteFile('diploma')"
              class="absolute right-3 w-auto h-auto p-3 flex items-center bg-[#FFBABA] rounded-[6px] cursor-pointer"
            >
              <div class="w-3.5 h-1 bg-[#FF2020] rounded-full" />
            </button>
          </div>
        </transition>
      </div>
    </div>
    <!-- === Transkrip Nilai === -->
    <div class="flex flex-col w-full">
      <label
        class="text-[14px] font-[500] text-[#4B5563] dark:text-[#6F6F6F] mb-1"
      >
        {{ $t("careers.academic_transcript") }}
      </label>
      <div
        class="w-full h-auto flex flex-col lg:grid lg:grid-cols-2 gap-2 lg:gap-5"
      >
        <!-- 🟩 Frame Input Upload -->
        <div class="w-full h-full flex items-center">
          <div
            @click="openTranscriptUpload"
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
              </span>
            </p>
            <!-- Input File Asli (disembunyikan) -->
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              ref="transcriptInput"
              @change="handleTranscriptChange"
              class="hidden"
            />
          </div>
        </div>
        <transition name="fade">
          <div
            v-if="transcriptFileName"
            class="relative w-full h-auto flex items-center"
          >
            <div
              class="w-full h-full border-[1px] border-green-500 rounded-lg p-3 lg:p-2 flex flex-row items-center cursor-pointer hover:bg-green-50 transition"
            >
              <!-- Teks -->
              <p class="text-sm">
                <span class="font-medium">
                  {{ transcriptFileName || "Belum ada dokumen" }}
                  <span
                    class="text-[#1091F3]"
                    @click.stop="openTranscriptPreviewPage"
                  >
                    {{ $t("careers.lihat_dokumen") }}
                  </span>
                </span>
              </p>
            </div>
            <button
              aria-label="Transcript"
              @click.stop="handleDeleteFile('transcript')"
              class="absolute right-3 w-auto h-auto p-3 flex items-center bg-[#FFBABA] rounded-[6px] cursor-pointer"
            >
              <div class="w-3.5 h-1 bg-[#FF2020] rounded-full" />
            </button>
          </div>
        </transition>
      </div>
    </div>
    <!-- === •	Sertifikat pelatihan / pengalaman kerja === -->
    <div class="flex flex-col w-full">
      <label
        class="text-[14px] font-[500] text-[#4B5563] dark:text-[#6F6F6F] mb-1"
      >
        {{ $t("careers.training_work_experience_certificates") }}
      </label>
      <div
        class="w-full h-auto flex flex-col lg:grid lg:grid-cols-2 gap-2 lg:gap-5"
      >
        <!-- 🟩 Frame Input Upload -->
        <div class="w-full h-full flex items-center">
          <div
            @click="openExperienceCertificateUpload"
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
              </span>
            </p>
            <!-- Input File Asli (disembunyikan) -->
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              ref="experienceCertificateInput"
              @change="handleExperienceCertificateChange"
              class="hidden"
            />
          </div>
        </div>
        <transition name="fade">
          <div
            v-if="experienceCertificateFileName"
            class="relative w-full h-auto flex items-center"
          >
            <div
              class="w-full h-full border-[1px] border-green-500 rounded-lg p-3 lg:p-2 flex flex-row items-center cursor-pointer hover:bg-green-50 transition"
            >
              <!-- Teks -->
              <p class="text-sm">
                <span class="font-medium">
                  {{ experienceCertificateFileName || "Belum ada dokumen" }}
                  <span
                    class="text-[#1091F3]"
                    @click.stop="openExperienceCertificatePreviewPage"
                  >
                    {{ $t("careers.lihat_dokumen") }}
                  </span>
                </span>
              </p>
            </div>
            <button
              aria-label="Experience"
              @click.stop="handleDeleteFile('experience')"
              class="absolute right-3 w-auto h-auto p-3 flex items-center bg-[#FFBABA] rounded-[6px] cursor-pointer"
            >
              <div class="w-3.5 h-1 bg-[#FF2020] rounded-full" />
            </button>
          </div>
        </transition>
      </div>
    </div>
    <!-- === Portfolio === -->
    <div class="flex flex-col w-full">
      <label
        class="text-[14px] font-[500] text-[#4B5563] dark:text-[#6F6F6F] mb-1"
      >
        {{ $t("careers.portfolio") }}
      </label>
      <div
        class="w-full h-auto flex flex-col lg:grid lg:grid-cols-2 gap-2 lg:gap-5"
      >
        <!-- 🟩 Frame Input Upload -->
        <div class="w-full h-full flex items-center">
          <div
            @click="openPortfolioUpload"
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
              </span>
            </p>
            <!-- Input File Asli (disembunyikan) -->
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              ref="portfolioInput"
              @change="handlePortfolioChange"
              class="hidden"
            />
          </div>
        </div>
        <transition name="fade">
          <div
            v-if="portfolioFileName"
            class="relative w-full h-auto flex items-center"
          >
            <div
              class="w-full h-full border-[1px] border-green-500 rounded-lg p-3 lg:p-2 flex flex-row items-center cursor-pointer hover:bg-green-50 transition"
            >
              <!-- Teks -->
              <p class="text-sm">
                <span class="font-medium">
                  {{ portfolioFileName || "Belum ada dokumen" }}
                  <span
                    class="text-[#1091F3]"
                    @click.stop="openPortfolioPreviewPage"
                  >
                    {{ $t("careers.lihat_dokumen") }}
                  </span>
                </span>
              </p>
            </div>
            <button
              aria-label="Portfolio"
              @click.stop="handleDeleteFile('portfolio')"
              class="absolute right-3 w-auto h-auto p-3 flex items-center bg-[#FFBABA] rounded-[6px] cursor-pointer"
            >
              <div class="w-3.5 h-1 bg-[#FF2020] rounded-full" />
            </button>
          </div>
        </transition>
      </div>
    </div>
    <!-- === Recent formal photograph === -->
    <div class="flex flex-col w-full">
      <label
        class="text-[14px] font-[500] text-[#4B5563] dark:text-[#6F6F6F] mb-1"
      >
        {{ $t("careers.recent_formal_photograph") }}
      </label>
      <div
        class="w-full h-auto flex flex-col lg:grid lg:grid-cols-2 gap-2 lg:gap-5"
      >
        <!-- 🟩 Frame Input Upload -->
        <div class="w-full h-full flex items-center">
          <div
            @click="openPhotoUpload"
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
              </span>
            </p>
            <!-- Input File Asli (disembunyikan) -->
            <input
              type="file"
              accept=".jpg,.jpeg,.png,.webp"
              ref="photoInput"
              @change="handlePhotoChange"
              class="hidden"
            />
          </div>
        </div>
        <transition name="fade">
          <div
            v-if="photoFileName"
            class="relative w-full h-auto flex items-center"
          >
            <div
              class="w-full h-full border-[1px] border-green-500 rounded-lg p-3 lg:p-2 flex flex-row items-center cursor-pointer hover:bg-green-50 transition"
            >
              <!-- Teks -->
              <p class="text-sm">
                <span class="font-medium">
                  {{ photoFileName || "Belum ada dokumen" }}
                  <span
                    class="text-[#1091F3]"
                    @click.stop="openPhotoPreviewPage"
                  >
                    {{ $t("careers.lihat_dokumen") }}
                  </span>
                </span>
              </p>
            </div>
            <button
              aria-label="Photo"
              @click.stop="handleDeleteFile('photo')"
              class="absolute right-3 w-auto h-auto p-3 flex items-center bg-[#FFBABA] rounded-[6px] cursor-pointer"
            >
              <div class="w-3.5 h-1 bg-[#FF2020] rounded-full" />
            </button>
          </div>
        </transition>
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
