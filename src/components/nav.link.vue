<script setup>
import { RouterLink } from "vue-router"
import Button from "./button.vue"

const props = defineProps({
  to: String,
})
</script>

<template>
  <RouterLink :to="props.to">
    <Button small class="link">
      <slot />
    </Button>
  </RouterLink>
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
