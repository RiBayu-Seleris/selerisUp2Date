<script setup>
import { ref, computed } from "vue";
import { useI18n } from "vue-i18n";

const props = defineProps({
  // [{ detik, analyzer, accepted }] — detik dihitung sejak scan dimulai
  samples: { type: Array, default: () => [] },
  threshold: { type: Number, default: 24 },
  // Teks laporan siap salin, disusun SdkScanner
  report: { type: String, default: "" },
  // Laju gambar halaman ini sendiri. Dipakai untuk membedakan "mesinnya yang
  // tersendat" dari "scanner-nya yang berat".
  pageFps: { type: Number, default: null },
});

const { t } = useI18n();

const statusSalin = ref(""); // "ok" | "gagal" | ""

const angkaSah = (daftar) => daftar.filter((v) => typeof v === "number");

const nilaiAnalyzer = computed(() =>
  angkaSah(props.samples.map((s) => s.analyzer)),
);

const terkini = computed(() => {
  const v = nilaiAnalyzer.value;
  return v.length ? v[v.length - 1] : null;
});

const terendah = computed(() => {
  const v = nilaiAnalyzer.value;
  return v.length ? Math.min(...v) : null;
});

const rataRata = computed(() => {
  const v = nilaiAnalyzer.value;
  if (!v.length) return null;
  return v.reduce((a, b) => a + b, 0) / v.length;
});

const persenDiBawah = computed(() => {
  const v = nilaiAnalyzer.value;
  if (!v.length) return null;
  const kurang = v.filter((x) => x < props.threshold).length;
  return Math.round((kurang / v.length) * 100);
});

// Batas atas sumbu Y. Minimal 30 supaya garis ambang 24 Hz tidak menempel di
// tepi atas ketika lajunya kebetulan rendah semua.
const batasAtas = computed(() => {
  const semua = [
    ...nilaiAnalyzer.value,
    ...angkaSah(props.samples.map((s) => s.accepted)),
    props.threshold,
  ];
  return Math.max(30, Math.ceil(Math.max(...semua, 0) / 5) * 5);
});

const TINGGI = 40; // satuan viewBox, bukan piksel

const titik = (ambil) => {
  const n = props.samples.length;
  if (n === 0) return "";
  return props.samples
    .map((s, i) => {
      const nilai = ambil(s);
      if (typeof nilai !== "number") return null;
      // n === 1 akan membagi nol; taruh titiknya di kiri.
      const x = n === 1 ? 0 : (i / (n - 1)) * 100;
      const y = TINGGI - (nilai / batasAtas.value) * TINGGI;
      return `${x.toFixed(2)},${y.toFixed(2)}`;
    })
    .filter(Boolean)
    .join(" ");
};

const garisAnalyzer = computed(() => titik((s) => s.analyzer));
const garisDiterima = computed(() => titik((s) => s.accepted));
const yAmbang = computed(
  () => TINGGI - (props.threshold / batasAtas.value) * TINGGI,
);

const angka = (v) => (typeof v === "number" ? v.toFixed(1) : "—");

const salinLaporan = async () => {
  try {
    await navigator.clipboard.writeText(props.report);
    statusSalin.value = "ok";
  } catch {
    // Menyalin bisa ditolak browser (izin, atau konteks tidak aman).
    statusSalin.value = "gagal";
  }
};
</script>

