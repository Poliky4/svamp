<script setup>
import { ref } from "vue"
const open = ref(false)
const toggleOpen = () => (open.value = !open.value)
</script>

<template>
  <nav :class="{ open: open }">
    <div class="burger" @click="toggleOpen" />
    <div v-if="open" class="container" @click="toggleOpen">
      <slot />
    </div>
  </nav>
</template>

<style scoped lang="scss">
@import "../style/variables.scss";

nav {
  $size: 40px;
  $radius: calc($size / 2);

  &.open {
    margin: -$space-50;
    padding: $space-50;
    padding-right: $space-200;
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 999px;
  }

  .burger {
    margin: $space-100;
    width: $size;
    height: $size;
    border-radius: $radius;
    background-color: lightseagreen;
  }

  .container {
    margin-top: -$size - $space-100 + 4px;
    margin-left: $size + $space-100 + $space-50;

    display: flex;
    flex-flow: row nowrap;
    overflow-y: auto;
    gap: $space-50;
  }

  @include media(">desktop") {
    display: none;
  }
}
</style>
