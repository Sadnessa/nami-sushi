<template>
  <aside class="cartDrawer" :class="computeAnimatonClass">
    <template v-if="currentView === 'cart'">
      <CartView @closeCart="hideCart" @placeOrder="showOrderView"/>
    </template>
    <template v-else>
      <OrderView/>
    </template>
  </aside>
  <div class="page" :class="computeBlur">
    <HeaderBar @onCartClick="showCart" />
    <main>
      <NuxtPage />
    </main>
  </div>
</template>

<script setup>
const store = useAppStore();
const currentView = ref('cart')

const showCart = () => {
  store.doShowCart = true;
};

const hideCart = () => {
  store.doShowCart = false;
};

const showOrderView = () => {
  currentView.value = 'order'
}

const computeAnimatonClass = computed(() => {
  return store.doShowCart ? "" : "hidden";
});

const computeBlur = computed(() => {
  return store.doShowCart ? "blur" : "";
});
</script>

<style lang="scss">
body {
  margin: 0;
  font-family: "Neucha", cursive;
}
</style>

<style lang="scss" scoped>
.page {
  &.blur {
    position: relative;

    &::before {
      position: absolute;
      content: "";
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      background-color: rgba(60, 75, 97, 0.6);
      backdrop-filter: blur(10px);
    }
  }
}

aside {
  display: flex;
  flex-direction: column;
  position: fixed;
  z-index: 10;
  background-color: rgba(235, 225, 215, 1);
  right: 0;
  height: calc(100vh - 80px);
  padding: 40px 45px;
  transition: all ease 0.3s;

  &.hidden {
    transform: translateX(100%);
  }
}
</style>
