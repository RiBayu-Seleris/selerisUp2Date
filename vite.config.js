import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path"; // <-- tambahkan ini

// "tailwindcss": "^3.3.5",

export default defineConfig({
  server: {
    allowedHosts: ["3a3f5ca2bc7e.ngrok-free.app"],
  },
  plugins: [vue()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // <-- alias '@' ke 'src'
    },
  },
});
