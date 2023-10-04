<template>
  <div
    class="bg-white"
    ref="trigger">
    <button
      @click="isSearchVisible = !isSearchVisible"
      class="lg:hidden"
      type="button">
      <IconSearch class="h-6 w-6 mt-2" />
    </button>

    <div
      :class="{
        'max-lg:opacity-1 max-lg:visible border-t': isSearchVisible,
        'max-lg:invisible max-lg:opacity-0': !isSearchVisible,
      }"
      class="absolute left-0 top-full flex w-full duration-300 justify-center gap-2 bg-white py-5 transition-all  lg:relative">
      <label
        for="header-search"
        class="bg-white uppercase tracking-widest"
        >ПОШУК</label
      >
      <input
        v-model="search"
        id="header-search"
        type="text"
        class="border-b border-primary-dark bg-white uppercase leading-none focus:outline-none lg:max-w-[9rem]" />
      <div
        v-if="search && searchedProducts.length > 0"
        class="absolute left-0 top-full lg:top-[54px] w-full py-4 lg:py-2  lg:w-80 bg-white">
        <ul class="relative divide-y">
          <li
            v-for="product in searchedProducts"
            :key="product.id"
            class="4">
            <NuxtLink
              @click="search = ''"
              :to="`/catalog/${product.id}`"
              class="flex gap-4 px-4 py-2 text-lg font-medium leading-tight text-admin-text transition-colors hover:bg-gray-100">
              <img
                :src="product.image[0]"
                :alt="product.name"
                class="h-12 w-12 shrink-0 object-contain" />
              <span>
                {{ product.name }}
              </span>
            </NuxtLink>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onClickOutside } from "@vueuse/core";

const search = ref("");
const isSearchVisible = ref(false);
const trigger = ref(null);
onClickOutside(trigger, () => (isSearchVisible.value = false));

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
