<template>
  <div class="pt-4">
    <div class="flex gap-10">
      <div>
        <div class="mb-10 space-y-3">
          <div>
            <p class="mb-1.5 text-sm text-admin-text">Назва товару</p>
            <input
              type="text"
              v-model="name"
              class="mb-2 w-full rounded-md border border-gray-200 px-2 py-1 text-2xl font-semibold leading-tight transition-colors focus:border-admin-primary focus:outline-none" />
          </div>
          <div>
            <p class="mb-1.5 text-sm text-admin-text">Опис товару</p>
            <textarea
              v-model="description"
              class="h-20 w-full resize-none rounded-md border border-gray-200 px-2 py-1 text-sm text-admin-text transition-colors focus:border-admin-primary focus:outline-none"></textarea>
          </div>
        </div>
        <div class="mb-6 flex gap-4">
          <label class="flex flex-col gap-1.5">
            <span class="text-sm text-admin-text">Ціна</span>
            <input
              v-model="oldPrice"
              type="text"
              class="w-32 rounded-md border border-gray-200 px-2 py-2 text-sm transition-colors focus:border-admin-primary focus:outline-none" />
          </label>
          <label class="flex flex-col gap-1.5">
            <span class="text-sm text-admin-text">Акційна ціна</span>
            <input
              v-model="newPrice"
              type="text"
              class="w-32 rounded-md border border-gray-200 px-2 py-2 text-sm transition-colors focus:border-admin-primary focus:outline-none" />
          </label>
          <label class="flex flex-col gap-1.5">
            <span class="text-sm text-admin-text">Лейбл</span>
            <input
              v-model="label"
              type="text"
              class="w-32 rounded-md border border-gray-200 px-2 py-2 text-sm transition-colors focus:border-admin-primary focus:outline-none" />
          </label>
        </div>
        <AdminCreateProductCategories
          v-model:current-category-id="currentCategoryId"
          :categories="categories"
          class="mb-6" />
        <AdminCreateProductSizes
          @on-update-list="updateSizesList"
          :sizes="sizes" />
      </div>
      <AdminCreateProductImages
        @update-files="onUpdateFiles"
        :images="images" />
    </div>
    <div class="mt-10 flex h-11 items-center justify-center">
      <AdminPendingLoader v-if="pending" />
      <button
        v-else
        @click="createProduct"
        type="button"
        class="rounded-md bg-admin-primary px-3 py-2 text-white transition-colors hover:bg-admin-primary/80">
        Зберегти
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  categories: {
    type: Array,
    required: true,
    default: [],
    validator: arr => arr.length > 0,
  },
});

const emit = defineEmits({
  "close-product-details": null,
});

const pending = ref(false);
const name = ref("");
const description = ref("");
const sizes = ref([]);
const newPrice = ref("");
const oldPrice = ref("");
const label = ref("");
const currentCategoryId = ref("placeholder");
const images = ref([]);

function updateSizesList(newValue) {
  sizes.value = newValue;
}
function onUpdateFiles(newValue) {
  images.value = newValue;
}

async function createProduct() {
  pending.value = true;
  const product = {
    name: name.value,
    description: description.value,
    sizes: sizes.value,
    newPrice: newPrice.value,
    oldPrice: oldPrice.value,
    label: label.value,
    category: currentCategoryId.value,
    image: images.value,
  };
  const result = await useAdminCreateProduct(product);
  if (result) {
    refreshNuxtData();
    emit("close-product-details");
  }
  pending.value = false;
}
</script>
