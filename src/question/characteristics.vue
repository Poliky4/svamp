<script setup>
import { computed } from "vue"
import Button from "../components/button.vue"

const props = defineProps({
  cap: String,
  hymenium: String,
  ridges: String,
  stipe: String,
  sporePrint: String,
  environment: String,
})

const characteristics = computed(() =>
  [
    ["Hatt", props.cap],
    ["Hymenuim", props.hymenium],
    ["Skivtyp", props.ridges],
    ["Fot", props.stipe],
    ["Sporavtryck", props.sporePrint],
    ["Miljö", props.environment],
  ].filter(([label, value]) => !!value),
)
</script>

<template>
  <div class="characteristics">
    <Button v-for="characteristic in characteristics" small class="cell">
      <div class="header">{{ characteristic[0] }}</div>
      <div class="value">{{ characteristic[1] }}</div>
    </Button>
  </div>
</template>

<style scoped lang="scss">
@import "../style/variables.scss";
.characteristics {
  // color: black;
  color: white;
  margin-bottom: $space-200;

  display: flex;
  flex-flow: row wrap;
  gap: $space-100;

  @include media(">desktop") {
    display: grid;
    grid-template-areas:
      "a b c"
      "d e f";
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: repeat(2, 60px);
  }

  .cell {
    line-height: 1.1;
    flex-basis: calc(50% - $space-100);

    .header {
      font-size: 18px;
      font-weight: bold;
    }
    .value {
      font-size: 18px;
      font-weight: normal;
    }
  }
}
</style>
