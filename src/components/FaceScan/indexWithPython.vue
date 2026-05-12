<script setup>
import { ref, onMounted, onUnmounted, computed } from "vue";
import { resultAPI } from "@/data/Results2";

const props = defineProps({
  autoStart: {
    type: Boolean,
    default: true,
  },
});

const USE_MOCK_API = false;

const videoRef = ref(null);
const canvasRef = ref(null);
const ellipseRef = ref(null);

const cameraActive = ref(false);
const cameraReady = ref(false);
const personDetected = ref(false);
const scanProgress = ref(0);
const isGazePaused = ref(false);
const isUnmounted = ref(false);

// ─── Hasil rPPG ───────────────────────────────────────────────────────────────
const heartRate = ref(null);
const breathRate = ref(null);
const signalQuality = ref(null);
const isBuffering = ref(true); // true sampai hasil pertama masuk

const isDetecting = computed(() => personDetected.value && !isGazePaused.value);

let faceLandmarker = null;
let handLandmarker = null;
let arAnimId = null;
let stream = null;
let pulseT = 0;
let lastArTime = -1;

const SCAN_DURATION_MS = 30000;
const GAZE_AWAY_FRAMES = 3;
let gazeAwayCount = 0;
let scanStartMs = null;
let accumulatedMs = 0;
let pauseStartMs = null;
let scanComplete = ref(false);

const emit = defineEmits([
  "scan-complete",
  "upload-start",
  "upload-done",
  "upload-retry",
]);

// ─── WebSocket ────────────────────────────────────────────────────────────────
let wsRppg = null;
let wsFrameTimer = null;
const WS_URL = "ws://localhost:5009/ws/rppg";
const FRAME_INTERVAL = 100; // 10 fps ke backend

function startRecording() {
  if (wsRppg) return;

  if (USE_MOCK_API) {
    emit("upload-start");
    setTimeout(() => {
      heartRate.value = resultAPI[0].heart_rate;
      breathRate.value = resultAPI[0].breath_rate;
      signalQuality.value = resultAPI[0].sqi;
      isBuffering.value = false;
      emit("upload-done", resultAPI[0]);
    }, 3000);
    return;
  }

  wsRppg = new WebSocket(WS_URL);

  wsRppg.onopen = () => {
    console.log("[ws] connected");
    wsFrameTimer = setInterval(sendFrame, FRAME_INTERVAL);
    emit("upload-start");
  };

  wsRppg.onmessage = (e) => {
    const data = JSON.parse(e.data);

    if (data.status === "buffering") {
      console.log(`[ws] buffering ${data.buffered}/${data.needed}`);
      isBuffering.value = true;
      return;
    }

    if (data.status === "result") {
      if (data.heart_rate != null) heartRate.value = data.heart_rate;
      if (data.breath_rate != null) breathRate.value = data.breath_rate;
      if (data.sqi != null) signalQuality.value = data.sqi;
      isBuffering.value = false;
      console.log(
        `[ws] HR: ${data.heart_rate}, BR: ${data.breath_rate}, SQI: ${data.sqi}`,
      );
    }

    if (data.status === "error") {
      console.error("[ws] server error:", data.detail);
    }
  };

  wsRppg.onerror = (e) => console.error("[ws] error:", e);

  wsRppg.onclose = () => {
    console.log("[ws] closed");
    wsRppg = null;
  };
}

function sendFrame() {
  if (!wsRppg || wsRppg.readyState !== WebSocket.OPEN) return;
  if (isGazePaused.value || !personDetected.value) return;
  if (!canvasRef.value) return;

  // canvas sudah berisi frame video dari drawMesh() — tinggal ambil
  const b64 = canvasRef.value.toDataURL("image/jpeg", 0.6).split(",")[1];

  wsRppg.send(JSON.stringify({ frame: b64 }));
}

function pauseRecording() {
  // sendFrame sudah skip saat isGazePaused = true, tidak perlu aksi
}

function resumeRecording() {
  // sendFrame otomatis lanjut saat isGazePaused = false
}

function stopRecording() {
  if (wsFrameTimer) {
    clearInterval(wsFrameTimer);
    wsFrameTimer = null;
  }
  if (wsRppg) {
    wsRppg.close();
    wsRppg = null;
  }
}

