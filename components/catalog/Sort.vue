<template>
  <div class="flex flex-wrap gap-4 items-center justify-between">
    <span class="font-medium text-admin-text-light"><span>Товарів:</span> {{ quantity }} </span>
    <div class="flex  items-center gap-3">
      <span>Сортувати: </span>
      <select
        v-model="currentValue"
        @change="sortProducts($event.target.value)"
        name=""
        id=""
        class="border bg-white px-3 py-1 focus:outline-none">
        <option
          disabled
          value="placeholder">
          Без сортування
        </option>
        <option value="price">Ціна</option>
        <option value="popular">Популярність</option>
      </select>
    </div>
  </div>
</template>

<script setup>
defineProps({
  quantity: {
    type: [Number, String],
    required: true,
    default: "-",
  },
});

const route = useRoute();
const router = useRouter();
const currentValue = ref("placeholder");

const sortProducts = value => {
  const currentQuerry = { ...route.query };
  currentQuerry.sortBy = value;
  router.push({ query: currentQuerry });
};

watch(
  () => route.query.category,
  () => {
    currentValue.value = "placeholder";
  },
);
</script>

<style lang="scss"></style>
