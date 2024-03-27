import { serverSupabaseClient } from "#supabase/server";
import { serverSupabaseUser } from "#supabase/server";

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient(event);
  const user = await serverSupabaseUser(event);
  if (user) {
    const { data } = await client
      .from("Order")
      .select("*, Product(*)")
      .eq("user_id", String(user.id));
    if (data) {
      return data;
    }
  } else {
    //throw new Error("Authorization error!");
  }
});
