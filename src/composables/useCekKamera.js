import { ref } from "vue";

/**
 * Pemeriksaan perangkat SEBELUM pemindaian rPPG dimulai.
 *
 * Sejak SDK 0.1.0-dev.4 sebagian tugasnya sudah diambil alih SDK sendiri:
 * permintaan kameranya kini minimum 24 fps, jadi kamera yang tidak sanggup
 * ditolak lebih awal dengan CAMERA_CADENCE_UNSUPPORTED — bukan lagi setelah
 * pengunjung menahan wajah lima detik. Pemeriksaan di sini tetap dipertahankan
 * karena dua alasan yang tidak hilang:
 *
 *   1. Ia berjalan SEBELUM pengunjung menekan "Mulai scan", jadi kabar
 *      buruknya datang sebelum ia menyiapkan diri, bukan sesudah.
 *
 *   2. CAHAYA — dan ini yang tidak dilakukan siapa pun sebelum pemindaian
 *      berjalan. Gerbang cahaya SDK baru menilai setelah wajah masuk bingkai.
 *
 * Keduanya saling berkaitan. Di ruang remang, kamera memperpanjang waktu
 * paparan supaya gambarnya tidak gelap, dan konsekuensinya lajunya sendiri
 * turun — sering ke 15 fps, kadang 7,5. Jadi cahaya yang kurang MENYEBABKAN
 * kegagalan cadence, bukan sekadar menemaninya.
 *
 *   2. CAHAYA. Bukan sekadar soal kenyamanan. Di ruang remang, kamera
 *      memperpanjang waktu paparan supaya gambarnya tidak gelap, dan
 *      konsekuensinya lajunya sendiri turun — sering ke 15 fps, kadang 7,5.
 *      Jadi cahaya yang kurang MENYEBABKAN masalah nomor satu, bukan sekadar
 *      menemaninya. Itu sebabnya keduanya diperiksa sekaligus di sini.
 *
 * Ambang cahayanya sengaja disalin dari gerbang milik SDK (updateLighting di
 * seleris_rppg_runtime.js) supaya nasihat di sini tidak bertentangan dengan
 * keputusan yang nanti diambil SDK sendiri saat scan berjalan.
 *
 * Kamera dibuka sebentar lalu DILEPAS sepenuhnya. SDK baru membuka kamera
 * pada start(), bukan saat memuat, jadi pemeriksaan ini tidak berebut dengan
 * dia selama setiap track dihentikan sebelum pemindaian dimulai.
 */

// Disamakan dengan permintaan SDK supaya yang diukur benar-benar mode kamera
// yang nanti dipakai — bukan mode lain yang kebetulan lebih cepat.
//
// `min: 24`, bukan 15. Sejak SDK 0.1.0-dev.4 permintaannya sendiri sudah
// minimum 24 fps. Kalau pemeriksaan di sini masih menerima 15, ia akan
// melaporkan "kamera siap" untuk kamera yang beberapa detik kemudian ditolak
// SDK dengan CAMERA_CADENCE_UNSUPPORTED — pemeriksaan yang berbohong lebih
// buruk daripada tidak ada pemeriksaan sama sekali.
const SYARAT_KAMERA = {
  video: {
    facingMode: { ideal: "user" },
    width: { ideal: 640 },
    height: { ideal: 480 },
    frameRate: { ideal: 30, min: 24 },
  },
  audio: false,
};

const AMBANG_HZ = 24; // sama dengan preflightAnalyzerMinimumRateHz milik SDK
const DURASI_UKUR_MS = 1200;
const BATAS_TUNGGU_MS = 8000;

// Ambang cahaya, disalin dari updateLighting() milik SDK.
const LUMINANSI_WAJAH_MINIMUM = 58;
const LUMINANSI_RATA_MINIMUM = 48;
const RASIO_GELAP_MAKSIMUM = 0.55;
const SELISIH_BACKLIGHT = 52;
const RASIO_TERANG_BACKLIGHT = 0.16;

const tidur = (ms) => new Promise((r) => setTimeout(r, ms));

/**
 * Menunggu satu gambar berikutnya dari kamera.
 *
 * requestVideoFrameCallback memberi tahu saat gambar BARU benar-benar tiba,
 * jadi ia mengukur laju kamera yang sesungguhnya. Browser yang belum
 * mendukungnya jatuh ke requestAnimationFrame, yang mengikuti laju layar dan
 * karena itu cenderung melaporkan angka yang terlalu bagus — hasilnya
 * ditandai supaya pemanggil tahu angkanya tidak sekuat yang pertama.
 */
const gambarBerikutnya = (video) =>
  new Promise((selesai) => {
    if ("requestVideoFrameCallback" in video) {
      video.requestVideoFrameCallback(() => selesai());
    } else {
      requestAnimationFrame(() => selesai());
    }
  });

