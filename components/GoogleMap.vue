<template>
  <div class="">
    <div class="container">
      <div class="max-w-3xl mx-auto mb-12 text-center">
        <h1 class="mb-4 text-2xl font-medium uppercase sm:text-3xl">Наші магазини</h1>
        <p>
          Наша фірма має 8 магазинів із жіночим брендовим одягом, що розташовані в різних районах Києва. Кожен із цих
          магазинів має свій унікальний стиль та спеціалізацію, проте всі вони об'єднуються загальною метою: надавати
          клі єнткам стильні та модні рішення для їхнього гардеробу.
        </p>
      </div>
      <div>
        <ClientOnly>
          <div class="mb-20">
            <GMapAutocomplete
              class="mb-6 w-full border p-2 focus:outline-none"
              placeholder="Пошук магазинів"
              @place_changed="setPlace"
              :options="{
                bounds: {
                  north: 50.590798,
                  south: 50.213273,
                  east: 30.825447,
                  west: 30.23944,
                },
                strictBounds: true,
              }">
            </GMapAutocomplete>
            <GMapMap
              style="width: 100%; height: 500px"
              :center="center"
              :zoom="zoomValue"
              :options="{
                zoomControl: true,
                mapTypeControl: false,
                scaleControl: false,
                streetViewControl: false,
                rotateControl: false,
                fullscreenControl: false,
                mapId: '3b4c27ebd22bdc7a',
              }">
              <GMapCluster
                :zoomOnClick="true"
                :minimumClusterSize="3"
                :styles="clusterStyles">
                <GMapMarker
                  v-for="marker in markers"
                  :key="marker.id"
                  :position="marker.position"
                  :clickable="true"
                  :draggable="false"
                  @click="openMarker(marker.id)"
                  :icon="{
                    url: 'https://cdn-icons-png.flaticon.com/128/1476/1476753.png',
                    scaledSize: { width: 37, height: 37 },
                    labelOrigin: { x: 16, y: -10 },
                  }">
                  <GMapInfoWindow :opened="openedMarkerID === marker.id" class="max-w-sm">
                    <div
                      v-if="openedMarkerID === marker.id"
                      class="">
                      <h3 class="mb-2 text-xl font-medium">Магазин №{{ marker.data.name }}</h3>
                      <p class="mb-4">
                        {{ marker.data.description }}
                      </p>
                      <div>
                        <dl class="text-base">
                          <div class="flex gap-2">
                            <dt>Час роботи:</dt>
                            <dd>{{ marker.data.workTime }}</dd>
                          </div>
                          <div class="flex gap-2">
                            <dt>Рейтинг:</dt>
                            <dd class="flex items-center">
                              <span>{{ marker.data.rate }}</span> <IconStar class="h-5 w-5 pb-0.5 text-yellow-400" />
                            </dd>
                          </div>
                        </dl>
                      </div>
                    </div>
                  </GMapInfoWindow>
                </GMapMarker>
              </GMapCluster>
            </GMapMap>
          </div>
        </ClientOnly>
      </div>
    </div>
  </div>
</template>

<script setup>
const center = ref({ lat: 50.43941343851894, lng: 30.434876061 });

const zoomValue = ref(12);

const clusterStyles = ref([
  {
    url: "https://superstorefinder.net/support/wp-content/uploads/2015/07/m3.png",
    width: 50,
    height: 50,
    anchorText: [18, 1],
    anchorIcon: [27, 28],
    textColor: "#fff",
    textSize: 14,
  },
]);

const markers = ref([
  {
    description: "Store 1",
    id: "1",
    position: {
      lat: 50.43941343851894,
      lng: 30.434876061,
    },
    data: {
      name: "1",
      description:
        "Цей магазин спеціалізується на елегантному та стильному жіночому брендовому одязі. Магазин має сучасний дизайн і великий вибір вечірніх суконь та аксесуарів.",
      workTime: "09:00 - 19:00",
      rate: "5.0",
    },
  },
  {
    description: "Store 2",
    id: "2",
    position: {
      lat: 50.44229395027234,
      lng: 30.43085236259248,
    },
    data: {
      name: "2",
      description:
        "Цей магазин славиться своєю колекцією казкових весняних та літніх нарядів. Він пропонує свіжі та яскраві моделі відомих брендів.",
      workTime: "09:00 - 19:00",
      rate: "4.9",
    },
  },
  {
    description: "Store 3",
    id: "3",
    position: {
      lat: 50.43907563287194,
      lng: 30.426947066242917,
    },
    data: {
      name: "3",
      description:
        "Розташований в історичній частині міста, цей магазин відомий своєю колекцією класичного та вишуканого одягу для жінок. Тут можна знайти ділові костюми та аксесуари для робочих образів.",
      workTime: "09:00 - 19:00",
      rate: "4.1",
    },
  },
  {
    description: "Store 4",
    id: "4",
    position: {
      lat: 50.46438725480595,
      lng: 30.513162074129774,
    },
    data: {
      name: "4",
      description:
        "Цей магазин спеціалізується на молодіжному брендовому одязі. Він пропонує модні та неформальні наряди для молодих жінок та підлітків.",
      workTime: "09:00 - 19:00",
      rate: "4.2",
    },
  },
  {
    description: "Store 5",
    id: "5",
    position: {
      lat: 50.47031411736042,
      lng: 30.450110693055887,
    },
    data: {
      name: "5",
      description:
        "Розташований в елітному районі міста, цей магазин спеціалізується на розкішних вечірніх сукнях та аксесуарах. Це місце для тих, хто шукає вишуканість та розкош у своєму образі.",
      workTime: "09:00 - 19:00",
      rate: "4.8",
    },
  },
  {
    description: "Store 6",
    id: "6",
    position: {
      lat: 50.470144788739596,
      lng: 30.44997767326459,
    },
    data: {
      name: "6",
      description:
        "Магазин відомий своєю колекцією повсякденного та комфортного одягу. Тут можна знайти стильні джинси, светри та куртки.",
      workTime: "09:00 - 19:00",
      rate: "4.3",
    },
  },
  {
    description: "Store 7",
    id: "7",
    position: {
      lat: 50.47226135291386,
      lng: 30.469664602376273,
    },
    data: {
      name: "7",
      description:
        "Цей магазин спеціалізується на бохо-стилі та надає багато різноманітних аксесуарів та вбрання відомих брендів у цьому напрямку.",
      workTime: "09:00 - 19:00",
      rate: "4.7",
    },
  },
  {
    description: "Store 8",
    id: "8",
    position: {
      lat: 50.43804606848322,
      lng: 30.433350199352702,
    },
    data: {
      name: "8",
      description:
        "Магазин відомий своєю колекцією міського стилю. Тут можна знайти трендовий одяг та взуття для сучасних жінок.",
      workTime: "09:00 - 19:00",
      rate: "5.0",
    },
  },
]);
const openedMarkerID = ref(null);

const openMarker = id => {
  openedMarkerID.value = id;
};

const setPlace = place => {
  const location = place.geometry.location;
  center.value = { lat: location.lat(), lng: location.lng() };
  zoomValue.value = 16;
};
</script>

<style lang="scss">
.pac-icon.pac-icon-marker {
  display: none;
}
.pac-item {
  padding: 6px;
}
.pac-matched {
  color: #e64926;
}
.pac-container.pac-logo {
  &::after {
    display: none;
  }
}
.gm-style-iw.gm-style-iw-c {
   max-width: 260px !important;
}
</style>
