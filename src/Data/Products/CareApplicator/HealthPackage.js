// Teks paket ada di src/locales/en.json & id.json pada kunci
// sca.healthPackages (badge) dan sca.packageFeatures.<id> (features).
export const payPerScanPackages = [
  {
    id: "essential",
    label: "ESSENTIAL",
    price: 120000,
    parameterTotal: 15,
    featureCount: 4,
    commission: { direct: 18000, team: 12000 },
    modalValues: [],
  },
  {
    id: "core",
    label: "CORE",
    price: 150000,
    parameterTotal: 20,
    featureCount: 5,
    commission: { direct: 22500, team: 15000 },
    modalValues: [],
  },
  {
    id: "prime",
    label: "PRIME",
    price: 200000,
    parameterTotal: 30,
    featureCount: 7,
    commission: { direct: 30000, team: 20000 },
    modalValues: [],
  },
];
