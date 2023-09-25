<template>
  <FilterDropdown
    text="Розмір"
    class="">
    <div class="grid auto-rows-[2.1rem] grid-cols-4 gap-2">
      <button
        v-for="size in sizes"
        @click="updateQuery(size)"
        :key="size"
        class="border p-2 text-sm leading-none transition-colors hover:bg-secondary hover:text-white"
        type="button">
        {{ size }}
      </button>
    </div>
  </FilterDropdown>
</template>

<script setup>
const route = useRoute();
const router = useRouter();
const sizes = ["32", "34", "36", "38", "40", "42"];

const updateQuery = size => {
  const currentQuery = { ...route.query };
  currentQuery.size = size;
  router.push({
    query: currentQuery,
  });
};
</script>
