import { ref } from "vue";
import axios from "axios";
import Swal from "sweetalert2";
import { useI18n } from "vue-i18n";

const BASE_URL = import.meta.env.VITE_API_URL;

/**
 * Pengiriman formulir "Request Demo" sebelum mencoba fitur Scan Yourself.
 *
 * Berbeda dari useContactForm dan useBookDemoForm dalam satu hal penting:
 * kegagalan mengirim TIDAK menghentikan pengunjung.
 *
 * Alasannya, yang dicari pengunjung di sini adalah mencoba fitur scan, bukan
 * mengirim formulir. Kalau server lead sedang bermasalah, menahannya di
 * tengah alur berarti menghukum dia atas gangguan di pihak kita — dan
 * kehilangan pemakaian fitur yang justru ingin kita perlihatkan.
 *
 * Pengecualiannya isian yang ditolak (422) dan pengiriman terlalu sering
 * (429): keduanya salah pengguna dan bisa ia perbaiki sendiri, jadi ditahan
 * dan diberi tahu.
 *
 * @returns {{ mengirim, kirim }} kirim() menghasilkan true kalau alurnya
 *          boleh dilanjutkan ke langkah profil.
 */
export function useScanDemoForm() {
  const { t } = useI18n();

  const mengirim = ref(false);

  const kirim = async (form) => {
    try {
      mengirim.value = true;

      await axios.post(
        `${BASE_URL}/api/v1/app/scan-demos`,
        {
          first_name: form.firstName.trim(),
          business_email: form.businessEmail.trim(),
          company_name: form.companyName.trim() || null,
          goals: form.goals.trim() || null,
          agree_marketing: !!form.agreeMarketing,
          device_id: form.deviceId || null,
        },
        { headers: { Accept: "application/json" } },
      );

      return true;
    } catch (error) {
      const status = error.response?.status;

      if (status === 422 || status === 429) {
        const daftar = error.response?.data?.errors;

        Swal.fire({
          icon: status === 429 ? "warning" : "error",
          title: t("contact.errorTitle"),
          text:
            status === 429
              ? t("contact.tooManyText")
              : daftar
                ? Object.values(daftar).flat().join(" ")
                : t("contact.incompleteText"),
          confirmButtonColor: "#2AB857",
        });

        return false;
      }

      // Gangguan di pihak kita. Dicatat untuk ditelusuri, tapi pengunjung
      // tetap dipersilakan melanjutkan ke pemindaian.
      console.error("Gagal mengirim permintaan demo scan:", error);

      return true;
    } finally {
      mengirim.value = false;
    }
  };

  return { mengirim, kirim };
}
