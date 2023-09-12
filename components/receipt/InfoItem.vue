<template>
  <li class="flex items-center gap-4">
    <component
      :is="item.icon"
      class="h-6 w-6 shrink-0" />
    <span class="font-medium">{{ item.text }}</span>
  </li>
</template>

<script setup>
defineProps({
  item: {
    type: Object,
    required: true,
    default: {},
  },
});
</script>

<style lang="scss"></style>
