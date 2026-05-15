# rPPG WebSocket API — Dokumentasi Frontend

Server: FastAPI + WebSocket (`/ws`)  
Tujuan: Streaming frame kamera → mendapatkan Heart Rate (HR) + Signal Quality (SQI) real-time

---

## Koneksi

| | |
|---|---|
| **Protokol** | `ws://` (local/dev) atau `wss://` (production) |
| **Endpoint** | `ws://<host>:8000/ws` |
| **Format kirim** | Text — Base64 JPEG (plain atau dengan data-URI prefix) |
| **Format terima** | JSON |

---

## Protokol

### Mengirim Frame

Kirim frame sebagai **string Base64 JPEG** setiap kali WebSocket terbuka.  
Server menerima dua format:

```
# Format 1 — plain base64
/9j/4AAQSkZJRgABAQ...

# Format 2 — data URI (juga diterima)
data:image/jpeg;base64,/9j/4AAQSkZJRgABAQ...
```

> **Rekomendasi:** kirim **15 fps** (setiap ~67ms), resolusi **640×480** atau **480×480**, kualitas JPEG **60–80%** untuk keseimbangan akurasi vs bandwidth.

---

### Response JSON (server → client)

Server mengirim JSON setiap frame diterima:

```json
{
  "hr": 72.4,
  "sqi": 0.65,
  "latency": 0.031,
  "hrv": {
    "RMSSD": 45.2,
    "SDNN": 38.7,
    "pNN50": 12.1
  },
  "bvp": [0.12, 0.08, -0.03, ...],
  "box": [120, 80, 200, 220],
  "elapsed": 8.3
}
```

| Field | Tipe | Keterangan |
|---|---|---|
| `hr` | `number \| null` | Heart rate BPM (smoothed EMA α=0.3). `null` selama warmup atau SQI < 0.3 |
| `sqi` | `number \| null` | Signal Quality Index **0.0–1.0**. `null` sebelum model punya data. Nilai ≥ 0.3 = sinyal cukup baik |
| `latency` | `number \| null` | Waktu inferensi model (detik) |
| `hrv` | `object` | HRV metrics: `RMSSD`, `SDNN`, `pNN50`. Object kosong `{}` jika belum tersedia |
| `bvp` | `number[]` | Array sinyal BVP (Blood Volume Pulse) 15 detik terakhir |
| `box` | `number[] \| null` | Bounding box wajah `[x, y, w, h]` dalam piksel |
| `elapsed` | `number` | Detik sejak koneksi dimulai |

**Catatan penting:**
- `hr` baru muncul setelah **±5 detik warmup** + SQI ≥ 0.3
- `sqi` bisa muncul lebih awal dari `hr`
- Semua `NaN`/`Infinity` dari model sudah diganti `null` oleh server

---

## Implementasi Vue.js

### Composable `useRppg.js`

```js
// composables/useRppg.js
import { ref, onUnmounted } from 'vue'

export function useRppg(serverUrl) {
  const hr = ref(null)
  const sqi = ref(0)
  const hrv = ref({})
  const bvp = ref([])
  const elapsed = ref(0)
  const isConnected = ref(false)
  const isWarming = ref(true) // true selama hr masih null

  let ws = null
  let videoEl = null
  let canvasEl = null
  let frameInterval = null

  function connect(videoElement) {
    videoEl = videoElement
    canvasEl = document.createElement('canvas')

    ws = new WebSocket(serverUrl)

    ws.onopen = () => {
      isConnected.value = true
      startSendingFrames()
    }

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data)

      elapsed.value = data.elapsed ?? 0
      sqi.value = data.sqi ?? 0
      hrv.value = data.hrv ?? {}
      bvp.value = data.bvp ?? []

      if (data.hr !== null && data.hr > 0) {
        hr.value = Math.round(data.hr)
        isWarming.value = false
      }
    }

    ws.onerror = (err) => {
      console.error('[rPPG] WebSocket error', err)
    }

    ws.onclose = () => {
      isConnected.value = false
      stopSendingFrames()
    }
  }

  function startSendingFrames() {
    frameInterval = setInterval(() => {
      if (!videoEl || ws?.readyState !== WebSocket.OPEN) return

      const w = videoEl.videoWidth || 480
      const h = videoEl.videoHeight || 480
      canvasEl.width = w
      canvasEl.height = h

      const ctx = canvasEl.getContext('2d')
      ctx.drawImage(videoEl, 0, 0, w, h)

      // Kirim sebagai plain base64 (tanpa prefix data URI)
      const dataUri = canvasEl.toDataURL('image/jpeg', 0.7)
      const base64 = dataUri.split(',')[1]
      ws.send(base64)
    }, 67) // ~15 fps
  }

  function stopSendingFrames() {
    clearInterval(frameInterval)
    frameInterval = null
  }

  function disconnect() {
    stopSendingFrames()
    ws?.close(1000, 'User stopped')
    ws = null
    hr.value = null
    sqi.value = 0
    isWarming.value = true
    isConnected.value = false
  }

  onUnmounted(() => disconnect())

  return {
    hr,
    sqi,
    hrv,
    bvp,
    elapsed,
    isConnected,
    isWarming,
    connect,
    disconnect,
  }
}
```

---

### Komponen `RppgCamera.vue`

