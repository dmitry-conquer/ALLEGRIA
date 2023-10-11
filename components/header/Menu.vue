<template>
  <div
    class="fixed left-0 top-20 z-50 w-full overflow-auto bg-white shadow-md max-lg:h-screen max-lg:max-w-[320px] max-lg:pb-32">
    <div
      class="relative flex flex-col justify-center divide-x overflow-auto max-lg:pt-8 lg:flex-row lg:border-b lg:border-t">
      <button
        @click="emit('close-menu')"
        class="absolute right-4 top-1"
        type="button">
        <IconClose class="h-7 w-7 stroke-primary-dark" />
      </button>
      <div
        v-for="t in types"
        class="px-6 py-2 pr-24 lg:px-16 lg:py-12">
        <div
          role="button"
          @click="handleSpoiler"
          class="flex items-center justify-between">
          <h2 class="pointer-events-none mb-0 font-medium uppercase lg:mb-5">
            {{ t.name }}
          </h2>
          <div class="cross pointer-events-none lg:hidden">
            <span
              class="block h-0.5 w-3 translate-y-0.5 rotate-90 rounded-xl bg-primary-dark transition duration-300"></span>
            <span class="block h-0.5 w-3 rounded-xl bg-primary-dark transition duration-300"></span>
          </div>
        </div>
        <div class="max-lg:max-h-0 max-lg:overflow-hidden max-lg:transition-all max-lg:duration-300">
          <ul class="space-y-2 pt-3">
            <li
              v-for="category in categories.filter(cat => cat.type.id === t.id)"
              :key="category.id"
              class="max-lg:py-1">
              <button
                @click="navigateTo({ path: `/catalog` }), emit('close-menu')"
                class="flex items-center gap-1 transition-all hover:text-secondary">
                {{ category.name }}
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="mx-auto flex max-w-4xl flex-col items-center py-4 lg:flex-row lg:justify-between">
      <NuxtLink
        v-for="collection in collectionsList"
        :key="collection.name"
        to="/catalog"
        class="text-sm transition-colors hover:text-secondary max-lg:py-1">
        {{ collection.name }}
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
const client = useSupabaseClient();
const handleSpoiler = e => {
  useSpoiler(e);
};

const emit = defineEmits({
  "close-menu": null,
});

const { data: categories } = await useAsyncData("caregories", async () => {
  const { data } = await client.from("categories").select("*, type(*)");
  return data;
});

const { data: types } = await useAsyncData("types", async () => {
  const { data } = await client.from("clothes_type").select("*");
  return data;
});

const collectionsList = [
  {
    name: "DEHA",
  },
  {
    name: "AMERICAN VINTAGE",
  },
  {
    name: "GEORGE GINA LUCY",
  },
  {
    name: "BIRKENSTOCK",
  },
];
</script>
