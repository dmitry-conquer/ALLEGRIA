<template>
  <div>
    <button
      :disabled="disable"
      @click="emit('pay')"
      class="mx-auto mt-8 rounded-sm bg-primary-dark px-16 py-2 text-center text-lg uppercase text-white transition-colors enabled:hover:bg-primary-dark/90 disabled:bg-primary-dark/70"
      type="submit">
      замовити
    </button>
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

</script>
