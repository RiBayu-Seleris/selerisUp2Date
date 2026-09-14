import { ref, nextTick, onMounted, onUnmounted } from "vue";

// Panah kiri/kanan + seret kursor untuk deretan yang bisa digulir mendatar.
// Panahnya muncul sendiri hanya kalau masih ada isi ke arah itu.
// Pasang hasilnya di template: :ref="x.pasangEl" pada kotak overflow-x-auto.
// Handler seret (seretMulai/seretGerak/seretSelesai/tahanKlik) sifatnya
// opsional — tempelkan hanya kalau deretan itu memang mau bisa diseret.
export function buatCarousel() {
  const wadah = ref(null);
  const bisaKeKiri = ref(false);
  const bisaKeKanan = ref(false);

  const pasangEl = (el) => {
    wadah.value = el;
  };

  const perbaruiPanah = () => {
    const el = wadah.value;
    if (!el) return;
    const maksimum = el.scrollWidth - el.clientWidth;
    // Toleransi 2 piksel: posisi gulir sering pecahan.
    bisaKeKiri.value = el.scrollLeft > 2;
    bisaKeKanan.value = el.scrollLeft < maksimum - 2;
  };

  let idFrame = null;
  const tanganiGulir = () => {
    if (idFrame) return;
    idFrame = requestAnimationFrame(() => {
      perbaruiPanah();
      idFrame = null;
    });
  };

  // Lebar anak berbeda-beda antar deretan, jadi langkahnya diukur dari
  // halaman, bukan ditulis tetap.
  const langkahGulir = () => {
    const el = wadah.value;
    const anak = Array.from(el.children).find(
      (x) => x.getBoundingClientRect().width > 0,
    );
    if (!anak) return el.clientWidth * 0.8;
    const gaya = getComputedStyle(el);
    const jarak = parseFloat(gaya.columnGap || gaya.gap || "0") || 0;
    return anak.getBoundingClientRect().width + jarak;
  };

  const geser = (arah) => {
    const el = wadah.value;
    if (!el) return;
    el.scrollBy({
      left: arah === "right" ? langkahGulir() : -langkahGulir(),
      behavior: "smooth",
    });
  };

  let menyeret = false;
  let mulaiX = 0;
  let mulaiScroll = 0;
  let jauhnya = 0;

  const seretMulai = (e) => {
    const el = wadah.value;
    if (!el) return;
    menyeret = true;
    jauhnya = 0;
    mulaiX = e.pageX;
    mulaiScroll = el.scrollLeft;
    el.style.cursor = "grabbing";
    el.style.userSelect = "none";
    // Kalau deretannya pakai scroll-smooth, tiap penetapan scrollLeft ikut
    // dianimasikan dan seretannya terasa molor jauh di belakang kursor.
    el.style.scrollBehavior = "auto";
    // Snap dimatikan selama diseret; kalau tidak, tiap gerakan kecil ditarik
    // paksa ke kartu terdekat dan seretannya terasa melawan.
    el.classList.remove("snap-x", "snap-mandatory");
  };

  const seretGerak = (e) => {
    if (!menyeret) return;
    e.preventDefault();
    const geseran = e.pageX - mulaiX;
    jauhnya = Math.max(jauhnya, Math.abs(geseran));
    wadah.value.scrollLeft = mulaiScroll - geseran * 1.2;
  };

  const seretSelesai = () => {
    if (!menyeret) return;
    menyeret = false;
    const el = wadah.value;
    el.style.cursor = "grab";
    el.style.userSelect = "";
    el.style.scrollBehavior = "";
    el.classList.add("snap-x", "snap-mandatory");
  };

  // Untuk deretan yang isinya bisa diklik: seretan yang berakhir di atas
  // sebuah kartu jangan ikut terhitung klik.
  const tahanKlik = (e) => {
    if (jauhnya > 5) {
      e.stopPropagation();
      e.preventDefault();
      jauhnya = 0;
    }
  };

  // Dipanggil saat isinya berganti: lebar isi berubah tanpa mengubah ukuran
  // kotaknya, jadi ResizeObserver tidak ikut berbunyi.
  const segarkan = async (keAwal = false) => {
    await nextTick();
    const el = wadah.value;
    if (!el) return;
    if (keAwal) el.scrollLeft = 0;
    perbaruiPanah();
  };

  let pengamat = null;

  onMounted(async () => {
    await nextTick();
    const el = wadah.value;
    if (!el) return;
    perbaruiPanah();
    el.addEventListener("scroll", tanganiGulir, { passive: true });
    // Lebar isi berubah saat gambarnya selesai dimuat — itu tidak mengubah
    // ukuran jendela, jadi pendengar "resize" saja tidak cukup.
    pengamat = new ResizeObserver(perbaruiPanah);
    pengamat.observe(el);
    for (const anak of el.children) pengamat.observe(anak);
  });

  onUnmounted(() => {
    wadah.value?.removeEventListener("scroll", tanganiGulir);
    pengamat?.disconnect();
    if (idFrame) cancelAnimationFrame(idFrame);
  });

  return {
    pasangEl,
    bisaKeKiri,
    bisaKeKanan,
    geser,
    seretMulai,
    seretGerak,
    seretSelesai,
    tahanKlik,
    segarkan,
  };
}
