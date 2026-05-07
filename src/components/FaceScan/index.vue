<template>
  <div class="w-full h-full flex flex-col">
    <!-- Camera Area -->
    <div
      ref="cameraAreaRef"
      class="relative flex-1 bg-[#2a2a2a] overflow-hidden"
    >
      <!-- Video Feed -->
      <video
        ref="videoRef"
        class="w-full h-full object-cover"
        :class="{ invisible: !cameraActive }"
        autoplay
        muted
        playsinline
      />

      <!-- Oval Mask Overlay -->
      <div class="absolute inset-0">
        <svg class="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <mask id="ovalMask">
              <rect width="100%" height="100%" fill="white" />
              <ellipse cx="50%" cy="46%" rx="30%" ry="36%" fill="black" />
            </mask>
          </defs>
          <!-- Dark overlay with oval hole -->
          <rect
            width="100%"
            height="100%"
            fill="rgba(0,0,0,0.55)"
            mask="url(#ovalMask)"
          />
          <!-- Oval border — color reacts to detection state -->
          <ellipse
            cx="50%"
            cy="46%"
            rx="30%"
            ry="36%"
            fill="none"
            :stroke="ovalStroke"
            stroke-width="3"
            style="transition: stroke 0.4s ease"
          />
        </svg>
      </div>

      <!-- Scanning progress bar (only when face detected & scanning) -->
      <div
        v-if="status === 'scanning' || status === 'lost'"
        class="absolute bottom-0 left-0 h-1 transition-all duration-100"
        :class="status === 'lost' ? 'bg-[#c0392b]' : 'bg-[#2e7d4f]'"
        :style="{ width: scanProgress + '%' }"
      />

      <!-- Face lost warning overlay -->
      <Transition name="fade">
        <div
          v-if="status === 'lost'"
          class="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
          <div
            class="flex flex-col items-center gap-2 bg-black/50 rounded-2xl px-6 py-4"
          >
            <svg
              class="w-10 h-10 text-[#e74c3c]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <p class="text-white text-sm font-semibold text-center">
              Return your face<br />to the frame
            </p>
          </div>
        </div>
      </Transition>

      <!-- Loading models overlay -->
      <div
        v-if="status === 'loading'"
        class="absolute inset-0 flex items-center justify-center bg-black/60"
      >
        <div class="flex flex-col items-center gap-3">
          <svg
            class="animate-spin w-8 h-8 text-white"
            viewBox="0 0 24 24"
            fill="none"
          >
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="2"
              stroke-dasharray="30 10"
            />
          </svg>
          <p class="text-white text-sm font-medium">
            Loading face detection...
          </p>
        </div>
      </div>
    </div>

    <!-- Bottom Panel -->
    <div
      class="bg-white flex flex-col items-center justify-center gap-4 py-7 px-6 min-h-[180px]"
    >
      <div class="w-10 h-1 rounded-full bg-gray-200" />

      <!-- Instruction Text -->
      <div class="text-center leading-snug">
        <p class="text-[#3a4a3f] font-semibold text-[15px]">
          {{ instructionLine1 }}
        </p>
        <p class="text-[#3a4a3f] font-semibold text-[15px]">
          {{ instructionLine2 }}
        </p>
      </div>

      <!-- Status Badge -->
      <div
        class="flex items-center gap-2 font-semibold text-[14px] px-6 py-3 rounded-full transition-colors duration-300"
        :class="badgeClass"
      >
        <!-- Icon -->
        <svg
          v-if="status === 'ready' || status === 'detected'"
          class="w-5 h-5 flex-shrink-0"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <polyline points="9 12 11 14 15 10" />
        </svg>
        <svg
          v-else-if="status === 'lost'"
          class="w-5 h-5 flex-shrink-0"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
        <svg
          v-else-if="status === 'scanning'"
          class="animate-spin w-5 h-5 flex-shrink-0"
          viewBox="0 0 24 24"
          fill="none"
        >
          <circle
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="2.5"
            stroke-dasharray="30 10"
          />
        </svg>
        <svg
          v-else-if="status === 'done'"
          class="w-5 h-5 flex-shrink-0"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M20 6L9 17l-5-5" />
        </svg>
        <svg
          v-else
          class="animate-spin w-5 h-5 flex-shrink-0"
          viewBox="0 0 24 24"
          fill="none"
        >
          <circle
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="2.5"
            stroke-dasharray="30 10"
          />
        </svg>
        {{ badgeText }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";

// ── Emits ──────────────────────────────────────────────────────────────────
const emit = defineEmits(["scan-complete"]);

// ── Refs ───────────────────────────────────────────────────────────────────
const videoRef = ref(null);
const cameraAreaRef = ref(null);
const cameraActive = ref(false);
const scanProgress = ref(0);

// status: 'loading' | 'ready' | 'detected' | 'scanning' | 'lost' | 'done'
const status = ref("loading");

let stream = null;
let detectionLoop = null;
let scanInterval = null;
let faceApiLoaded = false;
let lostFaceTimeout = null; // debounce sebelum declare "lost"
let resumeTimeout = null; // delay sebelum resume scan setelah wajah kembali

// ── Computed UI ────────────────────────────────────────────────────────────
const ovalStroke = computed(() => {
  if (status.value === "lost") return "#c0392b";
  if (status.value === "detected" || status.value === "scanning")
    return "#2e7d4f";
  if (status.value === "done") return "#2e7d4f";
  return "rgba(255,255,255,0.25)";
});

const instructionLine1 = computed(() => {
  if (status.value === "lost") return "Face Not Detected!";
  if (status.value === "scanning") return "Hold Still, Scanning...";
  if (status.value === "done") return "Scan Complete!";
  if (status.value === "detected") return "Face Detected!";
  return "Point the Camera at Your Face";
});

const instructionLine2 = computed(() => {
  if (status.value === "lost") return "Please return to the frame";
  if (status.value === "scanning") return "Please do not move";
  if (status.value === "done") return "Processing your results";
  if (status.value === "detected") return "Starting scan automatically...";
  return "Camera Will Detect!";
});

const badgeText = computed(() => {
  const map = {
    loading: "Loading...",
    ready: "Ready to Scanning",
    detected: "Face Detected",
    scanning: "Scanning...",
    lost: "Face Lost",
    done: "Scan Complete",
  };
  return map[status.value] ?? "Ready to Scanning";
});

const badgeClass = computed(() => {
  if (status.value === "lost") return "bg-[#fdecea] text-[#c0392b]";
  if (status.value === "scanning") return "bg-[#e8f4fb] text-[#1a6fa0]";
  if (status.value === "done") return "bg-[#e8f7ee] text-[#2e7d4f]";
  if (status.value === "detected") return "bg-[#e8f7ee] text-[#2e7d4f]";
  return "bg-[#e8f7ee] text-[#2e7d4f]";
});

// ── face-api.js loader ─────────────────────────────────────────────────────
function loadScript(src) {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) return resolve();
    const s = document.createElement("script");
    s.src = src;
    s.onload = resolve;
    s.onerror = reject;
    document.head.appendChild(s);
  });
}

