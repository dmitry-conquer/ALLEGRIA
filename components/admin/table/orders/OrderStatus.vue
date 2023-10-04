<template>
  <div>
    <div
      v-if="orderStatus(status)"
      class="inline-block rounded-2xl bg-admin-success px-2 py-1 text-xs font-medium text-admin-success-dark">
      Оплачено
    </div>
    <div
      v-else
      class="rounded-2xl bg-admin-danger px-2 py-1 text-xs font-medium text-admin-danger-dark">
      Не оплачено
    </div>
  </div>
</template>

<script setup>
defineProps({
  status: {
    type: String,
    required: true,
    validator: string => string.length > 0,
  },
});

function orderStatus(value) {
  return value === "success";
}
</script>
