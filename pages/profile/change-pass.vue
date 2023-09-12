<template>
  <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
    <div>
      <label for="profile-first-name" class="sr-only">Ім'я</label>
      <input
        class="w-full border-b-2 border-primary-dark/70 py-2 transition-colors focus:border-primary-dark focus:outline-none"
        type="text"
        id="profile-first-name"
        placeholder="Ім'я"
        v-model="firstName" />
    </div>
  </div>
</template>

<script setup></script>
