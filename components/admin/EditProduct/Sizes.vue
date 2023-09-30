<template>
  <div class="flex items-center gap-2">
    <ul class="flex gap-2">
      <li
        v-for="(size, index) in refSizes"
        :key="size"
        class="group relative grid h-8 w-8 place-content-center rounded-md border text-sm leading-none text-gray-600">
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
        class="group grid h-8 w-8 place-content-center rounded-md bg-admin-bg text-sm leading-none text-gray-600 transition-colors hover:bg-gray-200"
        type="button">
        <AdminIconAdd class="h-4 w-4 text-gray-600 transition-colors group-hover:text-blue-500" />
      </button>
      <form
        @submit.prevent="onAddItemList"
        v-if="isEditable"
        class="flex items-center gap-2 rounded-md">
        <input
          ref="inputField"
          v-model="newSize"
          type="text"
          class="w-20 rounded-md bg-admin-bg p-1 focus:outline-none" />
        <div class="flex gap-1">
          <button
            :disabled="newSize.length <= 0"
            class="group grid h-7 w-7 place-content-center rounded-md bg-emerald-100/60 text-sm leading-none text-emerald-500 transition-colors hover:bg-emerald-100 disabled:opacity-30"
            type="submit">
            <AdminIconCheck class="h-5 w-5" />
          </button>
          <button
            @click="isEditable = false"
            class="group grid h-7 w-7 place-content-center rounded-md bg-red-100/60 text-sm leading-none text-red-500 transition-colors hover:bg-red-100"
            type="button">
            <AdminIconClose class="h-5 w-5" />
          </button>
        </div>
      </form>
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
const refSizes = ref(props.sizes);
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
