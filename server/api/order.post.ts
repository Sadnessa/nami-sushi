import { serverSupabaseClient } from "#supabase/server";
import { serverSupabaseUser } from "#supabase/server";

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient(event);
  const user = await serverSupabaseUser(event);

  const body = await readBody(event);
  const orderBody = {
    name: body.name,
    address: body.address,
    phone: body.phone,
    additional_info: body.additional_info,
    user_id: user ? user.id : null,
  };

  const { data } = await client.from("Order").insert([orderBody]).select();
  if (data) {
    const orderProducts = body.orderedProducts.map((el) => {
      return {
        order_id: data[0].id,
        product_id: el.id,
        amount: el.amount,
      };
    });
    const {} = await client.from("OrderProduct").insert(orderProducts);
  }
});
