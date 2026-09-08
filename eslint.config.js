import js from "@eslint/js";
import pluginVue from "eslint-plugin-vue";
import prettier from "eslint-config-prettier";
import globals from "globals";

/**
 * Konfigurasi ESLint — "pemeriksa ejaan" untuk kode.
 *
 * Jalankan dengan:
 *   npm run lint        -> tampilkan semua masalah
 *   npm run lint:fix    -> perbaiki otomatis yang bisa diperbaiki
 *
 * Aturan yang dipakai sengaja fokus ke kesalahan NYATA (kode yang tidak
 * berjalan sebagaimana mestinya), bukan selera penulisan. Urusan rapi-rapi
 * format sudah ditangani Prettier.
 */
export default [
  {
    // Jangan periksa berkas hasil build dan pustaka pihak ketiga
    ignores: [
      "dist/**",
      "node_modules/**",
      "public/**",
      ".vite/**", // cache Vite — kode pustaka orang lain, bukan kode kita
      "*.min.js",
    ],
  },

  js.configs.recommended,
  ...pluginVue.configs["flat/recommended"],

  {
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser, // window, document, localStorage, dsb.
        ...globals.node, // process, __dirname (dipakai vite.config.js)
      },
    },
    rules: {
      // --- Kesalahan yang benar-benar bikin bug ---

      // Komponen dipakai di <template> tapi lupa di-import.
      // Ini yang dulu terjadi pada <Roadmap /> di Home.vue.
      "vue/no-undef-components": [
        "error",
        {
          // Komponen yang didaftarkan secara global, jadi memang tidak
          // di-import di tiap berkas: bawaan vue-router dan apexchart
          // (lihat app.component("apexchart", ...) di src/main.js).
          ignorePatterns: ["router-view", "router-link", "apexchart"],
        },
      ],

      // v-else yang menempel pada v-if yang salah, seperti bug sidebar
      // halaman Seleris Credit yang membuat dua menu tampil bersamaan.
      "vue/valid-v-else": "error",
      "vue/valid-v-if": "error",

      // Import atau variabel yang tidak pernah dipakai. Sepanjang sesi
      // pembersihan ditemukan 9 kasus, salah satunya menyeret berkas 5,8 MB
      // ikut terunduh pengunjung tanpa pernah tampil.
      "no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],

      // Dua atribut yang sama di satu elemen — yang kedua diam-diam menang.
      "vue/no-duplicate-attributes": "error",

      // v-for tanpa :key membuat Vue salah memakai ulang elemen saat daftar
      // berubah, gejalanya isi kartu tertukar-tukar.
      "vue/require-v-for-key": "error",

      // --- Dimatikan: urusan selera penulisan, bukan bug ---

      // Urutan atribut dan tanda hubung pada nama atribut. Konvensi Vue
      // memang menyarankan pola tertentu, tapi seluruh project sudah
      // konsisten dengan gaya lain dan mengubahnya tidak memperbaiki apa pun.
      "vue/attributes-order": "off",
      "vue/attribute-hyphenation": "off",
      "vue/v-on-event-hyphenation": "off",
      "vue/prop-name-casing": "off",
      "vue/component-definition-name-casing": "off",

      // Menuntut nilai bawaan untuk setiap prop. Berguna di project besar
      // bertim banyak; di sini hanya menghasilkan 136 peringatan tanpa
      // menunjuk satu pun kesalahan nyata.
      "vue/require-default-prop": "off",

      // v-html dipakai sengaja untuk menampilkan isi artikel dari API,
      // dan sudah dibersihkan memakai DOMPurify.
      "vue/no-v-html": "off",

      // --- Diturunkan jadi peringatan ---

      // Nama komponen satu kata (mis. Navbar.vue). Konvensi Vue menyarankan
      // dua kata, tapi seluruh project ini sudah terlanjur begitu; mengubahnya
      // sekarang berisiko tanpa manfaat nyata.
      "vue/multi-word-component-names": "off",

      // console.log biasanya sisa saat menelusuri masalah. Dibiarkan sebagai
      // peringatan supaya terlihat, tanpa menggagalkan pemeriksaan.
      "no-console": "warn",
      "no-debugger": "warn",
    },
  },

  // Harus paling akhir: mematikan aturan ESLint yang berebut dengan Prettier
  prettier,
];
