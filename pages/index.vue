<template>
  <div>
    <SectionHero class="mb-28" />
    <SectionNewarrival class="mb-28" />
    <SectionSlider
      class="mb-28"
      title="популярне" />
    <SectionAbout class="mb-28" />
  </div>
</template>

<script setup>
definePageMeta({
  pageTransition: {
    name: "page",
    mode: "out-in",
  },
});
</script>
