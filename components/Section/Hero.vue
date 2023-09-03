<template>
  <div class="h-screen w-full">
    <h1 class="sr-only">Популярні колекції</h1>
    <Swiper
      :modules="[SwiperPagination, SwiperParallax, SwiperAutoplay]"
      @swiper="onSwiper"
      :speed="1300"
      :autoplay="{
        duration: 3000
      }"
      :pagination="pagination"
      :parallax="true"
      class="h-full w-full">
      <SwiperSlide class="dark-cover">
        <div class="grid h-full w-full place-content-center">
          <img
            src="/hero_4.jpg"
            class="absolute left-0 top-0 h-full w-full object-cover"
            alt="AMERICAN VINTAGE" />
          <div class="relative z-10 text-center text-white">
            <div
              data-swiper-parallax="-300"
              data-swiper-parallax-opacity="0.15"
              class="mb-9">
              <p class="mb-2 font-cormorant text-2xl uppercase">БРЕНД</p>
              <h2 class="font-cormorant text-5xl uppercase">AMERICAN VINTAGE</h2>
            </div>
            <NuxtLink
              to="/catalog"
              class="text-sm uppercase"
              >ПЕРЕГЛЯНУТИ КОЛЕКЦІЮ</NuxtLink
            >
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide class="dark-cover">
        <div class="grid h-full w-full place-content-center">
          <img
            src="/hero_5.jpg"
            class="absolute left-0 top-0 h-full w-full object-cover"
            alt="GEORGE GINA LUCY" />
          <div class="relative z-10 text-center text-white">
            <div
              data-swiper-parallax="-300"
              data-swiper-parallax-opacity="0.15"
              class="mb-9">
              <p class="mb-2 font-cormorant text-2xl uppercase">БРЕНД</p>
              <h2 class="font-cormorant text-5xl uppercase">GEORGE GINA LUCY</h2>
            </div>
            <NuxtLink
              to="/catalog"
              class="text-sm uppercase"
              >ПЕРЕГЛЯНУТИ КОЛЕКЦІЮ</NuxtLink
            >
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide class="dark-cover">
        <div class="grid h-full w-full place-content-center">
          <img
            src="/hero_6.jpg"
            class="absolute left-0 top-0 h-full w-full object-cover"
            alt="birkenstock" />
          <div class="relative z-10 text-center text-white">
            <div
              data-swiper-parallax="-300"
              data-swiper-parallax-opacity="0.15"
              class="mb-9">
              <p class="mb-2 font-cormorant text-2xl uppercase">БРЕНД</p>
              <h2 class="font-cormorant text-5xl uppercase">BIRKENSTOCK</h2>
            </div>
            <NuxtLink
              to="/catalog"
              class="text-sm uppercase"
              >ПЕРЕГЛЯНУТИ КОЛЕКЦІЮ</NuxtLink
            >
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide class="dark-cover">
        <div class="grid h-full w-full place-content-center">
          <img
            src="/hero_7.jpg"
            class="absolute left-0 top-0 h-full w-full object-cover"
            alt="DEHA" />
          <div class="relative z-10 text-center text-white">
            <div
              data-swiper-parallax="-300"
              data-swiper-parallax-opacity="0.15"
              class="mb-9">
              <p class="mb-2 font-cormorant text-2xl uppercase">БРЕНД</p>
              <h2 class="font-cormorant text-5xl uppercase">DEHA</h2>
            </div>
            <NuxtLink
              to="/catalog"
              class="text-sm uppercase"
              >ПЕРЕГЛЯНУТИ КОЛЕКЦІЮ</NuxtLink
            >
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<script setup>
const slider = ref(null);

const onSwiper = swiper => {
  slider.value = swiper;
};

const pagination = {
  clickable: true,
  renderBullet: function (index, className) {
    return `<span class="${className}">${(index + 1).toString().padStart(2, 0)}</span>`;
  },
};
</script>

<style lang="scss">
.swiper-pagination {
  display: flex;
  gap: 30px;
  justify-content: center;
  margin-bottom: 20px;
  .swiper-pagination-bullet {
    color: #fff;
    background: transparent;
    opacity: 0.3;
  }
  .swiper-pagination-bullet-active {
    opacity: 1;
  }
}
</style>
