<template>
  <div class="relative flex h-[37.5rem] flex-col items-center justify-center overflow-hidden">
    <div class="absolute left-0 top-0 z-20 h-full w-full bg-black/60"></div>
    <img
      :style="`transform: scale(${zoomValue})`"
      ref="target"
      src="/brand/hero4.jpg"
      alt="DEHA"
      class="absolute left-0 top-0 z-10 h-full w-full object-cover transition-transform ease-linear" />
    <div class="relative z-30 text-center">
      <p class="mb-2 font-cormorant text-xl uppercase text-white">БРЕНД</p>
      <h2 class="mb-4 font-cormorant text-5xl sm:text-6xl uppercase text-white">george gina & lucy</h2>
      <p class="max-w-xl text-center text-lg text-white px-4">
        Бренд засновано 2004 року недалеко від Франкфурта, коли подружжя Ніколь Бейлі і Ніколас Нойгаус разом з Олівером
        Брюном випустили свою першу і дуже вдалу колекцію сумок, кожна з яких мала своє ім'я.
      </p>
    </div>
  </div>
</template>

<script setup>
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
