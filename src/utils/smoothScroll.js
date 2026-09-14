import Lenis from "lenis";
import "lenis/dist/lenis.css";

// Satu-satunya instance Lenis untuk seluruh aplikasi.
let lenis = null;

// Perintah gulir asli milik browser, disimpan supaya bisa dikembalikan.
let scrollToAsli = null;
let scrollIntoViewAsli = null;

const lengkungGerak = (t) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

const hitungDurasi = (jarak) =>
  Math.min(1.4, Math.max(0.6, 0.45 + Math.sqrt(Math.abs(jarak)) / 90));

function belokkanPerintahGulir() {
  scrollToAsli = window.scrollTo.bind(window);
  scrollIntoViewAsli = Element.prototype.scrollIntoView;

  // window.scrollTo({ top: 500, behavior: "smooth" })
  //
  // HATI-HATI: perintah ini punya DUA bentuk — scrollTo(opsi) dan
  // scrollTo(x, y) — dan browser memilih yang mana berdasarkan JUMLAH
  // argumen, bukan isinya. Kalau kita menerima (opsi, y) lalu meneruskan
  // keduanya, panggilan satu argumen ikut berubah jadi dua argumen; browser
  // mengiranya bentuk (x, y), objeknya diubah jadi angka menjadi NaN, dan
  // halaman malah lompat ke posisi 0.
  //
  // Itu persis yang sempat terjadi: Lenis menggeser halaman lewat
  // scrollTo({ top, behavior: "instant" }), setiap perintahnya dibatalkan
  // jadi "kembali ke atas" 60 kali per detik, dan halaman sama sekali tidak
  // bisa digulir.
  //
  // Karena itu argumennya ditampung dengan ...argumen lalu diteruskan apa
  // adanya — jumlahnya tetap sama persis seperti saat dipanggil.
  window.scrollTo = function (...argumen) {
    const opsi = argumen[0];
    const mintaHalus =
      argumen.length === 1 &&
      typeof opsi === "object" &&
      opsi !== null &&
      opsi.behavior === "smooth";

    if (!lenis || !mintaHalus) {
      return scrollToAsli(...argumen);
    }
    const tujuan = opsi.top ?? 0;
    lenis.scrollTo(tujuan, {
      duration: hitungDurasi(tujuan - window.scrollY),
      easing: lengkungGerak,
    });
  };

  // elemen.scrollIntoView({ behavior: "smooth" })
  // Alasan yang sama seperti di atas: argumen diteruskan apa adanya.
  Element.prototype.scrollIntoView = function (...argumen) {
    const opsi = argumen[0];
    // scrollIntoView(true) / scrollIntoView(false) — bentuk lama, selalu
    // seketika, jadi tidak perlu dibelokkan.
    const mintaHalus =
      typeof opsi === "object" && opsi !== null && opsi.behavior === "smooth";

    if (!lenis || !mintaHalus) {
      return scrollIntoViewAsli.apply(this, argumen);
    }
    // Jarak ke elemen = posisinya terhadap layar saat ini.
    const jarak = this.getBoundingClientRect().top;
    lenis.scrollTo(this, {
      duration: hitungDurasi(jarak),
      easing: lengkungGerak,
    });
  };
}

export function pasangSmoothScroll() {
  if (lenis) return lenis;

  lenis = new Lenis({
    // Seberapa cepat halaman mengejar posisi tujuan. Semakin KECIL semakin
    // lama meluncurnya — dan semakin lama meluncur, semakin lama pula browser
    // harus menggambar ulang halaman, jadi terasa berat.
    //
    // Bawaan Lenis 0.1. Sebelumnya di sini 0.09 (lebih lambat dari bawaan)
    // tanpa alasan kuat, dan itu membuat gulirnya terasa menggantung.
    // 0.14 membuatnya lebih cepat menyusul jari, tetap halus tapi tidak
    // "molor".
    lerp: 0.14,

    // Anak tangga yang TIDAK diubah dari bawaan Lenis, tapi perlu diketahui:
    // - syncTouch: false          -> di ponsel tetap pakai gulir asli. Inersia
    //                                buatan di layar sentuh justru terasa
    //                                lambat dan melawan gerakan jari.
    // - respectReducedMotion: true -> pengunjung yang menyalakan "kurangi
    //                                animasi" di setelan sistemnya otomatis
    //                                dapat gulir biasa.

    // Area bergulir di dalam halaman (isi modal, daftar panjang) tetap
    // bergulir normal sendiri, tidak ikut ditahan Lenis.
    allowNestedScroll: true,

    // Tautan #anchor ditangani Lenis, jadi lompatannya ikut halus.
    anchors: true,

    // Lenis menjalankan loop gambarnya sendiri, jadi tidak perlu menulis
    // requestAnimationFrame manual di App.vue.
    autoRaf: true,
  });

  belokkanPerintahGulir();
  return lenis;
}

export function gulirCepatKe(posisi) {
  if (!lenis) {
    window.scrollTo({ top: posisi, behavior: "smooth" });
    return;
  }
  lenis.scrollTo(posisi, {
    duration: 0.45,
    easing: (t) => 1 - Math.pow(1 - t, 3),
  });
}

export function hentikanSmoothScroll() {
  lenis?.stop();
}

export function jalankanSmoothScroll() {
  if (!lenis) return;
  lenis.start();
  lenis.resize();
}

export function copotSmoothScroll() {
  if (scrollToAsli) window.scrollTo = scrollToAsli;
  if (scrollIntoViewAsli) Element.prototype.scrollIntoView = scrollIntoViewAsli;
  lenis?.destroy();
  lenis = null;
}
