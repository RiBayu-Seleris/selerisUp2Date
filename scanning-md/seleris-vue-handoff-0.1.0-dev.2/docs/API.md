# API dan event

Import `SelerisScanner`, `createScanner`, `validateProfile`, `SelerisError`, serta tipe `SelerisProfile`, `ScanResult` dari `@seleris/rppg-vue`.

Berlaku untuk **`0.1.0-dev.2`**. `SelerisProfile` terdiri atas `age`, `sex`, `heightCm`, `weightKg`, serta `lifestyle: {smoking: boolean, alcohol: boolean, motorcycle: boolean}`. Female tidak memerlukan field tambahan. Batas nilai dan contoh objek valid ada pada [USER-PROFILE.md](USER-PROFILE.md).

`validateProfile(value)` mengembalikan `ProfileIssue[]` (`field`, `message`); `[]` berarti valid. Tujuh field wajib divalidasi tanpa mengisi jawaban default. Properti tambahan diabaikan dan tidak diteruskan ke iframe/perhitungan. Helper internal `toCareInput` menghasilkan input berskema `seleris.web.vitals.input.v1`, bukan kontrak Care lengkap; host cukup menyerahkan `profile` ke scanner.

## Opsi

| Opsi | Nilai |
|---|---|
| `assetBaseUrl` | Wajib; URL direktori runtime, same-origin |
| `profile` | Wajib; profil minimal tujuh field, disalin saat konstruktor |
| `requestId` | Opsional; UUID dibuat SDK jika kosong; retry mempertahankannya |
| `language` | `id` (default), `en`, `ms` |
| `cameraFacing` | `front` (default), `rear`; pilihan berupa preferensi browser |
| `heatmapEnabled` | Default `true` |
| `captureStillFrame` | Default `false` |
| `initializationTimeoutMs` | Client programatis saja; default 120.000 ms |

## Method

| Method | Fungsi |
|---|---|
| `initialize()` | Mount iframe dan muat aset; client programatis; komponen Vue otomatis |
| `start()` | Mulai scan; tunggu initialize selesai |
| `retry()` | Coba lagi dari terminal state yang didukung Mobile |
| `cancel()` | Hentikan kamera dan pending scan |
| `setCameraFacing('front' \| 'rear')` | Hanya ketika scan tidak berjalan; reset state |
| `setHeatmapEnabled(boolean)` | Tampilkan/sembunyikan heatmap |
| `setStillFrameEnabled(boolean)` | Client programatis; sebelum scan |
| `exportHeatmap({composite?:boolean})` | `Promise<Blob>` PNG lokal |
| `dispose()` | Tutup kamera, worker, iframe dan buffer SDK; idempoten |
| `on(event, callback)` | Client programatis; mengembalikan fungsi unsubscribe |

## Event publik

| Event | Payload utama |
|---|---|
| `ready` | `sdkVersion`, `referenceMobileVersion`, `parityCertified`, `camera`, `wasm`, `heatmap`, `stillFrame`, `networkInference:false` |
| `state` | `stage`, `phase`, `faceStatus`, `guidanceCode`, `guidance`, `lighting`, `accessory`, `cameraFacing`, `previewMirrored`, `stillFrameStatus` |
| `progress` | `value` 0..1, `remainingSeconds`, `acceptedSamples` |
| `quality` | `score` 0..1/null, `final`, `reliable`, `preflight`, `acceptedRateHz`, `analyzerRateHz` |
| `liveVitals` | `heartRate:number|null`, `provisional:boolean`; belum hasil final |
| `heatmapStatus` | `enabled`, `visible`, `suspendedForPreflight`, `warmupProgress`, `confidence`, `sequence` |
| `result` | `ScanResult`; hanya hasil final lolos kualitas |
| `error` | `code`, `message`, opsional `stage`, `terminal`, `retryable`, `details` |
| `stillFrameReady` | `blob:Blob` JPEG, `width`, `height` |
| `stillFrameFailed` | `code`, opsional `attemptCount` |

