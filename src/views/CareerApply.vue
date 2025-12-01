<script setup>
import {
  ref,
  onMounted,
  onBeforeUnmount,
  watch,
  reactive,
  computed,
} from "vue";
import PersonalInfo from "@/components/Careers/StepPersonal.vue";
import Education from "@/components/Careers/StepEducation.vue";
import Experience from "@/components/Careers/StepExperience.vue";
import Skills from "@/components/Careers/StepSkills.vue";
import Motivations from "@/components/Careers/StepMotivations.vue";
import Documents from "@/components/Careers/StepDocuments.vue";
import Declarations from "@/components/Careers/StepDeclarations.vue";

import { useUtilsStore } from "@/stores/utils.js";
import { useJobApplyStore } from "@/stores/jobApply.js";
import axios from "axios";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";

const utils = useUtilsStore();
const jobApply = useJobApplyStore();
const router = useRouter();

const apply_department = computed(() => jobApply.selectedJobData?.department);
const apply_title = computed(() => jobApply.selectedJobData?.title);
const apply_work_type = computed(() => jobApply.selectedJobData?.work_type);
const apply_location = computed(() => jobApply.selectedJobData?.location);

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
  { value: "male", label: "Laki-laki" },
  { value: "female", label: "Perempuan" },
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
    const targetCountries = ["Indonesia", "Malaysia", "Singapore"];

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

const currentStep = ref(0);
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

const nextStep = () => {
  if (currentStep.value < steps.length - 1) currentStep.value++;
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

    console.log(`Sukses Upload File ${urlField}`, response.data.data.path);
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
   ✅ SUBMIT HANDLER
=============================== */
const handleSubmit = async () => {
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
    const response = await axios.post(`${BASE_URL}/api/pelamar`, payload, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    console.log("ini response dari api", response.data.data);
    if (response.data.success === true) {
      // ✅ Notifikasi sukses
      Swal.fire({
        icon: "success",
        title: "Successfully Applied!",
        text: "We have received your application. Please wait and check your email regularly.",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      }).then(() => router.push("/career"));
    }
  } catch (error) {
    console.log("ERROR RESPONSE:", error.response?.data);
  }

  // console.table(payload);
};
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
          />
        </div>
        <div v-if="currentStep === 1">
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
          <Experience
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
          <Skills
            v-model:technicalSkills="formData.technicalSkills"
            v-model:softSkills="formData.softSkills"
            v-model:languageSkills="formData.languageSkills"
          />
        </div>
        <div v-if="currentStep === 4">
          <Motivations
            v-model:startDate="formData.startDateMotivations"
            v-model:salary="formData.expectedSalary"
            v-model:reasonDescription="formData.reasonDescription"
          />
        </div>
        <div v-if="currentStep === 5">
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
            v-if="currentStep < steps.length - 1"
            @click="nextStep"
            class="bg-[#2AB857] text-white px-4 py-2 rounded-lg ml-auto hover:bg-[#259d4c] transition-all"
          >
            Next
          </button>

          <button
            v-else
            class="bg-[#2AB857] text-white px-4 py-2 rounded-lg ml-auto hover:bg-[#259d4c] transition-all"
            @click="handleSubmit"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
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
</style>
