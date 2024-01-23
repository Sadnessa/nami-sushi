<template>
  <div class="cartCard">
    <img  class="cartCard__img" v-if="props.image"/>
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
          textColor="white"
          @click="$emit('decreaseAmount')"
          rounded
          icon="pepicons-pop:minus"
        />
        {{ amount }}
        <ActionButton
          background="rgba(49, 37, 37, 1)"
          textColor="white"
          @click="$emit('increaseAmount')"
          rounded
          icon="pepicons-pop:plus"
        />
      </div>
      <p>{{ `Сумма ${computedTotalPrice} ₽` }}</p>
    </div>
    <div class="cartCard__removeButtonWrapper">
      <button class="cartCard__removeButton" @click="$emit('removeFromCart')">
        <Icon name="bi:trash3" />
      </button>
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(["removeFromCart", "increaseAmount", "decreaseAmount"]);


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

  &__img {
    margin-left: 25px;
  }

  &__info {
    flex-grow: 1;
    margin-right: 35px;
  }

  &__name {
    font-size: 16px;
    margin: 0;
    font-weight: 400;
    text-transform: uppercase;
  }

  &__description,
  &__weight {
    font-weight: 400px;
    color: rgba(128, 128, 128, 1);
    font-size: 13px;
    font-family: "PT Sans Narrow", sans-serif;
    margin: 0px;
  }

  &__price {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-right: 25px;

    p {
      margin: 0;
    }
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
    color: white;
  }
}
</style>
