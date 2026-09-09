# Validasi build 0.1.0-dev.2

Referensi: Mobile Flutter **1.9.2**, native core **0.8.0**. Revisi: 9 September 2026. Versi browser dan command aktual direkam pada `reports/`. Build ini dapat dipakai untuk integrasi/UAT; `parityCertified:false`, `releaseReady:false`.

**Profil minimal didukung mulai `0.1.0-dev.2`.** Pengujian unit/golden, library, contoh Vue dan browser dijalankan kembali untuk perubahan ini. Bukti audit baseline dan 42 pengujian Flutter Mobile berasal dari 8 September; sumber Mobile tidak berubah. Pengujian profil minimal memakai input dan paket baru, termasuk Female tanpa kehamilan dan semua kombinasi tiga boolean.

## Bukti yang dijalankan

| Pemeriksaan | Hasil/cakupan |
|---|---|
| Artifact baseline | 28 hash distribusi, 2 hash patch presentation, 36 hash algoritma Mobile, 10 aset Web dipin cocok |
| Flutter Mobile di Mac | `pub get --enforce-lockfile`, format 19 file tanpa perubahan, analyzer tanpa isu, 42 test lulus |
| Native source | 63 file kernel/header vendored diverifikasi SHA sebelum compile; formula kernel tidak diedit |
| C++ native vs WASM | 44 fixture: 39 canonical, 1 spatial square, 4 full-window modulated 900-sample |
| Numeric kernel | HR, SQI, PRV, RR, morphology, metadata, reset, penolakan timestamp duplikat dibandingkan; selisih maksimum dan setiap fixture ada di `reports/wasm-native-parity.json` |
| Tensor preprocessing dan heatmap grid | Tensor dan byte intensitas harus identik antara native dan WASM |
| Warna/filter Mobile | Seluruh 256 warna RGBA dan 16 grid 18×18 cocok persis dengan Kotlin asli |
| Profil dan lima hasil | 88 kombinasi umur/sex/lifestyle/availability dibandingkan dengan `VitalInsightsEngine` Kotlin; profil lengkap dan minimal menghasilkan proyeksi publik identik |
| Variasi jawaban yang dihapus | 64 profil minimal (2 sex × 8 kombinasi boolean × 4 mode ketersediaan HRV/napas), masing-masing dibandingkan dengan 3 variasi lifestyle lengkap Mobile: 192 referensi / 960 perbandingan metric; nilai, pembulatan, source dan availability sesuai |
| Tidak membaca jawaban tambahan | Proxy pengujian menggagalkan akses ke field lifestyle selain smoking/alcohol/motorcycle; jalur minimal tetap menghasilkan lima hasil tanpa akses tambahan |
| SQI dan provisional HR | SQI rolling, bukti spectral preflight, keputusan spoof, HR sementara dibandingkan dengan monitor Kotlin pada 3 jenis sinyal |
| Kontrak wrapper | Tujuh field, kedua sex, seluruh kombinasi boolean, batas angka, input kosong/ambigu; field tambahan tidak ditransfer; tepat 5 output dengan unit yang benar; kualitas buruk/status gagal tidak menghasilkan `ScanResult` |
| Browser Chromium | Paket Vue + Flutter terkompilasi menerima form tujuh field Male/Female; test mengamati input yang melewati bridge; izin kamera sintetis, cancel, start ulang, unmount/remount, tanpa request HTTP saat scan setelah ready |
| Finalisasi profil minimal | Session browser + runtime formula menyelesaikan lima hasil dan menghentikan kamera untuk Male/Female dengan analisis sintetis; bukan rekaman wajah manusia |
| Worker browser nyata | 900 RGB frames lewat model ONNX dan native WASM; hasil final native; reset/replay BVP deterministik |
| Policy browser | Cahaya gelap/clear, hysteresis kacamata, HR disembunyikan saat gerak, callback lama, restart preflight, SQI/cadence boundary, watchdog dan interruption budget |
| Foto | Crop 1,8× persegi, batas JPEG 150 KiB, callback terlambat setelah cancel dibuang; 3 kegagalan foto tidak menggagalkan hasil; failure sebelum Care |
| PNG heatmap | Render hanya pada phase layak, PNG transparan/composite, mirror horizontal tepat, snapshot final, pembersihan saat dispose |
| Build konsumsi | Library ESM/deklarasi TypeScript dan Flutter release web; contoh Vue dibangun dengan Vite |

Laporan unit/golden dan browser disimpan bersama handoff. Pengujian policy menyuntikkan dependensi tertentu untuk mencapai boundary secara deterministik; test worker ONNX dan test lifecycle komponen menjalankan runtime browser sebenarnya. Kamera sintetis tidak berisi wajah manusia dan tidak dipakai untuk mengklaim akurasi hasil manusia.

