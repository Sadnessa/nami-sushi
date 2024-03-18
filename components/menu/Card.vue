<template>
  <div class="menuCard" :class="computeCardClass">
    <img class="menuCard__img" src="" v-if="props.image" />
    <div class="menuCard__info">
      <div class="menuCard__name">
        <h2 class="menuCard__title">{{ props.productName }}</h2>
        <span class="menuCard__weight"> {{ props.productWeight }} г</span>
      </div>
      <div class="menuCard__description">{{ props.description }}</div>
    </div>
    <div class="menuCard__action">
      <p class="menuCard__price">{{ props.price }} ₽</p>
      <ActionButton
        @click="$emit('addToCart')"
        :background="'rgba(49, 37, 37, 1)'"
        :textColor="'#fff'"
        v-if="!computeProductInTheCart"
      >
        В корзину
      </ActionButton>
      <div class="menuCard__amount" v-else>
        <ActionButton
          @click="$emit('decreaseAmount')"
          rounded
          icon="pepicons-pop:minus"
        />
        {{ computeProductInTheCart.amount }}
        <ActionButton
          @click="$emit('increaseAmount')"
          rounded
          icon="pepicons-pop:plus"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(["addToCart", "increaseAmount", "decreaseAmount"]);

const props = defineProps({
  image: {
    type: String,
  },

  productID: {
    type: Number,
  },

  productName: {
    type: String,
  },

  productWeight: {
    type: Number,
  },

  description: {
    type: String,
  },

  price: {
    type: Number,
  },

  favorite: {
    type: Boolean,
  },
});

const store = useAppStore();

const computeProductInTheCart = computed(() => {
  return store.userCart.find((el) => {
    return el.id === props.productID;
  });
});

const computeCardClass = computed(() => {
  return computeProductInTheCart.value ? "cart" : "";
});
</script>

<style lang="scss" scoped>
.menuCard {
  display: flex;
  flex-direction: column;
  max-width: 210px;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.25);
  background: #fafafa;

  &.cart {
    background-color: rgba(49, 37, 37, 1);
    color: white;

    .menuCard__description,
    .menuCard__weight {
      color: white;
    }
  }

  &__img {
    margin-bottom: 25px;
    // box-shadow: 15px 12px 37px 0px rgba(203, 182, 137, 0.7);
  }

  &__name {
    margin-bottom: 20px;
  }

  &__name,
  &__action {
    display: flex;
    justify-content: space-between;
  }

  &__info {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
  }

  &__title {
    margin: 0;
    font-weight: 400;
    font-size: 19px;
  }

  &__description,
  &__weight {
    font-family: Arial, Helvetica, sans-serif;
    font-weight: 400px;
    color: rgba(128, 128, 128, 1);
  }

  &__description {
    flex-grow: 1;

    font-size: 15px;
    margin-bottom: 44px;
  }

  &__weight {
    font-size: 12px;
  }

  &__price {
    margin: 0;
    font-size: 19px;
  }

  &__action {
    align-items: center;
  }

  &__amount {
    display: flex;
    align-items: center;
    gap: 13px;
  }
}
</style>