function resetScan() {
  scanComplete.value = false;
  scanProgress.value = 0;
  scanStartMs = null;
  accumulatedMs = 0;
  pauseStartMs = null;
  gazeAwayCount = 0;
  isGazePaused.value = false;
  personDetected.value = false;
  cameraReady.value = false;
  heartRate.value = null;
  breathRate.value = null;
  signalQuality.value = null;
  isBuffering.value = true;
  stopRecording();
}

// ─── BVP Wave ─────────────────────────────────────────────────────────────────
const bvpCanvasRef = ref(null);
let bvpAnimId = null;
let bvpOffset = 0;

function drawBvpWave() {
  const canvas = bvpCanvasRef.value;
  if (!canvas) {
    bvpAnimId = requestAnimationFrame(drawBvpWave);
    return;
  }

  const dpr = window.devicePixelRatio || 1;
  const w = canvas.offsetWidth;
  const h = canvas.offsetHeight;

  if (!w || !h) {
    bvpAnimId = requestAnimationFrame(drawBvpWave);
    return;
  }

  if (canvas.width !== w * dpr || canvas.height !== h * dpr) {
    canvas.width = w * dpr;
    canvas.height = h * dpr;
  }

  const ctx = canvas.getContext("2d");
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, w, h);

  const mid = h / 2;
  const amp = h * 0.36;
  const freq = 0.045;

  ctx.beginPath();
  ctx.strokeStyle = "#22c55e";
  ctx.lineWidth = 1.8;
  ctx.lineJoin = "round";

  for (let x = 0; x <= w; x++) {
    const t = (x + bvpOffset) * freq;
    const y =
      mid -
      amp * 0.85 * Math.sin(t) -
      amp * 0.25 * Math.sin(2.1 * t + 0.5) -
      amp * 0.08 * Math.sin(3.3 * t + 1.1);
    x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
  }

  ctx.stroke();
  bvpOffset += 1.5;
  bvpAnimId = requestAnimationFrame(drawBvpWave);
}

// ─── Oval cache ───────────────────────────────────────────────────────────────
let cachedOval = null;
let ovalResizeObserver = null;

function invalidateOvalCache() {
  cachedOval = null;
}

function getOvalInCanvasSpace(canvas) {
  if (cachedOval) return cachedOval;
  const ellipse = ellipseRef.value;
  if (!ellipse) return null;
  const svgEl = ellipse.closest("svg");
  if (!svgEl) return null;
  const svgRect = svgEl.getBoundingClientRect();
  const ellipseRect = ellipse.getBoundingClientRect();
  if (svgRect.width === 0 || svgRect.height === 0) return null;
  const centerXScreen = ellipseRect.left + ellipseRect.width / 2 - svgRect.left;
  const centerYScreen = ellipseRect.top + ellipseRect.height / 2 - svgRect.top;
  const scaleX = canvas.width / svgRect.width;
  const scaleY = canvas.height / svgRect.height;
  cachedOval = {
    cx: centerXScreen * scaleX,
    cy: centerYScreen * scaleY,
    rx: (ellipseRect.width / 2) * scaleX,
    ry: (ellipseRect.height / 2) * scaleY,
  };
  return cachedOval;
}

// ─── Face / Hand Landmarker ───────────────────────────────────────────────────
async function initFaceLandmarker() {
  const { FaceLandmarker, HandLandmarker, FilesetResolver } =
    await import("https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.3/vision_bundle.mjs");

  const vision = await FilesetResolver.forVisionTasks(
    "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.3/wasm",
  );

  faceLandmarker = await FaceLandmarker.createFromOptions(vision, {
    baseOptions: {
      modelAssetPath:
        "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task",
      delegate: "GPU",
    },
    outputFaceBlendshapes: false,
    runningMode: "VIDEO",
    numFaces: 1,
  });

  handLandmarker = await HandLandmarker.createFromOptions(vision, {
    baseOptions: {
      modelAssetPath:
        "https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task",
      delegate: "GPU",
    },
    runningMode: "VIDEO",
    numHands: 2,
  });

  window.__FL_TESS = FaceLandmarker.FACE_LANDMARKS_TESSELATION;
}

