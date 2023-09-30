<template>
  <div>
    <button
      @click="isOpen = true"
      class="flex items-center gap-2 rounded-md bg-admin-brand px-3 py-2 text-white transition-colors hover:bg-admin-brand/80"
      type="button">
      <span class="font-medium">Додати товар</span>
      <AdminIconAdd class="h-4 w-4 stroke-[3]" />
    </button>
    <Transition name="fade">
      <AdminBaseModal
        @close-modal="isOpen = false"
        v-if="isOpen">
        <AdminCreateProduct
          @close-product-details="isOpen = false"
          :categories="categories" />
      </AdminBaseModal>
    </Transition>
  </div>
</template>

<script setup>
const props = defineProps({
  categories: {
    type: Array,
    required: true,
    default: [],
    validator: arr => arr.length > 0,
  },
});

const isOpen = ref(false);
</script>
