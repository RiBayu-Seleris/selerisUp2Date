# Audit awal untuk rencana SDK Vue

Tanggal: 8 September 2026  
Scope: pemeriksaan read-only untuk membuat implementation plan; bukan verifikasi rilis atau audit menyeluruh semua dependency.

## Hasil pemeriksaan yang benar-benar dijalankan

| Pemeriksaan | Hasil |
|---|---|
| Root Git | `git status --short` menyatakan bukan repository Git. Belum dibuat repository/commit karena tahap sekarang hanya rencana. |
| Instruksi lokal | `macbook_dev.md` dibaca; pencarian `AGENTS.md` pada workspace tidak menemukan file. |
| Perintah checksum handoff | `shasum -a 256 -c SHA256SUMS.txt` di `dist` gagal membaca nama dengan akhiran CR. |
| Verifikasi ulang checksum dist | Pembacaan Python `splitlines()` menangani CRLF di memori; hashing SHA-256 byte file menghasilkan 28 PASS, 0 mismatch, 0 missing. Manifest asli tidak diedit. |
| Patch presentation 1.6.10 | Dua file pada manifest `dist/presentation-contract-fix-1.6.10/SHA256SUMS.txt` cocok. |
| Hash parity 1.9.2 | 36/36 cocok setelah label logis manifest dipetakan ke source native runtime 1.9.2 yang benar dan core AAR. |
| Aset Web yang dipin | 10/10 cocok dengan tabel `expectedHashes` pada `tool/verify_web_release.mjs`. Ini hanya verifikasi hash; script Node lengkap belum dijalankan. |
| Ukuran aset Web | `du -sh` menunjukkan sekitar 69 MiB untuk `assets/web`, dengan sekitar 48 MiB di `runtime`; bukan ukuran transfer HTTP terkompresi. |
| Flutter/Dart/Node/npm | Tidak ditemukan pada PATH sesi shell ini. Belum membuktikan tidak terpasang di lokasi lain. |
| Android/tool build | `adb`, `gradle`, `cmake`, `ninja`, dan `git-lfs` tidak ditemukan pada PATH. Gradle wrapper yang dibundel dapat digunakan setelah Java/SDK siap. |
| Java | `/usr/bin/java` tersedia sebagai launcher, tetapi `java -version` gagal: Java Runtime tidak ditemukan. |
| Apple toolchain | `xcodebuild -version` gagal karena active developer directory adalah CommandLineTools, bukan Xcode penuh. Tidak menghalangi drafting; Xcode penuh bukan syarat browser desktop inti. |
| Eksekusi test/build | Flutter test/analyze, Gradle unit tests, AAR/APK build, Node gate, Flutter Web build, serta scan perangkat belum dijalankan pada sesi ini. |

Pemetaan 36 hash yang berhasil:

```text
native-source/* -> native-runtime-1.9.2/app/src/main/kotlin/ai/seleris/merppg/demo/*
runtime/*       -> native-runtime-1.9.2/rppg-runtime/src/main/kotlin/ai/seleris/rppg/profilea/*
core/*          -> AAR dengan nama sesuai di seleris-rppg-flutter-profile-a-1.9.2/android/repository/
```

Pencarian awal pada source demo 0.14.2 menghasilkan hanya 21 kecocokan karena demo itu bukan seluruh source Mobile 1.9.2. Setelah memakai `native-runtime-1.9.2`, seluruh 36 cocok. Ini tidak menunjukkan korupsi transfer atau alasan memakai source demo lama sebagai acuan.

Laporan release Mobile yang dibawa dari lingkungan lama menyebut 42 Flutter tests dan 83 native tests lulus. Angka tersebut belum direproduksi di Mac ini. Hash cocok membuktikan identitas berkas referensi, bukan akurasi numerik port browser atau keberhasilan build baru.

## Struktur dan hambatan transfer

