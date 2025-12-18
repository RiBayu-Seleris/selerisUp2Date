<script setup>
import {
  ref,
  onMounted,
  onBeforeUnmount,
  watch,
  reactive,
  computed,
  nextTick,
} from "vue";
import PersonalInfo from "@/components/Careers/StepPersonal.vue";
import Education from "@/components/Careers/StepEducation.vue";
import Experience from "@/components/Careers/StepExperience.vue";
import Skills from "@/components/Careers/StepSkills.vue";
import Motivations from "@/components/Careers/StepMotivations.vue";
import Documents from "@/components/Careers/StepDocuments.vue";
import Declarations from "@/components/Careers/StepDeclarations.vue";

import ReviewData from "@/components/reusable/ModalsCareerApply.vue";

import { useUtilsStore } from "@/stores/utils.js";
import { useJobApplyStore } from "@/stores/jobApply.js";
import axios from "axios";
import { useRouter } from "vue-router";
import CloseIcon from "@/components/icons/CloseIcon.vue";
import Swal from "sweetalert2";

const utils = useUtilsStore();
const jobApply = useJobApplyStore();
const router = useRouter();

const apply_department = computed(() => jobApply.selectedJobData?.department);
const apply_title = computed(() => jobApply.selectedJobData?.title);
const apply_work_type = computed(() => jobApply.selectedJobData?.work_type);
const apply_location = computed(() => jobApply.selectedJobData?.location);

const isModalOpen = ref(false);

const closeModal = () => {
  isModalOpen.value = false;
};

// Kondisi jika Job tidak diambil dari list job
onMounted(() => {
  document.body.style.overflow = "auto"; // perbaiki scroll body
  if (!jobApply.selectedJobId) {
    router.push("/careers");
  }
});

const formData = reactive({
  // STEP PERSONAL
  fullname: "",
  email: "",
  pob: "",
  dob: "",
  phone: "",
  address: "",
  gender: null,
  country: null,

  // STEP EDUCATION
  schoolName: "",
  fieldOfStudy: "",
  education: null,
  startDateEducation: "",
  endDateEducation: "",
  gpaScore: "",
  certificateFileEducation: null,
  certificateFileEducationUrl: "",

  // StepExperience
  lastCompany: "",
  lastPosition: "",
  salary: "",
  startDateExperience: "",
  endDateExperience: "",
  jobDescription: "",
  achievementDescription: "",

  // StepSkills
  technicalSkills: "",
  softSkills: "",
  languageSkills: "",

  // Motivations
  startDateMotivations: "",
  expectedSalary: "",
  reasonDescription: "",

  // Documents
  cvFile: null,
  cvFileUrl: "",
  clFile: null,
  clFileUrl: "",
  diplomaFile: null,
  diplomaFileUrl: "",
  transcriptFile: null,
  transcriptFileUrl: "",
  experienceCertificateFile: null,
  experienceCertificateFileUrl: "",
  portfolioFile: null,
  portfolioFileUrl: "",
  photoFile: null,
  photoFileUrl: "",

  // Declarations
  trueData: false,
  dataPermission: false,
  backgroundCheck: false,
});

const hasExperience = ref(null);

const selectExperience = (value) => {
  const previousValue = hasExperience.value;
  hasExperience.value = value;

  // console.log("CEKKK", hasExperience.value);

  // Jika pilihannya YA dan sama → return
  if (value === true && previousValue === true) {
    return;
  }

  // Jika TIDAK → selalu jalankan nextStep
  if (value === false) {
    formData.lastCompany = "-";
    formData.lastPosition = "-";
    formData.salary = 0;
    formData.startDateExperience = "";
    formData.endDateExperience = "";
    formData.jobDescription = "-";
    formData.achievementDescription = "-";

    nextStep();
    return;
  }

  // Jika YA → reset sekali
  if (value === true) {
    formData.lastCompany = "";
    formData.lastPosition = "";
    formData.salary = "";
    formData.startDateExperience = "";
    formData.endDateExperience = "";
    formData.jobDescription = "";
    formData.achievementDescription = "";
  }
};

/* ============================
   ✅ COUNTRY DROPDOWN
=============================== */
const countries = ref([]);
const showCountryDropdown = ref(false);

