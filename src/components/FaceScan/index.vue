<script setup>
import { ref, onMounted, onUnmounted, computed } from "vue";
import axios from "axios";
import { resultAPI } from "@/Data/Results2";

const props = defineProps({
  autoStart: {
    type: Boolean,
    default: true,
  },
});

const USE_MOCK_API = true;

const videoRef = ref(null);
const canvasRef = ref(null);
const ellipseRef = ref(null);

const cameraActive = ref(false);
const personDetected = ref(false);
const scanProgress = ref(0);
const isGazePaused = ref(false);

// ─── FIX: isUnmounted sebagai ref agar reset setiap kali mount ───────────────
const isUnmounted = ref(false);

const isDetecting = computed(() => personDetected.value && !isGazePaused.value);

let faceLandmarker = null;
let handLandmarker = null;
let arAnimId = null;
let stream = null;
let pulseT = 0;
let lastArTime = -1;

// ─── Scan progress state ──────────────────────────────────────────────────────
const SCAN_DURATION_MS = 30000;
const GAZE_AWAY_FRAMES = 3;
const MIN_CHUNKS_BEFORE_POP = 3;
let gazeAwayCount = 0;
let scanStartMs = null;
let accumulatedMs = 0;
let pauseStartMs = null;
let scanComplete = ref(false);

// ─── MediaRecorder ────────────────────────────────────────────────────────────
let mediaRecorder = null;
let recordedChunks = [];
let recordingMimeType = "";

const emit = defineEmits([
  "scan-complete",
  "upload-start",
  "upload-done",
  "upload-retry",
]);

// ─── Retry state ──────────────────────────────────────────────────────────────
let lastBlob = null;
let retryCount = 0;
let retryTimeoutId = null;
let retryAborted = false;
let isUploadDone = false;

const RETRY_DELAYS = [3000, 5000, 8000, 12000, 15000];

function getRetryDelay(attempt) {
  return RETRY_DELAYS[Math.min(attempt, RETRY_DELAYS.length - 1)];
}

function cancelRetry() {
  retryAborted = true;
  if (retryTimeoutId) {
    clearTimeout(retryTimeoutId);
    retryTimeoutId = null;
  }
}

// ─── Recording ────────────────────────────────────────────────────────────────
function startRecording() {
  if (!stream || mediaRecorder) return;

  recordedChunks = [];
  lastBlob = null;
  retryCount = 0;
  retryAborted = false;

  recordingMimeType = MediaRecorder.isTypeSupported("video/mp4")
    ? "video/mp4"
    : MediaRecorder.isTypeSupported("video/webm;codecs=h264")
      ? "video/webm;codecs=h264"
      : "video/webm";

  try {
    mediaRecorder = new MediaRecorder(stream, { mimeType: recordingMimeType });
  } catch {
    mediaRecorder = new MediaRecorder(stream);
    recordingMimeType = mediaRecorder.mimeType;
  }

  mediaRecorder.ondataavailable = (e) => {
    if (e.data && e.data.size > 0) recordedChunks.push(e.data);
  };

  // mediaRecorder.onstop = () => {
  //   const blob = new Blob(recordedChunks, { type: recordingMimeType });
  //   lastBlob = blob;
  //   emit("scan-complete");
  //   sendVideoToApi(blob);
  // };

  mediaRecorder.onstop = () => {
    console.log("[scan] onstop fired, chunks:", recordedChunks.length);

    const blob = new Blob(recordedChunks, {
      type: recordingMimeType,
    });

    lastBlob = blob;

    emit("upload-start"); // ← TAMBAHAN

    emit("scan-complete");

    sendVideoToApi(blob);
  };

  mediaRecorder.start(500);
}

function pauseRecording() {
  if (mediaRecorder?.state === "recording") mediaRecorder.pause();
}

function resumeRecording() {
  if (mediaRecorder?.state === "paused") mediaRecorder.resume();
}

function stopRecording() {
  if (
    mediaRecorder &&
    (mediaRecorder.state === "recording" || mediaRecorder.state === "paused")
  ) {
    mediaRecorder.stop();
  }
  mediaRecorder = null;
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
  recordedChunks = [];
  lastBlob = null;
  retryCount = 0;
  retryAborted = false;
  isUploadDone = false;
  stopRecording();
  cancelRetry();
}

// ─── API ──────────────────────────────────────────────────────────────────────
async function sendVideoToApi(blob) {
  if (retryAborted || isUploadDone) return;

  if (USE_MOCK_API) {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    isUploadDone = true;
    emit("upload-done", resultAPI[0]);
    return;
  }

  const ext = recordingMimeType.includes("mp4") ? "mp4" : "webm";
  const filename = `scan-${Date.now()}.${ext}`;
  const formData = new FormData();
  formData.append("file", blob, filename);

  try {
    const uploadRes = await axios.post(
      "https://api-gateway.seleris.id/v1/seleris-credit-cover/web/upload-file",
      formData,
      { headers: { "Content-Type": "multipart/form-data" } },
    );

    const videoUrl =
      uploadRes.data?.url ??
      uploadRes.data?.data?.url ??
      uploadRes.data?.data?.path;

    if (!videoUrl) {
      console.error("[scan] URL tidak ditemukan:", uploadRes.data);
      scheduleRetry(blob);
      return;
    }

    const predictRes = await axios.post(
      "https://202.51.196.227:5001/predict",
      { video_url: videoUrl },
      { headers: { "Content-Type": "application/json" } },
    );

    isUploadDone = true;
    emit("upload-done", predictRes.data);
  } catch (err) {
    console.error(`[scan] error (attempt ${retryCount + 1}):`, err.message);
    scheduleRetry(blob);
  }
}

