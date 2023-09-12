export const useOrderStore = defineStore(
  "orderStore",
  () => {
    const currentOrderID = ref("");
    return {
      currentOrderID,
    };
  },
  { persist: true },
);
