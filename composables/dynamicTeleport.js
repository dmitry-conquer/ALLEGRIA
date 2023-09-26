import { useWindowSize } from "@vueuse/core";
export const useDynamicTeleport = (child, toParentId, size, position) => {
  const { width } = useWindowSize();
  const parent = child.parentElement;
  const watchWidth = () => {
    if (width.value < size) {
      if (child && child.parentElement === parent) {
        if (position === "last") {
          document.getElementById(toParentId).appendChild(child);
        } else if (position === "first") {
          document.getElementById(toParentId).prepend(child);
        }
      }
    } else if (width.value >= size) {
      if (child && child.parentElement !== parent) {
        parent.appendChild(child);
        if (position === "last") {
          parent.appendChild(child);
        } else if (position === "first") {
          parent.prepend(child);
        }
      }
    }
  };
  watchWidth();
  watch(
    () => width.value,
    () => {
      watchWidth();
    },
  );
};
