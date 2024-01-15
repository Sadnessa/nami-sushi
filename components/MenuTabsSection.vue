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

const fetch = useFetch();

const { data } = await useFetch('/api/categories');

console.log(data.value)

const tabs = data.value;

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
