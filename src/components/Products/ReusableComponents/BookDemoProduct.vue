<template>
  <div class="relative w-full h-auto top-0">
    <img
      src="@/assets/Products/images/bg-book-demo-medins.png"
      alt="FrameBookDemoSection"
      class="bg-no-repeat bg-cover bg-center"
    />
    <div
      class="absolute w-full h-full top-0 flex flex-row justify-between items-center px-4 md:px-8 gap-x-5 pt-2.5 md:pt-5"
    >
      <div class="md:w-full h-auto">
        <div
          class="w-full lg:h-auto flex flex-col space-y-2.5 md:space-y-5 lg:space-y-10"
        >
          <div class="w-full h-auto">
            <p
              class="text-[#FAFAFA] font-[500] text-[12px] md:text-[23px] lg:text-[37px] leading-tight"
            >
              Seleris Medins A Complete <br />Solution for Your Health Needs
            </p>
          </div>
          <div class="w-full h-auto">
            <p
              class="text-[#FAFAFA] font-[500] text-[11px] md:text-[19px] lg:text-[23px]"
            >
              Request Demo Now!
            </p>
          </div>
        </div>
      </div>
      <div class="md:w-full h-[100px] flex justify-center items-center">
        <div class="w-full flex justify-end lg:justify-center h-auto md:pr-8">
          <router-link
            to="/book-a-demo"
            class="w-auto max-w-max h-auto cursor-pointer flex flex-row items-center"
          >
            <div
              class="w-[120px] md:w-[200px] lg:w-[300px] h-auto bg-[#FAFAFA] flex flex-row justify-between px-2 md:py-2 rounded-[10px]"
            >
              <div
                class="w-[77%] md:w-[77%] lg:w-[70%] h-auto text-center flex justify-center items-center"
              >
                <p
                  class="font-[500] text-[12px] md:text-[19px] lg:text-[27px] text-[#42C5AF]"
                >
                  Book a Demo
                </p>
              </div>
              <div
                class="w-[23%] md:w-[23%] lg:w-[30%] h-auto flex justify-start items-center"
              >
                <svg
                  class="w-14 h-14"
                  viewBox="0 0 48 48"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M28 36L40 24L28 12"
                    stroke="#42C6B0"
                    stroke-width="3"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M11 22.5C10.1716 22.5 9.5 23.1716 9.5 24C9.5 24.8284 10.1716 25.5 11 25.5V24V22.5ZM39.5 24V22.5H11V24V25.5H39.5V24Z"
                    fill="#42C6B0"
                  />
                </svg>
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
