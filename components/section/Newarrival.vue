<template>
  <div class="flex bg-soft-dark">
    <div class="f-ull relative flex basis-2/5 flex-col justify-center pl-12">
      <img
        src="/new_arrival_1.jpg"
        alt="new arrival"
        class="absolute left-0 top-0 h-full w-full object-cover" />
      <div class="relative z-10 text-white max-w-lg">
        <h2 class="font-cormorant text-8xl uppercase mb-4">
          New <br />
          Arrival
        </h2>
        <p class="text-sm mb-8">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolorem sint, doloribus alias repudiandae dolore
          fugiat, error, corrupti beatae natus delectus libero blanditiis deserunt magni ex cum. Culpa illum soluta
          cumque.
        </p>
        <NuxtLink to="/catalog" class="hover:text-secondary transition-colors">ПЕРЕГЛЯНУТИ КОЛЕЦІЮ</NuxtLink>
      </div>
    </div>
    <div class="flex grow place-content-center py-12">
      <div class="bg-white p-28">
        <div class="relative">
          <img
            src="/new_arrival_2.jpg"
            alt="new arrival"
            class="" />
          <p class="absolute bottom-4 left-1/2 w-full -translate-x-1/2 px-6 text-center text-sm text-white">
            Lorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipLorem ipsumLorem ip
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss"></style>