| Item dalam handoff | Temuan aktual | Tindak lanjut implementasi |
|---|---|---|
| `_baselines` | Tidak ditemukan di root workspace. | Inventaris baseline yang diperlukan; manifest terpisah belum dapat diverifikasi. Jangan mengklaim audit `_baselines` selesai. |
| `working/native-runtime-1.9.2` | Folder `working` tidak ada; source ditemukan sebagai `native-runtime-1.9.2` pada root. | Gunakan lokasi nyata dan sesuaikan konfigurasi build salinan kerja secara terisolasi. |
| `working/web-sdk-npm` | Folder/tarball `.tgz` belum ditemukan pada inventaris workspace. | Pulihkan dependency versi yang dipin beserta hash/lock sebelum reproduksi build. JS/WASM runtime Web yang sudah dibundel tersedia. |
| Arsip evaluasi native | File ZIP tersedia dalam `seleris-merppg-sdk-hardened-0.8.0/dist/android/non-distributable/`. Referensi `../../../...` di build runtime tidak mengarah ke lokasi itu setelah perpindahan folder. | Perbaiki path/config dalam salinan kerja atau parameter build macOS; jangan mengubah isi algoritma atau menghapus arsip. |
| Model aksesori native | Model TFLite dan license yang dirujuk runtime ditemukan. | Pertahankan dan verifikasi dalam release pipeline. |
| `local.properties` | Masih berisi Windows paths pada native runtime dan example Android Mobile. | Buat konfigurasi Mac lokal yang di-ignore; pertahankan script Windows. |
| Distribusi Web 1.6.10 | ZIP root dan ZIP patch presentation terpisah sama-sama ada; handoff Web menunjuk patch presentation sebagai deliverable resmi. | Jangan hanya memilih ZIP root karena nomor versinya sama. Bekukan baseline source/aset dan patch yang dipakai. |
| Landing page Vue | Source/package.json landing page belum ditemukan di workspace. | Example memakai asumsi Vue 3 + Vite; integrasi final dikonfirmasi terhadap project developer host. |

## Gap fungsional prioritas

1. Heatmap Web memakai warna frame/grid 12×12, sementara Mobile memakai grid perfusi 18×18. Port core/filter/renderer dan golden tests diperlukan.
2. Web 1.6.10 belum boleh dianggap mendukung seluruh still-frame, passive spoof screening, kamera/telemetry, dan kontrak Mobile 1.9.2 hanya karena README menyebut baseline scan 1.6.10.
3. Mobile mensyaratkan analyzer admission 24 Hz. Fungsi `updatePreflight()` Web yang ditinjau memeriksa accepted rate 18 Hz dan SQI; audit seluruh jalur admission diperlukan untuk membuktikan gate 24 Hz, timing, dan error sama.
4. Public output perlu adapter allowlist lima metric. Selector disease risk kosong tidak valid pada typed input Mobile, sehingga filter presentasi harus dipisah dari kontrak internal.
5. Input profil/lifestyle harus tersedia untuk formula Mobile. `SBP`/`DBP` memiliki provenance `FORMULA_ESTIMATE`; metadata itu perlu diteruskan.
6. Jalur LLM pada source Mobile tidak termasuk produk web tanpa API; gunakan perilaku katalog fallback lokal dari binary referensi.

## Urutan pemeriksaan lanjutan

1. Temukan/persiapkan toolchain dan dependency versi yang kompatibel dengan lock/config referensi; catat versi dan hasil nyata.
2. Selesaikan inventaris `_baselines` serta tarball npm yang hilang. Pertahankan checksum source/model yang sudah cocok.
3. Siapkan Git baseline dan `docs/development/MACBOOK_HANDOFF_STATUS.md`, `PLATFORM_PARITY_MATRIX.md`, serta `DECISION_LOG.md` sesuai handoff sebelum source diubah.
4. Jalankan test/build Android referensi dan Web baseline; pisahkan error environment dari regresi source. Jangan mengubah threshold agar lolos.
5. Lanjutkan implementasi melalui tahap dan acceptance di [IMPLEMENTATION_PLAN.md](IMPLEMENTATION_PLAN.md).
