<template>
  <div class="">
    <div class="mb-6 flex gap-2">
      <!-- size -->
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

      <!-- price -->
      <FilterDropdown
        text="Ціна"
        class="">
        <div class="flex flex-col justify-center p-2">
          <Slider
            v-model="value"
            :merge="merge"
            :tooltips="false"
            :lazy="false"
            :max="max"
            :min="min" />
          <div class="mt-4 flex items-center gap-2">
            <input
              type="text"
              v-model="value[0]"
              class="w-full border p-1 text-sm leading-none focus:outline-none" />
            <span class="text-gray-400">—</span>
            <input
              type="text"
              v-model="value[1]"
              class="w-full border p-1 text-sm leading-none focus:outline-none" />
          </div>
          <button
            class="text mt-4 border bg-white px-2 py-1 text-base transition-colors hover:bg-secondary hover:text-white"
            type="button">
            Застосувати
          </button>
        </div>
      </FilterDropdown>
    </div>
  </div>
</template>

<script setup>
import Slider from "@vueform/slider";
import "@vueform/slider/themes/default.css";
const route = useRoute();
const router = useRouter();

const value = ref([100, 2500]);
const max = ref(2500);
const min = ref(100);
const merge = ref(2);
const sizes = ["32", "34", "36", "38", "40", "42"];

const updateQuery = size => {
  const currentQuery = { ...route.query };
  currentQuery.size = size;
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
