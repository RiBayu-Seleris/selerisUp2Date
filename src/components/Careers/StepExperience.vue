<script setup>
import { ref, onMounted, onBeforeUnmount, watch, computed } from "vue";
import { useUtilsStore } from "@/stores/utils.js";
import Quill from "quill";
import "quill/dist/quill.snow.css";

const utils = useUtilsStore();

const props = defineProps({
  lastCompany: String,
  lastPosition: String,
  salary: String,
  startDate: String,
  endDate: String,
  jobDescription: String,
  achievementDescription: String,
});

const emit = defineEmits([
  "update:lastCompany",
  "update:lastPosition",
  "update:salary",
  "update:startDate",
  "update:endDate",
  "update:jobDescription",
  "update:achievementDescription",
  "closeAll",
]);

// toggleStartDate;
// isStartDateOpen;

const jobDescriptionEditor = ref(null);
const jobDescriptionQuill = ref(null);
const jobDescriptionError = ref(null);

const achievementDescriptionEditor = ref(null);
const achievementDescriptionQuill = ref(null);
const achievementDescriptionError = ref(null);

const startDateWrapper = ref(null);
const isStartDateOpen = ref(false);

const endDateWrapper = ref(null);
const isEndDateOpen = ref(false);

const salaryModel = computed({
  get: () => props.salary ?? "",
  set: (val) => emit("update:salary", val ?? ""),
});

const startDateModel = computed({
  get: () => props.startDate ?? "",
  set: (val) => emit("update:startDate", val ?? ""),
});

const endDateModel = computed({
  get: () => props.endDate ?? "",
  set: (val) => emit("update:endDate", val ?? ""),
});

const jobDescriptionModel = computed({
  get: () => props.jobDescription ?? "",
  set: (val) => emit("update:jobDescription", val ?? ""),
});

const achievementDescriptionModel = computed({
  get: () => props.achievementDescription ?? "",
  set: (val) => emit("update:achievementDescription", val ?? ""),
});

function onSalaryInput(e) {
  const raw = e.target.value.replace(/\D/g, "");
  const formatted = utils.separatorNumber(raw);
  // write to computed -> emits update:salary
  salaryModel.value = formatted;
}

function allowOnlyNumber(e) {
  const char = e.key;

  // Izinkan special keys: Backspace, Delete, Arrow keys, Tab
  if (["Backspace", "Delete", "ArrowLeft", "ArrowRight"].includes(char)) {
    return;
  }

  // Jika bukan angka, cegah input
  if (!/^\d$/.test(char)) {
    e.preventDefault();
  }
}

const toggleStartDate = () => {
  isStartDateOpen.value = !isStartDateOpen.value;
  emit("closeAll");
  isEndDateOpen.value = false;
};

const toggleEndDate = () => {
  isEndDateOpen.value = !isEndDateOpen.value;
  isStartDateOpen.value = false;
  emit("closeAll");
};

function handleClickOutside(e) {
  const startWrapper = startDateWrapper.value;
  const endWrapper = endDateWrapper.value;

  if (!startWrapper?.contains(e.target)) {
    isStartDateOpen.value = false;
  }
  if (!endWrapper?.contains(e.target)) {
    isEndDateOpen.value = false;
  }

  emit("closeAll");
}

