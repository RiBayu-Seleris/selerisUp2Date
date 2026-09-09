# Profil pengguna: 7 field untuk frontend Vue

Berlaku untuk **`@seleris/rppg-vue@0.1.0-dev.2`**, revisi **9 September 2026**. SDK menerima profil minimal ini untuk **Heart Rate, Breath Rate, HRV SDNN, sistolik, dan diastolik**, dengan formula referensi Mobile 1.9.2.

**Siapkan 7 field wajib untuk semua pengguna: 4 data dasar dan 3 lifestyle.** Bentuk data sama untuk Male dan Female. Tidak perlu nama, foto profil, email, NIK, atau jawaban lifestyle lainnya.

## Field yang wajib ditampilkan

| Label form | Path data | Kontrol dan validasi | Kegunaan pada implementasi referensi |
|---|---|---|---|
| Usia (tahun) | `age` | Number, integer 17–100 | Formula tekanan darah; estimasi cadangan HRV dan napas |
| Jenis kelamin | `sex` | Pilihan `Male` / `Female` | Kategori HR dalam formula tekanan darah; estimasi cadangan HRV dan napas |
| Tinggi badan (cm) | `heightCm` | Number 100–250; pecahan boleh | Menghitung BMI |
| Berat badan (kg) | `weightKg` | Number 20–400; pecahan boleh | Menghitung BMI |
| Apakah Anda merokok? | `lifestyle.smoking` | Pilihan Ya / Tidak → boolean `true` / `false` | Formula tekanan darah |
| Apakah Anda mengonsumsi alkohol? | `lifestyle.alcohol` | Pilihan Ya / Tidak → boolean `true` / `false` | Formula tekanan darah |
| Apakah Anda menggunakan sepeda motor? | `lifestyle.motorcycle` | Pilihan Ya / Tidak → boolean `true` / `false` | Formula tekanan darah |

SDK memetakan merokok/alkohol Ya→3 dan motor Ya→2; Tidak→0, mengikuti API Flutter publik. Frontend mengirim boolean, bukan kode kuesioner demo native. Field motor dipertahankan karena digunakan dalam formula tekanan darah Mobile 1.9.2.

HR berasal dari sinyal kamera. HRV SDNN dan laju napas mengutamakan hasil sinyal yang tersedia; jalur estimasi cadangan Mobile memakai usia, jenis kelamin, dan BMI. Ketiga hasil tersebut tidak memakai lifestyle. Tekanan darah memakai profil, tiga lifestyle di atas, dan HR hasil scan; frontend tidak meminta HR sebagai input atau menghitung ulang hasil.

## Field yang dihapus dari form

| Field lama | Pertanyaan yang tidak perlu ditampilkan |
|---|---|
| `lifestyle.occupation` | Pekerjaan |
| `lifestyle.maritalStatus` | Status perkawinan |
| `lifestyle.dangerousHobbies` | Hobi/olahraga berbahaya |
| `lifestyle.sleepDurationHours` | Durasi tidur |
| `lifestyle.screenExposure` | Paparan layar |
| `lifestyle.physicalActivityCode` | Aktivitas fisik |
| `lifestyle.pregnancyCode` | Status kehamilan, termasuk untuk pengguna Female |

Hilangkan field tersebut dari form dan objek yang dikirim. SDK tidak memvalidasi, membaca, atau meneruskan field tambahan ke jalur perhitungan lima hasil. Jika objek profil lama masih membawa field tersebut, SDK mengabaikannya. Tidak ada jawaban pengganti/default untuk pertanyaan yang dihapus.

Penyederhanaan ini terbatas pada lima output. Jalur profil minimal berhenti setelah menghitung kelima nilai; tidak menghitung seluruh metric, risk, dan score Care dari jawaban lifestyle yang tidak dikumpulkan.

## Contoh profil valid

Objek berikut **diterima oleh SDK `0.1.0-dev.2`**. Nilainya hanya contoh dokumentasi, bukan default pengguna nyata.

```json
{
  "age": 32,
  "sex": "Male",
  "heightCm": 170,
  "weightKg": 68,
  "lifestyle": {
    "smoking": false,
    "alcohol": false,
    "motorcycle": true
  }
}
```

Untuk Female cukup gunakan `sex: "Female"`; tidak ada field tambahan. Gunakan tipe `SelerisProfile` dan `SelerisLifestyle` dari paket. `requestId` adalah ID teknis scan yang dapat dibuat library, bukan pertanyaan form. Bahasa dipilih melalui opsi `language: id | en | ms`.

## Validasi dan alur frontend

1. Tampilkan tepat tujuh field, semuanya belum terisi saat form baru dibuka. Pilihan Ya/Tidak harus eksplisit; jangan memakai checkbox dengan nilai awal `false` sebagai jawaban otomatis.
2. Konversi input numerik HTML menjadi number setelah memastikan teks tidak kosong. Tolak `NaN`, infinity, dan nilai di luar rentang. String `"32"` belum merupakan number.
3. Untuk tiga lifestyle, `true` dan `false` sama-sama jawaban valid. `null`, `undefined`, string kosong, `"true"`, dan `"false"` bukan boolean valid. Jangan memeriksa kelengkapan dengan `if (!value)` karena jawaban `false` akan ikut ditolak.
4. Jalankan `validateProfile(profile)` dari SDK. Hasil `[]` berarti valid; jika tidak, tampilkan `field` dan `message` pada form. SDK juga memvalidasi sebelum inisialisasi scanner sehingga pemanggil tidak dapat melewati validasi hanya dengan mengabaikan form.
5. Mount `SelerisScanner` dengan profil valid dan aset versi yang sama. Tunggu `ready`, lalu mulai kamera dari tindakan pengguna. Untuk mengganti profil, unmount scanner lama dan mount ulang.
6. Tampilkan lima hasil dari event `result`, berikut `source` dan `availability`. Tekanan darah tetap `formula_estimate`; estimasi cadangan HRV/napas juga mempertahankan penandanya. HRV adalah SDNN dalam ms; tekanan darah dalam mmHg.

## Migrasi dari paket lama

`0.1.0-dev.1` masih memerlukan profil Care lengkap. **Pasang `0.1.0-dev.2` dan salin runtime versi tersebut** sebelum memakai form ini; mengubah dokumentasi atau form saja tidak memperbarui validator yang sudah terpasang. Panduan profil bertanggal 8 September yang menyebut dukungan SDK masih tertunda kini digantikan dokumen ini. Ikuti langkah upgrade di [INTEGRATION.md](INTEGRATION.md).

Pengujian mencakup kedua jenis kelamin, seluruh kombinasi tiga boolean, batas nilai, jawaban kosong/tidak valid, perbandingan hasil dengan Mobile Kotlin, dan penerimaan profil melalui Vue/iframe. Rincian dan batas pengujian perangkat: [VALIDATION.md](VALIDATION.md).
