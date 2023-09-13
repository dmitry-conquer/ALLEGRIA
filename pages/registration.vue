<template>
  <div class="mx-auto max-w-4xl py-32">
    <h1 class="mb-8 text-center text-3xl font-medium uppercase">Створити профіль</h1>
    {{ loading }}
    <form @submit.prevent="createUser">
      <div class="grid grid-cols-2 gap-6">
        <div>
          <label
            for="reg-first-name"
            class="sr-only"
            >Вкажіть ім'я</label
          >
          <input
            type="text"
            id="reg-first-name"
            class="w-full border-b-2 border-primary-dark/70 py-2 transition-colors focus:border-primary-dark focus:outline-none"
            placeholder="Ім'я"
            v-model="firstName" />
        </div>
        <div>
          <label
            for="reg-last-name"
            class="sr-only"
            >Вкажіть прізвище</label
          >
          <input
            type="text"
            id="reg-last-name"
            class="w-full border-b-2 border-primary-dark/70 py-2 transition-colors focus:border-primary-dark focus:outline-none"
            placeholder="Прізвище"
            v-model="lastName" />
        </div>
        <div>
          <label
            for="reg-tel"
            class="sr-only"
            >Вкажіть телефон</label
          >
          <input
            v-maska
            data-maska="+380 ## ###-##-##"
            type="text"
            id="reg-tel"
            class="w-full border-b-2 border-primary-dark/70 py-2 transition-colors focus:border-primary-dark focus:outline-none"
            placeholder="Телефон"
            v-model="tel" />
        </div>
        <div>
          <label
            for="reg-mail"
            class="sr-only"
            >Вкажіть пошту</label
          >
          <input
            type="text"
            id="reg-mail"
            class="w-full border-b-2 border-primary-dark/70 py-2 transition-colors focus:border-primary-dark focus:outline-none"
            placeholder="Пошта"
            v-model="email" />
        </div>
        <div>
          <label
            for="reg-password"
            class="sr-only"
            >Вкажіть пароль</label
          >
          <input
            type="password"
            id="reg-password"
            class="w-full border-b-2 border-primary-dark/70 py-2 transition-colors focus:border-primary-dark focus:outline-none"
            placeholder="Пароль"
            v-model="password" />
        </div>
        <div>
          <label
            for="reg-password-repeat"
            class="sr-only"
            >Повторіть пароль</label
          >
          <input
            type="password"
            id="reg-password-repeat"
            class="w-full border-b-2 border-primary-dark/70 py-2 transition-colors focus:border-primary-dark focus:outline-none"
            placeholder="Повторити пароль"
            v-model="repeatPassword" />
        </div>
      </div>
      <div class="mt-6 flex items-center gap-3">
        <input
          type="checkbox"
          id="check-policy"
          v-model="policy"
          class="h-5 w-5 accent-secondary" />
        <label for="check-policy"
          >Я согласен с
          <a
            href=""
            class="text-secondary hover:underline"
            >политикой конфиденциальности</a
          ></label
        >
      </div>
      <div class="mt-8 flex flex-col items-center justify-center gap-4">
        <div>
          <SpinnerLoader
            v-if="loading"
            sizes="w-7 h-7" />
          <button
            v-else
            type="submit"
            class="rounded-sm bg-primary-dark px-4 py-3 text-2xl uppercase text-white transition-colors hover:bg-primary-dark/90">
            ЗАРЕЄСТРУВАТИСЯ
          </button>
        </div>
        <p>
          В мене вже є акаунт
          <button
            type="button"
            @click="isOpen = true"
            class="text-secondary hover:underline">
            увійти
          </button>
        </p>
        <Transition name="fade">
          <BaseModal
            v-if="isOpen"
            :isOpen="isOpen"
            @close-modal="isOpen = false">
            <HeaderLoginForm @close-modal="isOpen = false" />
          </BaseModal>
        </Transition>
      </div>
    </form>
  </div>
</template>

<script setup>
definePageMeta({
  pageTransition: {
    name: "page",
    mode: "out-in",
  },
});

const isOpen = ref(false);
const loading = ref(false);

const firstName = ref("");
const lastName = ref("");
const email = ref("");
const tel = ref("");
const password = ref("");
const repeatPassword = ref("");
const policy = ref(false);

const createUser = async () => {
  loading.value = true;
  const credetials = {
    firstName: firstName.value,
    lastName: lastName.value,
    email: email.value,
    tel: tel.value,
    password: password.value,
    repeatPassword: repeatPassword.value,
    policy: policy.value,
  };
  const result = await useCreateUser(credetials);
  loading.value = result;
};
</script>

<style lang="scss"></style>
