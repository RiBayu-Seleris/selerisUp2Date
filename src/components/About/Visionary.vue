<template>
  <div class="w-full h-auto flex flex-col space-y-10">
    <div
      class="relative w-full h-[150px] sm:h-[200px] md:h-[240px] lg:h-[280px] xl:h-[380px] flex"
    >
      <div class="absolute bottom-0 right-0 w-full h-full">
        <img
          src="@/assets/images/visionary-frame-dark.svg"
          alt="Visionary"
          class="hidden dark:flex w-full h-full object-cover object-bottom z-10"
        />
        <img
          src="@/assets/images/visionary-frame.svg"
          alt="Visionary"
          class="flex dark:hidden w-full h-full object-cover object-bottom z-10"
        />
      </div>
      <div
        class="absolute bottom-0 right-1/2 translate-x-1/2 lg:right-[22%] lg:translate-x-0 w-auto h-auto"
      >
        <img
          src="@/assets/images/leadership-teams/rinaldi-2.png"
          alt="Visionary"
          class="w-auto h-[230px] sm:h-[280px] md:h-[350px] lg:h-[380px] xl:h-[530px] object-cover object-bottom z-10"
        />
      </div>
      <div class="relative w-full h-auto px-8 z-20">
        <div
          class="w-full h-full flex justify-end lg:flex-row lg:justify-between"
        >
          <div
            class="w-full h-auto hidden lg:flex flex-col gap-y-3 lg:ml-8 xl:ml-10 pt-7"
          >
            <p
              class="font-[500] dark:font-[400] text-[20px] xl:text-[28px] text-[#1AB24F] dark:text-[#01F27D]"
            >
              The Visionary
            </p>
            <p
              class="font-[500] text-[#195279] dark:text-[#FAFAFA] text-[36px] xl:text-[54px] leading-tight"
            >
              The Brains Behind the <br />
              Seleris AI Revolution
            </p>
          </div>
          <div
            class="relative w-[190px] sm:w-[250px] md:w-[300px] lg:w-[380px] xl:w-[420px] shrink-0 h-auto flex justify-end items-end -mr-[4%] sm:mr-[5%] md:mr-[6%] lg:mr-[4%] xl:mr-[9%] pb-0 sm:pb-2 lg:pb-5 xl:pb-8"
          >
            <div
              class="relative w-full bottom-0 right-0 h-[65px] sm:h-[85px] xl:h-[100px]"
            >
              <div class="absolute bottom-0 right-0 w-full h-full">
                <img
                  src="@/assets/images/visionary-frame-caption-dark-3.svg"
                  alt="Visionary"
                  class="hidden dark:flex w-full h-full object-contain object-center lg:object-top z-10"
                />
                <img
                  src="@/assets/images/visionary-frame-caption.svg"
                  alt="Visionary"
                  class="flex dark:hidden w-full h-full object-contain object-center lg:object-top z-10"
                />
              </div>
              <div
                class="relative w-full h-full flex flex-col gap-y-1 xl:gap-y-2 justify-center lg:justify-center items-start pl-2 md:px-4 lg:px-10 lg:pt-0"
              >
                <p
                  class="text-[#195279] dark:text-[#FFFFFF] font-[600] text-[12px] sm:text-[16px] md:text-[18px] lg:text-[20px] xl:text-[24px]"
                >
                  Rinaldi Anwar Buyung
                </p>
                <p
                  class="text-[#195279] dark:text-[#FFFFFF] font-[500] text-[10px] sm:text-[12px] md:text-[14px] lg:text-[14px] xl:text-[18px]"
                >
                  Insurtech Innovator & AI Architect
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="w-full h-auto px-8">
      <div
        class="w-full h-auto p-[1px] lg:bg-[#F3F4F6] dark:lg:bg-gradient-to-r dark:lg:from-[#17181A] dark:lg:to-[#565656] rounded-[28px]"
      >
        <div
          class="w-full h-auto flex flex-col gap-y-6 xl:gap-y-10 dark:lg:bg-[#1E1F1C] text-[#195279] dark:text-[#FAFAFA] font-[400] text-[14px] sm:text-[16px] lg:text-[18px] xl:text-[22px] text-justify py-8 lg:py-14 px-2 md:px-8 lg:px-14 xl:px-20 rounded-[28px]"
        >
          <div class="w-full h-auto flex lg:hidden flex-col gap-y-2">
            <p
              class="font-[500] text-[20px] sm:text-[18px] text-[#1AB24F] dark:text-[#01F27D]"
            >
              The Visionary
            </p>
            <p
              class="font-[500] text-[#195279] dark:text-[#FAFAFA] text-[20px] sm:text-[28px] leading-snug"
            >
              The Brains Behind the Seleris AI <br class="hidden sm:block" />
              Revolution
            </p>
          </div>

          <p>
            Rinaldi Anwar Buyung isn't just an actuary; he's a tech entrepreneur
            actively architecting the future of insurance. He is the Founder of
            Seleris, a cutting-edge SaaS platform that leverages the power of
            Artificial Intelligence to revolutionize the underwriting process.
          </p>
          <p>
            Seleris is the direct application of his deep academic work as a
            Doctoral researcher in AI and Data Science. His vision is backed by
            a prolific research portfolio, including dozens of scientific
            journals on AI technology, proving he's not just part of the
            conversation—he's driving it.
          </p>
          <p>
            With 30 years of industry-experience, Rinaldi possesses a rare blend
            of deep technical mastery in mathematics, statistics, actuarial
            science, underwriting, and risk management.
          </p>
          <p>
            He remains a dynamic force in the industry, actively pioneering new
            innovations at the intersection of healthcare, insurance, and
            finance. He serves as a high-level strategic advisor and holds
            senior governance roles across the insurance, reinsurance, and risk
            consulting sectors. As an actuary, Rinaldi is a central figure who
            both understands the industry's foundations and is actively building
            its future.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
