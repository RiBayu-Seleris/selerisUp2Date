<script setup>
import { computed, onMounted, onUnmounted, ref } from "vue";
import { useScrollStore } from "@/stores/scroll";
import { useRoute } from "vue-router";
import Navlink from "@/components/Navlink.vue";
import { productList } from "@/Data/ProductList";
import { aboutList } from "@/Data/AboutList";
import { technologyList } from "@/Data/TechnologyList";
import { SolutionLists } from "@/Data/SolutionLists";
import { resourceList } from "@/Data/ResourceList";
import { WORKSHOP_DYNAMIC } from "@/Data/workshops";
import { loadWorkshopList } from "@/consumeAPI/workshopsApi";
import ArrowRight from "@/components/icons/ArrowRight.vue";

// const { isScrolled } = useScrollStore();
const route = useRoute();
const isHoveringAbout = ref(false);
const isHoveringProduct = ref(false);
const isHoveringTechnology = ref(false);
const isHoveringSolution = ref(false);
const isHoveringResource = ref(false);
const hasNewResource = computed(() =>
  resourceList.value.some((resource) => resource.isNew),
);
const isResourceRoute = computed(
  () =>
    route.path.startsWith("/blog") ||
    route.path.startsWith("/careers") ||
    route.path.startsWith("/workshop"),
);
const showUnderConstructionModal = ref(false);
const isScrolled = ref(false);

// Di dalam setup() atau <script setup>
const isHovered = ref(null);

const isDark = ref(document.documentElement.classList.contains("dark"));

const observer = new MutationObserver(() => {
  isDark.value = document.documentElement.classList.contains("dark");
});

// Diredam dengan requestAnimationFrame supaya pembaruannya paling banyak
// sekali per gambar layar. Ini penting sejak situs memakai smooth scroll:
// halaman digeser tiap frame, jadi kejadian gulir datang jauh lebih sering
// daripada saat memakai gulir biasa.
let idFrame = null;
const handleScroll = () => {
  if (idFrame) return;
  idFrame = requestAnimationFrame(() => {
    // Ambangnya HARUS sama dengan Navbar.vue — lihat catatan di sana.
    isScrolled.value = window.scrollY > 50;
    idFrame = null;
  });
};

onMounted(() => {
  if (WORKSHOP_DYNAMIC) loadWorkshopList().catch(() => {});
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });
  window.addEventListener("scroll", handleScroll, { passive: true });
});

onUnmounted(() => {
  observer.disconnect();
  window.removeEventListener("scroll", handleScroll);
  if (idFrame) cancelAnimationFrame(idFrame);
});
</script>

