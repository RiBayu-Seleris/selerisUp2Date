import { computed, unref } from "vue";
import { useI18n } from "vue-i18n";

/**
 * Menggabungkan daftar data (ikon, warna, urutan) dengan teksnya dari file locale.
 *
 * File di src/Data hanya menyimpan struktur; semua kalimat ada di
 * src/locales/en.json dan id.json. Helper ini menyatukan keduanya sehingga
 * komponen tetap memakai daftar seperti biasa dan teksnya ikut berganti bahasa.
 *
 * @param {string} namespace kunci di file locale, mis. "products.lifins.faq"
 * @param {Array|import('vue').Ref<Array>} list daftar struktur dari src/Data
 * @param {string[]} fields nama field teks, mis. ["question", "answer"]
 */
export function useLocalizedList(namespace, list, fields) {
  const { t } = useI18n();
  return computed(() =>
    unref(list).map((item, index) => {
      const localized = { ...item };
      for (const field of fields) {
        localized[field] = t(`${unref(namespace)}.${index}.${field}`);
      }
      return localized;
    }),
  );
}
