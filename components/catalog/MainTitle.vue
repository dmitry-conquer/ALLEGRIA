<template>
  <h1 class="mb-12 text-3xl font-medium uppercase">{{ currentCategory }}</h1>
</template>

<script setup>
const props = defineProps({
  category: {
    type: String,
    required: true,
    default: "-",
  },
});
const client = useSupabaseClient();
const { data: categories } = await client.from("categories").select("*");

const currentCategory = computed(() => {
  const current = categories.filter(item => {
    return item.id === props.category;
  })[0]?.name;
  return current || "Всі товари";
});
</script>
