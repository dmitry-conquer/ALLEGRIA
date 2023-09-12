<template>
  <div>
    <div v-if="isEmptyList">
      <p>У вас немає обраних товарів</p>
      <br />
      <p>
        Додавайте речі, які вам сподобалися, до списку обраних, щоб спостерігати за їхньою наявністю та ціною і легко
        знайти.
      </p>
      <div class="mt-8 flex justify-center">
        <NuxtLink
          to="/catalog"
          class="rounded-sm bg-primary-dark px-3 py-2 text-center text-lg uppercase text-white transition-colors hover:bg-primary-dark/90"
          type="submit">
          ПЕРЕЙТИ В КАТАЛОГ
        </NuxtLink>
      </div>
    </div>

    <div v-else>
      <Transition
        name="fade"
        mode="out-in">
        <SpinnerLoader v-if="pending" />
        <ul
          v-else
          class="space-y-8">
          <li
            v-for="product in favoritesProducts"
            :key="product.id"
            class="relative flex items-center gap-8 border p-6">
            <button
              @click="removeFromFavorites(product.id)"
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
              <button
                type="button"
                class="mt-5 border border-primary-dark bg-white px-4 py-3 text-xl uppercase">
                додати в корзину
              </button>
            </div>
          </li>
        </ul>
      </Transition>
    </div>
  </div>
</template>

<script setup>
const user = useSupabaseUser();
const client = useSupabaseClient();

const { data: favorites } = await useAsyncData("users", async () => {
  const { data } = await client.from("users").select("favorites").eq("user_id", user.value.id).single();
  return data;
});
const { data: favoritesProducts, pending } = await useAsyncData(
  "products",
  async () => {
    const { data } = await client.from("products").select().in("id", favorites.value.favorites);
    return data;
  },
  {
    watch: [favorites.value.favorites],
  },
);

const removeFromFavorites = async id => {
  const index = favorites.value.favorites.indexOf(id.toString());
  favorites.value.favorites.splice(index, 1);
  const { data, error } = await client
    .from("users")
    .update({ favorites: favorites.value.favorites })
    .eq("user_id", user.value.id)
    .select();
};

const isEmptyList = computed(() => {
  return favorites.value.favorites.length <= 0;
});
</script>
