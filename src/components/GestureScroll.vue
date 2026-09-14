<template>
  <div class="w-full h-full text-black flex items-center justify-center">
    <button @click="toggle">
      {{ isRunning ? "-" : "+" }}
    </button>
  </div>

  <div
    v-if="isHandDetected"
    class="fixed top-4 right-4 z-50 bg-green-500 text-white text-xs px-2 py-1 rounded"
  >
    {{ $t("misc.hand_detected") }}
  </div>

  <video ref="video" class="hidden"></video>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { Hands } from "@mediapipe/hands";
import { Camera } from "@mediapipe/camera_utils";

const props = defineProps({
  enableSidebarGesture: Boolean,
  disableScroll: Boolean,
});

const emit = defineEmits(["open-sidebar", "close-sidebar"]);

const video = ref(null);
const isRunning = ref(false);
const isHandDetected = ref(false);

let hands = null;
let camera = null;
let animationFrameId = null;
let initialized = false;

let lastHandY = null;
let lastHandX = null;
let targetVelocity = 0;
let currentVelocity = 0;
let lastSwipeTime = 0;

const FRICTION = 0.25;
const SENSITIVITY = 2500;
const DEADZONE = 0.003;
const MAX_VELOCITY = 50;
const SWIPE_THRESHOLD = 0.06;
const SWIPE_COOLDOWN = 800;

async function init() {
  if (initialized) return;

  hands = new Hands({
    locateFile: (file) =>
      `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`,
  });

  hands.setOptions({
    maxNumHands: 1,
    modelComplexity: 0,
    minDetectionConfidence: 0.5,
    minTrackingConfidence: 0.5,
  });

  hands.onResults(onResults);

  camera = new Camera(video.value, {
    onFrame: async () => {
      if (!isRunning.value) return;
      await hands.send({ image: video.value });
    },
    width: 640,
    height: 480,
  });

  initialized = true;
}

async function start() {
  await init();
  resetMotion();
  isRunning.value = true;
  camera.start();
  startScrollLoop();
}

function stop() {
  isRunning.value = false;
  isHandDetected.value = false;
  camera?.stop();
  cancelAnimationFrame(animationFrameId);
  resetMotion();
}

function toggle() {
  isRunning.value ? stop() : start();
}

function resetMotion() {
  lastHandY = null;
  lastHandX = null;
  targetVelocity = 0;
  currentVelocity = 0;
}

function onResults(results) {
  if (!results.multiHandLandmarks?.length) {
    isHandDetected.value = false;
    resetMotion();
    return;
  }

  const lm = results.multiHandLandmarks[0];
  if (lm[8].y > lm[6].y) return;

  isHandDetected.value = true;

  if (props.enableSidebarGesture && window.innerWidth < 1024) {
    const x = lm[8].x;
    if (lastHandX !== null) {
      const dx = lastHandX - x;
      const now = performance.now();

      if (
        Math.abs(dx) > SWIPE_THRESHOLD &&
        now - lastSwipeTime > SWIPE_COOLDOWN
      ) {
        dx > 0 ? emit("open-sidebar") : emit("close-sidebar");
        lastSwipeTime = now;
        resetMotion();
        return;
      }
    }
    lastHandX = x;
  }

  const y = lm[8].y;
  if (lastHandY !== null) {
    const dy = lastHandY - y;
    if (Math.abs(dy) > DEADZONE) {
      targetVelocity = Math.max(
        -MAX_VELOCITY,
        Math.min(MAX_VELOCITY, dy * SENSITIVITY),
      );
    }
  }
  lastHandY = y;
}

function startScrollLoop() {
  const loop = () => {
    if (!isRunning.value) return;

    currentVelocity += (targetVelocity - currentVelocity) * FRICTION;
    if (!props.disableScroll && Math.abs(currentVelocity) > 0.1) {
      window.scrollBy(0, currentVelocity);
    }

    animationFrameId = requestAnimationFrame(loop);
  };
  loop();
}

onUnmounted(() => {
  stop();
  hands?.close();
});
</script>