function scheduleRetry(blob) {
  if (retryAborted || isUploadDone) return;

  retryCount++;
  const delay = getRetryDelay(retryCount - 1);

  emit("upload-retry", {
    attempt: retryCount,
    delayMs: delay,
  });

  retryTimeoutId = setTimeout(() => {
    if (!retryAborted && !isUploadDone) {
      sendVideoToApi(blob);
    }
  }, delay);
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

// ─── Init MediaPipe ───────────────────────────────────────────────────────────
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

// ─── Camera ───────────────────────────────────────────────────────────────────
async function initFaceTracker() {
  try {
    await initFaceLandmarker();
    stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: "user", width: 640, height: 480 },
      audio: false,
    });
    // ─── FIX: cek isUnmounted.value (bukan isUnmounted) ──────────────────────
    if (!videoRef.value || isUnmounted.value) return;
    videoRef.value.srcObject = stream;
    videoRef.value.onloadeddata = () => {
      if (isUnmounted.value) return;
      cameraActive.value = true;
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

// ─── Gaze detection ───────────────────────────────────────────────────────────
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

// ─── Hand covering face ───────────────────────────────────────────────────────
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

// ─── Pause / resume ───────────────────────────────────────────────────────────
function pauseScan(reason = "Wajah berpaling") {
  if (isGazePaused.value) return;
  isGazePaused.value = true;
  pauseStartMs = performance.now();

  // if (recordedChunks.length > MIN_CHUNKS_BEFORE_POP) {
  //   recordedChunks.pop();
  // }

  pauseRecording();
}

function resumeScan() {
  if (!isGazePaused.value) return;

  if (pauseStartMs !== null) {
    accumulatedMs += performance.now() - pauseStartMs;
  }

  isGazePaused.value = false;
  gazeAwayCount = 0;
  pauseStartMs = null;

  setTimeout(() => {
    resumeRecording();
  }, 150);
}

// ─── pointInOval ─────────────────────────────────────────────────────────────
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

// ─── Gradient cache ───────────────────────────────────────────────────────────
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

// ─── Draw mesh ────────────────────────────────────────────────────────────────
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

// ─── Main predict loop ────────────────────────────────────────────────────────
function arPredict() {
  // ─── FIX: isUnmounted.value ───────────────────────────────────────────────
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

  let faceResult;
  let handResult;
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
        startRecording();
      }
    }

    if (scanStartMs !== null && !scanComplete.value) {
      let elapsed;

      if (isGazePaused.value) {
        // Saat pause → waktu berhenti
        elapsed = Math.max(
          0,
          (pauseStartMs ?? now) - scanStartMs - accumulatedMs,
        );
      } else {
        // Saat running normal
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

// ─── Scan complete ────────────────────────────────────────────────────────────
// function onScanComplete() {
//   if (mediaRecorder && mediaRecorder.state !== "inactive") {
//     mediaRecorder.stop();
//     mediaRecorder = null;
//   } else {
//     emit("scan-complete");
//   }
// }

function onScanComplete() {
  console.log("[scan] onScanComplete, recorder state:", mediaRecorder?.state); // ← tambah
  if (mediaRecorder && mediaRecorder.state !== "inactive") {
    mediaRecorder.stop();
    mediaRecorder = null;
  } else {
    emit("scan-complete");
  }
}

// ─── Lifecycle ────────────────────────────────────────────────────────────────
onMounted(async () => {
  isUnmounted.value = false;

  if (!props.autoStart) return;

  await initFaceTracker();
});

onUnmounted(() => {
  cleanup();
});

function cleanup() {
  // ─── FIX: isUnmounted.value ───────────────────────────────────────────────
  isUnmounted.value = true;
  cancelRetry();
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
  lastBlob = null;
}

function stopCamera() {
  cancelAnimationFrame(arAnimId);

  cancelRetry();

  if (mediaRecorder) {
    stopRecording();
  }

  if (stream) {
    stream.getTracks().forEach((t) => t.stop());
    stream = null;
  }

  cameraActive.value = false;
}

function startCamera() {
  if (!stream) {
    isUnmounted.value = false; // ← tambah ini
    initFaceTracker();
  }
}

defineExpose({ resetScan, stopCamera, startCamera });
</script>

<template>
  <div
    class="w-full h-full flex flex-col justify-between rounded-t-2xl rounded-b-xl overflow-hidden"
  >
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
