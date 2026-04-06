import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path"; // <-- tambahkan ini
import vueDevTools from "vite-plugin-vue-devtools";
import { visualizer } from "rollup-plugin-visualizer";

// "tailwindcss": "^3.3.5",

export default defineConfig({
  base: "/selerisUp2Date/", // 🔥 TAMBAHKAN INI

  server: {
    allowedHosts: ["954cd8c1ef8e.ngrok-free.app"],
    port: 5179,
  },
  plugins: [
    vue(),
    process.env.ANALYZE === "true" &&
      visualizer({
        open: true,
        gzipSize: true,
        brotliSize: true,
        filename: "dist/stats.html",
      }),
    process.env.NODE_ENV === "development" && vueDevTools(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@productComponents": path.resolve(
        __dirname,
        "./src/components/Products/ReusableComponents",
      ),
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
            if (id.includes("lottie-web")) return "animation";
            if (id.includes("swiper")) return "swiper";
            if (id.includes("lodash")) return "lodash";
            return "vendor";
          }
        },
      },
    },
  },
});
