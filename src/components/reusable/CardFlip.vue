
<template>
  <div
    class="snap-start shrink-0 w-[85%] sml:h-[270px] md:h-[200px] lg:h-[230px] perspective"
    @click="isFlippedLeft = !isFlippedLeft"
  >
    <div
      :class="[
        'relative w-full h-full duration-700 transform-style preserve-3d',
        isFlippedLeft ? 'rotate-y-180' : '',
      ]"
    >
      <!-- FRONT -->
      <div
        class="flex flex-col gap-5 absolute w-full h-full backface-hidden bg-[#F9FAFB] rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-30 border border-gray-100 shadow-md p-5"
      >
        <div class="sml:hidden flex flex-row w-full h-auto gap-5">
          <div class="w-[15%] h-auto">
            <img
              src="@/assets/images/certification/logo/Cert1.png"
              alt="CertLogo"
              class="w-full h-full object-center object-contain"
            />
          </div>
          <div class="w-[85%] h-auto flex flex-col gap-2 text-[#195279]">
            <div class="w-full h-auto">
              <p class="text-2xl">ISO CERTIFICATION</p>
            </div>
            <div class="w-full h-auto">
              <p class="text-xl">Certificate Number: 2403150020501</p>
            </div>
          </div>
        </div>

        <!-- sml Screen -->
        <div class="md:hidden flex flex-col w-full h-auto text-[#195279]">
          <div class="flex flex-col w-full h-auto">
            <div class="flex flex-row w-full h-auto gap-x-4 mb-3">
              <div class="flex w-[20%] h-auto">
                <img
                  src="@/assets/images/certification/logo/Cert1.png"
                  alt="CertLogo"
                  class="w-full h-full object-center object-contain"
                />
              </div>
              <div class="flex w-[80%] h-auto items-center">
                <p class="text-xl font-semibold">ISO CERTIFICATION</p>
              </div>
            </div>
            <div class="flex w-full h-auto">
              <p class="text-base">Certificate Number: 2403150020501</p>
            </div>
          </div>
        </div>

        <!-- Descriptions -->
        <div class="flex w-full h-auto">
          <p class="text-base overflow-hidden" v-html="shortText"></p>
        </div>
      </div>

      <!-- BACK -->
      <div
        class="absolute w-full h-full backface-hidden rotate-y-180 bg-[#F9FAFB] rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-30 border border-gray-100 shadow-md p-5"
      >
        <p class="text-base overflow-hidden" v-html="fullText"></p>
      </div>
    </div>
  </div>
</template>
