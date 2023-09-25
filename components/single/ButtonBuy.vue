<template>
  <button
    type="button"
    @click="addToCart"
    class="block w-full border border-primary-dark bg-primary-dark px-5 py-3 text-center font-medium uppercase text-white">
    КУПИТИ В ОДИН КЛІК
  </button>
</template>

<script setup>
import { useCartStore } from "~/stores/cart";
const cartStore = useCartStore();

const props = defineProps({
  product: {
    type: Object,
    required: true,
    default: {},
  },
});

const addToCart = () => {
  cartStore.products = []
  cartStore.products.push(props.product);
  navigateTo('/cart')
};
</script>
