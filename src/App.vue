<script setup>
import { ref } from "vue"
import { RouterLink, RouterView } from "vue-router"

import Quiz from "./quiz/quiz.vue"
import Library from "./library/library.vue"
import Nav from "./components/nav.vue"
import NavLink from "./components/nav.link.vue"

const ROUTES = {
  QUIZ: "Quiz",
  LIBRARY: "Library",
}

const route = ref(ROUTES.QUIZ)

const changeRoute = (newRoute) => (route.value = newRoute)
</script>

<template>
  <main>
    <div class="left">
      <Nav>
        <NavLink
          v-for="route in Object.values(ROUTES)"
          small
          @click="changeRoute(route)"
          >{{ route }}</NavLink
        >
      </Nav>
    </div>
    <div class="content">
      <Quiz v-if="route === ROUTES.QUIZ" />
      <Library v-if="route === ROUTES.LIBRARY" />
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
