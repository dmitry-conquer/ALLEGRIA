import VueGoogleMaps from "@fawmi/vue-google-maps";

export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.vueApp.use(VueGoogleMaps, {
    load: {
      key: "AIzaSyAJ4arQW9B-XL3MvyNPP0RPxFcEAVIHf78",
      libraries: "places"
    },
  });
});
