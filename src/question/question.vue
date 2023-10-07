<script setup></script>

<template>
  <div class="question">
    <slot />
  </div>
</template>

<style scoped lang="scss">
@import "../style/variables.scss";
.question {
  margin: 0 auto;
  padding: 32px;
  width: 600px;
  max-width: calc(100vw - $space-100 * 2);
  background-color: #006600;
  text-align: center;
  border-radius: 16px;
}
</style>
