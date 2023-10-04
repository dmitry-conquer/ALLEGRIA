<template>
  <div>
    <div class="shadow-md">
      <div class="w-full overflow-auto rounded-md rounded-b-none border border-gray-200">
        <table class="min-w-full">
          <thead class="border-b border-gray-200 bg-admin-secondary-light">
            <tr>
              <th class="max-w-xs truncate p-4 text-left text-sm font-normal text-admin-text-light">ID</th>
              <th class="whitespace-nowrap p-4 text-left text-sm font-normal text-admin-text-light">Дата замовлення</th>
              <th class="whitespace-nowrap p-4 text-left text-sm font-normal text-admin-text-light">Замовник</th>
              <th class="whitespace-nowrap p-4 text-left text-sm font-normal text-admin-text-light">Ціна</th>
              <th class="whitespace-nowrap p-4 text-left text-sm font-normal text-admin-text-light">Статус</th>
              <th class="whitespace-nowrap p-4 text-left text-sm font-normal text-admin-text-light">Спосіб оплати</th>
              <th class="whitespace-nowrap p-4 text-left text-sm font-normal text-admin-text-light">Налаштування</th>
            </tr>
          </thead>
          <tbody class="divide-y bg-white">
            <tr
              v-for="order in orders"
              :key="order.order_id">
              <td class="max-w-xs truncate p-4 text-sm text-admin-text">{{ order.order_id }}</td>
              <td class="whitespace-nowrap p-4 text-sm text-admin-text">
                {{ useDataFormater(order.created_at) }}
              </td>
              <td class="whitespace-nowrap p-4 text-sm text-admin-text">
                {{ order.user_id.last_name }} {{ order.user_id.first_name }}
              </td>
              <td class="whitespace-nowrap p-4 text-sm text-admin-text">{{ order.amount }}</td>
             
              <td class="whitespace-nowrap p-4 text-sm text-admin-text inline-block">
                <AdminTableOrdersOrderStatus :status="order.status" />
              </td>
              <td class="whitespace-nowrap p-4 text-sm text-admin-text">
                <AdminTableOrdersPayment :payment="order.payment" />
              </td>
              <td class="whitespace-nowrap p-4 text-sm text-admin-text">
                <AdminTableOrdersActions @open-orders-details="onOpenOrderDetails(order)" />
              </td>
            </tr>
          </tbody>
        </table>
        <Transition name="fade">
          <LazyAdminBaseModal
            @close-modal="currentOrder = null"
            v-if="currentOrder">
            <AdminOrderInfo
              :order="currentOrder" />
          </LazyAdminBaseModal>
        </Transition>
      </div>
      <AdminTableFooter
        text="Замовлень на сторінці"
        table="orders"
        :range="[from, to]" />
    </div>
  </div>
</template>

<script setup>
const { TABLE_ITEM_PER_PAGE } = constants();
const route = useRoute();

const client = useSupabaseClient();
const currentOrder = ref(null);

const itemsPerPage = computed(() => route.query.perPage || TABLE_ITEM_PER_PAGE);
const page = computed(() => route.query.page || 1);
const from = computed(() => itemsPerPage.value * page.value - itemsPerPage.value);
const to = computed(() => itemsPerPage.value * page.value - 1);
const { data: orders } = await useAsyncData(
  "orders",
  async () => {
    const { data } = await client.from("orders").select("*, user_id(*)").range(from.value, to.value);
    return data;
  },
  {
    lazy: true,
    watch: [itemsPerPage, page],
  },
);
console.log(orders.value);

function onOpenOrderDetails(order) {
  currentOrder.value = order;
}
</script>
