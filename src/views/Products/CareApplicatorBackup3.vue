<script setup>
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from "vue";
import { formatNumberSeparator } from "@/components/Helper/numberFormat.js";

import ThunderIcon from "@/assets/Products/images/Care-Applicator/thunder-icon.vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

const modules = [Navigation, Pagination, Autoplay];

const testimonials = [
  {
    name: "Bapak Andi",
    location: "Bandung",
    text: `Teknologi AI-nya sangat membantu masyarakat kecil mendeteksi dini penyakit mereka dengan harga murah`,
  },
  {
    name: "Bapak Andi",
    location: "Bandung",
    text: `Teknologi AI-nya sangat membantu masyarakat kecil mendeteksi dini penyakit mereka dengan harga murah`,
  },
  {
    name: "Bapak Andi",
    location: "Bandung",
    text: `Teknologi AI-nya sangat membantu masyarakat kecil mendeteksi dini penyakit mereka dengan harga murah`,
  },
  {
    name: "Bapak Andi",
    location: "Bandung",
    text: `Teknologi AI-nya sangat membantu masyarakat kecil mendeteksi dini penyakit mereka dengan harga murah`,
  },
  {
    name: "Bapak Andi",
    location: "Bandung",
    text: `Teknologi AI-nya sangat membantu masyarakat kecil mendeteksi dini penyakit mereka dengan harga murah`,
  },
];

const whatsSelerisCare = [
  {
    id: 1,
    title: "Teknologi AI Medis",
    content: "Analisis kesehatan berbasis AI terpercaya dan akurat",
  },
  {
    id: 2,
    title: "Analisis Cepat Akurat",
    content: "Hasil cepat dengan akurasi tinggi dan konsisten",
  },
  {
    id: 3,
    title: "Non Invasif Aman",
    content: "Aman tanpa tindakan medis invasif dan nyaman",
  },
  {
    id: 4,
    title: "Mudah Praktis Digunakan",
    content: "Proses sederhana dan mudah digunakan oleh semua",
  },
];

const whatsSCAList = [
  {
    content: "Didukung sistem digital & aplikasi tracking otomatis",
  },
  {
    content: "Bukan tenaga medis? Tidak masalah!",
  },
  {
    content: "Diberikan training intensif hingga mahir",
  },
];

const whyJoinSCA = [
  {
    title: "Komisi Menarik ",
    content: "Hingga 25% dari setiap transaksi",
  },
  {
    title: "Bisnis Kesehatan",
    content: "Produk yang dibutuhkan semua orang",
  },
  {
    title: "Sistem Digital",
    content: "Aplikasi mudah, tracking otomatis",
  },
  {
    title: "Dua Sumber Income",
    content: "Komisi langsung + komisi jaringan",
  },
  {
    title: "Waktu Fleksibel",
    content: "Atur sendiri jadwal kerja Anda",
  },
  {
    title: "Training Gratis",
    content: "Pelatihan produk dan marketing",
  },
];

const membershipLevels = {
  starter: {
    name: "Starter Level",
    code: "SCA-01",
    features: [
      "Fokus: Jualan Langsung",
      "Tanpa Target Minimum",
      "Full Digital Akses",
    ],
  },
  professional: {
    name: "Professional Level",
    code: "SCA-02",
    features: [
      "Fokus: Jualan + Membangun Tim",
      "Syarat: Rekrut Minimal 1 SCA",
      "Bonus Networking 10%",
    ],
  },
};

const features = [
  "Harga",
  "Total Parameter",
  "Vital Signs",
  "Pemeriksaan Fisik",
  "Pemeriksaan Darah",
  "Komposisi Tubuh",
  "Kesehatan Mental",
  "Analisis Risiko Penyakit",
];

const packages = [
  {
    label: "Paket Dasar",
    name: "ESSENTIAL",
    price: "Rp 150.000",
    priceColor: "text-[#355F7C]",
    highlight: false,
    expanded: false,

    // DESKTOP (TABEL)
    values: [
      "15 Parameter",
      "15 Parameter",
      "15 Parameter",
      "15 Parameter",
      "15 Parameter",
      "15 Parameter",
      null,
    ],

    // MOBILE (CARD)
    mobileValues: [
      "Total 15 parameter kesehatan",
      "Cek vital signs lengkap",
      "Pemeriksaan fisik dasar",
      "Tes darah umum",
      "Analisis awal kondisi tubuh",
    ],
  },

  {
    label: "Paling Populer",
    name: "CORE",
    price: "Rp 250.000",
    priceColor: "text-[#355F7C]",
    highlight: true,
    expanded: false,

    values: [
      "15 Parameter",
      "15 Parameter",
      "15 Parameter",
      "15 Parameter",
      null,
      null,
      null,
    ],

    mobileValues: [
      "Semua fitur Essential",
      "Pemeriksaan darah lanjutan",
      "Komposisi tubuh detail",
      "Analisis risiko penyakit",
      "Rekomendasi kesehatan personal",
    ],
  },

  {
    label: "Komprehensif",
    name: "PRIME",
    price: "Rp 300.000",
    priceColor: "text-[#355F7C]",
    highlight: false,
    expanded: false,

    values: ["15 Parameter", "15 Parameter", null, null, null, null, null],

    mobileValues: [
      "Paket kesehatan paling lengkap",
      "Analisis menyeluruh seluruh sistem tubuh",
      "Kesehatan mental & stres",
      "Prediksi risiko penyakit kronis",
      "Laporan kesehatan premium",
    ],
  },
];

const contentRefs = ref([]);
const contentHeights = ref([]);

onMounted(async () => {
  await nextTick();
  contentHeights.value = contentRefs.value.map((el) => el.scrollHeight);
});

const toggleExpand = (index) => {
  packages[index].expanded = !packages[index].expanded;
};

const targetPerDay = ref(1);
const PRICE_PER_SCAN = 300000;
const DIRECT_PERCENT = 0.15;
const PASSIVE_PERCENT = 0.1;
const DAYS_PER_MONTH = 30;

const monthlyScan = computed(() => targetPerDay.value * DAYS_PER_MONTH);

const directIncome = computed(
  () => monthlyScan.value * PRICE_PER_SCAN * DIRECT_PERCENT,
);

const passiveIncome = computed(
  () => monthlyScan.value * PRICE_PER_SCAN * PASSIVE_PERCENT,
);

const series = computed(() => [
  {
    name: "Income",
    data: [directIncome.value, passiveIncome.value],
  },
]);

const chartOptions = {
  chart: {
    type: "bar",
    height: "100%",
    parentHeightOffset: 0,
    toolbar: { show: false },
  },

  plotOptions: {
    bar: {
      columnWidth: "75%",
      borderRadius: 14,
    },
  },

  colors: ["#4FE3C1"],

  dataLabels: {
    enabled: false,
  },

  grid: {
    borderColor: "#E5E7EB",
    strokeDashArray: 2,
    padding: {
      left: 10,
      right: 10,
    },
  },

  xaxis: {
    categories: ["Direct (Personal)", "Passive (Team Est.)"],
    axisBorder: { show: false },
    axisTicks: { show: false },
    labels: {
      style: {
        fontSize: "12px",
        colors: "#6B7280",
      },
    },
  },

  yaxis: {
    labels: {
      formatter: (val) => "Rp " + val.toLocaleString("id-ID"),
      style: {
        fontSize: "12px",
        colors: "#9CA3AF",
      },
    },
  },

  responsive: [
    // 📱 Mobile
    {
      breakpoint: 640,
      options: {
        grid: {
          padding: {
            left: 10,
            right: 10,
          },
        },
        xaxis: {
          labels: {
            style: {
              fontSize: "10px",
            },
          },
        },
        yaxis: {
          labels: {
            style: {
              fontSize: "10px",
            },
          },
        },
      },
    },
  ],

  tooltip: {
    y: {
      formatter: (val) => "Rp " + val.toLocaleString("id-ID"),
    },
  },
};

