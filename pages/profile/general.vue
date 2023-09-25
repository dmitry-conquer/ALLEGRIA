<template>
  <form @submit.prevent="handleUpdateUser">
    <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
      <div>
        <label
          for="profile-first-name"
          class="sr-only"
          >Ім'я</label
        >
        <input
          class="w-full border-b-2 border-primary-dark/70 py-2 transition-colors focus:border-primary-dark focus:outline-none"
          type="text"
          id="profile-first-name"
          placeholder="Ім'я"
          v-model="firstName" />
      </div>
      <div>
        <label
          for="profile-last-name"
          class="sr-only"
          >Прізвище</label
        >
        <input
          class="w-full border-b-2 border-primary-dark/70 py-2 transition-colors focus:border-primary-dark focus:outline-none"
          type="text"
          id="profile-last-name"
          placeholder="Прізвише"
          v-model="lastName" />
      </div>
      <div>
        <label
          for="profile-tel"
          class="sr-only"
          >Номер телефона</label
        >
        <input
          v-maska
          data-maska="+380 ## ###-##-##"
          class="w-full border-b-2 border-primary-dark/70 py-2 transition-colors focus:border-primary-dark focus:outline-none"
          type="text"
          inputmode="tel"
          id="profile-tel"
          placeholder="Номер телефона"
          v-model="tel" />
      </div>
      <div>
        <label
          for="profile-email"
          class="sr-only"
          >Пошта</label
        >
        <input
          class="w-full border-b-2 border-primary-dark/70 py-2 transition-colors focus:border-primary-dark focus:outline-none"
          type="email"
          id="profile-email"
          placeholder="Пошта"
          v-model="email" />
      </div>
    </div>
    <div class="mt-6 flex h-11 justify-center">
        <SpinnerLoader
          v-if="loading"
          sizes="w-7 h-7" />
        <button
          v-else
          @click="handleUpdateUser"
          class="flex rounded-sm bg-primary-dark px-12 py-2 text-center text-lg uppercase text-white transition-colors hover:bg-primary-dark/90"
          type="submit">
          ЗБЕРЕГТИ
        </button>
      </div>
  </form>
</template>

<script setup>
const user = useSupabaseUser();
const client = useSupabaseClient();

const { data: profile } = await client.from("users").select("*").eq("user_id", user.value.id).single();
const firstName = ref(profile.first_name);
const lastName = ref(profile.last_name);
const email = ref(profile.email);
const tel = ref(profile.tel);
const loading = ref(false);

const handleUpdateUser = async () => {
  loading.value = true
  await useUpdateUser({
    first_name: firstName.value,
    last_name: lastName.value,
    email: email.value,
    tel: tel.value,
  });
  loading.value = false
};
</script>

<style lang="scss">
.invalid {
  border-color: red;
  animation: shake 0.5s ease-in-out;
}
</style>
