<template>
  <button
    @click="emit('toggle-menu')"
    class="group relative">
    <div class="relative flex h-[50px] w-[50px] transform items-center justify-center overflow-hidden">
      <div
        id="burger-inner"
        :class="{ '[&>*:nth-child(-n+3)]:translate-x-10': isOpen }"
        class="flex h-[20px] w-[20px] origin-center transform flex-col justify-between overflow-hidden transition-all duration-300">
        <div class="h-[2px] w-7 origin-left transform bg-primary-dark transition-all duration-300"></div>
        <div class="h-[2px] w-7 transform rounded bg-primary-dark transition-all delay-75 duration-300"></div>
        <div class="h-[2px] w-7 origin-left transform bg-primary-dark transition-all delay-150 duration-300"></div>

        <div
          id="burger-cross"
          :class="{ ' w-12 translate-x-0  [&>*:nth-child(1)]:rotate-45 [&>*:nth-child(2)]:-rotate-45': isOpen }"
          class="absolute top-2.5 flex w-0 -translate-x-10 transform items-center justify-between transition-all duration-500">
          <div
            class="absolute h-[2px] w-5 rotate-0 transform bg-primary-dark transition-all delay-300 duration-500"></div>
          <div
            class="absolute h-[2px] w-5 -rotate-0 transform bg-primary-dark transition-all delay-300 duration-500"></div>
        </div>
      </div>
    </div>
  </button>
</template>

<script setup>
defineProps({
  isOpen: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const emit = defineEmits({
  "toggle-menu": null,
});
</script>

<style lang="scss"></style>
