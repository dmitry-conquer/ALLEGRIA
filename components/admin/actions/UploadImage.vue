<template>
  <AdminBaseButton
    @click="onOpenImage"
    button-style="stroke"
    text="Обрати зображення..." />
</template>

<script setup>
import { useFileDialog } from "@vueuse/core";

const emit = defineEmits({
  "upload-image": value => typeof value === "string" || typeof value === "object",
});
const { open, onChange } = useFileDialog();

function onOpenImage() {
  open({
    multiple: false,
    accept: ["image/*"],
  });
}

onChange(async files => {
  const imageUrl = await useAdminUploadImages(files[0]);
  if (imageUrl) {
    emit("upload-image", imageUrl);
  }
});
</script>
