<!-- src/components/CountrySelect.vue -->
<script setup>
import { ref, onMounted, watch } from "vue";

const emit = defineEmits(["update:modelValue", "open"]);
const props = defineProps({
  modelValue: Object,
  isOpen: Boolean,
});

const countries = ref([]);
const selectedCountry = ref(props.modelValue || null);

function chooseCountry(country) {
  selectedCountry.value = country;
  emit("update:modelValue", country);
  emit("open", null); // 🔥 tambahkan ini untuk menutup dropdown
}

function toggleDropdown() {
  emit("open", "country");
}

onMounted(async () => {
  try {
    const res = await fetch(
      "https://restcountries.com/v3.1/all?fields=name,flags,cca2"
    );
    const data = await res.json();
    const targetCountries = ["Indonesia", "Malaysia", "Singapore"];

    countries.value = data
      .filter((country) => targetCountries.includes(country.name.common))
      .map((country) => ({
        name: country.name.common,
        code: country.cca2.toUpperCase(),
        flag: `https://flagcdn.com/w40/${country.cca2.toLowerCase()}.png`,
      }))
      .sort((a, b) => a.name.localeCompare(b.name));

    if (!selectedCountry.value) {
      const defaultCountry = countries.value.find((c) => c.code === "ID");
      chooseCountry(defaultCountry);
    }
  } catch (error) {
    console.error("Failed to load countries", error);
  }
});

watch(
  () => props.modelValue,
  (newVal) => {
    selectedCountry.value = newVal;
  }
);
</script>

<template>
  <div class="flex flex-col w-full country-selector-wrapper">
    <label class="text-[14px] font-[500] text-[#4B5563] dark:text-[#6F6F6F]">
      Country <span class="text-red-500">*</span>
    </label>

    <div class="relative w-full">
      <div
        class="w-full p-2 rounded-[8px] border-gray-300 bg-white dark:bg-[#323232] border-[0.1px] dark:border-[#FAFAFA]/25 focus:ring-1 focus:ring-[#2AB857] cursor-pointer flex justify-between items-center"
        @click.stop="toggleDropdown"
      >
        <span>{{ selectedCountry?.name || "Select Country" }}</span>

        <img
          v-if="selectedCountry"
          :src="selectedCountry.flag"
          :alt="selectedCountry.code"
          class="w-8 h-auto rounded border"
        />
      </div>

      <transition name="fade">
        <ul
          v-if="props.isOpen"
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

    <input type="hidden" name="country" :value="selectedCountry?.code" />
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
