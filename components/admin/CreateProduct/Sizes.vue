<template>
  <div>
    <p class="mb-1.5 text-sm text-admin-text">Розміри</p>
    <div class="flex items-center gap-2">
      <ul class="flex gap-2">
        <li
          v-for="(size, index) in refSizes"
          :key="size"
          class="group relative grid h-8 w-8 place-content-center rounded-md border text-sm leading-none text-admin-text">
          <span>{{ size }}</span>
          <button
            @click="onRemoveItemList(index)"
            class="absolute -right-1 -top-1 hidden h-4 w-4 place-content-center rounded-full bg-red-100/60 text-sm leading-none text-red-500 transition-colors hover:bg-red-100 disabled:opacity-30 group-hover:grid"
            type="button">
            <AdminIconClose class="h-3 w-3" />
          </button>
        </li>
      </ul>
      <div class="flex items-center">
        <button
          v-if="!isEditable"
          @click="openInput"
          class="group grid h-8 w-8 place-content-center rounded-md bg-admin-secondary text-sm leading-none text-admin-text transition-colors hover:bg-gray-200"
          type="button">
          <AdminIconAdd class="h-4 w-4 text-admin-text transition-colors group-hover:text-blue-500" />
        </button>
        <form
          @submit.prevent="onAddItemList"
          v-if="isEditable"
          class="flex items-center gap-2 rounded-md">
          <input
            ref="inputField"
            v-model="newSize"
            type="text"
            class="w-20 rounded-md bg-admin-secondary p-1 focus:outline-none" />
          <div class="flex gap-1">
            <button
              :disabled="newSize.length <= 0"
              class="bg-admin-success-light text-admin-success-dark hover:bg-admin-success group grid h-7 w-7 place-content-center rounded-md text-sm leading-none transition-colors disabled:opacity-30"
              type="submit">
              <AdminIconCheck class="h-5 w-5" />
            </button>
            <button
              @click="isEditable = false"
              class="bg-admin-danger-light text-admin-danger-dark hover:bg-admin-danger group grid h-7 w-7 place-content-center rounded-md text-sm leading-none transition-colors"
              type="button">
              <AdminIconClose class="h-5 w-5" />
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  sizes: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits({
  "on-update-list": value => value.length > 0,
});

const newSize = ref("");
const isEditable = ref(false);
const refSizes = ref([...props.sizes]);
const inputField = ref(null);

function onAddItemList() {
  refSizes.value.push(newSize.value);
  emit("on-update-list", refSizes.value);
  newSize.value = "";
  isEditable.value = false;
}

function openInput() {
  isEditable.value = true;
  nextTick(() => {
    inputField.value.focus();
  });
}

function onRemoveItemList(index) {
  refSizes.value.splice(index, 1);
  emit("on-update-list", refSizes.value);
}
</script>
