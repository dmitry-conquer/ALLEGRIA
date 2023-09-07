<template>
  <div>
    <h2 class="mb-16 text-center font-cormorant text-3xl uppercase">{{ title }}</h2>
    <Swiper
      :slides-per-view="4"
      :speed="800"
      :space-between="30"
      class="!my-6 max-w-7xl !py-6">
      <SwiperSlide
        v-for="product in products"
        :key="product.id">
        <NuxtLink
          to="/catalog"
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
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
});

const limit = ref(6);
const { data: products } = await useFetch("/api/products/", {
  query: {
    limit,
  },
});
</script>

<style lang="scss"></style>