/* VALIDASI VALUE */
watch(targetPerDay, (val) => {
  if (!val || val < 1) targetPerDay.value = 1;
});

/* FONT SIZE (UI) */
const displaySizeClass = computed(() => {
  const len = String(targetPerDay.value).length;
  if (len >= 4) return "text-[12px]";
  if (len === 3) return "text-[14px]";
  return "text-[16px]";
});

const activeIndex = ref(0);
let interval = null;

onMounted(() => {
  interval = setInterval(() => {
    activeIndex.value = (activeIndex.value + 1) % whatsSelerisCare.length;
  }, 2500);
});

onUnmounted(() => {
  clearInterval(interval);
});
</script>

<template>
  <div class="relative w-full overflow-hidden">
    <!-- Hero -->
    <section
      class="relative w-full h-full rounded-[20px] z-20 mx-auto max-w-[1440px]"
      id="tentang"
    >
      <div
        class="relative w-full h-auto rounded-[20px] z-20 max-w-[1440px] mx-auto"
      >
        <div
          class="relative w-full h-full flex flex-col lg:flex-row pt-32 px-0 lg:px-16 xl:px-20 lg:pt-48 gap-y-10 lg:gap-x-10 xl:gap-x-0"
        >
          <!-- Phone mobile -->
          <div
            class="relative flex w-full h-auto px-8 md:px-0 lg:hidden flex-row gap-x-5 items-center justify-center lg:items-end lg:justify-end"
          >
            <figure class="w-auto h-auto">
              <img
                src="@/assets/Products/images/Care-Applicator/phone-hero.png"
                alt=""
                class="w-full h-auto md:h-[350px] object-contain"
              />
            </figure>
          </div>
          <div
            class="relative flex flex-col w-full h-auto gap-y-7 lg:gap-y-10 justify-end px-8 md:px-12 lg:px-0"
          >
            <div
              class="w-full h-auto flex flex-col gap-y-5 justify-start md:justify-normal items-start"
            >
              <div
                class="w-auto h-auto px-3 md:px-6 py-2 bg-[#3BD8BF]/20 flex flex-row gap-x-2 text-[#39D5BC] font-[600] rounded-[24px] justify-center items-center"
              >
                <img
                  src="@/assets/Products/images/Care-Applicator/thunder-icon.png"
                  alt=""
                  class="w-5 h-5 md:w-auto md:h-auto object-contain"
                />
                <span class="text-[12px] md:text-[14px] xl:text-[16px]">
                  Peluang Bisnis Tanpa Modal
                </span>
              </div>
              <div
                class="w-full h-auto flex flex-col gap-y-0 justify-normal items-start"
              >
                <p
                  class="font-[600] text-[18px] md:text-[28px] lg:text-[40px] xl:text-[46px]"
                >
                  <span class="text-[#374151]">
                    Peluang Bisnis <br class="hidden lg:block" />
                    Kesehatan Berbasis
                  </span>
                </p>
                <p
                  class="text-[#1889D1] font-[600] text-[18px] md:text-[22px] lg:text-[38px] xl:text-[40px]"
                >
                  AI Masa Depan
                </p>
              </div>
              <p
                class="text-[#374151] text-[12px] md:text-[16px] lg:text-[14px] xl:text-[18px] w-full"
              >
                Jadilah Seleris Care Applicator (SCA) dan bantu masyarakat
                memantau kesehatan secara non invasif sambil membangun
                penghasilan fleksibel yang berkelanjutan.
              </p>
            </div>
            <div
              class="w-full h-auto flex flex-col-reverse md:flex-row gap-y-3 md:gap-x-6 lg:justify-between"
            >
              <button
                aria-label="View Demo Seleris Credit"
                class="flex flex-row justify-center w-full lg:w-auto h-auto md:px-8 lg:px-4 xl:px-6 py-2.5 md:py-2 bg-[#3DDAC1] rounded-[12px] items-center gap-x-3"
              >
                <div
                  class="w-auto md:w-full h-full flex items-center justify-center"
                >
                  <span
                    class="text-[#FFFFFF] text-[14px] md:text-[16px] lg:text-[14px] xl:text-[18px] font-[500]"
                  >
                    Daftar Jadi SCA Sekarang
                  </span>
                </div>
                <div
                  class="w-auto h-auto text-[#FFFFFF] flex items-center justify-center"
                >
                  <svg
                    class="w-5 h-5 sm:w-3 sm:h-3 md:w-6 md:h-6 lg:w-5 lg:h-5 xl:w-6 xl:h-6"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M14.43 18.07L20.5 12L14.43 5.92999"
                      stroke="currentColor"
                      stroke-width="1.5"
                      stroke-miterlimit="10"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M3.50002 12L20.33 12"
                      stroke="currentColor"
                      stroke-width="1.5"
                      stroke-miterlimit="10"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </div>
              </button>
              <div
                class="w-full lg:w-auto h-auto px-4 lg:px-2 xl:px-4 py-2 bg-[#EBF7FC] rounded-[12px] flex flex-row items-center justify-center gap-x-4"
              >
                <div class="w-auto h-auto flex items-center">
                  <img
                    src="@/assets/Products/images/Care-Applicator/mitra-pictures.png"
                    alt=""
                    class="w-auto h-auto object-cover object-center"
                  />
                </div>
                <div class="w-full h-auto flex flex-col">
                  <div class="w-full h-auto flex">
                    <span class="text-[12px] font-[600]">500+ Mitra</span>
                  </div>
                  <div class="w-full h-auto flex">
                    <span class="text-[12px]">Bergabung bulan ini</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- Phone Desktop -->
          <div
            class="hidden w-full h-auto relative lg:flex flex-row items-center justify-end md:items-end lg:justify-end pr-12 lg:pr-0"
          >
            <figure class="w-auto h-auto">
              <img
                src="@/assets/Products/images/Care-Applicator/phone-hero.png"
                alt=""
                class="w-full h-[180px] md:h-[300px] lg:h-full xl:h-[450px] object-contain"
              />
            </figure>
          </div>
        </div>
      </div>
    </section>

    <!-- About -->
    <section
      class="relative w-full h-full rounded-[20px] z-20 mx-auto max-w-[1440px] px-8 md:px-12 lg:px-20 mt-40"
    >
      <div
        class="w-full h-auto py-10 md:py-14 px-4 md:px-8 lg:px-10 xl:px-12 bg-[#FAFAFA] flex flex-col gap-y-14 rounded-xl"
      >
        <div class="w-full h-auto flex flex-col gap-y-4">
          <div
            class="w-full h-auto flex items-center justify-center text-center"
          >
            <span class="font-[600] text-[24px] md:text-[32px]"
              >Apa Itu Seleris Care?</span
            >
          </div>
          <div
            class="lg:max-w-2xl mx-auto h-auto flex items-center justify-center text-center"
          >
            <span
              class="text-[12px] md:text-[16px] lg:text-[18px] font-[400] text-[#374151] leading-normal lg:leading-snug"
            >
              Layanan scanning kesehatan berbasis kecerdasan buatan dari PT
              Seleris Meditekno Internasional untuk analisis kondisi kesehatan
              yang cepat, noninvasif, dan akurat.</span
            >
          </div>
        </div>
        <div
          class="w-full h-auto grid grid-cols-2 lg:flex lg:flex-row gap-x-4 md:gap-x-8 lg:gap-x-6 xl:gap-x-5"
        >
          <div
            v-for="(data, index) in whatsSelerisCare"
            :key="data.id"
            :class="[
              'relative w-full h-[190px] md:h-[180px] lg:h-[210px] xl:h-[180px] p-[2px] rounded-2xl cursor-default',
              'transition-all duration-300 ease-out',
              (data.id === 2 || data.id === 4) && 'mt-8 md:mt-14',

              index === activeIndex &&
                'bg-gradient-to-tl from-[#13B89C00] from-60% via-[#2EDFC1] via-100% to-white -translate-y-2 shadow-[0_21px_16.9px_0_#0000001A]',
            ]"
          >
            <div
              class="w-full h-[190px] md:h-[180px] lg:h-[210px] xl:h-[180px] flex flex-col justify-between bg-white rounded-2xl p-4 lg:p-3 xl:p-4"
            >
              <div
                class="w-auto h-auto"
                :class="[
                  index === activeIndex ? 'text-white' : 'text-[#39D5BC]',
                ]"
              >
                <ThunderIcon
                  class="w-8 h-8 md:w-10 md:h-10 object-contain p-1 md:p-2 rounded-[8px]"
                  :class="[
                    index === activeIndex ? 'bg-[#39D5BC]' : 'bg-[#D8F7F2]',
                  ]"
                />
              </div>
              <div class="w-full h-auto flex flex-col gap-y-1.5">
                <div class="w-full h-auto flex">
                  <span
                    class="text-[#374151] font-[600] text-[14px] md:text-[16px] lg:text-[16px] xl:text-[16px] leading-snug"
                  >
                    {{ data.title }}
                  </span>
                </div>
                <div class="w-full h-auto flex">
                  <span
                    class="text-[#8E98A8] text-[10px] md:text-[12px] leading-normal font-[400]"
                  >
                    {{ data.content }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- APA ITU SCA -->
    <section
      class="relative w-full h-full rounded-[20px] z-20 mx-auto max-w-[1440px] px-8 md:px-12 lg:px-20 mt-20 md:mt-32 lg:mt-40"
    >
      <!-- Desktop -->
      <div class="flex relative w-full h-auto">
        <figure class="hidden lg:flex w-auto h-auto">
          <img
            src="@/assets/Products/images/Care-Applicator/about-care-applicator-frame.png"
            alt=""
            class="w-full h-auto object-cover"
          />
        </figure>
        <div
          class="lg:absolute z-20 left-0 top-0 w-full h-full flex flex-col lg:flex-row gap-y-5 md:gap-y-10 gap-x-3 p-6 md:p-10 lg:p-0 bg-gradient-to-br from-[#28B1B8] to-[#124F52] lg:bg-none rounded-[20px] lg:rounded-none"
        >
          <div
            class="w-full h-auto flex flex-col lg:px-7 xl:px-10 lg:pt-10 xl:pt-12 gap-y-6 md:gap-y-8 lg:gap-y-6 xl:gap-y-8"
          >
            <div
              class="w-full h-auto flex flex-col gap-y-6 md:gap-y-8 lg:gap-y-6 xl:gap-y-8"
            >
              <div class="w-full h-auto flex">
                <span
                  class="text-[#FFFFFF] text-[18px] md:text-[32px] lg:text-[24px] xl:text-[42px] font-[600] tracking-wider leading-snug"
                >
                  Apa Itu Seleris Care <br />
                  Applicator (SCA) ?
                </span>
              </div>
              <div class="w-full h-auto flex">
                <span
                  class="text-[12px] md:text-[16px] lg:text-[14px] xl:text-[16px] text-[#FFFFFF] leading-snug font-[400]"
                >
                  SCA adalah mitra resmi
                  <span class="font-[600]">Seleris Care</span> yang bertugas
                  memasarkan dan menyediakan layanan scanning kesehatan kepada
                  masyarakat luas menggunakan perangkat dan aplikasi digital
                  kami.
                </span>
              </div>
            </div>
            <div
              class="w-auto h-auto flex flex-col gap-y-3 md:gap-y-6 lg:gap-y-4 xl:gap-y-5 items-start"
            >
              <div
                v-for="(data, index) in whatsSCAList"
                :key="index"
                class="w-auto h-auto flex flex-row"
              >
                <div
                  class="w-auto h-auto flex flex-row bg-[#47D2B4]/40 gap-x-1.5 md:gap-x-3 py-2 px-3 md:py-1.5 md:px-5 xl:py-3 lg:px-4 xl:px-6 rounded-full"
                >
                  <div class="flex items-center">
                    <img
                      src="@/assets/Products/images/Care-Applicator/checklist.png"
                      alt=""
                      class="w-4 h-4 md:w-5 md:h-5 object-contain shrink-0"
                    />
                  </div>
                  <div class="flex items-center">
                    <span
                      class="text-white text-[10px] md:text-[14px] lg:text-[12px] xl:text-[16px]"
                    >
                      {{ data.content }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="relative w-full h-auto lg:pt-[100px] xl:pt-[130px]">
            <div class="w-full h-auto flex flex-col gap-y-5 lg:pl-2 lg:pr-10">
              <div class="w-full h-auto flex flex-row gap-5 xl:gap-5">
                <div
                  class="w-full h-auto flex flex-col bg-[#DDDDDD]/40 gap-y-5 border-[#FFFFFF]/20 border-[1px] px-5 py-5 md:py-10 lg:py-5 xl:py-10 rounded-[12px]"
                >
                  <div class="w-full h-auto">
                    <img
                      src="@/assets/Products/images/Care-Applicator/mitra-resmi-icon1.png"
                      alt=""
                      class="w-14 h-14 md:w-auto md:h-auto lg:w-14 lg:h-14 xl:w-auto xl:h-auto object-contain"
                    />
                  </div>
                  <div class="w-full h-auto flex flex-col">
                    <div class="w-full h-auto flex">
                      <span
                        class="text-[#FFFFFF] font-[600] text-[16px] md:text-[24px] lg:text-[18px] xl:text-[24px]"
                      >
                        Mitra Resmi
                      </span>
                    </div>
                    <div class="w-full h-auto flex">
                      <span
                        class="text-[#ECECEC] font-[400] text-[10px] md:text-[12px]"
                      >
                        Identity Verified
                      </span>
                    </div>
                  </div>
                </div>
                <div
                  class="w-full h-auto flex flex-col bg-[#DDDDDD]/40 gap-y-5 border-[#FFFFFF]/20 border-[1px] px-5 py-5 md:py-10 lg:py-5 xl:py-10 rounded-[12px]"
                >
                  <div class="w-full h-auto">
                    <img
                      src="@/assets/Products/images/Care-Applicator/mitra-resmi-icon2.png"
                      alt=""
                      class="w-14 h-14 md:w-auto md:h-auto lg:w-14 lg:h-14 xl:w-auto xl:h-auto object-contain"
                    />
                  </div>
                  <div class="w-full h-auto flex flex-col">
                    <div class="w-full h-auto flex">
                      <span
                        class="text-[#FFFFFF] font-[600] text-[16px] md:text-[24px] lg:text-[18px] xl:text-[24px]"
                      >
                        Mitra Resmi
                      </span>
                    </div>
                    <div class="w-full h-auto flex">
                      <span
                        class="text-[#ECECEC] font-[400] text-[10px] md:text-[12px]"
                      >
                        Identity Verified
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="w-full h-auto">
                <div
                  class="w-full h-auto flex flex-row gap-x-5 md:gap-x-5 px-5 py-5 md:py-8 lg:py-4 xl:py-8 bg-[#FFFFFF]/40 border-[1px] border-[#DDDDDD]/20 rounded-[12px]"
                >
                  <div
                    class="w-auto h-auto flex p-[1px] bg-gradient-to-br from-[#AFEFFF] from-[40%] to-[#AFEFFF]/0 rounded-[12px]"
                  >
                    <div
                      class="w-full h-full flex bg-[#70cff4] p-2 md:p-3 lg:p-2 xl:p-3 rounded-[12px]"
                    >
                      <img
                        src="@/assets/Products/images/Care-Applicator/digital-ecosystem-icon2.png"
                        alt=""
                        class="w-full h-full object-contain"
                      />
                    </div>
                  </div>
                  <div
                    class="w-full h-auto flex flex-col justify-center gap-y-1 md:gap-y-0"
                  >
                    <div class="w-full h-auto flex">
                      <span
                        class="text-[#FFFFFF] font-[600] text-[16px] md:text-[20px] lg:text-[18px] xl:text-[20px]"
                      >
                        Digital Ecosystem
                      </span>
                    </div>
                    <div class="w-full h-auto flex">
                      <span
                        class="text-[#ECECEC] font-[400] text-[12px] md:text-[14px] lg:text-[12px] xl:text-[14px]"
                      >
                        Identity Verified
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Paket Pemeriksaan Kesehatan -->
    <section
      class="relative w-full h-full rounded-[20px] z-20 mx-auto max-w-[1440px] px-8 md:px-12 lg:px-20 mt-32 lg:mt-40"
    >
      <div class="w-full h-auto flex flex-col gap-y-10">
        <div class="w-full h-auto flex flex-col gap-y-5">
          <div class="w-full h-auto flex justify-center items-center">
            <span
              class="text-[24px] md:text-[28px] lg:text-[36px] text-[#374151] font-[600] text-center leading-tight tracking-wider"
            >
              Pilih Paket Pemeriksaan <br />
              Kesehatan Anda
            </span>
          </div>
          <div class="w-full h-auto flex justify-center items-center">
            <span
              class="text-[10px] md:text-[14px] lg:text-[16px] text-[#374151] font-[400] text-center"
            >
              Klik salah satu paket untuk melihat rincian lengkap parameternya.
            </span>
          </div>
        </div>
        <!-- DESKTOP -->
        <div class="hidden md:block w-full">
          <div
            class="grid grid-cols-[1fr_repeat(3,1fr)] border rounded-lg overflow-hidden"
          >
            <!-- HEADER -->
            <div class="border-b px-6 py-4 font-semibold">
              Fitur & Parameter
            </div>

            <template v-for="pkg in packages" :key="pkg.name">
              <div
                class="relative border-b px-6 py-4"
                :class="pkg.highlight && 'bg-[#E7FFFB]'"
              >
                <div
                  v-if="pkg.highlight"
                  class="absolute top-0 left-0 w-full h-2 bg-[#26DBBD] rounded-b-[20px]"
                />
                <p
                  class="text-xs font-semibold"
                  :class="pkg.highlight ? 'text-[#22B098]' : 'text-[#374151]'"
                >
                  {{ pkg.label }}
                </p>
                <p class="text-lg font-semibold text-[#374151]">
                  {{ pkg.name }}
                </p>
              </div>
            </template>

            <!-- ROW: HARGA -->
            <div class="border-b px-6 py-4 font-semibold text-[#57788E]">
              Harga
            </div>

            <template v-for="pkg in packages" :key="pkg.name + '-price'">
              <div
                class="border-b px-6 py-4"
                :class="pkg.highlight && 'bg-[#E7FFFB]'"
              >
                <span :class="`${pkg.priceColor} font-[600]`">
                  {{ pkg.price }}
                </span>
              </div>
            </template>

            <!-- ROWS: FITUR -->
            <template v-for="(feat, i) in features" :key="feat">
              <div class="border-b px-6 py-4 font-semibold text-[#57788E]">
                {{ feat }}
              </div>

              <template v-for="pkg in packages" :key="pkg.name + i">
                <div
                  class="border-b px-6 py-4 h-auto flex items-center"
                  :class="pkg.highlight && 'bg-[#E7FFFB]'"
                >
                  <span v-if="pkg.values[i]" class="text-[#000]">
                    {{ pkg.values[i] }}
                  </span>
                </div>
              </template>
            </template>

            <!-- CTA -->
            <div></div>

            <template v-for="pkg in packages" :key="pkg.name + '-cta'">
              <div
                class="w-full md:px-4 lg:px-6 py-3 font-semibold h-auto flex items-center justify-center"
                :class="pkg.highlight && 'bg-[#E7FFFB]'"
              >
                <button
                  class="w-full h-auto py-2 flex justify-center items-center rounded-[10px] cursor-pointer"
                  :class="
                    pkg.name === 'ESSENTIAL'
                      ? 'bg-[#C4EAFF] text-[#488DB3]'
                      : pkg.name === 'CORE'
                        ? 'bg-[#2BE1C2] text-[#FFFFFF] shadow'
                        : pkg.name === 'PRIME'
                          ? 'bg-[#0067B5] text-[#FFFFFF]'
                          : ''
                  "
                >
                  <!-- :class="
                    pkg.highlight
                      ? 'bg-[#2BE1C2] text-white shadow'
                      : 'bg-[#C4EAFF] text-[#488DB3]'
                  " -->
                  <span class="font-[600] md:text-[12px] lg:text-[14px]"
                    >Lihat Detail Core</span
                  >
                </button>
              </div>
            </template>
          </div>
        </div>

        <!-- MOBILE -->
        <div class="flex flex-col gap-y-5 md:hidden w-full">
          <div
            v-for="(pkg, index) in packages"
            :key="pkg.name"
            class="p-[1px] rounded-[10px]"
            :class="
              pkg.name === 'CORE'
                ? 'bg-gradient-to-b from-[#26DBBD] from-[20%] to-[#26DBBD]/0'
                : 'bg-[#DADADA]'
            "
          >
            <div class="relative bg-white rounded-[10px] flex flex-col">
              <!-- HEADER -->
              <div
                v-if="pkg.name === 'CORE'"
                class="w-[50%] h-1.5 absolute top-0 left-1/2 -translate-x-1/2 bg-[#27DBBD] rounded-b-full"
              />
              <div class="flex justify-between px-5 pt-5 pb-3">
                <div>
                  <p class="text-[12px] text-[#374151]">
                    {{ pkg.label }}
                  </p>
                  <p class="text-[20px] font-[600] text-[#374151]">
                    {{ pkg.name }}
                  </p>
                </div>
                <div class="flex items-end">
                  <span class="text-[18px] font-[600]" :class="pkg.priceColor">
                    {{ pkg.price }}
                  </span>
                </div>
              </div>

              <div class="h-[1px] bg-[#DADADA]" />

              <!-- CONTENT -->
              <div
                ref="contentRefs"
                class="relative overflow-hidden transition-[max-height] duration-300 ease-in-out will-change-[max-height]"
                :style="{
                  maxHeight: pkg.expanded
                    ? contentHeights[index] + 'px'
                    : '160px',
                }"
              >
                <!-- GRADIENT -->
                <div
                  v-if="!pkg.expanded"
                  class="absolute inset-0 z-10 bg-gradient-to-b from-white/30 to-white"
                />

                <ul
                  class="px-5 py-5 mx-5 list-disc list-outside pl-5 flex flex-col gap-y-3 text-[16px]"
                >
                  <li v-for="(val, i) in pkg.mobileValues" :key="i">
                    {{ val }}
                  </li>
                </ul>
              </div>

              <!-- BUTTON -->
              <div class="px-5 py-3">
                <div
                  class="rounded-[8px] py-2 text-center cursor-pointer"
                  :class="
                    pkg.name === 'ESSENTIAL'
                      ? 'bg-[#C4EAFF] text-[#488DB3]'
                      : pkg.name === 'CORE'
                        ? 'bg-[#2BE1C2] text-[#FFFFFF] shadow'
                        : pkg.name === 'PRIME'
                          ? 'bg-[#0067B5] text-[#FFFFFF]'
                          : ''
                  "
                  @click="toggleExpand(index)"
                >
                  <span class="font-[600] text-[14px]">
                    {{ pkg.expanded ? "Tutup" : "Lihat Lebih Banyak" }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Mengapa bergabung SCA? -->
    <section
      class="relative w-full h-full rounded-[20px] z-20 mx-auto max-w-[1440px] px-8 md:px-12 lg:px-12 mt-20 md:mt-32 pt-20"
      id="keunggulan"
    >
      <div
        class="w-full h-auto flex flex-col bg-[#EAFCFA] px-4 md:px-10 py-10 md:py-20 gap-y-8 md:gap-y-14 rounded-[20px] md:rounded-[48px]"
      >
        <div class="w-full h-auto flex flex-col gap-y-2 md:gap-y-0">
          <div class="w-full h-auto flex justify-center items-center">
            <span
              class="text-[#374151] text-[20px] md:text-[32px] lg:text-[44px] font-[600] text-center"
            >
              Kenapa Bergabung Jadi SCA?
            </span>
          </div>
          <div class="w-full h-auto flex justify-center items-center">
            <span
              class="text-[12px] md:text-[14px] lg:text-[16px] text-[#374151] font-[400] text-center"
            >
              Membangun bisnis mandiri dengan dukungan korporasi global
            </span>
          </div>
        </div>
        <div
          class="w-full h-auto grid grid-cols-2 md:grid-cols-3 lg:px-16 gap-5"
        >
          <div
            v-for="(data, index) in whyJoinSCA"
            :key="index"
            class="w-full h-full bg-[#FFFFFF] rounded-[12px]"
          >
            <div
              class="w-full h-full flex flex-col gap-y-2 md:gap-y-4 p-3 md:p-4 lg:p-10 bg-[#FFFFFF] border-[0.5px] border-[#000000]/10 rounded-[12px]"
            >
              <div class="w-full h-auto flex justify-center items-center">
                <div
                  class="w-auto h-auto flex justify-center items-start bg-[#39D5BC] text-[#FFFFFF] rounded-[12px]"
                >
                  <ThunderIcon
                    class="w-8 h-8 md:w-full md:h-full object-contain p-1 md:p-2 rounded-[8px]"
                  />
                </div>
              </div>
              <div class="w-full h-auto flex flex-col md:gap-y-3">
                <div
                  class="w-full h-[35px] md:h-[45px] lg:h-auto flex justify-center items-center"
                >
                  <span
                    class="text-[#374151] font-[600] text-[12px] md:text-[16px] lg:text-[24px] text-center leading-snug"
                  >
                    {{ data.title }}
                  </span>
                </div>
                <div
                  class="w-full h-auto flex md:justify-center md:items-center text-center"
                >
                  <span
                    class="font-[400] text-[#8E98A8] text-[10px] md:text-[12px] leading-normal"
                  >
                    {{ data.content }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Level Keanggotaan -->
    <section
      class="relative w-full h-full rounded-[20px] z-20 mx-auto max-w-[1440px] px-8 md:px-12 lg:px-20 mt-32"
    >
      <div
        class="w-full h-auto flex flex-col gap-y-5 md:gap-y-6 lg:gap-y-8 pb-10"
      >
        <div class="w-full h-auto flex flex-col gap-y-3 lg:gap-y-8">
          <div class="w-full h-auto flex justify-center items-center">
            <span
              class="text-[28px] md:text-[34px] lg:text-[42px] text-[#374151] font-[600]"
            >
              Level Keanggotaan
            </span>
          </div>
          <div class="w-full h-auto flex justify-center items-center">
            <span
              class="text-[#374151] font-[400] text-[12px] md:text-[16px] text-center"
            >
              Pilih jalur karir yang sesuai dengan ambisi Anda
            </span>
          </div>
        </div>
        <div
          class="max-w-2xl w-full h-auto flex flex-col md:flex-row gap-y-5 md:gap-y-0 md:gap-x-5 mx-auto md:pb-8"
        >
          <!-- Starter Level -->
          <div
            class="relative w-full h-[300px] md:h-[380px] flex bg-[#EDFFFC] rounded-xl overflow-hidden"
          >
            <div
              class="absolute w-[180px] h-[180px] md:w-[200px] md:h-[200px] -top-[20%] -right-[18%] z-10"
            >
              <img
                src="@/assets/Products/images/Care-Applicator/circle-starter.png"
                alt=""
                class="w-full h-full object-contain"
              />
            </div>
            <div
              class="absolute w-[180px] h-[180px] md:w-[200px] md:h-[200px] -bottom-[18%] -left-[20%] z-10"
            >
              <img
                src="@/assets/Products/images/Care-Applicator/circle-starter.png"
                alt=""
                class="w-full h-full object-contain"
              />
            </div>
            <div
              class="relative w-full h-full flex flex-col justify-center z-20 pt-0 md:pb-5"
            >
              <div class="w-full h-auto flex flex-col gap-y-8 px-5">
                <div class="w-full h-auto flex flex-col text-[#374151]">
                  <p class="text-[14px] font-[400]">Starter Level</p>
                  <p class="text-[24px] font-[600]">SCA-01</p>
                </div>
                <div class="w-full h-auto flex flex-col gap-y-7">
                  <div
                    v-for="(data, index) in membershipLevels.starter.features"
                    :key="index"
                    class="w-full h-auto flex flex-row gap-x-2"
                  >
                    <div
                      class="w-auto h-auto flex bg-[#1AC9AD] p-1 rounded-full"
                    >
                      <div
                        class="w-full h-full flex items-center justify-center"
                      >
                        <img
                          src="@/assets/Products/images/Care-Applicator/checklist-icon.png"
                          alt=""
                          class="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    <div class="w-auto h-auto flex items-center">
                      <span class="text-[#374151] font-[500] text-[14px]">{{
                        data
                      }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- Professional Level -->
          <div
            class="relative w-full h-[300px] md:h-[430px] flex bg-gradient-to-br from-[#38DAC0] to-[#1E7466] rounded-xl shadow-[0_10px_20px_0_#207E6F4D] overflow-hidden"
          >
            <div
              class="absolute w-[180px] h-[180px] md:w-[230px] md:h-[230px] -top-[20%] -right-[18%] z-10"
            >
              <img
                src="@/assets/Products/images/Care-Applicator/circle-profesional.png"
                alt=""
                class="w-full h-full object-contain"
              />
            </div>
            <div
              class="absolute w-[180px] h-[180px] md:w-[230px] md:h-[230px] -bottom-[18%] -left-[20%] z-10"
            >
              <img
                src="@/assets/Products/images/Care-Applicator/circle-profesional.png"
                alt=""
                class="w-full h-full object-contain"
              />
            </div>
            <div
              class="relative w-full h-full flex flex-col justify-center z-20 pt-0 md:pb-5"
            >
              <div class="w-full h-auto flex flex-col gap-y-8 px-5">
                <div class="w-full h-auto flex flex-col text-[#FFFFFF]">
                  <p class="text-[14px] font-[400]">Professional Level</p>
                  <p class="text-[26px] font-[600]">SCA-02</p>
                </div>
                <div class="w-full h-auto flex flex-col gap-y-7">
                  <div
                    v-for="(data, index) in membershipLevels.professional
                      .features"
                    :key="index"
                    class="w-full h-auto flex flex-row gap-x-2"
                  >
                    <div
                      class="w-auto h-auto flex bg-[#FFFFFF] p-1 rounded-full"
                    >
                      <div
                        class="w-full h-full flex items-center justify-center"
                      >
                        <img
                          src="@/assets/Products/images/Care-Applicator/checklist-icon2.png"
                          alt=""
                          class="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    <div class="w-auto h-auto flex items-center">
                      <span class="text-[#FFFFFF] font-[500] text-[14px]">
                        {{ data }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <!-- <div class="w-full h-auto flex rounded-[12px]">
                <div
                  class="w-full h-auto py-2 bg-[#FFFFFF] flex items-center justify-center rounded-[8px]"
                >
                  <span class="text-[#238676] font-[600]">Pilih Builder</span>
                </div>
              </div> -->
            </div>
          </div>
        </div>
        <div
          class="w-full md:w-auto md:mx-auto h-auto flex bg-[#38D8BF] justify-center items-center py-3 md:py-2.5 px-10 rounded-[8px] cursor-pointer shadow-[0px_9px_30px_0px_rgba(61,218,193,0.25)]"
        >
          <span class="text-[#FFFFFF] text-[16px] md:text-[16px] lg:text-[20px]"
            >Bergabung Sekarang</span
          >
        </div>
      </div>
    </section>

    <!-- Komisi -->
    <section
      class="relative w-full h-full rounded-[20px] z-20 mx-auto max-w-[1440px] px-8 md:px-12 lg:px-12 mt-32 pt-20"
      id="komisi"
    >
      <div class="w-full h-auto bg-[#FAFAFA] rounded-[16px]">
        <div
          class="w-full h-auto flex flex-col lg:flex-row gap-x-5 py-12 px-4 md:px-12 lg:px-8 xl:px-20 rounded-[16px]"
        >
          <div class="w-full h-auto flex flex-col gap-y-5">
            <div class="w-full h-auto flex justify-center lg:justify-start">
              <span
                class="text-[#374151] font-[600] text-[16px] md:text-[26px]"
              >
                Struktur Komisi & <br class="hidden lg:block" />
                Simulasi Penghasilan
              </span>
            </div>
            <div
              class="flex lg:hidden w-full h-[300px] bg-white rounded-2xl justify-end items-end"
            >
              <div class="w-full h-full flex">
                <apexchart
                  class="w-full h-full"
                  type="bar"
                  height="100%"
                  :options="chartOptions"
                  :series="series"
                />
              </div>
            </div>
            <div
              class="w-full h-auto flex flex-col gap-y-2 px-5 py-3.5 bg-[#FFFFFF] border-[0.3px] border-[#CCCCCC]/50 rounded-[18px]"
            >
              <div class="w-full h-auto flex flex-row justify-between">
                <div class="w-full h-auto flex">
                  <span
                    class="text-[#6F6F6F] font-[400] text-[10px] md:text-[12px]"
                  >
                    Harga Layanan
                  </span>
                </div>
                <div class="w-full h-auto flex justify-end items-center">
                  <span
                    class="text-[#49D89C] text-[10px] md:text-[12px] font-[500]"
                  >
                    Status
                  </span>
                </div>
              </div>
              <div class="w-full h-auto flex flex-row justify-between">
                <div class="w-full h-auto flex">
                  <span
                    class="text-[#374151] font-[600] text-[14px] md:text-[18px] leading-none"
                  >
                    Rp 300.000
                    <span class="text-[#B8B8B8] text-[10px]">/ Scanning</span>
                  </span>
                </div>
                <div class="w-full h-auto flex justify-end items-center">
                  <span
                    class="text-[#49D89C] font-[600] text-[12px] md:text-[14px]"
                  >
                    Terjangkau
                  </span>
                </div>
              </div>
            </div>
            <div class="w-full h-auto flex flex-row gap-x-5">
              <div
                class="relative w-full h-[110px] md:h-[125px] bg-[#83C5FF] px-5 py-7 rounded-[18px]"
              >
                <div
                  class="absolute top-0 left-0 z-10 w-full h-full opacity-30 bg-white rounded-[18px]"
                />
                <div
                  class="w-full h-full absolute z-20 flex flex-col px-5 py-4 justify-between top-0 left-0 rounded-[18px]"
                >
                  <div class="w-full h-auto flex">
                    <span
                      class="text-[#195279] text-[12px] md:text-[14px] font-[500]"
                    >
                      Komisi Langsung
                    </span>
                  </div>
                  <div class="w-full h-auto flex">
                    <span
                      class="text-[22px] md:text-[26px] font-[600] text-[#2D71DD]"
                    >
                      15%
                    </span>
                  </div>
                  <div class="w-full h-auto flex">
                    <span
                      class="text-[12px] md:text-[12px] text-[#2D71DD] font-[500]"
                    >
                      ± Rp 45.000 / scan
                    </span>
                  </div>
                </div>
              </div>
              <div
                class="relative w-full h-[110px] md:h-[125px] bg-[#82F9CF] px-5 py-7 rounded-[18px]"
              >
                <div
                  class="absolute top-0 left-0 z-10 w-full h-full opacity-30 bg-white rounded-[18px]"
                />
                <div
                  class="w-full h-full absolute z-20 flex flex-col px-5 py-4 justify-between top-0 left-0 rounded-[18px]"
                >
                  <div class="w-full h-auto flex">
                    <span
                      class="text-[#00B692] text-[12px] md:text-[14px] font-[500]"
                    >
                      Komisi Jaringan
                    </span>
                  </div>
                  <div class="w-full h-auto flex">
                    <span
                      class="text-[22px] md:text-[26px] font-[600] text-[#00B171]"
                    >
                      10%
                    </span>
                  </div>
                  <div class="w-full h-auto flex">
                    <span
                      class="text-[12px] md:text-[12px] text-[#00B171] font-[500]"
                    >
                      ± Rp 30.000 / scan
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="w-full h-auto flex flex-col gap-y-5 px-8 py-5 bg-[#114365] border-[0.3px] border-[#CCCCCC] rounded-[18px]"
            >
              <div class="w-full h-auto flex flex-row justify-between">
                <div class="w-auto h-auto flex items-center">
                  <span
                    class="text-[12px] md:text-[14px] text-[#FFFFFF] font-[600]"
                  >
                    Target Scanning per Hari
                  </span>
                </div>
                <div class="w-auto h-auto flex justify-end">
                  <div
                    class="w-full h-full grid grid-cols-3 bg-[#DFDFDF]/50 border-[0.5px] border-[#799BB2] rounded-[6px]"
                  >
                    <div
                      class="w-[30px] md:w-[45px] h-full flex justify-center items-center md:pl-5 py-1 cursor-pointer"
                      @click="targetPerDay > 1 && targetPerDay--"
                    >
                      <span class="text-[16px] text-[#FFFFFF] font-[500]">
                        -
                      </span>
                    </div>
                    <div
                      class="w-[30px] md:w-[45px] h-full flex justify-center items-center py-1"
                    >
                      <input
                        type="number"
                        v-model="targetPerDay"
                        min="1"
                        class="w-full bg-transparent text-center outline-none text-white font-[500] transition-all duration-150"
                        :class="displaySizeClass"
                      />
                    </div>
                    <div
                      class="w-[30px] md:w-[45px] h-full flex justify-center items-center md:pr-5 py-1 cursor-pointer"
                      @click="targetPerDay++"
                    >
                      <span class="text-[16px] text-[#FFFFFF] font-[500]">
                        +
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="w-full h-auto flex flex-col gap-y-1">
                <div class="w-full h-auto flex flex-row justify-between">
                  <div class="w-full md:w-auto h-auto flex items-center">
                    <span
                      class="text-[12px] md:text-[14px] text-[#37B3D5] font-[400]"
                    >
                      Potensi Income Bulanan Anda
                    </span>
                  </div>
                  <div
                    class="w-full md:w-auto h-auto flex items-center justify-end"
                  >
                    <div class="w-auto h-full flex items-center">
                      <span
                        class="text-[14px] md:text-[18px] text-[#37D5BC] font-[600] md:tracking-widest"
                      >
                        Rp {{ formatNumberSeparator(directIncome) }}
                      </span>
                    </div>
                  </div>
                </div>
                <div class="w-full h-[1px] flex bg-[#185F8F]"></div>
                <div class="w-full h-auto flex">
                  <span class="text-[10px] md:text-[12px] text-[#2A74A6]">
                    *Penghasilan tergantung usaha dan performa masing-masing.
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div
            class="hidden lg:flex w-full h-auto bg-white rounded-2xl justify-end items-end"
          >
            <div class="w-full h-full flex">
              <apexchart
                class="w-full h-full"
                type="bar"
                height="100%"
                :options="chartOptions"
                :series="series"
              />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Cara Bergabung -->
    <section
      class="relative w-full h-full rounded-[20px] z-20 mx-auto max-w-[1440px] px-8 md:px-12 lg:px-12 mt-32 pt-20"
    ></section>

    <!-- Benefit SCA -->
    <section
      class="relative w-full h-full rounded-[20px] z-20 mx-auto max-w-[1440px] px-8 md:px-12 lg:px-12 mt-20 md:mt-32 pt-20"
      id="keunggulan"
    >
      <div
        class="w-full h-auto flex flex-col bg-[#FAFAFA] px-4 md:px-6 py-10 md:py-20 gap-y-8 md:gap-y-10 lg::gap-y-14 rounded-[20px] md:rounded-[48px]"
      >
        <div class="w-full h-auto flex flex-col gap-y-2 md:gap-y-5">
          <div class="w-full h-auto flex justify-center items-center">
            <span
              class="text-[#374151] text-[20px] md:text-[32px] lg:text-[44px] font-[600] text-center"
            >
              Benefit Menjadi SCA
            </span>
          </div>
          <div class="w-full h-auto flex justify-center items-center">
            <span
              class="text-[12px] md:text-[14px] lg:text-[16px] text-[#374151] font-[400] text-center"
            >
              Kami memberikan semua yang Anda butuhkan untuk membangun
              <br class="hidden md:block" />
              bisnis kesehatan yang sukses dan berkelanjutan.
            </span>
          </div>
        </div>
        <div
          class="md:max-w-4xl md:mx-auto w-full h-auto flex flex-col md:flex-row gap-y-5 md:gap-x-4 xl:gap-x-8"
        >
          <div
            class="w-full h-auto bg-gradient-to-b from-[#42C5AF]/0 to-[#54B5FF] p-0.5 rounded-xl overflow-hidden"
          >
            <div
              class="w-full h-full bg-[#FFFFFF] flex flex-col gap-y-7 px-4 lg:px-10 pt-10 pb-10 md:pb-14 xl:pb-20 rounded-xl"
            >
              <div
                class="w-full h-auto flex flex-row gap-x-3 justify-center items-center"
              >
                <div class="w-auto h-auto flex justify-center items-center">
                  <div
                    class="w-auto h-auto bg-[#A6D8FF] rounded-[8px] md:rounded-[12px] p-1.5 md:p-2"
                  >
                    <img
                      src="@/assets/Products/images/Care-Applicator/Star.png"
                      alt=""
                      class="w-10 h-auto md:w-12 xl:w-full xl:h-full object-contain"
                    />
                  </div>
                </div>
                <div class="w-full h-auto flex">
                  <p
                    class="text-[18px] md:text-[14px] xl:text-[18px] font-[600] text-[#374151] leading-normal"
                  >
                    Paket
                    <span class="sm:block">Keanggotaan</span>
                  </p>
                </div>
              </div>
              <div
                class="w-auto h-auto flex flex-col gap-y-3 md:gap-y-3.5 lg:gap-y-4 xl:gap-y-5 items-start"
              >
                <div
                  v-for="i in 7"
                  :key="i"
                  class="w-auto h-auto flex flex-row"
                >
                  <div
                    class="w-auto h-auto flex flex-row gap-x-1.5 md:gap-x-1.5"
                  >
                    <div class="flex items-center p-1">
                      <img
                        src="@/assets/Products/images/Care-Applicator/checklist-icon2.png"
                        alt=""
                        class="w-5 h-5 md:w-5 md:h-5 xl:w-5 xl:h-5 object-contain"
                      />
                    </div>
                    <div class="flex items-center">
                      <span
                        class="text-[#374151] font-[500] text-[12px] md:text-[12px] lg:text-[12px] xl:text-[16px]"
                      >
                        Update produk dan teknologi terbaru
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            class="w-full h-auto bg-gradient-to-b from-[#3BE3C9] to-[#18BFA5]/0 p-0.5 rounded-xl overflow-hidden"
          >
            <div
              class="w-full h-full bg-[#FFFFFF] flex flex-col gap-y-7 px-4 lg:px-10 pt-10 pb-10 md:pb-14 xl:pb-20 rounded-xl"
            >
              <div
                class="w-full h-auto flex flex-row gap-x-3 justify-center items-center"
              >
                <div class="w-auto h-auto flex justify-center items-center">
                  <div
                    class="w-auto h-auto bg-[#A3EDE1] rounded-[8px] md:rounded-[12px] p-1.5 md:p-2"
                  >
                    <img
                      src="@/assets/Products/images/Care-Applicator/Shield.png"
                      alt=""
                      class="w-10 h-auto md:w-12 xl:w-full xl:h-full object-contain"
                    />
                  </div>
                </div>
                <div class="w-full h-auto flex">
                  <p
                    class="text-[18px] md:text-[14px] xl:text-[18px] font-[600] text-[#374151] leading-normal"
                  >
                    Support
                    <span class="sm:block">Berkelanjutan</span>
                  </p>
                </div>
              </div>
              <div
                class="w-auto h-auto flex flex-col gap-y-3 md:gap-y-3.5 lg:gap-y-4 xl:gap-y-5 items-start"
              >
                <div
                  v-for="i in 4"
                  :key="i"
                  class="w-auto h-auto flex flex-row"
                >
                  <div
                    class="w-auto h-auto flex flex-row gap-x-1.5 md:gap-x-1.5"
                  >
                    <div class="flex items-center p-1">
                      <img
                        src="@/assets/Products/images/Care-Applicator/checklist-icon2.png"
                        alt=""
                        class="w-5 h-5 md:w-5 md:h-5 xl:w-5 xl:h-5 object-contain"
                      />
                    </div>
                    <div class="flex items-center">
                      <span
                        class="text-[#374151] font-[500] text-[12px] md:text-[12px] lg:text-[12px] xl:text-[16px]"
                      >
                        Update produk dan teknologi terbaru
                      </span>
                    </div>
                  </div>
                </div>
                <div
                  class="w-full h-auto flex flex-col bg-[#D0FBF5] gap-y-2 px-5 py-5 text-[#32A897] rounded-xl"
                >
                  <div class="w-full h-auto">
                    <p
                      class="font-[600] text-[16px] md:text-[20px] lg:text-[22px]"
                    >
                      Kenapa Kami
                    </p>
                  </div>
                  <div
                    class="w-full h-auto text-[10px] md:text-[12px] lg:text-[14px]"
                  >
                    <p>
                      "Kami tidak hanya memberikan alat, tapi kami membangun
                      ekosistem untuk pertumbuhan karir Anda."
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonial -->
    <section
      class="relative w-full h-full rounded-[20px] z-20 mx-auto max-w-[1440px] mt-32"
    >
      <div
        class="w-full h-auto flex flex-col gap-y-5 md:gap-y-6 lg:gap-y-8 pb-10"
      >
        <div class="w-full h-auto flex flex-col gap-y-3 lg:gap-y-14">
          <div
            class="w-full h-auto flex flex-col gap-y-3 lg:gap-y-4 px-8 md:px-12 lg:px-20"
          >
            <div class="w-full h-auto flex justify-center items-center">
              <span
                class="text-[28px] md:text-[34px] lg:text-[42px] text-[#374151] font-[600]"
              >
                Apa Kata Mereka?
              </span>
            </div>
            <div class="w-full h-auto flex justify-center items-center">
              <span
                class="text-[#374151] font-[400] text-[12px] md:text-[16px] text-center"
              >
                Kisah sukses dari mitra Seleris Care di seluruh Indonesia
              </span>
            </div>
          </div>
          <div
            class="relative w-full h-[425px] flex justify-center items-center px-0 md:px-12 lg:px-20"
          >
            <div class="absolute w-full h-full z-10 top-1/2 -translate-y-1/2">
              <img
                src="@/assets/Products/images/Care-Applicator/testimonial-background.png"
                alt=""
                class="w-full h-auto object-contain object-center"
              />
            </div>
            <!-- DESKTOP -->
            <div
              class="hidden lg:flex relative w-full h-auto group my-6 z-20 bg-transparent overflow-visible"
            >
              <Swiper
                :modules="modules"
                :slides-per-view="3"
                :space-between="20"
                :loop="true"
                :loop-additional-slides="testimonials.length"
                :pagination="{ el: '.custom-pagination', clickable: true }"
                :autoplay="{ delay: 3000, disableOnInteraction: false }"
                class="w-full h-full"
              >
                <SwiperSlide v-for="(item, index) in testimonials" :key="index">
                  <!-- wrapper ini TIDAK mengubah desain -->
                  <div class="py-6">
                    <div
                      class="w-full h-[420px] sm:h-[230px] md:h-[300px] lg:h-[280px] xl:h-[250px] p-[1px] bg-[#D9D9D9] rounded-lg cursor-grab active:cursor-grabbing shadow-[0px_19px_25px_0px_#5C5C5C1A]"
                    >
                      <div
                        class="w-full h-full flex flex-col px-6 lg:px-8 lg:py-5 rounded-lg bg-[#FFFFFF]"
                      >
                        <div class="flex flex-col w-full h-auto mb-5 gap-y-1">
                          <h3
                            class="text-[14px] md:text-[20px] lg:text-[18px] font-[500] text-[#195279]"
                          >
                            {{ item.name }}
                          </h3>
                          <p
                            class="text-[14px] md:text-[16px] lg:text-[14px] text-[#717276]"
                          >
                            {{ item.location }}
                          </p>
                        </div>

                        <div class="w-full h-full">
                          <p
                            class="text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px] xl:text-[16px] text-[#535862] leading-relaxed"
                          >
                            "{{ item.text }}"
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              </Swiper>
              <div
                class="absolute z-20 bottom-0 custom-pagination mt-4 flex justify-center gap-2"
              ></div>
            </div>
            <!-- MOBILE -->
            <div class="flex lg:hidden relative w-full h-auto group mt-6">
              <Swiper
                :modules="modules"
                :navigation="false"
                :pagination="{ el: '.custom-pagination', clickable: true }"
                :autoplay="{ delay: 3000, disableOnInteraction: false }"
                loop
                class="w-full"
              >
                <SwiperSlide v-for="(item, index) in testimonials" :key="index">
                  <div
                    class="w-full h-[420px] sm:h-[230px] md:h-[300px] p-[1px] bg-[#D9D9D9] rounded-lg cursor-grab active:cursor-grabbing shadow-[0px_19px_25px_0px_#5C5C5C1A]"
                  >
                    <div
                      class="w-full h-full flex flex-col px-6 lg:px-8 lg:py-5 rounded-lg bg-[#FFFFFF]"
                    >
                      <div class="flex flex-col w-full h-auto mb-5 gap-y-1">
                        <h3
                          class="text-[14px] md:text-[20px] lg:text-[18px] font-[500] text-[#195279]"
                        >
                          {{ item.name }}
                        </h3>
                        <p
                          class="text-[14px] md:text-[16px] lg:text-[14px] text-[#717276]"
                        >
                          {{ item.location }}
                        </p>
                      </div>
                      <div class="w-full h-full">
                        <p
                          class="text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px] xl:text-[16px] text-[#535862] leading-relaxed"
                        >
                          "{{ item.text }}"
                        </p>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              </Swiper>

              <!-- Custom pagination -->
              <div
                class="custom-pagination mt-4 flex justify-center gap-2"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<style scoped>
input[type="number"] {
  appearance: none; /* ✅ standard */
  -webkit-appearance: none; /* chrome, safari */
  -moz-appearance: textfield; /* firefox */
}

input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
