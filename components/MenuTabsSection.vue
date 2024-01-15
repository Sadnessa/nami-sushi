<template>
  <div class="menuTabsSection">
    <template v-if="!tabs.length"> fdfdfd </template>
    <template v-else>
      <MenuTab
        v-for="tab in tabs"
        :key="tab.id"
        :selected="tab.id === selectedTab.id"
        @click="switchTab(tab)"
      >
        {{ tab.name }}
      </MenuTab>
    </template>
  </div>
</template>

<script setup>
import { ref } from "vue";

const { data: tabs } = await useFetch("/api/categories");

const selectedTab = ref(tabs.value[0]);

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
