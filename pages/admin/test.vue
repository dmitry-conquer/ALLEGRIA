<template>
  <div>
    <AdminBaseTable
      :table-head="tableHead"
      :table-data="tableData" />
  </div>
</template>

<script setup>
const client = useSupabaseClient();
const tableHead = ["#", "Назва", "Дата створення", "Лейбл", "Ціна", "Категорія", "Зображення", "Налаштування"];

const { data: tableData } = await useAsyncData("table_data_products", async () => {
  const { data } = await client.from("products").select("*, category(*)");
  return data;
});
console.log(tableData.value);
</script>

<style lang="scss"></style>