/**
 * Rata-rata luminansi bagian tengah (tempat wajah berada) dibandingkan
 * sekelilingnya. Ukuran contohnya kecil (160x120) karena yang dicari rata-rata
 * kasar, bukan detail — dan karena pemeriksaan ini pun tidak boleh berat.
 */
const ukurCahaya = (video) => {
  const LEBAR = 160;
  const TINGGI = 120;
  const kanvas = document.createElement("canvas");
  kanvas.width = LEBAR;
  kanvas.height = TINGGI;
  const konteks = kanvas.getContext("2d", { willReadFrequently: true });
  konteks.drawImage(video, 0, 0, LEBAR, TINGGI);
  const piksel = konteks.getImageData(0, 0, LEBAR, TINGGI).data;

  // Kotak tengah: kira-kira tempat wajah berdiri kalau pengunjung mengikuti
  // panduan bingkai. Tidak perlu tepat — yang dibandingkan hanya terang
  // relatifnya terhadap latar.
  const kiri = Math.floor(LEBAR * 0.25);
  const kanan = Math.floor(LEBAR * 0.75);
  const atas = Math.floor(TINGGI * 0.2);
  const bawah = Math.floor(TINGGI * 0.8);

  let jumlahTengah = 0;
  let cacahTengah = 0;
  let cacahGelap = 0;
  let jumlahLuar = 0;
  let cacahLuar = 0;
  let cacahTerang = 0;

  for (let y = 0; y < TINGGI; y += 1) {
    for (let x = 0; x < LEBAR; x += 1) {
      const p = (y * LEBAR + x) * 4;
      // Luminansi Rec. 709, sama dengan yang dipakai gerbang cahaya SDK.
      const lum = 0.2126 * piksel[p] + 0.7152 * piksel[p + 1] + 0.0722 * piksel[p + 2];
      if (x >= kiri && x < kanan && y >= atas && y < bawah) {
        jumlahTengah += lum;
        cacahTengah += 1;
        if (lum < 42) cacahGelap += 1;
      } else {
        jumlahLuar += lum;
        cacahLuar += 1;
        if (lum >= 210) cacahTerang += 1;
      }
    }
  }

  if (!cacahTengah || !cacahLuar) return null;

  const tengah = jumlahTengah / cacahTengah;
  const luar = jumlahLuar / cacahLuar;
  const keseluruhan = (jumlahTengah + jumlahLuar) / (cacahTengah + cacahLuar);

  return {
    tengah,
    luar,
    keseluruhan,
    rasioGelap: cacahGelap / cacahTengah,
    rasioTerang: cacahTerang / cacahLuar,
  };
};

const nilaiCahaya = (c) => {
  if (!c) return "tidak-terbaca";
  if (
    c.tengah < LUMINANSI_WAJAH_MINIMUM ||
    c.keseluruhan < LUMINANSI_RATA_MINIMUM ||
    c.rasioGelap > RASIO_GELAP_MAKSIMUM
  ) {
    return "gelap";
  }
  if (
    c.luar - c.tengah >= SELISIH_BACKLIGHT &&
    c.rasioTerang >= RASIO_TERANG_BACKLIGHT &&
    c.tengah < 128
  ) {
    return "backlight";
  }
  return "cukup";
};

