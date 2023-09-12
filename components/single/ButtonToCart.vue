<template>
  <button
    @click="addToCart"
    class="w-full border border-primary-dark bg-white px-5 py-3 font-medium uppercase"
    type="button">
    ДОДАТИ В КОРЗИНУ
  </button>
</template>

<script setup>
import { useCartStore } from "~/stores/cart";

const props = defineProps({
  product: {
    type: Object,
    required: true,
    default: {},
  },
});

const cart = useCartStore();

const addToCart = () => {
  cart.products.push(props.product);
};
</script>

<style lang="scss"></style>
