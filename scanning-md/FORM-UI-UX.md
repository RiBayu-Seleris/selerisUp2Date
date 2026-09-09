# Spesifikasi form UI/UX — SDK Vue 0.1.0-dev.2

Revisi: **9 September 2026**. Dokumen ini dapat langsung dipakai tim UI/UX dan developer Vue untuk membuat halaman profil sebelum scan. Ketujuh field berikut wajib dijawab. Bentuk form sama untuk laki-laki dan perempuan; tidak ada pertanyaan kehamilan atau lifestyle tambahan.

## Daftar input dan pilihan yang ditampilkan

| Urutan | Label di UI | Field SDK | Kontrol yang disarankan | Pilihan / nilai yang dikirim |
|---|---|---|---|---|
| 1 | Usia | `age` | Input angka, satuan **tahun** | Bilangan bulat **17–100**, misalnya `32` |
| 2 | Jenis kelamin | `sex` | Radio atau dropdown | **Laki-laki** → `"Male"`; **Perempuan** → `"Female"` |
| 3 | Tinggi badan | `heightCm` | Input angka, satuan **cm** | Angka **100–250**, misalnya `170` atau `170.5` |
| 4 | Berat badan | `weightKg` | Input angka, satuan **kg** | Angka **20–400**, misalnya `68` atau `68.5` |
| 5 | Apakah Anda merokok? | `lifestyle.smoking` | Radio dua pilihan | **Ya** → `true`; **Tidak** → `false` |
| 6 | Apakah Anda mengonsumsi alkohol? | `lifestyle.alcohol` | Radio dua pilihan | **Ya** → `true`; **Tidak** → `false` |
| 7 | Apakah Anda menggunakan sepeda motor? | `lifestyle.motorcycle` | Radio dua pilihan | **Ya** → `true`; **Tidak** → `false` |

**Kategori hanya ada pada jenis kelamin dan tiga pertanyaan Ya/Tidak.** Usia, tinggi, dan berat diisi sebagai angka sebenarnya; jangan menggantinya dengan kategori seperti “18–30 tahun” atau “berat badan normal”. Tidak ada kategori frekuensi merokok/alkohol/motor, seperti ringan/sedang/berat atau jarang/sering, pada kontrak SDK ini. Jangan membuat kategori tersebut atau menentukan konversinya sendiri.

`true` / `false` harus boolean JavaScript/JSON, bukan string `"true"` / `"false"`, angka `1` / `0`, atau teks `"Ya"` / `"Tidak"`. Perbedaan label tampilan dan nilai SDK sengaja ditunjukkan pada tabel. Konversi kode formula Mobile dikerjakan oleh SDK.

## Susunan halaman dan teks UI

| Bagian | Teks / perilaku yang disarankan |
|---|---|
| Judul halaman | **Lengkapi profil Anda** |
| Pengantar | **Isi profil untuk perhitungan tekanan darah dan parameter yang menggunakan profil. Pemindaian diproses secara lokal di perangkat Anda.** |
| Kelompok pertama | **Data dasar** — usia, jenis kelamin, tinggi, berat |
| Kelompok kedua | **Gaya hidup** — merokok, alkohol, penggunaan sepeda motor |
| Petunjuk kelengkapan | **Semua kolom wajib diisi.** |
| Tombol sesudah form valid | **Lanjut ke pemindaian** |
| Saat SDK memuat aset | **Menyiapkan pemindaian…**; tombol mulai belum aktif |
| Tombol setelah event `ready` | **Mulai scan**; izin kamera diminta saat pengguna menekannya |

Pada layar lebar, data dasar dapat disusun dua kolom. Pada layar sempit gunakan satu kolom, dengan label tetap terlihat di atas input. Gunakan satu grup radio terpisah per pertanyaan; untuk HTML gunakan `fieldset`/`legend` atau label aksesibel yang setara. Hubungkan pesan kesalahan ke input terkait, dan arahkan fokus ke kesalahan pertama ketika form disubmit.

Semua input mulai kosong. Dropdown memakai placeholder **Pilih jenis kelamin** atau **Pilih jawaban** yang tidak dihitung sebagai jawaban. Pada radio, belum ada pilihan aktif sebelum pengguna menjawab. Hindari toggle/checkbox untuk tiga pertanyaan lifestyle karena keadaan awal “off” mudah tercatat sebagai jawaban Tidak.

Placeholder angka hanya petunjuk: **Contoh: 32**, **Contoh: 170**, **Contoh: 68**. Jangan memasukkan angka contoh sebagai nilai awal. Satuan tahun/cm/kg ditampilkan sebagai label di dekat input, bukan bagian dari nilai yang dikirim.

## Validasi dan pesan kesalahan

