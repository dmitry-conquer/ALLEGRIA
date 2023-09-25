<template>
  <div>
    <button
      :disabled="disable"
      @click="handlePay"
      class="mx-auto mt-8 rounded-sm bg-primary-dark px-16 py-2 text-center text-lg uppercase text-white transition-colors enabled:hover:bg-primary-dark/90 disabled:bg-primary-dark/70"
      type="submit">
      замовити
    </button>
    <BaseModal
      v-if="isOpen"
      @close-modal="isOpen = false"
      class="overflow-auto">
      <div
        id="liqpay_checkout"
        class="overflow-auto"></div>
    </BaseModal>
  </div>
</template>

<script setup>
const props = defineProps({
  disable: {
    type: [Boolean, null],
    required: false,
  },
  paymentMethod: {
    type: String,
    required: true,
    default: "online",
  },
});
const emit = defineEmits({
  pay: null,
});

const isOpen = ref(false);

const handlePay = () => {
  if (props.paymentMethod === "online") {
    isOpen.value = true;
  }
  setTimeout(() => {
    emit("pay");
  }, 300);
};
</script>
