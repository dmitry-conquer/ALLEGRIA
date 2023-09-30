<template>
  <div>
    <SectionHero class="mb-14 md:mb-28" />
    <SectionNewarrival class="mb-14 md:mb-28" />
    <SectionSlider
      class="mb-14 md:mb-28"
      title="популярне" />
    <GoogleMap />
    <SectionAbout class="mb-14 md:mb-28" />
  </div>
</template>

<script setup>
useSchemaOrg([
  defineWebSite({
    name: 'Allegria | Магазин жіночого одягу',
  }),
  defineWebPage(),
])

definePageMeta({
  pageTransition: {
    name: "page",
    mode: "out-in",
  },
});
useSeoMeta({
  title: `Allegria | Магазин жіночого одягу`,
  keywords: "Allegria, магазин, жіночий одяг, брендовий одяг, стиль, одежа жіноча, syjxbq jlzu",
  description:
    "Allegria - ваш унікальний інтернет-магазин брендового одягу. Відкрийте для себе найсвіжіші та найстильніші колекції від улюблених дизайнерів і зробіть свій гардероб ще більш елегантним та стильним.",
  ogUrl: `https://allegria.shop/`,
  ogType: "website",
  ogTitle: `Allegria | Магазин жіночого одягу`,
  ogImage: "https://example.com/image.png",
  ogLocale: "uk_UA",
  ogSiteName: "Allegria", 
  ogDescription:
    "Allegria - ваш унікальний інтернет-магазин жіночого одягу. Відкрийте для себе найсвіжіші та найстильніші колекції від улюблених дизайнерів і зробіть свій гардероб ще більш елегантним та стильним.",
  twitterCard: "summary_large_image",
  twitterDescription:
    "Allegria - ваш унікальний інтернет-магазин жіночого одягу. Відкрийте для себе найсвіжіші та найстильніші колекції від улюблених дизайнерів і зробіть свій гардероб ще більш елегантним та стильним.",
  twitterImage: "https://example.com/image.png", 
  twitterTitle: `Allegria | Магазин жіночого одягу`,
});

useHead({
  link: [{ rel: "canonical", href: "https://allegria.shop/" }],
  htmlAttrs: { lang: "uk" },
});
</script>
