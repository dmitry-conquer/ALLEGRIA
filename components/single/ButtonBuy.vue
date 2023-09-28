<template>
  <button
    type="button"
    @click="addToCart"
    class="block w-full border border-primary-dark bg-primary-dark px-5 py-3 text-center font-medium uppercase text-white">
    КУПИТИ В ОДИН КЛІК
  </button>
  <Transition name="fade">
    <BaseModal
      v-if="isOpen"
      :isOpen="isOpen"
      @close-modal="isOpen = false">
      <LoginForm @close-modal="isOpen = false" />
    </BaseModal>
  </Transition>
</template>

<script setup>
import { useCartStore } from "~/stores/cart";
const cartStore = useCartStore();
const user = useSupabaseUser();
const isOpen = ref(false);

const props = defineProps({
  product: {
    type: Object,
    required: true,
    default: {},
  },
});

const addToCart = () => {
  if (user.value) {
    cartStore.products = [];
    cartStore.products.push(props.product);
    navigateTo("/cart");
  } else {
    isOpen.value = true;
  }
};
</script>
