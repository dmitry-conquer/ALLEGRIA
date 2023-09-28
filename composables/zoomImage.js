export const useZoomImage = () => {
  const zoomValue = ref(1);
  const toggle = ref(true);
  const endPoint = 1.3;
  let step = 0.0023;

  onMounted(() => {
    setInterval(() => {
      if (toggle.value) {
        zoomValue.value = zoomValue.value + step;
      }
      if (!toggle.value) {
        zoomValue.value = zoomValue.value - step;
      }
    }, 100);
  });

  watch(
    () => zoomValue.value,
    () => {
      if (zoomValue.value >= endPoint) {
        toggle.value = false;
      } else if (zoomValue.value <= 1) {
        toggle.value = true;
      }
    },
  );
  return zoomValue
};
