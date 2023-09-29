<template>
  <div class="flex">
    <AdminTableProductsActionsEdit @open-product-details="emit('open-product-details')" />
    <AdminTableProductsActionsRemove />
  </div>
</template>

<script setup>
const emit = defineEmits({
  "open-product-details": null,
});
</script>
