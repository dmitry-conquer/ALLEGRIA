<template>
  <div class="w-2/3 p-7">
    <div v-if="isEmptyList">
      <p class="text-center text-3xl uppercase">Кошик порожній</p>
      <div class="mt-8 flex justify-center">
        <NuxtLink
          to="/catalog"
          class="rounded-sm bg-primary-dark px-3 py-2 text-center text-lg uppercase text-white transition-colors hover:bg-primary-dark/90"
          type="submit">
          ПЕРЕЙТИ В КАТАЛОГ
        </NuxtLink>
      </div>
    </div>
    <div v-else>
      <ul class="space-y-8">
        <CartItem
          v-for="(product, i) in cart.products"
          :key="product.id"
          :product="product"
          @remove-item="removeFromCart(i)" />
      </ul>
      <div class="mt-8 text-2xl">
        <p>
          До сплати: <span class="font-medium">{{ cart.totalPrice }} грн.</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCartStore } from "~/stores/cart";
const cart = useCartStore();

const isEmptyList = computed(() => {
  return cart.products.length <= 0;
});

const removeFromCart = index => {
  cart.products.splice(index, 1);
};
</script>

<style lang="scss"></style>
