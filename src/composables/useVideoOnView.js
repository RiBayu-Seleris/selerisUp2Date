import { onMounted, onBeforeUnmount } from "vue";

export function useVideoOnView(videoRef, targetRef, options = {}) {
  let observer;
  let isPlaying = false;

  onMounted(() => {
    observer = new IntersectionObserver(
      ([entry]) => {
        const video = videoRef.value;
        if (!video) return;

        if (entry.isIntersecting) {
          if (!isPlaying) {
            video.currentTime = 0;

            const p = video.play();
            if (p) p.catch(() => {});

            isPlaying = true;
          }
        } else {
          video.pause();
          isPlaying = false;
        }
      },
      {
        threshold: 0.6,
        ...options,
      }
    );

    if (targetRef.value) {
      observer.observe(targetRef.value);
    }
  });

  onBeforeUnmount(() => observer?.disconnect());
}
