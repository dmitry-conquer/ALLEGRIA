<template>
  <div class="w-full overflow-auto rounded-md rounded-b-none border border-gray-200 shadow-md">
    <table class="w-full">
      <thead class="border-b border-gray-200 bg-admin-secondary-light">
        <tr>
          <th
            v-for="(col, index) in tableHead"
            :key="index"
            class="whitespace-nowrap p-4 text-left text-sm font-normal">
            {{ col }}
          </th>
        </tr>
      </thead>
      <tbody class="divide-y bg-white">
        <tr
          v-for="(row, index) in tableData"
          :key="row.id">
          <td class="whitespace-nowrap p-4 text-sm">{{ +index + 1 }}</td>
          <td class="max-w-sm truncate whitespace-nowrap p-4 text-sm">{{ row.name }}</td>
          <td class="whitespace-nowrap p-4 text-sm">{{ useAdminDateFormater(row.created_at) }}</td>

          <td class="whitespace-nowrap p-4 text-sm">{{ row.label || "-" }}</td>
          <td class="whitespace-nowrap p-4 text-sm">
            <span class="text-admin-text-light line-through">{{ row.oldPrice }}</span> / {{ row.newPrice }}
          </td>
          <td class="whitespace-nowrap p-4 text-sm">{{ row.category.name }}</td>
          <td class="whitespace-nowrap p-4 text-sm">
            <AdminBaseTableImages
              :images="row.image"
              :title="row.name" />
          </td>
          <td class="whitespace-nowrap p-4 text-sm text-admin-text">
            <AdminBaseTableActionsEditButton @edit-item="currentItem = row" />
            <AdminBaseTableActionsDeleteButton @delete-item="onDeleteItem(row.id)" />
          </td>
        </tr>
      </tbody>
    </table>
    <Transition name="fade">
      <LazyAdminBaseModal
        v-if="currentItem"
        @close-modal="currentItem = null">
        <div>sadasdadas</div>
      </LazyAdminBaseModal>
    </Transition>
  </div>
</template>

<script setup>
defineProps({
  tableHead: {
    type: Array,
    required: true,
    default: [],
    validator: arr => arr.length > 0,
  },
  tableData: {
    type: Array,
    required: true,
    default: [],
    validator: arr => arr.length > 0,
  },
});

const currentItem = ref(null);

async function onDeleteItem(id) {
  const success = await useAdminDeleteItem("products", id);
  if (!success) {
    console.log("error");
    return;
  }
  refreshNuxtData();
}
</script>
