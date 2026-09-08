import DOMPurify from "dompurify";

/**
 * Membersihkan HTML sebelum ditampilkan dengan v-html.
 *
 * KENAPA INI PERLU
 * v-html memasukkan teks ke halaman sebagai HTML sungguhan, bukan sebagai
 * tulisan biasa. Jadi kalau teksnya mengandung <script> atau
 * <img onerror="...">, kodenya benar-benar dijalankan di browser pengunjung —
 * di dalam situs Anda, dengan akses penuh ke apa pun yang tersimpan di sana.
 *
 * Itu yang disebut XSS. Bahayanya paling nyata pada teks yang datang dari luar
 * kode kita, misalnya isi artikel dari CMS: begitu CMS-nya membolehkan HTML
 * atau suatu saat disusupi, situs utama ikut terbawa.
 *
 * DOMPurify membuang bagian yang bisa menjalankan kode, dan menyisakan tag
 * tampilan biasa (<b>, <p>, <a>, dan sejenisnya). Jadi tulisan tebal, miring,
 * dan tautan tetap tampil seperti biasa.
 *
 * CARA MEMAKAI di template:
 *   <div v-html="bersihkanHtml(artikel.isi)"></div>
 *
 * Aman dipanggil pada nilai kosong atau null — hasilnya string kosong.
 */
export function bersihkanHtml(html) {
  if (!html) return "";
  return DOMPurify.sanitize(String(html));
}
