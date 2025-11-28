<script setup>
import { ref, onMounted, onBeforeUnmount, computed, watch } from "vue";
import { useUtilsStore } from "@/stores/utils.js";

const utils = useUtilsStore();

const props = defineProps({
  fullname: String,
  email: String,
  phone: String,
  address: String,
  pob: String,
  dob: String,

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
  "update:pob",
  "update:dob",
  "update:selectedGender", // FIX 2
  "update:selectedCountry", // FIX 3
  "toggleGender",
  "toggleCountry",
  "closeAll",
]);

const genderWrapper = ref(null);
const countryWrapper = ref(null);

const dobWrapper = ref(null);
const isDobOpen = ref(false);

const dobModel = computed({
  get: () => props.dob ?? "",
  set: (val) => emit("update:dob", val ?? ""),
});

const chooseGender = (gender) => {
  emit("update:selectedGender", gender); // kirim object
  isDobOpen.value = false;
  emit("closeAll");
};

const chooseCountry = (country) => {
  emit("update:selectedCountry", country);
  isDobOpen.value = false;
  emit("closeAll");
};

const toggleDob = () => {
  emit("closeAll");
  isDobOpen.value = !isDobOpen.value;
};

function handleClickOutside(e) {
  const dobEl = dobWrapper.value;
  const genderEl = genderWrapper.value;
  const countryEl = countryWrapper.value;

  // Kalau klik di luar DOB → tutup DOB
  if (!dobEl?.contains(e.target)) {
    isDobOpen.value = false;
  }

  // Kalau klik di luar gender & country → tutup dropdown mereka
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

  <div class="w-full h-auto flex flex-col gap-y-3">
    <!-- FULL NAME -->
    <div class="flex flex-col w-full">
      <label
        class="text-[14px] font-[500] text-[#4B5563] dark:text-[#6F6F6F] mb-1"
      >
        Full Name <span class="text-red-500">*</span>
      </label>
      <input
        @input="emit('update:fullname', $event.target.value)"
        name="fullname"
        type="text"
        class="w-full p-2 rounded-lg border border-gray-300 dark:border-[#FAFAFA]/25 bg-white dark:bg-[#323232] text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#2AB857] focus:border-transparent"
        placeholder="Full Name"
        :value="fullname"
      />
    </div>
    <!-- POB DOB -->
    <div class="w-full h-auto flex flex-row gap-x-5">
      <div class="w-full h-full flex flex-col">
        <label
          class="text-[14px] font-[500] text-[#4B5563] dark:text-[#6F6F6F] mb-1"
        >
          Place Of Birth <span class="text-red-500">*</span>
        </label>
        <input
          @input="emit('update:pob', $event.target.value)"
          name="pob"
          type="text"
          class="w-full p-2 rounded-lg border border-gray-300 dark:border-[#FAFAFA]/25 bg-white dark:bg-[#323232] text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#2AB857] focus:border-transparent"
          placeholder="Place Of Birth"
          :value="pob"
        />
      </div>
      <!-- Start Date -->
      <div class="flex flex-col w-full">
        <label
          class="text-[14px] font-[500] text-[#4B5563] dark:text-[#6F6F6F] mb-1"
        >
          Date Of Birth <span class="text-red-500">*</span>
        </label>

        <div
          ref="dobWrapper"
          class="col-span-12 sm:col-span-4 h-full rounded-[5px] bg-[#D9D9D9] p-[1px] dark:bg-[#565656] mt-3 sm:mt-0"
        >
          <div
            class="daterange-box relative w-full h-full bg-white dark:bg-[#323232] rounded-[5px]"
          >
            <div
              @click.stop="toggleDob"
              class="w-full h-full flex flex-row items-center px-6 sm:px-3 py-2 rounded-[5px] justify-between cursor-pointer select-none"
            >
              <div class="flex items-center">
                <span
                  class="flex items-center text-[14px] text-[#4B5563] dark:text-[#6F6F6F]"
                >
                  {{ dobModel ? utils.fromISODate(dobModel) : "DD/MM/YYYY" }}
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
                v-if="isDobOpen"
                @click.stop
                class="absolute right-0 top-10 mt-1 w-full h-full rounded-[5px] shadow bg-white dark:bg-[#565656] z-10 p-[1px]"
              >
                <div
                  class="w-full h-auto rounded-[5px] bg-white dark:bg-[#17181A] p-3"
                >
                  <div class="flex w-auto flex-row items-center gap-x-1">
                    <input
                      type="date"
                      v-model="dobModel"
                      @change="isDobOpen = false"
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
    </div>
    <!-- GENDER DROPDOWN -->
    <div ref="genderWrapper" class="flex flex-col w-full">
      <label
        class="text-[14px] font-[500] text-[#4B5563] dark:text-[#6F6F6F] mb-1"
      >
        Gender <span class="text-red-500">*</span>
      </label>
      <div class="relative w-full">
        <!-- 🔸 Field utama -->
        <div
          class="w-full p-2 rounded-[8px] border-gray-300 bg-white dark:bg-[#323232] border-[0.1px] dark:border-[#FAFAFA]/25 focus:ring-1 focus:ring-[#2AB857] cursor-pointer flex justify-between"
          @click.stop="
            isDobOpen = false;
            emit('toggleGender');
          "
        >
          <span
            :class="{
              'text-[#9CA3AF]': !selectedGender, // abu-abu saat belum pilih
              'text-gray-800': selectedGender, // normal saat sudah pilih
            }"
          >
            {{ selectedGender?.label || "Choose Gender" }}
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
              @click.stop="chooseGender(gender)"
              class="p-2 hover:bg-gray-100 cursor-pointer"
            >
              {{ gender.label }}
            </div>
          </div>
        </transition>
      </div>
    </div>
    <!-- EMAIL + PHONE -->
    <div class="flex gap-x-5">
      <!-- Email -->
      <div class="flex flex-col w-full">
        <label
          class="text-[14px] font-[500] text-[#4B5563] dark:text-[#6F6F6F] mb-1"
        >
          Email <span class="text-red-500">*</span>
        </label>
        <input
          type="email"
          :value="email"
          @input="emit('update:email', $event.target.value)"
          class="w-full p-2 rounded-lg border border-gray-300 dark:border-[#FAFAFA]/25 bg-white dark:bg-[#323232] text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#2AB857] focus:border-transparent"
          placeholder="email@example.com"
        />
      </div>
      <!-- Phone -->
      <div class="flex flex-col w-full">
        <label
          class="text-[14px] font-[500] text-[#4B5563] dark:text-[#6F6F6F] mb-1"
        >
          Phone Number <span class="text-red-500">*</span>
        </label>
        <input
          type="text"
          :value="phone"
          @input="emit('update:phone', $event.target.value)"
          class="w-full p-2 rounded-lg border border-gray-300 dark:border-[#FAFAFA]/25 bg-white dark:bg-[#323232] text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#2AB857] focus:border-transparent"
          placeholder="08xxxx"
        />
      </div>
    </div>

    <!-- ADDRESS -->
    <div class="flex flex-col w-full">
      <label
        class="text-[14px] font-[500] text-[#4B5563] dark:text-[#6F6F6F] mb-1"
      >
        Address <span class="text-red-500">*</span>
      </label>
      <input
        type="text"
        :value="address"
        @input="emit('update:address', $event.target.value)"
        class="w-full p-2 rounded-lg border border-gray-300 dark:border-[#FAFAFA]/25 bg-white dark:bg-[#323232] text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#2AB857] focus:border-transparent"
        placeholder="Address"
      />
    </div>

    <!-- COUNTRY DROPDOWN -->
    <div ref="countryWrapper" class="flex flex-col w-full">
      <label
        class="text-[14px] font-[500] text-[#4B5563] dark:text-[#6F6F6F] mb-1"
      >
        Country <span class="text-red-500">*</span>
      </label>
      <div class="relative w-full">
        <div
          class="w-full p-2 rounded-[8px] border-gray-300 bg-white dark:bg-[#323232] border-[0.1px] dark:border-[#FAFAFA]/25 focus:ring-1 focus:ring-[#2AB857] cursor-pointer flex justify-between"
          @click.stop="
            isDobOpen = false;
            emit('toggleCountry');
          "
        >
          <span
            :class="{
              'text-[#9CA3AF]': !selectedCountry, // warna merah saat belum pilih
              'text-gray-800': selectedCountry, // warna normal saat sudah pilih
            }"
            >{{ selectedCountry?.label || "Select Country" }}</span
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
              <span>{{ cty.label }}</span>
              <img :src="cty.flag" class="w-6 h-4 rounded" />
            </li>
          </ul>
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
