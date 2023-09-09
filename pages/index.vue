<template>
  <SectionHero class="mb-28" />
  <div class="flex justify-center border">{{ result }}</div>
  <SectionNewarrival class="mb-28" />
  <SectionSlider
    class="mb-28"
    title="популярне" />
  <SectionAbout class="mb-28" />
</template>

<script setup>
const { data: result } = await useFetch("/api/result/");
</script>
