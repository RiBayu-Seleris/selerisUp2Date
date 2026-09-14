# Seleris rPPG untuk Vue

Library privat `@seleris/rppg-vue`, build `0.1.0-dev.3`, referensi Flutter Mobile **1.9.2**.

**Perbaikan 14 September 2026:** decoding skor kacamata/masker, guidance masker, reset status wajah, serta cleanup tensor diperbaiki. [Catatan perbaikan dan upgrade ke `.3`](docs/FIX-ACCESSORY-DETECTION-0.1.0-dev.3.md).
Core native 0.8.0 dikompilasi menjadi **WebAssembly (.wasm)**. Modul Flutter Web terkompilasi berjalan dalam iframe same-origin; Vue menggunakan komponen dan event bertipe. Distribusi berisi bundle minified, deklarasi TypeScript, WASM, model dan aset lokal. Tidak perlu menyalin formula ke project Vue. Browser tidak menjalankan DLL.

Paket ini adalah build integrasi/prerelease. `parityCertified: false` sampai validasi kamera/perangkat fisik selesai. Rincian bukti dan batas pengujian: [VALIDATION.md](docs/VALIDATION.md).

**Profil tujuh field (sejak 0.1.0-dev.2):** SDK, tipe TypeScript, validator dan contoh Vue kini menerima **7 field**: usia, jenis kelamin, tinggi, berat, merokok, alkohol, dan penggunaan motor. Acuan field dan contoh JSON valid: [USER-PROFILE.md](docs/USER-PROFILE.md). Tidak perlu mengisi jawaban tambahan atau nilai default untuk field yang dihapus.

## Instalasi ke project Vue 3

```sh
npm install ./seleris-rppg-vue-0.1.0-dev.3.tgz
npx seleris-copy-assets public/vendor/seleris-rppg/0.1.0-dev.3
```

```vue
<script setup lang="ts">
import {ref} from 'vue';
import {SelerisScanner, type SelerisProfile, type ScanResult} from '@seleris/rppg-vue';
defineProps<{profile: SelerisProfile}>(); // profil minimal 7 field dari form Anda
const scanner = ref<InstanceType<typeof SelerisScanner>>();
const ready = ref(false);
function result(value: ScanResult) { console.log(value.metrics); }
</script>
<template>
  <div style="height:480px">
    <SelerisScanner ref="scanner" :profile="profile"
      asset-base-url="/vendor/seleris-rppg/0.1.0-dev.3/"
      @ready="ready = true" @result="result" @error="console.error" />
  </div>
  <button :disabled="!ready" @click="scanner?.start()">Mulai scan</button>
</template>
```

Gunakan HTTPS atau localhost. Semua aset harus disalin utuh dan dilayani dari origin website yang sama. Setelah `ready`, inference dan perhitungan berjalan lokal; tidak ada API scan, API key, LLM, atau upload foto. Pengunduhan aset statis saat inisialisasi tetap diperlukan. Reload pertama tanpa cache memerlukan akses ke hosting aset tersebut.

## Kontrak integrasi

- [Mulai di sini: panduan frontend revisi 7 field](docs/FRONTEND-HANDOFF.md)
- [Spesifikasi form UI/UX dan seluruh pilihan input](docs/FORM-UI-UX.md)
- [Form 7 field dan status kompatibilitas SDK](docs/USER-PROFILE.md)
- [Panduan integrasi, Vite, Nuxt, hosting dan lifecycle](docs/INTEGRATION.md)
- [API, event, lima output dan error](docs/API.md)
- [Arsitektur dan heatmap Mobile](docs/ARCHITECTURE.md)
- [Build dan pengujian](docs/BUILD.md)
- [Validasi dan status parity](docs/VALIDATION.md)
- [Riwayat perubahan versi](docs/CHANGELOG.md)

Output publik hanya **Heart Rate, Breath Rate, HRV SDNN, Systole, Diastole**. Sumber metric (`source`) dipertahankan: tekanan darah mengikuti formula profil Mobile, dan fallback HRV/napas tetap diberi label `formula_estimate`. Heatmap adalah visualisasi perfusi relatif BVP dari core Mobile, bukan peta tekanan darah atau suhu.

Contoh lengkap ada di `examples/vue-vite/`: form tujuh field tanpa jawaban default, scan, SQI, heatmap, cancel/retry, dan unduhan JSON/PNG lokal.

Kode sumber pemeliharaan berada di folder SDK terpisah. Paket konsumsi untuk rekan Vue tidak berisi source C++/Dart/TypeScript. Minification/WASM bukan jaminan kerahasiaan; aset yang dijalankan di browser dapat diambil pengguna browser.
