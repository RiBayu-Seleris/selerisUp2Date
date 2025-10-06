<script setup>
defineProps({
  imgUrl: {
    type: String,
  },
  darkImgUrl: {
    type: String,
  },
});
</script>

<template>
  <div
    class="w-full h-auto flex justify-center mt-14 lg:mt-20 xl:mt-16 dark:bg-[#17181A]"
  >
    <img
      :src="imgUrl"
      alt="Logo"
      class="w-full h-full sml:w-[150px] md:w-[250px] xl:w-[300px] object-contain lg:object-cover dark:hidden"
    />
    <img
      :src="darkImgUrl"
      alt="Logo"
      class="w-full h-full sml:w-[150px] md:w-[250px] xl:w-[300px] object-contain lg:object-cover hidden dark:block"
    />
  </div>
</template>
