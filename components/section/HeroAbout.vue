<template>
  <div class="relative flex min-h-screen items-center justify-center">
    <div class="absolute left-0 top-0 h-full w-full bg-black/60"></div>
    <video
      ref="video"
      src="/about/video.mp4"
      autoplay
      loop
      muted
      class="absolute z-[-1] h-full w-full object-cover"></video>
    <div class="relative z-10 text-center">
      <h1 class="mb-4 font-cormorant text-6xl uppercase text-white">ПРО НАС</h1>
      <p class="max-w-xl text-center text-lg text-white">
        Бутік Allegria спеціалізується на продажі комфортного та сучасного одягу для вільного часу у стилі кежуал. Ми
        вважаємо, що одяг – це джерело радості, що і відображає назва нашого магазину.
      </p>
    </div>
  </div>
</template>

<script setup>
const video = ref(null);
onMounted(() => video.value.play());
</script>

<style lang="scss"></style>
