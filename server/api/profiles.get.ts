import { serverSupabaseClient } from "#supabase/server";
import { serverSupabaseUser } from "#supabase/server";

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient(event);
  const user = await serverSupabaseUser(event);
  if (user) {
    const { data } = await client
      .from("User")
      .select("*")
      .eq("id", String(user.id));
    if (data) {
      data[0].email = user.email;
      return data[0];
    }
  } else {
    //throw new Error("Authorization error!");
  }
});
