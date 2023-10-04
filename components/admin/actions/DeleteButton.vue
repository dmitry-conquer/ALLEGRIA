<template>
  <button
    @click="emit('delete-item')"
    type="button"
    class="group rounded-lg p-2 transition-colors hover:bg-admin-secondary">
    <AdminIconTrash class="h-5 w-5 text-admin-text transition-colors group-hover:text-red-500" />
  </button>
</template>

<script setup>
const emit = defineEmits({
  "delete-item": null,
});
</script>
