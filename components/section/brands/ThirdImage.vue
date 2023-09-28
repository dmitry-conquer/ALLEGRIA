<template>
  <div class="relative flex h-[37.5rem] flex-col items-center justify-center overflow-hidden">
    <div class="absolute left-0 top-0 z-20 h-full w-full bg-black/60"></div>
    <img
      :style="`transform: scale(${zoomValue})`"
      ref="target"
      src="/brand/hero3.jpg"
      alt="DEHA"
      class="absolute left-0 top-0 z-10 h-full w-full object-cover will-change-transform transition-transform ease-linear" />
    <div class="relative z-30 text-center">
      <p class="mb-2 font-cormorant text-xl uppercase text-white">БРЕНД</p>
      <h2 class="mb-4 font-cormorant text-5xl sm:text-6xl uppercase text-white">birkenstock</h2>
      <p class="max-w-xl text-center text-lg text-white px-4">
        BIRKENSTOCK - відома німецька компанія, що займається виробництвом ортопедичного взуття.
      </p>
    </div>
  </div>
</template>

<script setup>
const zoomValue = useZoomImage();
</script>
