<template>
  <article class="p-4 shadow-md">
    <NuxtLink
      :to="`/catalog/${product.id}`"
      class="group relative flex h-full flex-col items-center">
      <div
        v-if="product.label"
        class="absolute right-4 top-4 z-10">
        <span class="grid h-12 w-12 place-content-center rounded-full bg-secondary p-2 text-sm uppercase text-white">
          {{ product.label }}
        </span>
      </div>
      <img
        :src="product?.image[0]"
        :alt="product?.name"
        loading="lazy"
        class="mb-8 transition-transform duration-300 group-hover:-rotate-1 group-hover:scale-[1.01]" />
      <div class="text-center">
        <h3 class="text-xl font-medium uppercase">{{ product.name }}</h3>
        <p class="mb-1.5">{{ product.category.name }}</p>
        <div class="inline-flex gap-2 text-sm font-medium">
          <span
            v-if="product.oldPrice"
            class="text-gray-300 line-through"
            >{{ product.oldPrice }} <span>UAH</span></span
          >
          <span class="text-secondary">{{ product.newPrice }} <span>UAH</span></span>
        </div>
      </div>
    </NuxtLink>
  </article>
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
