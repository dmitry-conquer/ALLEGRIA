<template>
  <div>
    <AdminTableProductsHeader
      class="mb-8"
      :categories="categories" />
    <div class="shadow-md">
      <div class="w-full overflow-auto rounded-md rounded-b-none border border-gray-200">
        <table class="min-w-full">
          <thead class="border-b border-gray-200 bg-admin-secondary-light">
            <tr>
              <th class="whitespace-nowrap p-4 text-left text-sm font-normal text-admin-text-light">ID</th>
              <th class="whitespace-nowrap p-4 text-left text-sm font-normal text-admin-text-light">Назва</th>
              <th class="whitespace-nowrap p-4 text-left text-sm font-normal text-admin-text-light">Категорія</th>
              <th class="whitespace-nowrap p-4 text-left text-sm font-normal text-admin-text-light">Дата створення</th>
              <th class="whitespace-nowrap p-4 text-left text-sm font-normal text-admin-text-light">Ціна</th>
              <th class="whitespace-nowrap p-4 text-left text-sm font-normal text-admin-text-light">Акційна ціна</th>
              <th class="whitespace-nowrap p-4 text-left text-sm font-normal text-admin-text-light">Лейбл</th>
              <th class="whitespace-nowrap p-4 text-left text-sm font-normal text-admin-text-light">Зображення</th>
              <th class="whitespace-nowrap p-4 text-left text-sm font-normal text-admin-text-light">Налаштування</th>
            </tr>
          </thead>
          <tbody class="divide-y bg-white">
            <tr
              v-for="product in products"
              :key="product.id">
              <td class="whitespace-nowrap p-4 text-sm text-admin-text">{{ product.id }}</td>
              <td class="whitespace-nowrap p-4 text-sm text-admin-text">{{ product.name }}</td>
              <td class="whitespace-nowrap p-4 text-sm text-admin-text">{{ product.category.name }}</td>
              <td class="whitespace-nowrap p-4 text-sm text-admin-text">
                {{ useDataFormater(product.created_at) }}
              </td>
              <td class="whitespace-nowrap p-4 text-sm text-admin-text">{{ product.newPrice }}</td>
              <td class="whitespace-nowrap p-4 text-sm text-admin-text">{{ product.oldPrice }}</td>
              <td class="whitespace-nowrap p-4 text-sm text-admin-text">{{ product.label || "-" }}</td>
              <td class="whitespace-nowrap p-4 text-sm text-admin-text">
                <AdminTableProductsImages
                  :images="product.image"
                  :alt="product.name" />
              </td>
              <td class="whitespace-nowrap p-4 text-sm text-admin-text">
                <AdminTableProductsActions
                  @delete-product="onDeleteProduct(product.id)"
                  @open-product-details="onOpenProductDetails(product)"
                  :deletePending="deletePending" />
              </td>
            </tr>
          </tbody>
        </table>
        <Transition name="fade">
          <LazyAdminBaseModal
            @close-modal="currentProduct = null"
            v-if="currentProduct">
            <AdminEditProduct
              @close-product-details="currentProduct = null"
              :product="currentProduct"
              :categories="categories" />
          </LazyAdminBaseModal>
        </Transition>
      </div>
      <AdminTableFooter text="Товарів на сторінці" table="products" :range="[from, to]" />
    </div>
  </div>
</template>

<script setup>
const { TABLE_ITEM_PER_PAGE } = constants();
const route = useRoute();

const client = useSupabaseClient();
const currentProduct = ref(null);
const deletePending = ref(false);

const itemsPerPage = computed(() => route.query.perPage || TABLE_ITEM_PER_PAGE);
const page = computed(() => route.query.page || 1);
const from = computed(() => itemsPerPage.value * page.value - itemsPerPage.value);
const to = computed(() => itemsPerPage.value * page.value - 1);
const { data: products } = await useAsyncData(
  "products",
  async () => {
    const { data } = await client.from("products").select("*, category(*)").range(from.value, to.value);
    return data;
  },
  {
    lazy: true,
    watch: [itemsPerPage, page],
  },
);


const { data: categories } = await useAsyncData("categories", async () => {
  const { data } = await client.from("categories").select("*");
  return data;
});

function onOpenProductDetails(product) {
  currentProduct.value = product;
}

async function onDeleteProduct(id) {
  deletePending.value = true;
  const result = await useAdminDeleteProduct(id);
  if (result) {
    refreshNuxtData();
  }
  deletePending.value = false;
}
</script>
