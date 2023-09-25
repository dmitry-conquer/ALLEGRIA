<template>
  <div class="relative flex min-h-screen items-center justify-center">
    <h1 class="sr-only">бренди</h1>
    <div class="absolute left-0 top-0 h-full w-full bg-black/60"></div>
    <video
      ref="video"
      src="/brand/video2.mp4"
      autoplay
      loop
      muted
      class="absolute z-[-1] h-full w-full object-cover"></video>
    <div class="relative z-10 text-center">
      <p class="mb-2 font-cormorant text-xl uppercase text-white">БРЕНД</p>
      <h2 class="mb-4 font-cormorant text-6xl uppercase text-white">american vintage</h2>
      <p class="max-w-xl text-center text-lg text-white">
        American Vintage – модна торгова марка з виробництва трикотажного одягу для жінок.
      </p>
    </div>
  </div>
</template>

<script setup>
const video = ref(null);
onMounted(() => video.value.play());
</script>
