import { onMounted, onUnmounted, ref } from "vue";

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