// Job Description
onMounted(() => {
  jobDescriptionQuill.value = new Quill(jobDescriptionEditor.value, {
    theme: "snow",
    placeholder: "Write your job description...",
    modules: {
      toolbar: [
        ["bold", "italic", "underline"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["link"],
      ],
    },
  });

  // set initial content from parent (if any)
  if (jobDescriptionModel.value) {
    jobDescriptionQuill.value.root.innerHTML = jobDescriptionModel.value;
  }

  // Listen changes and emit to parent
  jobDescriptionQuill.value.on("text-change", () => {
    const jobDescriptionValue = jobDescriptionQuill.value.root.innerHTML;
    jobDescriptionModel.value = jobDescriptionValue;

    // if (!jobDescriptionValue || jobDescriptionValue === "<p><br></p>") {
    //   jobDescriptionError.value = "Description cannot be empty";
    // } else {
    //   jobDescriptionError.value = null;
    // }
  });
});

onMounted(() => {
  achievementDescriptionQuill.value = new Quill(
    achievementDescriptionEditor.value,
    {
      theme: "snow",
      placeholder: `Please write your achievements in your last company, or type '-' if you have none.`,
      toolbar: [
        ["bold", "italic", "underline"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["link"],
      ],
    },
  );

  if (achievementDescriptionModel.value) {
    achievementDescriptionQuill.value.root.innerHTML =
      achievementDescriptionModel.value;
  }

  achievementDescriptionQuill.value.on("text-change", () => {
    const achievementDescriptionValue =
      achievementDescriptionQuill.value.root.innerHTML;
    achievementDescriptionModel.value = achievementDescriptionValue;

    // if (!achievementDescriptionValue || achievementDescriptionValue === "<p><br></p>") {
    //   achievementDescriptionError.value = "Achievement cannot be empty";
    // } else {
    //   achievementDescriptionError.value = null;
    // }
  });
});

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>

<template>
  <div class="w-full h-auto flex flex-col mt-5 gap-y-3">
    <div class="flex flex-col w-full">
      <label
        class="text-[14px] font-[500] text-[#4B5563] dark:text-[#6F6F6F] mb-1"
      >
        {{ $t("careers.last_company") }} <span class="text-red-500">*</span>
      </label>
      <input
        name="lastcompany"
        :value="lastCompany"
        @input="emit('update:lastCompany', $event.target.value)"
        type="text"
        class="w-full p-2 rounded-lg border border-gray-300 dark:border-[#FAFAFA]/25 bg-white dark:bg-[#323232] text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#2AB857] focus:border-transparent"
        :placeholder="$t('careers.last_company')"
      />
    </div>

    <div class="flex flex-col w-full">
      <label
        class="text-[14px] font-[500] text-[#4B5563] dark:text-[#6F6F6F] mb-1"
      >
        {{ $t("careers.last_position") }} <span class="text-red-500">*</span>
      </label>
      <input
        name="lastPosition"
        :value="lastPosition"
        @input="emit('update:lastPosition', $event.target.value)"
        type="text"
        class="w-full p-2 rounded-lg border border-gray-300 dark:border-[#FAFAFA]/25 bg-white dark:bg-[#323232] text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#2AB857] focus:border-transparent"
        :placeholder="$t('careers.last_position')"
      />
    </div>

    <div class="flex gap-10">
      <div class="flex flex-col w-full">
        <label
          class="text-[14px] font-[500] text-[#4B5563] dark:text-[#6F6F6F] mb-1"
        >
          {{ $t("careers.start_date_work") }}
          <span class="text-red-500">*</span>
        </label>
        <div
          class="col-span-12 sm:col-span-4 h-full rounded-lg bg-[#D9D9D9] p-[1px] dark:bg-[#565656] mt-0"
        >
          <div
            class="w-full h-full bg-white dark:bg-[#323232] rounded-lg text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
          >
            <input
              type="date"
              v-model="startDateModel"
              class="w-full bg-white dark:bg-[#323232] p-2 rounded-lg text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#2AB857] focus:border-transparent appearance-none [&::-webkit-calendar-picker-indicator]:opacity-60 dark:[&::-webkit-calendar-picker-indicator]:invert"
            />
          </div>
        </div>
      </div>

      <div class="flex flex-col w-full">
        <label
          class="text-[14px] font-[500] text-[#4B5563] dark:text-[#6F6F6F] mb-1"
        >
          {{ $t("careers.end_date_work") }} <span class="text-red-500">*</span>
        </label>
        <div
          class="col-span-12 sm:col-span-4 h-full rounded-lg bg-[#D9D9D9] p-[1px] dark:bg-[#565656] mt-0"
        >
          <div
            class="w-full h-full bg-white dark:bg-[#323232] rounded-lg text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
          >
            <input
              type="date"
              v-model="endDateModel"
              class="w-full bg-white p-2 dark:bg-[#323232] rounded-lg text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#2AB857] focus:border-transparent appearance-none [&::-webkit-calendar-picker-indicator]:opacity-60 dark:[&::-webkit-calendar-picker-indicator]:invert"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="flex flex-col w-full">
      <label
        class="text-[14px] font-[500] text-[#4B5563] dark:text-[#6F6F6F] mb-1"
      >
        {{ $t("careers.current_salary") }} <span class="text-red-500">*</span>
      </label>
      <div class="relative">
        <span
          class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-[16px]"
        >
          Rp
        </span>
        <input
          type="text"
          :value="salaryModel"
          @input="onSalaryInput"
          @keypress="allowOnlyNumber"
          class="w-full pl-10 p-2 rounded-lg border border-gray-300 dark:border-[#FAFAFA]/25 bg-white dark:bg-[#323232] text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#2AB857] focus:border-transparent"
          placeholder="0"
        />
      </div>
    </div>

    <div class="flex flex-col w-full">
      <label
        class="text-[14px] font-[500] text-[#4B5563] dark:text-[#6F6F6F] mb-1"
      >
        {{ $t("careers.job_description") }} <span class="text-red-500">*</span>
      </label>
      <div class="editor-wrapper">
        <div class="quill-container">
          <div
            ref="jobDescriptionEditor"
            class="w-full p-2 border-gray-300 dark:border-[#FAFAFA]/25 bg-white dark:bg-[#323232] text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#2AB857] focus:border-transparent"
          ></div>
        </div>
      </div>
    </div>

    <div class="flex flex-col w-full">
      <label
        class="text-[14px] font-[500] text-[#4B5563] dark:text-[#6F6F6F] mb-1"
      >
        {{ $t("misc.achievements") }}
        <span class="text-red-500">*</span>
      </label>
      <div class="editor-wrapper">
        <div class="quill-container">
          <div
            ref="achievementDescriptionEditor"
            class="w-full p-2 border-gray-300 dark:border-[#FAFAFA]/25 bg-white dark:bg-[#323232] text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#2AB857] focus:border-transparent"
          ></div>
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

.quill-container {
  border: 1px solid rgb(209 213 219);
  border-radius: 12px;
  overflow: hidden;
  transition: border-color 0.2s;
  background: rgb(var(--v-theme-surface));
}

.quill-container:focus-within {
  border-color: green;
}

.quill-editor {
  min-height: 100px;
}
</style>
