<template>
  <div class="mx-auto flex max-w-4xl flex-col divide-y py-24">
    <input
      v-model="productName"
      type="text"
      placeholder="Назва" />
    <input
      v-model="productDescription"
      type="text"
      placeholder="Опис" />
    <input
      v-model="productnNewPrice"
      type="text"
      placeholder="Нова ціна" />
    <input
      v-model="productnOldPrice"
      type="text"
      placeholder="Стара ціна" />
    <input
      v-model="productSizes"
      type="text"
      placeholder="42, 46, 50" />
    <input
      v-model="productPopularity"
      type="text"
      placeholder="популярність" />
    <input
      v-model="productLabel"
      type="text"
      placeholder="лейбл" />

    <div>
      <button
        type="button"
        @click="open">
        Додати фото
      </button>
    </div>

    <div>
      <label for="category">Оберіть категорію</label>
      <select
        id="category"
        v-model="productCategory">
        <option
          v-for="category in categories"
          :key="category.id"
          :value="category.id">
          {{ category.name }}
        </option>
      </select>
    </div>
    <button
      @click="createProduct"
      class="rounded-md bg-slate-400 px-3 py-2 text-white transition-colors hover:bg-slate-500"
      type="button">
      Створити товар
    </button>
    <div class="flex flex-wrap gap-3 py-4">
      <img
        v-for="image in imagesUrl"
        @click="toStart(image)"
        :src="image"
        alt="thumbnail"
        class="h-20 w-20 object-contain cursor-pointer" />
    </div>
  </div>
</template>

<script setup>
const client = useSupabaseClient();
import { useFileDialog } from "@vueuse/core";

const imagesUrl = ref([]);
const { files, open, reset, onChange } = useFileDialog();
open({
  multiple: true,
});
// переробити на for...of 
onChange(files => {
  Object.values(files).forEach(async file => {
    const { error } = await client.storage.from("products_images").upload(file.name, file, {
      cacheControl: "3600",
      upsert: true,
    });

    console.log(error);
    const { data } = client.storage.from("products_images").getPublicUrl(file.name);
    imagesUrl.value.push(data.publicUrl);
  });
});

const { data: categories } = await client.from("categories").select("*");

const productName = ref("");
const productDescription = ref("");
const productnNewPrice = ref("");
const productnOldPrice = ref("");
const productCategory = ref("");
const productSizes = ref("");
const productPopularity = ref("");
const productLabel = ref("");

const createProduct = async () => {
  const newProduct = {
    name: productName.value,
    description: productDescription.value,
    newPrice: +productnNewPrice.value,
    oldPrice: +productnOldPrice.value,
    category: productCategory.value,
    sizes: productSizes.value,
    popularity: productPopularity.value,
    label: productLabel.value,
    image: imagesUrl.value,
  };
  const { error } = await client.from("products").insert(newProduct);
  console.log(error);
  if (!error) {
    alert("Додано!");
    productName.value = null;
    productDescription.value = null;
    productnNewPrice.value = null;
    productnOldPrice.value = null;
    productCategory.value = null;
    productSizes.value = null;
    productPopularity.value = null;
    productLabel.value = null;
    imagesUrl.value = [];
    reset();
  } else {
    alert("Помилка!");
  }
};


const toStart = (image) => {
  const index = imagesUrl.value.indexOf(image);
  if (index != -1) {
    imagesUrl.value.splice(index, 1);
  }
  imagesUrl.value.unshift(image);
}

</script>

<style lang="scss"></style>
