<template>
  <div class="fixed inset-0 z-50 grid h-full w-full items-center bg-black/50 px-4">
    <div
      class="relative w-full max-w-xl mx-auto rounded-md bg-white p-6 overflow-auto"
      ref="trigger">
      <button
        @click="emit('close-modal')"
        type="button"
        class="absolute right-3 top-3">
        <IconClose class="h-7 w-7 stroke-primary-dark" />
      </button>
      <slot />
    </div>
  </div>
</template>

<script setup>
import { onClickOutside } from "@vueuse/core";
import { useFocusTrap } from '@vueuse/integrations/useFocusTrap'

const trigger = ref(null);

onClickOutside(trigger, () => emit("close-modal"));
useFocusTrap(trigger, { immediate: true })


const emit = defineEmits({
  "close-modal": null,
});
</script>
