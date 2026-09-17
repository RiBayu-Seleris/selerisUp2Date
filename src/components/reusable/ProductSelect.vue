<script setup>
import { computed, ref, watch } from "vue";
import { productList } from "@/Data/ProductList";

const emit = defineEmits(["update:modelValue", "open"]);
const props = defineProps({
  modelValue: [String, Number, Object],
  isOpen: Boolean,
});

const selectedProduct = ref(props.modelValue || null);

// Daftarnya diambil dari sumber yang sama dengan menu Products di navbar.
// Sebelumnya ditulis ulang di sini, dan keduanya sudah sempat berbeda:
// dropdown ini masih memuat "Seleris Care" dan "Seleris Cough" — yang di
// navbar sudah diganti "Selica" dan dikomentari — sekaligus melewatkan
// produk "Credit".
//
// id dipakai sebagai nilai yang dikirim; diturunkan dari url produknya
// supaya tetap stabil walau nama tampilannya kelak diubah.
const products = computed(() =>
  productList.map((prd) => ({
    id: prd.url.replace(/^https?:\/\//, "").replace(/[^a-zA-Z0-9]+/g, "-").replace(/^-|-$/g, ""),
    name: prd.name,
  })),
);

function chooseProduct(product) {
  selectedProduct.value = product;
  emit("update:modelValue", product);
  emit("open", null); // 🔥 tambahkan ini untuk menutup dropdown
}

function toggleDropdown() {
  emit("open", "product");
}

watch(
  () => props.modelValue,
  (newVal) => {
    selectedProduct.value = newVal;
  },
);
</script>

<template>
  <div class="flex flex-col w-full product-selector-wrapper">
    <label class="text-sm font-medium text-gray-700 mb-1 dark:text-white">
      Product <span class="text-red-500">*</span>
    </label>

    <div class="relative">
      <div
        class="flex justify-between items-center w-full bg-white dark:bg-[#2b2b2b] border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 cursor-pointer focus-within:ring-1 focus-within:ring-[#2AB857]"
        @click.stop="toggleDropdown"
      >
        <span class="text-gray-800 dark:text-white text-sm truncate">
          {{ selectedProduct?.name || "Select Product" }}
        </span>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-4 h-4 text-gray-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>

      <transition name="fade">
        <ul
          v-if="props.isOpen"
          class="absolute z-20 w-full mt-2 bg-white dark:bg-[#2b2b2b] border border-gray-200 dark:border-gray-600 rounded-md shadow-md max-h-48 overflow-y-auto"
        >
          <li
            v-for="prd in products"
            :key="prd.id"
            @click="chooseProduct(prd)"
            class="px-3 py-2 hover:bg-gray-50 dark:hover:bg-[#3B3B3B] cursor-pointer text-sm text-gray-800 dark:text-white"
          >
            {{ prd.name }}
          </li>
        </ul>
      </transition>
    </div>

    <input type="hidden" name="product" :value="selectedProduct?.id" />
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
