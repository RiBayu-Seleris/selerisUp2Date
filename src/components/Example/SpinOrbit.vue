<script setup></script>

<template>
  <div class="relative w-full h-[780px] mx-auto overflow-hidden">
    <!-- Matahari -->
    <div
      class="absolute top-1/2 left-1/2 w-[200px] h-[200px] -mt-[100px] -ml-[100px] rounded-full bg-yellow-400 shadow-[0_0_84px_orange] z-10"
    ></div>

    <!-- Mercury -->
    <div
      class="absolute top-1/2 left-1/2 w-[280px] h-[280px] -ml-[140px] -mt-[140px] border border-dashed border-gray-600 rounded-full"
    ></div>
    <div
      class="absolute top-1/2 left-1/2 animate-[spin-right_8.8s_linear_infinite] w-[280px] h-[280px] -ml-[140px] -mt-[140px]"
    >
      <div
        class="absolute top-0 left-1/2 w-[25px] h-[25px] -ml-[12.5px] -mt-[12.5px] rounded-full bg-[#a65e22]"
      ></div>
    </div>

    <!-- Venus -->
    <div
      class="absolute top-1/2 left-1/2 w-[370px] h-[370px] -ml-[185px] -mt-[185px] border border-dashed border-gray-600 rounded-full"
    ></div>
    <div
      class="absolute top-1/2 left-1/2 animate-[spin-right_22s_linear_infinite] w-[370px] h-[370px] -ml-[185px] -mt-[185px]"
    >
      <div
        class="absolute top-0 left-1/2 w-[40px] h-[40px] -ml-[20px] -mt-[20px] rounded-full bg-[#3498db] shadow-[0_0_34px_#3a4385]"
      ></div>
    </div>

    <!-- Earth & Moon -->
    <div
      class="absolute top-1/2 left-1/2 w-[500px] h-[500px] -ml-[250px] -mt-[250px] border border-dashed border-gray-600 rounded-full"
    ></div>
    <div
      class="absolute top-1/2 left-1/2 animate-spin-right w-[500px] h-[500px] -ml-[250px] -mt-[250px]"
    >
      <!-- Moon Orbit -->
      <div
        class="absolute top-0 left-1/2 w-[90px] h-[90px] -ml-[45px] -mt-[45px] border border-dashed border-[#447] rounded-full"
      ></div>
      <div
        class="absolute top-0 left-1/2 w-[90px] h-[90px] -ml-[45px] -mt-[45px] animate-[spin-right_3s_linear_infinite]"
      >
        <div
          class="absolute top-0 left-1/2 w-[12px] h-[12px] -ml-[6px] -mt-[6px] bg-white rounded-full shadow-[0_0_14px_#3a4385]"
        ></div>
      </div>
      <!-- Earth -->
      <img
        class="absolute top-0 left-1/2 w-[50px] h-[50px] -ml-[25px] -mt-[25px] rounded-full shadow-[0_0_34px_#3a4385]"
        src="https://raw.githubusercontent.com/everdimension-personal/codepen-assets/master/earth_small_150.jpg"
        alt="earth"
      />
    </div>

    <!-- Mars -->
    <div
      class="absolute top-1/2 left-1/2 w-[700px] h-[700px] -ml-[350px] -mt-[350px] border border-dashed border-gray-600 rounded-full"
    ></div>
    <div
      class="absolute top-1/2 left-1/2 animate-[spin-right_68.7s_linear_infinite] w-[700px] h-[700px] -ml-[350px] -mt-[350px]"
    >
      <div
        class="absolute top-0 left-1/2 w-[32px] h-[32px] -ml-[16px] -mt-[16px] rounded-full bg-[#863222] shadow-[0_0_14px_#a64232]"
      ></div>
    </div>
  </div>
</template>
<style scoped>
@keyframes spin-right {
  to {
    transform: rotate(360deg);
  }
}
</style>
