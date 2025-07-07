/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  safelist: ["bg-benefits"], // ⬅ tambahkan ini
  theme: {
    extend: {
      backgroundImage: {
        hero: "url('@/assets/images/hero-banner.png')",
        different: "url('@/assets/images/different-background.png')",
        cert: "url('@/assets/images/bg-cert.png')",
        benefits: "url('@/assets/images/bg-benefits.png')",
        leftCertBefore:
          "url('@/assets/images/certification/left-frame-before.png')",
        centerCertBefore:
          "url('@/assets/images/certification/center-frame-before.png')",
        rightCertBefore:
          "url('@/assets/images/certification/right-frame-before.png')",
        leftCertAfter:
          "url('@/assets/images/certification/left-frame-after.png')",
        centerCertAfter:
          "url('@/assets/images/certification/center-frame-after.png')",
        rightCertAfter:
          "url('@/assets/images/certification/right-frame-after.png')",
      },
      screens: {
        // sml430: "430px",
        sml: {
          raw: "(min-width: 320px) and (max-width: 767px)",
        }, // Pastikan ini ada
        md: "768px", // Pastikan ini ada
        mds: "853px",
        lg: "1024px",
        xl: {
          raw: "(min-width: 1025px)",
        },
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      // Animation
      keyframes: {
        bounce: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-15%)" },
        },
        wiggle: {
          "0%, 100%": { transform: "rotate(7deg)" },
          "25%": { transform: "rotate(-7deg)" },
          "50%": { transform: "rotate(4deg)" },
          "75%": { transform: "rotate(-4deg)" },
          "100%": { transform: "rotate(7deg)" },
        },
        miniBounce: {
          "0%, 100%": { transform: "translateY(0)" },
          "30%": { transform: "translateY(-10%)" },
          "60%": { transform: "translateY(-5%)" },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-100%)" },
        },
        marquee2: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0%)" },
        },
      },
      animation: {
        bounce: "bounce 3s infinite",
        miniBounce: "miniBounce 1s ease-in-out infinite",
        wiggle: "wiggle 5s linear infinite",
        marquee: "marquee 25s linear infinite",
        marquee2: "marquee2 25s linear infinite",
      },
    },
  },
  plugins: [],
};
