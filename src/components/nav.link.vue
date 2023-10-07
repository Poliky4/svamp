<script setup>
import Button from "./button.vue"
</script>

<template>
  <Button small class="link">
    <slot />
  </Button>
</template>

<style scoped lang="scss">
@import "../style/variables.scss";

.link {
  width: 100%;
  margin-bottom: $space-50;

  @include media(">desktop") {
    width: 100%;
    margin-left: auto;
    margin-bottom: $space-50;
  }
}
</style>
