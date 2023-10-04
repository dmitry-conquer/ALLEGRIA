<template>
  <div class="flex items-center">
    <NuxtImg
      v-for="(image, index) in images.slice(0, 4)"
      :key="index"
      format="webp"
      quality="10"
      width="50px"
      height="50px"
      :src="image"
      :alt="alt"
      :title="alt"
      class="-mx-1 h-7 w-7 rounded-full object-cover" />
    <div
      v-if="images.length > 4"
      class="-mx-1 h-7 w-7 place-content-center rounded-full bg-admin-primary text-white flex items-center">
      <span>+</span>
      <span>{{images.length - 4}}</span>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  images: {
    type: Object,
    required: true,
  },
  alt: {
    type: String,
    required: true,
  },
});
</script>
