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
  padding: 32px;
  height: 100%;
  width: 600px;
  max-width: calc(100vw - $space-100 * 2);
  text-align: center;
  border-radius: 16px;
}
</style>
