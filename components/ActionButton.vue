<template>
  <button :class="computeButtonClass">
    <img :src="icon" v-if="icon" />
    <slot />
  </button>
</template>

<script setup>
import { computed } from "vue";
import { useSlots } from "vue";

const props = defineProps({
  rounded: {
    type: Boolean,
  },

  icon: {
    type: String,
  },
});

const slots = useSlots();

const computeButtonClass = computed(() => {
  return {
    rounded: props.rounded,
    onlyIcon: props.icon && !slots.default,
  };
});
</script>

<style lang="scss">
button {
  font-family: "Neucha", cursive;
  border: none;
  border-radius: 8px;
  padding: 12px 30px;
  font-size: 16px;
  display: flex;
  align-items: center;
  cursor: pointer;
}

.rounded {
  border-radius: 30px;
}

.onlyIcon {
  padding: 9px;
}
</style>
