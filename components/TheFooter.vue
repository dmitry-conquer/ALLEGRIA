<template>
  <footer class="border-y">
    <div class="mx-auto flex max-w-3xl flex-col items-center py-20">
      <h2 class="mb-8 text-center font-cormorant text-5xl">Зв'язатися з нами</h2>
      <form
        @submit.prevent="sendForm"
        class="flex items-center gap-2">
        <input
          v-maska
          data-maska="+380 ## ###-##-##"
          type="text"
          placeholder="Номер"
          class="w-60 border-b focus:border-primary-dark pb-2 transition-colors text-center focus:outline-none" />
        <button
          class=""
          type="button">
          <IconSendArrow class="h-5 w-5" />
        </button>
      </form>
      <nav class="mt-12">
        <ul class="flex justify-center gap-8">
          <li>
            <NuxtLink
              to="/"
              class="text-lg text-gray-400 transition-colors hover:text-secondary">
              Про нас
            </NuxtLink>
          </li>
          <li>
            <NuxtLink
              to="/"
              class="text-lg text-gray-400 transition-colors hover:text-secondary">
              Популярні питання
            </NuxtLink>
          </li>
          <li>
            <NuxtLink
              to="/"
              class="text-lg text-gray-400 transition-colors hover:text-secondary">
              Бренди
            </NuxtLink>
          </li>
        </ul>
      </nav>
    </div>
  </footer>
</template>

<script setup></script>

<style lang="scss"></style>
