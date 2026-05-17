<!-- Ini index.vue untuk scanning -->
<script setup>
import { ref, onMounted, onUnmounted, computed } from "vue";
import { FaceMesh, FACEMESH_TESSELATION } from "@mediapipe/face_mesh";
import { resultAPI } from "@/Data/Results2";

const props = defineProps({
  autoStart: { type: Boolean, default: true },
});

const USE_MOCK_API = false;
const WS_URL = import.meta.env.VITE_RPPG_WS_URL || "ws://localhost:8000/ws";
const FRAME_MS = 67;
const DETECT_MS = 150;
const BVP_BUFFER_SIZE = 100;
const SCAN_DURATION_MS = 30000;

// ─── Landmark index paths ─────────────────────────────────────────────────────
const FACE_OVAL_PATH = [
  10, 338, 297, 332, 284, 251, 389, 356, 454, 323, 361, 288, 397, 365, 379, 378,
  400, 377, 152, 148, 176, 149, 150, 136, 172, 58, 132, 93, 234, 127, 162, 21,
  54, 103, 67, 109,
];
const LEFT_EYE_PATH = [
  33, 246, 161, 160, 159, 158, 157, 173, 133, 155, 154, 153, 145, 144, 163, 7,
];
const RIGHT_EYE_PATH = [
  362, 398, 384, 385, 386, 387, 388, 466, 263, 249, 390, 373, 374, 380, 381,
  382,
];
const LEFT_BROW_PATH = [55, 70, 63, 105, 66, 107, 46, 53, 52, 65];
const RIGHT_BROW_PATH = [285, 300, 293, 334, 296, 336, 276, 283, 282, 295];
const NOSE_BRIDGE_PATH = [168, 6, 197, 195, 5, 4];
const NOSE_BOTTOM_PATH = [129, 49, 48, 64, 98, 97, 2, 326, 327, 294, 279, 358];
const UPPER_LIP_PATH = [61, 185, 40, 39, 37, 0, 267, 269, 270, 409, 291];
const LOWER_LIP_PATH = [291, 375, 321, 405, 314, 17, 84, 181, 91, 146, 61];
const KEY_DOTS = [33, 263, 4, 61, 291, 152, 10];
const OVAL_INDICES = FACE_OVAL_PATH;

// ─── Refs ─────────────────────────────────────────────────────────────────────
const videoRef = ref(null);
const canvasRef = ref(null);
const cameraActive = ref(false);
const isUnmounted = ref(false);
const meshReady = ref(false);

const faceStatus = ref("no_face");
const isGazePaused = ref(false);
const isDetecting = computed(
  () => faceStatus.value === "ok" && !isGazePaused.value,
);
const hasFace = computed(() => faceStatus.value !== "no_face");

const latestMetrics = ref(null);
const latestSqi = ref(null); // ← tambah ini

// ─── Best snapshot — data paling lengkap selama scan berlangsung ──────────────
// Score = jumlah field penting yang punya nilai valid (non-null, non-zero, non-NaN)
let bestSnapshot = null;
let bestSnapshotScore = -1;

const SNAPSHOT_FIELDS = [
  (d) => d?.hr,
  (d) => d?.sqi, // ← tambah
  (d) => d?.hrv?.breathing_rate,
  (d) => d?.hrv?.sdnn,
  (d) => d?.hrv?.rmssd,
  (d) => d?.hrv?.ibi,
  (d) => d?.sbp,
  (d) => d?.dbp,
];

function scoreSnapshot(data) {
  if (!data) return -1;
  return SNAPSHOT_FIELDS.reduce((acc, fn) => {
    const v = fn(data);
    return acc + (v != null && !isNaN(v) && v !== 0 ? 1 : 0);
  }, 0);
}

function tryUpdateBestSnapshot(data) {
  const score = scoreSnapshot(data);
  if (score > bestSnapshotScore) {
    bestSnapshotScore = score;
    bestSnapshot = JSON.parse(JSON.stringify(data)); // deep clone
  }
}

function resetBestSnapshot() {
  bestSnapshot = null;
  bestSnapshotScore = -1;
}

// ─── Display computed ─────────────────────────────────────────────────────────
const displayHR = computed(() => {
  const v = latestMetrics.value?.hr;
  return !v || v === 0 ? "-" : Math.round(v);
});
const displayBreathing = computed(() => {
  const v = latestMetrics.value?.hrv?.breathing_rate;
  return !v || v === 0 ? "-" : Math.round(v);
});

const faceGuidanceText = computed(() => {
  if (isDetecting.value) return "Wajah Terdeteksi";
  switch (faceStatus.value) {
    case "not_centered":
      return "Arahkan ke tengah";
    case "too_close":
      return "Mundur sedikit";
    case "too_far":
      return "Maju sedikit";
    case "tilt":
      return "Tegakkan kepala";
    default:
      return "Mencari Wajah...";
  }
});

