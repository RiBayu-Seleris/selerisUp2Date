<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from "vue";
import { useUtilsStore } from "@/stores/utils.js";
import Quill from "quill";
import "quill/dist/quill.snow.css";

const utils = useUtilsStore();

const props = defineProps({
  startDate: String,
  salary: String,
  reasonDescription: String,
});

const emit = defineEmits([
  //
  "update:startDate",
  "update:salary",
  "update:reasonDescription",
  "closeAll",
]);

/* ===========================
   LOCAL REFS
=========================== */
const isStartDateOpen = ref(false);
const startDateWrapper = ref(null);

const reasonDescriptionEditor = ref(null);
const reasonDescription = ref(null);

const toggleStartDate = () => {
  isStartDateOpen.value = !isStartDateOpen.value;
  emit("closeAll");
};

const salaryModel = computed({
  get: () => props.salary ?? "",
  set: (val) => emit("update:salary", val ?? ""),
});

const reasonDescriptionModel = computed({
  get: () => props.reasonDescription ?? "",
  set: (val) => emit("update:reasonDescription", val ?? ""),
});

const startDateModel = computed({
  get: () => props.startDate ?? "",
  set: (val) => emit("update:startDate", val ?? ""),
});

/* ===========================
   SALARY HANDLING
   (use :value + @input OR v-model on computed)
=========================== */
function onSalaryInput(e) {
  const raw = e.target.value.replace(/\D/g, "");
  const formatted = utils.separatorNumber(raw);
  salaryModel.value = formatted;
}

const handleClickOutside = (e) => {
  const startWrapper = startDateWrapper.value;
  if (!startWrapper?.contains(e.target)) {
    isStartDateOpen.value = false;
  }

  emit("closeAll");
};

/* ===========================
   QUILL INIT
=========================== */
onMounted(() => {
  reasonDescription.value = new Quill(reasonDescriptionEditor.value, {
    theme: "snow",
    placeholder: "Write your reason...",
    modules: {
      toolbar: [
        ["bold", "italic", "underline"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["link"],
      ],
    },
  });

  // set initial content from parent (if any)
  if (reasonDescriptionModel.value) {
    reasonDescription.value.root.innerHTML = reasonDescriptionModel.value;
  }

  // Listen changes and emit to parent
  reasonDescription.value.on("text-change", () => {
    const reasonDescriptionvalue = reasonDescription.value.root.innerHTML;
    reasonDescriptionModel.value = reasonDescriptionvalue;

    // if (!value || value === "<p><br></p>") {
    //   contentError.value = "Description cannot be empty";
    // } else {
    //   contentError.value = null;
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
  <h2 class="text-xl font-semibold text-[#195279] mb-4">
    Motivation & Preferences
  </h2>

  <!-- Date of Joining -->
  <div class="flex flex-col w-full">
    <label
      class="text-[14px] font-[500] text-[#4B5563] dark:text-[#6F6F6F] mb-1"
    >
      Date of Joining <span class="text-red-500">*</span>
    </label>
    <div
      ref="startDateWrapper"
      class="col-span-12 sm:col-span-4 h-full rounded-[5px] bg-[#D9D9D9] p-[1px] dark:bg-[#565656] mt-3 sm:mt-0"
    >
      <div
        class="startdate-box relative w-full h-full bg-white dark:bg-[#323232] rounded-[5px]"
      >
        <div
          @click.stop="toggleStartDate"
          class="w-full h-full flex flex-row items-center px-6 sm:px-3 py-2 rounded-[5px] justify-between cursor-pointer select-none"
        >
          <div class="flex items-center">
            <span class="flex items-center text-[14px]">
              {{
                startDateModel
                  ? utils.fromISODate(startDateModel)
                  : "DD/MM/YYYY"
              }}
            </span>
          </div>
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

        <transition name="fade">
          <div
            v-if="isStartDateOpen"
            @click.stop
            class="absolute right-0 top-10 mt-1 w-full rounded-[5px] shadow bg-white dark:bg-[#565656] z-10 p-[1px]"
          >
            <div
              class="w-full h-auto rounded-[5px] bg-white dark:bg-[#17181A] p-3"
            >
              <div class="flex w-auto flex-row items-center gap-x-1">
                <input
                  type="date"
                  v-model="startDateModel"
                  @change="isStartDateOpen = false"
                  @click.stop
                  class="w-full border rounded px-2 py-1 text-[14px] text-[#6C6C6C] dark:text-black"
                />
              </div>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </div>

  <div class="flex flex-col w-full mt-4">
    <label
      class="text-[14px] font-[500] text-[#4B5563] dark:text-[#6F6F6F] mb-1"
    >
      Expected Salary <span class="text-red-500">*</span>
    </label>

    <div class="relative">
      <!-- Prefix "Rp" -->
      <span
        class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-[16px]"
      >
        Rp
      </span>

      <input
        type="text"
        :value="salaryModel"
        @input="onSalaryInput"
        class="w-full pl-10 p-2 rounded-lg border border-gray-300 dark:border-[#FAFAFA]/25 bg-white dark:bg-[#323232] text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#2AB857] focus:border-transparent"
        placeholder="0"
      />
    </div>
  </div>

  <div class="flex flex-col w-full lg:mb-3 xl:mb-4">
    <label
      class="text-[14px] font-[500] text-[#4B5563] dark:text-[#6F6F6F] mb-1"
    >
      Reason for applying to this position <span class="text-red-500">*</span>
    </label>
    <div class="editor-wrapper">
      <div class="quill-container">
        <div
          ref="reasonDescriptionEditor"
          class="w-full p-2 border-gray-300 dark:border-[#FAFAFA]/25 bg-white dark:bg-[#323232] text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#2AB857] focus:border-transparent"
        ></div>
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