async function initFaceTracker() {
  try {
    await initFaceLandmarker();
    stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: "user", width: 640, height: 480 },
      audio: false,
    });
    if (!videoRef.value || isUnmounted.value) return;
    videoRef.value.srcObject = stream;
    videoRef.value.onloadeddata = () => {
      if (isUnmounted.value) return;
      cameraActive.value = true;
      cameraReady.value = true;
      if (canvasRef.value) {
        ovalResizeObserver = new ResizeObserver(invalidateOvalCache);
        ovalResizeObserver.observe(canvasRef.value);
      }
      arPredict();
    };
  } catch (err) {
    console.error("FaceTracker init error:", err);
  }
}

// ─── Gaze / Hand helpers ──────────────────────────────────────────────────────
let lastGazeLmKey = null;
let lastGazeResult = false;

function isLookingAway(lm) {
  const key = `${lm[1].x.toFixed(3)},${lm[1].y.toFixed(3)},${lm[234].x.toFixed(3)},${lm[454].x.toFixed(3)},${lm[152].y.toFixed(3)}`;
  if (key === lastGazeLmKey) return lastGazeResult;
  lastGazeLmKey = key;

  const nose = lm[1];
  const leftEar = lm[234];
  const rightEar = lm[454];
  const chin = lm[152];
  const forehead = lm[10];

  const faceW = Math.abs(leftEar.x - rightEar.x);
  const centerX = (leftEar.x + rightEar.x) / 2;
  const yawDev = Math.abs(nose.x - centerX) / faceW;
  if (yawDev > 0.26) {
    lastGazeResult = true;
    return true;
  }

  const faceH = Math.abs(chin.y - forehead.y);
  const centerY = (chin.y + forehead.y) / 2;
  const pitchDev = Math.abs(nose.y - centerY) / faceH;

  lastGazeResult = pitchDev > 0.22;
  return lastGazeResult;
}

const HAND_COVER_THRESHOLD = 3;

function isHandCoveringFace(faceLm, handResults, canvasW, canvasH) {
  if (!handResults?.landmarks?.length) return false;

  let minX = Infinity,
    maxX = -Infinity;
  let minY = Infinity,
    maxY = -Infinity;

  for (let i = 0; i < faceLm.length; i++) {
    const p = faceLm[i];
    const px = p.x * canvasW;
    const py = p.y * canvasH;
    if (px < minX) minX = px;
    if (px > maxX) maxX = px;
    if (py < minY) minY = py;
    if (py > maxY) maxY = py;
  }

  for (const handLm of handResults.landmarks) {
    let count = 0;
    for (const p of handLm) {
      const hx = p.x * canvasW;
      const hy = p.y * canvasH;
      if (hx >= minX && hx <= maxX && hy >= minY && hy <= maxY) {
        count++;
        if (count >= HAND_COVER_THRESHOLD) return true;
      }
    }
  }
  return false;
}

// ─── Pause / Resume ───────────────────────────────────────────────────────────
function pauseScan(reason = "Wajah berpaling") {
  if (isGazePaused.value) return;
  isGazePaused.value = true;
  pauseStartMs = performance.now();
  pauseRecording();
}

function resumeScan() {
  if (!isGazePaused.value) return;
  if (pauseStartMs !== null) accumulatedMs += performance.now() - pauseStartMs;
  isGazePaused.value = false;
  gazeAwayCount = 0;
  pauseStartMs = null;
  setTimeout(() => resumeRecording(), 150);
}

// ─── Oval hit-test ────────────────────────────────────────────────────────────
function pointInOval(px, py, cx, cy, rx, ry) {
  const dx = (px - cx) / rx;
  const dy = (py - cy) / ry;
  return dx * dx + dy * dy <= 1;
}

const FACE_OVAL_INDICES = [
  10, 338, 297, 332, 284, 251, 389, 356, 454, 323, 361, 288, 397, 365, 379, 378,
  400, 377, 152, 148, 176, 149, 150, 136, 172, 58, 132, 93, 234, 127, 162, 21,
  54, 103, 67, 109,
];

// ─── Draw helpers ─────────────────────────────────────────────────────────────
let cachedScanGrad = null;
let cachedScanGradY = -1;

