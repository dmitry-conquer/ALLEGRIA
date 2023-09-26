<template>
  <div class="py-24 md:py-32">
    <div>
      <h1 class="py-2 sm:py-6 text-center text-2xl md:text-4xl font-medium uppercase">Мій акаунт</h1>
    </div>
    <div class="border-y py-10">
      <div class="mx-auto flex max-w-5xl items-start px-4  gap-4 sm:gap-8 md:gap-12">
        <ProfileMenu class="shrink-0" />
        <NuxtPage class="grow" />
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: ["profile-auth"],
  pageTransition: {
    name: "page",
    mode: "out-in",
  },
});
</script>
