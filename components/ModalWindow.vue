<template>
  <div class="modalWindow" v-if="model">
    <div class="modalWindow__overlay" @click="closeModal" />
    <div class="modalWindow__dialog" :style="computedDialogStyle">
      <slot />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  bgColor: {
    type: String,
    default: "white",
  },
});

const model = defineModel();

const computedDialogStyle = computed(() => {
  return { "background-color": props.bgColor };
});

const closeModal = () => {
  model.value = false;
};
</script>

<style lang="scss" scoped>
.modalWindow {
  position: fixed;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;

  &__overlay {
    position: absolute;
    width: 100%;
    height: 100%;
  }

  &__dialog {
    position: relative;
    padding: 20px;
    box-shadow: 0px 0px 12px 0px #00000040;
    border-radius: 8px;
    z-index: 20;
  }
}
</style>
