<script setup>
import HeroText from "@/components/reusable/HeroText.vue";
</script>
<template>
  <section
    class="flex w-full h-auto pt-[120px] md:pt-[150px] lg:pt-[160px] xl:pt-[160px] px-6 md:px-0"
  >
    <HeroText
      :title="$t('misc.securityHeroTitle')"
      :subtitle="$t('misc.securityHeroSubtitle')"
    />
  </section>
  <section data-aos="fade-up" class="flex flex-col w-full h-auto px-24 mt-10">
    <div class="flex flex-col text-[#535862] gap-y-5">
      <p class="text-[21px] dark:text-[#FAFAFA] leading-relaxed">
        At
        <span class="text-[#535862] dark:text-[#FAFAFA] font-[700]"
          >Seleris</span
        >{{ $t("misc.securityIntro") }}
      </p>
      <p class="text-[21px] dark:text-[#FAFAFA] leading-relaxed">
        {{ $t("misc.securityCommitment") }}
        <span class="text-[#535862] dark:text-[#FAFAFA] font-[700]"
          >Seleris</span
        >
        {{ $t("misc.to_accelerate_the_development_of_their_a") }}
      </p>
      <p class="text-[21px] dark:text-[#FAFAFA] leading-relaxed">
        {{ $t("misc.securityRely") }}
        <span class="text-[#535862] dark:text-[#FAFAFA] font-[700]"
          >Seleris</span
        >
        {{ $t("misc.securityRely2") }}
        <span class="text-[#535862] dark:text-[#FAFAFA] font-[700]"
          >Seleris</span
        >
        {{ $t("misc.is_committed_to_earning_customer_trust_b") }}
      </p>
      <ul class="list-disc text-[21px] pl-10 space-y-3 dark:text-[#FAFAFA]">
        <li>
          {{ $t("misc.securityPoint1") }}
        </li>
        <li>
          {{ $t("misc.keeping_up_to_date_with_security_industr") }}
        </li>
        <li>
          {{ $t("misc.securityPoint3") }}
        </li>
      </ul>
      <p class="text-[21px] dark:text-[#FAFAFA] leading-relaxed">
        {{ $t("misc.securityCertified") }}
      </p>
      <p class="font-[#181D27] dark:text-[#FAFAFA] text-[24px] font-[600]">
        {{ $t("misc.current") }}
      </p>
      <ul class="list-disc text-[21px] pl-10 space-y-3 dark:text-[#FAFAFA]">
        <li>FedRAMP High Authorized</li>
        <li>SOC 2 Type II</li>
        <li>DoD IL4 Provisional Authorization</li>
        <li>ISO 27001</li>
        <li>ISO 9001</li>
      </ul>
      <p class="text-[21px] dark:text-[#FAFAFA] leading-relaxed">
        {{ $t("misc.securityAccess") }}
        <span class="text-[#535862] dark:text-[#FAFAFA] font-[700]"
          >Seleris</span
        >
        {{ $t("misc.securityAccess2") }}
        <span class="text-[#535862] dark:text-[#FAFAFA] font-[700]"
          >Seleris</span
        >{{ $t("misc.securityAccess3") }}
      </p>
      <p class="font-[600] text-[30px] text-[#181D27] dark:text-[#FAFAFA] mt-5">
        {{ $t("misc.reporting_security_issues") }}
      </p>
      <p class="text-[20px] leading-relaxed dark:text-[#FAFAFA]">
        {{ $t("misc.securityReport") }}
        <span class="text-[#2AB857] font-[500]"
          ><a href="mailto:info@seleris.ai"> info@seleris.ai. </a></span
        >
        {{ $t("misc.we_ll_triage_the_issue_and_get_back_to_y") }}
      </p>
    </div>
  </section>
</template>
