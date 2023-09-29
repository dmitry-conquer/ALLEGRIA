<template>
  <Transition name="page" mode="out-in">
    <div v-show="isLoaded">
      <NuxtLoadingIndicator
        :height="6"
        :color="'repeating-linear-gradient(to right,#ac3013 0%,#e95c3c 50%,#f19581 100%)'"
        :throttle="50" />
      <div class="flex min-h-screen flex-col">
        <Header />
        <main class="grow font-jost text-base text-primary-dark">
          <slot></slot>
        </main>
        <TheFooter />
      </div>
    </div>
  </Transition>
  <PreLoader v-show="!isLoaded" />
</template>

<script setup>
const isLoaded = ref(true);

// onMounted(() => {
//   setTimeout(() => {
//     isLoaded.value = true;
//   }, 2000);
// });
</script>
