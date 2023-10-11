<template>
  <div class="px-4">
    <div
      v-if="isEmptyList"
      class="flex min-h-screen flex-col items-center justify-center">
      <h1 class="text-center text-4xl uppercase">Кошик порожній</h1>
      <img src="/empty-cart.svg" alt="Кошик порожній" class="my-8">
      <p class="text-base md:text-lg max-w-md text-center text-primary-dark/80">Додайте щось, щоб зекономити час та зробити шопінг ще більш приємним.</p>
      <div class="mt-8 flex justify-center">
        <NuxtLink
          to="/catalog"
          class="rounded-sm bg-primary-dark px-3 py-2 text-center text-lg uppercase text-white transition-colors hover:bg-primary-dark/90"
          type="submit">
          ПЕРЕЙТИ В КАТАЛОГ
        </NuxtLink>
      </div>
    </div>
    <div
      v-else
      class="py-24 md:py-32">
      <div class="border-b pb-4 md:pb-16">
        <h1 class="py-2 sm:py-6 text-center text-2xl md:text-4xl font-medium uppercase">КОШИК</h1>
      </div>
      <div>
        <div class="mx-auto flex-col-reverse max-md:gap-10 md:flex-row flex max-w-5xl items-start">
          <CartContacts />
          <CartList />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>

useHead({
  script: [
    {
      src: "https://static.liqpay.ua/libjs/checkout.js",
      defer: true,
    },
  ],
});

import { useCartStore } from "~/stores/cart";
const cartStore = useCartStore();

const isEmptyList = computed(() => {
  return cartStore.products.length <= 0;
});
console.log(cartStore.products);
</script>
