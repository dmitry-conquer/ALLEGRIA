<template>
  <div class="flex flex-col bg-soft-dark md:flex-row">
    <div class="f-ull relative flex basis-2/5 flex-col justify-center overflow-hidden p-4 lg:pl-12">
      <NuxtImg
        format="webp"
        quality="50"
        src="/new_arrival_1.jpg"
        alt="new arrival"
        class="absolute left-0 top-0 h-full w-full object-cover" />

      <div class="relative z-10 max-w-lg text-white">
        <h2 class="mb-4 font-cormorant text-6xl uppercase xl:text-7xl 2xl:text-8xl">
          New <br />
          Arrival
        </h2>
        <p class="mb-8 text-sm">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolorem sint, doloribus alias repudiandae dolore
          fugiat, error, corrupti beatae natus delectus libero blanditiis deserunt magni ex cum. Culpa illum soluta
          cumque.
        </p>
        <NuxtLink
          to="/catalog"
          class="transition-colors hover:text-secondary"
          >ПЕРЕГЛЯНУТИ КОЛЕЦІЮ</NuxtLink
        >
      </div>
    </div>
    <div class="flex grow place-content-center p-2 sm:p-12">
      <div class="bg-white p-6 md:p-16 xl:p-24 2xl:p-28">
        <div class="relative overflow-hidden">
          <img
            src="/new_arrival_2.jpg"
            alt="new arrival"
            :style="`transform: scale(${zoomValue})`"
            class="transition-transform will-change-transform" />
          <p class="absolute bottom-4 left-1/2 w-full -translate-x-1/2 px-6 text-center text-sm text-white">
            Lorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipLorem ipsumLorem ip
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const zoomValue = useZoomImage();
</script>
