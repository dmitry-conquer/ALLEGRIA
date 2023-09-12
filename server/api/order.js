import { serverSupabaseClient } from "#supabase/server";

export default eventHandler(async event => {
  const client = await serverSupabaseClient(event);

  if (event.req.method === "POST") {
    const body = await readBody(event);
    const { data } = await client.from("orders").insert([body]).select();
    return data;
  }
  if (event.req.method === "GET") {
    const { order_id } = getQuery(event);
    const { data } = await client.from("orders").select("*, user_id(*)").eq("order_id", order_id).single();
    return data;
  }
});
