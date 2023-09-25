<template>
  <div class="py-24">
    <div class="mx-auto max-w-5xl">
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
              @click="handleToFavorites"
              class="group absolute right-5 top-5 grid place-content-center rounded-full bg-white p-2"
              type="button">
              <IconFavorite
                :class="{ 'fill-red-500': isFavorite, 'stroke-red-500': isFavorite }"
                class="h-6 w-6 transition-colors group-hover:fill-red-500 group-hover:stroke-red-500" />
            </button>
          </div>
        </div>
        <SingleInfo :product="product" />
        <Transition name="fade">
          <BaseModal
            v-if="isOpen"
            :isOpen="isOpen"
            @close-modal="isOpen = false">
            <LoginForm @close-modal="isOpen = false" />
          </BaseModal>
        </Transition>
      </div>
      <!-- slider -->
    </div>
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
const { toast, toastOptions } = useToast();
const isOpen = ref(false);

const { data: product } = await useFetch(`/api/${route.params.product_id}`, {
  transform: response => {
    return response[0];
  },
});

const selectedImage = ref(product.value.image[0]);

/*
  favorites
*/

const favoritesList = ref([]);
const isFavorite = computed(() => {
  return Object.values(favoritesList?.value).some(item => item == product.value.id);
});
if (user.value) {
  const { data } = await client.from("users").select("favorites").eq("user_id", user.value.id).single();
  favoritesList.value = data.favorites;
  console.log("logined");
}

const handleToFavorites = () => {
  if (!user.value) {
    isOpen.value = true;
    return;
  }
  toFavorites();
};

const toFavorites = async () => {
  if (isFavorite.value === false) {
    favoritesList.value = [product.value.id, ...favoritesList.value];
    toast.success("Додано в улюблені!", toastOptions);
  } else {
    const index = favoritesList.value.indexOf(product.value.id);
    favoritesList.value.splice(index, 1);
    toast.error("Видалено з улюблених!", toastOptions);
  }
  const { error } = await client
    .from("users")
    .update({ favorites: favoritesList.value })
    .eq("user_id", user.value.id)
    .select();
  if (error) {
    toast.error("Помилка додавання", toastOptions);
  }
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
