<template>
  <h1 class="cartDrawer__title">Оформление заказа</h1>
  <div class="cartDrawer__content">
    <LoaderBar v-if="loading" />
    <template v-else>
      <OrderCard :step="1" title="Способ доставки">
        <template #content> </template>
      </OrderCard>
      <OrderCard :step="2" title="Данные для доставки">
        <template #content>
          <InputText
            v-for="input in deliveryForm"
            :model-value="input.value"
            :placeholder="input.placeholder"
          >
            <template #prepend>
              <Icon :name="input.icon" size="18px" />
            </template>
          </InputText>
        </template>
      </OrderCard>
      <OrderCard>
        <template #content>
          <div class="bill">
            <div class="bill__productsPrice">
              <p>Стоимость товаров</p>
              <p>{{ computedProductsPrice }} ₽</p>
            </div>
            <div class="bill__deliveryPrice" v-if="computedProductsPrice < 500">
              <p>Стоимость доставки</p>
              <p>{{ deliveryPrice }} ₽</p>
            </div>
            <hr />
            <div class="bill__paymentPrice">
              <p>Итого к оплате</p>
              <p>{{ computedPayment }} ₽</p>
            </div>
          </div>
        </template>
        <template #actions>
          <ActionButton
            background="#0C334A"
            text-color="white"
            @click="placeOrder"
          >
            Заказать
          </ActionButton>
          <p>
            Создавая заказ, вы соглашаетесь с политикой обработки персональных
            данных
          </p>
        </template>
      </OrderCard>
    </template>
  </div>
</template>

<script setup lang="ts">
const deliveryForm = reactive({
  userName: {
    value: "",
    placeholder: "Имя",
    icon: "majesticons:user-line",
  },
  phone: {
    value: "",
    placeholder: "Номер телефона",
    icon: "solar:phone-outline",
  },
  address: {
    value: "",
    placeholder: "Адрес доставки",
    icon: "ep:place",
  },
  additionalInfo: {
    value: "",
    placeholder: "Дополнительная информация",
    icon: "fluent:info-24-regular",
  },
});

const emit = defineEmits(["closeSideBar"]);

const loading = ref(false);
const store = useAppStore();

const computedProductsPrice = computed(() =>
  store.userCart.reduce((acc, el) => {
    return (acc += el.amount * el.price);
  }, 0)
);

const deliveryPrice = 300;

const computedPayment = computed(() =>
  computedProductsPrice.value > 500
    ? computedProductsPrice.value
    : computedProductsPrice.value + deliveryPrice
);

watch(
  () => store.userProfile,
  (newValue) => {
    if (newValue !== null) {
      deliveryForm.userName.value = newValue.name;
      deliveryForm.phone.value = newValue.phone;
      deliveryForm.address.value = newValue.address;
    } else {
      deliveryForm.userName.value = "";
      deliveryForm.phone.value = "";
      deliveryForm.address.value = "";
    }
  },
  { immediate: true }
);

const placeOrder = async () => {
  loading.value = true;
  await $fetch("/api/order", {
    method: "post",
    body: {
      orderedProducts: store.userCart,
      //toPay: computedPayment.value,
      name: deliveryForm.userName.value,
      address: deliveryForm.address.value,
      phone: deliveryForm.phone.value,
      additional_info: deliveryForm.additionalInfo.value,
    },
  });
  store.userCart = [];
  loading.value = false;
  // emit("closeSideBar");
};
</script>

<style lang="scss" scoped>
.cartDrawer__title {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  gap: 40px;
  font-weight: 400;
  margin: 0;
  margin-bottom: 30px;
  color: rgba(49, 37, 37, 1);

  &::before,
  &::after {
    display: block;
    content: "";
    height: 6px;
    width: 6px;
    border-radius: 100%;
    background-color: black;
  }
}

.bill {
  display: flex;
  flex-direction: column;
  gap: 20px;

  &__productsPrice,
  &__paymentPrice,
  &__deliveryPrice {
    display: grid;
    grid-auto-flow: column;
    grid-template-columns: repeat(2, 1fr);
    gap: 45px;
  }
}

.cartDrawer__content {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

hr {
  border: none;
  width: 100%;
  height: 1px;
  margin: 0;
  background: #d9d9d9;
}

button {
  margin-top: 40px;
  border-radius: 4px;
}

p {
  margin: 0;
}
</style>
