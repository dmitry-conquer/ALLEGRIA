<template>
  <div class="mx-auto max-w-4xl px-4 py-24 sm:py-32">
    <div class="mb-8">
      <h1 class="mb-2 text-center text-2xl font-medium uppercase sm:text-3xl">Зворотній зв'язок</h1>
      <div class="text-center">
        <p>Залишилися питання або бажаєте отримати консультацію?</p>
        <p>Залиште свої контактні дані, ми зв'яжимося з вами найближчим часом</p>
        <p>Після відправки Ви отримаєте повідомлення на свою електронну адресу.</p>
      </div>
    </div>
    <form @submit.prevent="sendForm">
      <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label
            for="first-name"
            class="sr-only"
            >Вкажіть ім'я</label
          >
          <input
            type="text"
            id="first-name"
            class="w-full border-b-2 border-primary-dark/70 py-2 transition-colors focus:border-primary-dark focus:outline-none"
            placeholder="Ім'я"
            v-model="firstName" />
        </div>
        <div>
          <label
            for="last-name"
            class="sr-only"
            >Вкажіть прізвище</label
          >
          <input
            type="text"
            id="last-name"
            class="w-full border-b-2 border-primary-dark/70 py-2 transition-colors focus:border-primary-dark focus:outline-none"
            placeholder="Прізвище"
            v-model="lastName" />
        </div>
        <div>
          <label
            for="tel"
            class="sr-only"
            >Вкажіть телефон</label
          >
          <input
            v-maska
            data-maska="+380 ## ###-##-##"
            type="text"
            id="tel"
            class="w-full border-b-2 border-primary-dark/70 py-2 transition-colors focus:border-primary-dark focus:outline-none"
            placeholder="Телефон"
            v-model="tel" />
        </div>
        <div>
          <label
            for="mail"
            class="sr-only"
            >Вкажіть пошту</label
          >
          <input
            type="text"
            id="mail"
            class="w-full border-b-2 border-primary-dark/70 py-2 transition-colors focus:border-primary-dark focus:outline-none"
            placeholder="Пошта"
            v-model="email" />
        </div>
      </div>
      <div class="mt-6 flex items-center gap-3">
        <input
          type="checkbox"
          id="check-policy"
          v-model="policy"
          class="h-5 w-5 accent-secondary" />
        <label
          class="text-sm sm:text-base"
          for="check-policy"
          >Надаю згоду на обробку
          <a
            href=""
            class="text-secondary hover:underline"
            >персональних даних</a
          ></label
        >
      </div>
      <button
        @click="open"
        class=""
        type="button">
        CHOOSE FILES
      </button>
      <div v-for="f in files">
        {{ f }}
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
            НАДІСЛАТИ
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup>
import { useFileDialog } from "@vueuse/core";

const firstName = ref("");
const lastName = ref("");
const tel = ref("");
const email = ref("");
const policy = ref(false);
const loading = ref(false);

const { files, open, reset, onChange } = useFileDialog();

onChange(files => {
  console.log(files[0]);
});

const { toast, toastOptions } = useToast();

const sendForm = async () => {
  loading.value = true;
  const formData = new FormData();
  Object.values(files.value).forEach(file => {
    formData.append("file", file);
  });
  formData.append("text", "RANDOM TEXT");
  formData.append("tefsdfxt", "sfsaf");
  formData.append("222", "112312");
  formData.append("svsf sf sf", " sfs fs fs saf s fs");
  const { data, error } = await useFetch("/api/sendMail", {
    method: "POST",
    body: formData,
    //  firstName: firstName.value,
    // lastName: lastName.value,
    // tel: tel.value,
    // email: email.value,
    // file: files.value[0],
  });
  if (data.value && data.value.every(mail => mail.hasOwnProperty("messageId"))) {
    toast.success("Лист надіслано!", toastOptions);
    loading.value = false;
  } else if (error.value) {
    toast.error("Помилка!", toastOptions);
    loading.value = false;
  }
};
</script>
