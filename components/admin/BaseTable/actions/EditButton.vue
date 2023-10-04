<template>
  <button
    @click="$emit('edit-item')"
    type="button"
    class="group rounded-lg p-2 transition-colors hover:bg-admin-secondary">
    <AdminIconWrench class="h-5 w-5 text-admin-text transition-colors group-hover:text-admin-primary" />
  </button>
</template>

<script setup>
defineEmits({
  "edit-item": null,
});
</script>
