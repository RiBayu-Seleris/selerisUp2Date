import { defineStore } from "pinia";
import { ref } from "vue";

export const usePageLoadingStore = defineStore("pageLoading", () => {
  // Jumlah pengambilan data yang sedang berjalan. Memakai penghitung, bukan
  // true/false, karena satu halaman bisa mengambil beberapa data sekaligus
  // (misalnya daftar artikel + artikel terpopuler).
  const pending = ref(0);

  const start = () => {
    pending.value += 1;
  };

  const done = () => {
    // Jaga-jaga supaya tidak pernah minus kalau done() terpanggil berlebih
    if (pending.value > 0) pending.value -= 1;
  };

  // Dipanggil saat berpindah halaman: pengambilan data halaman lama tidak
  // relevan lagi, jadi hitungannya dimulai bersih.
  const reset = () => {
    pending.value = 0;
  };

  return { pending, start, done, reset };
});
