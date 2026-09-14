# Build dan pemeliharaan

Dev Vue cukup memakai tarball terkompilasi; bagian ini untuk pemelihara SDK.

## Toolchain yang digunakan

- macOS arm64; Apple Clang dari Command Line Tools.
- Flutter 3.44.0 / Dart 3.12.0.
- Emscripten SDK 4.0.10, `-O2 -ffp-contract=off -fno-fast-math`.
- Node 22.16.0; npm lockfile disertakan.
- Kotlin 2.2.20 / Temurin JDK 17 untuk oracle Mobile.
- ONNX Runtime Web 1.27.0; WASM-only loader. `.mjs` dan `.wasm` diverifikasi identik dengan distribusi npm resmi versi tersebut. Model ONNX dan recurrent state tidak diubah.

Default script menggunakan toolchain workspace pada `../.toolchains/`. Untuk instalasi lain, set `NODE`, `FLUTTER`, `EMXX`, `KOTLINC`, `JAVA_HOME`, dan bila perlu `NPM_CLI`. Jangan mengganti `HOME`/direktori konfigurasi user.

## Build paket

```sh
cd seleris-rppg-vue-sdk
npm ci
python3 scripts/build.py
```

Urutan build: verifikasi hash source C++, compile WASM, bundle TypeScript/bridge, Flutter release web tanpa CDN resource, stage aset lokal, minify runtime, tulis manifest hash, `npm pack`. Tidak ada `npm publish`.

Jika seluruh dependensi Flutter pada lockfile sudah tersedia di `PUB_CACHE`, gunakan `SELERIS_PUB_OFFLINE=1 python3 scripts/build.py` untuk build tanpa pencarian paket Flutter melalui jaringan. Lockfile tetap ditegakkan; cache yang tidak lengkap akan menyebabkan build gagal. Rilis `.3` memakai opsi ini setelah resolver online tertahan pada lingkungan build.

`dist/*.tgz` adalah artifact konsumsi. `packages/rppg-vue/runtime/` adalah output staging; jangan mengedit hasil build. Ubah source di `engine/` atau `packages/rppg-vue/src/`, lalu build ulang. Kernel vendored di `engine/native-core/` diperlakukan immutable; adapter Web berada di `engine/wasm/`.

## Pengujian

```sh
python3 scripts/build-native.py --native
python3 scripts/build-kotlin-oracle.py
npm run build:library
npm test
```

Oracle native memanggil source C++ yang sama, bukan menyalin rumus. Oracle Kotlin memanggil source Mobile asli; script mengekstrak deklarasi model Android-free dan menghilangkan adapter Android/JNI yang tidak dipakai. Semua source asal dicatat dalam manifest SHA. Golden hasil tidak boleh diubah untuk menutupi kegagalan.

Toleransi numeric C++/WASM ditetapkan di test: absolut `1e-6 + 1e-9*abs(reference)` untuk floating point; **identik** untuk preprocessing tensor dan byte grid. Kotlin color map/filter harus identik. Kelima metric final, source dan availability harus identik pada fixture profil. SQI/spectral Kotlin bertoleransi absolut `1e-6`.

## Contoh Vue dan browser

```sh
cd examples/vue-vite
npm install
npm run setup:assets
npm run dev
```

`setup:assets` digunakan pada direktori tujuan baru. Jika sudah ada, gunakan versi asset baru atau hapus hanya output generated milik contoh setelah memastikan tidak ada aset buatan pengguna di dalamnya.

Dari root SDK:

```sh
npx playwright install chromium
npm run test:browser
```

Pengujian browser menggunakan kamera sintetis Chromium dan real ONNX/WASM. Test policy menggunakan akses Session yang diinjeksi hanya oleh test; hook itu tidak masuk paket konsumsi. Kamera sintetis bukan bukti scan wajah manusia. Laporan berada di `reports/`.

Setelah mengganti isi tarball dengan versi development yang sama, install ulang paket lokal dan salin ulang aset sebelum menjalankan browser tests. Untuk rilis nyata selalu gunakan versi baru agar cache tidak mencampur runtime.

## Rilis

Periksa [VALIDATION.md](VALIDATION.md) dan matriks perangkat sebelum mengubah `parityCertified` atau mengiklankan parity Mobile 1.9.2. Kelulusan schema atau fixture sintetis saja tidak cukup. Pertahankan notice model, lisensi dan batas distribusi proyek. Simpan SHA256 tarball/runtime; jangan menimpa artifact baseline Android/Web/iOS.
