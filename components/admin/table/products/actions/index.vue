<template>
  <div class="flex">
    <AdminTableProductsActionsEdit @open-product-details="emit('open-product-details')" />
    <AdminTableProductsActionsRemove @delete-product="emit('delete-product')" :deletePending="deletePending"/>
  </div>
</template>

<script setup>
defineProps({
  deletePending: {
    type: Boolean,
    required: false,
    default: false,
    validator: value => typeof value === "boolean",
  },
});

const emit = defineEmits({
  "open-product-details": null,
  "delete-product": null,
});
</script>
