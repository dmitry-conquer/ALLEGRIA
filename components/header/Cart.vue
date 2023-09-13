<template>
  <NuxtLink
    to="/cart"
    class="relative">
    <span
    v-if="cartStore.products.length"
      class="absolute -right-2 -top-2 grid h-4 w-4 place-content-center rounded-full bg-secondary p-0.5 text-xs text-white"
      >{{cartStore.products.length}}</span
    >
    <IconCart class="h-7 w-7 transition-colors hover:text-secondary" />
  </NuxtLink>
</template>

<script setup>
import { useCartStore } from "~/stores/cart";
const cartStore = useCartStore();
</script>
