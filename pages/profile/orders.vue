<template>
  <div class="divide-y">
    <dl
      v-for="order in orders"
      :key="order.order_id"
      class="space-y-1.5 py-5">
      <div class="flex gap-2 font-medium text-secondary">
        <dt>Номер замовлення:</dt>
        <dd>{{ order.order_id.slice(-6) }}</dd>
      </div>
      <div>
        <dt class="font-medium">Опис:</dt>
        <dd>{{ order.description }}</dd>
      </div>
      <div class="flex gap-2">
        <dt class="font-medium">Ціна:</dt>
        <dd>{{ order.amount }} грн</dd>
      </div>
      <div>
        <dt class="font-medium">Адреса доставки:</dt>
        <dd>{{ order.delivery }}</dd>
      </div>
      <div class="flex items-center gap-2">
        <dt class="font-medium">Статус оплати:</dt>
        <dd
          v-if="paymentStatus(order.status)"
          class="rounded-2xl bg-green-200 px-2 py-1 text-xs font-medium text-green-800">
          Оплачено
        </dd>
        <dd
          v-else="paymentStatus"
          class="rounded-2xl bg-red-200 px-2 py-1 text-xs font-medium text-red-800">
          Не оплачено
        </dd>
      </div>
    </dl>
  </div>
</template>

<script setup>
const client = useSupabaseClient();
const user = useSupabaseUser();

const { data: orders } = await client.from("orders").select().eq("auth_id", user.value.id);

const paymentStatus = status => {
  return status === "success";
};
</script>
