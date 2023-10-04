<template>
  <div>
    <p class="mb-4 text-2xl font-medium">Секція "New Arrival"</p>
    <div class="rounded-md bg-white shadow-md p-4">
      <div class="flex gap-8">
        <div class="flex w-1/2 flex-col gap-4">
          <AdminBaseTextInput
            v-model="sectionData.left_block.title"
            label="Заголовок лівого блоку"
            placeholder="Заголовок лівого блоку" />
          <AdminBaseTextInput
            v-model="sectionData.left_block.link"
            label="Посилання лівого блоку"
            placeholder="Посилання лівого блоку" />
          <div class="relative self-center">
            <div v-if="sectionData.left_block.image">
              <AdminBaseButton
                @click="sectionData.left_block.image = null"
                button-style="delete" />
              <NuxtImg
                :src="sectionData.left_block.image"
                placeholder
                format="webp"
                quality="80"
                width="200"
                height="200"
                class="h-52 w-52 object-cover" />
            </div>
            <AdminActionsUploadImage
              v-else
              @upload-image="sectionData.left_block.image = $event" />
          </div>
        </div>
        <div class="flex w-1/2 flex-col gap-4">
          <AdminBaseTextInput
            v-model="sectionData.right_block.title"
            label="Заголовок правого блоку"
            placeholder="Заголовок правого блоку" />
          <div class="relative self-center">
            <div v-if="sectionData.right_block.image">
              <AdminBaseButton
                @click="sectionData.right_block.image = null"
                button-style="delete" />
              <NuxtImg
                :src="sectionData.right_block.image"
                placeholder
                format="webp"
                quality="80"
                width="200"
                height="200"
                class="h-52 w-52 object-cover" />
            </div>
            <AdminActionsUploadImage
              v-else
              @upload-image="sectionData.right_block.image = $event" />
          </div>
        </div>
      </div>
      <div class="mt-8 flex justify-center">
        <AdminBaseButton
          @click="onUpdate"
          button-style="default"
          text="Оновити" />
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  sectionData: {
    type: Object,
    required: true,
    default: {},
    validator: obj => Object.keys(obj).length > 0,
  },
});

const sectionData = ref(structuredClone(toRaw(props.sectionData)));
async function onUpdate() {
  const result = await useAdminUpdateTable(
    "home_page",
    { section_content: sectionData.value },
    "section_name",
    "new_arrival",
  );
  if (result) {
    refreshNuxtData();
  }
}
</script>
