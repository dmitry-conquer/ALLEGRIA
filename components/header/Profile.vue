<template>
  <button
    type="button"
    @click="loginHandle">
    <IconProfile class="h-7 w-7 hover:text-secondary transition-colors" />
  </button>
  <Transition name="fade">
    <BaseModal
      v-if="isOpen"
      :isOpen="isOpen"
      @close-modal="isOpen = false">
      <LoginForm @close-modal="isOpen = false"/>
    </BaseModal>
  </Transition>
</template>

<script setup>
const user = useSupabaseUser();

const isOpen = ref(false);

const loginHandle = () => {
  if (user.value) {
    navigateTo("/profile/general");
  } else {
    isOpen.value = true;
  }
};


</script>

<style lang="scss"></style>
