<template>
  <div class="errorCard">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.errorCard {
  border: 1px solid rgb(255, 77, 77);
  border-radius: 4px;
  background-color: rgba(255, 0, 0, 0.1);
  padding: 4px;
  color: red;
}
</style>
