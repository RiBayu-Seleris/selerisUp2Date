<script setup>
import { ref, onMounted, onUnmounted, computed } from "vue";
import axios from "axios";

// ─── Config ───────────────────────────────────────────────────────────────────
// Ganti BASE_URL dengan URL ngrok atau server kamu
const BASE_URL = "https://6676-2a09-bac1-6560-8-00-3c4-6.ngrok-free.app";

const props = defineProps({
  autoStart: {
    type: Boolean,
    default: true,
  },
});

const emit = defineEmits([
  "scan-complete",
  "upload-start",
  "upload-done",
  "upload-retry",
]);

// ─── State UI (dipertahankan dari desain asli) ────────────────────────────────
const videoUrl = ref(`${BASE_URL}/api/video`);
const personDetected = ref(false);
const scanProgress = ref(0);
const isGazePaused = ref(false);
const scanComplete = ref(false);
const cameraActive = ref(false);

// ─── rPPG Metrics State ───────────────────────────────────────────────────────
const metrics = ref(null);
const faceStatus = ref("no_face");
const faceOk = ref(false);
const isReady = ref(false);
const modelReady = ref(false);

// ─── Derived state ────────────────────────────────────────────────────────────
const isDetecting = computed(() => personDetected.value && !isGazePaused.value);

const hr = computed(
  () => metrics.value?.smoothed_hr ?? metrics.value?.hr ?? null,
);
const sqi = computed(() => metrics.value?.sqi ?? null);
const hrv = computed(() => metrics.value?.hrv ?? null);
const sbp = computed(() => metrics.value?.sbp ?? null);
const dbp = computed(() => metrics.value?.dbp ?? null);

const faceHint = computed(() => {
  switch (faceStatus.value) {
    case "no_face":
      return "Tidak ada wajah — hadap ke kamera";
    case "not_centered":
      return "Geser wajah ke tengah frame";
    case "too_close":
      return "Terlalu dekat — mundur ke 25–35 cm";
    case "too_far":
      return "Terlalu jauh — maju ke kamera";
    case "tilt":
      return "Hadap lurus ke kamera, jangan miring";
    default:
      return "Tahan posisi...";
  }
});

// ─── Scan timer state ─────────────────────────────────────────────────────────
const SCAN_DURATION_MS = 30000;
let scanStartMs = null;
let accumulatedMs = 0;
let pauseStartMs = null;
let scanTimerRaf = null;
let faceOkStreak = 0;
const FACE_OK_STREAK_NEEDED = 3; // ~3 detik sebelum mulai timer (sesuai alur API)

// ─── SSE EventSource ──────────────────────────────────────────────────────────
let eventSource = null;
let healthPollInterval = null;
let isUnmounted = false;

// ─── API Calls ────────────────────────────────────────────────────────────────
async function checkHealth() {
  try {
    const res = await fetch(`${BASE_URL}/api/health`, {
      headers: { "ngrok-skip-browser-warning": "true" },
    });
    const data = await res.json();
    modelReady.value = data.model_ready === true;
    return data;
  } catch (err) {
    console.warn("[rPPG] health check error:", err.message);
    return null;
  }
}

async function startCamera() {
  try {
    await fetch(`${BASE_URL}/api/start`, {
      method: "POST",
      headers: { "ngrok-skip-browser-warning": "true" },
    });
    cameraActive.value = true;
    console.log("[rPPG] Camera started");
  } catch (err) {
    console.error("[rPPG] Failed to start camera:", err.message);
  }
}

async function stopCamera() {
  try {
    closeStream();
    await fetch(`${BASE_URL}/api/stop`, {
      method: "POST",
      headers: { "ngrok-skip-browser-warning": "true" },
    });
    cameraActive.value = false;
    console.log("[rPPG] Camera stopped");
  } catch (err) {
    console.error("[rPPG] Failed to stop camera:", err.message);
  }
}

