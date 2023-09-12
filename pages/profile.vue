<template>
  <div class="py-24">
    <div>
      <h1 class="py-6 text-center text-4xl font-medium uppercase">Мій акаунт</h1>
    </div>
    <div class="border-y py-10">
      <div class="mx-auto flex max-w-5xl items-start gap-12">
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
