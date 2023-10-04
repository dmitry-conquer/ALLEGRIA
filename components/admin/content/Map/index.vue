<template>
  <div class="w-full overflow-auto rounded-md rounded-b-none border border-gray-200 shadow-md">
    <table class="w-full">
      <thead class="border-b border-gray-200 bg-admin-secondary-light">
        <tr>
          <th class="whitespace-nowrap p-4 text-left text-sm font-normal">#</th>
          <th class="whitespace-nowrap p-4 text-left text-sm font-normal">Назва</th>
          <th class="whitespace-nowrap p-4 text-left text-sm font-normal">Позиція</th>
          <th class="whitespace-nowrap p-4 text-left text-sm font-normal">Час роботи</th>
          <th class="whitespace-nowrap p-4 text-left text-sm font-normal">Рейтинг</th>
          <th class="whitespace-nowrap p-4 text-left text-sm font-normal">Налаштування</th>
        </tr>
      </thead>
      <tbody class="divide-y bg-white">
        <tr
          v-for="(marker, index) in markers"
          :key="marker.id">
          <td class="whitespace-nowrap p-4 text-sm">{{ +index + 1 }}</td>
          <td class="max-w-sm truncate whitespace-nowrap p-4 text-sm">{{ marker.description }}</td>
          <td class="whitespace-nowrap p-4 text-sm">
            <div class="flex flex-col gap-2 text-sm">
              <p>{{ marker.position.lat }}</p>
              <p>{{ marker.position.lng }}</p>
            </div>
          </td>
          <td class="whitespace-nowrap p-4 text-sm">
            {{ marker.data.workTime }}
          </td>
          <td class="whitespace-nowrap p-4 text-sm">{{ marker.data.rate }}</td>
          <td class="whitespace-nowrap p-4 text-sm text-admin-text">
            <AdminBaseTableActionsEditButton @edit-item="(currentMarker = marker), bodyLock()" />
            <AdminBaseTableActionsDeleteButton @delete-item="onDeleteMarker(marker.id)" />
          </td>
        </tr>
      </tbody>
    </table>
    <Transition name="fade">
      <LazyAdminBaseModal
        v-if="currentMarker"
        size="md"
        @close-modal="currentMarker = null">
        <AdminContentMapEditDialog
          :marker="currentMarker"
          @update-markers="onUpdateMarkers" />
      </LazyAdminBaseModal>
    </Transition>
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

const markers = ref(structuredClone(toRaw(props.sectionData)));
const currentMarker = ref(null);

async function onUpdateMarkers(updatedMarker) {
  currentMarker.value = null;
  const index = markers.value.findIndex(marker => marker.id === updatedMarker.id);
  if (index !== -1) {
    markers.value[index] = updatedMarker;
    const result = await useAdminUpdateTable("home_page", { section_content: markers.value }, "section_name", "map");
    if (result) {
      refreshNuxtData();
    }
  }
}
//  async function onDeleteItem(id) {
//    const success = await useAdminDeleteItem("products", id);
//    if (!success) {
//      console.log("error");
//      return;
//    }
//    refreshNuxtData();
//  }
</script>
