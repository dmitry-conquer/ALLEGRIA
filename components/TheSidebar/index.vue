<template>
  <div class="w-72 shrink-0">
    <nav class="divide-y">
      <button
        class="py-3 font-medium uppercase"
        type="button"
        @click="navigateTo({ path: '/catalog' })">
        ВСІ ТОВАРИ
      </button>
      <div
        v-for="t in types"
        :key="t.id"
        class="py-3">
        <div
          @click="showItems"
          role="button"
          class="cursor-poiner flex items-center justify-between">
          <h3 class="pointer-events-none font-medium uppercase">
            {{ t.name }}
          </h3>
          <div class="cross pointer-events-none">
            <span
              class="block h-0.5 w-3 translate-y-0.5 rotate-90 rounded-xl bg-primary-dark transition duration-300"></span>
            <span class="block h-0.5 w-3 rounded-xl bg-primary-dark transition duration-300"></span>
          </div>
        </div>
        <div class="max-h-0 overflow-hidden transition-all duration-300">
          <ul class="space-y-2 pt-3">
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
    </nav>
  </div>
</template>

<script setup>
const client = useSupabaseClient();
/*
  get data
*/

const { data: categories } = await client.from("categories").select("*, type(*)");
const { data: types } = await client.from("clothes_type").select("*");

/*
  dropdown
*/

const showItems = e => {
  const target = e.target;
  const nextSibling = target.nextElementSibling;
  target.classList.toggle("spoiler-is-open");
  nextSibling.style.maxHeight = nextSibling.style.maxHeight ? null : `${nextSibling.scrollHeight}px`;
};
</script>

<style lang="scss">
.spoiler-is-open {
  .cross {
    span {
      background-color: #e64926;
      &:nth-child(1) {
        transform: rotate(0);
      }
      &:nth-child(2) {
        opacity: 0;
      }
    }
  }
}
</style>
