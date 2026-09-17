import { ref } from "vue";
import axios from "axios";
import Swal from "sweetalert2";
import { useI18n } from "vue-i18n";

const BASE_URL = import.meta.env.VITE_API_URL;

// Isian formulir ditaruh di lingkup MODUL, bukan di dalam useContactForm().
//
// Touch.vue dan TouchMobile.vue keduanya terpasang sekaligus; yang satu
// disembunyikan CSS (`hidden lg:block` dan `lg:hidden`), bukan dilepas dari
// halaman. Selama masing-masing memanggil ref() sendiri, keduanya memegang
// isian sendiri — dan pengunjung yang sudah mengetik di lebar desktop lalu
// jendelanya menyempit akan mendapati formulir kosong, karena yang tampil
// sekarang formulir yang lain, bukan formulir yang tadi ia isi.
//
// Satu ref dipakai berdua membuat keduanya selalu menampilkan isian yang sama,
// berapa pun lebar layarnya. Aman disimpan di lingkup modul karena <Touch />
// dipasang di App.vue dan tidak pernah dilepas selama aplikasi hidup, jadi
// umurnya memang sepanjang itu sejak awal.
const form = ref({ name: "", email: "", message: "" });
const mengirim = ref(false);

/**
 * Logika formulir "Get In Touch".
 *
 * Dipakai bersama oleh Touch.vue (desktop) dan TouchMobile.vue — keduanya
 * menampilkan formulir yang sama dengan tata letak berbeda, jadi logikanya
 * ditaruh di sini supaya tidak ditulis dua kali dan tidak sempat berbeda.
 */
export function useContactForm() {
  const { t } = useI18n();

  const kosongkan = () => {
    form.value = { name: "", email: "", message: "" };
  };

  const kirim = async () => {
    // Penjagaan sederhana di sisi klien supaya pengunjung mendapat jawaban
    // seketika. Validasi yang sebenarnya tetap di backend.
    if (!form.value.name.trim() || !form.value.email.trim() || !form.value.message.trim()) {
      Swal.fire({
        icon: "warning",
        title: t("contact.incompleteTitle"),
        text: t("contact.incompleteText"),
        confirmButtonColor: "#2AB857",
      });
      return;
    }

    try {
      mengirim.value = true;

      await axios.post(
        `${BASE_URL}/api/v1/app/contacts`,
        {
          name: form.value.name.trim(),
          email: form.value.email.trim(),
          message: form.value.message.trim(),
        },
        { headers: { Accept: "application/json" } },
      );

      Swal.fire({
        icon: "success",
        title: t("contact.successTitle"),
        text: t("contact.successText"),
        confirmButtonColor: "#2AB857",
      });
      kosongkan();
    } catch (error) {
      const status = error.response?.status;

      // 422 = isian ditolak backend, 429 = terlalu sering mengirim.
      // Keduanya salah pengguna, bukan gangguan server, jadi pesannya beda.
      let teks = t("contact.errorText");

      // 404/405 berarti endpoint-nya memang belum ada di server — bukan
      // gangguan sesaat. Dibedakan supaya pengunjung tidak disuruh "coba lagi
      // sebentar" untuk sesuatu yang tidak akan pernah berhasil, dan supaya
      // kalau ini muncul setelah rilis, ia terbaca sebagai regresi rute, bukan
      // server yang sedang sibuk.
      if (status === 404 || status === 405) {
        teks = t("contact.notAvailableText");
      } else if (status === 422) {
        const daftar = error.response?.data?.errors;
        teks = daftar ? Object.values(daftar).flat().join(" ") : t("contact.incompleteText");
      } else if (status === 429) {
        teks = t("contact.tooManyText");
      }

      Swal.fire({
        icon: "error",
        title: t("contact.errorTitle"),
        text: teks,
        confirmButtonColor: "#2AB857",
      });
    } finally {
      mengirim.value = false;
    }
  };

  return { form, mengirim, kirim };
}
