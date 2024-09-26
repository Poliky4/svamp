<script>
export default {
  name: "Input",
  props: {
    inputType: String,
    placeholder: String,
    label: String,
    modelValue: String,
    valid: Boolean,
    invalid: Boolean,
  },
  emits: ["update:modelValue", "onFocus"],
  methods: {
    onInput(e) {
      this.$emit("update:modelValue", e.target.value)
    },
    onFocus(e) {
      this.$emit("onFocus", e.target.value)
    },
  },
}
</script>

<template>
  <input
    :type="inputType"
    :placeholder="placeholder"
    :value="modelValue"
    :class="[{ valid, invalid }]"
    @input="onInput"
    @focus="onFocus"
  />
</template>

<style scoped lang="scss">
input {
  font-size: 22px;
  padding: 8px 16px;
  border: none;
  border-radius: 8px;
  outline: none;
  cursor: pointer;

  &.valid {
    border: 2px solid green;
  }
  &.invalid {
    border: 2px solid red;
  }
}
</style>
