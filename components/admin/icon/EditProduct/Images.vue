<template>
  <div class="grid shrink-0 auto-rows-[120px] grid-cols-3 gap-2">
    <div
      v-for="(image, index) in imagesURLs"
      class="group relative">
      <button
        @click="onRemoveImage(index)"
        class="absolute -right-2 -top-2 hidden h-6 w-6 place-content-center rounded-full bg-red-100/60 text-sm leading-none text-red-500 transition-colors hover:bg-red-100 disabled:opacity-30 group-hover:grid"
        type="button">
        <AdminIconClose class="h-4 w-4" />
      </button>
      <NuxtImg
        quality="100"
        format="webp"
        width="90px"
        height="120px"
        :key="index"
        :src="image"
        :alt="`product-image-${index}`"
        class="h-full w-full rounded-sm object-cover" />
    </div>
    <button
      @click="open"
      class="group grid h-[120px] w-[90px] place-content-center bg-admin-secondary transition-colors hover:bg-gray-200"
      type="button">
      <AdminIconAdd class="h-6 w-6 text-admin-text transition-colors group-hover:text-blue-500" />
    </button>
  </div>
</template>

<script setup>
import { useFileDialog } from "@vueuse/core";
const props = defineProps({
  images: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits({
  "update-files": value => typeof value === "object",
});

const { open, onChange } = useFileDialog();
const imagesURLs = ref([...props?.images] || []);

function onRemoveImage(index) {
  useAdminRemoveImage(imagesURLs.value, index);
  emit("update-files", imagesURLs.value);
}
onChange(async files => {
  await useAdminUploadFiles(imagesURLs.value, files);
  emit("update-files", imagesURLs.value);
});
</script>