const meshColor = computed(() =>
  faceStatus.value === "ok" || faceStatus.value === "no_face"
    ? "#4ade80"
    : "#fb923c",
);
const ovalGuideColor = computed(() => {
  if (faceStatus.value === "ok") return "#4ade80";
  if (faceStatus.value === "no_face") return "rgba(255,255,255,0.3)";
  return "#f87171";
});

// ─── BVP Signal ───────────────────────────────────────────────────────────────
const bvpBuffer = ref([]);
let bvpEmptyCount = 0;
const hasBvpSignal = computed(() => bvpBuffer.value.length > 1);

const bvpPoints = computed(() => {
  const buf = bvpBuffer.value;
  if (buf.length < 2) return "";
  const W = 300,
    H = 52;
  let min = buf[0],
    max = buf[0];
  for (let i = 1; i < buf.length; i++) {
    if (buf[i] < min) min = buf[i];
    if (buf[i] > max) max = buf[i];
  }
  const range = max - min || 1;
  return buf
    .map(
      (v, i) =>
        `${((i / (buf.length - 1)) * W).toFixed(1)},${(H - ((v - min) / range) * (H - 6) - 3).toFixed(1)}`,
    )
    .join(" ");
});

// ─── Scan state ───────────────────────────────────────────────────────────────
let scanStartMs = null,
  accumulatedMs = 0,
  pauseStartMs = null;
const scanComplete = ref(false);
const scanProgress = ref(0);
let arAnimId = null;

function pauseScan() {
  if (isGazePaused.value) return;
  isGazePaused.value = true;
  pauseStartMs = performance.now();
}
function resumeScan() {
  if (!isGazePaused.value) return;
  if (pauseStartMs !== null) accumulatedMs += performance.now() - pauseStartMs;
  isGazePaused.value = false;
  pauseStartMs = null;
}
function startProgressLoop() {
  if (arAnimId) return;
  function tick() {
    if (isUnmounted.value || scanComplete.value) return;
    if (scanStartMs !== null) {
      const now = performance.now();
      const elapsed = isGazePaused.value
        ? Math.max(0, (pauseStartMs ?? now) - scanStartMs - accumulatedMs)
        : Math.max(0, now - scanStartMs - accumulatedMs);
      const pct = Math.min(100, (elapsed / SCAN_DURATION_MS) * 100);
      if (Math.abs(pct - scanProgress.value) >= 0.15) scanProgress.value = pct;
      if (pct >= 100) {
        scanComplete.value = true;
        onScanComplete();
        return;
      }
    }
    arAnimId = requestAnimationFrame(tick);
  }
  arAnimId = requestAnimationFrame(tick);
}

// ─── Face position check ──────────────────────────────────────────────────────
function checkFaceFromLandmarks(landmarks) {
  if (!landmarks || landmarks.length === 0) return "no_face";
  const ovalPts = OVAL_INDICES.map((i) => landmarks[i]);
  const xs = ovalPts.map((p) => p.x),
    ys = ovalPts.map((p) => p.y);
  const cx = xs.reduce((a, b) => a + b, 0) / xs.length;
  const cy = ys.reduce((a, b) => a + b, 0) / ys.length;
  const rx = (Math.max(...xs) - Math.min(...xs)) / 2;
  if (Math.abs(cx - 0.5) > 0.22 || Math.abs(cy - 0.5) > 0.25)
    return "not_centered";
  if (rx > 0.27) return "too_close";
  if (rx < 0.14) return "too_far";
  const L = landmarks[33],
    R = landmarks[263];
  if (Math.abs(Math.atan2(R.y - L.y, R.x - L.x) * (180 / Math.PI)) > 15)
    return "tilt";
  return "ok";
}

function applyFaceStatus(status) {
  faceStatus.value = status;
  if (status === "ok") {
    if (isGazePaused.value) resumeScan();
    if (scanStartMs === null && !scanComplete.value) {
      scanStartMs = performance.now();
      accumulatedMs = 0;
      scanProgress.value = 1;
      startProgressLoop();
    }
  } else {
    pauseScan();
  }
}

// ─── Canvas drawing system ────────────────────────────────────────────────────
function hexToRgb(hex) {
  return `${parseInt(hex.slice(1, 3), 16)},${parseInt(hex.slice(3, 5), 16)},${parseInt(hex.slice(5, 7), 16)}`;
}

function buildSmoothPath(ctx, pts, closed) {
  if (pts.length < 2) return;
  if (closed) {
    const sx = (pts[pts.length - 1].x + pts[0].x) / 2;
    const sy = (pts[pts.length - 1].y + pts[0].y) / 2;
    ctx.moveTo(sx, sy);
    for (let i = 0; i < pts.length; i++) {
      const c = pts[i],
        n = pts[(i + 1) % pts.length];
      ctx.quadraticCurveTo(c.x, c.y, (c.x + n.x) / 2, (c.y + n.y) / 2);
    }
    ctx.closePath();
  } else {
    ctx.moveTo(pts[0].x, pts[0].y);
    for (let i = 0; i < pts.length - 2; i++) {
      const c = pts[i + 1],
        n = pts[i + 2];
      ctx.quadraticCurveTo(c.x, c.y, (c.x + n.x) / 2, (c.y + n.y) / 2);
    }
    ctx.lineTo(pts[pts.length - 1].x, pts[pts.length - 1].y);
  }
}

