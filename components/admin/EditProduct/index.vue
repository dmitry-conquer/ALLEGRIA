<template>
  <div class="">
    <div class="flex gap-10">
      <div>
        <div class="mb-6 border-b pb-4">
          <input
            type="text"
            v-model="name"
            class="mb-2 w-fit rounded-md border border-gray-200 px-2 py-1 text-2xl font-semibold leading-tight transition-colors focus:border-admin-brand focus:outline-none" />
          <input
            type="text"
            v-model="description"
            class="rounded-md border border-gray-200 px-2 py-1 text-sm text-gray-600 transition-colors focus:border-admin-brand focus:outline-none" />
        </div>
        <div class="mb-6 flex gap-4">
          <label class="flex flex-col gap-1.5">
            <span class="text-sm text-gray-600">Ціна</span>
            <input
              v-model="oldPrice"
              type="text"
              class="w-32 rounded-md border border-gray-200 px-2 py-2 text-sm transition-colors focus:border-admin-brand focus:outline-none" />
          </label>
          <label class="flex flex-col gap-1.5">
            <span class="text-sm text-gray-600">Акційна ціна</span>
            <input
              v-model="newPrice"
              type="text"
              class="w-32 rounded-md border border-gray-200 px-2 py-2 text-sm transition-colors focus:border-admin-brand focus:outline-none" />
          </label>
          <label class="flex flex-col gap-1.5">
            <span class="text-sm text-gray-600">Лейбл</span>
            <input
              v-model="label"
              type="text"
              class="w-32 rounded-md border border-gray-200 px-2 py-2 text-sm transition-colors focus:border-admin-brand focus:outline-none" />
          </label>
        </div>
        <AdminEditProductCategories
          v-model:current-category-id="currentCategoryId"
          :categories="categories"
          class="mb-4" />
        <AdminEditProductSizes
          :sizes="sizes"
          @on-update-list="onUpdateSizesList" />
      </div>
      <AdminEditProductImages
        :images="images"
        @update-files="onUpdateFiles" />
    </div>
    <div class="mt-10 flex h-11 items-center justify-center">
      <AdminPendingLoader v-if="pending" />
      <button
        v-else
        @click="onUpdateProduct"
        type="button"
        class="rounded-md bg-admin-brand px-3 py-2 text-white transition-colors hover:bg-admin-brand/80">
        Зберегти
      </button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  product: {
    type: Object,
    required: false,
  },
  categories: {
    type: Object,
    required: false,
  },
});

const emit = defineEmits({
  "close-product-details": null,
});

const pending = ref(false);
const name = ref(props?.product?.name);
const description = ref(props?.product?.description);
const sizes = ref([...props?.product?.sizes]);
const newPrice = ref(props?.product?.newPrice);
const oldPrice = ref(props?.product?.oldPrice);
const label = ref(props?.product?.label);
const currentCategoryId = ref(props?.product?.category.id);
const images = ref([...props?.product?.image]);

function onUpdateSizesList(newValue) {
  sizes.value = newValue;
}
function onUpdateFiles(newValue) {
  images.value = newValue;
}

async function onUpdateProduct() {
  pending.value = true;
  const updatedProduct = {
    name: name.value,
    description: description.value,
    sizes: sizes.value,
    category: currentCategoryId.value,
    newPrice: newPrice.value,
    oldPrice: oldPrice.value,
    label: label.value,
    image: images.value,
  };
  const result = await updateProduct(updatedProduct, props.product.id);
  if (result) {
    emit("close-product-details");
  }
  pending.value = false;
}
</script>
