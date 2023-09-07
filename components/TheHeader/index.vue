<template>
  <header class="fixed left-0 top-0 z-50 w-full bg-white">
    <div class="container flex h-20 items-center justify-between">
      <NuxtLink to="/">
        <Logo />
      </NuxtLink>
      <div class="group py-8">
        <button
          type="button"
          class="group-hover:text-secondary transition-colors uppercase tracking-widest">
          КАТАЛОГ
        </button>
        <TheHeaderMenu class="group-hover:opacity-100 group-hover:visible opacity-0 invisible duration-300" />
      </div>


      <TheHeaderSearch/>
      <div class="flex items-center gap-5">
        <NuxtLink to="/profile">
          <IconProfile class="h-6 w-6 " />
        </NuxtLink>
        <NuxtLink to="/favorites">
          <IconFavorite class="h-6 w-7 " />
        </NuxtLink>
        <NuxtLink to="/cart">
          <IconCart class="h-6 w-6 " />
        </NuxtLink>
      </div>
    </div>
  </header>
</template>

<script setup></script>

<style lang="scss"></style>
