import type { User } from "./user";
import type { Product } from "./product";

type OrderInfo = {
  id: number;
  delivered: boolean;
  created_at: Date;
  deliveryMethod: string;
  additional_info: string;
  Product: Array<Product>;
};

export type Order = OrderInfo & Omit<User, "id">;