| Field | Aturan | Pesan UI yang disarankan |
|---|---|---|
| Usia | Wajib, integer 17–100 | **Masukkan usia dalam bilangan bulat antara 17 dan 100 tahun.** |
| Jenis kelamin | Wajib memilih `Male` atau `Female` | **Pilih jenis kelamin.** |
| Tinggi badan | Wajib, angka 100–250 cm | **Masukkan tinggi badan antara 100 dan 250 cm.** |
| Berat badan | Wajib, angka 20–400 kg | **Masukkan berat badan antara 20 dan 400 kg.** |
| Merokok | Wajib memilih Ya atau Tidak | **Pilih Ya atau Tidak untuk pertanyaan merokok.** |
| Alkohol | Wajib memilih Ya atau Tidak | **Pilih Ya atau Tidak untuk pertanyaan konsumsi alkohol.** |
| Motor | Wajib memilih Ya atau Tidak | **Pilih Ya atau Tidak untuk pertanyaan penggunaan sepeda motor.** |

Pesan pada tabel adalah teks UI yang dapat dipetakan berdasarkan `field` dari `validateProfile`; bukan perubahan terhadap pesan error bawaan SDK. Setelah validasi tampilan, tetap panggil `validateProfile(profile)` dari paket `0.1.0-dev.2` sebelum mount scanner. Daftar kosong `[]` berarti valid.

Untuk usia gunakan langkah input `1`; tinggi/berat boleh memakai langkah `0.1` seperti contoh Vue. SDK menerima angka pecahan dalam rentang, tanpa mensyaratkan kelipatan `0.1`. Periksa teks kosong sebelum konversi angka supaya `Number('')` tidak menjadi jawaban `0`. Bila UI menerima koma desimal, normalisasi sebelum membentuk number, misalnya `68,5` menjadi `68.5`; jangan memakai `parseFloat` langsung pada teks berkoma.

Jawaban `false` valid. Bedakan “Tidak” yang dipilih dari keadaan belum dijawab (`null`, `undefined`, atau string kosong). Jangan menggunakan `if (!value)` untuk memeriksa apakah pengguna sudah menjawab pertanyaan Ya/Tidak.

## Contoh binding pilihan di Vue

Contoh ini menunjukkan nilai pilihan; gabungkan dengan empat field data dasar dan validator SDK. `null` hanya keadaan awal form dan tidak boleh dikirim sebagai jawaban final.

```vue
<script setup lang="ts">
import {reactive} from 'vue';
const form = reactive({
  sex: null as 'Male' | 'Female' | null,
  lifestyle: {
    smoking: null as boolean | null,
    alcohol: null as boolean | null,
    motorcycle: null as boolean | null,
  },
});
</script>

<template>
  <label>Jenis kelamin
    <select v-model="form.sex" required>
      <option :value="null" disabled>Pilih jenis kelamin</option>
      <option value="Male">Laki-laki</option>
      <option value="Female">Perempuan</option>
    </select>
  </label>
  <fieldset>
    <legend>Apakah Anda merokok?</legend>
    <label><input v-model="form.lifestyle.smoking" type="radio"
      name="smoking" :value="true" required>Ya</label>
    <label><input v-model="form.lifestyle.smoking" type="radio"
      name="smoking" :value="false" required>Tidak</label>
  </fieldset>
</template>
```

Gunakan pola radio yang sama untuk alkohol dan motor, masing-masing dengan `v-model` dan `name` sendiri. Atribut **`:value`** memastikan boolean tetap boolean. Form lengkap yang sudah berfungsi tersedia di `examples/vue-vite/`; contoh itu memakai dropdown Ya/Tidak dengan pemetaan nilai yang sama.

## Persetujuan kamera dan elemen di luar profil

Contoh Vue menyertakan checkbox terpisah: **Saya setuju kamera dan profil diproses secara lokal untuk pemindaian ini.** Host dapat mempertahankan pola persetujuan tersebut sebagai bagian alur UI. Checkbox ini tidak termasuk tujuh field SDK, tidak dikirim di dalam `profile`, dan tidak menggantikan dialog izin kamera browser. SDK tidak menyediakan field `consent` pada kontrak profil.

`requestId`, bahasa, pilihan kamera, dan pengaturan heatmap adalah opsi teknis integrasi. Jangan menambahkannya sebagai pertanyaan profil yang wajib dijawab pengguna. Output yang ditampilkan tetap lima parameter yang ditetapkan.

Contoh JSON tujuh field yang diterima SDK: [USER-PROFILE.md](USER-PROFILE.md). Lifecycle dan pemasangan komponen: [INTEGRATION.md](INTEGRATION.md). Daftar event/error: [API.md](API.md).
