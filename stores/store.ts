import { defineStore } from "pinia";
import type { Product } from "../types/product";
import type { User } from "~/types/user";

type CartProduct = Product & { amount: number };

export const useAppStore = defineStore("app-store", {
  state: () => ({
    categories: [],
    userCart: [] as CartProduct[],
    userProfile: null as User | null,
  }),

  actions: {
    async getCategories() {
      const tabs = await $fetch("/api/categories");
      if (tabs === null) {
        return;
      } else {
        this.categories = tabs;
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

    async getUserProfile() {
      const profile = await $fetch<User>("/api/profiles");
      if (profile) {
        this.userProfile = profile;
      }
    },
  },
});
