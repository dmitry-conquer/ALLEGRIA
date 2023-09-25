<template>
  <div>
    <SectionBrandsHeroVideo class="mb-28" />
    <SectionBrandsAbout class="mb-28" />
    <SectionBrandsHeroStatic
      :title="fistSection.title"
      :description="fistSection.description"
      :image="fistSection.image"
      class="mb-28" />
    <SectionBrandsAboutReverse class="mb-28" />
    <SectionBrandsHeroStatic
      :title="secondSection.title"
      :description="secondSection.description"
      :image="secondSection.image"
      class="mb-28" />
  </div>
</template>

<script setup>
const fistSection = {
  title: "DEHA",
  description:
    "Бренд DEHA належить компанії Meeting Group SpA, яка є лідером на італійському ринку спортивного одягу преміум-класу.",
  image: "/brand/hero2.jpg",
};
const secondSection = {
  title: "george gina & lucy",

  description:
    "Бренд заснований у 2004 році недалеко від Франкфурта, коли подружжя Ніколь Бейлі та Ніколас Нойхаус разом з Олівером Брюном випустили свою першу і дуже вдалу колекцію сумок, кожна з яких мала своє ім'я.",
  image: "/brand/hero3.jpg",
};
</script>
