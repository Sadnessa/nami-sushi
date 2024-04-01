<template>
  <div class="expansionItem">
    <div class="expansionItem__title" @click="showContent">
      <div class="expansionItem__titleContent">
        <slot name="title" />
      </div>
      <Icon
        class="expansionItem__icon"
        :class="computedArrowClass"
        name="pajamas:chevron-down"
        size="24px"
      />
    </div>
    <Transition name="slide">
      <div
        class="expansionItem__content"
        v-if="doShowContent"
        ref="itemContent"
      >
        <slot name="content" />
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
const doShowContent = ref(false);
const itemContent = ref<HTMLElement | null>(null);
const contentHeight = ref(0);

watch(itemContent, (newValue) => {
  if (newValue !== null) {
    contentHeight.value = newValue.clientHeight;
  }
});

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
  flex-direction: column;

  &__title {
    display: flex;
    cursor: pointer;
    flex-grow: 1;
    align-items: center;
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
    margin-left: 20px;
  }

  &__content {
    max-height: 900px;
  }
}

.slide-enter-from,
.slide-leave-to {
  max-height: 0;
  //opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: all ease 0.3s;
  overflow: hidden;
}
</style>
