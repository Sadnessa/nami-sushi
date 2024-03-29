<template>
  <section class="profileSection">
    <h1 class="profileSection__title">Профиль</h1>
    <div class="profileSection__content">
      <div class="profileSection__userInfo">
        <div class="userInfo__data">
          <p class="userName">{{ store.userProfile?.name }}</p>
          <div class="userAddress">
            <p>Адрес доставки</p>
            <span>{{ store.userProfile?.address }}</span>
          </div>
          <div class="userPhone">
            <p>Номер телефона</p>
            <span>{{ store.userProfile?.phone }}</span>
          </div>
        </div>
        <div class="userInfo__security">
          <div class="userEmail">
            <p>Электронная почта</p>
            <span>{{ store.userProfile?.email }}</span>
          </div>
          <div class="userPassword">
            <p>Изменить пароль</p>
            <InputText />
            <InputText />
          </div>
        </div>
      </div>
      <div class="profileSection__orderHistory">
        <p class="orderHistory__title">История заказов</p>
        <div class="orderHistory">
          <ExpansionItem v-for="order in orderHistory" :key="order.id">
            <template #title>{{ order.id }}</template>
            <template #content></template>
          </ExpansionItem>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { Order } from "~/types/order";

const store = useAppStore();
const orderHistory = (await $fetch("/api/orders")) as Array<Order>;
console.log(orderHistory);
</script>

<style lang="scss" scoped>
.profileSection {
  padding: 100px 0;

  &__title {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 46px;
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
    display: flex;
    justify-content: center;
  }

  &__content {
    margin: 0 auto;
    width: 800px;
    display: grid;
    gap: 20px;
  }

  &__userInfo,
  &__orderHistory {
    padding: 20px;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0px 0px 12px 0px #00000040;
  }

  &__userInfo {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }

  .userName {
    font-size: 34px;
  }
}

p {
  margin: 0;
}
</style>
