<template>
  <div class="container py-24">
    <div>
      <!-- breadcrumbs -->
    </div>

    <div class="flex">
      <TheSidebar />
      <div class="grow px-8">
        <h1 class="mb-12 text-3xl font-medium uppercase">{{ currentCategory }}</h1>
        <Filter class="mb-8" />
        <ClientOnly>
          <TheSort
            class="mb-8"
            :quantity="quantity" />
        </ClientOnly>
        <div class="relative grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
          <article
            v-for="product in sortedProducts"
            :key="product.id"
            class="p-4 shadow-md">
            <NuxtLink
              :to="`/catalog/${product.id}`"
              class="group relative flex h-full flex-col items-center">
              <div
                v-if="product.label"
                class="absolute right-4 top-4 z-10">
                <span
                  class="grid h-12 w-12 place-content-center rounded-full bg-secondary p-2 text-sm uppercase text-white">
                  {{ product.label }}
                </span>
              </div>
              <img
                :src="product.image[0]"
                :alt="product.name"
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
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const route = useRoute();

const { data: res } = await useFetch("/api/result");
console.log(res);
/*
  get data
*/

const category = computed(() => route.query.category);
const size = computed(() => route.query.size);
const { data: products } = await useFetch("/api/products", {
  query: {
    category,
    size,
  },
  watch: [category, size],
});

const { data: categories } = await useFetch("/api/menu/", {
  transform: response => {
    return response.categories;
  },
});

const currentCategory = computed(() => {
  const current = categories.value.filter(item => {
    return item.id === category.value;
  })[0]?.name;

  return current || "Всі товари";
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
.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

/* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
.list-leave-active {
  position: absolute;
}
</style>
