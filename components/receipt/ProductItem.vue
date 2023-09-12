<template>
  <li>
    <h3>{{ product.name }}</h3>
    <div class="inline-flex items-end gap-2 font-medium">
      <span
        v-if="product.oldPrice"
        class="text-lg text-gray-300 line-through"
        >{{ product.oldPrice }} <span>ГРН</span></span
      >
      <span class="text-lg text-secondary">{{ product.newPrice }} <span>ГРН</span></span>
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
</script>
