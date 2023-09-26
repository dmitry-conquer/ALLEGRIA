<template>
  <div>
    <SectionHeroAbout />
    <section class="mx-auto max-w-xl py-16 md:py-32">
      <h2 class="text-center font-cormorant text-xl sm:text-2xl px-4">
        American Vintage в першу чергу - це якісний трикотаж, витончена краса і безперечний крій.
      </h2>
    </section>
    <section class="mx-auto flex lg:flex-row flex-col max-w-7xl items-center justify-between gap-20 pb-10">
      <h2 class="sr-only">Приклади одягу</h2>
      <img
        src="/about/img1.jpg"
        alt="American Vintage"  />
      <img
        src="/about/img2.jpg"
        alt="American Vintage"
        class="lg:translate-x-16" />
    </section>
    <section class="container flex flex-col items-end pb-10 md:pb-40 pt-10 md:pt-20">
      <div class="w-full lg:w-5/6">
        <h2 class="mb-7 text-3xl font-bold uppercase">ПРО НАС</h2>
        <div class="mb-20 space-y-3 text-lg text-primary-dark/80">
          <p>
            Швидкі сумки George Gina & Lucy піднімають настрій і <br />
            своїм володаркам та оточуючим.
          </p>
          <p>
            Birkenstock – це взуття з м'якою ортопедичною устілкою, що дозволяє довгий <br />
            час перебувати у взутті не втомлюючись.
          </p>
          <p>
            Для всіх представлених у бутику брендів важливим пріоритетом є екологічна <br />
            безпека одягу та виробництва.
          </p>
        </div>
        <div class="flex lg:flex-row flex-col items-center gap-14 lg:gap-44">
          <img
            src="/about/img3.jpg"
            alt="" />
          <img
            src="/about/img4.jpg"
            alt="" />
        </div>
      </div>
    </section>
    <section class="bg-inherit bg-soft-light py-16 md:py-24">
      <div class="container">
        <h2 class="text-primary-dark/80 text-lg text-center max-w-2xl mx-auto">Для всіх представлених у бутику брендів важливим пріоритетом є екологічна безпека одягу та виробництва.</h2>
      </div>
    </section>
  </div>
</template>

<script setup>
definePageMeta({
  pageTransition: {
    name: "page",
    mode: "out-in",
  },
});
</script>
