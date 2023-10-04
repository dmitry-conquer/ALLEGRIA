<template>
  <div class="flex">
    <AdminTableOrdersActionsShow @open-orders-details="emit('open-orders-details')" />
  </div>
</template>

<script setup>
const emit = defineEmits({
  "open-orders-details": null,
});
</script>
