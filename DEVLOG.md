# rPPG Project — Dev Log

_Last updated: 2026-05-12_

---

## Stack

- **Frontend:** Vue 3 + Vite — `/Users/user/Documents/development/seleris_project/salvion_leanding_page/salvion-landing-page`
- **Backend:** FastAPI + Python — `/Users/user/Downloads/open-rppg/server.py`
- **Model:** `rppg.Model('ME-flow.rlap')` — JAX-based, load ~20–30 detik
- **Face detection:** MediaPipe FaceMesh (Python, server-side)

---

## Apa yang Sudah Dibuat

### Backend (`server.py`)

- [x] FastAPI server dengan CORS terbuka (`*`)
- [x] Model rPPG load di background thread saat server start
- [x] Kamera aktif via `POST /api/start`, stop via `POST /api/stop`
- [x] MJPEG stream video `GET /api/video` dengan face mesh overlay (MediaPipe)
- [x] SSE metrik `GET /api/stream` — update tiap 1 detik
- [x] Face position validation:
  - `no_face` → `not_centered` → `too_close` / `too_far` → `tilt` (yaw/pitch/roll ±15°) → `ok`
- [x] Metrik yang dikirim via SSE:
  - `ready`, `face_detected`, `face_ok`, `face_status`
  - `hr`, `smoothed_hr` (EMA α=0.3), `sqi`
  - `sbp`, `dbp` — estimasi tekanan darah via PWA, tersedia setelah ≥15 detik
  - `hrv`: `ibi`, `sdnn`, `rmssd`, `pnn50`, `breathing_rate` (dengan EMA smoothing), `lf_hf_ratio`
- [x] Blood pressure estimation — diambil dari `open-rppg 2/rppg_processor.py`

### Frontend (`src/components/FaceScan/index.vue`)

- [x] 3-phase UI:
  1. **Syncing** — checklist 3 langkah: server connect → face ok → signal stable (3 detik)
  2. **Scanning** — progress bar 0–100% selama 30 detik
  3. **Results** — grid metrik: HR, BP, IBI, SDNN, RMSSD, pNN50, Breathing Rate, LF/HF
- [x] Scan **pause otomatis** saat `face_ok = false` — timer ditahan, lanjut saat wajah kembali ke posisi
- [x] Pause overlay muncul dengan pesan spesifik sesuai `face_status`
- [x] Hint text di video feed berubah realtime sesuai kondisi posisi wajah
- [x] Live mini-metrics saat scanning: HR, SQI, Breathing, BP (BP muncul setelah 15 detik)

### Dokumentasi

- [x] `API_DOCS.md` — dokumentasi API lengkap untuk teman yang mau consume
  - Schema SSE, face_status reference, timing data
  - Composable `useRppg.js` siap pakai
  - Catatan ngrok (skip warning header, jangan proxy `/api/video`)

---

## Arsitektur Saat Ini

```
Laptop (server.py)
  ├── Kamera laptop → model.video_capture(0)
  ├── MediaPipe → face mesh overlay + position check
  ├── rPPG model → HR, HRV, BVP
  ├── scipy → blood pressure (PWA)
  ├── GET /api/video → MJPEG stream
  └── GET /api/stream → SSE metrik

Browser (Vue)
  ├── <img :src="http://localhost:8000/api/video" />  ← HARUS langsung, jangan proxy
  └── new EventSource('/api/stream')                  ← bisa lewat Vite proxy
```

---

## Yang Sedang Didiskusikan (Belum Dieksekusi)

### Topik: Deploy ke Server / Multi-user

**Masalah:** `model.video_capture(0)` baca kamera device server. VPS tidak punya kamera fisik.

**Dua opsi:**

#### Opsi A — Tetap pakai arsitektur sekarang (ngrok)
- Laptop tetap jalan server.py, expose via ngrok
- Cocok untuk demo / sharing ke teman
- Tidak butuh perubahan apapun

#### Opsi B — Kamera dari browser, server proses rPPG
- Browser capture kamera sendiri → kirim frame ke server → server proses → balik metrik
- Cocok untuk production di VPS
- Perlu refactor cukup besar

**4 Parameter yang Harus Diputuskan sebelum eksekusi Opsi B:**

1. **Format pengiriman frame** — WebSocket (realtime) atau HTTP POST per frame (simple)?
2. **Siapa proses face detection & overlay** — server atau browser (MediaPipe JS)?
3. **Multi-user** — satu user saja atau banyak user sekaligus (perlu session management)?
4. **Stabilitas `model.update_frame()`** — perlu dicek apakah SQI stabil kalau frame dikirim konsisten 30fps dari browser (sebelumnya SQI tidak stabil pakai cara ini)

**Status:** Menunggu keputusan dari user sebelum lanjut.

---

## File Penting

| File | Keterangan |
|---|---|
| `/Users/user/Downloads/open-rppg/server.py` | Backend FastAPI |
| `/Users/user/Downloads/open-rppg/API_DOCS.md` | Dokumentasi API untuk teman |
| `src/components/FaceScan/index.vue` | Komponen Vue utama |
| `src/views/FaceScanView.vue` | Wrapper halaman |
| `src/router/index.js` | Route `/#/facescan` |
| `open-rppg 2/rppg_processor.py` | Referensi implementasi BP & smoothed_br |

---

## Cara Jalankan

```bash
# Terminal 1 — Python server
cd /Users/user/Downloads/open-rppg
python server.py

# Terminal 2 — Vue dev server
cd /Users/user/Documents/development/seleris_project/salvion_leanding_page/salvion-landing-page
npm run dev

# Buka browser
http://localhost:5173/#/facescan

# Expose ke teman via ngrok
ngrok http 8000
```
