<template>
  <div class="w-1/2 border-r p-7">
    <!-- contacts info -->
    <div class="mb-4">
      <div>
        <label
          for="cart-first-name"
          class="sr-only"
          >Ім'я</label
        >
        <input
          class="w-full border-b border-primary-dark/70 py-2 transition-colors focus:border-primary-dark focus:outline-none"
          type="text"
          placeholder="Ім'я"
          v-model="firstName"
          id="cart-first-name" />
      </div>
      <div>
        <label
          for="cart-last-name"
          class="sr-only"
          >Ім'я</label
        >
        <input
          class="w-full border-b border-primary-dark/70 py-2 transition-colors focus:border-primary-dark focus:outline-none"
          type="text"
          placeholder="Прізвище"
          v-model="lastName"
          id="cart-last-name" />
      </div>
      <div>
        <label
          for="cart-email"
          class="sr-only"
          >Пошта</label
        >
        <input
          class="w-full border-b border-primary-dark/70 py-2 transition-colors focus:border-primary-dark focus:outline-none"
          type="email"
          placeholder="Пошта"
          v-model="email"
          id="cart-email" />
      </div>
      <div>
        <label
          for="cart-tel"
          class="sr-only"
          >Телефон</label
        >
        <input
          v-maska
          data-maska="+380 ## ###-##-##"
          class="w-full border-b border-primary-dark/70 py-2 transition-colors focus:border-primary-dark focus:outline-none"
          type="text"
          placeholder="Телефон"
          v-model="tel"
          inputmode="tel"
          id="cart-tel" />
      </div>
    </div>

    <!-- delivery -->
    <div class="mb-4">
      <h2 class="mb-2 text-lg font-medium">Доставка</h2>
      <div
        class="mb-2"
        v-if="profile.delivery">
        <p>
          {{ addressString }}
        </p>
        <p>
          {{ deliveryString }}
        </p>
      </div>
      <NuxtLink
        v-else
        to="/profile/address"
        class="text-secondary hover:underline"
        >Додати дані доставки</NuxtLink
      >
      <NuxtLink
        v-if="profile.delivery"
        to="/profile/address"
        class="text-secondary hover:underline"
        >Редагувати</NuxtLink
      >
    </div>

    <!-- payment -->
    <div>
      <h2 class="mb-2 text-lg font-medium">Спосіб оплати</h2>
      <div class="toggle-checkbox">
        <input
          checked
          type="radio"
          name="payment-method"
          value="online"
          class="sr-only"
          v-model="paymentMethod"
          id="cart-online" />
        <label for="cart-online">Карткою на сайті</label>
      </div>
      <div class="toggle-checkbox">
        <input
          type="radio"
          name="payment-method"
          value="cash"
          v-model="paymentMethod"
          class="sr-only"
          id="cart-cash" />
        <label for="cart-cash">При отримані замовлення</label>
      </div>
    </div>
    <CartOrderButton
      @pay="pay"
      :disable="cart.products.length <= 0" />
  </div>
</template>

<script setup>
useHead({
  script: [
    {
      src: "https://static.liqpay.ua/libjs/checkout.js",
      defer: true,
    },
  ],
});
import { useCartStore } from "~/stores/cart";
import { useOrderStore } from "~/stores/order";

const cart = useCartStore();
const orderStore = useOrderStore();
const user = useSupabaseUser();
const runtimeConfig = useRuntimeConfig();

const { data: profile, error } = await useFetch("/api/profile/", {
  method: "GET",
  headers: useRequestHeaders(["cookie"]),
});

const firstName = ref(profile.value.first_name);
const lastName = ref(profile.value.last_name);
const email = ref(profile.value.email);
const tel = ref(profile.value.tel);
const address = ref(profile.value.delivery?.address || "");
const street = ref(profile.value.delivery?.street || "");
const house = ref(profile.value.delivery?.house || "");
const appart = ref(profile.value.delivery?.appart || "");
const deliveryMethod = ref(profile.value.delivery?.deliveryMethod || "");
const paymentMethod = ref("online");
const addressString = ref(`м. ${address.value}, вул. ${street.value}, буд. ${house.value}, кв. ${appart.value}`);
const deliveryString = ref(`Спосіб доставки: ${deliveryMethod.value}`);

const description = cart.products.map(p => p.name).join(", ");
const order_id = `${user.value.id}-${Date.now()}`;

const order = {
  public_key: runtimeConfig.public.LIQPAY_PUBLIC_KEY,
  version: "3",
  action: "pay",
  amount: cart.totalPrice,
  currency: "UAH",
  description: description,
  order_id: order_id,
};
const dataOrder = ref(btoa(unescape(encodeURIComponent(JSON.stringify(order)))));
const sign_string = `${runtimeConfig.public.LIQPAY_PRIVATE_KEY}${dataOrder.value}${runtimeConfig.public.LIQPAY_PRIVATE_KEY}`;
const { signature } = useSha1(sign_string);

const pay = () => {
  LiqPayCheckout.init({
    data: dataOrder.value,
    signature: signature.value,
    embedTo: "#liqpay_checkout",
    language: "uk",
    mode: "embed", // embed || popup
  }).on("liqpay.callback", async function (data) {
    const resultOrder = {
      user_id: profile.value.id,
      order_id: order_id,
      products: cart.products.map(p => p.id),
      amount: cart.totalPrice,
      description: description,
      status: data.status,
      delivery: `${addressString.value}. ${deliveryString.value}`,
      payment: paymentMethod.value,
    };
    const { data: result, error } = await useFetch("/api/order/", {
      method: "POST",
      body: resultOrder,
    });
    if (result.value) {
      alert("Ok!");
      orderStore.currentOrderID = order_id;
      navigateTo("/receipt");
    }
    if (error.value) {
      alert("Error!");
    }
  });
  // .on("liqpay.ready", function (data) {
  //   // ready
  //   console.log(data);
  // })
  // .on("liqpay.close", function (data) {
  //   console.log(data);
  //   // close
  // });
};
</script>
