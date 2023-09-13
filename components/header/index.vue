<template>
  <header class="fixed left-0 top-0 z-50 w-full bg-white">
    <div class="container flex h-20 items-center justify-between">
      <NuxtLink to="/">
        <Logo class="h-6 w-40" />
      </NuxtLink>
      <div class="group py-8">
        <NuxtLink
          to="/catalog"
          class="uppercase tracking-widest transition-colors group-hover:text-secondary">
          КАТАЛОГ
        </NuxtLink>
        <HeaderMenu
          class="pointer-events-none invisible opacity-0 duration-300 group-hover:pointer-events-auto group-hover:visible group-hover:opacity-100" />
      </div>
      <HeaderSearch />
      <div class="flex items-center gap-5">
        <HeaderProfile />
        <HeaderFavorites />
        <HeaderCart />
      </div>
    </div>
  </header>
</template>

<script setup></script>
