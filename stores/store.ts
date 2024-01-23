import { defineStore } from "pinia";
import type { Product } from "../types/product";

type CartProduct = Product & { amount: number };

export const useAppStore = defineStore("app-store", {
  state: () => ({
    doShowCart: false,
    categories: [],
    userCart: [] as CartProduct[],
  }),

  actions: {
    async getCategories() {
      const { data: tabs } = await useFetch("/api/categories");
      if (tabs.value === null) {
        return;
      } else {
        this.categories = tabs.value;
      }
    },

    addToUserCart(product: Product) {
      return this.userCart.push({ ...product, amount: 1 });
    },

    removeFromUserCart(product: Product) {
      const selectedElementID = this.userCart.findIndex((el) => {
        return el.id === product.id;
      });

      this.userCart.splice(selectedElementID, 1);
    },

    increaseProductAmount(product: Product) {
      const selectedElementID = this.userCart.findIndex((el) => {
        return el.id === product.id;
      });

      this.userCart[selectedElementID].amount++;
    },

    decreaseProductAmount(product: Product) {
      const selectedElementID = this.userCart.findIndex((el) => {
        return el.id === product.id;
      });

      const selectedEl = this.userCart.find((el) => {
        return el.id === product.id;
      });

      if (selectedEl!.amount <= 1) {
        this.userCart.splice(selectedElementID, 1);
      } else {
        this.userCart[selectedElementID].amount--;
      }
    },
  },
});
