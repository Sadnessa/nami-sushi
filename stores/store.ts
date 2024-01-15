import { defineStore } from "pinia";

export const useAppStore = defineStore("app-store", {
  state: () => ({
    categories: [],
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
  },
});
