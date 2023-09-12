export const useCartStore = defineStore(
  "cartStore",
  () => {
    const products = ref([]);
    const totalPrice = computed(() => {
      return products.value.length > 0 ? products.value.reduce((total, product) => total + +product.newPrice, 0) : 0;
    });
    return {
      products,
      totalPrice,
    };
  },
  { persist: true },
);
