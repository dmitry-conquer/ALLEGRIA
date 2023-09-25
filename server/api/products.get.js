import { serverSupabaseClient } from "#supabase/server";

export default eventHandler(async event => {
  const client = await serverSupabaseClient(event);

  const { category, size, total, ids, from, to } = getQuery(event);

  const query = client.from("products").select("*, category(name)");
  if (from && to) {
    query.gte("newPrice", from);
    query.lte("newPrice", to);
  }
  if (category) {
    query.eq("category", category);
  }
  if (size) {
    query.contains("sizes", [`${size}`]);
  }
  if (total) {
    query.limit(total);
  }
  if (ids) {
    query.in("id", ids);
  }

  const { data } = await query;

  return data;
});
