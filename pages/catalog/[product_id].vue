<template>
  <div class="py-24">
    <div class="mx-auto max-w-5xl px-4">
      <div class="mb-32 flex flex-col gap-12 md:flex-row">
        <div class="flex w-full flex-col-reverse gap-2 sm:flex-row">
          <div class="flex flex-row gap-2 overflow-auto sm:flex-col">
            <img
              v-for="(img, i) in product.image"
              @click="selectedImage = img"
              :key="i"
              :src="img"
              :alt="product.name"
              class="h-28 w-32 cursor-pointer object-cover max-sm:grow" />
          </div>
          <div class="relative grow overflow-hidden">
            <ClientOnly>
              <VueMagnifier
                mg-shape="square"
                :src="selectedImage"
                :alt="product.name"
                class="block max-h-[500px] w-full object-cover" />
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

useSeoMeta({
  title: `${product.value.name} | Allegria`,
  keywords: "Allegria, магазин, жіночий одяг, брендовий одяг, стиль, одежа жіноча, syjxbq jlzu",
  description:
    "Allegria - ваш унікальний інтернет-магазин брендового одягу. Відкрийте для себе найсвіжіші та найстильніші колекції від улюблених дизайнерів і зробіть свій гардероб ще більш елегантним та стильним.",
  ogUrl: `https://allegria-store.netlify.app`,
  ogType: "website",
  ogTitle: `${product.value.name} | Allegria`,
  ogImage: "https://example.com/image.png", //1200x630
  ogLocale: "uk_UA",
  ogSiteName: "Allegria", // Назва вашого сайту
  ogDescription:
    "Allegria - ваш унікальний інтернет-магазин брендового одягу. Відкрийте для себе найсвіжіші та найстильніші колекції від улюблених дизайнерів і зробіть свій гардероб ще більш елегантним та стильним.",
  twitterCard: "summary_large_image",
  twitterDescription:
    "Allegria - ваш унікальний інтернет-магазин брендового одягу. Відкрийте для себе найсвіжіші та найстильніші колекції від улюблених дизайнерів і зробіть свій гардероб ще більш елегантним та стильним.",
  twitterImage: "https://example.com/image.png", //1200x630
  twitterTitle: `${product.value.name} | Allegria`,
});

useHead({
  link: [{ rel: 'canonical', href: 'https://allegria-store.netlify.app' }],
  script: [
    {
      src: "https://static.liqpay.ua/libjs/checkout.js",
      defer: true,
    },
  ],
  htmlAttrs: { lang: "uk" },
});
</script>
