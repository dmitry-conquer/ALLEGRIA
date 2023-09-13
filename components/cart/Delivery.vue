<template>
  <div class="mb-4">
    <h2 class="mb-2 text-lg font-medium">Доставка</h2>
    <div
      class="mb-2"
      v-if="deliveryData">
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
      v-if="deliveryData"
      to="/profile/address"
      class="text-secondary hover:underline"
      >Редагувати</NuxtLink
    >
  </div>
</template>

<script setup>
const props = defineProps({
  deliveryData: {
    type: [Object, null],
    required: true,
    default: {},
  },
});

const address = ref(props.deliveryData?.address || "");
const street = ref(props.deliveryData?.street || "");
const house = ref(props.deliveryData?.house || "");
const appart = ref(props.deliveryData?.appart || "");
const deliveryMethod = ref(props.deliveryData?.deliveryMethod || "");
const addressString = ref(`м. ${address.value}, вул. ${street.value}, буд. ${house.value}, кв. ${appart.value}`);
const deliveryString = ref(`Спосіб доставки: ${deliveryMethod.value}`);
</script>
