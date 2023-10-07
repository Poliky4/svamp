<script setup>
import NavMobile from "./nav.mobile.vue"
import NavDesktop from "./nav.desktop.vue"
</script>

<template>
  <NavMobile>
    <slot />
  </NavMobile>
  <NavDesktop>
    <slot />
  </NavDesktop>
</template>
