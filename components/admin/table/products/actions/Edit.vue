<template>
  <div>
    <button
      @click="emit('open-product-details')"
      type="button"
      class="group rounded-lg p-2 transition-colors hover:bg-admin-secondary">
      <AdminIconWrench class="h-5 w-5 text-admin-text transition-colors group-hover:text-blue-500" />
    </button>
  </div>
</template>

<script setup>
const emit = defineEmits({
  "open-product-details": null,
});
</script>