// ─── SSE Stream ───────────────────────────────────────────────────────────────
function openStream() {
  if (eventSource) closeStream();

  eventSource = new EventSource(`${BASE_URL}/api/stream`);

  eventSource.onmessage = (e) => {
    console.log("[rPPG] raw SSE:", e.data); // ← tambah ini
    if (isUnmounted) return;
    try {
      const data = JSON.parse(e.data);
      handleStreamData(data);
    } catch (err) {
      console.warn("[rPPG] SSE parse error:", err.message);
    }
  };

  eventSource.onerror = () => {
    if (isUnmounted) return;
    console.warn("[rPPG] SSE connection error");
    faceOk.value = false;
    isReady.value = false;
    personDetected.value = false;
    pauseScan("Koneksi terputus");
  };
}

function closeStream() {
  if (eventSource) {
    eventSource.close();
    eventSource = null;
  }
}

// ─── Handle SSE data ──────────────────────────────────────────────────────────
function handleStreamData(data) {
  console.log("[rPPG] stream data:", data); // ← tambah ini
  faceStatus.value = data.face_status ?? "no_face";
  faceOk.value = data.face_ok === true;
  isReady.value = data.ready === true;
  personDetected.value = data.face_detected === true;

  if (data.ready) {
    metrics.value = data;
  }

  // Pause/resume logic berdasarkan face_ok
  if (!data.face_ok) {
    faceOkStreak = 0;
    if (!isGazePaused.value && scanStartMs !== null) {
      const reason =
        data.face_status === "no_face"
          ? "Wajah tidak terdeteksi"
          : data.face_status === "tilt"
            ? "Wajah berpaling"
            : data.face_status === "not_centered"
              ? "Wajah keluar frame"
              : "Posisi wajah salah";
      pauseScan(reason);
    }
  } else {
    faceOkStreak++;

    // Resume jika sebelumnya pause
    if (isGazePaused.value) {
      resumeScan();
    }

    // Mulai scan hanya setelah ready = true dan face_ok sudah stabil
    // (sesuai alur: tunggu ready & face_ok ≥ 3 detik)
    if (
      data.ready &&
      faceOkStreak >= FACE_OK_STREAK_NEEDED &&
      scanStartMs === null &&
      !scanComplete.value
    ) {
      beginScan();
    }
  }
}

// ─── Scan timer ───────────────────────────────────────────────────────────────
function beginScan() {
  scanStartMs = performance.now();
  accumulatedMs = 0;
  pauseStartMs = null;
  scanProgress.value = 1;
  console.log("[rPPG] Scan started");
  tickScanTimer();
}

function tickScanTimer() {
  if (isUnmounted || scanComplete.value) return;

  // Jika pause, hentikan loop — resumeScan() akan restart
  if (isGazePaused.value) return; // ✅

  const now = performance.now();
  const elapsed = Math.max(0, now - scanStartMs - accumulatedMs);
  const pct = Math.min(100, (elapsed / SCAN_DURATION_MS) * 100);
  scanProgress.value = pct;

  if (pct >= 100) {
    scanComplete.value = true;
    onScanComplete();
    return;
  }

  scanTimerRaf = requestAnimationFrame(tickScanTimer);
}

function resumeScan() {
  if (!isGazePaused.value) return;

  if (pauseStartMs !== null) {
    accumulatedMs += performance.now() - pauseStartMs;
  }

  isGazePaused.value = false;
  faceOkStreak = 0;
  pauseStartMs = null;
  console.log("[rPPG] Scan resumed");
  tickScanTimer(); // ✅ restart loop
}

function pauseScan(reason = "Wajah berpaling") {
  if (isGazePaused.value || scanStartMs === null) return;
  isGazePaused.value = true;
  pauseStartMs = performance.now();
  console.log("[rPPG] Scan paused:", reason);
}