function toggleCountry() {
  showCountryDropdown.value = !showCountryDropdown.value;
  if (showCountryDropdown.value) showGenderDropdown.value = false;
}

function selectCountry(country) {
  if (!country) return;
  formData.country = country; // simpan object lengkap
  showCountryDropdown.value = false;
}

/* ============================
   ✅ GENDER DROPDOWN
=============================== */
const showGenderDropdown = ref(false);

const genderOptions = [
  { value: "Male", label: "Laki-laki" },
  { value: "Female", label: "Perempuan" },
];

function toggleGender() {
  showGenderDropdown.value = !showGenderDropdown.value;
  if (showGenderDropdown.value) showCountryDropdown.value = false;
}

function selectGender(gender) {
  if (!gender) return;
  formData.gender = gender; // simpan object lengkap
  showGenderDropdown.value = false;
}

/* ============================
   ✅ Education DROPDOWN
=============================== */
const showEducationDropdown = ref(false);

const educationOptions = [
  { value: "highschool", label: "High School" },
  { value: "diploma", label: "Diploma" },
  { value: "bachelor", label: "Bachelor’s Degree" },
  { value: "master", label: "Master’s Degree" },
  { value: "doctorate", label: "Doctorate / PhD" },
];

function toggleEducation() {
  showEducationDropdown.value = !showEducationDropdown.value;
}

function selectEducation(education) {
  if (!education) return;
  formData.education = education; // simpan object lengkap
  showEducationDropdown.value = false;
}

/* ============================
   ✅ CLICK OUTSIDE HANDLER
=============================== */
function closeAll() {
  showGenderDropdown.value = false;
  showCountryDropdown.value = false;
  showEducationDropdown.value = false;
}

onMounted(async () => {
  try {
    const res = await fetch(
      "https://restcountries.com/v3.1/all?fields=name,flags,cca2"
    );
    const data = await res.json();
    const targetCountries = ["Indonesia"];

    countries.value = data
      .filter((c) => targetCountries.includes(c.name.common))
      .map((c) => ({
        label: c.name.common,
        value: c.cca2.toUpperCase(), // sama seperti gender & education
        flag: `https://flagcdn.com/w40/${c.cca2.toLowerCase()}.png`,
      }))
      .sort((a, b) => a.label.localeCompare(b.label));

    // Set default country
    const defaultCountry = countries.value.find((c) => c.value === "ID");
    if (defaultCountry) selectCountry(defaultCountry);
  } catch (err) {
    console.error("Failed to load countries:", err);
  }
});

/* ============================
   ✅ STEPPER DATA
=============================== */
const steps = [
  { number: "Step 1", title: "Personal" },
  { number: "Step 2", title: "Education" },
  { number: "Step 3", title: "Experience" },
  { number: "Step 4", title: "Skills" },
  { number: "Step 5", title: "Motivations" },
  { number: "Step 6", title: "Documents" },
  { number: "Step 7", title: "Declaration" },
];

const currentStep = ref(1);
const animatedStep = ref(0);
const activeStep = ref(0);

/* ============================
   ✅ STEPPER NAVIGATION
=============================== */
const formTop = ref(null);

const scrollToTop = () => {
  formTop.value?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
};

// const scrollToTop = () => {
//   setTimeout(() => {
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   }, 160); // delay kecil untuk menunggu DOM stabil
// };

const nextStep = () => {
  console.log(formData.dob);
  const isValid = stepValidators[currentStep.value]();
  // console.log(`Validator result: ${currentStep.value}`, isValid);

  if (!isValid) {
    Swal.fire({
      icon: "error",
      title: "Incomplete Data",
      text: "Please complete all required fields before continuing.",
    });
    return;
  }

  if (currentStep.value < steps.length - 1) {
    currentStep.value++;
  }

  scrollToTop();
};

const prevStep = () => {
  if (currentStep.value > 0) currentStep.value--;
  scrollToTop();
};

