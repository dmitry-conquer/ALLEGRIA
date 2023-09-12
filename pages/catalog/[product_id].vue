<template>
  <div class="mx-auto max-w-5xl py-24">
    <!-- single -->
    <div class="mb-32 flex gap-12">
      <div class="flex w-full gap-2">
        <div class="space-y-2">
          <img
            v-for="(img, i) in product.image"
            @click="selectedImage = img"
            :key="i"
            :src="img"
            :alt="product.name"
            class="h-28 w-32 cursor-pointer object-cover" />
        </div>
        <div class="relative max-h-[600px] grow">
          <ClientOnly>
            <VueMagnifier
              mg-shape="square"
              :src="selectedImage"
              :alt="product.name"
              class="block h-full w-full object-cover" />
          </ClientOnly>
          <button
            @click="toFavorites"
            class="group absolute right-5 top-5 grid place-content-center rounded-full bg-white p-2"
            type="button">
            <IconFavorite
              :class="{ 'fill-red-500': isFavorite, 'stroke-red-500': isFavorite }"
              class="h-6 w-6 transition-colors group-hover:fill-red-500 group-hover:stroke-red-500" />
          </button>
        </div>
      </div>
      <SingleInfo :product="product" />
    </div>

    <!-- slider -->
    <SectionSlider title="подібні товари" />
  </div>
</template>

<script setup>
definePageMeta({
  pageTransition: {
    name: "page",
    mode: "out-in",
  },
});
import VueMagnifier from "@websitebeaver/vue-magnifier";
import "@websitebeaver/vue-magnifier/styles.css";

const route = useRoute();
const client = useSupabaseClient();
const user = useSupabaseUser();

const { data: product, pending } = await useFetch(`/api/${route.params.product_id}`, {
  transform: response => {
    return response[0];
  },
});

const selectedImage = ref(product.value.image[0]);

/*
  favorites
*/

const { data } = await client.from("users").select("favorites").eq("user_id", user.value.id).single();
const favoritesList = ref([...(data.favorites ?? "")]);
const isFavorite = computed(() => {
  return Object.values(favoritesList.value).some(item => item == product.value.id);
});
const toFavorites = async () => {
  let updatedFavorites;
  if (isFavorite.value === false) {
    updatedFavorites = [+product.value.id, ...favoritesList.value];
  } else {
    const index = favoritesList.value.indexOf(product.value.id);
    updatedFavorites = favoritesList.value.splice(index, 1);
  }
  const { error } = await client
    .from("users")
    .update({ favorites: updatedFavorites })
    .eq("user_id", user.value.id)
    .select();
  const { data } = await client.from("users").select("favorites").eq("user_id", user.value.id).single();
  favoritesList.value = data.favorites ?? "";
};

/*
  pay
*/

useHead({
  script: [
    {
      src: "https://static.liqpay.ua/libjs/checkout.js",
      defer: true,
    },
  ],
});
</script>
