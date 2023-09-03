<template>
  <div class=" fixed left-0 top-20 z-50 w-full bg-white transition-all ">
    <div class="flex justify-center divide-x border-b border-t">
      <div
        v-for="section in menu"
        class="px-16 py-12">
        <h2 class="mb-5 font-medium uppercase">{{ section.category }}</h2>
        <ul class="space-y-2">
          <li v-for="item in section.items">
            <NuxtLink :to="item.link" class=" before:text-secondary flex items-center gap-1  hover:text-secondary transition-all">{{ item.name }}</NuxtLink>
          </li>
        </ul>
      </div>
    </div>
    <div class="flex justify-center gap-40 py-4">
      <NuxtLink
        v-for="collection in collectionsList"
        :key="collection.name"
        to="/catalog"
        class="text-sm hover:text-secondary transition-colors">
        {{ collection.name }}
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
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
