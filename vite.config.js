import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path"; // <-- tambahkan ini
import vueDevTools from "vite-plugin-vue-devtools";

// "tailwindcss": "^3.3.5",

export default defineConfig({
  server: {
    allowedHosts: ["42cd6d638415.ngrok-free.app"],
  },
  plugins: [
    vue(),
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
