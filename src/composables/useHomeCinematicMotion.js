import { nextTick, onBeforeUnmount, onMounted } from "vue";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const KONDISI_MEDIA = {
  desktop: "(min-width: 1024px)",
  mobile: "(max-width: 1023px)",
  ruangStack: "(min-height: 560px)",
  kurangiGerak: "(prefers-reduced-motion: reduce)",
};

const BATAS_NAVBAR = 112;
const isiSection = (section) => section?.firstElementChild;

// Animasikan kelompok konten, bukan root pemilik modal atau panel sticky.
// Background absolut dan modal fixed harus tetap mengikuti posisi aslinya.
const kelompokKonten = (section) =>
  Array.from(isiSection(section)?.children ?? []).filter((elemen) => {
    const gaya = getComputedStyle(elemen);
    return (
      !["absolute", "fixed"].includes(gaya.position) &&
      gaya.display !== "none" &&
      elemen.getBoundingClientRect().height > 0
    );
  });

export function useHomeCinematicMotion(heroRef) {
  let media;
  let sectionHalaman = [];
  const atributAos = new Map();
  let pengamatUkuran;
  let timerRefresh;
  let tanganiKontenSiap;
  let tanganiFokus;
  let areaHalaman;
  let aktif = true;

  const jadwalkanRefresh = () => {
    if (!aktif) return;
    clearTimeout(timerRefresh);
    timerRefresh = setTimeout(() => {
      if (aktif) ScrollTrigger.refresh();
    }, 160);
  };

  onMounted(async () => {
    await nextTick();
    if (!aktif || !heroRef.value) return;

    const hero = heroRef.value;
    areaHalaman = hero.parentElement;
    sectionHalaman = Array.from(
      areaHalaman.querySelectorAll("[data-home-motion]"),
    );
    sectionHalaman.forEach((section) =>
      section.classList.add("home-motion-managed"),
    );

    sectionHalaman.forEach((section) => {
      section.querySelectorAll("[data-aos]").forEach((elemen) => {
        atributAos.set(elemen, elemen.getAttribute("data-aos"));
        elemen.removeAttribute("data-aos");
      });
    });

    const pasangAnimasi = () => {
      if (!aktif || media) return;
      media = gsap.matchMedia();
      media.add(KONDISI_MEDIA, (context) => {
        const { desktop, ruangStack, kurangiGerak } = context.conditions;
        if (kurangiGerak) return;

        const base = sectionHalaman.find((el) =>
          el.hasAttribute("data-home-stack-base"),
        );
        const cover = sectionHalaman.find((el) =>
          el.hasAttribute("data-home-stack-cover"),
        );
        const pintu = sectionHalaman.find((el) =>
          el.hasAttribute("data-home-door"),
        );
        const bolehStack =
          desktop &&
          ruangStack &&
          base &&
          cover &&
          base.offsetHeight < window.innerHeight - BATAS_NAVBAR - 32;
        const reveal = [];

        const pasangReveal = (section) => {
          const zoom = section.dataset.homeReveal === "zoom";
          kelompokKonten(section).forEach((blok) => {
            const tween = gsap.from(blok, {
              y: desktop ? 32 : 22,
              scale: zoom ? 0.96 : 1,
              autoAlpha: 0,
              transformOrigin: "50% 0%",
              duration: desktop ? 0.8 : 0.6,
              ease: "power3.out",
              // Setelah reveal selesai, modal/fixed descendant tidak terkurung
              // oleh transform identitas yang tertinggal pada parent.
              clearProps: "transform,opacity,visibility,transformOrigin",
              scrollTrigger: {
                id: "home-reveal",
                trigger: blok,
                start: "top 92%",
                once: true,
                onLeave: (self) => self.animation?.progress(1),
              },
            });
            reveal.push({ blok, tween });
          });
        };

        // Urutan DOM penting: pin dihitung sebelum trigger section di bawahnya.
        sectionHalaman.forEach((section) => {
          if (section === hero) {
            if (desktop) {
              gsap.to(isiSection(hero), {
                scale: 0.9,
                transformOrigin: "50% 100%",
                ease: "none",
                scrollTrigger: {
                  id: "home-hero",
                  trigger: hero,
                  start: "top top",
                  end: "bottom top",
                  scrub: 0.25,
                  invalidateOnRefresh: true,
                },
              });
            }
            return;
          }

          // Description sudah memiliki sticky panel dan kemajuan scroll sendiri.
          if (section.hasAttribute("data-home-native")) return;

          if (section === base && bolehStack) {
            base.classList.add("home-stack-ready");
            cover.classList.add("home-stack-ready");
            gsap.set(base, { zIndex: 1 });
            gsap.set(cover, { zIndex: 2 });

            ScrollTrigger.create({
              id: "home-stack-pin",
              trigger: base,
              start: `top ${BATAS_NAVBAR}px`,
              endTrigger: cover,
              end: `top ${BATAS_NAVBAR}px`,
              pin: true,
              pinSpacing: false,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            });

            gsap.to(isiSection(base), {
              scale: 0.94,
              opacity: 0.6,
              transformOrigin: "50% 0%",
              ease: "none",
              scrollTrigger: {
                id: "home-stack-depth",
                trigger: cover,
                // Kedalaman mulai berubah hanya setelah layer benar-benar
                // menyentuh Benefits, bukan sewaktu Benefits sedang dibaca.
                start: () => `top ${BATAS_NAVBAR + base.offsetHeight}px`,
                end: `top ${BATAS_NAVBAR}px`,
                scrub: true,
                invalidateOnRefresh: true,
              },
            });
            return;
          }

          if (section === cover && bolehStack) {
            gsap.from(isiSection(cover), {
              scale: 0.96,
              transformOrigin: "50% 0%",
              ease: "none",
              scrollTrigger: {
                id: "home-stack-cover",
                trigger: cover,
                start: "top 95%",
                end: "top 58%",
                scrub: 0.25,
                invalidateOnRefresh: true,
              },
            });
            return;
          }

          if (section === pintu && desktop) {
            const kiri = pintu.querySelector("[data-home-door-left]");
            const kanan = pintu.querySelector("[data-home-door-right]");
            const cahaya = pintu.querySelector("[data-home-door-light]");
            pintu.classList.add("home-door-ready");

            // Pintu mengikuti masuknya kartu. Tidak menahan panel setinggi
            // 800px di viewport laptop 768px sehingga isinya tetap bisa dibaca.
            gsap
              .timeline({
                scrollTrigger: {
                  id: "home-door",
                  trigger: pintu,
                  start: "top 90%",
                  end: "top 34%",
                  scrub: 0.3,
                  invalidateOnRefresh: true,
                },
              })
              .fromTo(
                isiSection(pintu),
                { scale: 0.94, transformOrigin: "50% 0%" },
                { scale: 1, ease: "none", duration: 1 },
                0,
              )
              .fromTo(
                kiri,
                { rotateY: 0, xPercent: 0, autoAlpha: 1 },
                { rotateY: -92, xPercent: -8, duration: 1, ease: "none" },
                0,
              )
              .fromTo(
                kanan,
                { rotateY: 0, xPercent: 0, autoAlpha: 1 },
                { rotateY: 92, xPercent: 8, duration: 1, ease: "none" },
                0,
              )
              .fromTo(
                cahaya,
                { autoAlpha: 0.6 },
                { autoAlpha: 0, duration: 0.35, ease: "none" },
                0,
              )
              .to([kiri, kanan], { autoAlpha: 0, duration: 0.3 }, 0.7);
            return;
          }

          pasangReveal(section);
        });

        // Konten yang mendapat fokus keyboard harus langsung terbaca.
        tanganiFokus = (event) => {
          reveal.forEach(({ blok, tween }) => {
            if (blok.contains(event.target)) tween.progress(1);
          });
        };
        areaHalaman.addEventListener("focusin", tanganiFokus);

        return () => {
          areaHalaman.removeEventListener("focusin", tanganiFokus);
          [base, cover].forEach((el) =>
            el?.classList.remove("home-stack-ready"),
          );
          pintu?.classList.remove("home-door-ready");
        };
      });
    };

    tanganiKontenSiap = () => {
      pasangAnimasi();
      jadwalkanRefresh();
    };
    document.addEventListener("seleris:content-ready", tanganiKontenSiap);
    // Reveal sekali putar baru dimulai ketika gerbang loading sudah membuka.
    if (document.body.style.overflow !== "hidden") pasangAnimasi();
    areaHalaman.addEventListener("load", jadwalkanRefresh, true);
    document.fonts?.ready.then(jadwalkanRefresh);

    // Hanya ukuran layout yang diamati. Transform/opacity animasi tidak
    // memicu refresh berulang, dan blog/font/bahasa tetap terukur ulang.
    if (typeof ResizeObserver !== "undefined") {
      const ukuranTerakhir = new WeakMap();
      pengamatUkuran = new ResizeObserver((entries) => {
        let berubah = false;
        entries.forEach(({ target, contentRect }) => {
          const ukuran = `${Math.round(contentRect.width)}:${Math.round(contentRect.height)}`;
          if (ukuranTerakhir.get(target) !== ukuran) {
            ukuranTerakhir.set(target, ukuran);
            berubah = true;
          }
        });
        if (berubah) jadwalkanRefresh();
      });
      sectionHalaman.forEach((section) =>
        pengamatUkuran.observe(isiSection(section)),
      );
    }

    jadwalkanRefresh();
  });

  onBeforeUnmount(() => {
    aktif = false;
    clearTimeout(timerRefresh);
    pengamatUkuran?.disconnect();
    media?.revert();
    document.removeEventListener("seleris:content-ready", tanganiKontenSiap);
    areaHalaman?.removeEventListener("load", jadwalkanRefresh, true);
    atributAos.forEach((nilai, elemen) =>
      elemen.setAttribute("data-aos", nilai),
    );
    atributAos.clear();
    sectionHalaman.forEach((section) =>
      section.classList.remove("home-motion-managed"),
    );
  });
}
