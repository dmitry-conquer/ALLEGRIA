<template>
  <div class="grid max-w-sm grid-cols-2 gap-4">
    <div class="col-span-2">
      <label
        for="profile-address"
        class="sr-only"
        >Адреса</label
      >
      <input
        class="w-full border-b-2 border-primary-dark/70 py-2 transition-colors focus:border-primary-dark focus:outline-none"
        type="text"
        id="profile-address"
        placeholder="Адреса"
        v-model="address" />
    </div>
    <div class="col-span-2">
      <label
        for="profile-delivery"
        class="sr-only">
        Спосіб доставки
      </label>
      <select
        id="profile-delivery"
        v-model="deliveryMethod"
        class="w-full border-b-2 border-primary-dark/70 bg-white py-1 text-gray-700 focus:outline-none">
        <option
          selected
          disabled
          value="none">
          Спосіб доставки
        </option>
        <option value="Нова пошта">Нова пошта</option>
        <option value="Укрпошта">Укрпошта</option>
        <option value="Meest">Meest</option>
        <option value="Самовивіз">Самовивіз</option>
      </select>
    </div>
    <div class="col-span-2">
      <label
        for="profile-street"
        class="sr-only"
        >Вулиця</label
      >
      <input
        class="w-full border-b-2 border-primary-dark/70 py-2 transition-colors focus:border-primary-dark focus:outline-none"
        type="text"
        id="profile-street"
        placeholder="Вулиця"
        v-model="street" />
    </div>
    <div class="">
      <label
        for="profile-house"
        class="sr-only"
        >Будинок</label
      >
      <input
        class="w-full border-b-2 border-primary-dark/70 py-2 transition-colors focus:border-primary-dark focus:outline-none"
        type="text"
        id="profile-house"
        placeholder="Будинок"
        v-model="house" />
    </div>
    <div class="">
      <label
        for="profile-appart"
        class="sr-only"
        >Квартира</label
      >
      <input
        class="w-full border-b-2 border-primary-dark/70 py-2 transition-colors focus:border-primary-dark focus:outline-none"
        type="text"
        id="profile-appart"
        placeholder="Квартира"
        v-model="appart" />
    </div>
    <div class="col-span-2 flex justify-center">
      <button
        @click="updateDelivary"
        class="mx-auto mt-8 flex h-11 w-full max-w-[11rem] justify-center rounded-sm bg-primary-dark px-3 py-2 text-center text-lg uppercase text-white transition-colors hover:bg-primary-dark/90"
        type="submit">
        <SpinnerLoader
          v-if="loading"
          sizes="w-7 h-7" />
        <span v-else>ЗБЕРЕГТИ</span>
      </button>
    </div>
  </div>
</template>

<script setup>
const { toast, toastOptions } = useToast();

const { data: profile, error } = await useFetch("/api/profile/", {
  method: "GET",
  headers: useRequestHeaders(["cookie"]),
});
if (error) console.log(error);

const address = ref(profile.value.delivery?.address || "");
const street = ref(profile.value.delivery?.street || "");
const house = ref(profile.value.delivery?.house || "");
const appart = ref(profile.value.delivery?.appart || "");
const deliveryMethod = ref(profile.value.delivery?.deliveryMethod || "none");
const loading = ref(false);

const updateDelivary = async () => {
  loading.value = true;
  const deliveryData = {
    deliveryMethod: deliveryMethod.value,
    address: address.value,
    street: street.value,
    house: house.value,
    appart: appart.value,
  };
  const { data, error } = await useFetch("/api/profile/", {
    method: "POST",
    body: {
      delivery: deliveryData,
    },
  });
  if (data.value) {
    toast.success("Оновлено!", toastOptions);
  }
  if (error.value) {
    toast.error("Помилка оновлення!", toastOptions);
  }
  loading.value = false;
};
</script>
