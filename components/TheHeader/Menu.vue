<template>
  <div class="fixed left-0 top-20 z-50 w-full bg-white transition-all">
    <div class="flex justify-center divide-x border-b border-t">
      <div
        v-for="t in types"
        class="px-16 py-12">
        <h2 class="mb-5 font-medium uppercase">{{ t.name }}</h2>
        <ul class="space-y-2">
          <li
            v-for="category in categories.filter(cat => cat.type.id === t.id)"
            :key="category.id">
            <button
              @click="navigateTo({ path: `/catalog`, query: { category: category.id } })"
              class="flex items-center gap-1 transition-all hover:text-secondary">
              {{ category.name }}
            </button>
          </li>
        </ul>
      </div>
    </div>
    <div class="flex justify-center gap-40 py-4">
      <NuxtLink
        v-for="collection in collectionsList"
        :key="collection.name"
        to="/catalog"
        class="text-sm transition-colors hover:text-secondary">
        {{ collection.name }}
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
const categories = ref();
const types = ref();

const { data } = await useFetch("/api/menu/");
categories.value = data.value.categories;
types.value = data.value.types;

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

const menu = [
  {
    category: "Одяг",
    items: [
      {
        name: "Футболки та топи",
        link: "/clothes",
      },
      {
        name: "Пальто",
        link: "/clothes",
      },
      {
        name: "Куртки",
        link: "/clothes",
      },
      {
        name: "Світшоти та худі",
        link: "/clothes",
      },
      {
        name: "Легінси",
        link: "/clothes",
      },
      {
        name: "Сорочки",
        link: "/clothes",
      },
      {
        name: "Комбінезони",
        link: "/clothes",
      },
      {
        name: "Плащі",
        link: "/clothes",
      },
      {
        name: "Вітровки",
        link: "/clothes",
      },
    ],
  },
  {
    category: "Взуття",
    items: [
      {
        name: "Кросівки",
        link: "/clothes",
      },
      {
        name: "Шльопанці",
        link: "/clothes",
      },
      {
        name: "Кеди",
        link: "/clothes",
      },
      {
        name: "Туфлі",
        link: "/clothes",
      },
    ],
  },
  {
    category: "Аксесуари",
    items: [
      {
        name: "Головні убори",
        link: "/clothes",
      },
      {
        name: "Рукавички",
        link: "/clothes",
      },
      {
        name: "Шарфи та хустки",
        link: "/clothes",
      },
      {
        name: "Шкарпетки",
        link: "/clothes",
      },
      {
        name: "Гетри",
        link: "/clothes",
      },
      {
        name: "Окуляри",
        link: "/clothes",
      },
      {
        name: "Прикраси",
        link: "/clothes",
      },
    ],
  },
  {
    category: "Білизна",
    items: [
      {
        name: "Труси",
        link: "/clothes",
      },
      {
        name: "Боді",
        link: "/clothes",
      },
      {
        name: "Бюстгальтери",
        link: "/clothes",
      },
      {
        name: "Колготки",
        link: "/clothes",
      },
    ],
  },
];
</script>

<style lang="scss"></style>