```vue
<template>
  <div class="rppg-camera">
    <!-- Preview kamera -->
    <video
      ref="videoRef"
      autoplay
      playsinline
      muted
      class="camera-preview"
    />

    <!-- Overlay UI -->
    <div class="overlay">
      <!-- Indikator sinyal (5 hati) -->
      <div class="sqi-indicator">
        <span
          v-for="i in 5"
          :key="i"
          class="heart"
          :class="{ filled: sqi >= i / 5 }"
        >♥</span>
        <span class="sqi-label">SINYAL</span>
      </div>

      <!-- Heart rate display -->
      <div class="hr-display">
        <template v-if="isWarming">
          <span class="measuring">Mengukur...</span>
        </template>
        <template v-else>
          <span class="hr-value">{{ hr }}</span>
          <span class="hr-unit">BPM</span>
        </template>
      </div>

      <!-- Tombol kontrol -->
      <button v-if="!isConnected" @click="start" class="btn-start">
        Mulai Pengukuran
      </button>
      <button v-else @click="stop" class="btn-stop">
        Berhenti
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onUnmounted } from 'vue'
import { useRppg } from '@/composables/useRppg'

const props = defineProps({
  serverUrl: {
    type: String,
    default: 'ws://localhost:8000/ws',
  },
})

const videoRef = ref(null)
let stream = null

const { hr, sqi, hrv, isConnected, isWarming, connect, disconnect } =
  useRppg(props.serverUrl)

async function start() {
  try {
    stream = await navigator.mediaDevices.getUserMedia({
      video: { width: 640, height: 480, facingMode: 'user' },
      audio: false,
    })
    videoRef.value.srcObject = stream

    // Tunggu video siap sebelum mulai kirim frame
    videoRef.value.onloadedmetadata = () => {
      connect(videoRef.value)
    }
  } catch (err) {
    console.error('Gagal akses kamera:', err)
  }
}

function stop() {
  disconnect()
  stream?.getTracks().forEach((t) => t.stop())
  stream = null
}

onUnmounted(() => stop())
</script>

<style scoped>
.rppg-camera {
  position: relative;
  width: 100%;
  max-width: 480px;
  aspect-ratio: 3/4;
  background: #000;
  border-radius: 16px;
  overflow: hidden;
}

.camera-preview {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: scaleX(-1); /* mirror selfie */
}

.overlay {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  padding: 24px;
  gap: 16px;
}

.sqi-indicator {
  position: absolute;
  top: 16px;
  right: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  background: rgba(0, 0, 0, 0.4);
  border-radius: 12px;
  padding: 8px 10px;
}

.heart {
  font-size: 16px;
  color: rgba(255, 255, 255, 0.25);
  transition: color 0.3s;
}
.heart.filled {
  color: #ff5c72;
}

.sqi-label {
  font-size: 9px;
  letter-spacing: 1.2px;
  color: rgba(255, 255, 255, 0.4);
  font-weight: 500;
}

.hr-display {
  background: rgba(0, 0, 0, 0.55);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 50px;
  padding: 14px 24px;
  display: flex;
  align-items: flex-end;
  gap: 6px;
  box-shadow: 0 0 24px rgba(255, 92, 114, 0.3);
}

.hr-value {
  font-size: 40px;
  font-weight: 700;
  color: #fff;
  line-height: 1;
  letter-spacing: -1px;
}

.hr-unit {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.55);
  font-weight: 500;
  letter-spacing: 1.5px;
  padding-bottom: 4px;
}

.measuring {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.4);
}

.btn-start,
.btn-stop {
  width: 100%;
  padding: 14px;
  border-radius: 50px;
  border: none;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.2s;
}

.btn-start {
  background: #ff5c72;
  color: #fff;
}

.btn-stop {
  background: rgba(255, 255, 255, 0.15);
  color: #fff;
}
</style>
```

---

### Cara Pakai di Halaman

```vue
<template>
  <RppgCamera server-url="ws://192.168.1.x:8000/ws" />
</template>

<script setup>
import RppgCamera from '@/components/RppgCamera.vue'
</script>
```

Atau akses data HRV dari luar:

```vue
<template>
  <div>
    <RppgCamera ref="cam" server-url="ws://192.168.1.x:8000/ws" />
    <pre>{{ cam?.hrv }}</pre>
  </div>
</template>
```

---

## State Machine Pengukuran

```
IDLE
  └─► [user klik mulai] ──► CONNECTING
                                └─► [ws.onopen] ──► WARMING (hr = null, ~5 detik)
                                                        └─► [hr !== null] ──► MEASURING
                                                                                  └─► [user stop / ws.onclose] ──► IDLE
```

| State | `isConnected` | `isWarming` | `hr` |
|---|---|---|---|
| IDLE | false | true | null |
| CONNECTING | false | true | null |
| WARMING | true | true | null |
| MEASURING | true | false | number |

---

## Tips Produksi

**CORS / Mixed Content:**  
Jika Vue app di `https://`, WebSocket harus `wss://` (bukan `ws://`).  
Setup Nginx di server:
```nginx
location /ws {
    proxy_pass http://127.0.0.1:8000/ws;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
    proxy_read_timeout 3600s;
}
```

**Reconnect otomatis:**
```js
ws.onclose = () => {
  isConnected.value = false
  setTimeout(() => connect(videoEl), 2000) // retry setelah 2 detik
}
```

**Throttle frame saat tab tidak aktif:**
```js
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    stopSendingFrames()
  } else if (isConnected.value) {
    startSendingFrames()
  }
})
```
