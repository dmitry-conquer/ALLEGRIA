<template>
  <div ref="trigger">
    <HeaderBurgerButton
      @toggle-menu="isOpen = !isOpen"
      :isOpen="isOpen" />
    <Transition name="menu" class="shadow-xl">
      <HeaderBurgerMenu @close-modal="isOpen = false" v-show="isOpen" :isOpen="isOpen" />
    </Transition>
  </div>
</template>

<script setup>
import { onClickOutside } from "@vueuse/core";
const trigger = ref(null);
const isOpen = ref(false);

onClickOutside(trigger, () => (isOpen.value = false));
</script>

<style lang="scss">
.menu-enter-active,
.menu-leave-active {
  transition: all 0.4s ease-in-out;
}

.menu-enter-from,
.menu-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>