function getScanGrad(ctx, scanY) {
  if (cachedScanGrad && Math.abs(scanY - cachedScanGradY) < 1)
    return cachedScanGrad;
  cachedScanGrad = ctx.createLinearGradient(0, scanY - 12, 0, scanY + 12);
  cachedScanGrad.addColorStop(0, "rgba(74,222,128,0)");
  cachedScanGrad.addColorStop(0.5, "rgba(74,222,128,0.18)");
  cachedScanGrad.addColorStop(1, "rgba(74,222,128,0)");
  cachedScanGradY = scanY;
  return cachedScanGrad;
}

function drawMesh(lm, canvas) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const W = canvas.width;
  const H = canvas.height;

  ctx.clearRect(0, 0, W, H);
  ctx.save();
  ctx.translate(W, 0);
  ctx.scale(-1, 1);
  ctx.drawImage(videoRef.value, 0, 0, W, H);
  ctx.restore();

  const tess = window.__FL_TESS;
  if (!tess) return;

  pulseT += isGazePaused.value ? 0 : 0.016;
  const scanY = H * 0.5 + Math.sin(pulseT) * H * 0.4;
  const band = H * 0.26;
  const bandInv = 1 / band;

  ctx.save();
  ctx.translate(W, 0);
  ctx.scale(-1, 1);
  ctx.lineJoin = "round";
  ctx.lineCap = "round";
  ctx.lineWidth = 0.55;

  for (let i = 0; i < tess.length; i++) {
    const { start, end } = tess[i];
    const a = lm[start];
    const b = lm[end];
    const midY = (a.y + b.y) * 0.5 * H;
    const dist = Math.abs(midY - scanY);
    if (dist > band) continue;

    const norm = 1 - dist * bandInv;
    const ease = norm * norm;
    const alpha = isGazePaused.value ? 0.06 + ease * 0.12 : 0.1 + ease * 0.52;
    const lum = Math.round(180 + ease * 75);

    ctx.strokeStyle = `rgba(${lum},${lum},${lum},${alpha})`;
    ctx.beginPath();
    ctx.moveTo(a.x * W, a.y * H);
    ctx.lineTo(b.x * W, b.y * H);
    ctx.stroke();
  }

  if (!isGazePaused.value) {
    const la = 0.1 + 0.04 * Math.sin(pulseT * 3.5);
    ctx.fillStyle = `rgba(74,222,128,${la})`;
    ctx.fillRect(0, scanY - 0.5, W, 1.5);
  }

  ctx.restore();

  if (!isGazePaused.value) {
    ctx.save();
    ctx.fillStyle = getScanGrad(ctx, scanY);
    ctx.fillRect(0, scanY - 12, W, 24);
    ctx.restore();
  }
}

function drawIdleFrame(canvas) {
  const ctx = canvas.getContext("2d");
  if (!ctx || !videoRef.value) return;
  const W = canvas.width;
  const H = canvas.height;
  ctx.clearRect(0, 0, W, H);
  ctx.save();
  ctx.translate(W, 0);
  ctx.scale(-1, 1);
  ctx.drawImage(videoRef.value, 0, 0, W, H);
  ctx.restore();
}

