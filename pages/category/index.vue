<template>
  <section class="menuSection">
    <h1 class="menuSection__title">МЕНЮ</h1>
    <MenuTabsSection class="menuSection__tabs" />

    <div class="menuSection__productListWrapper">
      <div
        class="menuSection__productList"
        :class="[computeLoaderClass, viewport.breakpoint.value]"
      >
        <template v-if="products == null">
          <LoaderBar />
        </template>
        <template v-else>
          <MenuCard
            v-for="product in products"
            :key="product.id"
            :productName="product.name"
            :description="product.description"
            :productWeight="product.weight"
            :price="product.price"
            :productID="product.id"
            @addToCart="store.addToUserCart(product)"
            @decreaseAmount="store.decreaseProductAmount(product)"
            @increaseAmount="store.increaseProductAmount(product)"
          />
        </template>
      </div>
    </div>
  </section>
</template>

<script setup>
const store = useAppStore();
const route = useRoute();
const viewport = useViewport();

const products = ref(null);

const computeLoaderClass = computed(() => {
  return products.value == null ? "loader" : "";
});

watch(
  () => route.query.type,
  async () => {
    products.value = null;
    setTimeout(async () => {
      products.value = await $fetch(`/api/products?type=${route.query.type}`);
    }, 200);
  },
  { immediate: true }
);
</script>

<style lang="scss" scoped>
.menuSection {
  padding: 100px 0;

  &__productListWrapper {
    display: flex;
    justify-content: center;
  }

  &__title {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 60px;
    gap: 40px;
    font-weight: 400;
    margin: 0;
    margin-bottom: 50px;

    &::before,
    &::after {
      display: block;
      content: "";
      height: 10px;
      width: 10px;
      border-radius: 100%;
      background-color: black;
    }
  }

  &__tabs {
    margin-bottom: 60px;
  }

  &__productList {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 30px;

    &.lg {
      grid-template-columns: repeat(3, 1fr);
    }

    &.sm,
    &.md {
      grid-template-columns: repeat(2, 1fr);
    }

    &.xs {
      grid-template-columns: repeat(1, 1fr);
    }

    &.loader {
      display: flex;
      justify-content: center;
    }
  }
}
</style>
