<template>
  <div>
    <button
      @click="emit('pay')"
      class="mx-auto mt-8 rounded-sm bg-primary-dark px-16 py-2 text-center text-lg uppercase text-white transition-colors hover:bg-primary-dark/90"
      type="submit">
      замовити
    </button>
    <div id="liqpay_checkout"></div>
  </div>
</template>

<script setup>
const emit = defineEmits({
  pay: null,
});
</script>
