import blueIcon from "@/assets/icons/rate/blue.svg";
import greenIcon from "@/assets/icons/rate/green.svg";
import yellowIcon from "@/assets/icons/rate/yellow.svg";
import redIcon from "@/assets/icons/rate/red.svg";

// =========================
// Icon mapping
// blue = Excellent, green = Normal, yellow = Warning, red = Critical
// =========================
export const icon = {
  blue: blueIcon,
  green: greenIcon,
  yellow: yellowIcon,
  red: redIcon,
};

// =========================
// Helper: map value_status string → icon asset
// =========================
export function getIcon(value_status) {
  return icon[value_status] ?? greenIcon;
}

// =========================
// Tabs — generated from detail_by_scc categories
// "overall" is always first, then one tab per unique metric group
// =========================
export const tabs = [
  { id: "overall", label: "Overall" },
  { id: "vital_measurements", label: "Vital Signs" },
  { id: "physiological_measurements", label: "Physiological" },
  { id: "blood_measurements", label: "Blood" },
  { id: "body_composition_measurements", label: "Body Composition" },
  { id: "physical_measurements", label: "Physical" },
  { id: "mental_measurements", label: "Mental" },
];

// =========================
// Overview Cards — from detail_by_scc (key metrics shown on Overall tab)
// =========================
export const overviewCards = [
  {
    id: "blood_pressure_systole",
    title: "Tekanan Darah Sistolik",
    value: "119.15",
    unit: "mmHg",
    status: "Rendah",
    icon: greenIcon,
    description:
      "Tekanan darah sistolik adalah tekanan yang dihasilkan ketika jantung memompa darah ke arteri selama kontraksi otot jantung. Nilai normal umumnya berada di kisaran 90–120 mmHg.",
  },
  {
    id: "blood_pressure_diastole",
    title: "Tekanan Darah Diastolik",
    value: "71.24",
    unit: "mmHg",
    status: "Rendah",
    icon: greenIcon,
    description:
      "Tekanan darah diastolik adalah tekanan di arteri saat jantung dalam keadaan relaksasi di antara dua denyutan. Rentang normal biasanya antara 60–80 mmHg.",
  },
  {
    id: "heart_rate",
    title: "Detak Jantung",
    value: "90.1",
    unit: "bpm",
    status: "Atlet",
    icon: greenIcon,
    description:
      "Detak jantung mencerminkan seberapa sering jantung memompa darah ke seluruh tubuh. Nilai normal orang dewasa saat istirahat berkisar 60–100 bpm.",
  },
  {
    id: "oxygen_saturation",
    title: "Ketersediaan Oksigen dalam Darah",
    value: "95.78",
    unit: "%",
    status: "Rendah",
    icon: greenIcon,
    description:
      "SpO2 mengukur persentase hemoglobin yang terikat oksigen dalam darah. Nilai normal berada di kisaran 95%–100%.",
  },
  {
    id: "body_mass_index",
    title: "Indeks Massa Tubuh",
    value: "24.22",
    unit: "kg/m²",
    status: "Normal",
    icon: greenIcon,
    description:
      "BMI menilai status berat badan berdasarkan perbandingan berat dan tinggi badan. Rentang normal umumnya antara 18,5–24,9 kg/m².",
  },
  {
    id: "stress_level",
    title: "Tingkat Stres",
    value: "1.67",
    unit: "",
    status: "Rendah",
    icon: greenIcon,
    description:
      "Tingkat stres mencerminkan tekanan fisik, mental, atau emosional yang dialami seseorang. Stres yang dikelola dengan baik penting untuk kesehatan secara keseluruhan.",
  },
  {
    id: "blood_glucose",
    title: "Gula Darah Sewaktu",
    value: "97.5",
    unit: "mg/dL",
    status: "Normal",
    icon: greenIcon,
    description:
      "Glukosa darah adalah konsentrasi glukosa dalam aliran darah. Kadar normal untuk individu tanpa diabetes biasanya berada di bawah 190 mg/dL.",
  },
  {
    id: "body_fat_ratio",
    title: "Rasio Lemak Tubuh",
    value: "25.03",
    unit: "%",
    status: "Tinggi",
    icon: redIcon,
    description:
      "Rasio lemak tubuh adalah proporsi lemak terhadap berat badan total. Individu dalam rentang tinggi mungkin memiliki risiko lebih tinggi terhadap masalah kesehatan terkait obesitas.",
  },
  {
    id: "pulse_respiration_quotient",
    title: "Pulse-Respiratory Quotient",
    value: "0.96",
    unit: "",
    status: "Tidak Normal",
    icon: yellowIcon,
    description:
      "PRQ adalah rasio antara denyut jantung dan laju pernapasan. Nilai normal umumnya sekitar 4:1 pada orang dewasa sehat saat istirahat.",
  },
  {
    id: "hemoglobin",
    title: "Hemoglobin",
    value: "16.17",
    unit: "g/dL",
    status: "Optimal",
    icon: blueIcon,
    description:
      "Hemoglobin adalah protein dalam sel darah merah yang bertanggung jawab membawa oksigen ke seluruh tubuh. Kadar optimal mencerminkan kapasitas pengangkutan oksigen yang baik.",
  },
];

