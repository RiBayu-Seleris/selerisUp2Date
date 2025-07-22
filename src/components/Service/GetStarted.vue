<script setup>
const ApiServices = [
  {
    title: "API Documentation",
    body: "Detailed guides and reference to help you integrate quickly.",
  },
  {
    title: "Authentication",
    body: "Securely authenticate using API keys and tokens.",
  },
  {
    title: "Claims Processing",
    body: "Easily manage and automate insurance claims workflows.",
  },
];
</script>

<template>
  <div class="flex w-full h-auto mt-20">
    <div
      class="relative flex flex-col w-full h-auto bg-[#F3F4F6] dark:bg-[#1E1F1C] lg:px-10 xl:px-20 pt-16 pb-16 xl:pb-6 rounded-[60px]"
    >
      <div class="flex flex-col w-full h-auto gap-y-3 xl:gap-y-5">
        <div class="flex w-full h-auto">
          <p class="text-[#1AB24F] font-[500] lg:text-[27px] xl:text-[30px]">
            Services
          </p>
        </div>
        <div class="flex w-full h-auto">
          <p
            class="text-[#195279] font-[500] lg:text-[41px] xl:text-[47px] lg:leading-[50px] xl:leading-[60px] dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-br dark:from-[#FAFAFA] dark:via-[#D4D4D4] dark:to-[#AAAAAA]"
          >
            How to Get Started with the <br />
            Seleris API Service
          </p>
        </div>
        <div class="flex lg:w-[541px] xl:w-[541px] h-auto">
          <p
            class="text-[#195279] dark:text-[#6F6F6F] font-[400] lg:text-[17px] xl:text-[21px]"
          >
            The Seleris API service offers a number of benefits for companies,
            including
          </p>
        </div>
      </div>
      <div class="flex flex-col lg:flex-row w-full h-auto lg:mt-10 xl:mt-5">
        <div class="flex w-full lg:w-[60%] h-auto">
          <div
            class="flex flex-col w-full h-auto gap-x-10 justify-center lg:gap-y-8 xl:gap-y-10"
          >
            <div
              v-for="(ApiService, index) in ApiServices"
              :key="index"
              class="flex flex-row w-full h-auto"
            >
              <div class="w-[10%] h-auto">
                <div
                  class="w-7 h-7 xl:w-10 xl:h-10 object-contain bg-[#1AB24F] rounded-full"
                />
              </div>
              <div class="flex flex-col w-[90%] h-auto lg:gap-y-1 xl:gap-y-2">
                <div class="flex w-full h-auto">
                  <p
                    class="text-[#1AB24F] lg:text-[20px] xl:text-[23px] font-[500]"
                  >
                    {{ ApiService.title }}
                  </p>
                </div>
                <div class="flex w-[90%] xl:w-[80%] h-auto">
                  <p
                    class="text-[#195279] dark:text-[#FAFAFA] font-[400] dark:font-thin lg:text-[17px] xl:text-[23px]"
                  >
                    {{ ApiService.body }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          class="flex w-full lg:w-[40%] h-auto justify-center lg:justify-end"
        >
          <div
            class="flex w-full h-auto justify-center lg:justify-end items-center"
          >
            <img
              src="@/assets/images/robot-getstarted2.png"
              alt="Icon"
              class="flex justify-center items-center lg:w-[300px] lg:h-[300px] xl:w-[500px] xl:h-[500px] object-contain lg:animate__animated lg:animate-bounce"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
