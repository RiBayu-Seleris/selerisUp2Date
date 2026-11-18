<script setup>
import { ref, computed, watch, nextTick, onBeforeUnmount } from "vue";
import { useI18n } from "vue-i18n";
import { SelerisScanner } from "@seleris/rppg-vue";

import SdkFpsMonitor from "@/components/FaceScan/SdkFpsMonitor.vue";
import { useCekKamera } from "@/composables/useCekKamera";

const props = defineProps({
  profile: { type: Object, required: true },
});
// `mulai` memberi tahu halaman bahwa scan BARU berjalan. Tanpa ini halaman
// tidak punya cara tahu bahwa hasil lama sudah basi, dan kartu hasil
// sebelumnya tetap menempel saat pengunjung menekan tombol milik scanner.
const emit = defineEmits(["result", "mulai"]);

const { t, locale } = useI18n();

// Aset runtime disajikan dari folder publik, satu direktori per versi SDK.
// BASE_URL dipakai supaya tetap benar kalau situs dipindah ke subpath.
const VERSI_SDK = "0.1.0-dev.5";
const assetBaseUrl = `${import.meta.env.BASE_URL}vendor/seleris-rppg/${VERSI_SDK}/`;

// SDK menerima id, en, atau ms. Bahasa situs dipetakan ke situ; selain itu
// jatuh ke "id" sesuai bawaan SDK.
const bahasa = computed(() => (locale.value === "en" ? "en" : "id"));

// Panel diagnostik (laju kamera, status teknis, laporan UAT) bukan untuk
// pengunjung. Dibuka dengan menambahkan ?debug=1 pada URL.
const debug = (() => {
  try {
    return new URLSearchParams(window.location.search).has("debug");
  } catch {
    return false;
  }
})();

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

const LEBAR_GELOMBANG = 200;
const TINGGI_GELOMBANG = 40;
const BATAS_RIWAYAT_SQI = 120;
const riwayatSqi = ref([]);

const ySqi = (v) => TINGGI_GELOMBANG - 3 - v * (TINGGI_GELOMBANG - 6);

const titikSqi = computed(() => {
  const data = riwayatSqi.value;
  if (data.length < 2) return "";
  const langkah = LEBAR_GELOMBANG / (BATAS_RIWAYAT_SQI - 1);
  const awal = LEBAR_GELOMBANG - (data.length - 1) * langkah;
  return data
    .map((v, i) => `${(awal + i * langkah).toFixed(2)},${ySqi(v).toFixed(2)}`)
    .join(" ");
});

const areaSqi = computed(() => {
  if (!titikSqi.value) return "";
  const langkah = LEBAR_GELOMBANG / (BATAS_RIWAYAT_SQI - 1);
  const awal = LEBAR_GELOMBANG - (riwayatSqi.value.length - 1) * langkah;
  return `${awal.toFixed(2)},${TINGGI_GELOMBANG} ${titikSqi.value} ${LEBAR_GELOMBANG},${TINGGI_GELOMBANG}`;
});

const ujungSqi = computed(() => {
  const data = riwayatSqi.value;
  if (!data.length) return 50;
  return (ySqi(data[data.length - 1]) / TINGGI_GELOMBANG) * 100;
});

watch(berjalan, (aktif) => {
  if (aktif) riwayatSqi.value = [];
});

// Laju gambar per detik, dari event `quality`. Ambang cadence-nya 24 Hz.
const CADENCE_MINIMUM_HZ = 24;
// Ambang yang benar-benar dipakai untuk menilai. Sama dengan konstanta di
// atas sampai SDK melaporkan angkanya sendiri lewat event `ready`.
const ambangHz = ref(CADENCE_MINIMUM_HZ);

// Pemeriksaan kamera dan cahaya sebelum scan. Lihat useCekKamera untuk
// alasan kenapa ini harus terjadi sebelum pengunjung menekan "Mulai scan".
const {
  memeriksa: memeriksaKamera,
  hasil: cekKamera,
  periksa,
} = useCekKamera();
const sudahDicek = ref(false);

// Pengunjung boleh menolak nasihat kita. Pemeriksaan ini pengukuran singkat,
// dan pengukuran singkat bisa salah — kamera yang baru bangun kadang melapor
// rendah pada detik pertama lalu membaik. Jadi tombolnya ditahan, bukan
// dihilangkan: yang keliru diberi jalan keluar, yang benar tetap terlindungi.
const abaikanPeringatan = ref(false);