// ─── AR loop ──────────────────────────────────────────────────────────────────
function arPredict() {
  if (isUnmounted.value) return;
  if (document.hidden) {
    arAnimId = requestAnimationFrame(arPredict);
    return;
  }

  const video = videoRef.value;
  const canvas = canvasRef.value;

  if (!faceLandmarker || !handLandmarker || !video || video.readyState < 2) {
    arAnimId = requestAnimationFrame(arPredict);
    return;
  }

  const vw = video.videoWidth || 640;
  const vh = video.videoHeight || 480;
  if (canvas.width !== vw || canvas.height !== vh) {
    canvas.width = vw;
    canvas.height = vh;
    invalidateOvalCache();
  }

  const now = performance.now();
  if (now === lastArTime) {
    arAnimId = requestAnimationFrame(arPredict);
    return;
  }

  let faceResult, handResult;
  try {
    faceResult = faceLandmarker.detectForVideo(video, now);
    handResult = handLandmarker.detectForVideo(video, now);
  } catch {
    arAnimId = requestAnimationFrame(arPredict);
    return;
  }

  if (faceResult?.faceLandmarks?.length > 0) {
    personDetected.value = true;
    const lm = faceResult.faceLandmarks[0];
    const cw = canvas.width;
    const ch = canvas.height;

    const oval = getOvalInCanvasSpace(canvas);
    let faceInOval = false;
    if (oval) {
      const { cx, cy, rx, ry } = oval;
      faceInOval = FACE_OVAL_INDICES.every((idx) => {
        const p = lm[idx];
        return p ? pointInOval(p.x * cw, p.y * ch, cx, cy, rx, ry) : true;
      });
    }

    const lookingAway = isLookingAway(lm);
    const handCovering = isHandCoveringFace(lm, handResult, cw, ch);

    if (!faceInOval || lookingAway || handCovering) {
      gazeAwayCount++;
      if (gazeAwayCount >= GAZE_AWAY_FRAMES) {
        personDetected.value = false;
        const reason = !faceInOval
          ? "Wajah keluar frame"
          : handCovering
            ? "Wajah terhalang tangan"
            : "Wajah berpaling";
        pauseScan(reason);
      }
    } else {
      gazeAwayCount = 0;
      if (isGazePaused.value && pauseStartMs !== null) {
        accumulatedMs += now - pauseStartMs;
        pauseStartMs = null;
      }
      if (isGazePaused.value) resumeScan();
      if (scanStartMs === null) {
        accumulatedMs = 0;
        pauseStartMs = null;
        scanStartMs = performance.now();
        scanProgress.value = 1;
        startRecording(); // ← buka WebSocket & mulai kirim frame
      }
    }

    if (scanStartMs !== null && !scanComplete.value) {
      let elapsed;
      if (isGazePaused.value) {
        elapsed = Math.max(
          0,
          (pauseStartMs ?? now) - scanStartMs - accumulatedMs,
        );
      } else {
        elapsed = Math.max(0, now - scanStartMs - accumulatedMs);
      }

      const pct = Math.min(100, (elapsed / SCAN_DURATION_MS) * 100);
      scanProgress.value = pct;

      if (pct >= 100) {
        scanComplete.value = true;
        onScanComplete();
      }
    }

    drawMesh(lm, canvas);
  } else {
    personDetected.value = false;
    gazeAwayCount = 0;
    pauseScan("Wajah tidak terdeteksi");
    drawIdleFrame(canvas);
  }

  lastArTime = now;
  arAnimId = requestAnimationFrame(arPredict);
}

function onScanComplete() {
  console.log("[scan] onScanComplete");
  stopRecording();
  emit("scan-complete");
  emit("upload-done", {
    heart_rate: heartRate.value,
    breath_rate: breathRate.value,
    sqi: signalQuality.value,
  });
}

// ─── Lifecycle ────────────────────────────────────────────────────────────────
onMounted(async () => {
  isUnmounted.value = false;
  drawBvpWave();
  if (!props.autoStart) return;
  await initFaceTracker();
});

onUnmounted(() => cleanup());

function cleanup() {
  isUnmounted.value = true;
  cancelAnimationFrame(bvpAnimId);
  stopRecording();
  cancelAnimationFrame(arAnimId);
  ovalResizeObserver?.disconnect();
  if (stream) {
    stream.getTracks().forEach((t) => t.stop());
    stream = null;
  }
  if (faceLandmarker) {
    faceLandmarker.close();
    faceLandmarker = null;
  }
  if (handLandmarker) {
    handLandmarker.close();
    handLandmarker = null;
  }
  if (videoRef.value) videoRef.value.srcObject = null;
  cachedOval = null;
  cachedScanGrad = null;
  lastGazeLmKey = null;
  cameraReady.value = false;
}

function stopCamera() {
  cancelAnimationFrame(arAnimId);
  stopRecording();
  if (stream) {
    stream.getTracks().forEach((t) => t.stop());
    stream = null;
  }
  cameraActive.value = false;
}

function startCamera() {
  if (!stream) {
    isUnmounted.value = false;
    initFaceTracker();
  }
}

defineExpose({ resetScan, stopCamera, startCamera });
</script>

