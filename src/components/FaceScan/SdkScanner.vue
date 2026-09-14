<script setup>
import { ref, computed, nextTick, onBeforeUnmount } from "vue";
import { useI18n } from "vue-i18n";
import { SelerisScanner } from "@seleris/rppg-vue";

import SdkFpsMonitor from "@/components/FaceScan/SdkFpsMonitor.vue";

const props = defineProps({
  profile: { type: Object, required: true },
});
const emit = defineEmits(["result"]);

const { t, locale } = useI18n();

// Aset runtime disajikan dari folder publik, satu direktori per versi SDK.
// BASE_URL dipakai supaya tetap benar kalau situs dipindah ke subpath.
const VERSI_SDK = "0.1.0-dev.3";
const assetBaseUrl = `${import.meta.env.BASE_URL}vendor/seleris-rppg/${VERSI_SDK}/`;

// SDK menerima id, en, atau ms. Bahasa situs dipetakan ke situ; selain itu
// jatuh ke "id" sesuai bawaan SDK.
const bahasa = computed(() => (locale.value === "en" ? "en" : "id"));

const scannerRef = ref(null);

const siap = ref(false); // event `ready` sudah datang
const adaKamera = ref(true); // dilaporkan SDK lewat payload `ready`
const versiRuntime = ref(null); // versi yang benar-benar dimuat dari folder aset
const berjalan = ref(false); // scan sedang berlangsung
const progres = ref(0); // 0..1
const sisaDetik = ref(null);
const kualitas = ref(null); // 0..1
const panduan = ref(""); // teks arahan dari SDK (wajah/cahaya)
const tahap = ref(""); // stage + kode panduan, untuk penelusuran masalah

const statusWajah = ref("");
const pesanCahaya = ref("");
const statusCahaya = ref("");
const aksesori = ref(null);
const galat = ref(null);

// liveVitals: detak SEMENTARA selama scan berjalan. Bukan hasil akhir.
const hrSementara = ref(null);

// heatmapStatus: heatmap digambar SDK sendiri di atas video. Host cukup
// menyalakan/mematikan dan mengetahui kapan sudah benar-benar terlihat.
const heatmapAktif = ref(true);
const heatmapTerlihat = ref(false);

// Laju gambar per detik, dari event `quality`. Ambang cadence-nya 24 Hz.
const CADENCE_MINIMUM_HZ = 24;
const lajuAnalyzer = ref(null);
const lajuDiterima = ref(null);

const BATAS_RIWAYAT = 1200;
const riwayatLaju = ref([]);
// Ditulis tiap sampel, tapi TIDAK reaktif. Salinannya baru dipindahkan ke
// riwayatLaju secara berkala — lihat catatLaju().
let bufferLaju = [];
let mulaiPadaMs = 0;
let idSegarGrafik = 0;

const segarkanGrafik = () => {
  if (idSegarGrafik) {
    clearTimeout(idSegarGrafik);
    idSegarGrafik = 0;
  }
  riwayatLaju.value = bufferLaju.slice();
};

const catatLaju = (analyzer, accepted) => {
  if (!mulaiPadaMs) return; // belum ada scan berjalan, jangan dicatat
  if (typeof analyzer !== "number" && typeof accepted !== "number") return;
  bufferLaju.push({
    detik: (Date.now() - mulaiPadaMs) / 1000,
    analyzer: typeof analyzer === "number" ? analyzer : null,
    accepted: typeof accepted === "number" ? accepted : null,
  });
  if (bufferLaju.length > BATAS_RIWAYAT) bufferLaju.shift();

  // Grafik dan statistik di SdkFpsMonitor dihitung ulang penuh setiap daftar
  // ini berubah. Kalau disegarkan tiap sampel, kerjanya jatuh ~30x per detik
  // di main thread yang SAMA dengan penganalisis yang sedang diukur.
  if (!idSegarGrafik) {
    idSegarGrafik = setTimeout(() => {
      idSegarGrafik = 0;
      riwayatLaju.value = bufferLaju.slice();
    }, 250);
  }
};

const fpsHalaman = ref(null);
let idFrame = 0;
let jumlahFrame = 0;
let detakTerakhir = 0;

