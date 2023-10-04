<template>
  <div class="space-y-4">
    <div>
      <p class="mb-1 text-sm text-admin-text-light">ID замовлення:</p>
      <p class="">{{ order.order_id }}</p>
    </div>
    <div class="space-y-1">
      <p class="mb-1 text-sm text-admin-text-light">Замовник:</p>
      <p class="">{{ order.user_id.first_name }} {{ order.user_id.last_name }}</p>
      <p class="">{{ order.user_id.tel }}</p>
      <p class="">{{ order.user_id.email }}</p>
    </div>
    <div>
      <p class="mb-1 text-sm text-admin-text-light">Опис:</p>
      <p>{{ order.description }}</p>
    </div>
    <div>
      <p class="mb-1 text-sm text-admin-text-light">Сума оплати:</p>
      <p>{{ order.amount }} грн</p>
    </div>
    <div>
      <p class="mb-1 text-sm text-admin-text-light">Адреса доставки:</p>
      <p>{{ order.delivery }}</p>
    </div>
    <div class="flex items-center gap-3">
      <p class="mb-1 text-sm text-admin-text-light">Тип оплати:</p>
      <AdminTableOrdersOrderStatus :status="order.status" />
    </div>
    <div class="flex items-center gap-3">
      <p class="mb-1 text-sm text-admin-text-light">Статус:</p>
      <AdminTableOrdersPayment :payment="order.payment" />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  order: {
    type: Object,
    required: false,
    default: {},
    validator: obj => Object.keys(obj).length > 0,
  },
});



</script>
