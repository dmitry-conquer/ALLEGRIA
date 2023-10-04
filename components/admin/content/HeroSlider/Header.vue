<template>
  <div class="mb-4 flex items-center justify-between">
    <p class="text-2xl font-medium">Головний слайдер</p>
    <AdminBaseButton
      @click="isOpen = true"
      text="Додати" />
  </div>
  <Transition name="fade">
    <LazyAdminBaseModal
      v-if="isOpen"
      @close-modal="isOpen = false">
      <AdminContentHeroSliderCreateDialog @create-slide="onCreateSlide" />
    </LazyAdminBaseModal>
  </Transition>
</template>

<script setup>
const emit = defineEmits({
  "create-slide": value => typeof value === "object",
});
const isOpen = ref(false);

function onCreateSlide(slide) {
  emit("create-slide", slide);
  isOpen.value = false;
}
</script>
