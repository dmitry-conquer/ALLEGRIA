<template>
  <header class="fixed left-0 top-0 z-50 w-full bg-white">
    <div class="relative">
      <div class="container flex h-20 items-center lg:justify-between">
        <NuxtLink to="/">
          <Logo class="w-32 max-lg:mr-10 sm:h-6 sm:w-40" />
        </NuxtLink>
        <div
          class="group max-lg:mr-4"
          ref="trigger">
          <button
            @click="isOpen = !isOpen"
            class="uppercase tracking-widest transition-colors group-hover:text-secondary">
            <span class="hidden lg:block">КАТАЛОГ</span>
            <IconCatalog class="mt-2 h-6 w-6 lg:hidden" />
          </button>
          <Transition name="slide-top">
            <HeaderMenu v-show="isOpen" @close-menu="isOpen = false"/>
          </Transition>
        </div>
        <HeaderSearch class="max-lg:mr-auto" />
        <div>
          <div
            class="flex items-center justify-center gap-5 max-lg:mt-3 lg:ml-10"
            ref="el">
            <HeaderProfile />
            <HeaderFavorites />
            <HeaderCart />
          </div>
        </div>
        <HeaderBurger class="max-lg:ml-10 max-sm:m-0" />
      </div>
    </div>
  </header>
</template>

<script setup>
import { onClickOutside } from "@vueuse/core";

const el = ref(null);
const isOpen = ref(false);
const trigger = ref(null);

onClickOutside(trigger, () => (isOpen.value = false));
onMounted(() => {
  useDynamicTeleport(el.value, "alt-actions", 992, "last");
});
</script>
<style lang="scss">
.slide-top-enter-active,
.slide-top-leave-active {
  transition: all 0.4s ease-in-out;
}

.slide-top-enter-from,
.slide-top-leave-to {
  transform: translateY(-20px);
  opacity: 0;
  @media (max-width: (1024px)) {
    transform: translateX(-20px);
  }
}
</style>
