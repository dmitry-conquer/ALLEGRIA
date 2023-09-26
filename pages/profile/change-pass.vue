<template>
  <div class="mt-6 flex h-11 w-full max-w-sm justify-start">
    <form
      @submit.prevent="handleUpdatePassword"
      class="w-full">
      <div class="mb-8">
        <div class="flex w-full items-center border-b-2 border-primary-dark/70 py-2 transition-colors">
          <label
            for="new-password"
            class="sr-only"
            >Новий пароль</label
          >
          <input
            class="w-full focus:border-primary-dark focus:outline-none"
            :type="currentInputType"
            placeholder="Новий пароль"
            v-model="password"
            id="new-password" />
          <button
            @click="passIsVisible = !passIsVisible"
            type="button">
            <IconEyeVisible
              v-if="passIsVisible"
              class="h-5 w-5" />
            <IconEyeHidden
              v-else
              class="h-5 w-5" />
          </button>
        </div>
        <div class="flex w-full items-center border-b-2 border-primary-dark/70 py-2 transition-colors">
          <label
            for="login-password"
            class="sr-only"
            >Повторіть пароль</label
          >
          <input
            class="w-full focus:border-primary-dark focus:outline-none"
            :type="currentInputType"
            placeholder="Повторіть пароль"
            v-model="repeatPassword"
            id="login-password" />
          <button
            @click="passIsVisible = !passIsVisible"
            type="button">
            <IconEyeVisible
              v-if="passIsVisible"
              class="h-5 w-5" />
            <IconEyeHidden
              v-else
              class="h-5 w-5" />
          </button>
        </div>
      </div>
      <div class="mt-6 flex h-11 justify-center">
        <SpinnerLoader
          v-if="pending"
          sizes="w-7 h-7" />
        <button
          v-else
          class="flex rounded-sm bg-primary-dark px-12 py-2 text-center text-lg uppercase text-white transition-colors hover:bg-primary-dark/90"
          type="submit">
          Оновити
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
const pending = ref(false);
const password = ref("");
const repeatPassword = ref("");
const passIsVisible = ref(false);
const currentInputType = computed(() => (passIsVisible.value ? "text" : "password"));

const handleUpdatePassword = async () => {
  pending.value = true;
  const { result } = await useUpdatePassword({
    password: password.value,
    repeatPassword: repeatPassword.value,
  });
  pending.value = false;
};
</script>
