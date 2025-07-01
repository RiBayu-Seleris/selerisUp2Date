/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        "spin-right": "spin-right 36.5s linear infinite",
        "spin-right-fast": "spin-right 8.8s linear infinite",
        "spin-right-medium": "spin-right 22s linear infinite",
        "spin-right-moon": "spin-right 3s linear infinite",
        "spin-right-mars": "spin-right 68.7s linear infinite",
      },
      keyframes: {
        "spin-right": {
          to: {
            transform: "rotate(360deg)",
          },
        },
      },
      backgroundImage: {
        "radial-green": "radial-gradient(at 50% 0%, #3CFF7A -70%, #F3F4F6 90%)",
      },
      boxShadow: {
        custom: "0 2.5rem 0 0",
      },
      screens: {
        // sml430: "430px",
        sml: {
          raw: "(min-width: 320px) and (max-width: 767px)",
        }, // Pastikan ini ada
        md: "768px", // Pastikan ini ada
        lg: "1024px",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      dropShadow: {
        "3xl": "0 35px 35px rgba(0, 0, 0, 0.25)",
        "4xl": [
          "0 35px 35px rgba(0, 0, 0, 0.25)",
          "0 45px 65px rgba(0, 0, 0, 0.15)",
        ],
      },
    },
  },
  plugins: [],
};
