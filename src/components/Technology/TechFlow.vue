<script setup>
import { ref, computed, useId, onMounted, onUnmounted } from "vue";

const props = defineProps({
  lebar: { type: Number, required: true },
  tinggi: { type: Number, required: true },
  // "x" menyapu kiri ke kanan, "y" menyapu atas ke bawah.
  arah: { type: String, default: "x" },
  // Garis penghubung, dipisah dari isi supaya ikut dikuak sapuan. Warna dan
  // ketebalannya diambil apa adanya dari berkas SVG-nya.
  garis: { type: Array, default: () => [] },
  // Nama @keyframes milik pemanggil, untuk irama yang tidak rata (berhenti
  // mengisi tiap ruang, lalu melaju di lintasan). Kosong = sapuan rata.
  irama: { type: String, default: "" },
  detik: { type: Number, default: 7 },
});

// Isinya digambar dua kali lewat <use>, jadi id-nya harus unik per instance.
const uid = useId();
const idIsi = `alur-isi-${uid}`;
const idKlip = `alur-klip-${uid}`;

// Animasinya berulang terus; menjalankannya saat di luar layar cuma membebani
// main thread tanpa ada yang melihat.
const gayaSapu = computed(() =>
  props.irama
    ? {
        animationName: props.irama,
        animationDuration: `${props.detik}s`,
        animationTimingFunction: "linear",
        animationIterationCount: "infinite",
      }
    : null,
);

const wadah = ref(null);
const terlihat = ref(false);
let pengintai = null;

onMounted(() => {
  if (typeof IntersectionObserver === "undefined") {
    terlihat.value = true;
    return;
  }
  pengintai = new IntersectionObserver(
    (isi) => {
      terlihat.value = isi.some((e) => e.isIntersecting);
    },
    { threshold: 0.05 },
  );
  if (wadah.value) pengintai.observe(wadah.value);
});

onUnmounted(() => pengintai?.disconnect());
</script>

<template>
  <svg
    ref="wadah"
    :viewBox="`0 0 ${lebar} ${tinggi}`"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    class="w-full h-auto"
    :class="terlihat ? 'jalan' : 'diam'"
    aria-hidden="true"
  >
    <defs>
      <g :id="idIsi">
        <slot />
      </g>

      <clipPath :id="idKlip">
        <rect
          class="sapu"
          :class="irama ? '' : arah === 'y' ? 'sapu-y' : 'sapu-x'"
          :style="gayaSapu"
          x="0"
          y="0"
          :width="lebar"
          :height="tinggi"
        />
      </clipPath>
    </defs>

    <g :clip-path="`url(#${idKlip})`" class="lapis-garis">
      <path
        v-for="(g, i) in garis"
        :key="i"
        :d="g.d"
        :stroke="g.warna"
        :stroke-width="g.tebal"
        fill="none"
      />
    </g>

    <use :href="`#${idIsi}`" class="lapis-abu" />
    <use
      :href="`#${idIsi}`"
      :clip-path="`url(#${idKlip})`"
      class="lapis-warna"
    />
  </svg>
</template>

<style scoped>
.lapis-abu {
  filter: grayscale(1);
}

.diam .sapu {
  animation-name: none !important;
}

/* Lapisan berwarna dikuak oleh persegi yang memanjang di dalam clipPath,
   jadi lingkaran ikut terisi bertahap saat tepinya lewat, bukan menyala
   sekaligus. */
.sapu {
  transform-box: fill-box;
  transform-origin: 0 0;
}

.jalan .sapu-x {
  animation: sapu-x 7s linear infinite;
}

.jalan .sapu-y {
  animation: sapu-y 7s linear infinite;
}

.jalan .lapis-warna,
.jalan .lapis-garis {
  animation: pudar 7s linear infinite;
}

/* Tumbuh, tahan, lalu lapisannya diredupkan dulu sebelum sapuannya
   dikembalikan ke nol — supaya baliknya tidak terlihat menyentak. */
@keyframes sapu-x {
  0% {
    transform: scaleX(0);
  }
  60%,
  92% {
    transform: scaleX(1);
  }
  93%,
  100% {
    transform: scaleX(0);
  }
}

@keyframes sapu-y {
  0% {
    transform: scaleY(0);
  }
  60%,
  92% {
    transform: scaleY(1);
  }
  93%,
  100% {
    transform: scaleY(0);
  }
}

@keyframes pudar {
  0%,
  88% {
    opacity: 1;
  }
  96%,
  100% {
    opacity: 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .jalan .sapu,
  .jalan .lapis-warna,
  .jalan .lapis-garis {
    animation: none;
  }

  .sapu {
    transform: none;
  }
}
</style>
