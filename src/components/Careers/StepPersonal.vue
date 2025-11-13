<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";

const props = defineProps({
  selectedGender: String,
  selectedCountry: Object,
  countries: Array,
  genderOptions: Array,
  isOpenGender: Boolean,
  isOpenCountry: Boolean,
});

const emit = defineEmits([
  "update:gender",
  "update:country",
  "toggleGender",
  "toggleCountry",
  "closeAll", // emit baru untuk menutup semuanya
]);

const genderWrapper = ref(null);
const countryWrapper = ref(null);

const chooseGender = (value) => {
  emit("update:gender", value);
  emit("closeAll"); // tutup semua dropdown setelah pilih
};

const chooseCountry = (country) => {
  emit("update:country", country);
  emit("closeAll"); // tutup semua dropdown setelah pilih
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
  <h2 class="text-xl font-semibold text-[#195279] mb-4">Personal Info</h2>

  <!-- FULL NAME -->
  <div class="flex flex-col w-full lg:mb-3 xl:mb-4">
    <label class="text-[14px] font-[500] text-[#4B5563] dark:text-[#6F6F6F]">
      Full Name <span class="text-red-500">*</span>
    </label>
    <input
      name="fullname"
      type="text"
      class="w-full p-2 rounded-lg border border-gray-300 dark:border-[#FAFAFA]/25 bg-white dark:bg-[#323232] text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#2AB857] focus:border-transparent"
      placeholder="Full Name"
    />
  </div>

  <!-- GENDER DROPDOWN -->
  <div
    ref="genderWrapper"
    class="flex flex-col w-full lg:mb-3 xl:mb-4"
    @click.stop
  >
    <label class="text-[14px] font-[500] text-[#4B5563] dark:text-[#6F6F6F]">
      Gender <span class="text-red-500">*</span>
    </label>

    <div class="relative w-full">
      <!-- 🔸 Field utama -->
      <div
        class="w-full p-2 rounded-[8px] border-gray-300 bg-white dark:bg-[#323232] border-[0.1px] dark:border-[#FAFAFA]/25 focus:ring-1 focus:ring-[#2AB857] cursor-pointer flex justify-between"
        @click.stop="emit('toggleGender')"
      >
        <span
          :class="{
            'text-[#9CA3AF]': !selectedGender, // abu-abu saat belum pilih
            'text-gray-800': selectedGender, // normal saat sudah pilih
          }"
        >
          {{ selectedGender || "Choose Gender" }}
        </span>

        <svg
          class="w-5 h-auto transition-transform"
          :class="{ 'rotate-180': props.isOpenGender }"
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

      <!-- 🔸 Dropdown list -->
      <transition name="fade">
        <div
          v-if="props.isOpenGender"
          class="absolute w-full bg-white mt-1 shadow-lg rounded-md border z-10"
        >
          <div
            v-for="gender in genderOptions"
            :key="gender.value"
            @click.stop="chooseGender(gender.label)"
            class="p-2 hover:bg-gray-100 cursor-pointer"
          >
            {{ gender.label }}
          </div>
        </div>
      </transition>
    </div>
  </div>

  <!-- EMAIL + PHONE -->
  <div class="flex gap-10">
    <!-- Email -->
    <div class="flex flex-col w-full lg:mb-3 xl:mb-4">
      <label class="text-[14px] font-[500] text-[#4B5563] dark:text-[#6F6F6F]">
        Email <span class="text-red-500">*</span>
      </label>

      <input
        type="email"
        class="w-full p-2 rounded-lg border border-gray-300 dark:border-[#FAFAFA]/25 bg-white dark:bg-[#323232] text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#2AB857] focus:border-transparent"
        placeholder="email@example.com"
      />
    </div>

    <!-- Phone -->
    <div class="flex flex-col w-full lg:mb-3 xl:mb-4">
      <label class="text-[14px] font-[500] text-[#4B5563] dark:text-[#6F6F6F]">
        Phone Number <span class="text-red-500">*</span>
      </label>

      <input
        type="text"
        class="w-full p-2 rounded-lg border border-gray-300 dark:border-[#FAFAFA]/25 bg-white dark:bg-[#323232] text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#2AB857] focus:border-transparent"
        placeholder="08xxxx"
      />
    </div>
  </div>

  <!-- COUNTRY DROPDOWN -->
  <div
    ref="countryWrapper"
    class="flex flex-col w-full lg:mb-3 xl:mb-4"
    @click.stop
  >
    <label class="text-[14px] font-[500] text-[#4B5563] dark:text-[#6F6F6F]">
      Country <span class="text-red-500">*</span>
    </label>

    <div class="relative w-full">
      <div
        class="w-full p-2 rounded-[8px] border-gray-300 bg-white dark:bg-[#323232] border-[0.1px] dark:border-[#FAFAFA]/25 focus:ring-1 focus:ring-[#2AB857] cursor-pointer flex justify-between"
        @click.stop="emit('toggleCountry')"
      >
        <span
          :class="{
            'text-[#9CA3AF]': !selectedCountry, // warna merah saat belum pilih
            'text-gray-800': selectedCountry, // warna normal saat sudah pilih
          }"
          >{{ selectedCountry?.name || "Select Country" }}</span
        >

        <img
          v-if="selectedCountry"
          :src="selectedCountry.flag"
          class="w-8 h-auto rounded border"
        />
      </div>

      <transition name="fade">
        <ul
          v-if="props.isOpenCountry"
          class="absolute w-full max-h-40 overflow-auto mt-2 bg-white shadow-md rounded-md z-20"
        >
          <li
            v-for="cty in countries"
            :key="cty.code"
            @click="chooseCountry(cty)"
            class="flex justify-between px-3 py-2 hover:bg-gray-100 cursor-pointer"
          >
            <span>{{ cty.name }}</span>
            <img :src="cty.flag" class="w-6 h-4 rounded" />
          </li>
        </ul>
      </transition>
    </div>
  </div>

  <!-- ADDRESS -->
  <div class="flex flex-col w-full lg:mb-3 xl:mb-4">
    <label class="text-[14px] font-[500] text-[#4B5563] dark:text-[#6F6F6F]">
      Address <span class="text-red-500">*</span>
    </label>

    <input
      type="text"
      class="w-full p-2 rounded-lg border border-gray-300 dark:border-[#FAFAFA]/25 bg-white dark:bg-[#323232] text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#2AB857] focus:border-transparent"
      placeholder="Address"
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
