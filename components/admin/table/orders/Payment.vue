<template>
  <div class="bg-admin-primary-light/20 text-admin-primary inline-block rounded-2xl px-2 py-1 text-xs font-medium">
    {{ paymentStatus(payment) }}
  </div>
</template>

<script setup>
defineProps({
  payment: {
    type: String,
    required: true,
    validator: string => string.length > 0,
  },
});

function paymentStatus(value) {
  return value === "online" ? "Онлайн" : "Накладений платіж";
}
</script>
