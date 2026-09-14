<script setup>
import CardDefault from "@/components/reusable/CardDefault.vue";
import { ref, onMounted, onUnmounted, nextTick } from "vue";

const benefitList = [
  {
    icon: new URL("@/assets/icons/Benefits/Accuracy.png", import.meta.url).href,
    key: "accuracy",
  },
  {
    icon: new URL("@/assets/icons/Benefits/speed.png", import.meta.url).href,
    key: "speed",
  },
  {
    icon: new URL("@/assets/icons/Benefits/efficiency.png", import.meta.url)
      .href,
    key: "efficiency",
  },
  {
    icon: new URL("@/assets/icons/Benefits/testimonial.png", import.meta.url)
      .href,
    key: "testimonial",
  },
  {
    icon: new URL("@/assets/icons/Benefits/experience.png", import.meta.url)
      .href,
    key: "experience",
  },
  {
    icon: new URL("@/assets/icons/Benefits/guarantee.png", import.meta.url)
      .href,
    key: "guarantee",
  },
];

const scrollContainer = ref(null);

const isDragging = ref(false);
const startX = ref(0);
const scrollAwal = ref(0);

const onMouseDown = (e) => {
  isDragging.value = true;
  startX.value = e.pageX - scrollContainer.value.offsetLeft;
  scrollAwal.value = scrollContainer.value.scrollLeft;
  scrollContainer.value.style.cursor = "grabbing";
  scrollContainer.value.style.userSelect = "none";
  scrollContainer.value.classList.remove("snap-x", "snap-mandatory");
};

const onMouseMove = (e) => {
  if (!isDragging.value) return;
  e.preventDefault();
  const x = e.pageX - scrollContainer.value.offsetLeft;
  const walk = (x - startX.value) * 1.2; // kecepatan seret
  scrollContainer.value.scrollLeft = scrollAwal.value - walk;
};

const onMouseUp = () => {
  if (!isDragging.value) return;
  isDragging.value = false;
  scrollContainer.value.style.cursor = "grab";
  scrollContainer.value.style.userSelect = "";
  scrollContainer.value.classList.add("snap-x", "snap-mandatory");
};

const onMouseLeave = () => {
  if (isDragging.value) onMouseUp();
};

const bisaKeKiri = ref(false);
const bisaKeKanan = ref(false);

const perbaruiPanah = () => {
  const el = scrollContainer.value;
  if (!el) return;
  const maksimum = el.scrollWidth - el.clientWidth;
  // Toleransi 2 piksel: posisi gulir sering berupa pecahan, jadi tanpa ini
  // panah kanan tetap tampil walau sudah mentok.
  bisaKeKiri.value = el.scrollLeft > 2;
  bisaKeKanan.value = el.scrollLeft < maksimum - 2;
};

let idFramePanah = null;
const tanganiGulirPanah = () => {
  if (idFramePanah) return;
  idFramePanah = requestAnimationFrame(() => {
    perbaruiPanah();
    idFramePanah = null;
  });
};

const langkahGulir = () => {
  const el = scrollContainer.value;
  const kartu = Array.from(el.children).find(
    (anak) => anak.getBoundingClientRect().width > 0,
  );
  if (!kartu) return el.clientWidth * 0.8; // cadangan, seharusnya tidak terpakai

  const gaya = getComputedStyle(el);
  const jarak = parseFloat(gaya.columnGap || gaya.gap || "0") || 0;
  return kartu.getBoundingClientRect().width + jarak;
};

const scrollCarousel = (arah) => {
  const el = scrollContainer.value;
  if (!el) return;
  const langkah = langkahGulir();
  el.scrollBy({
    left: arah === "right" ? langkah : -langkah,
    behavior: "smooth",
  });
};

// Lebar isi berubah saat ikon selesai dimuat — itu tidak mengubah ukuran
// jendela, jadi pendengar "resize" saja tidak cukup.
let pengamatUkuran = null;

onMounted(async () => {
  await nextTick();
  const el = scrollContainer.value;
  if (!el) return;
  perbaruiPanah();
  el.addEventListener("scroll", tanganiGulirPanah, { passive: true });
  pengamatUkuran = new ResizeObserver(perbaruiPanah);
  pengamatUkuran.observe(el);
});

onUnmounted(() => {
  scrollContainer.value?.removeEventListener("scroll", tanganiGulirPanah);
  pengamatUkuran?.disconnect();
  if (idFramePanah) cancelAnimationFrame(idFramePanah);
});
</script>

