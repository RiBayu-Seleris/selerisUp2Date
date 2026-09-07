// Teks ada di src/locales/en.json & id.json pada kunci sca.howToJoin.items.<index>.
// Field teks (step, content) diisi useLocalizedList di komponen.
export const howToJoin = [
  {
    id: 1,
    icon: new URL("@/assets/icons/user-add.svg", import.meta.url).href,
  },
  {
    id: 2,
    icon: new URL("@/assets/icons/user-learn.svg", import.meta.url).href,
  },
  {
    id: 3,
    icon: new URL("@/assets/icons/user-scan.svg", import.meta.url).href,
  },
];
