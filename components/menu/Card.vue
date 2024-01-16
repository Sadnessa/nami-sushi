<template>
  <div class="menuCard">
    <img class="menuCard__img" src="" v-if="props.image" />
    <div class="menuCard__info">
      <div class="menuCard__name">
        <h2 class="menuCard__title">{{ props.productName }}</h2>
        <span class="menuCard__weight"> {{ props.productWeight }} </span>
      </div>
      <div class="menuCard__description">{{ props.description }}</div>
    </div>
    <div class="menuCard__action">
        <p>{{ props.price }}</p>
        <ActionButton :background="'rgba(49, 37, 37, 1)'" :textColor="'#fff'">В корзину</ActionButton>
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
</script>

<style lang="scss" scoped>
.menuCard {
  display: flex;
  flex-direction: column;
  max-width: 210px;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.25);

  &__img {
    margin-bottom: 25px;
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

  &__description {
    flex-grow: 1;
    font-family: Arial, Helvetica, sans-serif;
    color: rgba(128, 128, 128, 1);
    font-weight: 400;
    font-size: 15px;
    margin-bottom: 44px;
  }

  &__weight {
    color: rgba(128, 128, 128, 1);
    font-family: Arial, Helvetica, sans-serif;
    font-size: 12px;
    font-weight: 400px;
  }

  &__price {
    font-size: 19px;
  }
}
</style>