const mulaiUkurHalaman = () => {
  hentikanUkurHalaman();
  jumlahFrame = 0;
  detakTerakhir = performance.now();
  const langkah = (waktu) => {
    jumlahFrame += 1;
    const selisih = waktu - detakTerakhir;
    if (selisih >= 1000) {
      fpsHalaman.value = (jumlahFrame * 1000) / selisih;
      jumlahFrame = 0;
      detakTerakhir = waktu;
    }
    idFrame = requestAnimationFrame(langkah);
  };
  idFrame = requestAnimationFrame(langkah);
};

function hentikanUkurHalaman() {
  if (idFrame) cancelAnimationFrame(idFrame);
  idFrame = 0;
  // Scan berhenti: tarik sisa sampel supaya laporannya utuh.
  segarkanGrafik();
}

// Jangan biarkan loop-nya hidup setelah komponen dilepas.
onBeforeUnmount(hentikanUkurHalaman);

const labelKamera = ref("");
const bacaKamera = async () => {
  try {
    const daftar = await navigator.mediaDevices?.enumerateDevices();
    if (!daftar) return;
    labelKamera.value = daftar
      .filter((d) => d.kind === "videoinput")
      .map((d) => d.label || "(nama disembunyikan sampai izin diberikan)")
      .join(" | ");
  } catch {
    // Tidak didukung atau ditolak; laporan tetap bisa dikirim tanpa ini.
  }
};

const mulaiPencatatan = () => {
  bufferLaju = [];
  riwayatLaju.value = [];
  mulaiPadaMs = Date.now();
  fpsHalaman.value = null;
  mulaiUkurHalaman();
  bacaKamera(); // namanya biasanya baru terbaca setelah izin kamera diberikan
};

const persen = computed(() => Math.round(progres.value * 100));

const TAHAP_SELESAI = ["cancelled", "failed", "completedInsufficient"];

const onReady = (kemampuan) => {
  siap.value = true;
  adaKamera.value = kemampuan?.camera !== false;
  versiRuntime.value = kemampuan?.sdkVersion || null;
};

const teksSDK = (nilai) => {
  if (!nilai) return "";
  if (typeof nilai === "string") return nilai;
  if (typeof nilai !== "object") return String(nilai);
  return nilai.selected || nilai[locale.value] || nilai.id || nilai.en || "";
};

const onState = (s) => {
  // SDK mengirim arahan siap pakai; dipakai apa adanya supaya tidak
  // menerjemahkan ulang kode panduannya sendiri.
  panduan.value = teksSDK(s?.guidance);
  statusWajah.value = s?.faceStatus || "";
  statusCahaya.value = s?.lighting?.status || "";
  pesanCahaya.value = teksSDK(s?.lighting?.message);
  aksesori.value = s?.accessory || null;

  tahap.value = [
    s?.stage,
    s?.guidanceCode,
    s?.faceStatus,
    s?.lighting?.status,
    s?.accessory,
  ]
    .filter(Boolean)
    .join(" · ");

  if (TAHAP_SELESAI.includes(s?.stage)) {
    berjalan.value = false;
    hrSementara.value = null;
    hentikanUkurHalaman();
  }
};

const onProgress = (p) => {
  progres.value = p?.value ?? 0;
  sisaDetik.value = p?.remainingSeconds ?? null;
};

const onQuality = (q) => {
  kualitas.value = q?.score ?? null;
  lajuAnalyzer.value = q?.analyzerRateHz ?? null;
  lajuDiterima.value = q?.acceptedRateHz ?? null;
  catatLaju(lajuAnalyzer.value, lajuDiterima.value);
};

const onLiveVitals = (v) => {
  hrSementara.value = typeof v?.heartRate === "number" ? v.heartRate : null;
};

const onHeatmapStatus = (h) => {
  heatmapTerlihat.value = !!h?.visible;
};

const onResult = (hasil) => {
  berjalan.value = false;
  hentikanUkurHalaman();
  hrSementara.value = null;
  emit("result", hasil);
};

const onError = (e) => {
  berjalan.value = false;
  hentikanUkurHalaman();
  hrSementara.value = null;
  galat.value = e;
};

