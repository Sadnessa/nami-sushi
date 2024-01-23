<template>
  <h1 class="cartDrawer__title">КОРЗИНА</h1>

  <template v-if="store.userCart.length">
    <div class="cartDrawer__productList">
      <CartCard v-for="product in store.userCart" :key="product.id" :productName="product.name"
        :description="product.description" :amount="product.amount" :price="product.price" :weight="product.weight"
        @increaseAmount="store.increaseProductAmount(product)" @decreaseAmount="store.decreaseProductAmount(product)"
        @removeFromCart="store.removeFromUserCart(product)" />
    </div>
    <div class="cartDrawer__buyInfo">
      <p class="cartDrawer__totalPrice">{{ `Общая сумма ${computedTotalPrice} ₽` }}</p>
      <p class="cartDrawer__note">* Сумма заказа для доставки курьером должна составлять не менее 500 ₽</p>
    </div>
  </template>

  <template v-else>
    <div class="cartDrawer__productList">
      Ваша корзина пуста. :с
    </div>
  </template>

  <div class="cartDrawer__actions">
    <ActionButton @click="$emit('closeCart')">Вернуться к покупкам</ActionButton>
    <ActionButton @click="$emit('placeOrder')" background="rgba(49, 37, 37, 1)" text-color="white"
      v-if="store.userCart.length">
      Оформить заказ
    </ActionButton>
  </div>
</template>

<script setup>
const emit = defineEmits(['closeCart', 'placeOrder'])
const store = useAppStore();

const computedTotalPrice = computed(() => {
  return store.userCart.reduce((acc, el) => {
    return acc += el.amount * el.price;
  }, 0);
});
</script>

<style lang="scss" scoped>
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
</style>