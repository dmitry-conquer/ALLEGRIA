import { serverSupabaseClient } from "#supabase/server";

export default eventHandler(async event => {
  const client = await serverSupabaseClient(event);

  const { product_id } = event.context.params;
  const { data } = await client.from("products").select("*, category(name)").eq("id", product_id);

  return data;
});
