import { defineStore } from "pinia";
import { ref } from "vue";

export const useCertCard = defineStore("sidebar", () => {
  const cardOne = ref(false);

  const toggleClickOne = () => {
    cardOne.value = !cardOne.value;
    console.log(cardOne.value);
  };

  return { cardOne, toggleClickOne };
});
