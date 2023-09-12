<template>
  <button
    type="button"
    @click="loginHandle">
    <IconFavorite class="h-7 w-7 transition-colors hover:text-secondary" />
  </button>
  <Transition name="fade">
    <BaseModal
      v-if="isOpen"
      :isOpen="isOpen"
      @close-modal="isOpen = false">
      <HeaderLoginForm @close-modal="isOpen = false" />
    </BaseModal>
  </Transition>
</template>

<script setup>
const user = useSupabaseUser();

const isOpen = ref(false);

const loginHandle = () => {
  if (user.value) {
    navigateTo("/profile/favorites");
  } else {
    isOpen.value = true;
  }
};
</script>

<style lang="scss"></style>
