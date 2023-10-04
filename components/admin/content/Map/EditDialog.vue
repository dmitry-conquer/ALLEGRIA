<template>
  <div class="flex flex-col gap-6">
    <p class="text-2xl font-medium text-admin-text-dark">Налаштування маркеру</p>
    <div class="flex flex-col gap-4">
      <AdminBaseTextInput
        v-model="updatedMarker.data.name"
        label="Назва маркеру"
        placeholder="Назва маркеру" />
      <AdminBaseTextInput
        v-model="updatedMarker.description"
        label="Короткий опис маркеру"
        placeholder="Короткий опис маркеру" />
      <AdminBaseTextInput
        v-model="updatedMarker.data.description"
        field-type="textarea"
        label="Повний опис маркеру"
        placeholder="Повний опис маркеру" />
      <AdminBaseTextInput
        v-model="updatedMarker.data.workTime"
        label="Робочий час"
        placeholder="Робочи час" />
      <div class="flex gap-4">
        <AdminBaseTextInput
          class="w-1/2"
          v-model="updatedMarker.position.lat"
          label="Перша координата"
          placeholder="Перша координата" />
        <AdminBaseTextInput
          class="w-1/2"
          v-model="updatedMarker.position.lng"
          label="Друга кордината"
          placeholder="Друга кордината" />
      </div>
      <AdminBaseTextInput
        v-model="updatedMarker.data.rate"
        label="Рейтинг"
        placeholder="Рейтинг" />
    </div>
    <div class="flex justify-center">
      <AdminBaseButton
        @click="updateMarker"
        button-style="default"
        text="Оновити" />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  marker: {
    type: Object,
    required: false,
    default: {},
    validator: obj => Object.keys(obj).length > 0,
  },
});

const emit = defineEmits({
  "update-markers": value => Object.values(value).every(Boolean),
});

const updatedMarker = ref(structuredClone(toRaw(props.marker)));

function updateMarker() {
  if (!Object.values(updatedMarker.value).every(Boolean)) {
    console.log("error");
    return;
  }
  emit("update-markers", updatedMarker.value);
  bodyLock()
}
</script>
