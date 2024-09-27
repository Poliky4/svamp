<script setup></script>

<template>
  <div class="question">
    <slot />
  </div>
</template>

<style scoped lang="scss">
@import "../style/variables.scss";
.question {
  display: flex;
  flex-flow: column nowrap;
  margin: 0 auto;
  height: 100%;
  width: 600px;
  max-width: calc(100vw - $space-100 * 2);
  text-align: center;
}
</style>
