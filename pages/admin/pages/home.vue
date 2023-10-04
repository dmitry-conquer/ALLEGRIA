<template>
  <div
    v-if="data"
    class="space-y-16">
    <AdminContentHeroSlider :section-data="heroSliderData" />
    <AdminContentNewArrival :section-data="newArrivalData" />
    <AdminContentMap :section-data="mapData" />
  </div>
</template>

<script setup>
const client = useSupabaseClient();

const { data, error } = await useAsyncData("home_page", async () => {
  const { data, error } = await client.from("home_page").select("*");
  if (error) {
    throw error;
  }
  return data;
});
if (!data.value || error.value) {
  throw createError({ statusCode: 404, statusMessage: "Page not found...Ooops :(", fatal: true });
}
const heroSliderData = ref(data.value?.find(row => row.section_name === "hero_slider")?.section_content);
const newArrivalData = ref(data.value?.find(row => row.section_name === "new_arrival")?.section_content);
const mapData = ref(data.value?.find(row => row.section_name === "map")?.section_content);
</script>
