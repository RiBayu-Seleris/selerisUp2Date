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

const AboutList = [
  {
    url: "/about/company",
    name: "Company",
  },
  {
    url: "/about/teams",
    name: "Our Team",
  },
  {
    url: "/innovation",
    name: "Innovation",
  },
];

const ProductList = [
  {
    url: "#",
    name: "Seleris Care",
  },
  {
    url: "#",
    name: "Seleris Medins",
  },
  {
    url: "#",
    name: "Seleris Credit Cover",
  },
  {
    url: "#",
    name: "EHD",
  },
  {
    url: "#",
    name: "Sentris",
  },
  {
    url: "#",
    name: "Flexa Asia",
  },
  {
    url: "#",
    name: "Auto Claim",
  },
  {
    url: "#",
    name: "Seleris Doctor",
  },
];

const TechnologyList = [
  {
    url: "/seleris-chromatic-imaging",
    name: "Seleris Chromatic Imaging",
  },
  {
    url: "/seleris-deep-vitals",
    name: "Seleris Deep Vitals",
  },
  {
    url: "/seleris-deep-risk",
    name: "Seleris Deep Risk",
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
      class="fixed inset-0 z-50 flex flex-col transition-all duration-300 overflow-y-auto"
    >
      <!-- Overlay -->
      <div class="absolute inset-0 bg-black/50" @click="sidebar.close"></div>

      <!-- Sidebar -->
      <transition name="slide">
        <div class="ml-auto w-full h-auto px-4 pt-6">
          <div
            class="w-full h-full bg-white relative z-50 flex flex-col items-center py-6 px-5 rounded-xl"
          >
            <div
              class="flex flex-row w-full h-auto justify-between items-center"
            >
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
              class="w-full flex flex-wrap mt-8 text-lg font-semibold text-gray-800 gap-y-2"
            >
              <div class="w-full h-auto">
                <Navlink href="/">
                  <p class="text-[12px]">Home</p>
                </Navlink>
              </div>
              <div class="w-full h-[2px] bg-[#1AB24F]/40" />
              <div class="w-full h-auto flex flex-col">
                <p class="text-slate-400 text-[16px]">About</p>
                <div class="w-full h-auto flex flex-wrap">
                  <div
                    v-for="(about, index) in AboutList"
                    :key="index"
                    class="w-[50%] h-auto"
                  >
                    <Navlink :href="about.url">
                      <p class="text-[12px] font-[500]">
                        {{ about.name }}
                      </p>
                    </Navlink>
                  </div>
                </div>
              </div>
              <div class="w-full h-[2px] bg-[#1AB24F]/40" />
              <div class="w-full h-auto flex flex-col">
                <p class="text-slate-400 text-[16px]">Products</p>
                <div class="w-full h-auto flex flex-wrap">
                  <div
                    v-for="(product, index) in ProductList"
                    :key="index"
                    class="w-[50%] h-auto"
                  >
                    <Navlink :href="product.url">
                      <p class="text-[12px] font-[500]">{{ product.name }}</p>
                    </Navlink>
                  </div>
                </div>
              </div>
              <div class="w-full h-[2px] bg-[#1AB24F]/40" />
              <div class="w-full h-auto flex flex-col">
                <p class="text-slate-400 text-[16px]">Technology</p>
                <div class="w-full h-auto flex flex-wrap">
                  <div
                    v-for="(technology, index) in TechnologyList"
                    :key="index"
                    class="w-[50%] h-auto"
                  >
                    <Navlink :href="technology.url">
                      <p class="text-[12px] font-[500]">
                        {{ technology.name }}
                      </p>
                    </Navlink>
                  </div>
                </div>
              </div>
              <div class="w-full h-[2px] bg-[#1AB24F]/40" />
              <div class="w-full h-auto">
                <Navlink href="/team">
                  <p class="text-[12px]">Our Team</p>
                </Navlink>
              </div>
              <div class="w-full h-auto">
                <Navlink href="/blogs">
                  <p class="text-[12px]">Blogs</p>
                </Navlink>
              </div>
              <div class="w-full h-auto">
                <Navlink href="/services">
                  <p class="text-[12px]">Services</p>
                </Navlink>
              </div>
              <div class="w-full h-auto">
                <Navlink href="/contact">
                  <p class="text-[12px]">Contact</p>
                </Navlink>
              </div>
            </nav>
          </div>
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