<template>
  <div
    class="w-full h-full flex flex-col justify-between rounded-t-2xl rounded-b-xl overflow-hidden"
  >
    <!-- ── Camera Section ─────────────────────────────────────────────────── -->
    <div
      class="relative w-full h-[70%] shrink-0 overflow-hidden bg-black rounded-t-2xl"
    >
      <video
        ref="videoRef"
        class="absolute inset-0 w-full h-full object-cover invisible"
        autoplay
        playsinline
        muted
      />

      <canvas
        ref="canvasRef"
        class="absolute inset-0 w-full h-full object-cover pointer-events-none"
      />

      <!-- IDLE OVERLAY -->
      <Transition name="fade-overlay">
        <div
          v-if="!personDetected"
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
            Sistem sedang mendeteksi wajah
          </p>
        </div>
      </Transition>

      <!-- PAUSED OVERLAY -->
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
            Hadap kamera untuk lanjut
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

      <!-- OVAL -->
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
            ref="ellipseRef"
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

      <!-- TOP RIGHT BADGE — SQI / Accuracy -->
      <div class="absolute top-4 right-6">
        <div
          class="min-w-[130px] px-4 py-3 rounded-2xl backdrop-blur-xl border shadow-[0_8px_30px_rgba(0,0,0,0.18)] transition-all duration-500 ease-out"
          :class="
            isDetecting
              ? 'bg-[#4ade80]/10 border-[#4ade80]/20 text-[#4ade80]'
              : isGazePaused
                ? 'bg-yellow-400/10 border-yellow-400/20 text-yellow-300'
                : 'bg-black/25 border-white/10 text-white/70'
          "
        >
          <template v-if="isDetecting">
            <div class="flex flex-col items-center gap-y-2">
              <div class="flex items-center gap-x-2">
                <span class="w-2 h-2 rounded-full bg-[#4ade80] animate-pulse" />
                <p
                  class="text-[10px] uppercase tracking-[0.18em] font-mono text-[#4ade80]/80"
                >
                  {{ isBuffering ? "Buffering" : "SQI" }}
                </p>
              </div>
              <div class="flex items-end gap-x-1 leading-none">
                <p class="text-[32px] font-[700] tracking-tight">
                  {{
                    isBuffering ? "—" : Math.round((signalQuality ?? 0) * 100)
                  }}
                </p>
                <span class="text-[14px] mb-1 opacity-70">%</span>
              </div>
              <div
                class="w-full h-[4px] bg-white/10 rounded-full overflow-hidden"
              >
                <div
                  class="h-full rounded-full bg-[#4ade80] transition-all duration-500"
                  :style="{
                    width: isBuffering
                      ? '0%'
                      : `${Math.round((signalQuality ?? 0) * 100)}%`,
                  }"
                />
              </div>
            </div>
          </template>
          <template v-else-if="isGazePaused">
            <div class="flex items-center gap-x-2">
              <div class="w-2 h-2 rounded-full bg-yellow-400" />
              <p class="text-[11px] uppercase tracking-[0.15em] font-mono">
                Scan Paused
              </p>
            </div>
          </template>
          <template v-else>
            <div class="flex items-center gap-x-2">
              <div class="w-2 h-2 rounded-full bg-white/40 animate-pulse" />
              <p class="text-[11px] uppercase tracking-[0.15em] font-mono">
                Mencari Wajah...
              </p>
            </div>
          </template>
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

    <!-- ── Bottom Section ─────────────────────────────────────────────────── -->
    <div
      class="w-full flex-1 min-h-0 flex flex-col p-0 items-center bg-[#FFFFFF]"
    >
      <Transition name="fade-status" mode="out-in">
        <!-- PAUSED -->
        <div
          v-if="cameraReady && isGazePaused"
          key="paused"
          class="w-full h-full flex justify-center items-center px-5"
        >
          <div
            class="w-full rounded-2xl border border-yellow-200 bg-yellow-50 px-5 py-5 shadow-sm"
          >
            <div class="flex flex-col items-center text-center gap-y-3">
              <div class="relative flex items-center justify-center">
                <span
                  class="absolute w-5 h-5 rounded-full bg-yellow-400/30 animate-ping"
                />
                <span class="relative w-5 h-5 rounded-full bg-yellow-400" />
              </div>
              <div class="flex flex-col gap-y-1">
                <p class="text-[18px] font-[600] text-yellow-700">
                  Scan Paused
                </p>
                <p class="text-[13px] leading-relaxed text-yellow-700/80">
                  Pastikan wajah berada di dalam frame dan menghadap kamera
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- DETECTING -->
        <div
          v-else-if="cameraReady && !isGazePaused"
          key="detecting"
          class="w-full h-full flex flex-col justify-between items-center gap-3"
        >
          <!-- TOP 2 CARD -->
          <div class="w-full h-[45%] shrink-0 grid grid-cols-2 gap-3">
            <!-- Heart Rate -->
            <div
              class="w-full h-full rounded-b-2xl border-[2px] border-t-0 border-[#DCFCE7] bg-[#F0FDF4] shadow-sm"
            >
              <div
                class="w-full h-full flex flex-col px-4 py-4 justify-between"
              >
                <div class="w-full flex justify-between items-start">
                  <p class="text-[15px] font-[500] text-[#15803D]">
                    Heart Rate
                  </p>
                  <div class="relative flex items-center justify-center">
                    <span
                      class="absolute w-2.5 h-2.5 rounded-full bg-[#22C55E]/30 animate-ping"
                    />
                    <span
                      class="relative w-2.5 h-2.5 rounded-full bg-[#22C55E]"
                    />
                  </div>
                </div>
                <div class="w-full flex justify-start items-end gap-x-1">
                  <!-- loading skeleton saat masih buffering -->
                  <template v-if="isBuffering || heartRate == null">
                    <div
                      class="w-12 h-8 bg-gray-200 animate-pulse rounded-md"
                    />
                  </template>
                  <template v-else>
                    <p class="text-[30px] font-[700] text-[#111827]">
                      {{ heartRate }}
                    </p>
                    <span class="text-[13px] text-[#6B7280] mb-1">BPM</span>
                  </template>
                </div>
              </div>
            </div>

            <!-- Breath Rate -->
            <div
              class="w-full h-full rounded-b-2xl border-[2px] border-t-0 border-[#DBEAFE] bg-[#EFF6FF] shadow-sm"
            >
              <div
                class="w-full h-full flex flex-col px-4 py-4 justify-between"
              >
                <div class="w-full flex justify-between items-start">
                  <p class="text-[15px] font-[500] text-[#2563EB]">
                    Breath Rate
                  </p>
                  <div class="relative flex items-center justify-center">
                    <span
                      class="absolute w-2.5 h-2.5 rounded-full bg-[#3B82F6]/30 animate-ping"
                    />
                    <span
                      class="relative w-2.5 h-2.5 rounded-full bg-[#3B82F6]"
                    />
                  </div>
                </div>
                <div class="w-full flex justify-start items-end gap-x-1">
                  <template v-if="isBuffering || breathRate == null">
                    <div
                      class="w-12 h-8 bg-gray-200 animate-pulse rounded-md"
                    />
                  </template>
                  <template v-else>
                    <p class="text-[30px] font-[700] text-[#111827]">
                      {{ breathRate }}
                    </p>
                    <span class="text-[13px] text-[#6B7280] mb-1">BRPM</span>
                  </template>
                </div>
              </div>
            </div>
          </div>

          <!-- BOTTOM CARD — BVP -->
          <div
            class="w-full min-h-0 flex-1 flex justify-center items-center rounded-xl border-[2px] border-b-0 border-[#DCFCE7] bg-[#F9FAFB] shadow-sm overflow-hidden"
          >
            <div class="w-full h-full flex flex-col">
              <div
                class="w-full shrink-0 flex justify-between items-center mb-2 p-3"
              >
                <p class="text-[13px] font-[500] text-[#15803D]">BVP Signal</p>
                <span
                  class="text-[11px] font-mono px-2 py-0.5 rounded-full"
                  :class="
                    isBuffering
                      ? 'text-gray-400 bg-gray-100'
                      : 'text-[#15803D] bg-[#DCFCE7]'
                  "
                >
                  {{ isBuffering ? "Menunggu data…" : "Live" }}
                </span>
              </div>
              <div class="w-full flex-1 min-h-0">
                <canvas ref="bvpCanvasRef" class="w-full h-full block" />
              </div>
            </div>
          </div>
        </div>

        <!-- LOADING -->
        <div
          v-else
          key="loading"
          class="w-full h-full flex justify-center items-center"
        >
          <span class="text-[12px] text-gray-300 font-mono">Memuat...</span>
        </div>
      </Transition>
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

.fade-status-enter-active,
.fade-status-leave-active {
  transition: all 0.35s ease;
}
.fade-status-enter-from,
.fade-status-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>