function lmPx(landmarks, indices, W, H) {
  return indices
    .map((i) => landmarks[i])
    .filter(Boolean)
    .map((p) => ({ x: p.x * W, y: p.y * H }));
}

function strokeSmoothPath(ctx, landmarks, indices, W, H, closed) {
  const pts = lmPx(landmarks, indices, W, H);
  ctx.beginPath();
  buildSmoothPath(ctx, pts, closed);
  ctx.stroke();
}

function drawFaceOvalFill(ctx, ovalPx, cx, cy, radius, rgb) {
  const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius * 0.9);
  grad.addColorStop(0, `rgba(${rgb},0.13)`);
  grad.addColorStop(0.55, `rgba(${rgb},0.07)`);
  grad.addColorStop(1, `rgba(${rgb},0.01)`);
  ctx.save();
  ctx.fillStyle = grad;
  ctx.beginPath();
  buildSmoothPath(ctx, ovalPx, true);
  ctx.fill();
  ctx.restore();
}

function drawTesselation(ctx, landmarks, W, H, rgb, alpha) {
  const edges = [];
  for (const [s, e] of FACEMESH_TESSELATION) {
    const p1 = landmarks[s],
      p2 = landmarks[e];
    if (p1 && p2) edges.push(p1.x * W, p1.y * H, p2.x * W, p2.y * H);
  }
  function strokeEdges(lineWidth, a) {
    ctx.save();
    ctx.strokeStyle = `rgba(${rgb},${a})`;
    ctx.lineWidth = lineWidth;
    ctx.beginPath();
    for (let i = 0; i < edges.length; i += 4) {
      ctx.moveTo(edges[i], edges[i + 1]);
      ctx.lineTo(edges[i + 2], edges[i + 3]);
    }
    ctx.stroke();
    ctx.restore();
  }
  strokeEdges(1.5, alpha * 0.3);
  strokeEdges(0.55, alpha);
}

function drawAllVertexDots(ctx, landmarks, W, H, rgb, alpha, r) {
  ctx.save();
  ctx.fillStyle = `rgba(${rgb},${alpha})`;
  ctx.beginPath();
  for (const pt of landmarks) {
    if (!pt) continue;
    ctx.moveTo(pt.x * W + r, pt.y * H);
    ctx.arc(pt.x * W, pt.y * H, r, 0, Math.PI * 2);
  }
  ctx.fill();
  ctx.restore();
}

function drawScanSweep(ctx, ts, ovalPx, boxX, boxY, boxW, boxH, col, rgb) {
  const sweepFrac = (ts / 2500) % 1;
  const sweepY = boxY + boxH * sweepFrac;
  ctx.save();
  ctx.beginPath();
  buildSmoothPath(ctx, ovalPx, true);
  ctx.clip();
  const trail = ctx.createLinearGradient(0, boxY, 0, sweepY);
  trail.addColorStop(0, `rgba(${rgb},0)`);
  trail.addColorStop(1, `rgba(${rgb},0.10)`);
  ctx.fillStyle = trail;
  ctx.fillRect(boxX, boxY, boxW, sweepY - boxY);
  const lineGrad = ctx.createLinearGradient(boxX, 0, boxX + boxW, 0);
  lineGrad.addColorStop(0, `rgba(${rgb},0)`);
  lineGrad.addColorStop(0.1, `rgba(${rgb},1)`);
  lineGrad.addColorStop(0.9, `rgba(${rgb},1)`);
  lineGrad.addColorStop(1, `rgba(${rgb},0)`);
  ctx.shadowBlur = 22;
  ctx.shadowColor = col;
  ctx.strokeStyle = lineGrad;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(boxX, sweepY);
  ctx.lineTo(boxX + boxW, sweepY);
  ctx.stroke();
  ctx.restore();
}

