<script setup>
import { computed, onMounted, onUnmounted, ref } from "vue";
import { formatNumberSeparator } from "@/components/Helper/numberFormat.js";

import ThunderIcon from "@/assets/Products/images/Care-Applicator/thunder-icon.vue";

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
    values: [
      "15 Parameter",
      "15 Parameter",
      "15 Parameter",
      "15 Parameter",
      "15 Parameter",
      "15 Parameter",
      null,
    ],
  },
  {
    label: "Paling Populer",
    name: "CORE",
    price: "Rp 250.000",
    priceColor: "text-[#355F7C]",
    highlight: true,
    values: [
      "15 Parameter",
      "15 Parameter",
      "15 Parameter",
      "15 Parameter",
      null,
      null,
      null,
    ],
  },
  {
    label: "Komprehensif",
    name: "PRIME",
    price: "Rp 300.000",
    priceColor: "text-[#355F7C]",
    highlight: false,
    values: ["15 Parameter", "15 Parameter", null, null, null, null, null],
  },
];

const targetPerDay = ref(1);
const PRICE_PER_SCAN = 300000;
const DIRECT_PERCENT = 0.15;
const PASSIVE_PERCENT = 0.1;
const DAYS_PER_MONTH = 30;

const isHealthPackExpanded = ref(false);