/* ============================
   ✅ STEPPER ANIMATION
=============================== */
watch(currentStep, (newVal, oldVal) => {
  if (newVal > oldVal) {
    let i = oldVal;
    const interval = setInterval(() => {
      i++;
      animatedStep.value = i;
      if (i >= newVal) clearInterval(interval);
    }, 120);

    setTimeout(() => {
      activeStep.value = newVal;
    }, 700);
  } else if (newVal < oldVal) {
    activeStep.value = newVal;
    let i = oldVal;
    const interval = setInterval(() => {
      i--;
      animatedStep.value = i;
      if (i <= newVal) clearInterval(interval);
    }, 120);
  }
});

/* ============================
   Fungsi Upload File
=============================== */
const uploadFile = async (file, urlField) => {
  try {
    const form = new FormData();
    form.append("file", file);

    const response = await axios.post(
      "https://staging-api-gateway.seleris.id/v1/seleris-credit-cover/web/upload-file",
      form,
      {
        headers: {
          Accept: "application/json",
        },
      }
    );

    formData[urlField] = response.data.data.path;

    // console.log(`Sukses Upload File ${urlField}`, response.data.data.path);
  } catch (err) {
    console.error("Upload failed:", err);
  }
};

/* ============================
   Watch Uploaded File
=============================== */
const fileWatchMap = {
  certificateFileEducation: "certificateFileEducationUrl",
  cvFile: "cvFileUrl",
  clFile: "clFileUrl",
  diplomaFile: "diplomaFileUrl",
  transcriptFile: "transcriptFileUrl",
  experienceCertificateFile: "experienceCertificateFileUrl",
  portfolioFile: "portfolioFileUrl",
  photoFile: "photoFileUrl",
};
watch(
  () => {
    const values = {};
    for (const key in fileWatchMap) {
      values[key] = formData[key]; // ambil file mentah
    }
    return values;
  },
  async (newVal, oldVal) => {
    for (const key in newVal) {
      const file = newVal[key];
      if (file && file !== oldVal[key]) {
        const urlField = fileWatchMap[key];
        await uploadFile(file, urlField);
      }
    }
  }
);

/* ============================
   Step Validator
=============================== */
const stepValidators = [
  // STEP 0 — Personal
  () =>
    Boolean(
      formData.fullname?.trim() &&
        formData.pob?.trim() &&
        formData.dob?.trim() &&
        formData.gender &&
        formData.email?.trim() &&
        formData.phone?.trim() &&
        formData.address?.trim() &&
        formData.country
    ),

  // STEP 1 — Education
  () =>
    Boolean(
      formData.schoolName?.trim() &&
        formData.fieldOfStudy?.trim() &&
        formData.education &&
        formData.startDateEducation &&
        formData.endDateEducation &&
        formData.gpaScore?.trim()
    ),

  // STEP 2 — Experience
  () => {
    // WAJIB pilih dulu Ya / Tidak
    if (hasExperience.value === null || hasExperience.value === undefined) {
      return false;
    }

    // Jika user tidak punya pengalaman → step valid
    if (!hasExperience.value) return true;

    // Jika punya pengalaman → semua field wajib diisi
    return Boolean(
      formData.lastCompany?.trim() &&
        formData.lastPosition?.trim() &&
        formData.startDateExperience &&
        formData.endDateExperience &&
        formData.jobDescription?.trim()
    );
  },

  // STEP 3 — Skills
  () => {
    return Boolean(
      formData.technicalSkills?.trim() &&
        formData.softSkills?.trim() &&
        formData.languageSkills?.trim()
    );
  }, // tidak required

  // STEP 4 — Motivations
  () => {
    return Boolean(
      formData.startDateMotivations.trim() &&
        formData.expectedSalary.trim() &&
        formData.reasonDescription.trim()
    );
  },

  // STEP 5 — Documents
  () => true,

  // STEP 6 — Declaration
  () =>
    Boolean(
      formData.trueData && formData.dataPermission && formData.backgroundCheck
    ),
];

const handleToggleModal = () => {
  const isValid = stepValidators[currentStep.value]();
  // console.log(`Validator result: ${currentStep.value}`, isValid);

  if (!isValid) {
    Swal.fire({
      icon: "error",
      title: "Incomplete Data",
      text: "Please complete all required fields before continuing.",
    });
    return;
  }

  isModalOpen.value = true;
};

