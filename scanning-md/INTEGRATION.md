# Panduan integrasi Vue

Berlaku untuk **`@seleris/rppg-vue@0.1.0-dev.2`**. SDK menerima profil **7 field** yang dijelaskan pada [USER-PROFILE.md](USER-PROFILE.md). Tipe `SelerisProfile`, `validateProfile`, scanner, dan contoh Vue memakai kontrak minimal yang sama.

## Yang diserahkan ke dev Vue

1. Tarball `dist/seleris-rppg-vue-0.1.0-dev.2.tgz`.
2. Dokumen `USER-PROFILE.md`, `API.md`, dan dokumen ini yang disertakan dalam paket versi baru.
3. Contoh lengkap `examples/vue-vite/` dengan form tujuh field, scan, dan lima kartu hasil.

Tidak diperlukan Flutter, Emscripten, C++, atau perubahan formula pada komputer dev Vue. Node diperlukan untuk instalasi/build project Vue; browser menjalankan bundle dan WASM yang sudah terkompilasi. Jangan memasang folder source `engine/` sebagai dependensi Vue.

## Instalasi

```sh
npm install /path/ke/seleris-rppg-vue-0.1.0-dev.2.tgz
npx seleris-copy-assets public/vendor/seleris-rppg/0.1.0-dev.2
```

Perintah salin menolak direktori tujuan yang sudah ada supaya upgrade tidak mencampur aset antarrilis. Simpan runtime setiap versi di direktori terpisah. Setelah upgrade, ubah `assetBaseUrl` sesuai versi baru. Folder aset harus ikut hasil deployment Vite.

## Upgrade dari 0.1.0-dev.1

1. Instal tarball `0.1.0-dev.2` dengan perintah di atas; commit perubahan `package.json` dan lockfile project Vue.
2. Jalankan helper salin aset ke direktori baru `0.1.0-dev.2`, lalu ubah `assetBaseUrl` ke direktori yang sama. Deploy bundle host dan aset baru bersama-sama; jangan mencampur runtime lama dengan library baru.
3. Hapus tujuh pertanyaan yang tidak dipakai dari form dan objek profil. Tersisa empat data dasar serta `smoking`, `alcohol`, `motorcycle`. Female tidak memerlukan `pregnancyCode`.
4. Gunakan `validateProfile` dari paket baru. Field tambahan dari objek profil lama diabaikan dan tidak diteruskan; tidak perlu membuat jawaban pengganti.
5. Uji Male/Female, pilihan Ya/Tidak, kesalahan field, start/cancel, serta lima hasil. Nama komponen, event, dan lima key output tetap sama. Unit output dipastikan `bpm`, `napas/menit`, `ms`, `mmHg`, `mmHg`.

## Halaman profil dan kamera

- Rancang label, pilihan radio/dropdown dan pesan kesalahan mengikuti [FORM-UI-UX.md](FORM-UI-UX.md). Label Laki-laki/Perempuan dikirim sebagai `Male`/`Female`; Ya/Tidak dikirim sebagai boolean `true`/`false`.
- Siapkan tepat tujuh input pada [USER-PROFILE.md](USER-PROFILE.md): `age`, `sex`, `heightCm`, `weightKg`, serta `lifestyle.smoking`, `lifestyle.alcohol`, `lifestyle.motorcycle`. Jumlah field sama untuk Male/Female; tidak ada pertanyaan kehamilan.
- Validasi form sesuai rentang dan tipe pada dokumen tersebut. Jangan memberi jawaban `false` atau angka default pada pertanyaan yang belum dijawab.
- Jalankan `validateProfile(profile)` dan tampilkan kesalahan per field. Bila hasilnya `[]`, mount komponen dengan profil valid, `assetBaseUrl`, bahasa dan pilihan kamera.
- Tunggu event `ready`, lalu panggil `start()` dari tombol pengguna. Izin kamera diminta pada saat start.
- Gunakan `state`, `progress`, `quality`, `liveVitals`, dan `heatmapStatus` untuk UI. Hasil final hanya berasal dari event `result`.
- Saat route ditutup, komponen Vue otomatis menjalankan `dispose()`. Bila memakai `createScanner` langsung, panggil `dispose()` sendiri.
- Untuk pengguna/profil baru, unmount scanner lama terlebih dahulu lalu mount scanner baru, misalnya menggunakan `:key="profileSessionId"`. Profil dibekukan saat inisialisasi; mutasi prop tidak mengubah scan yang sedang berjalan.
- Jika memakai `<KeepAlive>`, dispose/unmount scanner saat halaman dinonaktifkan; jangan mempertahankan kamera tersembunyi.
- Satu scanner aktif per halaman. `cancel()` menghentikan kamera. `retry()` mengikuti terminal-state policy Mobile dan mempertahankan request ID. Untuk scan baru setelah cancel gunakan `start()`.

## Integrasi programatis

Variabel `profile` berasal dari form tujuh field; bentuk lengkapnya tersedia di USER-PROFILE.md. Gunakan tipe `SelerisProfile` dari paket untuk pemeriksaan saat build.

