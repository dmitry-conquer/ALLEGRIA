<template>
  <button
    type="button"
    :class="buttonsStyle[buttonStyle]"
    class="transition-colors">
    <AdminIconClose
      v-if="buttonStyle === 'delete'"
      class="h-5 w-5 text-admin-danger-dark" />
    <span v-else>{{ text }}</span>
  </button>
</template>

<script setup>
defineProps({
  text: {
    type: String,
    required: false,
    default: "",
  },
  buttonStyle: {
    type: String,
    required: false,
    default: "default",
  },
});

const buttonsStyle = {
  default: "rounded-md px-7 py-3  bg-admin-primary text-white hover:bg-admin-primary/80",
  stroke:
    "rounded-md px-7 py-3  bg-white border-admin-primary border text-admin-primary hover:bg-admin-secondary-light",
  delete:
    "absolute -top-3 -right-3 grid h-7 w-7 place-content-center rounded-full bg-admin-danger-light hover:bg-admin-danger",
};
</script>
