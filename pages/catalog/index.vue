<template>
  <div class="container py-24">
    <div v-if="pending">
      <!-- breadcrumbs -->
    </div>

    <div class="flex">
      <TheSidebar />
      <div class="grow px-8">
        <CatalogMainTitle :category="category" />
        <Filter class="mb-8" />
        <ClientOnly>
          <CatalogSort
            class="mb-8"
            :quantity="quantity" />
        </ClientOnly>
        <Transition
          name="fade"
          mode="out-in">
          <SpinnerLoader
            sizes="w-12 h-12"
            v-if="pending" />
          <div
            v-else
            class="relative grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
            <CatalogItem
              v-for="product in sortedProducts"
              :key="product.id"
              :product="product" />
          </div>
        </Transition>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  pageTransition: {
    name: "page",
    mode: "out-in",
  },
});
const route = useRoute();

const category = computed(() => route.query.category);
const size = computed(() => route.query.size);
const limit = 6;

const { data: products, pending } = await useFetch("/api/products/", {
  lazy: true,
  query: {
    category,
    size,
    limit,
  },
  watch: [category, size],
});

/*
  products quantity
*/

const quantity = computed(() => {
  return products.value?.length;
});

/*
  sort products
*/

const sortedProducts = computed(() => {
  if (route.query.sortBy === "price") {
    return products.value?.sort((a, b) => {
      return a.newPrice - b.newPrice;
    });
  } else if (route.query.sortBy === "popular") {
    return products.value?.sort((a, b) => {
      return b.popularity - a.popularity;
    });
  }
  return products.value;
});
</script>

<style lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