<template>
  <div class="flex flex-col relative w-full dark:bg-[#17181A]">
    <div class="flex flex-col gap-y-3 xl:gap-y-5 dark:bg-[#17181A]">
      <div
        class="flex w-full h-auto justify-center items-center dark:bg-[#17181A]"
      >
        <p
          class="text-2xl md:text-[32px] lg:text-[44px] xl:text-[44px] font-[500] text-[#195279] dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-br dark:from-[#FAFAFA] dark:via-[#D4D4D4] dark:to-[#AAAAAA]"
        >
          {{ $t("home.benefits.title") }}
        </p>
      </div>
      <div class="flex w-full h-auto justify-center items-center px-10">
        <p
          class="text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px] xl:text-[20px] font-[400] text-[#1DC457] dark:text-[#6A6A6A] text-center"
        >
          {{ $t("home.benefits.subtitle") }}
        </p>
      </div>
    </div>
    <div class="relative w-full h-auto">
      <div
        class="hidden xl:flex absolute w-32 h-full bg-gradient-to-r from-[#FAFAFA] from-0% to-[#FAFAFA]/0 to-60% dark:bg-gradient-to-r dark:from-[#17181A] dark:from-0% dark:to-[#17181A]/0 dark:to-60% left-0 z-20 rounded-r-2xl"
      />
      <div
        class="hidden xl:flex absolute w-32 h-full bg-gradient-to-l from-[#FAFAFA] from-0% to-[#FAFAFA]/0 to-60% dark:bg-gradient-to-l dark:from-[#17181A] dark:from-0% dark:to-[#17181A]/0 dark:to-60% right-0 z-20 rounded-l-2xl"
      />
      <transition
        enter-active-class="duration-300 ease-out"
        enter-from-class="opacity-0 scale-75 -translate-x-3"
        leave-active-class="duration-200 ease-in"
        leave-to-class="opacity-0 scale-75 -translate-x-3"
      >
        <button
          v-if="bisaKeKiri"
          @click="scrollCarousel('left')"
          aria-label="Scroll left"
          class="hidden lg:flex absolute left-2 lg:left-8 top-1/2 -translate-y-1/2 z-30 w-12 h-12 p-2 items-center justify-center rounded-full bg-white dark:bg-[#2A2B2D] shadow-md border border-[#E5E7EB] dark:border-[#3A3B3D] text-[#195279] dark:text-[#D4D4D4] hover:bg-[#195279] hover:text-white dark:hover:bg-[#3A3B3D] transition-all duration-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-full h-full"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
      </transition>
      <transition
        enter-active-class="duration-300 ease-out"
        enter-from-class="opacity-0 scale-75 translate-x-3"
        leave-active-class="duration-200 ease-in"
        leave-to-class="opacity-0 scale-75 translate-x-3"
      >
        <button
          v-if="bisaKeKanan"
          @click="scrollCarousel('right')"
          aria-label="Scroll right"
          class="hidden lg:flex absolute right-2 lg:right-8 top-1/2 -translate-y-1/2 z-30 w-12 h-12 p-2 items-center justify-center rounded-full bg-white dark:bg-[#2A2B2D] shadow-md border border-[#E5E7EB] dark:border-[#3A3B3D] text-[#195279] dark:text-[#D4D4D4] hover:bg-[#195279] hover:text-white dark:hover:bg-[#3A3B3D] transition-all duration-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-full h-full"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </transition>
      <div
        ref="scrollContainer"
        @mousedown="onMouseDown"
        @mousemove="onMouseMove"
        @mouseup="onMouseUp"
        @mouseleave="onMouseLeave"
        class="relative flex flex-row w-full max-h-screen gap-x-5 md:gap-x-5 lg:gap-x-10 mt-4 md:mt-5 py-5 overflow-x-auto snap-x snap-mandatory sm:pl-10 px-8 sm:pr-10 md:pl-16 md:pr-16 xl:pl-20 xl:pr-16 hide-scrollbar cursor-grab"
      >
        <CardDefault
          v-for="(benefit, index) in benefitList"
          :key="index"
          :icon="benefit.icon"
          :title="$t(`home.benefits.items.${benefit.key}.title`)"
          :body="$t(`home.benefits.items.${benefit.key}.body`)"
        />
      </div>
    </div>
  </div>
</template>
<style scoped>
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}
.hide-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