// =========================
// Detail Content — from detail_by_medins grouped by category
// =========================
export const detailContent = {
  vital_measurements: [
    {
      id: "heart_rate",
      title: "Detak Jantung",
      value: "90.1",
      unit: "bpm",
      status: "Atlet",
      icon: greenIcon,
      description:
        "Detak jantung adalah frekuensi jantung berdetak dalam satu menit, mencerminkan seberapa sering jantung memompa darah ke seluruh tubuh. Nilai normal untuk orang dewasa saat istirahat biasanya berkisar antara 60–100 denyut per menit.",
      result:
        "Detak jantung Anda sebesar 90.1 bpm masih dalam batas normal. Individu dengan nilai ini memiliki kesehatan kardiovaskular yang cukup baik dan tingkat pemulihan yang wajar setelah berolahraga. Latihan fisik teratur dianjurkan untuk mempertahankan kondisi ini.",
    },
    {
      id: "blood_pressure_systole",
      title: "Tekanan Darah Sistolik",
      value: "119.15",
      unit: "mmHg",
      status: "Rendah",
      icon: greenIcon,
      description:
        "Tekanan darah sistolik adalah tekanan yang dihasilkan ketika jantung memompa darah ke arteri selama kontraksi. Nilai normal umumnya berada di kisaran 90–120 mmHg. Nilai di atas 120 mmHg dapat mengindikasikan hipertensi.",
      result:
        "Tekanan darah sistolik Anda sebesar 119.15 mmHg berada dalam batas normal. Tidak ada indikasi hipertensi yang terdeteksi. Pertahankan pola makan seimbang, aktivitas fisik teratur, dan hidrasi yang cukup untuk menjaga hasil ini.",
    },
    {
      id: "blood_pressure_diastole",
      title: "Tekanan Darah Diastolik",
      value: "71.24",
      unit: "mmHg",
      status: "Rendah",
      icon: greenIcon,
      description:
        "Tekanan darah diastolik adalah tekanan di arteri saat jantung relaksasi di antara dua denyutan. Rentang normal biasanya antara 60–80 mmHg. Nilai di bawah 60 mmHg dapat menunjukkan hipotensi.",
      result:
        "Tekanan darah diastolik Anda sebesar 71.24 mmHg berada dalam rentang sehat. Arteri berfungsi dengan baik saat jantung beristirahat, menunjukkan kesehatan kardiovaskular yang baik. Pantau secara berkala dan hindari konsumsi natrium berlebih.",
    },
    {
      id: "oxygen_saturation",
      title: "Ketersediaan Oksigen dalam Darah",
      value: "95.78",
      unit: "%",
      status: "Rendah",
      icon: greenIcon,
      description:
        "SpO2 mengukur persentase hemoglobin yang terikat oksigen dalam darah, mencerminkan tingkat oksigenasi tubuh. Nilai normal pada orang sehat biasanya berkisar antara 95%–100%.",
      result:
        "SpO2 Anda sebesar 95.78% berada di batas bawah rentang normal. Tubuh masih mengantarkan oksigen secara efisien ke organ dan jaringan. Pastikan Anda bernapas dengan baik dan hindari lingkungan dengan kadar oksigen rendah.",
    },
    {
      id: "cardiac_workload",
      title: "Cardiac Output",
      value: "3319.34",
      unit: "L/min",
      status: "Tinggi",
      icon: yellowIcon,
      description:
        "Cardiac output adalah jumlah darah yang dipompa jantung ke seluruh tubuh per menit. Dihitung dari denyut jantung dikali volume strok. Nilai ini menunjukkan seberapa baik jantung memenuhi kebutuhan oksigen dan nutrisi tubuh.",
      result:
        "Cardiac output Anda sebesar 3319.34 L/min tergolong tinggi. Ini bisa mencerminkan aktivitas fisik yang intens atau kondisi fisiologis tertentu. Jika terjadi saat istirahat secara konsisten, disarankan untuk berkonsultasi dengan dokter guna evaluasi lebih lanjut.",
    },
  ],

  physiological_measurements: [
    {
      id: "heart_rate_variability",
      title: "Variabilitas Detak Jantung",
      value: "29.79",
      unit: "ms",
      status: "Rendah",
      icon: greenIcon,
      description:
        "HRV adalah variasi waktu antar detak jantung berturut-turut, mencerminkan keseimbangan sistem saraf simpatik dan parasimpatik. HRV tinggi menunjukkan kondisi tubuh sehat dan adaptasi baik terhadap stres.",
      result:
        "HRV Anda sebesar 29.79 ms berada dalam kisaran normal (16–50 ms). Ini mencerminkan kesehatan keseluruhan yang baik dan keseimbangan sistem saraf otonom. Pertahankan dengan tidur cukup, olahraga teratur, dan manajemen stres yang baik.",
    },
    {
      id: "breath_rate",
      title: "Tingkat Pernapasan",
      value: "18.57",
      unit: "napas/menit",
      status: "Normal",
      icon: greenIcon,
      description:
        "Tingkat pernapasan adalah jumlah napas per menit, mencerminkan aktivitas sistem pernapasan. Nilai normal orang dewasa saat istirahat berkisar 12–20 napas per menit.",
      result:
        "Tingkat pernapasan Anda sebesar 18.57 napas/menit berada dalam rentang normal. Pernapasan berlangsung efisien untuk mendukung pertukaran oksigen dan karbon dioksida tanpa tanda-tanda kesulitan.",
    },
    {
      id: "pulse_respiration_quotient",
      title: "Pulse-Respiratory Quotient",
      value: "0.96",
      unit: "",
      status: "Tidak Normal",
      icon: yellowIcon,
      description:
        "PRQ adalah rasio antara denyut jantung dan laju pernapasan untuk mengevaluasi interaksi kardiorespirasi. Nilai PRQ normal umumnya sekitar 4:1 pada orang dewasa sehat saat istirahat.",
      result:
        "PRQ Anda sebesar 0.96 menunjukkan ketidakseimbangan koordinasi antara sistem jantung dan pernapasan. Kondisi ini bisa terkait dengan stres, kecemasan, atau faktor medis tertentu. Disarankan untuk melakukan pemeriksaan lebih lanjut jika nilai ini konsisten.",
    },
  ],

  blood_measurements: [
    {
      id: "blood_glucose",
      title: "Gula Darah Sewaktu",
      value: "97.5",
      unit: "mg/dL",
      status: "Normal",
      icon: greenIcon,
      description:
        "Glukosa darah adalah konsentrasi glukosa dalam aliran darah pada suatu waktu tertentu. Glukosa merupakan sumber utama energi untuk sel-sel tubuh. Pemantauan kadar gula darah penting untuk mencegah komplikasi kesehatan.",
      result:
        "Kadar gula darah Anda sebesar 97.5 mg/dL berada dalam rentang normal (di bawah 190 mg/dL untuk non-diabetes). Ini menunjukkan metabolisme glukosa yang sehat. Pertahankan dengan pola makan seimbang dan batasi konsumsi gula berlebih.",
    },
    {
      id: "cholesterol",
      title: "Kolesterol Total",
      value: "231.31",
      unit: "mg/dL",
      status: "Diinginkan",
      icon: greenIcon,
      description:
        "Kolesterol adalah lipid penting dalam membran sel dan berperan dalam produksi hormon serta vitamin D. Kadar kolesterol tinggi, khususnya LDL, dapat meningkatkan risiko penyakit kardiovaskular seperti aterosklerosis.",
      result:
        "Kadar kolesterol total Anda sebesar 231.31 mg/dL sedikit di atas nilai ideal (<200 mg/dL). Perhatikan keseimbangan antara LDL dan HDL, kurangi makanan berlemak jenuh, dan tingkatkan aktivitas fisik untuk membantu menurunkan kadar ini.",
    },
    {
      id: "uric_acid",
      title: "Asam Urat",
      value: "6.58",
      unit: "mg/dL",
      status: "Rendah",
      icon: greenIcon,
      description:
        "Asam urat adalah produk buangan dari pemecahan purin yang biasanya diekskresikan melalui ginjal. Kadar yang terlalu tinggi dapat menyebabkan hiperurisemia dan memicu penyakit gout.",
      result:
        "Kadar asam urat Anda sebesar 6.58 mg/dL berada di batas atas rentang normal (2.4–7.0 mg/dL). Pantau secara berkala dan pertimbangkan pengurangan konsumsi makanan tinggi purin seperti jeroan, daging merah, dan minuman bersoda.",
    },
    {
      id: "hemoglobin",
      title: "Hemoglobin",
      value: "16.17",
      unit: "g/dL",
      status: "Optimal",
      icon: blueIcon,
      description:
        "Hemoglobin adalah protein dalam sel darah merah yang membawa oksigen dari paru-paru ke jaringan dan organ tubuh. Kadar hemoglobin merupakan indikator penting kesehatan secara keseluruhan.",
      result:
        "Kadar hemoglobin Anda sebesar 16.17 g/dL mencerminkan kapasitas pengangkutan oksigen yang optimal. Ini menunjukkan bahwa Anda tidak mengalami anemia atau masalah kesehatan signifikan terkait hemoglobin saat ini.",
    },
    {
      id: "hbalc",
      title: "Hemoglobin Terglikasi (HbA1c)",
      value: "5.3",
      unit: "%",
      status: "Normal",
      icon: redIcon,
      description:
        "HbA1c menunjukkan rata-rata kadar gula darah selama dua hingga tiga bulan terakhir. Sangat penting dalam manajemen diabetes karena memberikan gambaran pengendalian gula darah jangka panjang.",
      result:
        "Nilai HbA1c Anda sebesar 5.3% berada dalam rentang normal (<5.7%). Ini mengindikasikan pengendalian gula darah yang baik dalam tiga bulan terakhir. Pertahankan pola makan sehat dan aktivitas fisik untuk menjaga nilai ini tetap optimal.",
    },
  ],

  body_composition_measurements: [
    {
      id: "body_fat_ratio",
      title: "Rasio Lemak Tubuh",
      value: "25.03",
      unit: "%",
      status: "Tinggi",
      icon: redIcon,
      description:
        "Rasio lemak tubuh adalah proporsi lemak terhadap berat badan total. Persentase ideal bervariasi berdasarkan usia, jenis kelamin, dan tingkat kebugaran.",
      result:
        "Rasio lemak tubuh Anda sebesar 25.03% tergolong tinggi dan dapat meningkatkan risiko masalah kesehatan terkait obesitas. Disarankan untuk meningkatkan aktivitas aerobik dan menjaga pola makan dengan defisit kalori yang sehat.",
    },
    {
      id: "muscle_rate",
      title: "Tingkat Otot",
      value: "39.12",
      unit: "%",
      status: "Baik",
      icon: greenIcon,
      description:
        "Tingkat otot adalah proporsi berat badan yang terdiri dari jaringan otot. Tingkat ideal bervariasi berdasarkan usia, jenis kelamin, dan tingkat kebugaran individu.",
      result:
        "Tingkat otot Anda sebesar 39.12% menunjukkan komposisi otot yang baik. Pertahankan dengan latihan kekuatan (resistance training) dan asupan protein yang cukup untuk mempertahankan massa otot.",
    },
    {
      id: "protein_rate",
      title: "Tingkat Protein",
      value: "21.48",
      unit: "%",
      status: "Tinggi",
      icon: yellowIcon,
      description:
        "Tingkat protein merujuk pada konsentrasi protein dalam berbagai jaringan biologis. Protein berperan dalam dukungan struktural, aktivitas enzim, respons kekebalan, dan sinyal seluler.",
      result:
        "Tingkat protein Anda sebesar 21.48% berada di atas rentang normal. Ini bisa menjadi indikasi peradangan, infeksi, atau kondisi spesifik tertentu. Disarankan untuk berkonsultasi dengan dokter jika kondisi ini persisten.",
    },
    {
      id: "basal_metabolic_range",
      title: "Tingkat Metabolisme Basal",
      value: "1802.39",
      unit: "Kcal",
      status: "Tinggi",
      icon: yellowIcon,
      description:
        "BMR adalah jumlah energi yang dibutuhkan tubuh saat istirahat untuk menjaga fungsi fisiologis dasar seperti pernapasan, peredaran darah, dan produksi sel.",
      result:
        "BMR Anda sebesar 1802.39 Kcal melebihi batas atas normal, menandakan metabolisme yang lebih cepat. Anda cenderung membakar lebih banyak kalori saat istirahat. Pastikan asupan kalori harian mencukupi kebutuhan energi tubuh.",
    },
    {
      id: "body_water",
      title: "Persentase Air dalam Tubuh",
      value: "58.44",
      unit: "%",
      status: "Berlebih",
      icon: redIcon,
      description:
        "Persentase air tubuh adalah proporsi total air terhadap berat badan. Ini penting untuk menilai status hidrasi dan distribusi cairan dalam tubuh.",
      result:
        "Persentase air tubuh Anda sebesar 58.44% tergolong berlebih dan dapat menyebabkan ketidakseimbangan elektrolit. Kondisi ini perlu dievaluasi lebih lanjut, terutama jika disertai gejala seperti pembengkakan atau kelelahan.",
    },
    {
      id: "bone_mass",
      title: "Massa Tulang",
      value: "4.1",
      unit: "Kg",
      status: "Tinggi",
      icon: yellowIcon,
      description:
        "Massa tulang adalah jumlah total jaringan tulang dalam tubuh, menunjukkan kepadatan dan kekuatan sistem rangka. Massa tulang yang baik penting untuk integritas dan ketahanan struktur rangka.",
      result:
        "Massa tulang Anda sebesar 4.1 kg berada di atas rata-rata. Meskipun kepadatan tulang yang tinggi bermanfaat untuk kekuatan, nilai yang terlalu tinggi mungkin memerlukan evaluasi lebih lanjut oleh dokter.",
    },
    {
      id: "visceral_fat",
      title: "Lemak Visceral",
      value: "6.81",
      unit: "",
      status: "Tinggi",
      icon: redIcon,
      description:
        "Lemak visceral adalah lemak yang mengelilingi organ-organ internal. Penumpukan berlebihan lemak visceral dapat berhubungan dengan peningkatan risiko kesehatan seperti penyakit jantung dan diabetes.",
      result:
        "Lemak visceral Anda sebesar 6.81 tergolong tinggi dan dapat meningkatkan risiko penyakit metabolik. Prioritaskan perubahan gaya hidup seperti diet rendah karbohidrat olahan, olahraga aerobik intens, dan tidur yang cukup.",
    },
    {
      id: "subcutaneous_fat",
      title: "Lemak Subkutan",
      value: "9.37",
      unit: "",
      status: "Tinggi",
      icon: redIcon,
      description:
        "Lemak subkutan adalah lapisan lemak di bawah kulit. Meskipun kurang aktif secara metabolik dibandingkan lemak visceral, penumpukan berlebihan dapat berdampak pada komposisi dan kesehatan tubuh.",
      result:
        "Lemak subkutan Anda sebesar 9.37 menunjukkan akumulasi yang substansial. Disarankan untuk mengadopsi pola hidup seimbang dengan diet sehat dan aktivitas fisik teratur guna mengurangi lemak tubuh secara keseluruhan.",
    },
    {
      id: "fat_mass",
      title: "Massa Lemak",
      value: "17.52",
      unit: "Kg",
      status: "Tinggi",
      icon: redIcon,
      description:
        "Massa lemak menunjukkan jumlah total lemak dalam tubuh. Mengkategorikan tingkat massa lemak membantu memahami komposisi tubuh dan risiko kesehatan terkait.",
      result:
        "Massa lemak Anda sebesar 17.52 kg tergolong tinggi dan dapat meningkatkan risiko obesitas serta penyakit terkait. Kombinasi latihan kardio, latihan kekuatan, dan defisit kalori moderat direkomendasikan untuk menurunkan massa lemak.",
    },
    {
      id: "muscle_mass",
      title: "Massa Otot",
      value: "27.38",
      unit: "Kg",
      status: "Baik",
      icon: greenIcon,
      description:
        "Massa otot adalah berat total otot rangka dalam tubuh. Tingkat massa otot yang baik memberikan wawasan tentang kekuatan, kebugaran fisik, dan kesehatan secara keseluruhan.",
      result:
        "Massa otot Anda sebesar 27.38 kg menunjukkan akumulasi otot yang substansial. Pertahankan dengan latihan kekuatan rutin dan asupan protein yang adekuat (1.2–2.0 g/kg berat badan per hari).",
    },
    {
      id: "protein_mass",
      title: "Massa Protein",
      value: "15.04",
      unit: "Kg",
      status: "Tinggi",
      icon: yellowIcon,
      description:
        "Massa protein adalah jumlah total protein dalam tubuh, mencakup protein pada otot, organ, jaringan, dan struktur lainnya.",
      result:
        "Massa protein Anda sebesar 15.04 kg melebihi rentang normal. Meskipun asupan protein tinggi sesuai untuk beberapa individu, tingkat yang sangat tinggi tidak selalu memberikan manfaat tambahan dan dapat memiliki implikasi kesehatan.",
    },
  ],

  physical_measurements: [
    {
      id: "body_mass_index",
      title: "Indeks Massa Tubuh",
      value: "24.22",
      unit: "kg/m²",
      status: "Normal",
      icon: greenIcon,
      description:
        "BMI adalah ukuran untuk menilai status berat badan berdasarkan perbandingan berat badan (kg) dan tinggi badan (m²). Rentang normal umumnya antara 18.5–24.9 kg/m².",
      result:
        "BMI Anda sebesar 24.22 kg/m² berada di batas atas rentang normal. Risiko penyakit kronis seperti diabetes tipe 2 dan penyakit kardiovaskular masih tergolong rendah. Pertahankan berat badan dengan pola makan sehat dan olahraga teratur.",
    },
    {
      id: "skin_age",
      title: "Usia Biologis Kulit",
      value: "",
      unit: "",
      status: "Sangat Muda",
      icon: blueIcon,
      description:
        "Usia biologis kulit adalah estimasi usia kulit berdasarkan kondisi dan penampilannya, mempertimbangkan faktor seperti keriput, elastisitas, dan tekstur kulit.",
      result:
        "Usia biologis kulit Anda dikategorikan Sangat Muda, menunjukkan kondisi kulit yang sangat baik. Pertahankan dengan penggunaan tabir surya, hidrasi yang cukup, dan pola makan kaya antioksidan.",
    },
  ],

  mental_measurements: [
    {
      id: "stress_level",
      title: "Tingkat Stres",
      value: "1.67",
      unit: "",
      status: "Rendah",
      icon: greenIcon,
      description:
        "Tingkat stres mencerminkan tekanan fisik, mental, atau emosional yang dialami seseorang. Stres berlebihan dan berkepanjangan dapat berdampak negatif pada kesehatan fisik dan mental.",
      result:
        "Tingkat stres Anda sebesar 1.67 tergolong rendah. Anda mampu menangani pemicu stres tanpa gangguan signifikan pada kesejahteraan. Tingkat stres yang moderat bahkan dapat memotivasi pencapaian tujuan. Pertahankan keseimbangan hidup yang baik.",
    },
  ],
};
