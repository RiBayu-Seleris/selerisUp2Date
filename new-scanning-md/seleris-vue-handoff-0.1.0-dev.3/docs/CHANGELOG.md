# Perubahan SDK Vue

## 0.1.0-dev.3 — 14 September 2026

- Perbaiki dekuantisasi output deteksi aksesori: raw `1` kini menjadi `1/256`, bukan 100%. Pemetaan label/model dan ambang Mobile tetap sama.
- Perbaiki guidance untuk status `FaceMaskDetected`.
- Reset status aksesori saat wajah hilang/multiple faces dan abaikan hasil inferensi yang terlambat dari pengamatan sebelumnya.
- Validasi kontrak model/output serta cleanup tensor pada jalur error ditambahkan.
- Profil tujuh field, lima hasil, heatmap, SQI, dan formula tetap sama. Paket runtime dan contoh Vue memakai direktori versi `.3`.
- Akar masalah, bukti regresi, dan langkah upgrade: [FIX-ACCESSORY-DETECTION-0.1.0-dev.3.md](FIX-ACCESSORY-DETECTION-0.1.0-dev.3.md).

## 0.1.0-dev.2 — 9 September 2026

- Profil wajib menjadi tujuh field: `age`, `sex`, `heightCm`, `weightKg`, `lifestyle.smoking`, `lifestyle.alcohol`, `lifestyle.motorcycle`. Male/Female memakai bentuk yang sama; kehamilan dan enam pertanyaan lifestyle lainnya tidak diperlukan.
- Tipe TypeScript, validator, snapshot profil, bridge iframe dan contoh Vue memakai kontrak minimal. Jawaban kosong ditolak; boolean `false` tetap valid. Field tambahan dari objek lama diabaikan dan tidak diteruskan.
- Perhitungan lima hasil menggunakan formula Mobile yang sama, dengan jalur yang berhenti sebelum menghitung metric/risk/score Care lainnya. Tidak ada jawaban lifestyle buatan untuk melengkapi kontrak Care lama.
- Unit lima hasil dipastikan `bpm`, `napas/menit`, `ms`, `mmHg`, `mmHg`; memperbaiki placeholder `unit` yang dapat terbawa dari template Care pada versi sebelumnya. Nilai, pembulatan dan penanda sumber hasil tidak diubah.
- Dokumentasi, contoh frontend, versi direktori aset dan tarball distribusi diperbarui bersama. Lihat [INTEGRATION.md](INTEGRATION.md) untuk upgrade dari `0.1.0-dev.1`.
- Pengujian tambahan membandingkan profil minimal dengan Mobile Kotlin, memvariasikan field yang dihapus, mengamati input nyata melalui bridge, dan memeriksa finalisasi lima hasil di browser dengan analisis sintetis. Rincian di [VALIDATION.md](VALIDATION.md).

Heatmap, algoritma native/WASM, model, pemeriksaan cahaya/kacamata, SQI, motion, spoof screening dan batas waktu scan tetap mengikuti implementasi sebelumnya. Build tetap prerelease untuk integrasi/UAT; kesetaraan perangkat fisik belum disertifikasi.

## 0.1.0-dev.1 — 8 September 2026

Build integrasi awal dengan profil Care lengkap, lima output, pemrosesan lokal, heatmap Mobile 1.9.2 dan paket Vue/WASM. Revisi dokumentasi profil tujuh field pada tanggal yang sama belum mengubah validator versi ini; dukungan runtime tersedia mulai `0.1.0-dev.2`.
