<script setup></script>

<template>
  <nav>
    <slot />
  </nav>
</template>

<style scoped lang="scss">
@import "../style/variables.scss";
nav {
  @include media("<desktop") {
    display: none;
  }
}
</style>
