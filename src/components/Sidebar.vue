<script setup>
import CloseIcon from "@/components/icons/CloseIcon.vue";
import { useSidebarStore } from "@/stores/sidebar";
import { ref, onMounted, onBeforeUnmount, watch } from "vue";

const isSidebarOpen = ref(null);
const sidebar = useSidebarStore();

const toggleCloseSidebar = () => {
  sidebar.close();
};

const handleClickOutsides = (event) => {
  const sidebarContainer = document.getElementById("sidebar-container");

  if (
    sidebar.isOpen &&
    sidebarContainer &&
    !sidebarContainer.contains(event.target)
  ) {
    toggleCloseSidebar();
  }
};

onMounted(() => {
  // Add event listener with a small delay to prevent conflicts
  setTimeout(() => {
    document.addEventListener("click", handleClickOutsides);
  }, 100);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutsides);
});
</script>

<template>
  <div
    class="fixed top-0 right-0 h-full w-full flex z-[999] bg-white/10 backdrop-blur-[2px] shadow-lg"
  >
    <div
      id="sidebar-container"
      class="fixed top-0 right-0 h-full w-1/2 flex bg-emerald-200/50 backdrop-blur-lg shadow-lg z-[999]"
    >
      <div class="flex flex-col pt-10 px-10 w-full h-full">
        <div class="flex flex-row justify-center items-center">
          <div class="flex w-full h-full justify-start items-center">
            <p class="text-black text-2xl font-semibold">Menu</p>
          </div>
          <div class="flex w-full h-full justify-end items-center">
            <button
              type="button"
              id="close-sidebar-button"
              class="bg-white p-2 rounded-lg shadow-md text-[#1AB24F]"
              @click="toggleCloseSidebar"
            >
              <CloseIcon />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Optional: Custom scrollbar for the sidebar */
::-webkit-scrollbar {
  width: 6px;
}
::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 3px;
}
</style>
