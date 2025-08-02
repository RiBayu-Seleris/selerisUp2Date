<script setup>
import Input from "@/components/reusable/Input.vue";
import CountrySelect from "@/components/reusable/CountrySelect.vue";

import { ref, onMounted, watch, defineEmits, defineProps, computed } from "vue";

const FullName = ref("");
const CompanyName = ref("");
const Email = ref("");
const PhoneNumber = ref("");
const Products = ref("");
const Message = ref("");
const Country = ref({
  name: "Indonesia",
  code: "ID",
  flag: "https://flagcdn.com/w40/id.png",
});

const showDropdown = ref(false);
const showDropdownApps = ref(false);

const emit = defineEmits(["update:modelValue"]);
const props = defineProps({
  modelValue: String, // product ID
});

// Contoh daftar produk
const products = ref([
  { id: "Seleris-Credit-Cover", name: "Seleris Credit Cover" },
  { id: "Seleris-Lifins", name: "Seleris Lifins" },
  { id: "Seleris-Medins", name: "Seleris Medins" },
  { id: "Seleris-Care", name: "Seleris Care" },
  { id: "Seleris-Cough", name: "Seleris Cough" },
]);

const selectedId = ref(props.modelValue || "");

const selectedProduct = computed(() =>
  products.value.find((p) => p.id === selectedId.value)
);

function selectProduct(id) {
  selectedId.value = id;
  emit("update:modelValue", id);
  showDropdown.value = false;
}

watch(
  () => props.modelValue,
  (newVal) => {
    selectedId.value = newVal;
  }
);
</script>

<template>
  <div class="px-10 pt-40 xl:grid xl:grid-cols-2 w-full h-auto gap-x-5">
    <div
      class="w-full h-auto dark:bg-gradient-to-tr border dark:from-[#565656]/0 dark:to-[#BCBCBC]/30 p-[1px] rounded-xl"
    >
      <div
        class="w-full h-full flex flex-col dark:bg-[#1D1F23] p-10 rounded-xl"
      >
        <div class="w-full h-auto space-y-5">
          <p
            class="text-[24px] md:text-[37px] text-[#195279] font-[500] dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-br dark:from-[#FAFAFA] dark:via-[#D4D4D4] dark:to-[#AAAAAA]"
          >
            Let's Seleris Together
          </p>
          <p class="text-[14px] md:text-[17px] text-[#6E6E6E]">
            Join leading AI teams accelerating their ML development with Scale.
            Book a 1:1 demo with us to get started.
          </p>
        </div>
        <div class="w-full h-auto mt-8">
          <form action="" class="flex flex-col gap-5">
            <div
              class="w-full h-auto flex flex-col md:grid md:grid-cols-2 gap-5"
            >
              <Input label="First Name" type="text" placeholder="Jhon" />
              <Input label="Last Name" type="text" placeholder="Doe" />
              <Input label="Company" type="text" placeholder="Your Company" />
              <Input label="Job Title" type="text" placeholder="Title" />
            </div>
            <div class="w-full h-auto">
              <Input
                label="Email"
                type="email"
                placeholder="example@gmail.com"
              />
            </div>
            <div class="w-full h-auto flex flex-col space-y-1">
              <CountrySelect v-model="Country" />
            </div>
            <!-- Application Seleris -->
            <div class="w-full flex flex-col space-y-1 relative">
              <label class="text-sm font-medium text-gray-700 dark:text-white"
                >Product</label
              >

              <div
                class="p-2 border rounded-lg cursor-pointer bg-white dark:bg-[#2b2b2b] border-gray-300 dark:border-gray-600 flex justify-between items-center"
                @click="showDropdown = !showDropdown"
              >
                <span class="text-sm dark:text-white">
                  {{ selectedProduct?.name || "Select Product" }}
                </span>
                <svg
                  class="w-4 h-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>

              <!-- Hidden input for backend -->
              <input type="hidden" name="product_id" :value="selectedId" />

              <ul
                v-if="showDropdown"
                class="w-full bg-white dark:bg-[#2b2b2b] border border-gray-300 dark:border-gray-600 rounded-md shadow-md max-h-40 overflow-auto"
              >
                <li
                  v-for="product in products"
                  :key="product.id"
                  @click.stop="selectProduct(product.id)"
                  class="px-3 py-2 hover:bg-gray-100 dark:hover:bg-[#3B3B3B] cursor-pointer text-sm"
                >
                  {{ product.name }}
                </li>
              </ul>
            </div>
            <div class="w-full h-auto space-y-1">
              <label for="Message">Message</label>
              <textarea
                class="w-full lg:h-[70px] xl:h-[130px] p-2 rounded-[8px] border-gray-300 placeholder-[6F6F6F] dark:bg-[#323232] border-[0.1px] dark:border-[#FAFAFA]/25 focus:outline-none focus:ring-1 focus:ring-[#2AB857] resize-none align-top"
                placeholder="Message"
              />
            </div>
            <div class="w-full h-auto">
              <p
                class="text-[14px] md:text-[17px] text-[#6E6E6E] dark:text-[#FFFFFF]"
              >
                By submitting this form, your information will be processed in
                accordance with our
                <router-link to="/privacy" class="underline"
                  >Privacy Policy.</router-link
                >
              </p>
            </div>
            <div class="w-full h-auto">
              <button
                class="w-full h-auto py-2 flex justify-center items-center bg-[#2AB857] rounded-[20px]"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <!-- <div class="hidden xl:flex w-full h-auto bg-red-400">v</div> -->
  </div>
</template>
