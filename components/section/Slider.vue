<template>
  <div>
    <h2 class="mb-16 text-center font-cormorant text-3xl uppercase">{{ title }}</h2>
    <div class="flex items-center container gap-4">
      <button
        @click="swiper.slidePrev()"
        class="grid h-20 w-20 place-content-center rounded-full bg-white shadow-md hover:shadow-lg transition-shadow  shrink-0"
        type="button">
        <IconNavArrow class="h-10 w-5 rotate-180" />
      </button>
      <Swiper
        :modules="[SwiperAutoplay]"
        :slides-per-view="4"
        :autoplay="{
          delay: 2000,
        }"
        :loop="true"
        :speed="1200"
        :space-between="30"
        @swiper="onSwiper"
        class="!my-6  !py-6">
        <SwiperSlide
          v-for="product in products"
          :key="product.id">
          <NuxtLink
            :to="`/catalog/${product.id}`"
            class="group flex h-full flex-col items-center">
            <img
              :src="product.image[0]"
              :alt="product.name"
              class="mb-8 transition-transform duration-300 group-hover:-rotate-2 group-hover:scale-[1.02]" />
            <div class="text-center">
              <h3 class="text-xl font-medium uppercase">{{ product.name }}</h3>
              <p class="mb-1.5">{{ product.category.name }}</p>
              <div class="inline-flex gap-2 text-sm font-medium">
                <span class="text-gray-300 line-through">{{ product.oldPrice }} <span>UAH</span></span>
                <span class="text-secondary">{{ product.newPrice }} <span>UAH</span></span>
              </div>
            </div>
          </NuxtLink>
        </SwiperSlide>
      </Swiper>
      <button
        @click="swiper.slideNext()"
        class="grid h-20 w-20 place-content-center rounded-full bg-white shadow-md hover:shadow-lg transition-shadow  shrink-0 "
        type="button">
        <IconNavArrow class="h-10 w-5" />
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
});

const client = useSupabaseClient();
const swiper = ref();
const limit = 10;
const { data: products } = await client.from("products").select().limit(limit);
console.log(products);

const onSwiper = slider => {
  swiper.value = slider;
};
</script>

<style lang="scss"></style>
