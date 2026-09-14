import {
  hentikanSmoothScroll,
  jalankanSmoothScroll,
} from "@/utils/smoothScroll";

let jumlahPengunci = 0;

// Nilai padding milik halaman sebelum dikunci, untuk dikembalikan nanti.
let paddingSemula = "";

const lebarBatangGulir = () =>
  window.innerWidth - document.documentElement.clientWidth;

export function kunciGulirLatar() {
  jumlahPengunci += 1;
  if (jumlahPengunci > 1) return; // sudah dikunci oleh yang lain

  const lebar = lebarBatangGulir();
  paddingSemula = document.body.style.paddingRight;
  if (lebar > 0) document.body.style.paddingRight = `${lebar}px`;

  hentikanSmoothScroll();
  document.body.style.overflow = "hidden";
}

export function bukaKunciGulirLatar() {
  if (jumlahPengunci === 0) return; // tidak pernah dikunci, jangan apa-apakan
  jumlahPengunci -= 1;
  if (jumlahPengunci > 0) return; // masih ada yang membutuhkan kuncinya

  document.body.style.overflow = "";
  document.body.style.paddingRight = paddingSemula;
  jalankanSmoothScroll();
}
