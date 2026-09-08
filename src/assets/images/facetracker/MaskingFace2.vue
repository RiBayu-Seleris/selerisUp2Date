<script setup>
// Dua lapis gambar ini dulunya tertanam sebagai base64 di dalam file .vue,
// sehingga ikut masuk ke bundel JavaScript (~340 KB) dan tidak bisa di-cache
// browser secara terpisah. Sekarang jadi berkas WebP biasa yang di-emit Vite
// sebagai aset tersendiri.
import maskLayer0 from "./mask-layer-0.webp";
import maskLayer1 from "./mask-layer-1.webp";
</script>

<template>
  <div class="relative w-full h-full overflow-hidden rounded-[inherit]">
    <!-- SVG -->
    <svg
      class="w-full h-full relative z-10"
      viewBox="0 0 281 306"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
    >
      <defs>
        <!-- ClipPath yang mengungkap SVG dari atas ke bawah -->
        <clipPath id="revealClip">
          <rect x="-10" y="-10" width="301" height="0">
            <animate
              attributeName="height"
              from="0"
              to="326"
              dur="2.5s"
              repeatCount="indefinite"
            />
          </rect>
        </clipPath>

        <mask
          id="mask0_268_8222"
          style="mask-type: alpha"
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="281"
          height="306"
        >
          <rect width="281" height="306" fill="#D9D9D9" />
        </mask>

        <pattern
          id="pattern0_268_8222"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use
            xlink:href="#image0_268_8222"
            transform="matrix(0.00106724 0 0 0.00147668 0 -0.00280806)"
          />
        </pattern>

        <pattern
          id="pattern1_268_8222"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use
            xlink:href="#image0_268_8222"
            transform="matrix(0.00106724 0 0 0.00147668 0 -0.00280806)"
          />
        </pattern>

        <pattern
          id="pattern2_268_8222"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use
            xlink:href="#image0_268_8222"
            transform="matrix(0.00106724 0 0 0.00147668 0 -0.00280806)"
          />
        </pattern>

        <pattern
          id="pattern3_268_8222"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use
            xlink:href="#image1_268_8222"
            transform="matrix(0.00106724 0 0 0.00147668 0 -0.00280806)"
          />
        </pattern>
        <image
          id="image0_268_8222"
          width="937"
          height="681"
          preserveAspectRatio="none"
          :xlink:href="maskLayer0"
        />
        <image
          id="image1_268_8222"
          width="937"
          height="681"
          preserveAspectRatio="none"
          :xlink:href="maskLayer1"
        />
      </defs>

      <!-- Grup konten di-clip agar muncul progresif dari atas ke bawah -->
      <g clip-path="url(#revealClip)">
        <g mask="url(#mask0_268_8222)">
          <rect
            x="-183.693"
            y="-16.2119"
            width="445.827"
            height="322.212"
            fill="url(#pattern0_268_8222)"
          />
          <rect
            x="-183.693"
            y="-16.2119"
            width="445.827"
            height="322.212"
            fill="url(#pattern1_268_8222)"
          />
          <rect
            x="-183.693"
            y="-16.2119"
            width="445.827"
            height="322.212"
            fill="url(#pattern2_268_8222)"
          />
          <rect
            x="-183.693"
            y="-16.2119"
            width="445.827"
            height="322.212"
            fill="url(#pattern3_268_8222)"
          />
        </g>
      </g>

      <!-- Scan line: mulai dari -10 (atas SVG) hingga 316 (bawah SVG) -->
      <line x1="-10" y1="-10" x2="291" y2="-10" stroke="white" stroke-width="2">
        <animate
          attributeName="y1"
          from="-10"
          to="316"
          dur="2.5s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="y2"
          from="-10"
          to="316"
          dur="2.5s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="opacity"
          values="0;1;1;0"
          keyTimes="0;0.05;0.95;1"
          dur="2.5s"
          repeatCount="indefinite"
        />
      </line>
    </svg>
  </div>
</template>

<style scoped>
/* scan-line CSS tidak lagi diperlukan karena sudah pakai SVG animate */
</style>