<template>
  <section
    class="rounded-2xl border border-[#DEDEDE] dark:border-[#3A3B3D] p-4 flex flex-col gap-3"
  >
    <h3 class="text-[14px] font-semibold text-[#374151] dark:text-[#D4D4D4]">
      {{ t("scanSdk.fpsTitle") }}
    </h3>

    <p v-if="!samples.length" class="text-[13px] text-[#8E98A8]">
      {{ t("scanSdk.fpsEmpty") }}
    </p>

    <template v-else>
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div
          v-for="kotak in [
            { label: t('scanSdk.fpsNow'), nilai: terkini, cek: true },
            { label: t('scanSdk.fpsMin'), nilai: terendah, cek: true },
            { label: t('scanSdk.fpsAvg'), nilai: rataRata, cek: true },
          ]"
          :key="kotak.label"
          class="flex flex-col"
        >
          <span class="text-[11px] text-[#8E98A8]">{{ kotak.label }}</span>
          <span
            class="text-[18px] font-semibold"
            :class="
              kotak.cek &&
              typeof kotak.nilai === 'number' &&
              kotak.nilai < threshold
                ? 'text-red-600 dark:text-red-400'
                : 'text-[#195279] dark:text-[#FAFAFA]'
            "
          >
            {{ angka(kotak.nilai) }}
            <span class="text-[11px] font-normal text-[#8E98A8]">Hz</span>
          </span>
        </div>

        <div class="flex flex-col">
          <span class="text-[11px] text-[#8E98A8]">
            {{ t("scanSdk.fpsBelow") }}
          </span>
          <span
            class="text-[18px] font-semibold"
            :class="
              persenDiBawah
                ? 'text-red-600 dark:text-red-400'
                : 'text-[#195279] dark:text-[#FAFAFA]'
            "
          >
            {{ persenDiBawah === null ? "—" : persenDiBawah }}
            <span class="text-[11px] font-normal text-[#8E98A8]">%</span>
          </span>
        </div>
      </div>

      <svg
        viewBox="0 0 100 40"
        preserveAspectRatio="none"
        class="w-full h-[90px] rounded-lg bg-black/[0.03] dark:bg-white/[0.04]"
        role="img"
        :aria-label="t('scanSdk.fpsTitle')"
      >
        <line
          x1="0"
          :y1="yAmbang"
          x2="100"
          :y2="yAmbang"
          stroke="#EF4444"
          stroke-width="0.5"
          stroke-dasharray="2 2"
          vector-effect="non-scaling-stroke"
        />

        <polyline
          v-if="garisDiterima"
          :points="garisDiterima"
          fill="none"
          stroke="#2AB857"
          stroke-width="1.5"
          vector-effect="non-scaling-stroke"
        />

        <polyline
          v-if="garisAnalyzer"
          :points="garisAnalyzer"
          fill="none"
          stroke="#2E97DF"
          stroke-width="1.5"
          vector-effect="non-scaling-stroke"
        />
      </svg>

      <div class="flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-[#8E98A8]">
        <span class="flex items-center gap-1.5">
          <span class="w-3 h-0.5 bg-[#2E97DF]"></span>
          {{ t("scanSdk.rateAnalyzer") }}
        </span>

        <span v-if="pageFps !== null" class="flex items-center gap-1.5">
          {{ t("scanSdk.fpsPage") }}: {{ pageFps.toFixed(0) }} Hz
        </span>
        <span class="flex items-center gap-1.5">
          <span class="w-3 h-0.5 bg-[#2AB857]"></span>
          {{ t("scanSdk.rateAccepted") }}
        </span>
        <span class="flex items-center gap-1.5">
          <span class="w-3 h-0.5 border-t border-dashed border-red-500"></span>
          {{ t("scanSdk.fpsThreshold", { hz: threshold }) }}
        </span>
      </div>

      <div class="flex flex-wrap items-center gap-3">
        <button
          type="button"
          class="h-10 px-4 rounded-lg border border-[#DEDEDE] dark:border-[#3A3B3D] text-[13px] font-medium"
          @click="salinLaporan"
        >
          {{ t("scanSdk.fpsCopy") }}
        </button>
        <span v-if="statusSalin === 'ok'" class="text-[12px] text-[#2AB857]">
          {{ t("scanSdk.fpsCopied") }}
        </span>
        <span v-if="statusSalin === 'gagal'" class="text-[12px] text-red-600">
          {{ t("scanSdk.fpsCopyFailed") }}
        </span>
      </div>

      <pre
        v-if="statusSalin === 'gagal'"
        class="text-[11px] whitespace-pre-wrap break-words bg-black/[0.04] dark:bg-white/[0.06] rounded-lg p-3 text-[#374151] dark:text-[#D4D4D4]"
        >{{ report }}</pre>
    </template>
  </section>
</template>