export function useCekKamera() {
  const memeriksa = ref(false);
  const hasil = ref(null);

  /**
   * @returns {Promise<object|null>} ringkasan pemeriksaan, juga disimpan di
   *          `hasil`. null hanya kalau dipanggil di luar browser.
   */
  const periksa = async () => {
    if (typeof window === "undefined") return null;
    if (memeriksa.value) return hasil.value;

    memeriksa.value = true;
    hasil.value = null;

    let aliran = null;
    let video = null;

    try {
      if (!window.isSecureContext || !navigator.mediaDevices?.getUserMedia) {
        hasil.value = {
          status: "galat",
          kode: "SECURE_CONTEXT_REQUIRED",
          fpsKamera: null,
          fpsDiukur: null,
          cahaya: "tidak-terbaca",
        };
        return hasil.value;
      }

      aliran = await navigator.mediaDevices.getUserMedia(SYARAT_KAMERA);

      video = document.createElement("video");
      video.autoplay = true;
      video.muted = true;
      video.playsInline = true;
      video.setAttribute("playsinline", "");
      // Harus menempel di halaman supaya pasti diputar, tapi tidak boleh
      // terlihat dan tidak boleh mengubah tata letak.
      video.style.cssText =
        "position:fixed;top:0;left:0;width:1px;height:1px;opacity:0;pointer-events:none";
      video.srcObject = aliran;
      document.body.append(video);
      await video.play();

      const setelan = aliran.getVideoTracks()[0]?.getSettings() || {};

      // Gambar pertama kadang datang terlambat karena kamera masih menyetel
      // paparan. Menghitungnya akan menyeret rata-rata ke bawah tanpa alasan,
      // jadi tunggu satu gambar dulu sebelum stopwatch dijalankan.
      await Promise.race([gambarBerikutnya(video), tidur(BATAS_TUNGGU_MS)]);

      // Tahap 1 — laju. Sengaja TIDAK menggambar apa pun di sini: yang dicari
      // adalah kesanggupan kamera, bukan kesanggupan kamera dikurangi biaya
      // pengukurnya sendiri.
      const mulai = performance.now();
      let cacah = 0;
      while (performance.now() - mulai < DURASI_UKUR_MS) {
        const lewatBatas = await Promise.race([
          gambarBerikutnya(video).then(() => false),
          tidur(BATAS_TUNGGU_MS).then(() => true),
        ]);
        if (lewatBatas) break;
        cacah += 1;
      }
      const berlalu = performance.now() - mulai;
      const fpsDiukur = berlalu > 0 ? (cacah * 1000) / berlalu : null;

      // Tahap 2 — cahaya. Baru dilakukan setelah laju selesai diukur supaya
      // biaya menggambarnya tidak mencemari angka di atas.
      const contoh = [];
      for (let i = 0; i < 3; i += 1) {
        const c = ukurCahaya(video);
        if (c) contoh.push(c);
        await Promise.race([gambarBerikutnya(video), tidur(200)]);
      }
      const cahaya = contoh.length
        ? {
            tengah: contoh.reduce((a, c) => a + c.tengah, 0) / contoh.length,
            luar: contoh.reduce((a, c) => a + c.luar, 0) / contoh.length,
            keseluruhan:
              contoh.reduce((a, c) => a + c.keseluruhan, 0) / contoh.length,
            rasioGelap:
              contoh.reduce((a, c) => a + c.rasioGelap, 0) / contoh.length,
            rasioTerang:
              contoh.reduce((a, c) => a + c.rasioTerang, 0) / contoh.length,
          }
        : null;

      const fpsKamera =
        typeof setelan.frameRate === "number" ? setelan.frameRate : null;

      // Yang dipakai memutuskan adalah angka TERKECIL antara yang dijanjikan
      // kamera dan yang benar-benar terkirim. Keduanya bisa berbohong ke arah
      // yang berbeda: getSettings() melaporkan mode yang dipilih (sering bulat
      // 30) sementara paparan otomatis diam-diam menurunkannya, dan hitungan
      // manual bisa meleset di browser tanpa requestVideoFrameCallback.
      const kandidat = [fpsKamera, fpsDiukur].filter(
        (v) => typeof v === "number" && Number.isFinite(v) && v > 0,
      );
      const fpsEfektif = kandidat.length ? Math.min(...kandidat) : null;
      const nilaiCahayanya = nilaiCahaya(cahaya);

      const masalah = [];
      if (fpsEfektif !== null && fpsEfektif < AMBANG_HZ) masalah.push("laju");
      if (nilaiCahayanya === "gelap") masalah.push("gelap");
      if (nilaiCahayanya === "backlight") masalah.push("backlight");

      hasil.value = {
        status: masalah.length ? "bermasalah" : "siap",
        masalah,
        fpsKamera,
        fpsDiukur,
        fpsEfektif,
        ambang: AMBANG_HZ,
        lebar: setelan.width ?? null,
        tinggi: setelan.height ?? null,
        perangkat: aliran.getVideoTracks()[0]?.label || null,
        cahaya: nilaiCahayanya,
        luminansi: cahaya,
        lajuDiperkirakan: !("requestVideoFrameCallback" in video),
      };
      return hasil.value;
    } catch (e) {
      // OverconstrainedError di sini punya arti tunggal dan pasti: browser
      // tidak menemukan mode kamera yang sanggup 24 fps. Itu jawaban, bukan
      // kegagalan pemeriksaan — jadi diperlakukan sebagai temuan "laju",
      // sama seperti kalau kami mengukurnya sendiri dan mendapat angka kecil.
      const terlaluLambat = e?.name === "OverconstrainedError";

      hasil.value = {
        status: terlaluLambat ? "bermasalah" : "galat",
        kode: e?.name || "CEK_KAMERA_GAGAL",
        pesan: e?.message || String(e),
        fpsKamera: null,
        fpsDiukur: null,
        fpsEfektif: null,
        ambang: AMBANG_HZ,
        cahaya: "tidak-terbaca",
        masalah: terlaluLambat ? ["laju"] : [],
      };
      return hasil.value;
    } finally {
      // Kamera HARUS benar-benar lepas sebelum SDK memintanya. Kalau satu
      // track saja tertinggal hidup, start() milik SDK bisa gagal dengan
      // CAMERA_CONFIG_FAILED di sebagian perangkat — pemeriksaan yang niatnya
      // menolong malah jadi penyebab kegagalan baru.
      aliran?.getTracks().forEach((t) => t.stop());
      if (video) {
        video.pause();
        video.srcObject = null;
        video.remove();
      }
      memeriksa.value = false;
    }
  };

  return { memeriksa, hasil, periksa };
}
