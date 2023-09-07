<template>
  <div class="mx-auto max-w-5xl py-24">
    <!-- single -->
    <div class="mb-32 flex gap-12">
      <div class="flex w-full gap-2">
        <div class="space-y-2">
          <img
            v-for="(img, i) in product.image"
            @click="selectedImage = img"
            :key="i"
            :src="img"
            :alt="product.name"
            class="h-28 w-32 cursor-pointer object-cover" />
        </div>
        <div class="max-h-[600px] grow">
          <ClientOnly>
            <VueMagnifier
              mg-shape="square"
              :src="selectedImage"
              :alt="product.name"
              class="block h-full w-full object-cover" />
          </ClientOnly>
          <button
            class="grid place-content-center rounded-full bg-white p-3"
            type="button">
            <IconFavorite class="h-5 w-5" />
          </button>
        </div>
      </div>
      <div class="w-80 shrink-0 space-y-8">
        <div>
          <h1 class="text-3xl font-medium uppercase">{{ product.name }}</h1>
          <p class="mb-2 text-lg font-light">{{ product.category.name }}</p>
          <div class="inline-flex gap-2 font-medium">
            <span class="text-lg text-gray-300 line-through">{{ product.oldPrice }} <span>ГРН</span></span>
            <span class="text-xl text-secondary">{{ product.newPrice }} <span>ГРН</span></span>
          </div>
        </div>

        <div>
          <span class="mb-2 block">Розмір:</span>
          <div class="flex flex-wrap gap-2">
            <label
              v-for="size in product.sizes"
              :key="size"
              class="cursor-pointer">
              <input
                type="radio"
                name="size"
                class="peer sr-only"
                :value="size" />
              <span
                class="grid h-8 w-8 shrink-0 place-content-center border text-sm uppercase leading-none transition-colors hover:bg-secondary hover:text-white peer-checked:bg-secondary peer-checked:text-white"
                >{{ size }}</span
              >
            </label>
          </div>
          <button
            class="mt-2 text-sm underline transition-colors hover:text-secondary"
            type="button">
            Таблиця розмірів
          </button>
        </div>

        <div>
          <div class="mb-4">
            <button
              class="w-full border border-primary-dark bg-white px-5 py-3 font-medium uppercase"
              type="button">
              ДОДАТИ В КОРЗИНУ
            </button>
            <a
              href=" https://prt.mn/tXx_BwPXiH"
              class="block w-full border border-primary-dark bg-primary-dark px-5 py-3 text-center font-medium uppercase text-white">
              КУПИТИ В ОДИН КЛІК
            </a>
            <a
              href=" https://prt.mn/7nSsLSf3J"
              class="block w-full border border-primary-dark bg-primary-dark px-5 py-3 text-center font-medium uppercase text-white">
              КУПИТИ В ОДИН КЛІК
            </a>
          </div>

          <form
            method="POST"
            action="https://www.liqpay.ua/api/3/checkout"
            accept-charset="utf-8">
            <input
              type="hidden"
              name="data"
              :value="dataOrder" />
            <input
              type="hidden"
              name="signature"
              :value="signature" />
            <input
              type="image"
              src="//static.liqpay.ua/buttons/p1ru.radius.png" />
            <button type="submit">PAY!</button>
          </form>
          {{ dataOrder }}
          {{ signature }}
          <div class="mb-4 flex justify-between gap-4 text-base">
            <button
              class="text-gray-300 transition-colors hover:text-secondary"
              type="button">
              Оплата та доставка
            </button>
            <button
              class="text-gray-300 transition-colors hover:text-secondary"
              type="button">
              Повернення та обмін
            </button>
          </div>

          <div>
            <h2 class="mb-2 uppercase">ІНФОРМАЦІЯ ПРО ТОВАР</h2>
            <p class="text-sm text-gray-600">
              {{ product.description }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- slider -->
    <SectionSlider title="подібні товари" />
  </div>
</template>

<script setup>
import VueMagnifier from "@websitebeaver/vue-magnifier";
import "@websitebeaver/vue-magnifier/styles.css";

const route = useRoute();
const { data: product } = await useFetch(`/api/${route.params.product_id}`, {
  transform: response => {
    return response[0];
  },
});

const selectedImage = ref(product.value.image[0]);

/*
  pay
*/

const public_key = "sandbox_i50745244528";
const private_key = "sandbox_ac3mCIe5ymoND1pltWfBx0GtxkJ612e5JTSaZIHH";
const order = {
  public_key: public_key,
  version: "3",
  action: "pay",
  amount: "3",
  currency: "UAH",
  description: "test",
  order_id: "234234234",
};
const dataOrder = ref(btoa(JSON.stringify(order)));
const signatureData = public_key + dataOrder.value + private_key;
const signature = ref("");
var encoder = new TextEncoder();
var data = encoder.encode(signatureData);

onMounted(() => {
  window.crypto.subtle
    .digest("SHA-1", data)
    .then(function (buffer) {
      var arrayBufferView = new Uint8Array(buffer);
      var binary = "";
      for (var i = 0; i < arrayBufferView.length; i++) {
        binary += String.fromCharCode(arrayBufferView[i]);
      }
      var base64String = btoa(binary);
      signature.value = base64String;
    })
    .catch(function (err) {
      console.error(err);
    });
});
</script>
