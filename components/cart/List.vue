<template>
  <div class="w-full md:w-2/3 p-0 md:p-7">

    <div>
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
const removeFromCart = index => {
  cart.products.splice(index, 1);
};
</script>

<style lang="scss"></style>
