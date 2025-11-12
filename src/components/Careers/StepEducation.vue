<script setup>
import { ref, defineProps, defineEmits, onMounted, onBeforeUnmount } from "vue";

const props = defineProps({
  selectedEducation: String,
  educationOptions: Array,
  isOpenEducation: Boolean,
});

const emit = defineEmits([
  "update:education",
  "toggleEducation",
  "closeAll", // emit baru untuk menutup semuanya
]);

const educationWrapper = ref(null);

const chooseEducation = (value) => {
  emit("update:education", value);
  emit("closeAll"); // tutup semua dropdown setelah pilih
};

function handleClickOutside(e) {
  const educationEl = educationWrapper.value;

  if (!educationEl?.contains(e.target)) {
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
  <h2 class="text-xl font-semibold text-[#195279] mb-4">Education</h2>

  <div class="flex gap-10">
    <!-- Highest Education DROPDOWN -->
    <div ref="educationWrapper" class="flex flex-col w-full lg:mb-3 xl:mb-4">
      <label class="text-[14px] font-[500] text-[#4B5563] dark:text-[#6F6F6F]">
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
              'text-gray-800': selectedEducation, // warna normal saat sudah pilih
            }"
            >{{ selectedEducation || "Choose Last Education" }}</span
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
            class="absolute w-full bg-white mt-1 shadow-lg rounded-md border z-10"
          >
            <div
              v-for="education in educationOptions"
              :key="education.value"
              @click="chooseEducation(education.label)"
              class="p-2 hover:bg-gray-100 cursor-pointer"
            >
              {{ education.label }}
            </div>
          </div>
        </transition>
      </div>
    </div>

    <!-- Phone -->
    <div class="flex flex-col w-full lg:mb-3 xl:mb-4">
      <label class="text-[14px] font-[500] text-[#4B5563] dark:text-[#6F6F6F]">
        School / University Name <span class="text-red-500">*</span>
      </label>

      <input
        type="text"
        class="w-full p-2 rounded-[8px] border-gray-300 dark:bg-[#323232] border-[0.1px] dark:border-[#FAFAFA]/25"
        placeholder="School/University Name"
      />
    </div>
  </div>
  <div class="flex flex-col w-full lg:mb-3 xl:mb-4">
    <label class="text-[14px] font-[500] text-[#4B5563] dark:text-[#6F6F6F]">
      Field of Study <span class="text-red-500">*</span>
    </label>

    <input
      type="text"
      class="w-full p-2 rounded-[8px] border-gray-300 dark:bg-[#323232] border-[0.1px] dark:border-[#FAFAFA]/25"
      placeholder="e.g., Computer Science"
    />
  </div>
  <div class="flex flex-col w-full lg:mb-3 xl:mb-4">
    <label class="text-[14px] font-[500] text-[#4B5563] dark:text-[#6F6F6F]">
      GPA (Grade Point Average) <span class="text-red-500">*</span>
    </label>

    <input
      type="text"
      class="w-full p-2 rounded-[8px] border-gray-300 dark:bg-[#323232] border-[0.1px] dark:border-[#FAFAFA]/25"
      placeholder="e.g., 3.85"
    />
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