const saranGalat = computed(() => {
  const kode = galat.value?.code;
  if (kode === "CAMERA_PERMISSION_DENIED") return t("scanSdk.helpPermission");
  if (kode === "CAMERA_CONFIG_FAILED" || kode === "CAMERA_STREAM_ENDED")
    return t("scanSdk.helpCameraBusy");
  // Dua kelompok PREFLIGHT_ yang penyebabnya BERBEDA, jadi sarannya juga
  // harus berbeda:
  //   CADENCE  -> penganalisis tidak sanggup 24 Hz; ini soal kecepatan.
  //   ACCEPTED -> kecepatannya cukup, tapi terlalu banyak gambar DITOLAK
  //               sebelum diterima; ini soal kelayakan gambar (kacamata,
  //               masker, cahaya, posisi wajah, gerakan).
  if (typeof kode === "string" && kode.startsWith("PREFLIGHT_")) {
    return kode.includes("CADENCE")
      ? t("scanSdk.helpPreflight")
      : t("scanSdk.helpPreflightAccepted");
  }
  return "";
});

const mulai = async () => {
  galat.value = null;
  progres.value = 0;
  sisaDetik.value = null;
  mulaiPencatatan();
  // Ditandai berjalan SEJAK tombol ditekan, bukan menunggu event progres
  // pertama. Izin kamera bisa memakan beberapa detik; tanpa ini tombol
  // "Mulai scan" masih terlihat aktif dan gampang tertekan dua kali.
  berjalan.value = true;
  try {
    await scannerRef.value?.start();
  } catch (e) {
    berjalan.value = false;
    onError({ code: e?.code || "SDK_ERROR", message: e?.message || String(e) });
  }
};

const batal = async () => {
  try {
    await scannerRef.value?.cancel();
  } finally {
    berjalan.value = false;
    hrSementara.value = null;
    progres.value = 0;
    sisaDetik.value = null;
    hentikanUkurHalaman();
  }
};

const ulangiScan = async () => {
  galat.value = null;
  progres.value = 0;
  sisaDetik.value = null;
  mulaiPencatatan();
  berjalan.value = true;
  try {
    await scannerRef.value?.retry();
  } catch {
    await mulai();
  }
};

const bisaCobaTanpaHeatmap = computed(
  () =>
    heatmapAktif.value &&
    typeof galat.value?.code === "string" &&
    // Hanya untuk penolakan karena KECEPATAN. Kalau gambarnya ditolak karena
    // kacamata atau cahaya, mematikan heatmap tidak menolong apa pun.
    galat.value.code.includes("CADENCE"),
);

const ulangiTanpaHeatmap = async () => {
  heatmapAktif.value = false;
  // Beri kesempatan SDK menerima setHeatmapEnabled(false) lewat watcher-nya
  // sebelum pemindaian berikutnya dimulai.
  await nextTick();
  await ulangiScan();
};

const laporan = computed(() => {
  // riwayatLaju sebagai pemicu; angkanya diambil dari buffer yang paling baru.
  const sumber = riwayatLaju.value.length ? bufferLaju : [];
  const analyzer = sumber
    .map((r) => r.analyzer)
    .filter((v) => typeof v === "number");
  const accepted = sumber
    .map((r) => r.accepted)
    .filter((v) => typeof v === "number");
  const ringkas = (daftar) =>
    daftar.length
      ? `min ${Math.min(...daftar).toFixed(1)} / rata-rata ${(
          daftar.reduce((a, b) => a + b, 0) / daftar.length
        ).toFixed(1)} / maks ${Math.max(...daftar).toFixed(1)} Hz`
      : "tidak ada data";
  const durasi = sumber.length
    ? `${sumber[sumber.length - 1].detik.toFixed(1)} detik`
    : "-";

  return [
    "=== Laporan pemindaian Seleris rPPG ===",
    `Versi SDK        : ${VERSI_SDK}`,
    `Versi runtime    : ${versiRuntime.value || "-"}`,
    `Waktu            : ${new Date().toISOString()}`,
    `Browser          : ${navigator.userAgent}`,
    `Layar            : ${window.innerWidth}x${window.innerHeight} @ ${window.devicePixelRatio}x`,
    `Kamera           : front`,
    `Perangkat kamera : ${labelKamera.value || "-"}`,
    `Bahasa SDK       : ${bahasa.value}`,
    `Heatmap          : ${heatmapAktif.value ? "menyala" : "mati"}`,
    "",
    `Laju penganalisis: ${ringkas(analyzer)}   (ambang ${CADENCE_MINIMUM_HZ} Hz)`,
    `Laju diterima    : ${ringkas(accepted)}`,
    `FPS halaman ini  : ${fpsHalaman.value === null ? "-" : fpsHalaman.value.toFixed(1) + " Hz"}`,
    `Jumlah catatan   : ${sumber.length}`,
    `Durasi           : ${durasi}`,
    "",
    `SQI terakhir     : ${kualitas.value === null ? "-" : kualitas.value.toFixed(3)}`,
    `Tahap terakhir   : ${tahap.value || "-"}`,
    `Status wajah     : ${statusWajah.value || "-"}`,
    `Cahaya           : ${statusCahaya.value || "-"}`,
    `Aksesori         : ${aksesori.value || "tidak ada"}`,
    "",
    `Kode penolakan   : ${galat.value?.code || "-"}`,
    `Pesan            : ${teksSDK(galat.value?.message) || "-"}`,
  ].join("\n");
});

