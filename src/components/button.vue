<script>
export default {
  props: {
    positive: Boolean,
    negative: Boolean,
    small: Boolean,
  },
}
</script>

<template>
  <button
    :class="{
      positive,
      negative,
      small,
      clickable: !!$attrs.onClick,
    }"
  >
    <slot />
  </button>
</template>

<style scoped lang="scss">
button {
  display: block;
  padding: 8px 16px;
  border: none;
  border-radius: 8px;
  font-size: 24px;
  font-weight: bold;

  transition:
    transform 150ms,
    box-shadow 150ms;
  transform: translate(0px, 0px);
  box-shadow: black 0px 0px 0px;

  &.small {
    font-size: 16px;
    padding: 4px 8px;
  }
  &.positive {
    background-color: green;
    color: white;
  }
  &.negative {
    background-color: red;
    color: white;
  }
  &.clickable {
    cursor: pointer;

    &:hover {
      transform: translate(1px, -2px);
      box-shadow: black -2px 4px 8px;
    }
    &:active {
      transition-duration: 0ms;
      transform: translate(-1px, 2px);
      box-shadow: black 0px 0px 0px;
    }
  }
}
</style>
