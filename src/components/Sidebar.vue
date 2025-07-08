<script setup>
import { ref, watch } from "vue";
import { useSidebarStore } from "@/stores/sidebar";
import { useRoute } from "vue-router";
import MenuIconClose from "@/components/icons/CloseIcon.vue";
import Navlink from "@/components/Navlink.vue";

const sidebar = useSidebarStore();
const route = useRoute();

// Tutup saat pindah halaman
watch(
  () => route.fullPath,
  () => {
    sidebar.close();
  }
);

// Dropdown toggle
const isProductOpen = ref(false);
const isTechnologyOpen = ref(false);

const handleProduct = () => {
  isProductOpen.value = !isProductOpen.value;
  isTechnologyOpen.value = false;
};
const handleTechnology = () => {
  isTechnologyOpen.value = !isTechnologyOpen.value;
  isProductOpen.value = false;
};
</script>

<template>
  <transition name="fade">
    <div
      v-if="sidebar.isOpen"
      class="fixed inset-0 z-50 flex flex-col transition-all duration-300"
    >
      <!-- Overlay -->
      <div class="absolute inset-0 bg-black/50" @click="sidebar.close"></div>

      <!-- Sidebar -->
      <transition name="slide">
        <div
          class="ml-auto w-full max-w-[100%] bg-white h-full px-8 pt-6 relative z-50 flex flex-col items-center"
        >
          <div class="flex flex-row w-full h-auto justify-between items-center">
            <div class="w-[80%] h-auto">
              <p
                class="text-[#195279] font-semibold sml:text-md md:text-[1.7rem]"
              >
                PT Seleris Meditekno Internasional
              </p>
            </div>
            <div class="w-[20%] h-auto flex justify-end">
              <button
                type="button"
                id="sidebar-button"
                @click="sidebar.close"
                class="ml-auto text-2xl font-bold text-gray-700 hover:text-black"
              >
                <MenuIconClose />
              </button>
            </div>
          </div>

          <nav
            class="w-full flex flex-col mt-8 space-y-6 text-lg font-semibold text-gray-800"
          >
            <Navlink href="/">Home</Navlink>
            <Navlink href="/about">About</Navlink>

            <!-- DROPDOWN MENU -->
            <div>
              <button
                @click="handleProduct"
                class="w-full text-left focus:outline-none"
              >
                <div class="flex justify-between items-center">
                  <span class="text-lg font-semibold">Products</span>
                  <span>
                    <svg
                      :class="[
                        'w-5 h-5 transition-transform duration-300',
                        isProductOpen ? 'rotate-180' : '',
                      ]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </span>
                </div>
              </button>

              <transition name="fade">
                <div
                  v-if="isProductOpen"
                  class="mt-3 ml-4 flex flex-col space-y-3 text-base"
                >
                  <Navlink href="#"><span> Seleris Lifins</span></Navlink>
                  <Navlink href="#"><span> Seleris Medins</span></Navlink>
                  <Navlink href="#"><span> Seleris Credit Cover</span></Navlink>
                  <Navlink href="#"><span> Seleris Care</span></Navlink>
                  <Navlink href="#"><span> Flexa Asia</span></Navlink>
                  <Navlink href="#"><span> Auto Claim</span></Navlink>
                </div>
              </transition>
            </div>

            <!-- DROPDOWN MENU -->
            <div>
              <button
                @click="handleTechnology"
                class="w-full text-left focus:outline-none"
              >
                <div class="flex justify-between items-center">
                  <span class="text-lg font-semibold">Technology</span>
                  <span>
                    <svg
                      :class="[
                        'w-5 h-5 transition-transform duration-300',
                        isTechnologyOpen ? 'rotate-180' : '',
                      ]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </span>
                </div>
              </button>

              <transition name="fade">
                <div
                  v-if="isTechnologyOpen"
                  class="mt-3 ml-4 flex flex-col space-y-3 text-base"
                >
                  <Navlink href="#"><span> Seleris Lifins</span></Navlink>
                  <Navlink href="#"><span> Seleris Medins</span></Navlink>
                  <Navlink href="#"><span> Seleris Credit Cover</span></Navlink>
                  <Navlink href="#"><span> Seleris Care</span></Navlink>
                  <Navlink href="#"><span> Flexa Asia</span></Navlink>
                  <Navlink href="#"><span> Auto Claim</span></Navlink>
                </div>
              </transition>
            </div>

            <!-- Menu lainnya -->
            <Navlink href="/team">Our Team</Navlink>
            <Navlink href="/blogs">Blogs</Navlink>
            <Navlink href="/services">Services</Navlink>
          </nav>
        </div>
      </transition>
    </div>
  </transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease-in-out;
}
.slide-enter-from {
  transform: translateX(100%);
}
.slide-enter-to {
  transform: translateX(0%);
}
.slide-leave-from {
  transform: translateX(0%);
}
.slide-leave-to {
  transform: translateX(100%);
}
</style>
