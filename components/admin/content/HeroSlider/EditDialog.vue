<template>
  <div class="flex flex-col gap-5">
    <AdminBaseTextInput
      v-model="slide.title"
      label="Текст слайду"
      placeholder="Вкажіть текст слайду" />
    <AdminBaseTextInput
      v-model="slide.link"
      label="Посилання"
      placeholder="Вкажіть посилання на сторінку" />
    <div
      v-if="slide.image"
      class="relative w-5/6 mx-auto">
      <NuxtImg
        :src="slide.image"
        format="webp"
        class="mx-auto h-52 w-full object-cover" />
      <AdminBaseButton
        @click="slide.image = null"
        button-style="delete" />
    </div>
    <AdminActionsUploadImage
      v-else
      @upload-image="slide.image = $event" />
    <AdminBaseButton
      @click="updateSlides"
      text="Оновити"
      class="self-center"
      button-style="default" />
  </div>
</template>

<script setup>
const props = defineProps({
  currentSlide: {
    type: Object,
    required: false,
    default: {},
    validator: obj => Object.keys(obj).length > 0,
  },
});
const emit = defineEmits({
  "update-slides": value => typeof value === "object",
});

const slide = ref({ ...props.currentSlide });

async function updateSlides() {
  if (Object.values(slide.value).some(el => el === "" || el === null || el === undefined)) {
    console.log("error");
    return;
  }
  emit("update-slides", slide.value);
}
</script>
