import { serverSupabaseClient, serverSupabaseUser } from "#supabase/server";

export default eventHandler(async event => {
  const client = await serverSupabaseClient(event);
  const user = await serverSupabaseUser(event);

  if (event.req.method === "GET") {
    const query = client.from("users").select("*").eq("user_id", user.id).single();
    const { data } = await query;
    return data;
  }
  if (event.req.method === "POST") {
    const body = await readBody(event);
    const { data } = await client.from("users").update(body).eq("user_id", user.id).select();
    return data;
  }
});