const simpanHeatmap = async () => {
  try {
    const blob = await scannerRef.value?.exportHeatmap({ composite: true });
    if (!blob) return;
    const url = URL.createObjectURL(blob);
    const tautan = document.createElement("a");
    tautan.href = url;
    tautan.download = "seleris-heatmap.png";
    tautan.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  } catch (e) {
    // HEATMAP_NOT_READY berarti belum ada heatmap yang layak diekspor.
    onError({
      code: e?.code || "HEATMAP_NOT_READY",
      message: e?.message || t("scanSdk.heatmapWaiting"),
    });
  }
};

// Dipakai halaman untuk menekan "Scan ulang" dari panel hasil, tanpa perlu
// melepas dan memasang ulang scanner (yang berarti memuat ulang seluruh aset).
defineExpose({ ulangiScan });
</script>

<template>
  <div class="w-full max-w-2xl mx-auto flex flex-col gap-5">
    <div
      class="relative w-full aspect-[3/4] sm:aspect-[4/3] max-h-[60dvh] rounded-2xl overflow-hidden bg-black/5 dark:bg-white/5"
    >
      <SelerisScanner
        ref="scannerRef"
        :asset-base-url="assetBaseUrl"
        :profile="props.profile"
        :language="bahasa"
        camera-facing="front"
        :heatmap-enabled="heatmapAktif"
        @ready="onReady"
        @state="onState"
        @progress="onProgress"
        @quality="onQuality"
        @live-vitals="onLiveVitals"
        @heatmap-status="onHeatmapStatus"
        @result="onResult"
        @error="onError"
      />
    </div>

    <div
      v-if="siap && !adaKamera"
      class="rounded-xl border border-amber-300 bg-amber-50 dark:bg-amber-950/30 px-4 py-3 text-[13px] text-amber-800 dark:text-amber-300"
    >
      {{ t("scanSdk.cameraUnavailable") }}
    </div>

    <div
      v-if="aksesori"
      class="rounded-xl border border-amber-300 bg-amber-50 dark:bg-amber-950/30 px-4 py-3 text-[13px] text-amber-800 dark:text-amber-300"
    >
      {{ t("scanSdk.accessoryBlocking", { item: aksesori }) }}
    </div>

    <p
      v-if="pesanCahaya && statusCahaya !== 'ready'"
      class="text-[13px] text-center text-amber-700 dark:text-amber-400"
    >
      {{ t("scanSdk.lightingLabel") }}: {{ pesanCahaya }}
    </p>

    <p
      v-if="panduan"
      aria-live="polite"
      class="text-[14px] text-center text-[#6F6F6F] dark:text-[#AAAAAA]"
    >
      {{ panduan }}
    </p>

    <div v-if="berjalan" class="flex flex-col gap-2">
      <div class="flex justify-between text-[13px] text-[#6F6F6F]">
        <span>{{ t("scanSdk.scanning") }}</span>
        <span v-if="sisaDetik !== null">
          {{ t("scanSdk.remaining", { seconds: Math.ceil(sisaDetik) }) }}
        </span>
      </div>
      <div
        class="w-full h-2 rounded-full bg-black/10 dark:bg-white/10 overflow-hidden"
      >
        <div
          class="h-full bg-[#2AB857] transition-all duration-200"
          :style="{ width: persen + '%' }"
        ></div>
      </div>

      <div class="flex flex-wrap gap-x-4 gap-y-1 text-[12px] text-[#8E98A8]">
        <span v-if="kualitas !== null">
          {{ t("scanSdk.quality") }}: {{ Math.round(kualitas * 100) }}%
        </span>

        <span v-if="hrSementara !== null">
          {{ t("scanSdk.liveHr") }}: {{ Math.round(hrSementara) }} bpm
          <span class="opacity-70">({{ t("scanSdk.provisionalNote") }})</span>
        </span>

        <span
          v-if="lajuAnalyzer !== null"
          :class="
            lajuAnalyzer < CADENCE_MINIMUM_HZ ? 'text-red-600 font-medium' : ''
          "
        >
          {{ t("scanSdk.rateAnalyzer") }}: {{ lajuAnalyzer.toFixed(1) }} Hz
          <span class="opacity-70">({{ t("scanSdk.rateNeeded") }})</span>
        </span>
        <span v-if="lajuDiterima !== null">
          {{ t("scanSdk.rateAccepted") }}: {{ lajuDiterima.toFixed(1) }} Hz
        </span>
      </div>
    </div>

    <div
      v-if="galat"
      role="alert"
      class="rounded-xl border border-red-300 bg-red-50 dark:bg-red-950/30 px-4 py-3"
    >
      <p class="text-[14px] font-medium text-red-700 dark:text-red-300">
        {{ t("scanSdk.errorTitle") }}
      </p>
      <p
        v-if="teksSDK(galat.message)"
        class="text-[13px] text-red-600 dark:text-red-400 mt-1"
      >
        {{ teksSDK(galat.message) }}
      </p>
      <p v-if="saranGalat" class="text-[13px] text-red-600 dark:text-red-400">
        {{ saranGalat }}
      </p>
      <p v-if="galat.code" class="text-[11px] text-red-500/70 mt-1">
        {{ galat.code }}
      </p>

      <button
        v-if="bisaCobaTanpaHeatmap"
        type="button"
        class="mt-3 h-10 px-4 rounded-lg bg-white dark:bg-[#27272A] border border-red-300 dark:border-red-500/50 text-[13px] font-medium text-red-700 dark:text-red-300"
        @click="ulangiTanpaHeatmap"
      >
        {{ t("scanSdk.retryNoHeatmap") }}
      </button>
    </div>

    <p v-if="tahap" class="text-[11px] text-[#8E98A8]">
      {{ t("scanSdk.techStatus") }}: {{ tahap }}
    </p>

    <SdkFpsMonitor
      :samples="riwayatLaju"
      :threshold="CADENCE_MINIMUM_HZ"
      :report="laporan"
      :page-fps="fpsHalaman"
    />

    <div class="flex flex-col sm:flex-row gap-3">
      <button
        v-if="!berjalan"
        type="button"
        :disabled="!siap || !adaKamera"
        class="flex-1 h-12 rounded-xl text-white font-medium transition-all duration-300"
        :class="
          siap && adaKamera
            ? 'bg-gradient-to-tr from-[#1E6493] to-[#2E97DF] active:scale-[0.99]'
            : 'bg-gray-400 cursor-not-allowed opacity-60'
        "
        @click="galat ? ulangiScan() : mulai()"
      >
        {{
          !siap
            ? t("scanSdk.preparing")
            : galat
              ? t("scanSdk.retry")
              : t("scanSdk.start")
        }}
      </button>

      <button
        v-else
        type="button"
        class="flex-1 h-12 rounded-xl border border-[#DEDEDE] dark:border-[#3A3B3D] font-medium"
        @click="batal"
      >
        {{ t("scanSdk.cancel") }}
      </button>
    </div>

    <div class="flex flex-wrap items-center justify-between gap-3">
      <label class="flex items-center gap-2 cursor-pointer">
        <input
          v-model="heatmapAktif"
          type="checkbox"
          class="w-4 h-4 accent-[#2AB857]"
        />
        <span class="text-[13px] text-[#6F6F6F] dark:text-[#AAAAAA]">
          {{ t("scanSdk.heatmapToggle") }}
        </span>
      </label>

      <button
        type="button"
        :disabled="!heatmapTerlihat"
        class="text-[13px] underline underline-offset-2 disabled:opacity-40 disabled:no-underline disabled:cursor-not-allowed text-[#2E97DF]"
        @click="simpanHeatmap"
      >
        {{ t("scanSdk.heatmapSave") }}
      </button>
    </div>
  </div>
</template>