// ─── Scan complete ────────────────────────────────────────────────────────────
async function onScanComplete() {
  console.log("[rPPG] Scan complete, metrics:", metrics.value);

  emit("upload-start");
  emit("scan-complete");

  // Kirim data metrik terakhir sebagai hasil
  emit("upload-done", metrics.value);

  // Stop kamera sesuai alur dokumentasi
  await stopCamera();
}

// ─── Reset ────────────────────────────────────────────────────────────────────
function resetScan() {
  cancelAnimationFrame(scanTimerRaf);
  scanComplete.value = false;
  scanProgress.value = 0;
  scanStartMs = null;
  accumulatedMs = 0;
  pauseStartMs = null;
  isGazePaused.value = false;
  personDetected.value = false;
  faceOkStreak = 0;
  metrics.value = null;
  faceStatus.value = "no_face";
  faceOk.value = false;
  isReady.value = false;
}

// ─── Init: poll health → start camera → open stream ──────────────────────────
async function init() {
  // 1. Poll health sampai model_ready = true
  console.log("[rPPG] Waiting for model to be ready...");
  await waitForModelReady();

  if (isUnmounted) return;

  // 2. Start kamera
  await startCamera();

  if (isUnmounted) return;

  // 3. Buka SSE stream
  openStream();
}

async function waitForModelReady() {
  return new Promise((resolve) => {
    const poll = async () => {
      if (isUnmounted) return resolve();
      const data = await checkHealth();
      if (data?.model_ready) {
        modelReady.value = true;
        return resolve();
      }
      // Coba lagi setiap 2 detik
      healthPollInterval = setTimeout(poll, 2000);
    };
    poll();
  });
}

// ─── Lifecycle ────────────────────────────────────────────────────────────────
onMounted(async () => {
  isUnmounted = false;
  if (!props.autoStart) return;
  await init();
});

onUnmounted(() => {
  cleanup();
});

function cleanup() {
  isUnmounted = true;
  cancelAnimationFrame(scanTimerRaf);
  clearTimeout(healthPollInterval);
  closeStream();
  stopCamera();
}

defineExpose({ resetScan, stopCamera, startCamera: init });
</script>