// Kamera yang tidak sanggup 24 gambar per detik adalah batas keras: tidak ada
// optimasi kode yang bisa melewatinya, karena gambarnya memang tidak pernah
// tiba. Dibedakan dari masalah cahaya, yang masih bisa diperbaiki pengunjung
// saat itu juga.
const kameraTerlaluLambat = computed(
  () => cekKamera.value?.masalah?.includes("laju") === true,
);

// Yang menahan tombol hanya laju kamera. Cahaya TIDAK menahan: SDK punya
// gerbang cahayanya sendiri yang menuntun pengunjung saat scan berjalan, dan
// cahaya masih bisa diperbaiki sambil wajah sudah di depan kamera.
const tertahan = computed(
  () => kameraTerlaluLambat.value && !abaikanPeringatan.value,
);

const periksaUlang = () => {
  abaikanPeringatan.value = false;
  periksa();
};
const cahayaBermasalah = computed(() => {
  const nilai = cekKamera.value?.cahaya;
  return nilai === "gelap" || nilai === "backlight";
});

// Gerbang tampilnya kartu pemeriksaan kamera. Keadaan sehat tidak
// diumumkan sama sekali.
const adaMasalahKamera = computed(
  () =>
    cekKamera.value?.status === "galat" ||
    kameraTerlaluLambat.value ||
    cahayaBermasalah.value,
);
const lajuAnalyzer = ref(null);
const lajuDiterima = ref(null);

// Tiga besaran yang di dev.3 tercampur jadi satu angka bernama `cameraFps`.
// Sekarang dipisah, dan pemisahan itulah yang membuat diagnosisnya mungkin:
//   lajuKamera   -> yang dijanjikan track kamera (getSettings().frameRate)
//   lajuAnalyzer -> frame yang benar-benar selesai diproses main thread
//   lajuDiterima -> sampel yang lolos worker ME-rPPG
// Kamera 30 tapi analyzer 12 berarti perangkatnya yang tidak sanggup;
// kamera 15 berarti kameranya yang memang tidak pernah mengirim cukup.
const lajuKamera = ref(null);

// p50/p95 per tahap: total frame, deteksi wajah, cahaya, kirim aksesori,
// pembacaan wajah, dan round-trip worker. Menggantikan tebak-tebakan.
const waktuProses = ref(null);

// Dilaporkan SDK di event `ready`. Kalau false, mode banyak thread mati dan
// seluruh inferensi WASM berjalan satu thread.
const terisolasi = ref(null);
const modeAksesori = ref(null);

// Telemetri gerak, baru di dev.5. Dokumen MOTION-GATE meminta lima sampel
// terakhir dilampirkan setiap kali penolakan gerak masih terjadi — angka-angka
// inilah yang memisahkan "pengunjung memang bergerak" dari "detektornya yang
// bergetar", dan tidak satu pun bisa ditebak dari layar.
const BATAS_RIWAYAT_GERAK = 5;
const riwayatGerak = ref([]);
const versiAlgoritmaGerak = ref(null);

const BATAS_RIWAYAT = 1200;
const riwayatLaju = ref([]);
// Ditulis tiap sampel, tapi TIDAK reaktif. Salinannya baru dipindahkan ke
// riwayatLaju sekali saja, saat scan berhenti — lihat segarkanGrafik().
let bufferLaju = [];
let mulaiPadaMs = 0;

