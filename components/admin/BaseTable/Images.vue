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
      :alt="title"
      :title="title"
      class="-mx-1 h-7 w-7 rounded-full object-cover" />
    <div
      v-if="images.length > 4"
      class="-mx-1 flex h-7 w-7 place-content-center items-center rounded-full bg-admin-primary text-white">
      <span>+</span>
      <span>{{ images.length - 4 }}</span>
    </div>
  </div>
</template>

<script setup>
defineProps({
  images: {
    type: Array,
    required: true,
    default: [],
    validator: arr => arr.length > 0,
  },
  title: {
    type: String,
    required: true,
    default: "",
    validator: string => string.length > 0,
  },
});
</script>
