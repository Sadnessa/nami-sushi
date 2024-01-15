<template>
  <button :class="computeSelectedTab">
    <slot />
  </button>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  selected: {
    type: Boolean,
  },
});

const computeSelectedTab = computed(() => {
  return { selected: props.selected };
});
</script>

<style lang="scss" scoped>
button {
  font-family: "Neucha", cursive;
  border: none;
  border-radius: 30px;
  padding: 16px 32px;
  font-size: 28px;
  display: flex;
  align-items: center;
  cursor: pointer;
  background-color: white;
  color: rgba(179, 162, 150, 1);
  text-transform: uppercase;

  &.selected {
    background-color: rgba(49, 37, 37, 1);
    color: white;
  }
}
</style>
