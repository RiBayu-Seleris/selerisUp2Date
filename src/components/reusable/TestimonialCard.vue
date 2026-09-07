<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from "vue";

const props = defineProps({
  name: String,
  position: String,
  text: String,
});

// jumlah kata yang sedang dalam masa transisi bersamaan
const OVERLAP = 8;

// rentang posisi elemen di layar (dalam persen tinggi viewport) -> progres 0..1.
// [mulai, selesai]: 1 = garis bawah layar, 0 = garis atas layar.
const QUOTE_BAND = [0.6, 0.25]; // kata quote terisi sepanjang kartu naik

// garis pemicu fade nama & jabatan (persen tinggi viewport).
// begitu terlewat, transisinya jalan sampai selesai walau scroll berhenti.
const REVEAL_IN = 0.85; // fade-in saat atas elemen naik melewati garis ini
const REVEAL_OUT = 0.96; // fade-out saat turun lagi melewati garis ini

const root = ref(null);
const nameEl = ref(null);
const positionEl = ref(null);

const quoteProgress = ref(0);
const nameVisible = ref(false);
const positionVisible = ref(false);

const words = computed(() =>
  String(props.text ?? "")
    .trim()
    .split(/\s+/)
    .filter(Boolean),
);

const rootStyle = computed(() => ({
  "--pw": quoteProgress.value,
  "--span": words.value.length + OVERLAP,
  "--overlap": OVERLAP,
}));

// kata quote: nilai kontinu yang mengikuti posisi kartu
const bandProgress = (el, [from, to], vh) => {
  if (!el) return 0;
  const top = el.getBoundingClientRect().top;
  const p = (vh * from - top) / (vh * (from - to));
  return Math.min(Math.max(p, 0), 1);
};

// nama & jabatan: cuma sakelar on/off dari posisinya sendiri.
// di antara dua garis state dipertahankan supaya tidak kedip-kedip.
const isPastTrigger = (el, current, vh) => {
  if (!el) return current;
  const top = el.getBoundingClientRect().top;
  if (top <= vh * REVEAL_IN) return true;
  if (top >= vh * REVEAL_OUT) return false;
  return current;
};

let frame = null;

const update = () => {
  frame = null;
  if (!root.value) return;

  const vh = window.innerHeight || document.documentElement.clientHeight;

  quoteProgress.value = bandProgress(root.value, QUOTE_BAND, vh);
  nameVisible.value = isPastTrigger(nameEl.value, nameVisible.value, vh);
  positionVisible.value = isPastTrigger(
    positionEl.value,
    positionVisible.value,
    vh,
  );
};

const onScroll = () => {
  if (frame === null) frame = requestAnimationFrame(update);
};

onMounted(() => {
  update();
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll, { passive: true });
});

onBeforeUnmount(() => {
  if (frame !== null) cancelAnimationFrame(frame);
  window.removeEventListener("scroll", onScroll);
  window.removeEventListener("resize", onScroll);
});
</script>

<template>
  <div
    ref="root"
    :style="rootStyle"
    class="w-full min-h-[420px] sm:min-h-[230px] md:min-h-[300px] lg:min-h-[280px] xl:min-h-[270px] p-[1px] bg-[#D9D9D9] dark:bg-gradient-to-tr dark:from-[#17181A] dark:from-45% dark:to-[#565656] shadow-sm rounded-lg"
  >
    <div
      class="w-full h-full flex flex-col justify-between px-6 lg:px-8 py-6 lg:py-8 rounded-lg shadow-sm bg-[#FFFFFF] dark:bg-[#1D1F23] dark:border-[#FAFAFA]/25"
    >
      <div class="flex flex-col w-full h-auto">
        <svg
          class="w-6 h-6 md:w-8 md:h-8 mb-3 md:mb-4 text-[#91BBD8] dark:text-[#FAFAFA]"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            d="M7.17 6A4.17 4.17 0 0 0 3 10.17v3.33A4.17 4.17 0 0 0 7.17 17.67H9V10H6.67v-.83c0-.96.78-1.75 1.75-1.75H9V6H7.17zM17.17 6A4.17 4.17 0 0 0 13 10.17v3.33A4.17 4.17 0 0 0 17.17 17.67H19V10h-2.33v-.83c0-.96.78-1.75 1.75-1.75H19V6h-1.83z"
          />
        </svg>
        <p
          class="text-[14px] sm:text-[16px] md:text-[18px] lg:text-[19px] xl:text-[21px] text-[#535862] dark:text-[#FAFAFA] leading-relaxed"
        >
          <span
            v-for="(word, index) in words"
            :key="index"
            class="reveal-word"
            :style="{ '--i': index }"
            >{{ word }}{{ " " }}</span
          >
        </p>
      </div>
      <div class="flex flex-col w-full h-auto gap-y-1 mt-6">
        <h3
          ref="nameEl"
          class="reveal-block text-[14px] md:text-[18px] lg:text-[20px] font-[500] text-[#195279] dark:text-[#FAFAFA]"
          :class="{ 'is-visible': nameVisible }"
        >
          {{ name }}
        </h3>
        <p
          ref="positionEl"
          class="reveal-block reveal-delay text-[13px] md:text-[15px] lg:text-[16px] text-[#717276]"
          :class="{ 'is-visible': positionVisible }"
        >
          {{ position }}
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* kata: terisi berurutan mengikuti progres kartu (--pw) */
.reveal-word {
  --t: calc((var(--pw, 1) * var(--span, 1) - var(--i, 0)) / var(--overlap, 8));
  opacity: clamp(20%, calc(20% + 80% * var(--t)), 100%);
  transition: opacity 150ms linear;
}

/* nama & jabatan: fade in/out beneran, durasinya sendiri, lepas dari kecepatan scroll */
.reveal-block {
  opacity: 0;
  transform: translateY(10px);
  transition:
    opacity 600ms ease,
    transform 600ms cubic-bezier(0.22, 1, 0.36, 1);
}

.reveal-block.is-visible {
  opacity: 1;
  transform: none;
}

/* jabatan menyusul sedikit di belakang nama */
.reveal-delay {
  transition-delay: 140ms;
}

@media (prefers-reduced-motion: reduce) {
  .reveal-word,
  .reveal-block {
    opacity: 1;
    transform: none;
    transition: none;
  }
}
</style>