Vue memakai `@live-vitals`, `@heatmap-status`, `@still-frame-ready`; client programatis memakai nama camelCase pada tabel. Bridge mengikat origin, window iframe, instance ID, session ID, urutan event, dan command ID melalui MessageChannel. Pesan session lama diabaikan. Tidak ada data BVP, morphology, SpO2 atau full Care pada event publik.

## Lima metric final

| Key | Sumber Mobile | Unit |
|---|---|---|
| `heartRate` | `heart_rate` | BPM/bpm |
| `breathingRate` | `laju_napas` | napas/menit |
| `hrv` | `hrv_sdnn` | ms; `method:'sdnn'` |
| `systolic` | `tekanan_sistolik` | mmHg |
| `diastolic` | `tekanan_diastolik` | mmHg |

Setiap metric berisi `value`, `unit`, `source`, `availability`, opsional `confidence`/`unavailableReason`. Pertahankan nilai dan metadata tersebut. Nilai fallback Mobile tetap dapat tersedia, dengan `source:'formula_estimate'`.

```ts
type ScanResult = {
  schemaVersion: 'seleris.web.vitals.v1';
  sdkVersion: string;
  referenceMobileVersion: '1.9.2';
  parityCertified: boolean;
  requestId: string;
  status: 'success';
  metrics: { heartRate: VitalMetric; breathingRate: VitalMetric;
    hrv: VitalMetric; systolic: VitalMetric; diastolic: VitalMetric };
  quality: { score: number; reliable: true;
    acceptedSampleCount: number; flags: unknown[] };
};
```

## Error yang perlu ditangani host

| Kode/kelompok | Respons UI |
|---|---|
| `PROFILE_INVALID` | Tampilkan kesalahan tujuh field pada `details`; jawaban boolean `false` valid, sedangkan jawaban kosong bukan `false` |
| `SECURE_CONTEXT_REQUIRED` | Gunakan HTTPS/localhost |
| `ASSET_ORIGIN_MISMATCH`, `EMBED_LOAD_*` | Periksa deployment dan assetBaseUrl |
| `CAMERA_PERMISSION_DENIED` | Tunjukkan cara memberikan izin; sediakan coba lagi |
| `CAMERA_CONFIG_FAILED`, `CAMERA_STREAM_ENDED` | Pilih kamera tersedia, tutup pemakai kamera lain |
| `PREFLIGHT_*` | Ikuti guidance wajah/cahaya/FPS; mulai ulang |
| `PRESENTATION_ATTACK_SUSPECTED_NO_PHYSIOLOGICAL_SIGNAL` | Scan tidak memiliki bukti sinyal yang cukup; jangan tampilkan hasil |
| `FINAL_SQI_UNREACHABLE`, `MEASUREMENT_NOT_RELIABLE` | Kualitas tidak memenuhi ambang; retry |
| `MEASUREMENT_MOTION_REJECTED`, `MEASUREMENT_DURATION_EXCEEDED` | Kurangi gerakan, perbaiki kondisi/perangkat, retry |
| `APP_BACKGROUND_INTERRUPTED` | Kembali ke tab dan mulai ulang |
| `MODEL_*`, `ACCESSORY_*`, `FRAME_PROCESSING_FAILED` | Jangan menganggap gate lolos; tampilkan error |
| `STILL_FRAME_*` | Foto gagal; hasil fisiologi tetap diproses |
| `HEATMAP_NOT_READY` | Tunggu heatmap terlihat |
| `SCAN_ALREADY_*`, `CONFIGURATION_DURING_SCAN` | Hindari command bersamaan/perubahan konfigurasi saat scan |
| `DISPOSED`, `NOT_INITIALIZED` | Mount/initialize instance baru |

Spoof screening adalah pemeriksaan bukti fisiologis seperti Mobile, bukan klaim sertifikasi anti-spoof. Teks arahan berasal dari SDK; host tidak perlu menebak gate dari skor saja.
