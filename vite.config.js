import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path"; // <-- tambahkan ini
import vueDevTools from "vite-plugin-vue-devtools";
// import { visualizer } from "rollup-plugin-visualizer";

// "tailwindcss": "^3.3.5",

export default defineConfig({
  server: {
    allowedHosts: ["954cd8c1ef8e.ngrok-free.app"],
    port: 5179,
  },
  plugins: [
    vue(),
    // visualizer({
    //   open: true,
    //   gzipSize: true,
    //   brotliSize: true,
    //   filename: "dist/stats.html",
    // }),
    process.env.NODE_ENV === "development" && vueDevTools(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // <-- alias '@' ke 'src'
      "@productComponents": path.resolve(
        __dirname,
        "./src/components/Products/ReusableComponents"
      ), // <-- alias '@' ke 'src'
    },
  },
});
