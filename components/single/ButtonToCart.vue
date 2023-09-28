<template>
  <button
    @click="addToCart"
    class="w-full border border-primary-dark bg-white px-5 py-3 font-medium uppercase"
    type="button">
    ДОДАТИ В КОРЗИНУ
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
const { toast, toastOptions } = useToast();
const user = useSupabaseUser();
const isOpen = ref(false);

const props = defineProps({
  product: {
    type: Object,
    required: true,
    default: {},
  },
});

const cart = useCartStore();

const addToCart = () => {
  if (user.value) {
    cart.products.push(props.product);
    toast.success("Додано до кошика!", toastOptions);
  } else {
    isOpen.value = true;
  }
};
</script>

<style lang="scss"></style>
