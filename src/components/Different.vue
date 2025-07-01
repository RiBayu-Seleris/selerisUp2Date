<script setup>
import DifferentCard from "@/components/reusable/DifferentCard.vue";
import teamIcon from "@/assets/icons/our-team.svg";
import innovationIcon from "@/assets/icons/innovation.svg";
import missionIcon from "@/assets/icons/mission.svg";
import performanceIcon from "@/assets/icons/performance.svg";
</script>

<template>
  <div class="px-10 mt-16">
    <div class="hidden lg:block w-full h-[100vh] different-bg rounded-b-[3rem]">
      <div class="flex flex-col w-full h-auto px-10">
        <div class="flex flex-col w-full h-auto mt-20">
          <div class="flex w-full h-auto">
            <p class="text-3xl text-[#1DC457]">What Makes Us Different?</p>
          </div>
          <div class="flex w-[70%] h-auto mt-5">
            <p class="text-4xl text-[#195279] leading-[40px] font-semibold">
              We bring solutions to make life insurance for our customers.
            </p>
          </div>
        </div>
        <div class="flex flex-row w-full h-auto mt-10">
          <div class="flex flex-col w-8/12 h-auto">
            <div class="flex flex-row mb-10">
              <DifferentCard
                :image="teamIcon"
                title="Our Team"
                subtitle="Collaboration and Teamwork."
              />
              <DifferentCard
                :image="innovationIcon"
                title="Innovation"
                subtitle="Developing innovative and effective solutions."
              />
            </div>
            <div class="flex flex-row">
              <DifferentCard
                :image="missionIcon"
                title="Missions"
                subtitle="Efficient, accurate, and accessible."
              />
              <DifferentCard
                :image="performanceIcon"
                title="Optimal Perfomance"
                subtitle="Equipped with advanced technology to ensure smoothness and speed."
              />
            </div>
          </div>
          <div class="flex w-4/12 h-auto">
            <div class="flex w-full h-full z-0">
              <img
                src="@/assets/images/robot-ai2.svg"
                alt="Robot"
                class="w-full h-full object-cover object-bottom bottom-0"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile -->
    <div
      class="flex flex-col lg:hidden w-full h-auto bg-[#f2f3f3] rounded-[2rem] py-5 relative"
    >
      <div class="w-[15rem] h-[15rem] justify-center items-center self-center">
        <div class="w-auto h-full z-50">
          <img
            src="@/assets/images/robot-ai3.svg"
            alt="Robot"
            class="w-full h-full object-contain object-center robot-wiggle"
          />
        </div>
      </div>
      <div class="flex flex-col w-full h-full px-5 justify-center">
        <div class="w-full h-auto">
          <p
            class="sml:text-[17pt] md:text-[23pt] leading-[32pt] font-semibold text-center text-[#1DC457]"
          >
            What Makes Us Different?
          </p>
        </div>
        <div class="w-full h-auto">
          <p
            class="sml:text-[14pt] md:text-[24pt] sml:leading-relaxed md:leading-[32pt] font-semibold text-center text-[#195279]"
          >
            We bring solutions to make life insurance for our customers.
          </p>
        </div>
        <div
          class="flex flex-col md:grid md:grid-cols-2 md:gap-x-10 w-full md:mt-8 sml:mt-5"
        >
          <div class="w-full mb-5">
            <DifferentCard
              :image="teamIcon"
              title="Our Team"
              subtitle="Collaboration and Teamwork."
            />
          </div>
          <div class="w-full mb-5">
            <DifferentCard
              :image="innovationIcon"
              title="Innovation"
              subtitle="Developing innovative and effective solutions."
            />
          </div>
          <div class="w-full mb-5">
            <DifferentCard
              :image="missionIcon"
              title="Missions"
              subtitle="Efficient, accurate, and accessible."
            />
          </div>
          <div class="w-full mb-5">
            <DifferentCard
              :image="performanceIcon"
              title="Optimal Perfomance"
              subtitle="Equipped with advanced technology to ensure smoothness and speed."
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.different-bg {
  background-image: url("@/assets/images/different-background.png");
  background-size: cover;
  background-repeat: no-repeat;
}
@keyframes robotWiggle {
  0% {
    transform: rotate(7deg);
  }
  25% {
    transform: rotate(-7deg);
  }
  50% {
    transform: rotate(4deg);
  }
  75% {
    transform: rotate(-4deg);
  }
  100% {
    transform: rotate(7deg);
  }
}

.robot-wiggle-hover:hover {
  animation: robotWiggle 5s linear infinite;
  transform-origin: bottom center;
}
.robot-wiggle {
  animation: robotWiggle 5s linear infinite;
  transform-origin: bottom center;
}
</style>
