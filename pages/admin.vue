<template>
  <div class="admin flex min-h-screen bg-admin-secondary">
    <AdminSidebar />
    <AdminMain />
  </div>
</template>

<script setup>
definePageMeta({
  layout: "admin",
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