async function loadFaceApi() {
  await loadScript(
    "https://cdn.jsdelivr.net/npm/face-api.js@0.22.2/dist/face-api.min.js",
  );
  const MODEL_URL = "https://cdn.jsdelivr.net/npm/@vladmandic/face-api/model";
  await Promise.all([faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL)]);
  faceApiLoaded = true;
}

// ── Detection loop ─────────────────────────────────────────────────────────
function startDetectionLoop() {
  detectionLoop = setInterval(async () => {
    if (!faceApiLoaded || !videoRef.value || status.value === "done") return;
    try {
      const detection = await faceapi.detectSingleFace(
        videoRef.value,
        new faceapi.TinyFaceDetectorOptions({
          inputSize: 224,
          scoreThreshold: 0.5,
        }),
      );

      if (detection) {
        // Wajah ada — batalkan timer "lost" jika ada
        clearTimeout(lostFaceTimeout);
        lostFaceTimeout = null;

        if (status.value === "ready") {
          status.value = "detected";
          setTimeout(startScan, 800);
        } else if (status.value === "lost") {
          // Wajah kembali setelah hilang — resume scan dengan delay kecil
          clearTimeout(resumeTimeout);
          resumeTimeout = setTimeout(() => {
            status.value = "scanning";
            continueScan();
          }, 600);
        }
      } else {
        // Wajah tidak terdeteksi
        clearTimeout(resumeTimeout);
        resumeTimeout = null;

        if (status.value === "scanning") {
          // Debounce 600ms sebelum benar-benar declare lost
          // (hindari false positive karena 1-2 frame gagal deteksi)
          if (!lostFaceTimeout) {
            lostFaceTimeout = setTimeout(() => {
              pauseScan();
              status.value = "lost";
            }, 600);
          }
        } else if (status.value === "detected") {
          status.value = "ready";
        }
      }
    } catch (_) {
      /* ignore frame errors */
    }
  }, 300);
}

function pauseScan() {
  clearInterval(scanInterval);
  scanInterval = null;
}

function continueScan() {
  // Lanjutkan dari progress yang sudah ada (tidak reset)
  scanInterval = setInterval(() => {
    scanProgress.value += 2;
    if (scanProgress.value >= 100) {
      clearInterval(scanInterval);
      status.value = "done";
      emit("scan-complete");
    }
  }, 60);
}

function startScan() {
  if (status.value === "done") return;
  status.value = "scanning";
  scanProgress.value = 0;
  continueScan();
}

// ── Lifecycle ──────────────────────────────────────────────────────────────
onMounted(async () => {
  // 1. Start camera
  try {
    stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: "user" },
      audio: false,
    });
    if (videoRef.value) {
      videoRef.value.srcObject = stream;
      cameraActive.value = true;
    }
  } catch (err) {
    console.warn("Camera unavailable:", err);
  }

  // 2. Load face-api models
  try {
    await loadFaceApi();
    status.value = "ready";
    startDetectionLoop();
  } catch (err) {
    console.warn("face-api load failed:", err);
    status.value = "ready"; // graceful fallback — no detection but camera still shows
  }
});

onUnmounted(() => {
  clearInterval(detectionLoop);
  clearInterval(scanInterval);
  clearTimeout(lostFaceTimeout);
  clearTimeout(resumeTimeout);
  if (stream) stream.getTracks().forEach((t) => t.stop());
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
