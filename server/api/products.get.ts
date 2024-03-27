import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const client = await serverSupabaseClient(event);

  const { data } = await client
    .from("Product")
    .select("*")
    .eq("type", String(query.type));

  return data;
});
