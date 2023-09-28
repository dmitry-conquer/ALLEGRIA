<template>
  <div>
    <SectionHero class="mb-14 md:mb-28" />
    <SectionNewarrival class="mb-14 md:mb-28" />
    <SectionSlider
      class="mb-14 md:mb-28"
      title="популярне" />
    <GoogleMap/>
    <SectionAbout class="mb-14 md:mb-28" />
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
