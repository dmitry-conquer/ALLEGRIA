<template>
  <div class="fixed inset-0 z-50 grid h-full w-full items-center bg-black/50 px-4">
    <div
      class="relative mx-auto w-full max-w-4xl overflow-auto rounded-md bg-white p-10"
      ref="trigger">
      <button
        @click="emit('close-modal')"
        type="button"
        class="group absolute right-2 top-2 rounded-lg p-1 transition-colors hover:bg-gray-200">
        <AdminIconClose class="h-7 w-7 text-gray-600" />
      </button>
      <slot />
    </div>
  </div>
</template>

<script setup>
import { onClickOutside } from "@vueuse/core";
import { useFocusTrap } from "@vueuse/integrations/useFocusTrap";

const trigger = ref(null);

onClickOutside(trigger, () => emit("close-modal"));
useFocusTrap(trigger, { immediate: true });

const emit = defineEmits({
  "close-modal": null,
});
</script>
