<template>
  <div class="inputText">
    <slot name="prepend" />
    <input v-model="model" :placeholder="props.placeholder" />
    <slot name="append" />
  </div>
</template>

<script setup>
const props = defineProps({
  placeholder: {
    type: String,
    default: "",
  },
});
const model = defineModel();
</script>

<style lang="scss" scoped>
.inputText {
  display: flex;
  gap: 21px;
  border-bottom: 2px solid #d9d9d9;
  padding: 6px;

  input {
    flex-grow: 1;
    outline: none;
    border: none;
    font-family: "Ubuntu", sans-serif;
  }
}
</style>
