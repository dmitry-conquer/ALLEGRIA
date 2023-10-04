<template>
  <div class="text-admin-text">
    <NuxtLoadingIndicator
        :height="6"
        :color="'repeating-linear-gradient(to right,#4067e9  0%,#264cc8 50%,#1b368f 100%)'"
        :throttle="50" />
    <slot />
  </div>
</template>

<script setup></script>

<style lang="scss"></style>