/* ============================
   ✅ SUBMIT HANDLER
=============================== */
const handleApply = async () => {
  // Extract semua value dari reactive formData
  const {
    // PERSONAL
    fullname,
    pob,
    dob,
    gender,
    email,
    phone,
    address,
    country,

    // EDUCATION
    schoolName,
    fieldOfStudy,
    education,
    startDateEducation,
    endDateEducation,
    gpaScore,
    certificateFileEducationUrl,

    // EXPERIENCE
    lastCompany,
    lastPosition,
    salary,
    startDateExperience,
    endDateExperience,
    jobDescription,
    achievementDescription,

    // SKILLS
    technicalSkills,
    softSkills,
    languageSkills,

    // MOTIVATIONS
    startDateMotivations,
    expectedSalary,
    reasonDescription,

    // DOCUMENTS
    cvFileUrl,
    clFileUrl,
    diplomaFileUrl,
    transcriptFileUrl,
    experienceCertificateFileUrl,
    portfolioFileUrl,
    photoFileUrl,

    // Declarations
    trueData,
    dataPermission,
    backgroundCheck,
  } = formData;

  const payload = {
    // STEP PERSONAL
    nama_lengkap: fullname || "",
    tempat_lahir: pob || "",
    tanggal_lahir: dob || "",
    jenis_kelamin: gender?.value || "",
    email: email || "",
    no_hp: phone || "",
    alamat: address || "",
    kewarganegaraan: country?.value || "",

    // STEP EDUCATION
    institusi_pendidikan: schoolName || "",
    jurusan: fieldOfStudy || "",
    pendidikan_terakhir: education?.value || "",
    tahun_masuk: startDateEducation
      ? utils.formatToDDMMYYYY(startDateEducation)
      : "",
    tahun_lulus: endDateEducation
      ? utils.formatToDDMMYYYY(endDateEducation)
      : "",
    ipk: Number(gpaScore) || null,
    sertifikasi_tambahan: [certificateFileEducationUrl] || [],

    // StepExperience
    perusahaan_sebelumnya: lastCompany || "",
    jabatan_terakhir: lastPosition || "",

    // Gaji sebelumnya — null jika kosong
    gaji_sebelumnya:
      salary === "" || salary === null || salary === undefined
        ? null
        : Number(utils.cleanNumber(salary)),

    // Periode bekerja — tetap string kosong jika salah satu kosong
    periode_bekerja:
      startDateExperience && endDateExperience
        ? `${utils.fromISODateSlash(
            startDateExperience
          )}-${utils.fromISODateSlash(endDateExperience)}`
        : "",

    job_description: jobDescription || "",
    prestasi: achievementDescription || "",

    // Skills
    keahlian_teknis: utils.formatTextToArray(technicalSkills) || [],
    keahlian_non_teknis: utils.formatTextToArray(softSkills) || [],
    bahasa: utils.formatTextToArray(languageSkills) || [],

    // Motivations
    tanggal_mulai_kerja: startDateMotivations || "",
    expected_salary:
      expectedSalary === "" ||
      expectedSalary === null ||
      expectedSalary === undefined
        ? null
        : Number(utils.cleanNumber(expectedSalary)),
    alasan_melamar: reasonDescription || "",

    // Documents
    file_cv: cvFileUrl || "",
    file_surat_lamaran: clFileUrl || "",
    file_ijazah: diplomaFileUrl || "",
    file_transkrip: transcriptFileUrl || "",
    file_sertifikat: experienceCertificateFileUrl || "",
    file_portofolio: portfolioFileUrl || "",
    foto_diri: photoFileUrl || "",

    // Declarations
    pernyataan_data_benar: trueData || false,
    pernyataan_izin_penggunaan_data: dataPermission || false,
    pernyataan_background_check: backgroundCheck || false,

    // ID JOB
    job_id: jobApply.selectedJobId,
    posisi_dilamar: jobApply.selectedJobData?.title,
  };

  const BASE_URL = "https://alentest.my.id";
  try {
    console.time("SUBMIT");
    const response = await axios.post(`${BASE_URL}/api/pelamar`, payload, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    console.timeEnd("SUBMIT");

    if (response.data.success === true) {
      // ✅ Notifikasi sukses
      Swal.fire({
        icon: "success",
        title: "Successfully Applied!",
        text: "We have received your application. Please wait and check your email regularly.",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didClose: () => {
          document.body.style.overflow = "auto"; // jaga-jaga
          router.push("/careers");
        },
      });
    }
  } catch (error) {
    // console.log("ERROR RESPONSE:", error.response?.data);
  }

  // console.table(payload);
};

watch(
  () => isModalOpen.value,
  (v) => {
    document.body.style.overflow = v ? "hidden" : "auto";
  }
);
</script>

<template>
  <div
    class="w-full flex flex-col px-8 md:px-12 xl:px-24 xl:max-w-6xl mx-auto pt-32 dark:bg-[#17181A]"
  >
    <div class="w-full flex flex-col" ref="formTop">
      <div class="w-full">
        <p class="text-[#195279] font-[500] text-[36px]">
          {{ apply_title }}
        </p>
      </div>
      <div class="w-full my-3">
        <p class="text-[#6E6E6E] font-[400] text-[16px]">
          {{ apply_department }} Department - {{ apply_title }} /
          {{ apply_work_type }} /
          {{ apply_location }}
        </p>
      </div>

      <!-- Stepper -->
      <div class="flex flex-row w-full h-auto mt-20 mb-10 items-center">
        <template v-for="(step, index) in steps" :key="index">
          <div class="relative flex items-center w-auto h-auto">
            <!-- Step Completed -->
            <template v-if="index < currentStep">
              <div
                class="flex items-center justify-center w-8 h-8 rounded-md p-1 text-white transition-all duration-500 ease-in-out transform"
                :class="{
                  'bg-[#2AB857] scale-110 shadow-md': index === activeStep,
                  'bg-[#2AB857]/30': index < activeStep,
                  'bg-[#D9D9D9]': index > activeStep,
                }"
              >
                <div
                  class="flex items-center justify-center w-full h-full rounded-md bg-[#2AB857] text-white transition-transform duration-500 ease-in-out"
                  :class="{ 'scale-105': index === activeStep }"
                >
                  ✓
                </div>
              </div>
            </template>

            <!-- Current Step -->
            <template v-else-if="index === activeStep">
              <div
                class="flex items-center justify-center w-8 h-8 rounded-md bg-[#2AB857] p-1 text-white transition-all duration-500 ease-in-out transform scale-110 shadow-md"
              >
                <div
                  class="flex items-center justify-center w-full h-full rounded-md bg-[#FAFAFA] text-[#2AB857] font-[600] transition-colors duration-500 ease-in-out"
                >
                  <p class="flex items-center justify-center text-center">
                    {{ activeStep + 1 }}
                  </p>
                </div>
              </div>
            </template>

            <!-- Step Not Done -->
            <template v-else>
              <div
                class="flex items-center justify-center w-8 h-8 rounded-md bg-[#D9D9D9] p-[3px] text-white transition-all duration-500 ease-in-out transform"
              >
                <div
                  class="flex items-center justify-center w-full h-full rounded-md bg-[#D9D9D9] border-white border-[5px]"
                />
              </div>
            </template>

            <!-- Label -->
            <div
              class="absolute flex flex-col items-center text-center justify-center w-[100px] top-10 -left-8"
            >
              <span class="font-[500] text-[16px] text-[#195279]">{{
                step.number
              }}</span>
              <p
                class="font-[400] text-[12px] text-[#195279] leading-normal flex items-center text-center justify-center"
              >
                {{ step.title }}
              </p>
            </div>
          </div>

          <!-- Connector Line -->
          <div
            v-if="index !== steps.length - 1"
            class="flex flex-1 items-center self-stretch px-0.5 rounded-full"
          >
            <div
              class="relative w-full h-[3px] rounded-full bg-[#D9D9D9] overflow-hidden"
            >
              <div
                class="absolute top-0 left-0 h-full bg-[#2AB857] transition-all duration-700 ease-in-out"
                :style="{ width: index < animatedStep ? '100%' : '0%' }"
              />
            </div>
          </div>
        </template>
      </div>

      <!-- Form -->
      <div class="mt-16 p-0">
        <div v-if="currentStep === 0">
          <h2 class="text-xl font-semibold text-[#195279] mb-4">
            Personal Info
          </h2>
          <PersonalInfo
            v-model:fullname="formData.fullname"
            v-model:selectedGender="formData.gender"
            v-model:pob="formData.pob"
            v-model:dob="formData.dob"
            v-model:email="formData.email"
            v-model:phone="formData.phone"
            v-model:selectedCountry="formData.country"
            v-model:address="formData.address"
            :countries="countries"
            :genderOptions="genderOptions"
            :isOpenGender="showGenderDropdown"
            :isOpenCountry="showCountryDropdown"
            @toggleGender="toggleGender"
            @toggleCountry="toggleCountry"
            @closeAll="closeAll"
            :required="true"
          />
        </div>
        <div v-if="currentStep === 1">
          <h2 class="text-xl font-semibold text-[#195279] mb-4">Education</h2>
          <Education
            v-model:schoolName="formData.schoolName"
            v-model:fieldOfStudy="formData.fieldOfStudy"
            v-model:selectedEducation="formData.education"
            v-model:gpaScore="formData.gpaScore"
            v-model:startDate="formData.startDateEducation"
            v-model:endDate="formData.endDateEducation"
            v-model:file="formData.certificateFileEducation"
            :educationOptions="educationOptions"
            :isOpenEducation="showEducationDropdown"
            @toggleEducation="toggleEducation"
            @closeAll="closeAll"
          />
        </div>
        <div v-if="currentStep === 2">
          <h2 class="text-xl font-semibold text-[#195279] mb-4">Experience</h2>
          <div class="flex flex-col lg:flex-row w-full h-auto gap-y-3">
            <div class="w-full h-auto flex items-center">
              <p class="text-[16px] lg:text-[20px]">
                Do you have any previous work experience?
              </p>
            </div>
            <div class="flex flex-row w-full h-auto gap-x-5 lg:justify-end">
              <button
                class="w-24 lg:w-28 h-auto py-2 bg-[#AAD7FF] border-[#1091F3] border-[1.5px] text-[#1091F3] rounded-lg font-medium"
                @click="selectExperience(true)"
              >
                Yes
              </button>
              <button
                class="w-24 lg:w-28 h-auto py-2 bg-[#FFBABA] border-[#FF4B4E] border-[1.5px] text-[#FF4B4E] rounded-lg font-medium"
                @click="selectExperience(false)"
              >
                No
              </button>
            </div>
          </div>
          <Experience
            v-if="hasExperience"
            v-model:lastCompany="formData.lastCompany"
            v-model:lastPosition="formData.lastPosition"
            v-model:salary="formData.salary"
            v-model:startDate="formData.startDateExperience"
            v-model:endDate="formData.endDateExperience"
            v-model:jobDescription="formData.jobDescription"
            v-model:achievementDescription="formData.achievementDescription"
          />
        </div>
        <div v-if="currentStep === 3">
          <h2 class="text-xl font-semibold text-[#195279] mb-4">
            Skills & Competencies
          </h2>
          <Skills
            v-model:technicalSkills="formData.technicalSkills"
            v-model:softSkills="formData.softSkills"
            v-model:languageSkills="formData.languageSkills"
          />
        </div>
        <div v-if="currentStep === 4">
          <h2 class="text-xl font-semibold text-[#195279] mb-4">
            Motivation & Preferences
          </h2>
          <Motivations
            v-model:startDate="formData.startDateMotivations"
            v-model:salary="formData.expectedSalary"
            v-model:reasonDescription="formData.reasonDescription"
          />
        </div>
        <div v-if="currentStep === 5">
          <h2 class="text-xl font-semibold text-[#195279] mb-4">
            Additional Documents
          </h2>
          <Documents
            v-model:cvFile="formData.cvFile"
            v-model:clFile="formData.clFile"
            v-model:diplomaFile="formData.diplomaFile"
            v-model:transcriptFile="formData.transcriptFile"
            v-model:experienceCertificateFile="
              formData.experienceCertificateFile
            "
            v-model:portfolioFile="formData.portfolioFile"
            v-model:photoFile="formData.photoFile"
          />
        </div>
        <div v-if="currentStep === 6">
          <h2 class="text-xl font-semibold text-[#195279] mb-4">
            Declaration and Consent
          </h2>
          <Declarations
            v-model:trueData="formData.trueData"
            v-model:dataPermission="formData.dataPermission"
            v-model:backgroundCheck="formData.backgroundCheck"
          />
        </div>

        <div class="flex justify-between mt-8">
          <button
            @click="prevStep"
            class="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg"
            :class="[
              currentStep === 0
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'text-gray-700',
            ]"
            :disabled="currentStep === 0"
          >
            Previous
          </button>

          <button
            v-if="
              (currentStep !== 2 && currentStep < steps.length - 1) ||
              (currentStep === 2 && hasExperience === true)
            "
            @click="nextStep"
            :disabled="!stepValidators[currentStep]"
            class="bg-[#2AB857] text-white px-4 py-2 rounded-lg ml-auto hover:bg-[#259d4c] transition-all"
          >
            Next
          </button>

          <button
            v-else-if="currentStep !== 2"
            class="bg-[#2AB857] text-white px-4 py-2 rounded-lg ml-auto hover:bg-[#259d4c] transition-all"
            @click="handleToggleModal"
          >
            <!-- @click="handleSubmit" -->
            Submit
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal Cheking Data -->
  <transition name="fade">
    <div
      v-if="isModalOpen"
      class="fixed inset-0 z-50 flex flex-col transition-all duration-300 overflow-auto bg-[#1C1B1B]/80"
    >
      <transition name="slide">
        <div class="ml-auto w-full h-auto px-5 py-5 lg:px-20 lg:py-10 z-50">
          <div
            class="w-full h-full bg-white dark:bg-[#17181A] relative z-50 flex flex-col items-center rounded-2xl"
          >
            <!-- MODALS HEADER  -->
            <div
              class="relative w-full h-auto flex flex-col bg-[#2AB857] py-6 px-6 lg:py-10 lg:px-14 rounded-t-2xl"
            >
              <div
                @click="closeModal"
                class="w-auto h-auto absolute top-6 right-6 xl:right-10 bg-[#94FBB5] rounded-full text-[#2AB857] cursor-pointer"
              >
                <CloseIcon class="w-auto h-[28px] lg:h-[36px]" />
              </div>
              <div class="w-full h-auto text-[#FAFAFA]">
                <p class="text-[18px] lg:text-[32px] font-[600]">
                  Review Your Application
                </p>
              </div>
            </div>
            <!-- MODALS BODY -->
            <div
              class="w-full h-auto py-8 px-6 lg:px-14 xl:px-14 grid grid-cols-1 lg:grid-cols-2 gap-5"
            >
              <!-- === Personal Info === -->
              <ReviewData
                title="Personal"
                :items="{
                  Fullname: formData.fullname,
                  'Place Of Birth': formData.pob,
                  'Date Of Birth': utils.fromISODate(formData.dob),
                  Gender: formData.gender.value,
                  Email: formData.email,
                  'Phone Number': formData.phone,
                  Address: formData.address,
                  Country: formData.country.label,
                }"
              />
              <!-- === Education === -->
              <ReviewData
                title="Education"
                :items="{
                  'School Name': formData.schoolName,
                  'Field Of Study': formData.fieldOfStudy,
                  Education: formData.education.value,
                  'Start Date Education': utils.fromISODate(
                    formData.startDateEducation
                  ),
                  'End Date Education': utils.fromISODate(
                    formData.endDateEducation
                  ),
                  'GPA Score': formData.gpaScore,
                  'certificate ':
                    formData.certificateFileEducation?.name || '-',
                }"
              />
              <!-- === Experience === -->
              <ReviewData
                title="Experience"
                :items="{
                  'Last Company': formData.lastCompany,
                  'Last Position': formData.lastPosition,
                  Salary: 'Rp ' + formData.salary,
                  'Start Date': utils.fromISODate(formData.startDateExperience),
                  'End Date': utils.fromISODate(formData.endDateExperience),
                }"
              />
              <!-- 'Job Description': formData.jobDescription,
                  'Achievement Description': formData.achievementDescription, -->

              <!-- === Skills === -->
              <ReviewData
                title="Skills"
                :items="{
                  'Technical Skills': formData.technicalSkills,
                  'Soft Skills': formData.softSkills,
                  Language: formData.languageSkills,
                }"
              />
              <!-- === Motivations === -->
              <ReviewData
                title="Motivations"
                :items="{
                  'Date of Joining': formData.startDateMotivations,
                  'Expected Salary': 'Rp ' + formData.expectedSalary,
                  'Reason for applying': formData.reasonDescription,
                }"
              />
              <!-- === Documents === -->
              <ReviewData
                title="Documents"
                :items="{
                  'Curriculum Vitae (CV) File': formData.cvFile?.name || '-',
                  'Cover Letter File': formData.clFile?.name || '-',
                  'Diploma File': formData.diplomaFile?.name || '-',
                  'Transcript File': formData.transcriptFile?.name || '-',
                  'Experience Certificate File':
                    formData.experienceCertificateFile?.name || '-',
                  'Portfolio File': formData.portfolioFile?.name || '-',
                  'Photo File': formData.photoFile?.name || '-',
                }"
              />
            </div>

            <!-- MODALS FOOTER -->
            <div
              class="relative bottom-0 flex flex-col sm:flex-row sm:justify-between gap-x-10 gap-y-0 w-full h-auto py-5 px-6 lg:px-10 bg-[#D6E8F4] dark:bg-gradient-to-r dark:from-[#424242] dark:from-[75%] dark:to-[#696969] rounded-b-2xl"
            >
              <div class="flex items-center w-full gap-x-4" />

              <div
                class="flex flex-row lg:items-center justify-between lg:justify-end w-full h-auto gap-x-5"
              >
                <button
                  @click="closeModal"
                  class="w-full h-auto lg:w-auto lg:h-auto p-[1px] bg-[#D9D9D9] dark:bg-gradient-to-r dark:from-[#565656] dark:from-0% dark:to-[#BCBCBC] shadow-lg rounded-full cursor-pointer"
                >
                  <div
                    class="w-full h-full flex items-center justify-center px-10 lg:px-14 py-1.5 rounded-full bg-[#FFC9C9] dark:bg-[#E43939] text-[#FF0000]"
                  >
                    <p
                      class="text-[12px] lg:text-[16px] xl:text-[16px] text-[#FF0000] font-500 dark:text-[#FAFAFA]"
                    >
                      Close
                    </p>
                  </div>
                </button>
                <button
                  @click="handleApply"
                  class="w-full h-auto lg:w-auto lg:h-auto p-[1px] bg-[#D9D9D9] dark:bg-gradient-to-r dark:from-[#565656] dark:from-0% dark:to-[#BCBCBC] shadow-lg rounded-full cursor-pointer"
                >
                  <div
                    class="w-full h-full flex items-center justify-center px-10 lg:px-14 py-1.5 rounded-full bg-[#195279] dark:bg-gradient-to-br dark:from-[#195279] dark:from-[50%] dark:to-[#2E97DF] dark:to-[100%]"
                  >
                    <p
                      class="text-[12px] lg:text-[16px] xl:text-[16px] text-[#FAFAFA] font-500 dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-br dark:from-[#FAFAFA] dark:via-[#D4D4D4] dark:to-[#AAAAAA]"
                    >
                      Submit
                    </p>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </transition>
</template>

<style>
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

/* === GLOBAL AUTO-FILL FIX === */
/* Light */
input:-webkit-autofill {
  -webkit-box-shadow: 0 0 0px 1000px #ffffff inset !important;
  -webkit-text-fill-color: #000 !important;
  border: 0.25px solid #d1d5db !important;
}
/* Light Focus */
input:-webkit-autofill:focus {
  -webkit-box-shadow: 0 0 0 1px #2ab857 inset, 0 0 0px 1000px #ffffff inset !important;
  -webkit-text-fill-color: #000 !important;
}
/* Dark */
.dark input:-webkit-autofill {
  -webkit-box-shadow: 0 0 0px 1000px #323232 inset !important;
  -webkit-text-fill-color: #fafafa !important;
  border: 0.25px solid rgba(250, 250, 250, 0.25) !important;
}
/* Dark Focus */
.dark input:-webkit-autofill:focus {
  -webkit-box-shadow: 0 0 0 1px #2ab857 inset, 0 0 0px 1000px #323232 inset !important;
  -webkit-text-fill-color: #fafafa !important;
}

.swal2-shown {
  padding-right: 0 !important;
}
</style>
