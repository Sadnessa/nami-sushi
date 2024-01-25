<template>
  <button :class="computeButtonClass">
    <Icon v-if="icon" :name="props.icon" :size="props.iconSize"/>
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

  iconSize: {
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

const computedIconString = computed(() => {
  return `url('${props.icon}') no-repeat center`;
})
</script>

<style lang="scss">
button {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: v-bind('props.background');
  color: v-bind('props.textColor');
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

.img {
  background-color: v-bind(textColor);
  -webkit-mask: v-bind(computedIconString);
  mask: v-bind(computedIconString);
  height: 20px;
  width: 20px;
}
</style>
