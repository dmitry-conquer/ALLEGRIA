<template>
  <h1 class="text-3xl font-bold text-admin-brand mb-8">{{ title }}</h1>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
});
</script>
