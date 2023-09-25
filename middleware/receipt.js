import { useOrderStore } from "~/stores/order";

export default defineNuxtRouteMiddleware((to, from) => {
  const { currentOrderID } = useOrderStore();

  if (!currentOrderID) {
    return navigateTo("/");
  }
});
