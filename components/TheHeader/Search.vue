<template>
  <div class="relative flex items-end gap-2">
    <label
      for="header-search"
      class="uppercase tracking-widest"
      >ПОШУК</label
    >
    <input
      v-model="search"
      id="header-search"
      type="text"
      class="max-w-[9rem] leading-none uppercase border-b border-primary-dark focus:outline-none" />
    <Transition name="dropdown">
      <div
        v-if="search"
        class="absolute left-0 top-[54px] w-80 bg-white shadow-md">
        <ul class="relative divide-y">
          <li
            v-for="product in searchedProducts"
            :key="product.id"
            class="4">
            <NuxtLink
            @click="search = ''"
              :to="`/catalog/${product.id}`"
              class="flex gap-4 px-4 py-2 text-lg leading-tight font-medium text-gray-500 transition-colors hover:bg-gray-100">
              <img
                :src="product.image[0]"
                :alt="product.name"
                class="h-12 w-12 object-contain shrink-0" />
              <span>
                {{ product.name }}
              </span>
            </NuxtLink>
          </li>
        </ul>
      </div>
    </Transition>
  </div>
</template>

<script setup>
const search = ref("");

const { data: products } = await useFetch("/api/products/", {
  transform: response => {
    return response.map(item => {
      return { name: item.name, image: item.image, id: item.id };
    });
  },
});

const searchedProducts = computed(() => {
  return products.value.filter(product => product.name.toLowerCase().includes(search.value.toLowerCase())).slice(0, 5);
});
</script>
