<template>
  <form @submit.prevent="updateUser">
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
    <button
      class="mx-auto mt-8 flex h-11 w-full max-w-[11rem] justify-center rounded-sm bg-primary-dark px-3 py-2 text-center text-lg uppercase text-white transition-colors hover:bg-primary-dark/90"
      type="submit">
      <SpinnerLoader
        v-if="loading"
        sizes="w-7 h-7" />
      <span v-else>ОНОВИТИ</span>
    </button>
  </form>
</template>

<script setup>
const { toast, toastOptions } = useToast();

const { data: profile, error } = await useFetch("/api/profile/", {
  method: "GET",
  headers: useRequestHeaders(["cookie"]),
});

const firstName = ref(profile.value.first_name);
const lastName = ref(profile.value.last_name);
const email = ref(profile.value.email);
const tel = ref(profile.value.tel);
const resultMessage = ref("");
const loading = ref(false);

// const updateUser = async () => {
//   loading.value = true;
//   let error = 0;
//   if (!telValid(tel.value)) {
//     resultMessage.value = "Перевірте номер!";
//     error++;
//   } else if (!emailValid(email.value)) {
//     resultMessage.value = "Перевірте пошту!";
//     error++;
//   } else if (isEmpty(tel.value) || isEmpty(email.value) || isEmpty(firstName.value) || isEmpty(lastName.value)) {
//     resultMessage.value = "Заповніть всі поля!";
//     error++;
//   }
//   if (error > 0) {
//     toast.error(resultMessage.value, toastOptions);
//     return;
//   } else {
//     try {
//       const updatedValues = {
//         first_name: firstName.value,
//         last_name: lastName.value,
//         email: email.value,
//         tel: tel.value,
//       };
//       const { data, error } = await useFetch("/api/profile/", {
//         method: "POST",
//         body: updatedValues,
//       });

//       if (data.value) {
//         toast.success("Оновлено!", toastOptions);
//         loading.value = false;
//       }
//       if (error.value) throw error;
//     } catch (error) {
//       toast.error("Помилка оновлення!", toastOptions);
//       loading.value = false;
//     }
//   }
// };
</script>

<style lang="scss">
.invalid {
  border-color: red;
  animation: shake 0.5s ease-in-out;
}
</style>
