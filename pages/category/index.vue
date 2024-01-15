<template>
  <section>
    <h1>МЕНЮ</h1>
    <MenuTabsSection />
    <div>{{ data }}</div>
  </section>
</template>

<script setup>
const route = useRoute();

const data = ref();

watch(
  () => route.query.type,
  async () => {
    data.value = await $fetch(`/api/products?type=${route.query.type}`);
  },
  { immediate: true }
);

console.log(data);
</script>

<style lang="scss" scoped>
h1 {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 60px;
  gap: 40px;
  font-weight: 400;

  &::before {
    display: block;
    content: "";
    height: 10px;
    width: 10px;
    border-radius: 100%;
    background-color: black;
  }

  &::after {
    display: block;
    content: "";
    height: 10px;
    width: 10px;
    border-radius: 100%;
    background-color: black;
  }
}
</style>
