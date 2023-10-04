<template>
  <FilterDropdown
  :isOpen="isOpen"
    text="Ціна"
    class="">
    <div class="flex flex-col justify-center p-2">
      <Slider
        v-model="range"
        :merge="merge"
        :tooltips="false"
        :max="max"
        :min="min" />
      <div class="mt-4 flex items-center gap-2">
        <input
          type="text"
          v-model="range[0]"
          class="w-full border p-1 text-sm leading-none focus:outline-none" />
        <span class="text-admin-text-light">—</span>
        <input
          type="text"
          v-model="range[1]"
          class="w-full border p-1 text-sm leading-none focus:outline-none" />
      </div>
      <button
        @click="updateQuery"
        class="text mt-4 border bg-white px-2 py-1 text-base transition-colors hover:bg-secondary hover:text-white"
        type="button">
        Застосувати
      </button>
    </div>
  </FilterDropdown>
</template>

<script setup>
import Slider from "@vueform/slider";
import "@vueform/slider/themes/default.css";

const route = useRoute();
const router = useRouter();

const range = ref([100, 2500]);
const max = ref(2500);
const min = ref(100);
const merge = ref(2);

const updateQuery = () => {
  const currentQuery = { ...route.query };
  currentQuery.from = range.value[0];
  currentQuery.to = range.value[1];
  router.push({
    query: currentQuery,
  });
};
</script>

<style lang="scss">
.slider-connect {
  background: #e64926;
}
.slider-tooltip {
  background: #e64926;
  border-color: #e64926;
}
.slider-handle:focus {
  box-shadow: 0.5px 0.5px 2px 1px #e6492683;
}
</style>
