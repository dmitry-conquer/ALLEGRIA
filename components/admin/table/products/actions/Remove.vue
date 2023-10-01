<template>
  <div>
    <button
      :disabled="deletePending"
      @click="emit('delete-product')"
      type="button"
      class="group rounded-lg  p-2 transition-colors hover:bg-gray-200">
      <AdminIconTrash class="h-5 w-5 text-gray-600 transition-colors group-hover:text-red-500" />
    </button>
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
  "delete-product": null,
});
</script>
