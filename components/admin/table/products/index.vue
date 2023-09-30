<template>
  <AdminTableProductsHeader class="mb-8" :categories="categories"/>
  <div class="w-full overflow-auto border border-gray-200 md:rounded-lg">
    <table class="min-w-full">
      <thead class="border-b border-gray-200 bg-gray-50">
        <tr>
          <th class="whitespace-nowrap p-4 text-left text-sm font-normal text-gray-400">ID</th>
          <th class="whitespace-nowrap p-4 text-left text-sm font-normal text-gray-400">Назва</th>
          <th class="whitespace-nowrap p-4 text-left text-sm font-normal text-gray-400">Категорія</th>
          <th class="whitespace-nowrap p-4 text-left text-sm font-normal text-gray-400">Дата створення</th>
          <th class="whitespace-nowrap p-4 text-left text-sm font-normal text-gray-400">Ціна</th>
          <th class="whitespace-nowrap p-4 text-left text-sm font-normal text-gray-400">Акційна ціна</th>
          <th class="whitespace-nowrap p-4 text-left text-sm font-normal text-gray-400">Лейбл</th>
          <th class="whitespace-nowrap p-4 text-left text-sm font-normal text-gray-400">Зображення</th>
          <th class="whitespace-nowrap p-4 text-left text-sm font-normal text-gray-400">Налаштування</th>
        </tr>
      </thead>
      <tbody class="divide-y bg-white">
        <tr
          v-for="product in products"
          :key="product.id">
          <td class="whitespace-nowrap p-4 text-sm text-gray-600">{{ product.id }}</td>
          <td class="whitespace-nowrap p-4 text-sm text-gray-600">{{ product.name }}</td>
          <td class="whitespace-nowrap p-4 text-sm text-gray-600">{{ product.category.name }}</td>
          <td class="whitespace-nowrap p-4 text-sm text-gray-600">
            <AdminTableProductsDate :date-string="product.created_at" />
          </td>
          <td class="whitespace-nowrap p-4 text-sm text-gray-600">{{ product.newPrice }}</td>
          <td class="whitespace-nowrap p-4 text-sm text-gray-600">{{ product.oldPrice }}</td>
          <td class="whitespace-nowrap p-4 text-sm text-gray-600">{{ product.label || "-" }}</td>
          <td class="whitespace-nowrap p-4 text-sm text-gray-600">
            <AdminTableProductsImages
              :images="product.image"
              :alt="product.name" />
           
          </td>
          <td class="whitespace-nowrap p-4 text-sm text-gray-600">
            <AdminTableProductsActions @open-product-details="onOpenProductDetails(product)" />
          </td>
        </tr>
      </tbody>
    </table>
    <Transition name="fade">
      <AdminBaseModal
        @close-modal="currentProduct = null"
        v-if="currentProduct">
        <AdminEditProduct
        @close-product-details="currentProduct = null"
          :product="currentProduct"
          :categories="categories" />
      </AdminBaseModal>
    </Transition>
  </div>
</template>

<script setup>
const client = useSupabaseClient();
const currentProduct = ref(null);

const { data: products } = await useFetch("/api/products", {
  lazy: true,
});
const { data: categories } = await client.from("categories").select("*");

function onOpenProductDetails(product) {
  currentProduct.value = product;
}
</script>
