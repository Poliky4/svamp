<script setup>
import NavLink from "../components/nav.link.vue"
import { routes } from "../router"
</script>

<template>
  <NavLink v-for="route in routes" small :to="route.path">{{
    route.label
  }}</NavLink>
</template>

<style scoped lang="scss">
@import "./src/style/variables";
</style>
