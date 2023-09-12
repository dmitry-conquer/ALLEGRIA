<template>
  <div class="p-8">
    <h3 class="text-center font-cormorant text-3xl font-semibold uppercase">ВХІД</h3>
    <form
      @submit.prevent="login"
      class="min-w-[320px] space-y-6">
      <div>
        <label
          for="login-email"
          class="sr-only"
          >Вкажіть пошту</label
        >
        <input
          class="w-full border-b-2 border-primary-dark/70 py-2 transition-colors focus:border-primary-dark focus:outline-none"
          type="email"
          placeholder="Пошта"
          v-model="email"
          id="login-email" />
      </div>
      <div>
        <label
          for="login-password"
          class="sr-only"
          >Вкажіть пароль</label
        >
        <input
          class="w-full border-b-2 border-primary-dark/70 py-2 transition-colors focus:border-primary-dark focus:outline-none"
          type="password"
          placeholder="Пароль"
          v-model="password"
          id="login-password" />
      </div>
      <button
        type="submit"
        class="mt-8 w-full rounded-sm bg-primary-dark px-4 py-3 text-2xl uppercase text-white transition-colors hover:bg-primary-dark/90">
        ВХІД
      </button>
    </form>

    <div class="mt-3 flex justify-center gap-2 text-sm text-secondary">
      <a
        href=""
        class="hover:underline"
        >Забули пароль</a
      >
      <span>/</span>
      <NuxtLink
        @click="emit('close-modal')"
        to="/registration"
        class="hover:underline"
        >Немає акаунта</NuxtLink
      >
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits({
  "close-modal": null,
});

const client = useSupabaseClient();

const email = ref("dmitry.conquer@gmail.com");
const password = ref("uzeraf55");

const login = async () => {
  try {
    let { data, error } = await client.auth.signInWithPassword({
      email: email.value,
      password: password.value,
    });
    if (data) {
      console.log(data);
      emit("close-modal");
      navigateTo("/profile");
    }
    if (error) throw error;
  } catch (error) {
    console.log(error.message);
  }
};
</script>
