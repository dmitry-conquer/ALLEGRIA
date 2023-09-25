<template>
  <div class="py-32">
    <h1 class="text-center text-4xl font-bold uppercase text-blue-500">TEST PAGE</h1>
    <div class="container">
      <h2 class="text-center text-2xl font-bold uppercase text-indigo-500">1. SUPABASE SDK ONLY</h2>
      <div>
        <ul class="flex flex-wrap gap-8">
          <li
            v-for="p in products"
            :key="p.id">
            <p>{{ p.name }}</p>
            <img :src="p.image[0]" class="w-[100px] h-[130px]" alt="">
          </li>
        </ul>
      </div>
      <hr />
      <h2 class="text-center text-2xl font-bold uppercase text-indigo-500">1. useFetch in components</h2>
      <div>
        <ul class="flex flex-wrap gap-8">
          <li
            v-for="p in products2"
            :key="p.id">
            <p>{{ p.name }}</p>
            <img :src="p.image[0]" class="w-[100px] h-[130px]" alt="">
          </li>
        </ul>
      </div>
      <hr />
      <h2 class="text-center text-2xl font-bold uppercase text-indigo-500">1. useFetch in components</h2>
      <div>
        <ul class="flex flex-wrap gap-8">
          <li
            v-for="p in products3"
            :key="p.id">
            <p>{{ p.name }}</p>
            <img :src="p.image[0]" class="w-[100px] h-[130px]" alt="">
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
const client = useSupabaseClient();

const { data: products } = await client.from("products").select("*");

const { data: products2 } = await useAsyncData("products2", async () => {
  const { data } = await client.from("products").select("*");
  return data;
});

const { data: products3 } = await useAsyncData(
  "products3",
  async () => {
    const { data } = await client.from("products").select("*");
    return data;
  },
  {
    lazy: true,
  },
);
</script>
