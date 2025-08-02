<!-- src/components/CountrySelector.vue -->
<script setup>
import { ref, onMounted, watch, defineEmits, defineProps } from "vue";

const emit = defineEmits(["update:modelValue"]);
const props = defineProps({
  modelValue: Object,
});

const showDropdown = ref(false);
const countries = ref([]);
const selected = ref(props.modelValue || null);

function selectCountry(country) {
  selected.value = country;
  emit("update:modelValue", country);
  showDropdown.value = false;
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

    // Update selected if modelValue belum ada
    if (!selected.value) {
      const defaultCountry = countries.value.find((c) => c.code === "ID");
      selectCountry(defaultCountry);
    }
  } catch (error) {
    console.error("Failed to load countries", error);
  }
});

watch(
  () => props.modelValue,
  (newVal) => {
    selected.value = newVal;
  }
);
</script>

<template>
  <div class="w-full flex flex-col space-y-1">
    <label
      class="text-sm font-medium text-gray-700 dark:text-white"
      for="Country"
      >Country</label
    >

    <div
      class="relative w-full p-2 rounded-[8px] border border-gray-300 dark:bg-[#323232] dark:border-[#FAFAFA]/25 cursor-pointer"
      @click="showDropdown = !showDropdown"
    >
      <div class="flex items-center justify-between">
        <!-- Text -->
        <div class="text-sm dark:text-white">
          {{ selected?.name || "Select Country" }}
        </div>

        <!-- Flag & Dropdown Icon -->
        <div class="flex items-center gap-2">
          <img
            v-if="selected"
            :src="selected.flag"
            :alt="selected.code"
            class="w-5 h-5 rounded-full border border-gray-300"
          />
        </div>
      </div>

      <!-- Dropdown -->
      <ul
        v-if="showDropdown"
        class="left-0 top-full mt-3 w-full max-h-40 overflow-auto rounded-md"
      >
        <li
          v-for="country in countries"
          :key="country.code"
          @click.stop="selectCountry(country)"
          class="flex items-center gap-2 px-3 py-2 cursor-pointer"
        >
          <img :src="country.flag" class="w-5 h-5 rounded-full" />
          <span class="text-sm">{{ country.name }}</span>
        </li>
      </ul>
    </div>
    <!-- Tambahkan di bawah dropdown (dalam <template>) -->
    <input type="hidden" name="country" :value="selected?.code" />
  </div>
</template>
