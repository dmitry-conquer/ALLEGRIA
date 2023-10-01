<template>
  <div
    class="flex items-center justify-center gap-20 rounded-md rounded-t-none border border-t-0 border-gray-200 bg-gray-50 px-4 pb-6 pt-10">
    <div class="flex items-center gap-3">
      <p class="text-sm text-gray-500">Товарів на сторінці</p>
      <input
        @change="onItemPerPageUpdate"
        v-model="itemPerPage"
        type="number"
        class="text w-10 border-b border-gray-500 bg-transparent text-center text-sm text-gray-500 focus:border-admin-brand focus:outline-none" />
    </div>
    <div>
      <p class="text-sm text-gray-500">{{ from }}-{{ to }} з {{ count }}</p>
    </div>
    <div class="flex items-center gap-4">
      <button
        @click="prevPage"
        :disabled="isFirstPage"
        class="group rounded-lg p-2 transition-colors hover:bg-gray-200 disabled:opacity-30"
        type="button">
        <AdminIconArrow class="h-5 w-5 rotate-180 text-gray-500 transition-colors group-hover:text-admin-brand" />
      </button>
      <button
        @click="nextPage"
        :disabled="isLastPage"
        class="group rounded-lg p-2 transition-colors hover:bg-gray-200 disabled:opacity-30"
        type="button">
        <AdminIconArrow class="h-5 w-5 text-gray-500 transition-colors group-hover:text-admin-brand" />
      </button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  range: {
    type: Array,
    required: true,
    default: [],
    validator: arr => arr.length === 2,
  },
});

const client = useSupabaseClient();
const router = useRouter();
const route = useRoute();

const { data: count } = await useAsyncData(
  "count",
  async () => {
    const { count } = await client.from("products").select("*", { count: "exact", head: true });
    return count;
  },
  {
    lazy: true,
  },
);
const itemPerPage = ref(+route.query.perPage || 5);
const page = computed(() => +route.query.page || 1);

function prevPage() {
  const query = { ...route.query, page: page.value - 1 };
  router.push({
    query,
  });
}

function nextPage() {
  const query = { ...route.query, page: page.value + 1 };
  router.push({
    query,
  });
}

function onItemPerPageUpdate() {
  if (itemPerPage.value <= 0) {
    itemPerPage.value = 1;
  }
  if (itemPerPage.value >= count.value) {
    itemPerPage.value = count.value;
  }
  const query = { ...route.query, perPage: itemPerPage.value };
  router.push({
    query,
  });
}

const from = computed(() => {
  return props.range[0] + 1;
});

const to = computed(() => {
  return props.range[1] > count.value ? count.value : props.range[1] + 1;
});

const isFirstPage = computed(() => {
  return page.value === 1;
});

const isLastPage = computed(() => {
  return to.value === count.value;
});
</script>
