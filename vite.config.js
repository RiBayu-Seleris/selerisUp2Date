import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path"; // <-- tambahkan ini

// "tailwindcss": "^3.3.5",

export default defineConfig({
  server: {
    allowedHosts: ["5850b2018114.ngrok-free.app"],
  },
  plugins: [vue()],
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
