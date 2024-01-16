<template>
  <button :class="computeButtonClass" :style="computeButtonStyle">
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

  background: {
    type: String,
    default: '#fff'
  },

  textColor: {
    type: String,
    default: "#000"
  }
});

const slots = useSlots();

const computeButtonClass = computed(() => {
  return {
    rounded: props.rounded,
    onlyIcon: props.icon && !slots.default,
  };
});

const computeButtonStyle = computed(() => {
  return {
    'background-color' : props.background,
    color: props.textColor
  }
})
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
