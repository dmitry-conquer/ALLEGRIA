<template>
  <SectionHero class="mb-28" />
  <SectionNewarrival class="mb-28" />
  <SectionSlider
    class="mb-28"
    title="популярне" />
  <SectionAbout class="mb-28" />
  {{paymentResult}}
</template>

<script setup>
const paymentResult = ref(null);
onMounted(() => {
  const formData = new FormData(document.forms[0]);
  paymentResult.value = formData;
});
</script>
