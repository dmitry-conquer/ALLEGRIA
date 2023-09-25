<template>
  <div class="relative flex h-[37.5rem] flex-col items-center justify-center overflow-hidden">
    <div class="absolute left-0 top-0 z-20 h-full w-full bg-black/60"></div>
    <img
      :style="`transform: scale(${zoomValue})`"
      ref="target"
      :src="image"
      :alt="title"
      class="absolute left-0 top-0 z-10 h-full w-full object-cover transition-transform ease-linear" />
    <div class="relative z-30 text-center">
      <p class="mb-2 font-cormorant text-xl uppercase text-white">БРЕНД</p>
      <h2 class="mb-4 font-cormorant text-6xl uppercase text-white">{{ title }}</h2>
      <p class="max-w-xl text-center text-lg text-white">
        {{ description }}
      </p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

const zoomValue = ref(1);
const toggle = ref(true);
const endPoint = 1.3;
let step = 0.0023;

onMounted(() => {
  setInterval(() => {
    if (toggle.value) {
      zoomValue.value = zoomValue.value + step;
    }
    if (!toggle.value) {
      zoomValue.value = zoomValue.value - step;
    }
  }, 100);
});

watch(
  () => zoomValue.value,
  () => {
    if (zoomValue.value >= endPoint) {
      toggle.value = false;
    } else if (zoomValue.value <= 1) {
      toggle.value = true;
    }
  },
);
</script>
