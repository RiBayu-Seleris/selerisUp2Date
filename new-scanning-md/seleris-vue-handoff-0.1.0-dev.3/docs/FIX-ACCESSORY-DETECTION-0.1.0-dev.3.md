# Perbaikan deteksi kacamata dan masker — 0.1.0-dev.3

Tanggal: **14 September 2026**. Menggantikan `0.1.0-dev.2` untuk integrasi Vue/landing page. Profil tujuh field, lima hasil vital sign, dan API integrasi tetap sama.

## Masalah dan penyebab yang terbukti

Pengguna melaporkan bahwa wajah tanpa kacamata mendapat arahan melepas kacamata. Pemeriksaan kode menemukan kesalahan pada **decoder output model**, bukan urutan label model.

Model `face_attrib_net_w8a8_v0.60.0.tflite` mengeluarkan lima angka **uint8**. TensorFlow.js TFLite menyajikan angka tersebut sebagai tensor `int32` tanpa mengubahnya menjadi probabilitas. Kontrak model dan Mobile memakai `probabilitas = nilai_mentah × 0.00390625`, sama dengan `nilai_mentah / 256`, dengan zero point 0.

Kode Web sebelumnya hanya membagi angka dengan 256 jika nilainya **lebih besar dari 1**. Akibatnya, angka mentah **1** dibaca sebagai **1,0 (100%)**, padahal seharusnya **0,00390625 (sekitar 0,39%)**. Ini dapat memicu peringatan palsu pada kacamata, masker, maupun kacamata hitam. Bila terjadi berulang, mekanisme konfirmasi dapat mempertahankan peringatan itu.

| Nilai mentah | Pembacaan lama | Pembacaan benar |
|---|---|---|
| 0 | 0% | 0% |
| **1** | **100%** | **0,390625%** |
| 2 | 0,78125% | 0,78125% |
| 153 | 59,765625% | 59,765625% |
| 154 | 60,15625% | 60,15625% |
| 255 | 99,609375% | 99,609375% |

Kasus regresi `index=2, raw=1` benar-benar gagal pada kode lama: hasil `GlassesDetected`, seharusnya `Clear`. Pengujian model TFLite yang dibundel dengan input RGB deterministik juga menghasilkan angka mentah 1. Ini membuktikan kesalahan decoding dan format output nyata, tetapi bukan pengujian akurasi deteksi pada wajah pengguna yang melaporkan masalah.

## Perubahan yang dibuat

1. **Decoding kuantisasi diperbaiki.** Semua angka mentah, termasuk 0 dan 1, dikalikan skala resmi 1/256. Tidak ada penebakan format berdasarkan besar nilainya. Pemetaan indeks tetap: 2=kacamata, 3=masker, 4=kacamata hitam.
2. **Kontrak model/output diperiksa.** Saat model dimuat, SDK memeriksa satu input `image` berbentuk `[1,128,128,3]` dan satu output `probability` berbentuk `[1,5]`, dengan tipe `int32` yang diekspos adapter TFJS. Saat inferensi, output harus berisi tepat lima integer 0–255. Output rusak, tipe atau bentuk yang tidak sesuai menimbulkan error, bukan dianggap wajah bebas aksesori.
3. **Arahan masker diperbaiki.** Pemilihan guidance sebelumnya mencari `MaskDetected`, sedangkan status detektor adalah `FaceMaskDetected`. Sekarang status tersebut menghasilkan `guidanceCode: face_mask` dan teks melepas masker yang sesuai.
4. **Riwayat aksesori direset saat wajah hilang atau ada beberapa wajah.** Status kembali ke `FacialAccessoryCheckPending`. Hasil inferensi yang terlambat dari pengamatan sebelumnya diabaikan, sehingga wajah yang muncul berikutnya tidak mewarisi keputusan aksesori lama. Start/reset scan juga membatalkan pengamatan sebelumnya.
5. **Tensor selalu dilepas.** Tensor input/output dibersihkan pada keberhasilan, kegagalan prediksi, kegagalan membaca output, maupun pelanggaran kontrak. Ini menghindari penumpukan tensor ketika inferensi gagal.

Perubahan utama berada di `engine/flutter-web/assets/web/seleris_rppg_runtime.js`. Kasus regresi ada di `tests/browser/accessory.spec.ts`; oracle pengujian memanggil decoder dan presence gate dari source Mobile Kotlin yang tidak diubah.

## Model dan ambang Mobile dipertahankan

