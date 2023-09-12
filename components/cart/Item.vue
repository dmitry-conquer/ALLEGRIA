<template>
  <li class="relative flex items-center gap-8 border p-6">
    <button
      @click="emit('remove-item')"
      class="absolute right-3 top-3"
      type="button">
      <IconClose class="h-6 w-6 stroke-primary-dark" />
    </button>
    <div class="h-48 w-40 shrink-0">
      <img
        :src="product.image[0]"
        :alt="product.name"
        class="block h-full w-full object-cover" />
    </div>
    <div class="flex flex-col">
      <h3 class="text-2xl font-medium uppercase">{{ product.name }}</h3>
      <p class="mb-2 text-lg font-light">{{ product.category.name }}</p>
      <div class="inline-flex items-end gap-2 font-medium">
        <span
          v-if="product.oldPrice"
          class="text-lg text-gray-300 line-through"
          >{{ product.oldPrice }} <span>ГРН</span></span
        >
        <span class="text-2xl text-secondary">{{ product.newPrice }} <span>ГРН</span></span>
      </div>
    </div>
  </li>
</template>

<script setup>
defineProps({
  product: {
    type: Object,
    required: true,
    default: {},
  },
});

const emit = defineEmits({
  "remove-item": null,
});
</script>

<style lang="scss"></style>
