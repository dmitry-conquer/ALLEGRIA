<template>
  <label class="flex flex-col gap-1.5">
    <span class="text-sm text-gray-600">Категорія</span>
    <select
      @change="$emit('update:currentCategoryId', $event.target.value)"
      :value="currentCategoryId"
      class="w-full rounded-md border border-gray-200 bg-white p-2 text-sm transition-colors focus:border-admin-brand focus:outline-none">
      <option
        v-for="category in newCategories"
        :value="category.id" :disabled="category.id === 'placeholder'">
        {{ category.name }}
      </option>
    </select>
  </label>
</template>

<script setup>
const props = defineProps({
  categories: {
    type: Array,
    required: true,
  },
  currentCategoryId: {
    type: String,
    required: false,
  },
});
console.log(props.categories);

const newCategories = ref([{id: 'placeholder', name: 'Оберіть категорію'}, ...props.categories])
console.log(newCategories.value);
defineEmits(["update:currentCategoryId"]);
</script>
