<template>
  <div class="py-32">
    <h1 class="text-center text-4xl font-bold uppercase text-blue-500">TEST PAGE</h1>
    <div class="container">
      <h2 class="text-center text-2xl font-bold uppercase text-indigo-500">1. SUPABASE SDK ONLY</h2>
      <div>
        <ul class="flex flex-wrap gap-8">
          <li
            v-for="p in comments1"
            :key="p.id">
            <p>{{ p.name }}</p>
            <p>{{ p.body }}</p>
          </li>
        </ul>
      </div>
      <hr />
      <h2 class="text-center text-2xl font-bold uppercase text-indigo-500">1. useFetch in components</h2>
      <div>
        <ul class="flex flex-wrap gap-8">
          <li
            v-for="p in comments2"
            :key="p.id">
            <p>{{ p.name }}</p>
            <p>{{ p.body }}</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
const client = useSupabaseClient();

const { data: comments1 } = useFetch("https://jsonplaceholder.typicode.com/comments", {
  lazy: true,
});

const { data: comments2 } = useFetch("https://jsonplaceholder.typicode.com/comments", {});
</script>
