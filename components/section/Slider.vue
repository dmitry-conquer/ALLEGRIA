<template>
  <div class="slider-products pl-[calc(100%-1200px)] md:container">
    <h2 class="mb-8 text-center font-cormorant text-3xl uppercase md:mb-16">{{ title }}</h2>
    <div class="flex items-center gap-4 max-md:pl-4">
      <button
        @click="swiper.slidePrev()"
        class="hidden h-14 w-14 shrink-0 place-content-center rounded-full bg-white shadow-md transition-shadow hover:shadow-lg md:grid lg:h-20 lg:w-20"
        type="button">
        <IconNavArrow class="h-7 w-3 rotate-180 lg:h-10 lg:w-5" />
      </button>
      <Swiper
        :modules="[SwiperAutoplay, SwiperPagination]"
        :slides-per-view="4"
        :autoplay="{
          delay: 2000,
          disableOnInteraction: false,
        }"
        :breakpoints="breakpointsOptions"
        :loop="true"
        :speed="1200"
        :pagination="pagination"
        :space-between="20"
        @swiper="onSwiper"
        class="!pb-20">
        <SwiperSlide
          v-for="product in products"
          :key="product.id">
          <NuxtLink
            :to="`/catalog/${product.id}`"
            class="group flex h-full flex-col items-center">
            <img
              :src="product.image[0]"
              :alt="product.name"
              class="mb-4 transition-transform duration-300 group-hover:-rotate-2 group-hover:scale-[1.02] sm:mb-8" />
            <div class="text-center">
              <h3 class="text-base font-medium uppercase sm:text-xl">{{ product.name }}</h3>
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
        class="hidden h-14 w-14 shrink-0 place-content-center rounded-full bg-white shadow-md transition-shadow hover:shadow-lg md:grid lg:h-20 lg:w-20"
        type="button">
        <IconNavArrow class="h-7 w-3 lg:h-10 lg:w-5" />
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
const limit = 8;
const { data: products } = await client.from("products").select().limit(limit);

const onSwiper = slider => {
  swiper.value = slider;
};
const pagination = {
  clickable: true,
};

const breakpointsOptions = {
  320: {
    slidesPerView: 1.7,
  },
  640: {
    slidesPerView: 1.8,
  },
  768: {
    slidesPerView: 2,
  },
  1024: {
    slidesPerView: 3,
  },
  1280: {
    slidesPerView: 4,
  },
};
</script>

<style lang="scss">
.slider-products {
  .swiper-pagination {
    gap: 10px !important;
  }
  .swiper-pagination-bullet {
    background-color: #E64926 !important;
    width: 10px;
    height: 10px;
  }
}
</style>
