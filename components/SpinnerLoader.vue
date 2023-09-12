<template>
  <div
    :class="sizes"
    class="flex justify-center">
    <img
      src="/loading.gif"
      alt="loading"
      class="h-full w-full" />
  </div>
</template>

<script setup>
defineProps({
  sizes: {
    type: String,
    required: true,
    default: "w-12 h-12",
  },
});
</script>