Ringkasan profil minimal ada pada `reports/minimal-profile-parity.json`. Source Mobile asli tidak dimodifikasi; oracle Kotlin diperluas hanya pada data uji. Formula/threshold tidak dilonggarkan untuk menyamakan hasil.

## Perbaikan yang ditemukan melalui pengujian

- Baseline `ort.min.js` meminta JSEP module yang tidak disertakan. Loader diganti **WASM-only 1.27.0** dari npm resmi; file WASM/MJS cocok byte-for-byte dengan baseline.
- Flutter mencoba mengambil font Roboto dari Google Fonts. Font dibundel lokal dan fallback diarahkan ke origin lokal.
- Profil reactive Vue tidak dapat melalui `structuredClone` langsung. Wrapper sekarang memilih field kontrak menjadi objek plain sebelum transfer.
- Perbedaan pembulatan ties-even, ekspresi fallback napas Kotlin, metadata source/availability RR/HRV, crop foto, dan callback lintas session diperbaiki berdasarkan source Mobile serta golden.
- Hilangnya sampel RGB SpO2 tidak boleh memblokir input rPPG. SpO2 tidak diteruskan ke publik; fallback internal tidak menambahkan gate baru.

## Yang belum boleh diklaim

**Parity seluruh pengalaman Mobile 1.9.2 dan kelayakan production belum disertifikasi.** Alasan spesifik:

1. Detector Web menggunakan BlazeFace/MediaPipe, Android memakai ML Kit. Contour detail berbeda; heatmap memakai fallback geometri resmi Mobile. Golden grid/warna tidak membuktikan pixel overlay sama pada wajah nyata.
2. Android membaca Y-plane dan metadata CameraX; browser menggunakan RGB canvas, facing mode/cadence yang tersedia dari browser. Gate cahaya dan transform perlu diuji pada kamera nyata.
3. Belum ada paired recording wajah manusia antara Android referensi dan Web untuk membandingkan hasil akhir, kualitas, gerak/kacamata dan rejection rate. Nilai fixture numerik bukan validasi akurasi klinis.
4. Chromium headless Mac telah diuji. Safari macOS/iOS, Chrome Android, Edge serta kamera front/rear fisik belum diuji pada sesi ini.
5. Native Gradle unit tests, AAR dan APK belum direbuild pada Mac karena Android SDK/NDK dan konfigurasi path Android belum tersedia. Oracle Kotlin memakai source asli tetapi bukan pengganti seluruh Gradle test suite. Binary Android baseline tidak diubah.
6. Full Care 50 metric/risk/score tidak menjadi output wrapper dan belum dinyatakan parity menyeluruh. Public age output tidak diminta oleh web dan tidak diteruskan. Referensi internal 1.9.2 tetap menyimpan sebagian truncation yang memang ada pada source Mobile; belum ada sertifikasi audit presisi seluruh internal Care.

## UAT perangkat sebelum production

Gunakan build ini dan APK Mobile 1.9.2 yang sudah dipin. Simpan versi OS/browser, model kamera, facing mode, resolusi aktual, FPS analyzer/accepted, durasi, kode rejection, SQI, kelima hasil dan metadata source. Rekaman hanya dibuat dengan persetujuan pengguna dan disimpan lokal untuk uji.

| Skenario | Kriteria |
|---|---|
| Cahaya depan baik, wajah diam | Scan stabil; tidak menampilkan hasil sebelum valid; compare Mobile/Web |
| Gelap/backlight | Guidance dan penahanan/rejection sesuai sumber Mobile |
| Kacamata/sunglasses/masker | Admission diblokir; hysteresis clear bekerja setelah dilepas |
| Gerak/talking, wajah keluar, beberapa wajah | Quality/motion reject sesuai timing dan kode referensi |
| FPS rendah/perangkat panas | Tidak melonggarkan ambang atau membuat nilai pengganti |
| Heatmap on/off | 18×18 native, warmup/readiness benar, ROI/eye/mouth/dahi dan mirror cocok; dampak FPS dicatat |
| Cancel/tab background/kamera terputus | Kamera berhenti; hasil/callback lama tidak bocor ke scan baru |
| Retry berulang | State/timer/foto/heatmap bersih, memori tidak terus bertambah |
| Foto dan ekspor | Front/rear/orientasi benar, ukuran valid, hasil fisiologi tetap diteruskan jika foto gagal |

Jangan mengubah threshold/formula untuk menutupi kegagalan UAT. Buat issue terpisah untuk gap detector/preprocessing/camera, lengkapi fixture, lalu perbaiki adapter sebelum menaikkan status release.
