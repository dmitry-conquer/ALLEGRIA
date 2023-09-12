<template>
  <div class="py-32">
    <div class="border-b pb-16">
      <h1 class="text-center font-cormorant text-4xl uppercase">ВАШЕ ЗАМОВЛЕННЯ</h1>
    </div>
    <div class="relative mx-auto mt-8 max-w-sm border-x border-b pt-8">
      <span class="absolute left-0 top-0 h-2.5 w-full rounded-lg bg-secondary"></span>
      <div class="relative flex justify-center border-b px-3 mb-3">
        <div class="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-3">
          <Logo class="h-4 w-24 opacity-50" />
        </div>
      </div>
      <div class="p-6">
        <div class="flex justify-between text-lg font-medium uppercase text-secondary">
          <h2>НОМЕР ЗАМОВЛЕННЯ</h2>
          <span>№{{ orderStore.currentOrderID.slice(-6) }}</span>
        </div>
        <div>
          <ul class="space-y-5 border-b py-5">
            <ReceiptProductItem
              v-for="product in products"
              :key="product.id"
              :product="product" />
          </ul>
          <div class="border-b py-5 text-lg">
            Сума: <span class="text-lg font-semibold">{{ receipt.amount }} ГРН</span>
          </div>
          <ul class="space-y-5 py-5">
            <ReceiptInfoItem
              v-for="item in receiptInfo"
              :key="item.name"
              :item="item" />
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Profile from "~/components/icon/Profile.vue";
import Mail from "~/components/icon/Mail.vue";
import Phone from "~/components/icon/Phone.vue";
import Location from "~/components/icon/Location.vue";

import { useOrderStore } from "~/stores/order";
const orderStore = useOrderStore();

const { data: receipt } = await useFetch("/api/order", {
  method: "GET",
  query: {
    order_id: orderStore.currentOrderID,
  },
});

const { data: products } = await useFetch("/api/products", {
  method: "GET",
  query: {
    ids: receipt.value.products,
  },
});

const addressString = ref(
  `м. ${receipt.value.user_id.delivery.address}, вул. ${receipt.value.user_id.delivery.street}, буд. ${receipt.value.user_id.delivery.house}, кв. ${receipt.value.user_id.delivery.appart}`,
);
const deliveryString = ref(`Спосіб доставки: ${receipt.value.user_id.delivery.deliveryMethod}`);
const receiptInfo = [
  {
    icon: Profile,
    text: `${receipt.value.user_id.first_name} ${receipt.value.user_id.last_name}`,
  },
  {
    icon: Mail,
    text: receipt.value.user_id.email,
  },
  {
    icon: Phone,
    text: receipt.value.user_id.tel,
  },
  {
    icon: Location,
    text: `${addressString.value}. ${deliveryString.value}`,
  },
];
</script>

<style lang="scss"></style>
