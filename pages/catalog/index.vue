<template>
  <div class="container py-24">
    <div>
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
        <div class="relative grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
          <CatalogItem
            v-for="product in sortedProducts"
            :key="product.id"
            :product="product" />
        </div>
        <div class="mt-10 flex h-11 justify-center gap-4">
          <SpinnerLoader
            v-if="pending"
            sizes="w-10 h-10" />
          <div v-else>
            <button
              v-if="hasProducts"
              @click="page++"
              class="bg-primary-dark px-4 py-2 uppercase text-white transition-colors enabled:hover:bg-primary-dark/70"
              type="button">
              Показати більше
            </button>
          </div>
        </div>
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
const client = useSupabaseClient();

const category = computed(() => route.query.category);
const size = computed(() => route.query.size);
const from = computed(() => route.query.from);
const to = computed(() => route.query.to);
const limit = 6;
const page = ref(1);
const total = computed(() => {
  return limit * page.value;
});

const { data: products, pending } = await useFetch("/api/products/", {
  lazy: true,
  query: {
    category,
    size,
    total,
    from,
    to,
  },
  watch: [category, size, page, from, to],
});

const { count, error } = await client.from("products").select("*", { count: "exact", head: true });
if (error) console.log(error);

const hasProducts = computed(() => products.value?.length % limit === 0 && products.value?.length <= count);

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