// Setiap kali daftar ini berubah, SdkFpsMonitor menghitung ulang SEMUANYA:
// enam computed atas maksimal 1200 sampel, ditambah dua polyline SVG 1200
// titik. Itu berjalan di main thread yang SAMA dengan penganalisis yang
// sedang diukur, jadi grafiknya ikut menurunkan angka yang ia laporkan.
//
// Karena itu selama scan berjalan grafiknya TIDAK diperbarui sama sekali.
// Angka langsungnya tetap terlihat di baris kemajuan (lajuAnalyzer dan
// lajuDiterima), dan grafik utuhnya digambar sekali begitu scan berhenti —
// baik karena selesai, dibatalkan, maupun ditolak.
const segarkanGrafik = () => {
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
  riwayatGerak.value = [];
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

  // SDK melaporkan ambangnya sendiri lewat kemampuan. Dipakai kalau ada,
  // supaya angka di layar tidak perlu diperbaiki manual saat SDK naik versi
  // dan mengubah ambangnya.
  //
  // dev.4 mengganti nama field ini dari preflightAnalyzerMinimumRateHz.
  // Keduanya tetap dibaca: kalau aset yang tersaji sempat tertinggal di versi
  // lama — kasus yang justru diperingatkan dokumen upgrade-nya — angkanya
  // masih terbaca, bukan diam-diam jatuh ke nilai cadangan.
  const ambangSDK =
    kemampuan?.minimumAnalyzerRateHz ??
    kemampuan?.preflightAnalyzerMinimumRateHz;

  if (typeof ambangSDK === "number" && ambangSDK > 0) {
    ambangHz.value = ambangSDK;
  }

  terisolasi.value =
    typeof kemampuan?.crossOriginIsolated === "boolean"
      ? kemampuan.crossOriginIsolated
      : null;
  modeAksesori.value = kemampuan?.accessoryInference || null;

  // Diperiksa sendiri HANYA kalau izin kameranya sudah pernah diberikan.
  //
  // Kalau belum, memanggilnya di sini berarti memunculkan permintaan izin
  // begitu halaman terbuka, tanpa pengunjung menyentuh apa pun. Itu menakutkan
  // pada halaman yang memindai wajah, dan sebagian browser memang menolak
  // permintaan kamera yang tidak lahir dari tekanan tombol. Untuk pengunjung
  // yang belum memberi izin, pemeriksaannya menumpang pada tombol "Mulai
  // scan" — lihat mulai().
  if (!sudahDicek.value) {
    izinKameraSudahAda().then((sudah) => {
      if (!sudah || sudahDicek.value) return;
      sudahDicek.value = true;
      periksa();
    });
  }
};

/**
 * Apakah izin kamera sudah pernah diberikan sebelumnya?
 *
 * Permissions API belum ada di semua browser untuk "camera". Yang tidak bisa
 * menjawab diperlakukan sebagai BELUM diberikan — memilih diam lebih aman
 * daripada memunculkan permintaan izin yang tidak diminta.
 */
