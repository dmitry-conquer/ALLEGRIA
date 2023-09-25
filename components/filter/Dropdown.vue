<template>
  <div
    class="relative"
    ref="trigger">
    <button
      @click="isOpen = !isOpen"
      class="block h-full w-60 border px-4 py-2"
      type="button">
      {{ text }}
    </button>
    <Transition name="dropdown">
      <div
        v-if="isOpen"
        class="absolute left-0 top-full z-30 w-full border-x border-b bg-white px-2 py-2">
        <slot></slot>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { onClickOutside } from "@vueuse/core";

const trigger = ref(null);
onClickOutside(trigger, event => (isOpen.value = false));
defineProps({
  text: {
    type: String,
    default: "Сортувати",
    required: true,
  },
});

const isOpen = ref(false);
</script>

<style lang="scss">
.dropdown-enter-active {
  transition: all 0.1s ease-in;
}
.dropdown-leave-active {
  transition: all 0.1s ease-in;
}
.dropdown-enter-from,
.dropdown-leave-to {
  transform: translateY(-5px);
  opacity: 0;
}
</style>
