import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
// import react from "@vitejs/plugin-react"; // ← tambah di baris import atas
import path from "path"; // <-- tambahkan ini
import vueDevTools from "vite-plugin-vue-devtools";
import { visualizer } from "rollup-plugin-visualizer";
import { workshopStaticMeta } from "./build/workshopStaticMeta.js";

// "tailwindcss": "^3.3.5",

// Menyalakan mode "cross-origin isolated" HANYA pada route pemindai.
//
// Efeknya satu: browser mengizinkan SharedArrayBuffer, dan SDK rPPG memakai
// itu untuk membuka thread tambahan. Lihat seleris_rppg_worker.js — jumlah
// thread ONNX-nya dipilih begini:
//   numThreads = self.crossOriginIsolated ? min(4, hardwareConcurrency) : 1
// Tanpa header ini angkanya SELALU 1, dan berkas berulir yang sudah ikut
// dipaketkan menganggur.
//
// SEBELUMNYA dipasang lewat server.headers, yang berlaku untuk SELURUH situs —
// dan itu mematikan <iframe> Google Maps di bagian "Get In Touch". Penyebabnya
// halus: COEP "credentialless" melonggarkan pemuatan SUBRESOURCE lintas-origin,
// tetapi tidak berlaku untuk dokumen bersarang. Sebuah iframe lintas-origin
// tetap harus mengirim COEP-nya sendiri agar boleh disematkan, dan Google Maps
// tidak melakukannya. Hasilnya iframe itu diblokir tanpa pesan apa pun.
//
// Karena /face-tracking adalah route standalone yang tidak memuat Touch.vue
// maupun TouchMobile.vue, mempersempit cakupannya tidak mengorbankan apa pun.
// Pola ini juga yang harus dipakai di nginx produksi.
const RUTE_TERISOLASI = ["/face-tracking", "/vendor/seleris-rppg/"];

const perluIsolasi = (url = "") =>
  RUTE_TERISOLASI.some((awalan) => url.startsWith(awalan));

const isolasiPemindai = () => {
  // Dipasang langsung, bukan dikembalikan sebagai fungsi. Middleware yang
  // dikembalikan berjalan SETELAH middleware bawaan Vite — terlambat, karena
  // saat itu responsnya sudah terkirim dan header tidak lagi bisa ditambahkan.
  const pasang = (server) => {
    server.middlewares.use((req, res, next) => {
      if (perluIsolasi(req.url)) {
        res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
        res.setHeader("Cross-Origin-Embedder-Policy", "credentialless");
      }
      next();
    });
  };

  return {
    name: "isolasi-pemindai",
    configureServer: pasang,
    configurePreviewServer: pasang,
  };
};

export default defineConfig({
  server: {
    allowedHosts: ["954cd8c1ef8e.ngrok-free.app"],
    port: 5179,
    proxy: {
      "/api": {
        target:
          process.env.VITE_PROXY_TARGET || "https://sentris-api.seleris.ai",
        changeOrigin: true,
      },
    },
  },
  plugins: [
    vue(),
    isolasiPemindai(),
    workshopStaticMeta(),
    // react(),
    process.env.ANALYZE === "true" &&
      visualizer({
        open: true,
        gzipSize: true,
        brotliSize: true,
        filename: "dist/stats.html",
      }),
    // Devtools ikut menghabiskan main thread. Untuk menguji pemindaian
    // rPPG yang butuh 24 Hz, matikan dengan: npm run dev:scan
    process.env.NODE_ENV === "development" &&
      process.env.NO_DEVTOOLS !== "true" &&
      vueDevTools(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // <-- alias '@' ke 'src'
      "@productComponents": path.resolve(
        __dirname,
        "./src/components/Products/ReusableComponents",
      ), // <-- alias '@' ke 'src'
    },
  },
  build: {
    target: "es2018",
    cssCodeSplit: true,
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("apexcharts")) return "charts";
            if (id.includes("quill")) return "editor";
            if (id.includes("swiper")) return "swiper";
            if (id.includes("lodash")) return "lodash";
            if (id.includes("/gsap/")) return "animation";
            return "vendor";
          }
        },
      },
    },
  },
});
