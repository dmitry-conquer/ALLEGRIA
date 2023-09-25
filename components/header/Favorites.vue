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
      <LoginForm @close-modal="isOpen = false" />
    </BaseModal>
  </Transition>
</template>

<script setup>
const user = useSupabaseUser();

const isOpen = ref(false);

const loginHandle = () => {
  if (!user.value) {
    isOpen.value = true;
    return;
  }
  navigateTo("/profile/favorites");
};
</script>
