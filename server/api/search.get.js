import { serverSupabaseClient } from "#supabase/server";

export default eventHandler(async event => {
  const client = await serverSupabaseClient(event);

  const { search } = getQuery(event);
  const { data } = await client.from("products").select("name").textSearch("name", search, {
   type: 'websearch',
  });
  console.log(data);
  return data;
});
