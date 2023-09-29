<template>
  <div class="admin flex min-h-screen">
    <AdminSidebar />
    <AdminMain />
  </div>
</template>

<script setup>
definePageMeta({
  layout: "no-ui",
});
</script>

<style lang="scss">
.admin {
  .router-link-active {
    color: #4a85f6;
    font-weight: 500;
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
