<template>
  <div class="relative border-t">
    <span class="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-2 bg-white px-4">
      <Logo class="opacity-30" />
    </span>
    <div class="relative bg-primary-light py-10">
      <img
        src="/form-about.svg"
        alt="vector"
        class="absolute right-1/2 top-0 -translate-y-8 translate-x-32" />

      <div class="relative mx-auto flex flex-col justify-between gap-10 px-4 md:flex-row lg:max-w-6xl lg:items-center">
        <div class="w-full text-white lg:w-1/2">
          <h2 class="mb-5 text-left font-cormorant">
            <span class="text-lg">ПРО</span>
            <br />
            <span class="text-5xl sm:text-7xl lg:text-8xl">НАС</span>
          </h2>
          <p class="text-sm">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Molestias cumque similique tempora in iure
            molestiae dolor ea fuga quidem nam laboriosam enim quaerat, minus doloremque architecto repellat eligendi
            deserunt maiores! Lorem ipsum dolor, sit amet consectetur adipisicing elit. Molestias cumque similique
            tempora in iure molestiae dolor ea fuga quidem nam laboriosam enim quaerat, minus doloremque architecto
            repellat eligendi deserunt maiores!
          </p>
        </div>
        <div class="w-full max-lg:h-60 md:translate-y-1/3 lg:w-1/2 overflow-hidden">
          <img
            src="/about.jpg"
            alt="about"
            :style="`transform: scale(${zoomValue})`"
            class="block h-full transition-transform will-change-transform w-full object-cover" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const zoomValue = useZoomImage();
</script>
