<template>
  <div
    class="inputText"
    :class="{ hasError: computedError.length && doShowError }"
  >
    <div class="inputText__input">
      <slot name="prepend" />
      <input
        v-model="model"
        :placeholder="props.placeholder"
        @blur="showError"
      />
      <slot name="append" />
    </div>
    <div class="inputText__error">
      <Transition name="fade">
        <span v-if="computedError">{{ computedError }}</span>
      </Transition>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  placeholder: {
    type: String,
    default: "",
  },

  rules: {
    type: Array as PropType<((val: string) => string | true)[]>,
    default: [],
  },
});

const model = defineModel({ type: String, required: true });

const doShowError = ref(false);

const computedError = computed(() => {
  const errorsArray = [] as string[];

  props.rules.forEach((rule) => {
    const ruleResult = rule(model.value);
    if (typeof ruleResult === "string") {
      errorsArray.push(ruleResult);
    }
  });

  if (errorsArray.length && doShowError.value) {
    return errorsArray.join(" | ");
  } else {
    return "";
  }
});

const showError = () => {
  doShowError.value = true;
};
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.hasError {
  .inputText__input {
    border-bottom: 2px solid red;
  }
}

.inputText {
  &__input {
    display: flex;
    gap: 21px;
    border-bottom: 2px solid #d9d9d9;
    padding: 6px;
    transition: 0.3s all ease;
  }

  &__error {
    color: red;
    min-height: 20px;
  }

  input {
    flex-grow: 1;
    outline: none;
    border: none;
    font-family: "Ubuntu", sans-serif;
  }
}
</style>
