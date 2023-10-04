<template>
  <div>
    <div>
      <AdminContentHeroSliderHeader @create-slide="onCreateSlide" />
    </div>
    <div class="w-full overflow-auto rounded-md rounded-b-none border border-gray-200 shadow-md">
      <table class="w-full">
        <thead class="border-b border-gray-200 bg-admin-secondary-light">
          <tr>
            <th class="whitespace-nowrap p-4 text-left text-sm font-normal">#</th>
            <th class="whitespace-nowrap p-4 text-left text-sm font-normal">Текст</th>
            <th class="whitespace-nowrap p-4 text-left text-sm font-normal">Посилання</th>
            <th class="whitespace-nowrap p-4 text-left text-sm font-normal">Зображення</th>
            <th class="whitespace-nowrap p-4 text-left text-sm font-normal">Налаштування</th>
          </tr>
        </thead>
        <tbody class="divide-y bg-white">
          <tr
            v-for="(row, index) in slides"
            :key="row.id">
            <td class="whitespace-nowrap p-4 text-sm">{{ +index + 1 }}</td>
            <td class="max-w-sm truncate whitespace-nowrap p-4 text-sm">{{ row.title }}</td>
            <td class="whitespace-nowrap p-4 text-sm">{{ row.link }}</td>
            <td class="whitespace-nowrap p-4 text-sm">
              <NuxtImg
                :src="row.image"
                format="webp"
                width="50"
                height="50"
                class="h-10 w-10 overflow-hidden rounded-full object-cover" />
            </td>
            <td class="whitespace-nowrap p-4 text-sm text-admin-text">
              <AdminBaseTableActionsEditButton @edit-item="(currentSlide = row), bodyLock()" />
              <AdminBaseTableActionsDeleteButton @delete-item="onDeleteSlide(row.id)" />
            </td>
          </tr>
        </tbody>
      </table>
      <Transition name="fade">
        <LazyAdminBaseModal
          v-if="currentSlide"
          @close-modal="currentSlide = null">
          <AdminContentHeroSliderEditDialog
            @update-slides="onUpdateSlides"
            :current-slide="currentSlide" />
        </LazyAdminBaseModal>
      </Transition>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  sectionData: {
    type: Array,
    required: true,
    default: [],
    validator: arr => arr.length > 0,
  },
});
const slides = ref(structuredClone(toRaw(props.sectionData)));
const currentSlide = ref(null);

async function onCreateSlide(slide) {
  slides.value.push(slide);
  const result = await useAdminUpdateTable(
    "home_page",
    { section_content: slides.value },
    "section_name",
    "hero_slider",
  );
  if (result) {
    refreshNuxtData();
  }
}

async function onUpdateSlides(newSlide) {
  currentSlide.value = null;
  const index = slides.value.findIndex(slide => slide.id === newSlide.id);
  if (index !== -1) {
    slides.value[index] = newSlide;
    const result = await useAdminUpdateTable(
      "home_page",
      { section_content: slides.value },
      "section_name",
      "hero_slider",
    );
    if (result) {
      refreshNuxtData();
    }
  }
}

async function onDeleteSlide(id) {
  const index = slides.value.findIndex(slide => slide.id === id);
  if (index !== -1) {
    slides.value.splice(index, 1);
    const result = await useAdminUpdateTable(
      "home_page",
      { section_content: slides.value },
      "section_name",
      "hero_slider",
    );
    if (result) {
      refreshNuxtData("home_page");
    }
  }
}
</script>
