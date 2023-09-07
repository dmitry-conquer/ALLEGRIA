<template>
  <SectionHero class="mb-28" />
  <SectionNewarrival class="mb-28" />
  <SectionSlider
    class="mb-28"
    title="популярне" />
  <SectionAbout class="mb-28" />
  {{ res }}
</template>

<script setup>
const { data: res } = await useFetch("/api/result");
setTimeout(() => {
  console.log(res.value);
}, 3000);
</script>
