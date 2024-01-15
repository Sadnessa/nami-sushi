<template>
  <div class="menuTabsSection">
    <template v-if="!store.categories.length"> fdfdfd </template>
    <template v-else>
      <MenuTab
        v-for="tab in store.categories"
        :key="tab.id"
        :selected="tab.id === Number($route.query.type)"
      >
        <NuxtLink :to="`/category?type=${tab.id}`">
          {{ tab.name }}
        </NuxtLink>
      </MenuTab>
    </template>
  </div>
</template>

<script setup>
const store = useAppStore();

if (!store.categories.length) {
  await store.getCategories();
}
</script>

<style lang="scss" scoped>
.menuTabsSection {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

a {
  text-decoration: none;
  color: currentColor;
}
</style>
