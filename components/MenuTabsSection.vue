<template>
  <div class="menuTabsSection">
    <MenuTab
      v-for="tab in tabs"
      :key="tab.name"
      :selected="tab.name === selectedTab.name"
      @click="switchTab(tab)"
    >
      {{ tab.title }}
    </MenuTab>
  </div>
</template>

<script setup>
import { ref } from "vue";

const selectedTab = ref();

const tabs = [
  { name: "rolls", title: "Роллы" },
  { name: "sushi", title: "Суши и гунканы" },
  { name: "sets", title: "Сеты" },
  { name: "noodles", title: "Лапша и рис" },
  { name: "salads", title: "Салаты" },
  { name: "hot_dish", title: "Горячие блюда" },
];

selectedTab.value = tabs[0];

const switchTab = (tab) => {
  selectedTab.value = tab;
};
</script>

<style lang="scss" scoped>
.menuTabsSection {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}
</style>
