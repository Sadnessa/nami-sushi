import { serverSupabaseClient } from "#supabase/server";
import type { User } from "~/types/user";

type RequestBody = Omit<User, "id"> & { email: string; password: string };

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient<User>(event);
  const body = await readBody<RequestBody>(event);

  const { data: registerData, error: registerError } = await client.auth.signUp(
    {
      email: body.email,
      password: body.password,
    }
  );

  if (registerError) {
    throw new Error(`${registerError.message}`);
  }

  const { data, error } = await client
    .from("User")
    .insert([
      { id: registerData.user?.id, name: body.name, phone: body.phone },
    ]);
});
