<script setup>
import { RouterView } from "vue-router"
</script>

<template>
  <main>
    <div class="left">
      <!-- <Nav>
        <NavLink v-for="route in routes" small :to="route.path">{{
          route.label
        }}</NavLink>
      </Nav> -->
    </div>
    <div class="content">
      <RouterView />
    </div>
    <div class="right"></div>
  </main>
</template>

<style scoped lang="scss">
@import "./src/style/variables";

main {
  position: relative;
  padding: $space-100;
  height: 100%;

  .left {
    position: absolute;
    z-index: 10000;

    display: flex;
    flex-flow: column nowrap;
  }

  .content {
    height: 100%;
  }

  @include media(">desktop") {
    z-index: unset;
    padding: $space-200;
    display: grid;
    grid-template-columns: auto fit-content(400px) auto;
    gap: $space-200;

    .left {
      position: relative;
      display: flex;
      justify-content: flex-end;
    }
  }
}
</style>
