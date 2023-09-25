import Lenis from "@studio-freight/lenis";

export default defineNuxtPlugin(NuxtApp => {
  const lenis = new Lenis({
    duration: 1.6,
  });
  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);
});