const izinKameraSudahAda = async () => {
  try {
    const izin = await navigator.permissions?.query({ name: "camera" });
    return izin?.state === "granted";
  } catch {
    return false;
  }
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

  // `warming_up` dilewati: detektornya belum menilai apa pun, jadi angkanya
  // hanya akan mengisi jatah lima sampel dengan nol.
  const gerak = s?.motion;
  if (gerak && gerak.detectorState !== "warming_up") {
    versiAlgoritmaGerak.value = gerak.algorithmVersion || null;
    riwayatGerak.value = [...riwayatGerak.value, gerak].slice(
      -BATAS_RIWAYAT_GERAK,
    );
  }

  tahap.value = [
    s?.stage,
    s?.guidanceCode,
    s?.faceStatus,
    s?.lighting?.status,
    s?.accessory,
    // Checklist UAT `.5` menyuruh penguji memastikan "bicara terus" berakhir
    // `moving` dengan alasan persistent_lip_activity. Tanpa ditampilkan,
    // itu baru terbaca setelah scan-nya terlanjur ditolak.
    gerak?.active ? `moving:${gerak.reason || "?"}` : gerak?.detectorState,
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
  if (
    berjalan.value &&
    typeof q?.score === "number" &&
    Number.isFinite(q.score)
  ) {
    const nilai = Math.min(1, Math.max(0, q.score));
    riwayatSqi.value = [...riwayatSqi.value, nilai].slice(-BATAS_RIWAYAT_SQI);
  }
  lajuAnalyzer.value = q?.analyzerRateHz ?? null;
  lajuDiterima.value = q?.acceptedRateHz ?? null;
  lajuKamera.value = q?.cameraRateHz ?? null;
  waktuProses.value = q?.processing ?? null;
  catatLaju(lajuAnalyzer.value, lajuDiterima.value);
};

const onLiveVitals = (v) => {
  if (typeof v?.heartRate === "number") hrSementara.value = v.heartRate;
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

// Tiga dari lima alasan gerak punya perbaikan yang berbeda dan bisa disebut
// ke pengunjung. Dua sisanya (sudden_translation, gradual_translation) jatuh
// ke saran umum "tahan kepala" karena perbaikannya memang sama.
const SARAN_GERAK = {
  persistent_lip_activity: "scanSdk.helpMotionLip",
  pose_change: "scanSdk.helpMotionPose",
  scale_change: "scanSdk.helpMotionScale",
};

const saranGalat = computed(() => {
  const kode = galat.value?.code;
  if (kode === "CAMERA_PERMISSION_DENIED") return t("scanSdk.helpPermission");
  if (kode === "CAMERA_CONFIG_FAILED" || kode === "CAMERA_STREAM_ENDED")
    return t("scanSdk.helpCameraBusy");

  // Baru di dev.4. SDK kini meminta minimum 24 fps langsung ke browser, jadi
  // kamera yang tidak sanggup ditolak SEBELUM pemindaian dimulai — bukan
  // setelah pengunjung menahan wajah lima detik seperti sebelumnya.
  if (kode === "CAMERA_CADENCE_UNSUPPORTED")
    return t("scanSdk.helpCameraCadence", {
      hz: galat.value?.details?.minimumRateHz ?? ambangHz.value,
    });
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

  // Baru di dev.5. SDK kini menyebut ALASAN penolakan geraknya, jadi sarannya
  // bisa menyebut hal yang benar — "jangan bicara" dan "jangan menoleh" adalah
  // dua perbaikan yang berbeda. `motion_reason` kosong kalau penolakan datang
  // dari jeda, bukan dari satu episode; di situ pemicu terbanyak yang dipakai.
  if (kode === "MEASUREMENT_MOTION_REJECTED") {
    const d = galat.value?.details;
    const dominan =
      d?.motion_reason ||
      Object.entries(d?.motion_trigger_counts || {}).sort(
        (a, b) => b[1] - a[1],
      )[0]?.[0];

    return t(SARAN_GERAK[dominan] || "scanSdk.helpMotion");
  }

  return "";
});

const mulai = async () => {
  emit("mulai");
  galat.value = null;
  progres.value = 0;
  sisaDetik.value = null;

  // Pengunjung yang belum pernah memberi izin kamera baru diperiksa di sini,
  // pada tekanan tombolnya sendiri. Permintaan izin yang muncul karenanya
  // dipakai dua kali: sekali untuk pemeriksaan ini, lalu oleh SDK.
  if (!sudahDicek.value) {
    sudahDicek.value = true;
    await periksa();
    // Kamera baru saja dilepas. Membukanya kembali seketika membuat sebagian
    // perangkat menjawab CAMERA_CONFIG_FAILED, jadi diberi jeda sebentar
    // supaya driver-nya sempat benar-benar melepaskan.
    await new Promise((r) => setTimeout(r, 250));
  }

  // Kameranya tidak sanggup. Menjalankan scan sekarang berarti menghabiskan
  // satu setengah menit pengunjung untuk penolakan yang sudah bisa kita
  // ramalkan. Panelnya sudah menjelaskan sebab dan jalan keluarnya.
  if (tertahan.value) return;

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
  emit("mulai");
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

// Hasil pemeriksaan pra-scan ikut disalin ke laporan. Tanpa ini tim SDK
// tidak bisa membedakan "penganalisisnya lambat" dari "kameranya memang cuma
// mengirim 15 gambar per detik" — dua sebab berbeda dengan angka akhir sama.
const ringkasCek = () => {
  const c = cekKamera.value;
  if (!c) return "belum dijalankan";
  if (c.status === "galat") return `gagal (${c.kode})`;
  const laju = [
    c.fpsKamera === null ? null : `setelan ${c.fpsKamera} Hz`,
    c.fpsDiukur === null ? null : `terukur ${c.fpsDiukur.toFixed(1)} Hz`,
  ]
    .filter(Boolean)
    .join(", ");
  const ukuran = c.lebar && c.tinggi ? `${c.lebar}x${c.tinggi}` : "ukuran ?";
  return `${ukuran}, ${laju || "laju ?"}, cahaya ${c.cahaya}`;
};

// Rincian waktu per tahap dari event `quality` dev.4. Inilah yang membuat
// "lambat" bisa ditunjuk penyebabnya: deteksi wajah, gerbang cahaya,
// pengiriman ke worker aksesori, pembacaan piksel wajah, atau round-trip
// worker ME-rPPG. Anggarannya 41,7 ms untuk 24 Hz.
const ringkasProses = () => {
  const p = waktuProses.value;
  if (!p) return "tidak dilaporkan";

  const angka = (v) => (typeof v === "number" ? `${v.toFixed(1)}ms` : "-");
  const bagian = Object.entries(p)
    .map(([nama, nilai]) => {
      if (!nilai || typeof nilai !== "object") return null;
      return `${nama} p50 ${angka(nilai.p50)} / p95 ${angka(nilai.p95)}`;
    })
    .filter(Boolean);

  return bagian.length ? bagian.join(" | ") : "tidak dilaporkan";
};

const angkaGerak = (nilai, digit = 4) =>
  typeof nilai === "number" ? nilai.toFixed(digit) : "-";

const barisGerak = (m) =>
  [
    `  ${m.detectorState}`,
    `reason=${m.reason || "-"}`,
    `center=${angkaGerak(m.centerDeltaRatio)}`,
    `scale=${angkaGerak(m.scaleDeltaRatio)}`,
    `pose=${angkaGerak(m.poseDeltaDegrees, 2)}deg`,
    `jitter=${angkaGerak(m.boxJitterRatio)}`,
    `lipScore=${angkaGerak(m.lipVisualScore)}`,
    `lipFrac=${angkaGerak(m.lipActiveFraction, 3)}`,
    `rejRatio=${angkaGerak(m.motionRejectionRatio, 3)}`,
    `gap=${angkaGerak(m.activeGapSeconds, 2)}s`,
    `triggers=${JSON.stringify(m.triggerCounts || {})}`,
  ].join(" ");

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
    `Cek pra-scan     : ${ringkasCek()}`,
    `Bahasa SDK       : ${bahasa.value}`,
    "",
    `Isolasi origin   : ${terisolasi.value === null ? "tidak dilaporkan" : terisolasi.value ? "aktif (banyak thread)" : "MATI (satu thread)"}`,
    `Inferensi aksesori: ${modeAksesori.value || "-"}`,
    "",
    `Laju kamera      : ${lajuKamera.value === null ? "-" : lajuKamera.value.toFixed(1) + " Hz"}`,
    `Laju penganalisis: ${ringkas(analyzer)}   (ambang ${ambangHz.value} Hz)`,
    `Laju diterima    : ${ringkas(accepted)}`,
    `Waktu per frame  : ${ringkasProses()}`,
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
    // `details` dibawa SDK pada penolakan gerak dan cadence. Isinya angka
    // yang tidak bisa ditebak dari layar — rasio penolakan gerak, jumlah
    // sampel teramati, panjang jeda — dan justru itu yang dibutuhkan tim SDK
    // untuk menilai apakah ambangnya terlalu ketat.
    `Detail penolakan : ${
      galat.value?.details ? JSON.stringify(galat.value.details) : "-"
    }`,
    "",
    // Format ini mengikuti bagian "Data lapangan yang kami butuhkan" di
    // MOTION-GATE-0.1.0-dev.5.md, supaya laporannya bisa ditempel apa adanya.
    `Algoritma gerak  : ${versiAlgoritmaGerak.value || "-"}`,
    "Telemetri gerak (5 terakhir):",
    riwayatGerak.value.length
      ? riwayatGerak.value.map(barisGerak).join("\n")
      : "  tidak ada data",
  ].join("\n");
});

