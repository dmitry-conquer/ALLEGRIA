<template>
  <div class="mx-auto w-full md:w-1/2 md:border-r p-0 md:p-7">
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
    <CartDelivery :deliveryData="profile.delivery" />

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
      :paymentMethod="paymentMethod"
      :disable="cart.products.length <= 0 || profile.delivery === null" />
  </div>
</template>

<script setup>

import { useCartStore } from "~/stores/cart";

const cart = useCartStore();
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

const paymentMethod = ref("online");
const addressString = ref(
  `м. ${profile.value.delivery?.address}, вул. ${profile.value.delivery?.street}, буд. ${profile.value.delivery?.house}, кв. ${profile.value.delivery?.appart}`,
);
const deliveryString = ref(`Спосіб доставки: ${profile.value.delivery?.deliveryMethod}`);

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
  const resultOrder = {
    user_id: profile.value.id,
    auth_id: user.value.id,
    order_id: order_id,
    products: cart.products.map(p => p.id),
    amount: cart.totalPrice,
    description: description,
    delivery: `${addressString.value}. ${deliveryString.value}`,
    payment: paymentMethod.value,
  };
  if (paymentMethod.value === "online") {
    LiqPayCheckout.init({
      data: dataOrder.value,
      signature: signature.value,
      embedTo: "#liqpay_checkout",
      language: "uk",
      mode: "popup", // embed || popup
    }).on("liqpay.callback", async function (data) {
      resultOrder.status = data.status;
      useSaveOrder(resultOrder);
      cart.products = [];
    });
    // .on("liqpay.ready", function (data) {
    //   // ready
    //   console.log(data);
    // })
    // .on("liqpay.close", function (data) {
    //   console.log(data);
    //   // close
    // });
  } else if (paymentMethod.value === "cash") {
    resultOrder.status = "not payed";
    useSaveOrder(resultOrder);
    cart.products = [];
  }
};
</script>