function drawFeatureContours(ctx, landmarks, W, H, col, rgb, isOk) {
  const glowOval = isOk ? 18 : 8;
  const glowFeat = isOk ? 11 : 5;
  const aOval = isOk ? 0.9 : 0.6;
  const aEye = isOk ? 0.85 : 0.55;
  const aBrow = isOk ? 0.7 : 0.4;
  const aNose = isOk ? 0.58 : 0.32;
  const aLip = isOk ? 0.8 : 0.5;

  ctx.save();
  ctx.shadowBlur = glowOval;
  ctx.shadowColor = col;
  ctx.strokeStyle = `rgba(${rgb},${aOval})`;
  ctx.lineWidth = 2.2;
  strokeSmoothPath(ctx, landmarks, FACE_OVAL_PATH, W, H, true);
  ctx.restore();

  ctx.save();
  ctx.shadowBlur = glowFeat;
  ctx.shadowColor = col;
  ctx.strokeStyle = `rgba(${rgb},${aEye})`;
  ctx.lineWidth = 1.5;
  strokeSmoothPath(ctx, landmarks, LEFT_EYE_PATH, W, H, true);
  strokeSmoothPath(ctx, landmarks, RIGHT_EYE_PATH, W, H, true);
  ctx.restore();

  ctx.save();
  ctx.shadowBlur = glowFeat;
  ctx.shadowColor = col;
  ctx.lineJoin = "round";
  ctx.lineCap = "round";
  for (const path of [LEFT_BROW_PATH, RIGHT_BROW_PATH]) {
    const pts = lmPx(landmarks, path, W, H);
    ctx.fillStyle = `rgba(${rgb},${isOk ? 0.42 : 0.22})`;
    ctx.strokeStyle = `rgba(${rgb},${aBrow})`;
    ctx.lineWidth = 0.9;
    ctx.beginPath();
    buildSmoothPath(ctx, pts, true);
    ctx.fill();
    ctx.stroke();
  }
  ctx.restore();

  ctx.save();
  ctx.shadowBlur = glowFeat;
  ctx.shadowColor = col;
  ctx.strokeStyle = `rgba(${rgb},${aNose})`;
  ctx.lineWidth = 1.1;
  ctx.lineCap = "round";
  strokeSmoothPath(ctx, landmarks, NOSE_BRIDGE_PATH, W, H, false);
  strokeSmoothPath(ctx, landmarks, NOSE_BOTTOM_PATH, W, H, false);
  ctx.restore();

  ctx.save();
  ctx.shadowBlur = glowFeat;
  ctx.shadowColor = col;
  ctx.strokeStyle = `rgba(${rgb},${aLip})`;
  ctx.lineWidth = 1.5;
  ctx.lineCap = "round";
  strokeSmoothPath(ctx, landmarks, UPPER_LIP_PATH, W, H, false);
  strokeSmoothPath(ctx, landmarks, LOWER_LIP_PATH, W, H, false);
  ctx.restore();
}

