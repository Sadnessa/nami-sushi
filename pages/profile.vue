<template>
  <section class="profileSection">
    <h1 class="profileSection__title">Профиль</h1>
    <div class="profileSection__content">
      <div class="profileSection__userInfo">
        <div class="userInfo__data">
          <p class="userName">{{ store.userProfile?.name }}</p>
          <div class="userAddress">
            <p>Адрес доставки</p>
            <InputText
              v-model="address"
              placeholder="Добавьте адрес доставки"
            />
          </div>
          <div class="userPhone">
            <p>Номер телефона</p>
            <InputText v-model="phone" />
          </div>
        </div>
        <div class="userInfo__security">
          <div class="userEmail">
            <p>Электронная почта</p>
            <InputText v-model="email" />
          </div>
          <div class="userPassword">
            <p>Изменить пароль</p>
            <InputText placeholder="Новый пароль" v-model="newPassword" />
            <InputText
              placeholder="Повторите новый пароль"
              v-model="repeatPassword"
            />
            <ActionButton
              @click="updateUserData"
              background="#312525"
              text-color="white"
            >
              Сохранить изменения
            </ActionButton>
          </div>
        </div>
      </div>
      <div class="profileSection__orderHistory">
        <p class="orderHistory__title">История заказов</p>
        <div class="orderHistory">
          <template v-for="(order, index) in orderHistory" :key="order.id">
            <ExpansionItem>
              <template #title>
                <div class="order__title">
                  <div>
                    {{ order.id }}
                    <p>{{ computedDate(order.created_at) }}</p>
                  </div>
                  <span> {{ computedDeliveryStatus(order.delivered) }}</span>
                </div>
              </template>
              <template #content>
                <OrderProductCard
                  v-for="product in order.orderProducts"
                  :key="product.id"
                  :productName="product.name"
                  :price="product.price"
                  :description="product.description"
                />
              </template>
            </ExpansionItem>
            <hr v-if="index !== orderHistory!.length - 1" />
          </template>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { Order } from "~/types/order";

const store = useAppStore();

const address = ref("");
const phone = ref("");
const email = ref("");
const newPassword = ref("");
const repeatPassword = ref("");

watch(
  () => store.userProfile,
  (newValue) => {
    if (newValue !== null) {
      address.value = newValue.address;
      phone.value = newValue.phone;
      email.value = newValue.email;
    }
  },
  { immediate: true }
);

const orderHistory = ref<Array<Order> | null>();
const getOrderHistory = async () => {
  orderHistory.value = await $fetch("/api/orders");
};
getOrderHistory();

const updateUserData = async () => {
  await $fetch("/api/update_user", {
    method: "post",
    body: {
      // name: name.value,
      email: email.value,
      password: newPassword.value.length ? newPassword.value : undefined,
      phone: phone.value,
      address: address.value,
    },
  });
};

const computedDeliveryStatus = (status: Boolean) => {
  if (status) {
    return "Доставлен";
  } else {
    return "В процессе";
  }
};

const computedDate = (date: Date) => {
  const newDate = new Date(date);
  return newDate.toLocaleString();
};
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
    //grid-template-columns: repeat(2, 1fr);
  }

  .userName {
    font-size: 34px;
  }

  .order {
    &__title {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
}

p {
  margin: 0;
}
</style>
