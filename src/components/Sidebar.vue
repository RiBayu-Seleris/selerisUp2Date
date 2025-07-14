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

const menuPages = [
  {
    title: "Seleris Care",
    url: "#",
  },
  {
    title: "Seleris Medins",
    url: "#",
  },
  {
    title: "Seleris Credit Cover",
    url: "#",
  },
  {
    title: "EHD",
    url: "#",
  },
  {
    title: "Sentris",
    url: "#",
  },
  {
    title: "Flexa Asia",
    url: "#",
  },
  {
    title: "Auto Claim",
    url: "#",
  },
  {
    title: "Seleris Doctor",
    url: "#",
  },
];

const techPages = [
  {
    title: "Seleris Chromatic Imaging",
    url: "/seleris-chromatic-imaging",
  },
  {
    title: "Seleris Deep Vitals",
    url: "/seleris-deep-vitals",
  },
  {
    title: "Seleris Deep Risk",
    url: "/seleris-deep-risk",
  },
];

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
                  class="mt-4 flex flex-wrap items-center gap-y-2 bg-[#F3F4F6] p-4 rounded-2xl"
                >
                  <div
                    v-for="(menuPage, index) in menuPages"
                    :key="index"
                    class="w-[50%] h-auto flex"
                  >
                    <Navlink :href="menuPage.url">
                      <span class="text-[14px]"> {{ menuPage.title }}</span>
                    </Navlink>
                  </div>
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
                  class="mt-3 flex flex-col space-y-3 text-base bg-[#F3F4F6] p-4 rounded-2xl"
                >
                  <div
                    v-for="(techPage, index) in techPages"
                    :key="index"
                    class="w-[50%] h-auto flex"
                  >
                    <Navlink :href="techPage.url">
                      <span class="text-[14px]"> {{ techPage.title }}</span>
                    </Navlink>
                  </div>
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
