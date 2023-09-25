<template>
  <div class="py-32">
    <div class="border-b pb-16">
      <h1 class="text-center font-cormorant text-4xl uppercase">ВАШЕ ЗАМОВЛЕННЯ</h1>
    </div>
    <div class="relative mx-auto mt-8 max-w-sm border-x border-b pt-8">
      <span class="absolute left-0 top-0 h-2.5 w-full rounded-lg bg-secondary"></span>
      <div class="relative mb-3 flex justify-center border-b px-3">
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
definePageMeta({
  middleware: ["receipt"],
});
import Profile from "~/components/icon/Profile.vue";
import Mail from "~/components/icon/Mail.vue";
import Phone from "~/components/icon/Phone.vue";
import Location from "~/components/icon/Location.vue";

import { useOrderStore } from "~/stores/order";
import { useCartStore } from "~/stores/cart";
const client = useSupabaseClient();
const orderStore = useOrderStore();

const { data: receipt } = await client
  .from("orders")
  .select("*, user_id(*)")
  .eq("order_id", orderStore.currentOrderID)
  .single();

const { data: products } = await client.from("products").select("*, category(name)").in("id", receipt.products);
console.log(receipt);

const receiptInfo = [
  {
    icon: Profile,
    text: `${receipt.user_id.first_name} ${receipt.user_id.last_name}`,
  },
  {
    icon: Mail,
    text: receipt.user_id.email,
  },
  {
    icon: Phone,
    text: receipt.user_id.tel,
  },
  {
    icon: Location,
    text: receipt.delivery,
  },
];
onBeforeRouteLeave((to, from) => {
  orderStore.currentOrderID = "";
});
</script>

<style lang="scss"></style>
