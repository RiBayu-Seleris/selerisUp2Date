<template>
  <div class="mt-10">
    <div class="hidden lg:flex relative w-full h-full">
      <!-- Background image -->
      <div class="w-full h-auto mt-5">
        <img
          src="@/assets/images/bg-ai-machine.png"
          alt="Background"
          class="w-full h-full object-center object-cover relative"
        />
      </div>
      <div class="absolute w-full h-auto mt-20">
        <div class="flex flex-row justify-between">
          <div class="w-full pl-8 pt-0">
            <div class="w-full h-auto">
              <p
                class="text-[43pt] bg-gradient-to-b from-[#FF09C2] to-[#2B3CFC] bg-clip-text text-transparent leading-[80px] font-semibold"
              >
                AI and Machine Learning Algorithms
              </p>
            </div>
            <div>
              <p class="text-[14pt] w-full font-normal pt-7">
                Our AI and ML algorithms conduct in-depth risk assessments,
                considering various factors and subtleties that impact insurance
                outcomes. This sophisticated analysis enables us to provide
                insurers with tailored guidance and recommendations, enhancing
                their decision-making processes and ultimately improving
                customer satisfaction and retention.
              </p>
            </div>
          </div>
          <div class="w-full h-auto">
            <div class="flex flex-row justify-between">
              <div class="w-auto h-[150px] z-0">
                <img
                  src="@/assets/images/stars.svg"
                  alt="Stars"
                  class="w-full h-full object-top object-contain"
                />
              </div>
              <div
                class="flex w-full h-full bottom-0 z-0 pt-[100px] md:pt-[100px] pl-5"
              >
                <img
                  src="@/assets/images/robot-ai.svg"
                  alt="Robot"
                  class="w-[400px] h-[400px] object-contain object-bottom animate-bounce"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Mobile Version -->
    <div
      class="flex flex-col lg:hidden w-full h-auto bg-[#f2f3f3] rounded-[2rem] py-5 relative"
    >
      <div class="w-[15rem] h-[15rem] justify-center items-center self-center">
        <div class="w-auto h-full z-50">
          <img
            src="@/assets/images/robot-ai.svg"
            alt="Robot"
            class="w-full h-full object-contain object-center animate-wiggle origin-bottom"
          />
        </div>
      </div>
      <div class="flex flex-col w-full h-full px-5 justify-center">
        <div class="w-full h-auto">
          <p
            class="text-[24pt] bg-gradient-to-b from-[#FF09C2] to-[#2B3CFC] bg-clip-text text-transparent leading-[32pt] font-semibold"
          >
            AI and Machine Learning Algorithms
          </p>
        </div>
        <div class="w-full">
          <p class="text-[12pt] font-semibold pt-5 text-[#195279]">
            Our AI and ML algorithms conduct in-depth risk assessments,
            considering various factors and subtleties that impact insurance
            outcomes. This sophisticated analysis enables us to provide insurers
            with tailored guidance and recommendations, enhancing their
            decision-making processes and ultimately improving customer
            satisfaction and retention.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
