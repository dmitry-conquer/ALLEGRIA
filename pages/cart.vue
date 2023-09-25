<template>
  <div>
    <div
      v-if="isEmptyList"
      class="flex min-h-screen flex-col items-center justify-center">
      <h1 class="text-center text-4xl uppercase ">Кошик порожній</h1>
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
      class="py-32">
      <div class="border-b pb-16">
        <h1 class="text-center font-cormorant text-4xl uppercase">КОШИК</h1>
      </div>
      <div>
        <div class="mx-auto flex max-w-5xl items-start">
          <CartContacts />
          <CartList />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCartStore } from "~/stores/cart";
const cartStore = useCartStore();

const isEmptyList = computed(() => {
  return cartStore.products.length <= 0;
});
console.log(cartStore.products);
</script>
