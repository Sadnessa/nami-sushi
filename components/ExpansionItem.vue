<template>
  <div class="expansionItem">
    <div class="expansionItem__title">
      <div class="expansionItem__titleContent">
        <slot name="title" />
      </div>
      <Icon
        class="expansionItem__icon"
        :class="computedArrowClass"
        name="pajamas:chevron-down"
        @click="showContent"
      />
    </div>

    <div class="expansionItem__content" v-show="doShowContent">
      <slot name="content" />
    </div>
  </div>
</template>

<script setup lang="ts">
const doShowContent = ref(false);

const showContent = () => {
  doShowContent.value = !doShowContent.value;
};

const computedArrowClass = computed(() => {
  return { expanded: doShowContent.value };
});
</script>

<style lang="scss" scoped>
.expansionItem {
  display: flex;

  &__title {
    display: flex;
    flex-grow: 1;
  }

  &__titleContent {
    flex-grow: 1;
  }

  &__icon {
    transform: rotate(0deg);
    transition: transform ease 0.3s;
    &.expanded {
      transform: rotate(180deg);
    }
  }
}
</style>
