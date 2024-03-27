<template>
  <div class="orderCard">
    <div class="orderCard__header" v-if="props.title">
      <div class="orderCard__stepNumber" v-if="props.step">
        {{ props.step }}
      </div>
      <p class="orderCard__title">
        {{ props.title }}
      </p>
    </div>
    <div class="orderCard__content">
      <slot name="content" />
    </div>
    <slot name="actions" />
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  step: Number,
  title: String,
});
</script>

<style lang="scss" scoped>
.orderCard {
  display: flex;
  flex-direction: column;
  background-color: white;
  border-radius: 8px;
  padding: 16px;

  &__header {
    display: flex;
    gap: 4px;
  }

  &__content {
    padding: 0 46px;
  }

  &__stepNumber {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 32px;
    width: 32px;
    border-radius: 99%;
    background: #d34a44;
    color: white;
  }

  &__title {
    display: flex;
    align-items: center;
    margin: 0;
    font-size: 22px;
  }
}
</style>
