<template>
  <label class="flex flex-col gap-1.5">
    <span class="text-sm text-gray-600">Категорія</span>
    <select
      @change="$emit('update:currentCategoryId', $event.target.value)"
      :value="currentCategoryId"
      class="w-full rounded-md border border-gray-200 bg-white p-2 text-sm transition-colors focus:border-admin-brand focus:outline-none">
      <option
        v-for="category in categories"
        :value="category.id">
        {{ category.name }}
      </option>
    </select>
  </label>
</template>

<script setup>
defineProps({
  categories: {
    type: Object,
    required: true,
  },
  currentCategoryId: {
    type: String,
    required: false,
  },
});
defineEmits(["update:currentCategoryId"]);
</script>
