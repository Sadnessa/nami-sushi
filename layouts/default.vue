<template>
  <aside class="cartDrawer" :class="computeAnimatonClass">
    <h1 class="cartDrawer__title">КОРЗИНА</h1>
    <div class="cartDrawer__productList">
      <CartCard
        v-for="product in store.userCart"
        :key="product.id"
        :productName="product.name"
        :description="product.description"
        :amount="product.amount"
        :price="product.price"
        :weight="product.weight"
        @increaseAmount="store.increaseProductAmount(product)"
        @decreaseAmount="store.decreaseProductAmount(product)"
        @removeFromCart="store.removeFromUserCart(product)"
      />
    </div>
    <div class="cartDrawer__buyInfo">
      <p class="cartDrawer__totalPrice">{{ `Общая сумма ${computedTotalPrice} ₽` }}</p>
      <p class="cartDrawer__note">* Сумма заказа для доставки курьером должна составлять не менее 500 ₽</p>
    </div>
    <div class="cartDrawer__actions">
      <ActionButton @click="hideCart">Вернуться к покупкам</ActionButton>
      <ActionButton background="rgba(49, 37, 37, 1)" text-color="white">
        Оформить заказ
      </ActionButton>
    </div>
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

const doShowCart = ref(false);
const showCart = () => {
  doShowCart.value = true;
};
const hideCart = () => {
  doShowCart.value = false;
};

const computeAnimatonClass = computed(() => {
  return doShowCart.value ? "" : "hidden";
});

const computeBlur = computed(() => {
  return doShowCart.value ? "blur" : "";
});

const computedTotalPrice = computed(() => {
  return store.userCart.reduce((acc, el) => {
    return acc += el.amount * el.price;
  }, 0);
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

  .cartDrawer__title {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 48px;
    gap: 40px;
    font-weight: 400;
    margin: 0;
    margin-bottom: 30px;
    color: rgba(49, 37, 37, 1);

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

  .cartDrawer__actions {
    display: flex;
    gap: 30px;
  }

  .cartDrawer__productList {
    display: flex;
    flex-direction: column;
    gap: 5px;
    flex-grow: 1;
  }

  .cartDrawer__note {
    font-family: Arial, sans-serif;
    font-weight: 400;
  }
}
</style>
