import { serverSupabaseClient } from "#supabase/server";
import { serverSupabaseUser } from "#supabase/server";
import type { User } from "~/types/user";

type RequestBody = Omit<User, "id"> & {
  email: string;
  password: string | undefined;
};

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient<User>(event);
  const user = await serverSupabaseUser(event);
  const body = await readBody<RequestBody>(event);

  const { data: updatedData, error: updatedError } =
    await client.auth.updateUser({
      email: body.email,
      password: body.password,
    });

  if (updatedError) {
    throw new Error(`${updatedError.message}`);
  }

  if (user) {
    const { data, error } = await client
      .from("User")
      .update([
        {
          id: updatedData.user?.id,
          name: body.name,
          phone: body.phone,
          address: body.address,
        },
      ])
      .eq("id", String(user.id));
  }
});
