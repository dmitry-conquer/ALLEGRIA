<template>
  <footer class="gap-4 border-y">
    <div class="mx-auto flex max-w-3xl flex-col items-center py-12 md:py-20">
      <h2 class="mb-8 text-center font-cormorant text-4xl md:text-5xl">Зв'язатися з нами</h2>
      <form
        @submit.prevent="sendForm"
        class="flex items-center gap-2">
        <input
          v-maska
          data-maska="+380 ## ###-##-##"
          type="text"
          placeholder="Номер"
          class="w-60 border-b pb-2 text-center transition-colors focus:border-primary-dark focus:outline-none" />
        <button
          class=""
          type="button">
          <IconSendArrow class="h-5 w-5" />
        </button>
      </form>
      <nav class="mt-12">
        <ul class="flex flex-wrap justify-center gap-3 sm:gap-8">
          <li>
            <NuxtLink
              to="/"
              class="text-base text-gray-400 transition-colors hover:text-secondary md:text-lg">
              Про нас
            </NuxtLink>
          </li>
          <li>
            <NuxtLink
              to="/"
              class="text-base text-gray-400 transition-colors hover:text-secondary md:text-lg">
              Популярні питання
            </NuxtLink>
          </li>
          <li>
            <NuxtLink
              to="/"
              class="text-base text-gray-400 transition-colors hover:text-secondary md:text-lg">
              Бренди
            </NuxtLink>
          </li>
        </ul>
      </nav>
    </div>
    <button
      @click="send1"
      class=""
      type="button">
      SEND
    </button>
    <button
      @click="send2"
      class=""
      type="button">
      SEND
    </button>
  </footer>
</template>

<script setup>
const mail = useMail();
const { $mail } = useNuxtApp();

const send1 = () => {
  mail.send({
    from: "John Doe",
    subject: "Incredible",
    text: "This is an incredible test message",
  });
};
const send2 = () => {
  $mail.send({
    from: "John Doe",
    subject: "Incredible",
    text: "This is an incredible test message",
  });
};
</script>

<style lang="scss"></style>
