<script setup>
import ChecklistIcon from "@/components/icons/Checklist.vue";
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
    title: "Workflow Automation",
    body: "Easily manage and automate workflows with speed, accuracy, and minimal manual effort.",
  },
];
</script>

<template>
  <div class="flex w-full h-auto mt-20">
    <div
      class="w-full h-auto p-[1px] bg-[#D9D9D9] dark:bg-gradient-to-tr dark:from-[#17181A] dark:from-45% dark:to-[#565656] shadow-lg rounded-[30px] md:rounded-[60px]"
    >
      <div
        class="relative flex flex-col w-full h-auto bg-[#F3F4F6] dark:bg-[#1E1F1C] px-8 md:px-10 lg:px-14 xl:px-20 pt-16 pb-16 xl:pb-16 rounded-[30px] md:rounded-[60px]"
      >
        <div class="flex flex-col w-full h-auto gap-y-3 xl:gap-y-5">
          <div class="flex w-full h-auto">
            <p
              class="text-[#1AB24F] font-[500] text-[21px] md:text-[27px] lg:text-[27px] xl:text-[30px]"
            >
              Services
            </p>
          </div>
          <div class="flex w-full h-auto">
            <p
              class="text-[#195279] font-[500] text-[27px] md:text-[41px] lg:text-[41px] xl:text-[53px] lg:leading-[50px] xl:leading-[70px] dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-br dark:from-[#FAFAFA] from-[15%] dark:via-[#D4D4D4] dark:to-[#AAAAAA]"
            >
              How to Get Started with the <br class="md:hidden lg:block" />
              Seleris API Service
            </p>
          </div>
          <div
            class="flex w-full md:w-[400px] lg:w-[541px] xl:w-[541px] h-auto"
          >
            <p
              class="text-[#195279] dark:text-[#6F6F6F] font-[400] lg:text-[17px] xl:text-[21px]"
            >
              The Seleris API service offers a number of benefits for companies,
              including
            </p>
          </div>
        </div>
        <div
          class="flex flex-col-reverse md:flex-row w-full h-auto mt-10 lg:mt-10"
        >
          <div class="flex w-full lg:w-[60%] h-auto">
            <div
              class="flex flex-col w-full h-auto gap-x-10 justify-center gap-y-8 lg:gap-y-8 xl:gap-y-10 mt-10 md:mt-0"
            >
              <div
                v-for="(ApiService, index) in ApiServices"
                :key="index"
                class="flex flex-row w-full h-auto gap-x-4 md:gap-x-8 lg:gap-x-4"
              >
                <div class="w-[5%] h-auto">
                  <div
                    class="w-7 h-7 lg:w-7 lg:h-7 xl:w-8 xl:h-8 mt-2 bg-[#1AB24F] rounded-full"
                  >
                    <ChecklistIcon />
                  </div>
                </div>
                <div
                  class="flex flex-col w-[90%] h-auto gap-y-2 lg:gap-y-1 xl:gap-y-2"
                >
                  <div class="flex w-full h-auto">
                    <p
                      class="text-[#1AB24F] text-[20px] lg:text-[20px] xl:text-[21px] font-[500]"
                    >
                      {{ ApiService.title }}
                    </p>
                  </div>
                  <div class="flex w-[90%] xl:w-[80%] h-auto">
                    <p
                      class="text-[#195279] dark:text-[#FAFAFA] font-[400] text-[14px] lg:text-[17px] xl:text-[21px]"
                    >
                      {{ ApiService.body }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            class="flex w-full lg:w-[40%] h-auto justify-center md:justify-end"
          >
            <div class="flex w-full h-auto md:justify-end items-center">
              <img
                src="@/assets/images/robot-getstarted.png"
                alt="Icon"
                class="flex lg:justify-center items-center w-[300px] h-[300px] md:w-[300px] md:h-full lg:w-[350px] lg:h-[350px] xl:w-[400px] xl:h-[400px] object-contain md:animate__animated md:animate-bounce2"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
