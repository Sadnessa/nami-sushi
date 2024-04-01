<template>
  <div class="orderProductCard">
    <img class="orderProductCard__img" v-if="props.image" />
    <div class="orderProductCard__info">
      <h2 class="orderProductCard__name">{{ props.productName }}</h2>
      <p class="orderProductCard__description">{{ props.description }}</p>
    </div>
    <div class="orderProductCard__price">{{ props.price }}</div>
  </div>
</template>

<script setup lang="ts">
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
</script>
