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
      class="relative flex flex-col w-full h-auto bg-[#F3F4F6] px-8 pt-16 pb-6 rounded-[60px]"
    >
      <div class="flex flex-col w-full h-auto">
        <div class="flex w-full h-auto">
          <p class="text-[#1AB24F] font-[500] text-[30px]">Services</p>
        </div>
        <div class="flex w-[945px] h-auto">
          <p class="text-[#195279] font-[500] text-[60px]">
            How to Get Started with the Seleris API Service
          </p>
        </div>
        <div class="flex w-[541px] h-auto">
          <p class="text-[#195279] font-[400] text-[24px]">
            The Seleris API service offers a number of benefits for insurance
            companies, including
          </p>
        </div>
      </div>
      <div class="flex flex-row w-full h-auto mt-5">
        <div class="flex w-[50%] h-auto">
          <div
            class="flex flex-col w-full h-auto gap-x-10 justify-center gap-y-16"
          >
            <div
              v-for="(ApiService, index) in ApiServices"
              :key="index"
              class="flex flex-row w-full h-auto gap-x-5"
            >
              <div class="w-12 h-12 object-contain bg-[#1AB24F] rounded-full" />
              <div class="flex flex-col w-[70%] h-auto gap-y-3">
                <div class="flex w-full h-auto">
                  <p
                    class="text-[#1AB24F] lg:text-[20px] xl:text-[24px] font-[500]"
                  >
                    {{ ApiService.title }}
                  </p>
                </div>
                <div class="flex w-full h-auto">
                  <p
                    class="text-[#195279] font-[400] lg:text-[20px] xl:text-[20px]"
                  >
                    {{ ApiService.body }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="flex w-auto h-auto">
          <div class="flex w-full h-auto justify-end">
            <img
              src="@/assets/images/robot-getstarted2.png"
              alt="Icon"
              class="flex justify-center items-center w-[600px] h-[600px] object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