function drawKeyDots(ctx, landmarks, col, ts, W, H) {
  const pulse = 0.5 + 0.5 * Math.sin(ts / 600);
  const rgb = hexToRgb(col);
  for (const i of KEY_DOTS) {
    const pt = landmarks[i];
    if (!pt) continue;
    ctx.save();
    ctx.shadowBlur = 12 + pulse * 12;
    ctx.shadowColor = col;
    ctx.fillStyle = `rgba(${rgb},${0.6 + pulse * 0.4})`;
    ctx.beginPath();
    ctx.arc(pt.x * W, pt.y * H, 1.8 + pulse * 1.6, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

function drawCornerBrackets(ctx, boxX, boxY, boxW, boxH, col, isOk) {
  const bLen = Math.min(boxW, boxH) * 0.13;
  const rgb = hexToRgb(col);
  ctx.save();
  ctx.strokeStyle = `rgba(${rgb},${isOk ? 1 : 0.5})`;
  ctx.lineWidth = isOk ? 2.5 : 1.8;
  ctx.lineCap = "square";
  ctx.shadowBlur = isOk ? 16 : 6;
  ctx.shadowColor = col;
  const corners = [
    [
      [boxX, boxY + bLen],
      [boxX, boxY],
      [boxX + bLen, boxY],
    ],
    [
      [boxX + boxW - bLen, boxY],
      [boxX + boxW, boxY],
      [boxX + boxW, boxY + bLen],
    ],
    [
      [boxX, boxY + boxH - bLen],
      [boxX, boxY + boxH],
      [boxX + bLen, boxY + boxH],
    ],
    [
      [boxX + boxW - bLen, boxY + boxH],
      [boxX + boxW, boxY + boxH],
      [boxX + boxW, boxY + boxH - bLen],
    ],
  ];
  for (const [[ax, ay], [bx, by], [cx2, cy2]] of corners) {
    ctx.beginPath();
    ctx.moveTo(ax, ay);
    ctx.lineTo(bx, by);
    ctx.lineTo(cx2, cy2);
    ctx.stroke();
  }
  ctx.restore();
}

function drawSearchRipples(ctx, ts, W, H) {
  const cx = W / 2,
    cy = H * 0.48,
    t = (ts / 2200) % 1;
  for (let i = 0; i < 3; i++) {
    const frac = (t + i / 3) % 1;
    ctx.save();
    ctx.strokeStyle = `rgba(74,222,128,${(1 - frac) * 0.18})`;
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(cx, cy, 40 + frac * 100, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
  }
  const blink = 0.4 + 0.6 * Math.abs(Math.sin(ts / 700));
  ctx.save();
  ctx.shadowBlur = 10;
  ctx.shadowColor = "#4ade80";
  ctx.fillStyle = `rgba(74,222,128,${blink * 0.6})`;
  ctx.beginPath();
  ctx.arc(cx, cy, 4, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function renderAnimatedMesh(ts, landmarks) {
  const canvas = canvasRef.value;
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  ctx.resetTransform();
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.setTransform(coverS, 0, 0, coverS, -coverOX, -coverOY);

  const W = videoW,
    H = videoH;

  if (!landmarks || landmarks.length === 0) {
    drawSearchRipples(ctx, ts, W, H);
    return;
  }

  const isOk = faceStatus.value === "ok";
  const col = meshColor.value;
  const rgb = hexToRgb(col);

  const ovalPx = lmPx(landmarks, FACE_OVAL_PATH, W, H);
  const oxs = ovalPx.map((p) => p.x),
    oys = ovalPx.map((p) => p.y);
  const boxX = Math.min(...oxs),
    boxY = Math.min(...oys);
  const boxW = Math.max(...oxs) - boxX,
    boxH = Math.max(...oys) - boxY;
  const cx = boxX + boxW / 2,
    cy = boxY + boxH / 2;
  const radius = Math.max(boxW, boxH) / 2;

  drawFaceOvalFill(ctx, ovalPx, cx, cy, radius, rgb);
  drawTesselation(ctx, landmarks, W, H, rgb, isOk ? 0.3 : 0.18);
  drawAllVertexDots(ctx, landmarks, W, H, rgb, isOk ? 0.58 : 0.38, 1.2);
  if (isOk && !scanComplete.value) {
    drawScanSweep(ctx, ts, ovalPx, boxX, boxY, boxW, boxH, col, rgb);
  }
  drawFeatureContours(ctx, landmarks, W, H, col, rgb, isOk);
  drawKeyDots(ctx, landmarks, col, ts, W, H);
  drawCornerBrackets(ctx, boxX, boxY, boxW, boxH, col, isOk);
}

// ─── Object-cover transform state ────────────────────────────────────────────
let videoW = 640,
  videoH = 480;
let coverS = 1,
  coverOX = 0,
  coverOY = 0;

// ─── MediaPipe FaceMesh ───────────────────────────────────────────────────────
let faceMesh = null;
let currentLandmarks = null;
let lastDetectTs = 0;
let detectBusy = false;
let renderLoopId = null;

async function initFaceMesh() {
  faceMesh = new FaceMesh({
    locateFile: (f) =>
      `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh@0.4.1633559619/${f}`,
  });
  faceMesh.setOptions({
    maxNumFaces: 1,
    refineLandmarks: false,
    minDetectionConfidence: 0.5,
    minTrackingConfidence: 0.5,
  });
  faceMesh.onResults((results) => {
    if (isUnmounted.value) return;
    const lm = results.multiFaceLandmarks?.[0] ?? null;
    currentLandmarks = lm;
    applyFaceStatus(lm ? checkFaceFromLandmarks(lm) : "no_face");
    detectBusy = false;
  });
  await faceMesh.initialize();
  meshReady.value = true;
}

function startRenderLoop() {
  if (renderLoopId) return;
  function renderFrame(ts) {
    if (isUnmounted.value) {
      renderLoopId = null;
      return;
    }
    const video = videoRef.value;
    if (
      !detectBusy &&
      faceMesh &&
      video &&
      video.readyState >= 2 &&
      ts - lastDetectTs >= DETECT_MS
    ) {
      detectBusy = true;
      lastDetectTs = ts;
      faceMesh.send({ image: video }).catch(() => {
        detectBusy = false;
      });
    }
    renderAnimatedMesh(ts, currentLandmarks);
    renderLoopId = requestAnimationFrame(renderFrame);
  }
  renderLoopId = requestAnimationFrame(renderFrame);
}

function stopRenderLoop() {
  if (renderLoopId) {
    cancelAnimationFrame(renderLoopId);
    renderLoopId = null;
  }
  detectBusy = false;
  currentLandmarks = null;
  const c = canvasRef.value;
  if (c) c.getContext("2d").clearRect(0, 0, c.width, c.height);
}

// ─── WebSocket ────────────────────────────────────────────────────────────────
let ws = null,
  captureCanvas = null,
  frameIntervalId = null;

function startSendingFrames() {
  if (frameIntervalId) return;
  captureCanvas = document.createElement("canvas");
  frameIntervalId = setInterval(() => {
    const video = videoRef.value;
    if (!video || ws?.readyState !== WebSocket.OPEN) return;
    const vw = video.videoWidth || 480,
      vh = video.videoHeight || 480;
    captureCanvas.width = vw;
    captureCanvas.height = vh;
    captureCanvas.getContext("2d").drawImage(video, 0, 0, vw, vh);
    ws.send(captureCanvas.toDataURL("image/jpeg", 0.7).split(",")[1]);
  }, FRAME_MS);
}

function stopSendingFrames() {
  clearInterval(frameIntervalId);
  frameIntervalId = null;
}

function handleWSData(data) {
  console.group("[WS DATA]");
  console.log("hr           :", data?.hr);
  console.log("hrv          :", data?.hrv);
  console.log("hrv keys     :", data?.hrv ? Object.keys(data.hrv) : "—");
  console.log("breathing_rate:", data?.hrv?.breathing_rate);
  console.log("sdnn         :", data?.hrv?.sdnn);
  console.log("rmssd        :", data?.hrv?.rmssd);
  console.log("ibi          :", data?.hrv?.ibi);
  console.log("sbp / dbp    :", data?.sbp, "/", data?.dbp);
  console.log("sqi          :", data?.sqi); // ← tambah
  console.log("top-level keys:", Object.keys(data)); // ← tambah
  console.log(
    "bvp length   :",
    Array.isArray(data?.bvp) ? data.bvp.length : "bukan array",
  );
  console.log("full object  :", data);
  console.groupEnd();

  latestMetrics.value = data;
  latestSqi.value = data?.sqi ?? null; // ← tambah

  tryUpdateBestSnapshot(data);

  const bvp = data.bvp;
  if (Array.isArray(bvp) && bvp.length > 0) {
    bvpBuffer.value = bvp.slice(-BVP_BUFFER_SIZE);
    bvpEmptyCount = 0;
  } else {
    bvpEmptyCount++;
    if (bvpEmptyCount >= 3) bvpBuffer.value = [];
  }
}

function connectWS() {
  if (ws) return;
  ws = new WebSocket(WS_URL);
  ws.onopen = () => startSendingFrames();
  ws.onmessage = (e) => {
    if (isUnmounted.value || scanComplete.value) return;
    try {
      handleWSData(JSON.parse(e.data));
    } catch {}
  };
  ws.onerror = () => {
    cameraActive.value = false;
  };
  ws.onclose = () => stopSendingFrames();
}

function disconnectWS() {
  stopSendingFrames();
  ws?.close(1000, "done");
  ws = null;
}

// ─── Camera ───────────────────────────────────────────────────────────────────
let mediaStream = null;

async function startCamera() {
  try {
    mediaStream = await navigator.mediaDevices.getUserMedia({
      video: {
        width: { ideal: 640 },
        height: { ideal: 480 },
        facingMode: "user",
      },
      audio: false,
    });
    const video = videoRef.value;
    video.srcObject = mediaStream;
    await new Promise((resolve) => {
      video.onloadedmetadata = resolve;
    });

    videoW = video.videoWidth || 640;
    videoH = video.videoHeight || 480;

    await new Promise((r) => requestAnimationFrame(r));
    const canvas = canvasRef.value;
    if (canvas) {
      const rect = canvas.getBoundingClientRect();
      const dW = Math.round(rect.width) || videoW;
      const dH = Math.round(rect.height) || videoH;
      canvas.width = dW;
      canvas.height = dH;
      coverS = Math.max(dW / videoW, dH / videoH);
      coverOX = (videoW * coverS - dW) / 2;
      coverOY = (videoH * coverS - dH) / 2;
    }

    cameraActive.value = true;
    connectWS();
    startRenderLoop();
  } catch (err) {
    console.error("[Camera] getUserMedia error:", err);
  }
}

function stopCameraHard() {
  stopRenderLoop();
  disconnectWS();
  if (mediaStream) {
    mediaStream.getTracks().forEach((t) => t.stop());
    mediaStream = null;
  }
  if (videoRef.value) videoRef.value.srcObject = null;
  cameraActive.value = false;
  faceStatus.value = "no_face";
}

// ─── Result mapping ───────────────────────────────────────────────────────────
function mapMetricsToResult(m) {
  return {
    heart_rate: m?.hr ?? null,
    breath_rate: m?.hrv?.breathing_rate ?? null,
    hrv: m?.hrv?.sdnn ?? null,
    rmssd: m?.hrv?.rmssd ?? null,
    ibi: m?.hrv?.ibi ?? null,
    systole: m?.sbp ?? null,
    diastole: m?.dbp ?? null,
  };
}

// ─── Scan complete ────────────────────────────────────────────────────────────
const emit = defineEmits(["scan-complete", "upload-start", "upload-done"]);
let isUploadDone = false;

async function sendResult() {
  if (isUploadDone) return;
  if (USE_MOCK_API) {
    await new Promise((r) => setTimeout(r, 1500));
    isUploadDone = true;
    emit("upload-done", resultAPI[0]);
    return;
  }

  // ─── Gunakan bestSnapshot jika ada, fallback ke latestMetrics ────────────
  const source = bestSnapshot ?? latestMetrics.value;
  isUploadDone = true;
  emit("upload-done", mapMetricsToResult(source));
}

function onScanComplete() {
  cancelAnimationFrame(arAnimId);
  arAnimId = null;
  emit("upload-start");
  emit("scan-complete");
  stopCameraHard();
  sendResult();
}

// ─── Reset ────────────────────────────────────────────────────────────────────
function resetScan() {
  scanComplete.value = false;
  scanProgress.value = 0;
  scanStartMs = null;
  accumulatedMs = 0;
  pauseStartMs = null;
  isGazePaused.value = false;
  faceStatus.value = "no_face";
  isUploadDone = false;
  latestMetrics.value = null;
  bvpBuffer.value = [];
  bvpEmptyCount = 0;
  cancelAnimationFrame(arAnimId);
  arAnimId = null;
  isUnmounted.value = false;
  resetBestSnapshot(); // ← reset untuk scan baru
  startCamera();
}

// ─── Lifecycle ────────────────────────────────────────────────────────────────
onMounted(async () => {
  isUnmounted.value = false;
  await initFaceMesh();
  if (props.autoStart) await startCamera();
});
onUnmounted(() => {
  isUnmounted.value = true;
  cancelAnimationFrame(arAnimId);
  arAnimId = null;
  stopCameraHard();
});

defineExpose({
  resetScan,
  latestSqi, // ← tambah
  stopCamera: () => {
    cancelAnimationFrame(arAnimId);
    arAnimId = null;
    stopCameraHard();
  },
  startCamera: () => {
    isUnmounted.value = false;
    resetScan();
  },
});
</script>

<template>
  <div
    class="w-full h-full flex flex-col justify-between rounded-t-2xl rounded-b-xl overflow-hidden"
  >
    <!-- ── Camera area ──────────────────────────────────────────────────────── -->
    <div
      class="relative w-full h-[70%] shrink-0 overflow-hidden bg-black rounded-t-2xl"
    >
      <video
        ref="videoRef"
        autoplay
        playsinline
        muted
        class="absolute inset-0 w-full h-full object-cover pointer-events-none"
        style="transform: scaleX(-1)"
      />

      <canvas
        ref="canvasRef"
        class="absolute inset-0 w-full h-full pointer-events-none"
        style="transform: scaleX(-1)"
      />

      <!-- Dashed oval guide when no face -->
      <Transition name="fade-overlay">
        <div
          v-if="!hasFace"
          class="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
          <div
            :style="{
              width: '52%',
              height: '84%',
              borderRadius: '9999px',
              border: `1.5px dashed ${ovalGuideColor}`,
              opacity: 0.3,
            }"
          />
        </div>
      </Transition>

      <!-- Loading -->
      <Transition name="fade-overlay">
        <div
          v-if="!meshReady"
          class="absolute inset-0 flex items-center justify-center bg-black/60 pointer-events-none"
        >
          <div class="flex flex-col items-center gap-3">
            <div
              class="w-6 h-6 rounded-full border-2 border-[#4ade80]/40 border-t-[#4ade80] animate-spin"
            />
            <span
              class="text-[10px] font-mono text-white/50 uppercase tracking-widest"
              >Memuat Model...</span
            >
          </div>
        </div>
      </Transition>

      <!-- Position guidance -->
      <Transition name="fade-overlay">
        <div
          v-if="hasFace && faceStatus !== 'ok'"
          class="absolute bottom-20 left-1/2 -translate-x-1/2 pointer-events-none"
        >
          <span
            class="text-[10px] font-mono uppercase tracking-widest px-3 py-1.5 rounded-full"
            style="background: rgba(0, 0, 0, 0.55); color: #fb923c"
          >
            {{ faceGuidanceText }}
          </span>
        </div>
      </Transition>

      <!-- TOP-LEFT dot + label -->
      <div
        class="absolute top-4 left-4 flex items-center gap-1.5 pointer-events-none"
      >
        <span
          class="w-1.5 h-1.5 rounded-full transition-colors duration-300"
          :class="
            isDetecting
              ? 'bg-[#4ade80] animate-pulse'
              : hasFace
                ? 'bg-amber-400'
                : 'bg-white/30'
          "
        />
        <span
          class="text-[9px] font-mono uppercase tracking-widest transition-colors duration-300"
          :class="
            isDetecting
              ? 'text-[#4ade80]'
              : hasFace
                ? 'text-amber-400'
                : 'text-white/40'
          "
        >
          {{ faceGuidanceText }}
        </span>
      </div>

      <!-- TOP-CENTER badge -->
      <div class="absolute top-4 left-1/2 -translate-x-1/2">
        <div
          class="px-3 py-1 rounded-full text-[11px] font-medium flex items-center gap-1.5 backdrop-blur-md border transition-all duration-300"
          :class="
            isDetecting
              ? 'bg-[#4ade80]/15 border-[#4ade80]/30 text-[#4ade80]'
              : hasFace
                ? 'bg-amber-400/15 border-amber-400/30 text-amber-400'
                : 'bg-black/30 border-white/10 text-white/60'
          "
        >
          <div
            class="w-2 h-2 rounded-full"
            :class="
              isDetecting
                ? 'bg-[#4ade80] animate-pulse'
                : hasFace
                  ? 'bg-amber-400'
                  : 'bg-white/30'
            "
          />
          {{
            isDetecting
              ? "Scanning..."
              : hasFace
                ? "Posisikan Wajah"
                : "Mencari..."
          }}
        </div>
      </div>

      <!-- BOTTOM PROGRESS -->
      <div
        v-if="scanProgress > 0"
        class="absolute bottom-0 left-0 right-0 px-5 pb-5 pt-10 bg-gradient-to-t from-black/70 to-transparent pointer-events-none"
      >
        <div class="flex items-center justify-between mb-1.5">
          <span
            class="text-[9px] font-mono uppercase tracking-widest"
            :class="isGazePaused ? 'text-amber-400/80' : 'text-[#4ade80]/80'"
          >
            {{ isGazePaused ? "Paused" : "Tracking" }}
          </span>
          <span class="text-[9px] font-mono text-white/40">
            {{ scanProgress < 1 ? 1 : Math.round(scanProgress) }}%
          </span>
        </div>
        <div class="w-full h-[2px] bg-white/10 rounded-full overflow-hidden">
          <div
            class="h-full rounded-full transition-all duration-300"
            :class="isGazePaused ? 'bg-amber-400/70' : 'bg-[#4ade80]'"
            :style="{ width: `${scanProgress}%` }"
          />
        </div>
      </div>
    </div>

    <!-- ── Bottom section ───────────────────────────────────────────────────── -->
    <div
      class="flex-1 flex flex-col justify-between py-14 items-center bg-[#FFFFFF]"
    >
      <div class="w-full flex justify-center items-center text-center">
        <p>Point the Camera at Your Face <br />Camera Will Detect!</p>
      </div>

      <!-- Live Metrics -->
      <div class="w-full flex justify-center items-center gap-8 py-2">
        <div class="flex flex-col items-center gap-0.5">
          <span
            class="text-[10px] text-[#A0A0A0] uppercase tracking-widest font-mono"
            >Heart Rate</span
          >
          <span
            class="text-[26px] font-semibold text-[#1A1A1A] font-mono leading-none"
            >{{ displayHR }}</span
          >
          <span class="text-[9px] text-[#C0C0C0] font-mono">bpm</span>
        </div>
        <div class="w-px self-stretch bg-[#E5E5E5]" />
        <div class="flex flex-col items-center gap-0.5">
          <span
            class="text-[10px] text-[#A0A0A0] uppercase tracking-widest font-mono"
            >Breathing</span
          >
          <span
            class="text-[26px] font-semibold text-[#1A1A1A] font-mono leading-none"
            >{{ displayBreathing }}</span
          >
          <span class="text-[9px] text-[#C0C0C0] font-mono">rpm</span>
        </div>
      </div>

      <!-- BVP Signal -->
      <div class="w-full px-4">
        <div
          class="w-full h-[68px] rounded-xl overflow-hidden relative flex items-center justify-center transition-colors duration-500"
          :class="
            hasBvpSignal
              ? 'bg-[#F0FDF4] border border-[#BBF7D0]'
              : 'bg-[#F9FAFB] border border-[#E5E7EB]'
          "
        >
          <Transition name="fade-overlay">
            <div v-if="hasBvpSignal" class="absolute inset-0">
              <svg
                class="w-full h-full"
                viewBox="0 0 300 56"
                preserveAspectRatio="none"
              >
                <defs>
                  <linearGradient id="bvp-fade" x1="0" x2="1" y1="0" y2="0">
                    <stop offset="0%" stop-color="#22C55E" stop-opacity="0" />
                    <stop offset="20%" stop-color="#22C55E" stop-opacity="1" />
                    <stop offset="100%" stop-color="#22C55E" stop-opacity="1" />
                  </linearGradient>
                </defs>
                <polyline
                  :points="bvpPoints"
                  fill="none"
                  stroke="url(#bvp-fade)"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <span
                class="absolute right-3 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#22C55E] animate-pulse"
              />
            </div>
          </Transition>
          <Transition name="fade-overlay">
            <p
              v-if="!hasBvpSignal"
              class="text-[10px] font-mono text-[#9CA3AF] uppercase tracking-widest"
            >
              Sinyal kurang baik
            </p>
          </Transition>
        </div>
      </div>

      <!-- Scan Complete -->
      <Transition name="fade-overlay">
        <div
          v-if="scanComplete"
          class="w-full flex justify-center items-center"
        >
          <div
            class="flex flex-row gap-x-3 items-center rounded-full px-5 py-2.5 bg-[#DDF7E5]"
          >
            <div class="relative w-3 h-3">
              <span
                class="absolute inset-0 rounded-full animate-ping bg-[#22C55E]/40"
              />
              <span class="relative block w-3 h-3 rounded-full bg-[#22C55E]" />
            </div>
            <p class="text-[15px] font-medium tracking-[0.02em] text-[#15803D]">
              Scan Complete
            </p>
          </div>
        </div>
      </Transition>
    </div>
  </div>
</template>

<style scoped>
.fade-overlay-enter-active {
  transition: opacity 0.35s ease;
}
.fade-overlay-leave-active {
  transition: opacity 0.25s ease;
}
.fade-overlay-enter-from,
.fade-overlay-leave-to {
  opacity: 0;
}
</style>
