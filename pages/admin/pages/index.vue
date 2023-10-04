<template>
  <div>
    <AdminBaseTitle title="Сторінки" />
    <div class="grid grid-cols-[repeat(4,_1fr)] gap-6">
      <div
        v-for="(page, index) in pages"
        :key="index"
        class="rounded-md bg-white p-4 shadow-md">
        <div class="mb-6">
          <h2 class="mb-2 text-2xl font-medium">{{ page.name }}</h2>
          <h3 class="mb-2 font-medium">{{ page.title }}</h3>
          <p class="line-clamp-3 text-sm">{{ page.description }}</p>
        </div>
        <div class="flex gap-2">
          <NuxtLink
            class="grow rounded-md bg-admin-primary-light px-3 py-2 text-center text-sm text-white transition-colors hover:bg-admin-primary-light/80"
            :to="page.originalLink"
            >Переглянути</NuxtLink
          >
          <NuxtLink
            class="grow rounded-md border bg-white border-admin-primary-light px-3 py-2 text-center text-sm text-admin-primary-light"
            :to="page.editLink"
            >Редагувати</NuxtLink
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const pages = [
  {
    name: "Головна",
    originalLink: "/",
    editLink: "/admin/pages/home",
    title: "Allegria | Магазин жіночого одягу",
    description:
      "Allegria - ваш унікальний інтернет-магазин брендового одягу. Відкрийте для себе найсвіжіші та найстильніші колекції від улюблених дизайнерів і зробіть свій гардероб ще більш елегантним та стильним.",
  },
  {
    name: "Про нас",
    originalLink: "/about",
    editLink: "/admin/pages/about",
    title: "Allegria | Магазин жіночого одягу",
    description:
      "Allegria - ваш унікальний інтернет-магазин брендового одягу. Відкрийте для себе найсвіжіші та найстильніші колекції від улюблених дизайнерів і зробіть свій гардероб ще більш елегантним та стильним.",
  },
  {
    name: "Каталог",
    originalLink: "/catalog",
    editLink: "/admin/pages/catalog",
    title: "Каталог | Allegria",
    description:
      "Каталог Allegria. Ваш унікальний інтернет-магазин брендового одягу. Відкрийте для себе найсвіжіші та найстильніші колекції від улюблених дизайнерів і зробіть свій гардероб ще більш елегантним та стильним.",
  },
  {
    name: "Бренди",
    originalLink: "/brands",
    editLink: "/admin/pages/brands",
    title: "Allegria | Магазин жіночого одягу",
    description:
      "Allegria - ваш унікальний інтернет-магазин брендового одягу. Відкрийте для себе найсвіжіші та найстильніші колекції від улюблених дизайнерів і зробіть свій гардероб ще більш елегантним та стильним.",
  },
];
</script>
