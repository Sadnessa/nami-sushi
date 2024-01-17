<template>
  <div class="cartCard">
    <img />
    <div class="cartCard__info">
      <h2 class="cartCard__name">{{ props.productName }}</h2>
      <p class="cartCard__description">{{ props.description }}</p>
      <span class="cartCard__weight">({{ props.weight }} г)</span>
    </div>
    <div class="cartCard__price">
      <p>{{ `Цена ${props.price} ₽` }}</p>
      <div class="cartCard__actions">
        <ActionButton
          background="rgba(49, 37, 37, 1)"
          @click="$emit('decreaseAmount')"
          rounded
          icon="/minus.svg"
        />
        {{ amount }}
        <ActionButton
          background="rgba(49, 37, 37, 1)"
          @click="$emit('increaseAmount')"
          rounded
          icon="/plus.svg"
        />
      </div>
      <p>{{ `Сумма ${computedTotalPrice} ₽` }}</p>
    </div>
    <div class="cartCard__removeButtonWrapper">
      <button class="cartCard__removeButton">
        <img src="/trash.svg" />
      </button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  image: {
    type: String,
  },

  productName: {
    type: String,
  },

  description: {
    type: String,
  },

  weight: {
    type: Number,
  },

  price: {
    type: Number,
  },

  amount: {
    type: Number,
  },
});

const computedTotalPrice = computed(() => {
  return props.price * props.amount;
});
</script>

<style lang="scss" scoped>
.cartCard {
  display: flex;
  background-color: white;
  box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
  padding: 15px;
  padding-right: 0;

  &__name {
    font-size: 16px;
    margin: 0;
    font-weight: 400;
  }

  &__description,
  &__weight {
    font-weight: 400px;
    color: rgba(128, 128, 128, 1);
    font-size: 13px;
    font-family: "PT Sans Narrow", sans-serif;
    margin: 0px;
  }

  &__actions {
    display: flex;
    gap: 8px;
    align-items: center;
  }

  &__removeButtonWrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  &__removeButton {
    border-radius: 99px 0% 0% 99px;
    background-color: rgba(49, 37, 37, 1);
    padding: 26px 16px;
    padding-right: 10px;
  }
}
</style>
