<template>
  <li>
    <NuxtLink
      :to="link"
      class="flex items-center gap-3 text-gray-500 py-3">
      <component
        :is="icon"
        class="h-6 w-6" />
      <span>{{ text }}</span>
    </NuxtLink>
  </li>
</template>

<script setup>
defineProps({
  icon: {
    type: Object,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
});
</script>