const toggleExpand = () => {
  isHealthPackExpanded.value = !isHealthPackExpanded.value;
};

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
      columnWidth: "80%",
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

  tooltip: {
    y: {
      formatter: (val) => "Rp " + val.toLocaleString("id-ID"),
    },
  },
};

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
            class="relative flex w-full h-auto lg:hidden flex-row gap-x-5 items-center justify-center lg:items-end lg:justify-end"
          >
            <figure class="w-auto h-auto">
              <img
                src="@/assets/Products/images/Care-Applicator/phone-hero.png"
                alt=""
                class="w-full h-[350px] object-contain"
              />
            </figure>
          </div>
          <div
            class="relative flex flex-col w-full h-auto gap-y-7 lg:gap-y-10 justify-end px-12 lg:px-0"
          >
            <div
              class="w-full h-auto flex flex-col gap-y-5 justify-start items-center md:justify-normal md:items-start"
            >
              <div
                class="w-auto h-auto px-6 py-2 bg-[#3BD8BF]/20 flex flex-row gap-x-2 text-[#39D5BC] font-[600] rounded-[24px] justify-center items-center"
              >
                <img
                  src="@/assets/Products/images/Care-Applicator/thunder-icon.png"
                  alt=""
                  class="w-auto h-auto object-contain"
                />
                <span class="text-[14px] xl:text-[16px]">
                  Peluang Bisnis Tanpa Modal
                </span>
              </div>
              <div
                class="w-full h-auto flex flex-col gap-y-0 justify-center items-center md:justify-normal md:items-start"
              >
                <p
                  class="font-[600] text-[28px] md:text-[28px] lg:text-[40px] xl:text-[46px]"
                >
                  <span class="text-[#374151]">
                    Peluang Bisnis <br class="hidden lg:block" />
                    Kesehatan Berbasis
                  </span>
                </p>
                <p
                  class="text-[#1889D1] font-[600] text-[22px] md:text-[22px] lg:text-[38px] xl:text-[40px]"
                >
                  AI Masa Depan
                </p>
              </div>
              <p
                class="text-[#374151] text-[14px] md:text-[16px] lg:text-[14px] xl:text-[18px] w-full"
              >
                Jadilah Seleris Care Applicator (SCA) dan bantu masyarakat
                memantau kesehatan secara non invasif sambil membangun
                penghasilan fleksibel yang berkelanjutan.
              </p>
            </div>
            <div class="w-full h-auto flex flex-row gap-x-6 lg:justify-between">
              <button
                aria-label="View Demo Seleris Credit"
                class="flex flex-row justify-center w-full lg:w-auto h-auto px-8 lg:px-4 xl:px-6 py-2 bg-[#3DDAC1] rounded-[12px] items-center gap-x-3"
              >
                <div class="w-full h-full flex items-center justify-center">
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
        class="w-full h-auto py-14 px-4 md:px-8 lg:px-10 xl:px-12 bg-[#FAFAFA] flex flex-col gap-y-14 rounded-xl"
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
              (data.id === 2 || data.id === 4) && 'mt-14',

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
      class="relative w-full h-full rounded-[20px] z-20 mx-auto max-w-[1440px] px-8 md:px-12 lg:px-20 mt-32 lg:mt-40"
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
          class="lg:absolute z-20 left-0 top-0 w-full h-full flex flex-col lg:flex-row gap-y-10 gap-x-3 p-6 md:p-10 lg:p-0 bg-gradient-to-br from-[#28B1B8] to-[#124F52] lg:bg-none rounded-[20px] lg:rounded-none"
        >
          <div class="w-full h-auto flex flex-col lg:px-10 lg:pt-12 gap-y-8">
            <div class="w-full h-auto flex">
              <span
                class="text-[#FFFFFF] text-[24px] md:text-[32px] lg:text-[42px] font-[600] tracking-wider leading-snug"
              >
                Apa Itu Seleris Care <br />
                Applicator (SCA) ?
              </span>
            </div>
            <div class="w-full h-auto flex">
              <span
                class="text-[12px] md:text-[16px] text-[#FFFFFF] leading-snug font-[400]"
              >
                SCA adalah mitra resmi
                <span class="font-[600]">Seleris Care</span> yang bertugas
                memasarkan dan menyediakan layanan scanning kesehatan kepada
                masyarakat luas menggunakan perangkat dan aplikasi digital kami.
              </span>
            </div>
            <div
              class="w-auto h-auto flex flex-col gap-y-3 md:gap-y-6 lg:gap-y-5 items-start"
            >
              <div
                v-for="(data, index) in whatsSCAList"
                :key="index"
                class="w-auto h-auto flex flex-row"
              >
                <div
                  class="w-auto h-auto flex flex-row bg-[#47D2B4]/40 gap-x-1.5 md:gap-x-3 py-2 px-3 md:py-1.5 md:px-5 lg:py-3 lg:px-6 rounded-full"
                >
                  <div class="flex items-center">
                    <img
                      src="@/assets/Products/images/Care-Applicator/checklist.png"
                      alt=""
                      class="w-4 h-4 md:w-5 md:h-5 object-contain shrink-0"
                    />
                  </div>
                  <div class="flex items-center">
                    <span class="text-white text-[10px] md:text-[14px]">
                      {{ data.content }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="relative w-full h-auto lg:pt-[130px]">
            <div class="w-full h-auto flex flex-col gap-y-5 lg:pl-2 lg:pr-10">
              <div class="w-full h-auto flex flex-row gap-5">
                <div
                  class="w-full h-auto flex flex-col bg-[#DDDDDD]/40 gap-y-5 border-[#FFFFFF]/20 border-[1px] px-5 py-5 md:py-10 rounded-[12px]"
                >
                  <div class="w-full h-auto">
                    <img
                      src="@/assets/Products/images/Care-Applicator/mitra-resmi-icon1.png"
                      alt=""
                      class="w-14 h-14 md:w-auto md:h-auto object-contain"
                    />
                  </div>
                  <div class="w-full h-auto flex flex-col">
                    <div class="w-full h-auto flex">
                      <span
                        class="text-[#FFFFFF] font-[600] text-[16px] md:text-[24px]"
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
                  class="w-full h-auto flex flex-col bg-[#DDDDDD]/40 gap-y-5 border-[#FFFFFF]/20 border-[1px] px-5 py-5 md:py-10 rounded-[12px]"
                >
                  <div class="w-full h-auto">
                    <img
                      src="@/assets/Products/images/Care-Applicator/mitra-resmi-icon2.png"
                      alt=""
                      class="w-14 h-14 md:w-auto md:h-auto object-contain"
                    />
                  </div>
                  <div class="w-full h-auto flex flex-col">
                    <div class="w-full h-auto flex">
                      <span
                        class="text-[#FFFFFF] font-[600] text-[16px] md:text-[24px]"
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
                  class="w-full h-auto flex flex-row gap-x-5 md:gap-x-5 px-5 py-5 md:py-8 bg-[#FFFFFF]/40 border-[1px] border-[#DDDDDD]/20 rounded-[12px]"
                >
                  <div
                    class="w-auto h-auto flex p-[1px] bg-gradient-to-br from-[#AFEFFF] from-[40%] to-[#AFEFFF]/0 rounded-[12px]"
                  >
                    <div
                      class="w-full h-full flex bg-[#70cff4] p-2 md:p-3 rounded-[12px]"
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
                        class="text-[#FFFFFF] font-[600] text-[16px] md:text-[20px]"
                      >
                        Digital Ecosystem
                      </span>
                    </div>
                    <div class="w-full h-auto flex">
                      <span
                        class="text-[#ECECEC] font-[400] text-[12px] md:text-[14px]"
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
              class="text-[20px] md:text-[28px] lg:text-[36px] text-[#374151] font-[600] text-center leading-tight tracking-wider"
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
                  class="border-b px-6 py-4"
                  :class="pkg.highlight && 'bg-[#E7FFFB]'"
                >
                  <span v-if="pkg.values[i]" class="text-[#000]">
                    {{ pkg.values[i] }}
                  </span>
                </div>
              </template>
            </template>

            <template v-for="pkg in packages" :key="pkg.name + '-cta'">
              <div
                class="px-6 py-4 flex justify-center"
                :class="pkg.highlight && 'bg-[#E7FFFB]'"
              >
                <button
                  class="w-full py-2 rounded-lg font-semibold text-sm"
                  :class="
                    pkg.highlight
                      ? 'bg-[#2BE1C2] text-white shadow'
                      : 'bg-[#C4EAFF] text-[#488DB3]'
                  "
                >
                  Lihat Detail Core
                </button>
              </div>
            </template>
          </div>
        </div>

        <div class="flex flex-col gap-y-5 md:hidden w-full h-auto">
          <div
            v-for="pkg in packages"
            :key="pkg.name"
            class="w-auto h-auto bg-[#DADADA] flex p-[1px] overflow-hidden rounded-[10px]"
          >
            <div
              class="w-full h-auto bg-[#FFFFFF] flex flex-col rounded-[10px]"
            >
              <div
                class="w-full h-auto flex flex-row justify-between px-5 py-5"
              >
                <div class="w-full h-auto flex flex-col justify-between">
                  <p class="text-[#374151] text-[12px] font-[400]">
                    {{ pkg.label }}
                  </p>
                  <p class="text-[#374151] text-[20px] font-[600]">
                    {{ pkg.name }}
                  </p>
                </div>
                <div class="w-full h-auto flex justify-end items-end">
                  <span
                    class="text-[18px] text-[#355F7C] font-[600]"
                    :class="pkg.priceColor"
                  >
                    {{ pkg.price }}
                  </span>
                </div>
              </div>
              <div class="w-full h-[1px] bg-[#DADADA]" />
              <div
                class="relative w-full flex px-5 py-5 overflow-hidden transition-[max-height] duration-300 ease-in-out will-change-[max-height]"
                :class="pkg.expanded ? pkg.maxHeightClass : 'max-h-[160px]'"
              >
                <div
                  v-if="!pkg.expanded"
                  class="absolute z-10 w-full h-full bg-gradient-to-b transition-all duration-300 from-[#FFFFFF]/30 to-[#FFFFFF]"
                />
                <ul
                  class="flex flex-col w-full h-auto list-disc list-inside text-[16px] gap-y-3"
                >
                  <li v-for="(val, i) in pkg.values.filter(Boolean)" :key="i">
                    {{ val }}
                  </li>
                </ul>
              </div>
              <div class="w-full h-auto px-5 py-2">
                <div
                  class="w-full h-auto py-2 flex bg-[#C4EAFF] items-center justify-center rounded-[8px] cursor-pointer"
                  @click="pkg.expanded = !pkg.expanded"
                >
                  <span class="text-[#488DB3] font-[600]">
                    <!-- Lihat Lebih Banyak -->
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
      class="relative w-full h-full rounded-[20px] z-20 mx-auto max-w-[1440px] px-8 md:px-12 lg:px-12 mt-32 pt-20"
      id="keunggulan"
    >
      <div
        class="w-full h-auto flex flex-col bg-[#EAFCFA] md:px-10 md:py-20 gap-y-14 rounded-[48px]"
      >
        <div class="w-full h-auto flex flex-col gap-y-0">
          <div class="w-full h-auto flex justify-center items-center">
            <span
              class="text-[#374151] md:text-[32px] lg:text-[44px] font-[600] text-center"
            >
              Kenapa Bergabung Jadi SCA?
            </span>
          </div>
          <div class="w-full h-auto flex justify-center items-center">
            <span
              class="md:text-[14px] lg:text-[16px] text-[#374151] font-[400]"
            >
              Membangun bisnis mandiri dengan dukungan korporasi global
            </span>
          </div>
        </div>
        <div class="w-full h-auto grid grid-cols-3 lg:px-16 gap-5">
          <div
            v-for="(data, index) in whyJoinSCA"
            :key="index"
            class="w-full h-full bg-[#FFFFFF] rounded-[12px]"
          >
            <div
              class="w-full h-full flex flex-col gap-y-4 md:p-5 lg:p-10 bg-[#FFFFFF] border-[0.5px] border-[#000000]/10 rounded-[12px]"
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
              <div class="w-full h-auto flex flex-col gap-y-3">
                <div
                  class="w-full h-[45px] lg:h-auto flex justify-center items-center"
                >
                  <span
                    class="text-[#374151] font-[600] md:text-[16px] lg:text-[24px] text-center"
                  >
                    {{ data.title }}
                  </span>
                </div>
                <div
                  class="w-full h-auto flex justify-center items-center text-center"
                >
                  <span
                    class="font-[400] text-[#8E98A8] text-[12px] leading-normal"
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
      <div class="w-full h-auto flex flex-col gap-y-8 pb-10">
        <div class="w-full h-auto flex justify-center items-center">
          <span class="text-[42px] text-[#374151] font-[600]"
            >Level Keanggotaan</span
          >
        </div>
        <div class="w-full h-auto flex justify-center items-center">
          <span class="text-[#374151] font-[400] text-[16px]">
            Pilih jalur karir yang sesuai dengan ambisi Anda
          </span>
        </div>
        <div class="max-w-2xl w-full h-auto flex flex-row gap-x-5 mx-auto pb-8">
          <!-- Starter Level -->
          <div
            class="relative w-full h-[380px] flex bg-[#EDFFFC] rounded-xl overflow-hidden"
          >
            <div
              class="absolute w-[200px] h-[200px] -top-[20%] -right-[18%] z-10"
            >
              <img
                src="@/assets/Products/images/Care-Applicator/circle-starter.png"
                alt=""
                class="w-full h-full object-contain"
              />
            </div>
            <div
              class="absolute w-[200px] h-[200px] -bottom-[18%] -left-[20%] z-10"
            >
              <img
                src="@/assets/Products/images/Care-Applicator/circle-starter.png"
                alt=""
                class="w-full h-full object-contain"
              />
            </div>
            <div
              class="absolute w-full h-full flex flex-col justify-center z-20 pt-0 pb-5"
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
            class="relative w-full h-[430px] flex bg-gradient-to-br from-[#38DAC0] to-[#1E7466] rounded-xl shadow-[0_10px_20px_0_#207E6F4D] overflow-hidden"
          >
            <div
              class="absolute w-[230px] h-[230px] -top-[20%] -right-[18%] z-10"
            >
              <img
                src="@/assets/Products/images/Care-Applicator/circle-profesional.png"
                alt=""
                class="w-full h-full object-contain"
              />
            </div>
            <div
              class="absolute w-[230px] h-[230px] -bottom-[18%] -left-[20%] z-10"
            >
              <img
                src="@/assets/Products/images/Care-Applicator/circle-profesional.png"
                alt=""
                class="w-full h-full object-contain"
              />
            </div>
            <div
              class="absolute w-full h-full flex flex-col justify-center z-20 pt-0 pb-5"
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
      </div>
    </section>

    <section
      class="relative w-full h-full rounded-[20px] z-20 mx-auto max-w-[1440px] px-8 md:px-12 lg:px-12 mt-32 pt-20"
      id="komisi"
    >
      <div class="w-full h-auto bg-[#FAFAFA] rounded-[16px]">
        <div
          class="w-full h-auto flex flex-row gap-x-5 py-12 px-20 rounded-[16px]"
        >
          <div class="w-full h-auto flex flex-col gap-y-5">
            <div class="w-full h-auto flex">
              <span class="text-[#374151] font-[600] text-[26px]">
                Struktur Komisi & <br />
                Simulasi Penghasilan
              </span>
            </div>
            <div
              class="w-full h-auto flex flex-col gap-y-2 px-5 py-3.5 bg-[#FFFFFF] border-[0.3px] border-[#CCCCCC]/50 rounded-[18px]"
            >
              <div class="w-full h-auto flex flex-row justify-between">
                <div class="w-full h-auto flex">
                  <span class="text-[#6F6F6F] font-[400] text-[12px]">
                    Harga Layanan
                  </span>
                </div>
                <div class="w-full h-auto flex justify-end items-center">
                  <span class="text-[#49D89C] text-[12px] font-[500]">
                    Status
                  </span>
                </div>
              </div>
              <div class="w-full h-auto flex flex-row justify-between">
                <div class="w-full h-auto flex">
                  <span
                    class="text-[#374151] font-[600] text-[18px] leading-none"
                  >
                    Rp 300.000
                    <span class="text-[#B8B8B8] text-[12px]">/ Scanning</span>
                  </span>
                </div>
                <div class="w-full h-auto flex justify-end items-center">
                  <span class="text-[#49D89C] font-[600] text-[14px]">
                    Terjangkau
                  </span>
                </div>
              </div>
            </div>
            <div class="w-full h-auto flex flex-row gap-x-5">
              <div
                class="relative w-full h-[125px] bg-[#83C5FF] px-5 py-7 rounded-[18px]"
              >
                <div
                  class="absolute top-0 left-0 z-10 w-full h-full opacity-30 bg-white rounded-[18px]"
                />
                <div
                  class="w-full h-full absolute z-20 flex flex-col px-5 py-4 justify-between top-0 left-0 rounded-[18px]"
                >
                  <div class="w-full h-auto flex">
                    <span class="text-[#195279] text-[14px] font-[500]">
                      Komisi Langsung
                    </span>
                  </div>
                  <div class="w-full h-auto flex">
                    <span class="text-[26px] font-[600] text-[#2D71DD]">
                      15%
                    </span>
                  </div>
                  <div class="w-full h-auto flex">
                    <span class="text-[12px] text-[#2D71DD] font-[500]">
                      ± Rp 45.000 / scan
                    </span>
                  </div>
                </div>
              </div>
              <div
                class="relative w-full h-[125px] bg-[#82F9CF] px-5 py-7 rounded-[18px]"
              >
                <div
                  class="absolute top-0 left-0 z-10 w-full h-full opacity-30 bg-white rounded-[18px]"
                />
                <div
                  class="w-full h-full absolute z-20 flex flex-col px-5 py-4 justify-between top-0 left-0 rounded-[18px]"
                >
                  <div class="w-full h-auto flex">
                    <span class="text-[#00B692] text-[14px] font-[500]">
                      Komisi Jaringan
                    </span>
                  </div>
                  <div class="w-full h-auto flex">
                    <span class="text-[26px] font-[600] text-[#00B171]">
                      10%
                    </span>
                  </div>
                  <div class="w-full h-auto flex">
                    <span class="text-[12px] text-[#00B171] font-[500]">
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
                  <span class="text-[14px] text-[#FFFFFF] font-[600]">
                    Target Scanning per Hari
                  </span>
                </div>
                <div class="w-auto h-auto flex justify-end">
                  <div
                    class="w-full h-full grid grid-cols-3 bg-[#DFDFDF]/50 border-[0.5px] border-[#799BB2] rounded-[6px]"
                  >
                    <div
                      class="w-[45px] h-full flex justify-center items-center pl-5 py-1 cursor-pointer"
                      @click="targetPerDay > 1 && targetPerDay--"
                    >
                      <span class="text-[16px] text-[#FFFFFF] font-[500]">
                        -
                      </span>
                    </div>
                    <div
                      class="w-[45px] h-full flex justify-center items-center px-5 py-1"
                    >
                      <span class="text-[16px] text-[#FFFFFF] font-[500]">
                        {{ targetPerDay }}
                      </span>
                    </div>
                    <div
                      class="w-[45px] h-full flex justify-center items-center pr-5 py-1 cursor-pointer"
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
                  <div class="w-auto h-auto flex items-center">
                    <span class="text-[14px] text-[#37B3D5] font-[400]">
                      Potensi Income Bulanan Anda
                    </span>
                  </div>
                  <div class="w-auto h-auto flex justify-end">
                    <div class="w-auto h-full flex">
                      <span
                        class="text-[18px] text-[#37D5BC] font-[600] tracking-widest"
                      >
                        Rp {{ formatNumberSeparator(directIncome) }}
                      </span>
                    </div>
                  </div>
                </div>
                <div class="w-full h-[1px] flex bg-[#185F8F]"></div>
                <div class="w-full h-auto flex">
                  <span class="text-[12px] text-[#2A74A6]">
                    *Penghasilan tergantung usaha dan performa masing-masing.
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div
            class="w-full h-auto bg-white rounded-2xl flex justify-end items-end"
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
  </div>
</template>
