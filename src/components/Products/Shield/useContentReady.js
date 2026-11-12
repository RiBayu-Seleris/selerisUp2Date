import { onMounted, onBeforeUnmount, ref } from "vue";

export function useContentReady() {
  const ready = ref(false);
  let timer = null;

  const mark = () => {
    ready.value = true;
    clearTimeout(timer);
    document.removeEventListener("seleris:content-ready", mark);
  };

  onMounted(() => {
    document.addEventListener("seleris:content-ready", mark);
    timer = setTimeout(mark, 12000);
  });

  onBeforeUnmount(() => {
    clearTimeout(timer);
    document.removeEventListener("seleris:content-ready", mark);
  });

  return ready;
}
