<template>
  <div class="fixed inset-0 z-50 grid h-full w-full items-center overflow-hidden bg-black/50 px-4">
    <div
      :class="sizes[size]"
      class="relative mx-auto max-h-[90%] w-full overflow-auto rounded-md bg-white p-10"
      ref="trigger">
      <button
        @click="emit('close-modal'), bodyLock()"
        type="button"
        class="group absolute right-2 top-2 rounded-lg p-1 transition-colors hover:bg-gray-200">
        <AdminIconClose class="h-7 w-7 text-admin-text" />
      </button>
      <slot />
    </div>
  </div>
</template>

<script setup>
import { onClickOutside } from "@vueuse/core";
import { useFocusTrap } from "@vueuse/integrations/useFocusTrap";
defineProps({
  size: {
    type: String,
    required: false,
    default: "sm",
    validator: string => string.length > 0,
  },
});

const trigger = ref(null);

onClickOutside(trigger, () => {
  emit("close-modal");
  bodyLock();
});
useFocusTrap(trigger, { immediate: true });

const emit = defineEmits({
  "close-modal": null,
});

const sizes = {
  sm: "max-w-xl",
  md: "max-w-2xl",
  lg: "max-w-4xl",
};
</script>
