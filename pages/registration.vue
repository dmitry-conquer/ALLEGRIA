<template>
  <div class="mx-auto max-w-4xl py-32">
    <h1 class="mb-8 text-center text-3xl font-medium uppercase">Створити профіль</h1>
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
        <button
          type="submit"
          class="rounded-sm bg-primary-dark px-4 py-3 text-2xl uppercase text-white transition-colors hover:bg-primary-dark/90">
          ЗАРЕЄСТРУВАТИСЯ
        </button>
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
const client = useSupabaseClient();
const { toast, toastOptions } = useToast();

const isOpen = ref(false);
const firstName = ref("");
const lastName = ref("");
const email = ref("");
const tel = ref("");
const password = ref("");
const repeatPassword = ref("");

async function createUser() {
  try {
    const { data, error } = await client.auth.signUp({
      email: email.value,
      email_confirm: false,
      password: password.value,
    });
    if (data) {
      try {
        const { data: profile, error: userError } = await client
          .from("users")
          .insert({
            email: email.value,
            password: password.value,
            first_name: firstName.value,
            last_name: lastName.value,
            tel: tel.value,
            user_id: data.user.id,
          })
          .select();
        if (profile) {
          toast.success(`Успішна реєстрація!`, toastOptions);
          setTimeout(() => {
            navigateTo("/");
          }, 2000);
        }
        if (userError) throw error;
      } catch (error) {
        toast.success(error.message, toastOptions);
      }
    }
    if (error) throw error;
  } catch (error) {
    toast.success(error.message, toastOptions);
  }
}
</script>

<style lang="scss"></style>
