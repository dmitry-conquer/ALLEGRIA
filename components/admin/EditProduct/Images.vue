<template>
  <div class="grid grid-cols-3 auto-rows-[120px] gap-2 shrink-0">
    <NuxtImg
      v-for="(image, index) in images"
      quality="100"
      format="webp"
      width="90px"
      height="120px"
      :key="index"
      :src="image"
      :alt="`product-image-${index}`"
      class="object-cover rounded-sm w-full h-full" />
    <button
      class="group grid h-[120px] w-[90px] place-content-center bg-admin-bg transition-colors hover:bg-gray-200"
      type="button">
      <AdminIconAdd class="h-6 w-6 text-gray-600 transition-colors group-hover:text-blue-500" />
    </button>
  </div>
</template>

<script setup>
defineProps({
  images: {
    type: Object,
    required: true,
  },
});
</script>
