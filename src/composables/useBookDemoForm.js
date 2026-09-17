import { ref } from "vue";
import axios from "axios";
import Swal from "sweetalert2";
import { useI18n } from "vue-i18n";

const BASE_URL = import.meta.env.VITE_API_URL;

// Negara awal di dropdown. Disamakan dengan pilihan pertama CountrySelect
// supaya kotaknya tidak pernah tampil kosong saat halaman baru dibuka.
const NEGARA_AWAL = {
  name: "Indonesia",
  code: "ID",
  flag: "https://flagcdn.com/w40/id.png",
};

const kosong = () => ({
  firstName: "",
  lastName: "",
  company: "",
  jobTitle: "",
  email: "",
  country: { ...NEGARA_AWAL },
  product: null,
  message: "",
});

/**
 * Logika formulir "Book a Demo".
 *
 * Kembaran useContactForm, dengan satu tambahan penting: permintaan demo
 * menyebut PRODUK yang ingin dilihat, dan itulah yang menentukan siapa di tim
 * yang menindaklanjuti. Karena itu produk ikut wajib diisi di sisi klien,
 * bukan hanya nama dan email.
 *
 * Produk dikirim sebagai dua nilai. product_id adalah slug yang stabil,
 * dipakai CMS untuk menyaring; product_name adalah nama yang dilihat
 * pengunjung saat mengirim, ikut disimpan supaya permintaan lama tetap
 * terbaca apa adanya walau produknya kelak berganti nama.
 */
export function useBookDemoForm() {
  const { t } = useI18n();

  const form = ref(kosong());
  const mengirim = ref(false);

  const kosongkan = () => {
    form.value = kosong();
  };

  const kirim = async () => {
    // Penjagaan sederhana di sisi klien supaya pengunjung mendapat jawaban
    // seketika. Validasi yang sebenarnya tetap di backend.
    if (
      !form.value.firstName.trim() ||
      !form.value.email.trim() ||
      !form.value.product?.id
    ) {
      Swal.fire({
        icon: "warning",
        title: t("bookDemo.incompleteTitle"),
        text: t("bookDemo.incompleteText"),
        confirmButtonColor: "#2AB857",
      });
      return;
    }

    try {
      mengirim.value = true;

      await axios.post(
        `${BASE_URL}/api/v1/app/demo-requests`,
        {
          first_name: form.value.firstName.trim(),
          last_name: form.value.lastName.trim() || null,
          email: form.value.email.trim(),
          company: form.value.company.trim() || null,
          job_title: form.value.jobTitle.trim() || null,
          country_code: form.value.country?.code ?? null,
          country_name: form.value.country?.name ?? null,
          product_id: form.value.product.id,
          product_name: form.value.product.name,
          message: form.value.message.trim() || null,
        },
        { headers: { Accept: "application/json" } },
      );

      Swal.fire({
        icon: "success",
        title: t("bookDemo.successTitle"),
        text: t("bookDemo.successText"),
        confirmButtonColor: "#2AB857",
      });
      kosongkan();
    } catch (error) {
      const status = error.response?.status;

      // 422 = isian ditolak backend, 429 = terlalu sering mengirim.
      // Keduanya salah pengguna, bukan gangguan server, jadi pesannya beda.
      let teks = t("bookDemo.errorText");

      // 404/405 berarti endpoint-nya memang belum ada di server — bukan
      // gangguan sesaat. Dibedakan supaya pengunjung tidak disuruh "coba lagi
      // sebentar" untuk sesuatu yang tidak akan pernah berhasil, dan supaya
      // kalau ini muncul setelah rilis, ia terbaca sebagai regresi rute, bukan
      // server yang sedang sibuk.
      if (status === 404 || status === 405) {
        teks = t("bookDemo.notAvailableText");
      } else if (status === 422) {
        const daftar = error.response?.data?.errors;
        teks = daftar
          ? Object.values(daftar).flat().join(" ")
          : t("bookDemo.incompleteText");
      } else if (status === 429) {
        teks = t("bookDemo.tooManyText");
      }

      Swal.fire({
        icon: "error",
        title: t("bookDemo.errorTitle"),
        text: teks,
        confirmButtonColor: "#2AB857",
      });
    } finally {
      mengirim.value = false;
    }
  };

  return { form, mengirim, kirim };
}