// Dipakai halaman untuk menekan "Scan ulang" dari panel hasil, tanpa perlu
// melepas dan memasang ulang scanner (yang berarti memuat ulang seluruh aset).
defineExpose({ ulangiScan });
</script>

<template>
  <!-- Di xl kolom tengah tingginya terkunci: kamera memakan sisa ruang dan
       tombol duduk di dasar, sejajar dengan kolom kiri-kanan. Di bawah xl
       halaman menggulir biasa, jadi kamera kembali memakai rasio tetap. -->
  <div class="w-full mx-auto flex flex-col gap-4 sm:gap-5 xl:flex-1 xl:min-h-0">
    <div
      class="relative w-full aspect-[3/4] sm:aspect-[4/3] max-h-[50dvh] md:max-h-none xl:aspect-auto xl:max-h-none xl:flex-1 xl:min-h-0 rounded-2xl overflow-hidden bg-black/5 dark:bg-white/5"
    >
      <SelerisScanner
        ref="scannerRef"
        :asset-base-url="assetBaseUrl"
        :profile="props.profile"
        :language="bahasa"
        camera-facing="front"
        :heatmap-enabled="false"
        @ready="onReady"
        @state="onState"
        @progress="onProgress"
        @quality="onQuality"
        @live-vitals="onLiveVitals"
        @result="onResult"
        @error="onError"
      />
    </div>

    <!-- Tingginya SENGAJA dipatok di xl. Kalau dibiarkan mengikuti isi,
         kotak kamera ikut mengecil setiap kali peringatan aksesori atau
         galat muncul, dan gambarnya melompat di depan mata pengunjung. -->
    <div
      class="flex flex-col gap-4 sm:gap-5 xl:h-[190px] xl:shrink-0 xl:overflow-y-auto hide-scrollbar"
    >
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

        <div
          class="mt-1 rounded-2xl border border-[#DEDEDE] dark:border-[#3A3B3D] bg-white dark:bg-[#1D1F23] px-4 py-3 flex flex-wrap sm:flex-nowrap items-center gap-x-4 gap-y-3"
        >
          <div
            class="flex flex-col gap-1 shrink-0"
            :title="t('scanSdk.provisionalNote')"
          >
            <span class="text-[12px] text-[#8E98A8] whitespace-nowrap">
              {{ t("scanSdk.liveHr") }}
            </span>
            <div class="flex items-baseline gap-1">
              <span
                class="text-[22px] font-semibold leading-none tabular-nums text-[#195279] dark:text-[#FAFAFA]"
              >
                {{ hrSementara !== null ? Math.round(hrSementara) : "–" }}
              </span>
              <span class="text-[12px] text-[#6F6F6F] dark:text-[#AAAAAA]">
                bpm
              </span>
            </div>
          </div>

          <div class="w-px self-stretch bg-[#DEDEDE] dark:bg-[#3A3B3D]"></div>

          <div class="flex flex-col gap-1 shrink-0">
            <span class="text-[12px] text-[#8E98A8] whitespace-nowrap">
              {{ t("scanSdk.quality") }}
            </span>
            <div class="flex items-baseline gap-1">
              <span
                class="text-[22px] font-semibold leading-none tabular-nums text-[#195279] dark:text-[#FAFAFA]"
              >
                {{ kualitas !== null ? Math.round(kualitas * 100) : "–" }}
              </span>
              <span class="text-[12px] text-[#6F6F6F] dark:text-[#AAAAAA]">
                %
              </span>
            </div>
          </div>

          <div class="relative basis-full sm:basis-auto sm:flex-1 h-10 min-w-0">
            <svg
              class="absolute inset-0 w-full h-full"
              :viewBox="`0 0 ${LEBAR_GELOMBANG} ${TINGGI_GELOMBANG}`"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="sqi-isi" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stop-color="#2AB857" stop-opacity="0.22" />
                  <stop offset="100%" stop-color="#2AB857" stop-opacity="0" />
                </linearGradient>
              </defs>
              <template v-if="titikSqi">
                <polygon :points="areaSqi" fill="url(#sqi-isi)" />
                <polyline
                  :points="titikSqi"
                  fill="none"
                  stroke="#2AB857"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  vector-effect="non-scaling-stroke"
                />
              </template>
              <line
                v-else
                x1="0"
                :x2="LEBAR_GELOMBANG"
                :y1="TINGGI_GELOMBANG / 2"
                :y2="TINGGI_GELOMBANG / 2"
                stroke="#DEDEDE"
                stroke-width="1"
                stroke-dasharray="4 4"
                vector-effect="non-scaling-stroke"
              />
            </svg>
            <span
              v-if="titikSqi"
              class="absolute right-0 w-1.5 h-1.5 -mt-[3px] -mr-[3px] rounded-full bg-[#2AB857] animate-pulse"
              :style="{ top: ujungSqi + '%' }"
            ></span>
          </div>
        </div>

        <div
          v-if="debug"
          class="flex flex-wrap gap-x-4 gap-y-1 text-[12px] text-[#8E98A8]"
        >
          <span
            v-if="debug && lajuAnalyzer !== null"
            :class="lajuAnalyzer < ambangHz ? 'text-red-600 font-medium' : ''"
          >
            {{ t("scanSdk.rateAnalyzer") }}: {{ lajuAnalyzer.toFixed(1) }} Hz
            <span class="opacity-70">
              ({{ t("scanSdk.rateNeeded", { hz: ambangHz }) }})
            </span>
          </span>
          <span v-if="debug && lajuDiterima !== null">
            {{ t("scanSdk.rateAccepted") }}: {{ lajuDiterima.toFixed(1) }} Hz
          </span>

          <span v-if="debug && lajuKamera !== null">
            {{ t("scanSdk.rateCamera") }}: {{ lajuKamera.toFixed(0) }} Hz
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
      </div>

      <p
        v-if="debug && terisolasi === false"
        class="text-[11px] text-amber-700 dark:text-amber-400"
      >
        {{ t("scanSdk.notIsolated") }}
      </p>

      <p v-if="debug && tahap" class="text-[11px] text-[#8E98A8]">
        {{ t("scanSdk.techStatus") }}: {{ tahap }}
      </p>

      <SdkFpsMonitor
        v-if="debug"
        :samples="riwayatLaju"
        :threshold="ambangHz"
        :report="laporan"
        :page-fps="fpsHalaman"
      />

      <!-- Hanya muncul kalau memang ADA yang salah. Keadaan "kamera siap"
           tidak perlu diumumkan; tombol Mulai sudah mengatakannya. Peringatan
           kamera lambat tetap di sini karena "Scan anyway" satu-satunya jalan
           keluar dari blokirnya. -->
      <section
        v-if="!berjalan && cekKamera && adaMasalahKamera"
        class="rounded-2xl border p-4 flex flex-col gap-2"
        :class="
          cekKamera.status === 'galat'
            ? 'border-[#DEDEDE] dark:border-[#3A3B3D]'
            : kameraTerlaluLambat
              ? 'border-red-300 bg-red-50 dark:bg-red-950/30'
              : 'border-amber-300 bg-amber-50 dark:bg-amber-950/30'
        "
      >
        <p
          v-if="cekKamera.status === 'galat'"
          class="text-[13px] text-[#6F6F6F] dark:text-[#AAAAAA]"
        >
          {{ t("scanSdk.check.failed") }}
          <span class="opacity-70">({{ cekKamera.kode }})</span>
        </p>

        <template v-else>
          <p
            v-if="kameraTerlaluLambat"
            class="text-[14px] font-medium text-red-700 dark:text-red-300"
          >
            {{
              t("scanSdk.check.tooSlow", {
                hz: cekKamera.fpsEfektif
                  ? cekKamera.fpsEfektif.toFixed(0)
                  : "?",
                need: ambangHz,
              })
            }}
          </p>
          <p
            v-else
            class="text-[14px] font-medium text-amber-800 dark:text-amber-300"
          >
            {{
              cekKamera.cahaya === "backlight"
                ? t("scanSdk.check.backlight")
                : t("scanSdk.check.tooDark")
            }}
          </p>

          <p
            v-if="kameraTerlaluLambat"
            class="text-[13px] text-red-700 dark:text-red-400"
          >
            {{ t("scanSdk.check.tooSlowHelp") }}
          </p>
          <p v-else class="text-[13px] text-amber-800 dark:text-amber-400">
            {{
              cekKamera.cahaya === "backlight"
                ? t("scanSdk.check.backlightHelp")
                : t("scanSdk.check.tooDarkHelp")
            }}
          </p>
        </template>

        <div class="flex flex-wrap gap-x-4 gap-y-1 mt-1">
          <button
            type="button"
            class="text-[13px] font-medium text-[#2E97DF] hover:underline"
            @click="periksaUlang"
          >
            {{ t("scanSdk.check.recheck") }}
          </button>
          <button
            v-if="tertahan"
            type="button"
            class="text-[13px] text-[#8E98A8] hover:underline"
            @click="abaikanPeringatan = true"
          >
            {{ t("scanSdk.check.ignore") }}
          </button>
        </div>
      </section>
    </div>

    <div class="flex flex-col sm:flex-row gap-3">
      <button
        v-if="!berjalan"
        type="button"
        :disabled="!siap || !adaKamera || memeriksaKamera || tertahan"
        class="flex-1 h-auto lg:h-12 rounded-xl text-white font-medium transition-all duration-300 py-3 lg:py-0"
        :class="
          siap && adaKamera && !memeriksaKamera && !tertahan
            ? 'bg-gradient-to-tr from-[#1E6493] to-[#2E97DF] active:scale-[0.99]'
            : 'bg-gray-400 cursor-not-allowed opacity-60'
        "
        @click="galat ? ulangiScan() : mulai()"
      >
        {{
          !siap
            ? t("scanSdk.preparing")
            : memeriksaKamera
              ? t("scanSdk.check.running")
              : tertahan
                ? t("scanSdk.check.blocked")
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
  </div>
</template>
