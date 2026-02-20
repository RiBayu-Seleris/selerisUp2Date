<script setup></script>
<template>
  <div
    v-for="i in 3"
    :key="i"
    class="w-full h-auto p-[2px] bg-gradient-to-tr from-[#2BE1C2] to-[#EDFCF9] rounded-xl overflow-hidden"
  >
    <div class="w-full h-auto flex flex-col gap-y-5 bg-white rounded-xl p-5">
      <div
        class="w-full h-auto flex flex-row gap-x-2 items-center text-[#21CBAF] font-[600]"
      >
        <p class="text-[20px]">CORE</p>
        <span class="text-[14px]">(Popular)</span>
      </div>
      <div class="w-full h-auto flex items-center">
        <div class="w-full h-full flex flex-row gap-x-1 items-center">
          <div class="w-auto h-auto flex items-center">
            <p class="text-[#374151] font-[600] text-[26px]">Rp 120.000</p>
          </div>
          <div class="w-auto h-auto flex items-center">
            <p class="text-[#A0A3BD] font-[400] text-[16px]">/Scan</p>
          </div>
        </div>
      </div>
      <div class="w-full h-[250px] flex flex-col gap-y-5">
        <div
          v-for="i in 6"
          :key="i"
          class="w-full h-auto flex flex-row items-start gap-x-3"
        >
          <div
            class="w-6 h-6 flex justify-center items-center bg-[#10F492]/20 rounded-full p-1"
          >
            <img src="@/assets/icons/green-checklist.svg" alt="" srcset="" />
          </div>
          <div class="w-auto h-full flex items-center">
            <p class="text-[#515E71] font-[400] text-[16px]">15 parameter</p>
          </div>
        </div>
      </div>
      <div class="w-full h-[2px] bg-[#E2E7EF]" />
      <div class="w-full h-auto flex flex-col gap-y-5">
        <div class="w-full h-auto flex items-center">
          <p class="text-[#515E71] font-[600] text-[16px]">
            Potensi Komisi SCA
          </p>
        </div>
        <div class="w-full h-auto flex flex-col gap-y-3">
          <div class="w-full h-auto flex flex-row justify-between">
            <p class="text-[#515E71] font-[400] text-[16px]">Direct Income</p>
            <p class="text-[#515E71] font-[600] text-[]">Rp 18.000</p>
          </div>
          <div class="w-full h-auto flex flex-row justify-between">
            <p class="text-[#515E71] font-[400] text-[16px]">Team Income</p>
            <p class="text-[#515E71] font-[600] text-[]">Rp 18.000</p>
          </div>
        </div>
        <div class="w-full h-auto flex">
          <div
            class="w-full h-auto flex justify-center items-center bg-[#C4EAFF] py-3 rounded-md"
          >
            <p class="text-[#2C78A3] font-[600] text-[16px]">
              Lihat Detail Paket
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
