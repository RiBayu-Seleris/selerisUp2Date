<script setup>
import { useSidebarStore } from "@/stores/sidebar";
import { useRoute } from "vue-router";
import { watch } from "vue";

const sidebar = useSidebarStore();
const route = useRoute();

// Tutup saat ganti route
watch(
  () => route.fullPath,
  () => {
    sidebar.close();
  }
);
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
          class="ml-auto w-full max-w-[100%] bg-white h-full p-6 relative z-50 flex flex-col"
        >
          <button
            @click="sidebar.close"
            class="ml-auto text-2xl font-bold text-gray-700 hover:text-black"
          >
            ✕
          </button>

          <nav class="mt-8 space-y-6 text-lg font-semibold text-gray-800">
            <router-link to="/" class="hover:text-green-500"
              >Beranda</router-link
            >
            <router-link to="/about" class="hover:text-green-500"
              >Tentang</router-link
            >
            <router-link to="/layanan" class="hover:text-green-500"
              >Layanan</router-link
            >
            <router-link to="/kontak" class="hover:text-green-500"
              >Kontak</router-link
            >
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
