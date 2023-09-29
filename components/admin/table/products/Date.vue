<template>
  <div>
    {{ formatedDate }}
  </div>
</template>

<script setup>
const props = defineProps({
  dateString: {
    type: String,
    required: true,
  },
});

const formatedDate = computed(() => {
  const date = new Date(props.dateString);
  const formatDatePart = part => part.toString().padStart(2, "0");
  const formattedDate = `${formatDatePart(date.getDate())}.${formatDatePart(
    date.getMonth() + 1,
  )}.${date.getFullYear()} / ${formatDatePart(date.getHours())}:${formatDatePart(date.getMinutes())}`;
  return formattedDate;
});
</script>