- Model: Qualcomm FaceAttribNet w8a8 v0.60.0, SHA256 `b4c2bac53e98fc89cd9e88e6bea9df70b94e8d7fa35e5f9a17aa965aa1051cb7`.
- Input tetap crop RGB 128×128. Tidak mengganti model atau menormalisasi ulang byte input.
- Deteksi langsung mulai skor ≥0,60; konfirmasi setelah 3 pengamatan positif.
- Setelah terkonfirmasi, diperlukan 5 pengamatan dengan skor ≤0,35 untuk membersihkan status.
- Batas interval inferensi tetap 200 ms. Prioritas arahan ketika lebih dari satu aksesori terdeteksi tetap masker, kacamata hitam, lalu kacamata.
- Formula vital sign, profil tujuh field, heatmap, SQI, motion dan spoof screening tidak dilonggarkan.

## Bukti pengujian

- Regresi sebelum perbaikan tercatat pada `reports/accessory-before-fix.log`; kode lama salah mengartikan `raw=1` sebagai kacamata.
- Seluruh 256 nilai byte, untuk tiga output aksesori, dibandingkan dengan decoder Mobile Kotlin.
- Urutan ambang deteksi/konfirmasi/pemulihan dibandingkan dengan presence gate Mobile untuk ketiga aksesori.
- Model TFLite nyata dijalankan pada 16 input RGB deterministik melalui jalur inferensi SDK; output tetap integer dan decoding cocok, tanpa pertambahan jumlah tensor TFJS. Hasil ada pada `reports/accessory-real-model.json`.
- Pengujian mencakup guidance masker, status saat wajah hilang/multiple faces, callback terlambat, output malformed, dan cleanup tensor pada error.
- Pengujian unit/golden serta browser keseluruhan dijalankan kembali terhadap rilis baru; ringkasan ada di [VALIDATION.md](VALIDATION.md) dan laporan `reports/final-*.log`.

Pengujian otomatis mencakup kontrak dan regresi perangkat lunak. Belum ada rekaman wajah dari sesi yang dilaporkan pengguna, sehingga tidak dinyatakan bahwa semua kemungkinan false positive model pada kamera nyata sudah hilang. Kesetaraan perangkat fisik tetap belum disertifikasi.

## Panduan upgrade untuk developer Vue

```sh
npm install /path/ke/seleris-rppg-vue-0.1.0-dev.3.tgz
npx seleris-copy-assets public/vendor/seleris-rppg/0.1.0-dev.3
```

Ubah `assetBaseUrl` menjadi `/vendor/seleris-rppg/0.1.0-dev.3/` (sesuaikan base path hosting), lalu build dan deploy bundle Vue beserta aset baru. **Mengganti library tanpa mengganti direktori runtime masih dapat menjalankan decoder lama.** Jangan mencampur bundle/aset `.2` dan `.3`; pastikan aturan cache/service worker host memuat direktori versi baru. Helper salin aset menolak tujuan yang sudah ada.

Periksa `sdkVersion` pada event `ready` = `0.1.0-dev.3`, lalu di panel Network browser pastikan iframe dan `seleris_rppg_runtime.js` dimuat dari direktori `0.1.0-dev.3`. Verifikasi `version.json` di direktori tersebut jika memeriksa deployment secara manual. Tipe profil dan handler hasil tidak perlu diubah.

Uji ulang pada browser/kamera yang mengalami masalah: wajah tanpa aksesori, memakai/melepas kacamata, masker, kacamata hitam, serta wajah keluar lalu masuk kembali. Gunakan cahaya depan yang memadai. Setelah aksesori dilepas, beri waktu untuk aturan pemulihan 5 pengamatan; itu perilaku Mobile, bukan error baru. Jika masih keliru, catat versi SDK, browser/OS, `faceStatus`, `accessory`, dan `guidanceCode` dari event `state` agar dapat dibedakan dari masalah cache atau deteksi model pada kamera tertentu.

Referensi: manifest model lokal `face_attrib_net_manifest.json`; Mobile `CameraModels.kt` (`FacialAccessoryModelContract`, `FacialAccessoryPresenceGate`) dan `CameraEngine.kt` (reset saat wajah tidak valid). Perilaku adapter juga diperiksa pada [source TensorFlow.js TFLite](https://github.com/tensorflow/tfjs/blob/master/tfjs-tflite/src/tflite_model.ts); pengujian memakai file runtime lokal yang dibundel, bukan mengambil dependensi baru.
