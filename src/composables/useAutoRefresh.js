import { onBeforeUnmount, onMounted } from "vue";

export function useAutoRefresh(refresh, intervalMs = 30_000) {
  let timer = null;

  const stop = () => {
    clearInterval(timer);
    timer = null;
  };

  const start = () => {
    stop();
    timer = setInterval(refresh, intervalMs);
  };

  const onVisibilityChange = () => {
    if (document.visibilityState === "visible") {
      refresh();
      start();
    } else {
      stop();
    }
  };

  onMounted(() => {
    if (document.visibilityState === "visible") start();
    document.addEventListener("visibilitychange", onVisibilityChange);
  });

  onBeforeUnmount(() => {
    stop();
    document.removeEventListener("visibilitychange", onVisibilityChange);
  });
}
