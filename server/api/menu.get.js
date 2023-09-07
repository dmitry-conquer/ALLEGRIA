import { serverSupabaseClient } from "#supabase/server";

export default eventHandler(async event => {
  const client = await serverSupabaseClient(event);

  const { data: categories } = await client.from("categories").select("*, type(*)");
  const { data: types } = await client.from("clothes_type").select("*");

  return { categories, types };
});
