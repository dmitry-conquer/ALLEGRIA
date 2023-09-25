import { useOrderStore } from "~/stores/order";

export async function useSaveOrder(body) {
  const orderStore = useOrderStore();
  const client = useSupabaseClient();
  const { data: result, error } = await client.from("orders").insert([body]).select();
  if (result) {
    alert("Ok!");
    orderStore.currentOrderID = body.order_id;
    navigateTo("/receipt");
  }
  if (error) {
    alert("Error!");
  }
}
