<script setup>
/**
 * Isian teks satu baris untuk formulir.
 *
 * Nilainya diikat dua arah lewat v-model. Sebelumnya komponen ini hanya
 * menerima label dan placeholder, tanpa jalur keluar sama sekali — apa pun
 * yang diketik pengunjung tidak pernah bisa dibaca oleh halaman yang
 * memakainya, sehingga formulirnya mustahil dikirim.
 */
const nilai = defineModel({ type: String, default: "" });

defineProps({
  name: {
    type: String,
  },
  label: {
    type: String,
  },
  type: {
    type: String,
  },
  placeholder: {
    type: String,
  },

  // Menampilkan tanda bintang merah dan menyalakan atribut required,
  // mengikuti cara CountrySelect dan ProductSelect menandai isian wajib.
  required: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <div class="w-full h-auto flex flex-col space-y-1">
    <div class="w-full h-auto">
      <label :for="name"
        >{{ label }} <span v-if="required" class="text-red-500">*</span></label
      >
    </div>
    <div class="w-full h-auto">
      <input
        :id="name"
        v-model="nilai"
        :name="name"
        :type="type"
        :required="required"
        :aria-label="name"
        class="w-full p-2 rounded-[8px] border-gray-300 placeholder-[6F6F6F] dark:bg-[#323232] border dark:border-[#FAFAFA]/25 focus:outline-none focus:ring-1 focus:ring-[#2AB857]"
        :placeholder="placeholder"
      />
    </div>
  </div>
</template>
