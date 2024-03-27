<template>
  <label class="inputCheckbox">
    <input type="checkbox" :checked="checkedValue" />
    <span class="checkmark" />
  </label>
</template>

<script setup lang="ts">
const checkedValue = defineModel<boolean>();
</script>
