import { onMounted, onUnmounted, ref } from "vue";

/**
 * Memberi tahu komponen apakah situs sedang dalam mode gelap atau terang.
 *
 * KENAPA PERLU?
 * Beberapa bagian situs punya dua versi video: satu untuk mode terang, satu
 * untuk mode gelap. Dulu yang tidak terpakai disembunyikan pakai class CSS
 * (`dark:hidden`). Masalahnya, video yang cuma disembunyikan CSS tetap ikut
 * diunduh browser — pengunjung membayar dua kali untuk satu video yang
 * terlihat. Di halaman Roadmap itu berarti 24 MB terbuang percuma.
 *
 * Dengan helper ini, video yang tidak sesuai tema tidak dibuat sama sekali,
 * jadi tidak ikut diunduh.
 *
 * CARA PAKAI:
 *
 *   <script setup>
 *   import { useIsDark } from "@/utils/useIsDark";
 *   const isDark = useIsDark();
 *   </script>
 *
 *   <template>
 *     <video v-if="!isDark"><source src="terang.mp4" /></video>
 *     <video v-else><source src="gelap.mp4" /></video>
 *   </template>
 *
 * CATATAN: helper ini sengaja mengintip class `dark` di tag <html>, bukan
 * membaca store tema di src/stores/theme.js. Alasannya, App.vue memaksa mode
 * terang di halaman /product tanpa mengubah isi store. Kalau membaca store,
 * di halaman produk bisa muncul video versi gelap padahal tampilannya terang.
 *
 * @returns {import('vue').Ref<boolean>} true kalau sedang mode gelap
 */
export function useIsDark() {
  // Nilai awal: cek langsung apakah tag <html> punya class "dark".
  const isDark = ref(document.documentElement.classList.contains("dark"));

  // MutationObserver = "pengawas" bawaan browser. Tugasnya memberi tahu kita
  // setiap kali sesuatu di halaman berubah — di sini kita minta diberi tahu
  // saat class pada tag <html> berubah, yaitu ketika tombol tema ditekan.
  let observer = null;

  onMounted(() => {
    // onMounted = dijalankan setelah komponen muncul di layar.
    observer = new MutationObserver(() => {
      isDark.value = document.documentElement.classList.contains("dark");
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"], // cukup awasi perubahan class saja
    });
  });

  onUnmounted(() => {
    // onUnmounted = dijalankan saat komponen ditutup. Pengawas harus
    // dihentikan di sini, kalau tidak ia terus berjalan dan membebani memori.
    observer?.disconnect();
  });

  return isDark;
}
