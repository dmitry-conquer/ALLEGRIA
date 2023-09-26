<template>
  <div  class="absolute right-0 top-full min-h-screen w-full max-w-sm bg-white">
    <TransitionGroup
      tag="ul"
      name="menu"
      class="flex flex-col items-center justify-center gap-y-4 p-6">
      <li
        v-for="(item, i) in nav"
        :key="item.name"
        v-show="isOpen"
        :style="`transition-delay: ${i * 0.12}s`"
        class="text-3xl">
        <NuxtLink @click="emit('close-modal')" :to="item.link" class="hover:text-secondary transition-colors">{{ item.name }}</NuxtLink>
      </li>
    </TransitionGroup>
    <div id="alt-actions"></div>
  </div>
</template>

<script setup>
const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true,
    default: false,
  },
});
const emit = defineEmits({
  "close-modal": null
})

const nav = ref([
  {
    name: "Головна",
    link: "/",
  },
  {
    name: "Каталог",
    link: "/catalog",
  },
  {
    name: "Про нас",
    link: "/about",
  },
  {
    name: "Бренди",
    link: "/brands",
  },
]);
</script>

<style lang="scss">
.menu-enter-active,
.menu-leave-active {
  transition: all 0.3s ease-in-out;
}

.menu-enter-from,
.menu-leave-to {
  transform: translateX(30px);
  opacity: 0;
}

</style>
