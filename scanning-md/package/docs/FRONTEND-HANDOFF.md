# Panduan frontend Vue — SDK 0.1.0-dev.2

Tanggal: **9 September 2026**. SDK dan dokumentasi sekarang mendukung **profil minimal 7 field**. Panduan ini menggantikan instruksi profil lengkap dan catatan penundaan dukungan SDK pada handoff sebelumnya.

Siapkan **usia, jenis kelamin, tinggi badan, berat badan, status merokok, konsumsi alkohol, dan penggunaan sepeda motor**. Ketujuh field berlaku sama untuk Male/Female. Tidak perlu meminta pekerjaan, status perkawinan, hobi berbahaya, durasi tidur, paparan layar, aktivitas fisik, atau kehamilan untuk cakupan lima hasil.

| Dokumen | Gunakan untuk |
|---|---|
| [USER-PROFILE.md](USER-PROFILE.md) | Label form, tipe, validasi, contoh JSON yang diterima SDK, dan field yang dihapus |
| [INTEGRATION.md](INTEGRATION.md) | Instalasi/upgrade, lifecycle kamera, lima hasil, heatmap, dan hosting |
| [API.md](API.md) | Komponen, tipe profil minimal, validator, event, hasil, dan error |
| [VALIDATION.md](VALIDATION.md) | Bukti pengujian dan batas validasi perangkat fisik |

Paket library yang dipakai adalah **`seleris-rppg-vue-0.1.0-dev.2.tgz`**. Pasang paket baru dan salin runtime ke direktori versi `0.1.0-dev.2`; contoh di `examples/vue-vite/` sudah memakai tujuh field. Jangan memakai aset atau validator `0.1.0-dev.1` untuk form baru.

Output tetap **Heart Rate, Breath Rate, HRV SDNN, sistolik, dan diastolik**. Pertahankan penanda `source`/`availability`, termasuk `formula_estimate` untuk tekanan darah. Pemrosesan, quality gate, dan heatmap dilakukan lokal oleh SDK. Build ini tetap prerelease untuk integrasi/UAT; parity pada perangkat fisik belum disertifikasi.