<template>
  <ul
    :class="[
      'flex items-start text-md font-[400] text-[#374151] transition-all duration-500 ease-in',
      isScrolled
        ? 'lg:gap-[20px] xl:gap-[45px] xls:gap-[55px] dark:text-[#DEDEDE]'
        : 'lg:gap-[25px] xl:gap-[55px] xls:gap-[60px] justify-start dark:text-[#DEDEDE]',
    ]"
  >
    <li>
      <Navlink
        class="text-[12pt] lg:text-[10pt] xl:text-[12pt] font-[500] text-animate-hover dark:dark-text-animate-hover"
        href="/"
      >
        {{ $t("nav.home") }}
      </Navlink>
    </li>

    <li
      class="relative list-none"
      @mouseenter="isHoveringAbout = true"
      @mouseleave="isHoveringAbout = false"
    >
      <span
        class="cursor-pointer relative inline-block text-animate-hover dark:dark-text-animate-hover font-[500] text-[12pt] lg:text-[10pt] xl:text-[12pt]"
      >
        {{ $t("nav.about") }} ▾
      </span>

      <div
        v-if="isHoveringAbout"
        @mouseenter="isHoveringAbout = true"
        @mouseleave="isHoveringAbout = false"
        :class="[`absolute left-0 top-full z-50`, isScrolled ? 'pt-8' : 'pt-8']"
      >
        <div
          class="w-full h-auto p-[1px] dark:bg-gradient-to-r dark:from-[#565656]/0 dark:to-[#BCBCBC]/50 rounded-2xl shadow-lg"
        >
          <div
            class="flex flex-col w-auto bg-white p-4 rounded-2xl shadow-lg gap-5 dark:bg-[#1D2426]"
          >
            <Navlink
              v-for="(about, index) in aboutList"
              :key="index"
              :href="about.url"
              class="flex justify-start items-start text-start w-[300px] text-animate-hover dark:dark-text-animate-hover"
            >
              <span
                class="text-[15px] font-[500] text-[#9CA3AF] dark:text-[#FAFAFA]"
                >{{ $t("nav.about_items." + about.key) }}</span
              >
            </Navlink>
          </div>
        </div>
      </div>
    </li>

    <li
      class="relative list-none"
      @mouseenter="isHoveringProduct = true"
      @mouseleave="isHoveringProduct = false"
    >
      <span
        class="cursor-pointer relative inline-block text-animate-hover dark:dark-text-animate-hover font-[500] text-[12pt] lg:text-[10pt] xl:text-[12pt]"
      >
        {{ $t("nav.products") }} ▾
      </span>

      <div
        v-if="isHoveringProduct"
        @mouseenter="isHoveringProduct = true"
        @mouseleave="isHoveringProduct = false"
        :class="[`absolute left-0 top-full z-50`, isScrolled ? 'pt-8' : 'pt-8']"
      >
        <div
          class="w-full h-auto p-[1px] dark:bg-gradient-to-r dark:from-[#565656]/0 dark:to-[#BCBCBC]/50 rounded-2xl shadow-lg"
        >
          <div
            class="flex flex-col w-auto bg-white p-4 rounded-2xl shadow-lg gap-5 dark:bg-[#1D2426]"
          >
            <Navlink
              v-for="(product, index) in productList"
              :key="index"
              :href="product.url"
              target="_blank"
              rel="noopener noreferrer"
              class="flex justify-start items-start text-start w-[300px] text-animate-hover dark:dark-text-animate-hover"
            >
              <span
                class="text-[15px] font-[500] text-[#9CA3AF] dark:text-[#FAFAFA]"
                >{{ product.name }}</span
              >
            </Navlink>
          </div>
        </div>
      </div>
    </li>

    <li
      class="relative list-none"
      @mouseenter="isHoveringTechnology = true"
      @mouseleave="isHoveringTechnology = false"
    >
      <span
        class="cursor-pointer relative inline-block text-animate-hover dark:dark-text-animate-hover font-[500] text-[12pt] lg:text-[10pt] xl:text-[12pt]"
      >
        {{ $t("nav.technology") }} ▾
      </span>

      <div
        v-if="isHoveringTechnology"
        @mouseenter="isHoveringTechnology = true"
        @mouseleave="isHoveringTechnology = false"
        :class="[`absolute left-0 top-full z-50`, isScrolled ? 'pt-8' : 'pt-8']"
      >
        <div
          class="w-full h-auto p-[1px] dark:bg-gradient-to-r dark:from-[#565656]/0 dark:to-[#BCBCBC]/50 rounded-2xl shadow-lg"
        >
          <div
            class="flex flex-col w-auto bg-white p-4 rounded-2xl shadow-lg gap-5 dark:bg-[#1D2426]"
          >
            <Navlink
              v-for="(technology, index) in technologyList"
              :key="index"
              :href="technology.url"
              class="flex justify-start items-start text-start w-[300px] text-animate-hover dark:dark-text-animate-hover"
            >
              <span
                class="text-[15px] font-[500] text-[#9CA3AF] dark:text-[#FAFAFA]"
                >{{ technology.name }}</span
              >
            </Navlink>
          </div>
        </div>
      </div>
    </li>

    <li
      class="relative list-none"
      @mouseenter="isHoveringSolution = true"
      @mouseleave="isHoveringSolution = false"
    >
      <span
        class="cursor-pointer relative inline-block text-animate-hover dark:dark-text-animate-hover font-[500] text-[12pt] lg:text-[10pt] xl:text-[12pt]"
      >
        {{ $t("nav.solutions") }} ▾
      </span>

      <div
        v-if="isHoveringSolution"
        @mouseenter="isHoveringSolution = true"
        @mouseleave="isHoveringSolution = false"
        :class="[
          `absolute lg:-left-[400px] xl:-left-[300px] top-full z-50 w-max h-auto`,
          isScrolled ? 'pt-8' : 'pt-8',
        ]"
      >
        <div
          class="w-full h-auto p-[1px] bg-gradient-to-r from-[#565656]/0 to-[#BCBCBC]/30 rounded-2xl shadow-lg"
        >
          <div
            class="w-full h-auto flex flex-col bg-white py-6 px-5 rounded-2xl dark:bg-[#1D2426]"
          >
            <div class="w-full h-auto flex mb-4">
              <p
                class="text-[#4B5563] dark:text-white font-[500] lg:text-[18px]"
              >
                {{ $t("nav.solutions") }}
              </p>
            </div>
            <div class="grid grid-cols-2 w-auto gap-3">
              <Navlink
                v-for="(solution, index) in SolutionLists"
                :key="index"
                :href="solution.url"
                class="flex justify-start items-start group transition-all duration-300"
              >
                <div
                  class="w-full h-auto flex flex-row gap-x-3 justify-center items-center p-2 rounded-md transition-colors duration-200"
                  :style="{
                    backgroundColor:
                      isHovered === index ? solution.bgColor + '40' : '',
                  }"
                  @mouseenter="isHovered = index"
                  @mouseleave="isHovered = null"
                >
                  <div class="w-fit h-auto flex justify-center items-start">
                    <div
                      class="w-9 h-9 rounded-md flex justify-center items-center p-2"
                      :style="{
                        backgroundColor: isDark
                          ? solution.darkBgColor
                          : solution.bgColor,
                        color: isDark
                          ? solution.darkIconColor
                          : solution.iconColor,
                      }"
                    >
                      <component :is="solution.icons" class="w-full h-full" />
                    </div>
                  </div>
                  <div
                    class="w-full h-auto flex flex-col justify-center items-start"
                  >
                    <span
                      class="text-[14px] font-[600] text-[#374151] dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-br dark:from-[#FAFAFA] dark:via-[#D4D4D4] dark:to-[#AAAAAA]"
                      >{{ $t("solutions." + solution.slug + ".title") }}</span
                    >
                    <span
                      class="text-[12px] font-[500] solution-text-animate"
                      :class="{ 'is-hovered': isHovered === index }"
                      :style="{
                        '--solution-color': solution.iconColor,
                      }"
                      >{{
                        $t("solutions." + solution.slug + ".subtitle")
                      }}</span
                    >
                  </div>
                  <div class="w-fit h-auto flex justify-center items-start">
                    <div
                      class="w-11 h-auto rounded-md flex justify-center items-center p-2"
                    >
                      <span
                        class="w-full h-full transition-colors duration-200"
                        :style="{
                          color:
                            isHovered === index
                              ? solution.iconColor
                              : '#C9C9C9',
                        }"
                      >
                        <ArrowRight />
                      </span>
                    </div>
                  </div>
                </div>
              </Navlink>
            </div>
          </div>
        </div>
      </div>
    </li>

    <li
      class="relative list-none"
      @mouseenter="isHoveringResource = true"
      @mouseleave="isHoveringResource = false"
    >
      <span
        class="cursor-pointer relative inline-flex items-center gap-2 font-[500] text-[12pt] lg:text-[10pt] xl:text-[12pt]"
      >
        <span
          v-if="hasNewResource"
          class="relative flex w-2 h-2 shrink-0"
          aria-hidden="true"
        >
          <span
            class="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#1AB24F] opacity-75 motion-reduce:animate-none dark:bg-[#3DDC84]"
          ></span>
          <span
            class="relative inline-flex w-2 h-2 rounded-full bg-[#1AB24F] dark:bg-[#3DDC84]"
          ></span>
        </span>
        <span
          class="text-animate-hover dark:dark-text-animate-hover"
          :class="isResourceRoute ? 'text-[#18AB53] dark:text-[#EEEEEE]' : ''"
          >{{ $t("nav.resources") }} ▾</span
        >
      </span>

      <div
        v-if="isHoveringResource"
        @mouseenter="isHoveringResource = true"
        @mouseleave="isHoveringResource = false"
        class="absolute left-0 top-full z-50 pt-8"
      >
        <div
          class="w-full h-auto p-[1px] dark:bg-gradient-to-r dark:from-[#565656]/0 dark:to-[#BCBCBC]/50 rounded-2xl shadow-lg"
        >
          <div
            class="flex flex-col w-[330px] bg-white p-2 rounded-2xl shadow-lg gap-1 dark:bg-[#1D2426]"
          >
            <Navlink
              v-for="resource in resourceList"
              :key="resource.key"
              :href="resource.url"
              class="group w-full"
            >
              <div
                class="flex items-center gap-3.5 w-full rounded-xl px-3 py-3 transition-colors duration-200"
                :class="
                  route.path === resource.url ||
                  (resource.activePrefix &&
                    route.path.startsWith(resource.activePrefix))
                    ? 'bg-[#1AB24F]/[0.08] dark:bg-white/[0.06]'
                    : 'group-hover:bg-[#F3F4F6] dark:group-hover:bg-white/[0.05]'
                "
              >
                <span
                  class="w-10 h-10 shrink-0 rounded-[10px] p-2.5 flex items-center justify-center transition-colors duration-200"
                  :class="
                    resource.isNew
                      ? 'bg-[#1AB24F]/[0.12] text-[#159447] dark:bg-[#1AB24F]/20 dark:text-[#5EE38F]'
                      : 'bg-[#F3F4F6] text-[#6B7280] group-hover:text-[#159447] dark:bg-white/[0.06] dark:text-[#C9C9C9]'
                  "
                >
                  <component :is="resource.icon" />
                </span>
                <span class="flex flex-col min-w-0 flex-1">
                  <span
                    class="text-[15px] font-[600] text-[#1F2937] dark:text-[#FAFAFA] leading-tight"
                    >{{ $t(`nav.resource_items.${resource.key}.title`) }}</span
                  >
                  <span
                    class="text-[12.5px] font-[400] text-[#6B7280] dark:text-[#A3A3A3] mt-1 leading-snug"
                    >{{ $t(`nav.resource_items.${resource.key}.desc`) }}</span
                  >
                </span>
                <span
                  v-if="resource.isNew"
                  class="shrink-0 self-start mt-0.5 rounded-full bg-[#1AB24F] px-2 py-[3px] text-[10px] font-[700] tracking-[0.06em] text-white"
                  >{{ $t("nav.newBadge") }}</span
                >
              </div>
            </Navlink>
          </div>
        </div>
      </div>
    </li>
    <li>
      <Navlink
        class="text-[12pt] lg:text-[10pt] xl:text-[12pt] text-animate-hover dark:dark-text-animate-hover font-[500]"
        href="/services"
      >
        {{ $t("nav.services") }}
      </Navlink>
    </li>
  </ul>

  <Teleport to="body">
    <Transition
      enter-active-class="transition-opacity duration-200 ease-out"
      leave-active-class="transition-opacity duration-150 ease-in"
      enter-from-class="opacity-0"
      leave-to-class="opacity-0"
    >
      <div
        v-if="showUnderConstructionModal"
        class="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm"
        @click.self="showUnderConstructionModal = false"
      >
        <div
          class="relative bg-white dark:bg-[#1D2426] rounded-2xl shadow-xl p-8 w-[90%] max-w-md flex flex-col items-center gap-4"
        >
          <div
            class="w-16 h-16 rounded-full bg-[#ADF9C5] dark:bg-[#2AB857]/20 flex items-center justify-center text-4xl"
          >
            🚧
          </div>

          <h2 class="text-[20px] font-[700] text-[#374151] dark:text-white">
            {{ $t("underConstruction.title") }}
          </h2>
          <p class="text-[14px] text-[#9CA3AF] text-center dark:text-[#D1D5DB]">
            {{ $t("underConstruction.description") }}
          </p>

          <button
            @click="showUnderConstructionModal = false"
            class="mt-2 px-6 py-2 bg-[#2AB857] hover:bg-[#22a04a] text-white text-[14px] font-[600] rounded-xl transition-colors duration-200"
          >
            {{ $t("underConstruction.close") }}
          </button>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