```ts
import {createScanner, validateProfile} from '@seleris/rppg-vue';

const issues = validateProfile(profile);
if (issues.length) throw new Error('Profil belum lengkap');
const scanner = createScanner(cameraContainer, {
  assetBaseUrl: '/vendor/seleris-rppg/0.1.0-dev.2/',
  profile,
  language: 'id',
  heatmapEnabled: true,
  captureStillFrame: false,
});
scanner.on('result', result => { renderFiveMetrics(result.metrics); });
scanner.on('error', error => { showError(error); });
await scanner.initialize();
// Pada handler tombol:
await scanner.start();
// Pada cleanup route:
await scanner.dispose();
```

Untuk subpath `/health/`, gunakan `${import.meta.env.BASE_URL}vendor/seleris-rppg/0.1.0-dev.2/` pada `assetBaseUrl`. Pada Nuxt, render dalam `<ClientOnly>` dan import/mount scanner hanya di browser. Konstruktor membutuhkan DOM, kamera, `crypto.randomUUID`, serta secure context.

## Tampilan hasil

Tampilkan tepat lima key `metrics`. HRV adalah **SDNN, ms**. `heartRate` pada `liveVitals` masih provisional; kosongkan saat nilainya `null`. Laju napas/HRV final dapat berasal dari fallback resmi Mobile ketika estimasi sinyal turunannya belum tersedia. Tampilkan `source` sebagai label, khususnya `formula_estimate` untuk tekanan darah. Jangan mengubah fallback menjadi label “diukur langsung”.

“30 detik” adalah 900 sampel pada sekitar 30 Hz. Persiapan, stabilisasi, preflight, dan frame yang ditolak menambah waktu. Measurement memiliki batas 45 detik dan tidak dilonggarkan untuk perangkat lambat. Hasil tidak boleh dibuat dari progress 100% atau timeout.

## Heatmap dan foto

Heatmap langsung dirender di atas video oleh SDK. Vue cukup mengaktifkan `heatmapEnabled`; tidak perlu menghitung grid atau menggambar ulang. `exportHeatmap({composite:true})` menghasilkan `Blob` PNG dengan frame kamera + overlay. Tanpa `composite`, PNG transparan. Export tersedia setelah heatmap benar-benar terlihat dalam scan yang valid, serta snapshot final sampai retry/dispose. `HEATMAP_NOT_READY` berarti belum ada heatmap yang layak diekspor.

Still frame bersifat opt-in (`captureStillFrame:true`). Event `stillFrameReady` membawa JPEG `Blob`, lebar dan tinggi. Buat URL sementara memakai `URL.createObjectURL(blob)` dan revoke setelah selesai. Crop persegi 1,8 kali ukuran wajah, JPEG awal kualitas 80, maksimal 150 KiB, kompresi bertahap mengikuti Mobile. Tidak ada penyimpanan permanen/upload otomatis. Kegagalan foto tidak menggagalkan lima hasil vital signs.

## Hosting dan jaringan

Gunakan HTTPS (localhost diperbolehkan saat development). Sajikan `.wasm` sebagai `application/wasm`, `.js`/`.mjs` sebagai JavaScript dan `.json` sebagai JSON. Jangan redirect file aset yang tidak ada ke SPA `index.html`. Aset iframe, worker, model dan runtime harus satu origin. Jangan menambahkan sandbox iframe yang menghilangkan origin atau izin kamera.

Header minimum bila website menggunakan kebijakan ketat:

```text
Permissions-Policy: camera=(self), microphone=()
```

Runtime membutuhkan izin CSP untuk skrip/worker same-origin, kompilasi WASM, serta `blob:` untuk worker/foto dan `data:` untuk aset Flutter. Contoh awal khusus route scanner:

```text
Content-Security-Policy: default-src 'self'; script-src 'self' 'wasm-unsafe-eval'; worker-src 'self' blob:; connect-src 'self' blob:; img-src 'self' blob: data:; style-src 'self' 'unsafe-inline'; font-src 'self' data:; frame-src 'self'; media-src 'self' blob:; object-src 'none'
```

Sesuaikan dengan kebutuhan host dan verifikasi pada browser target. Jangan menyalin kebijakan ini ke seluruh website tanpa menguji dependensi landing page. Tidak wajib memasang COOP/COEP: mode satu thread tersedia. Mode banyak thread hanya aktif ketika browser melaporkan `crossOriginIsolated`.

`ready` berarti model dan katalog utama telah dimuat. Pengukuran setelah itu diproses lokal. “Tanpa API” berarti tidak ada layanan pengukuran/API key/upload; hosting tetap melayani aset statis. Offline setelah reload bukan jaminan SDK ini; jika diperlukan, host harus menyediakan cache offline lengkap dan memperbaruinya secara atomik per versi.

Jangan tampilkan klaim “60+ metrics” dari screenshot untuk integrasi ini: kontrak publik dibatasi lima metric. Landing page milik rekan dev tidak diubah oleh paket ini.