<template>
  <div
    class="w-full h-full flex flex-col justify-between rounded-t-2xl rounded-b-xl overflow-hidden"
  >
    <div
      class="relative w-full h-[70%] shrink-0 overflow-hidden bg-black rounded-t-2xl"
    >
      <!-- Video feed langsung dari server rPPG (sudah include face mesh overlay) -->
      <img
        v-if="cameraActive"
        :src="videoUrl"
        class="absolute inset-0 w-full h-full object-cover"
        alt="rPPG Video Feed"
      />

      <!-- Placeholder saat kamera belum aktif / model loading -->
      <div
        v-if="!cameraActive"
        class="absolute inset-0 flex items-center justify-center bg-black"
      >
        <div class="flex flex-col items-center gap-3">
          <div
            class="w-8 h-8 border-2 border-white/20 border-t-white/70 rounded-full animate-spin"
          />
          <p class="text-white/40 text-xs font-mono uppercase tracking-widest">
            {{ modelReady ? "Mengaktifkan kamera..." : "Memuat model AI..." }}
          </p>
        </div>
      </div>

      <!-- IDLE OVERLAY -->
      <Transition name="fade-overlay">
        <div
          v-if="cameraActive && !personDetected"
          class="absolute inset-0 bg-black/35 flex flex-col items-center justify-center pointer-events-none"
        >
          <div
            class="w-16 h-16 rounded-2xl border border-white/10 bg-white/[0.04] flex justify-center items-center mb-4"
          >
            <svg
              class="w-7 h-7 text-white/20"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                d="M15 10l4.553-2.069A1 1 0 0121 8.82v6.36a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
          </div>
          <p class="text-white/70 text-sm font-medium">
            Arahkan wajah ke kamera
          </p>
          <p class="text-white/35 text-xs mt-1">
            {{
              faceStatus === "no_face"
                ? "Sistem sedang mendeteksi wajah"
                : faceHint
            }}
          </p>
        </div>
      </Transition>

      <!-- PAUSED OVERLAY (face terdeteksi tapi posisi salah / berpaling) -->
      <Transition name="fade-overlay">
        <div
          v-if="personDetected && isGazePaused"
          class="absolute inset-0 bg-black/50 flex flex-col items-center justify-center gap-3 pointer-events-none"
        >
          <div
            class="w-12 h-12 rounded-full border border-yellow-400/40 flex items-center justify-center"
          >
            <svg class="w-5 h-5 fill-yellow-400/80" viewBox="0 0 16 16">
              <rect x="3" y="2" width="3.5" height="12" rx="1" />
              <rect x="9.5" y="2" width="3.5" height="12" rx="1" />
            </svg>
          </div>
          <p
            class="text-[11px] font-mono uppercase tracking-[0.15em] text-yellow-400/80"
          >
            Scan ditunda
          </p>
          <p
            class="text-[10px] font-mono uppercase tracking-[0.1em] text-white/30"
          >
            {{ faceHint }}
          </p>
        </div>
      </Transition>

      <!-- DARK OVERLAY -->
      <div
        class="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/70 pointer-events-none"
      />

      <!-- VIGNETTE -->
      <div
        class="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_20%,rgba(0,0,0,0.55)_100%)]"
      />

      <!-- OVAL — visual guide untuk posisi wajah -->
      <div class="absolute inset-0 pointer-events-none">
        <svg class="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <mask id="oval-mask">
              <rect width="100%" height="100%" fill="white" />
              <ellipse cx="50%" cy="50%" rx="130" ry="150" fill="black" />
            </mask>
          </defs>
          <rect
            width="100%"
            height="100%"
            fill="rgba(0,0,0,0.45)"
            mask="url(#oval-mask)"
          />
          <ellipse
            cx="50%"
            cy="50%"
            rx="130"
            ry="150"
            fill="none"
            :stroke="
              isDetecting
                ? '#4ade80'
                : isGazePaused
                  ? '#facc15'
                  : 'rgba(255,255,255,0.4)'
            "
            stroke-width="2.5"
            style="transition: all 0.35s ease"
          />
        </svg>
      </div>

      <!-- TOP HUD -->
      <div
        class="absolute top-4 left-4 flex flex-col gap-1 pointer-events-none"
      >
        <div class="flex items-center gap-1.5">
          <span
            class="w-1.5 h-1.5 rounded-full transition-colors duration-300"
            :class="
              isDetecting
                ? 'bg-[#4ade80] animate-pulse'
                : isGazePaused
                  ? 'bg-yellow-400'
                  : 'bg-red-400'
            "
          />
          <span
            class="text-[9px] font-mono uppercase tracking-widest transition-colors duration-300"
            :class="
              isDetecting
                ? 'text-[#4ade80]'
                : isGazePaused
                  ? 'text-yellow-400'
                  : 'text-red-400'
            "
          >
            {{
              isDetecting
                ? "Wajah Terdeteksi"
                : isGazePaused
                  ? "Scan Ditunda"
                  : "Mencari Wajah..."
            }}
          </span>
        </div>
      </div>

      <!-- TOP CENTER BADGE -->
      <div class="absolute top-4 left-1/2 -translate-x-1/2">
        <div
          class="px-3 py-1 rounded-full text-[11px] font-medium flex items-center gap-1.5 backdrop-blur-md border transition-all duration-300"
          :class="
            isDetecting
              ? 'bg-[#4ade80]/15 border-[#4ade80]/30 text-[#4ade80]'
              : isGazePaused
                ? 'bg-yellow-400/15 border-yellow-400/30 text-yellow-400'
                : 'bg-black/30 border-white/10 text-white/60'
          "
        >
          <div
            class="w-2 h-2 rounded-full"
            :class="
              isDetecting
                ? 'bg-[#4ade80] animate-pulse'
                : isGazePaused
                  ? 'bg-yellow-400'
                  : 'bg-white/30'
            "
          />
          {{
            isDetecting ? "Scanning..." : isGazePaused ? "Paused" : "Mencari..."
          }}
        </div>
      </div>

      <!-- BOTTOM PROGRESS -->
      <div
        v-if="personDetected || scanProgress > 0"
        class="absolute bottom-0 left-0 right-0 px-5 pb-5 pt-10 bg-gradient-to-t from-black/70 to-transparent pointer-events-none"
      >
        <div class="flex items-center justify-between mb-1.5">
          <span
            class="text-[9px] font-mono uppercase tracking-widest transition-colors duration-300"
            :class="isGazePaused ? 'text-yellow-400/80' : 'text-[#4ade80]/80'"
          >
            {{ isGazePaused ? "Paused" : "Tracking" }}
          </span>
          <span class="text-[9px] font-mono text-white/40">
            {{
              scanProgress < 1 && scanProgress > 0
                ? 1
                : Math.round(scanProgress)
            }}%
          </span>
        </div>
        <div class="w-full h-[2px] bg-white/10 rounded-full overflow-hidden">
          <div
            class="h-full rounded-full transition-all duration-300"
            :class="isGazePaused ? 'bg-yellow-400/70' : 'bg-[#4ade80]'"
            :style="{ width: `${scanProgress}%` }"
          />
        </div>
      </div>
    </div>

    <!-- Bottom Section -->
    <div
      class="flex-1 flex flex-col justify-between py-14 items-center bg-[#FFFFFF]"
    >
      <div class="w-full h-auto flex justify-center items-center text-center">
        <p>
          Point the Camera at Your Face <br />
          Camera Will Detect!
        </p>
      </div>
      <div class="w-full h-auto flex justify-center items-center">
        <div
          class="w-fit h-auto flex flex-row gap-x-3 justify-center items-center rounded-full px-5 py-2.5 transition-all duration-300"
          :class="
            scanComplete
              ? 'bg-[#DDF7E5]'
              : isGazePaused
                ? 'bg-yellow-100'
                : isDetecting
                  ? 'bg-[#DFF4E6]'
                  : 'bg-[#F3F4F6]'
          "
        >
          <!-- Dot Pulse -->
          <div class="relative w-3 h-3">
            <span
              class="absolute inset-0 rounded-full animate-ping"
              :class="
                scanComplete
                  ? 'bg-[#22C55E]/40'
                  : isGazePaused
                    ? 'bg-yellow-400/40'
                    : isDetecting
                      ? 'bg-[#22C55E]/40'
                      : 'bg-gray-400/30'
              "
            />
            <span
              class="relative block w-3 h-3 rounded-full"
              :class="
                scanComplete
                  ? 'bg-[#22C55E]'
                  : isGazePaused
                    ? 'bg-yellow-400'
                    : isDetecting
                      ? 'bg-[#22C55E]'
                      : 'bg-gray-400'
              "
            />
          </div>

          <!-- Text -->
          <p
            class="text-[15px] font-medium tracking-[0.02em] transition-colors duration-300"
            :class="
              scanComplete
                ? 'text-[#15803D]'
                : isGazePaused
                  ? 'text-yellow-700'
                  : isDetecting
                    ? 'text-[#16A34A]'
                    : 'text-[#6B7280]'
            "
          >
            {{
              scanComplete
                ? "Scan Complete"
                : isGazePaused
                  ? "Scanning Paused"
                  : isDetecting
                    ? "Scanning Face..."
                    : "Waiting for Face"
            }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.fade-overlay-enter-active {
  transition: opacity 0.3s ease;
}
.fade-overlay-leave-active {
  transition: opacity 0.25s ease;
}
.fade-overlay-enter-from,
.fade-overlay-leave-to {
  opacity: 0;
}
</style>
