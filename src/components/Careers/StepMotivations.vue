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
  <div class="w-full h-auto flex flex-col gap-y-3">
    <!-- Date of Joining -->
    <div class="w-full h-auto grid grid-cols-2 gap-x-10">
      <div class="flex flex-col w-full">
        <label
          class="text-[14px] font-[500] text-[#4B5563] dark:text-[#6F6F6F] lg:mb-1"
        >
          Date of Joining <span class="text-red-500">*</span>
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
              class="w-full bg-white p-2 dark:bg-[#323232] rounded-lg text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#2AB857] focus:border-transparent appearance-none [&::-webkit-calendar-picker-indicator]:opacity-60 dark:[&::-webkit-calendar-picker-indicator]:invert"
            />
          </div>
        </div>
      </div>
      <div class="flex flex-col w-full">
        <label
          class="text-[14px] font-[500] text-[#4B5563] dark:text-[#6F6F6F] lg:mb-1"
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
            @keypress="allowOnlyNumber"
            class="w-full pl-10 p-2 rounded-lg border border-gray-300 dark:border-[#FAFAFA]/25 bg-white dark:bg-[#323232] text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#2AB857] focus:border-transparent"
            placeholder="0"
          />
        </div>
      </div>
    </div>
    <div class="flex flex-col w-full lg:mb-3 xl:mb-4">
      <label
        class="text-[14px] font-[500] text-[#4B5563] dark:text-[#6F6F6F] lg:mb-1"
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
