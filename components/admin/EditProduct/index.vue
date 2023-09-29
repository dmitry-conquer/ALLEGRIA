<template>
  <div class="">
    <div class="flex gap-10">
      <div>
        <div class="mb-6 border-b pb-4">
          <h2 class="mb-2 text-2xl font-semibold leading-tight">{{ product.name }}</h2>
          <p class="text-sm text-gray-600">{{ product.description }}</p>
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
      <AdminEditProductImages :images="product.image" />
    </div>
    <div class="mt-10 flex h-11 items-center justify-center">
      <AdminPendingLoader v-if="pending" />
      <button
        v-else
        @click="onSaveProduct"
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
    required: true,
  },
  categories: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits({
  "close-product-details": null,
});

const client = useSupabaseClient();

const pending = ref(false);
const sizes = ref(props.product.sizes);
const newPrice = ref(props.product.newPrice);
const oldPrice = ref(props.product.oldPrice);
const label = ref(props.product.label);
const currentCategoryId = ref(props.product.category.id);

function onUpdateSizesList(newValue) {
  sizes.value = newValue;
}

async function onSaveProduct() {
  pending.value = true;
  const { data, error } = await client
    .from("products")
    .update({
      sizes: sizes.value,
      category: currentCategoryId.value,
      newPrice: newPrice.value,
      oldPrice: oldPrice.value,
      label: label.value,
    })
    .eq("id", props.product.id)
    .select();
  if (data) {
    console.log("ok");
    pending.value = false;
    refreshNuxtData();
    emit("close-product-details");
  }
  if (error) {
    console.error(error);
    pending.value = false;
  }
}
</script>
