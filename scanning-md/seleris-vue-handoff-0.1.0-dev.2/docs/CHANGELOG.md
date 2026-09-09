# Perubahan SDK Vue

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
